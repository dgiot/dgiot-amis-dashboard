import lodash from 'lodash';
import dayjs from 'dayjs';
import { getUrlParam } from './utils';

/** 日志级别 */
type Level = 'log' | 'info' | 'warn' | 'error';

/** Logger选项 */
interface LoggerOption {
    /** 是否打印日志(打印日志内部开关) */
    isPrint?: boolean;
    /** 模块名称 */
    moduleName?: string;
    /** 日志级别 */
    level?: Level;
}

/** 全局配置 */
interface InnerConfig {
    /** 全局日志级别 */
    level: Level;
    /** 全局模块名称(用于过滤日志级别,支持正则表达式) */
    moduleNameRegExp: RegExp;
    /** 默认Logger选项 */
    defaultOption: Required<LoggerOption>;
}

/** Logger配置 */
type LoggerConfig = Omit<InnerConfig, 'defaultOption'>;

// /** 日志级别对应的样式 */
// const levelStyle = {
//   log: "color：black;",
//   info: "color：#1890ff;",
//   warn: "color：#faad14;",
//   error: "color：#f5222d;",
// };

// 内部配置
let innerConfig: InnerConfig = {
    level: 'log',
    moduleNameRegExp: /.*/,

    defaultOption: {
        isPrint: true,
        moduleName: '',
        level: 'log'
    }
};
// 当前允许的日志级别
const allowedLevel: Level[] = [];

// 刷新当前允许的日志级别
function refreshAllowedLevel(): void {
    const { level } = innerConfig;
    // ERROR > WARN > INFO > LOG
    const allLevel: Level[] = ['log', 'info', 'warn', 'error'];
    const idx = allLevel.findIndex((lvl) => lvl === level);
    allowedLevel.push(...allLevel.slice(idx));
}

// 初始化允许的日志级别
refreshAllowedLevel();

/**
 * 设置日志配置
 * @param conf 日志配置
 */
function setConfig(conf: Partial<InnerConfig>): void {
    innerConfig = { ...innerConfig, ...conf };
    if (isProdEnv) return;
    logger.info('lib:logger:config', innerConfig);
    refreshAllowedLevel();
}

/**
 * 根据window.location.href参数初始化Logger
 * @param defConf 默认配置
 */
function initLogger(defConf: any = {}): void {
    const moduleName = getUrlParam('loggerModule') || defConf?.moduleName || '';
    const loggerLevel = getUrlParam('loggerLevel') || defConf?.level || 'log';
    const loggerConfig = lodash.defaults({ moduleName, level: loggerLevel, enable: !!moduleName }, defConf);
    setConfig(loggerConfig);
}

// 过滤日志打印信息
function filterLog(option: Required<Pick<LoggerOption, 'level' | 'moduleName'>>): boolean {
    // 打包环境不打印LOG
    if (isProdEnv) return false;
    // 过滤不同级别的 LOG
    if (!allowedLevel.find((l) => l === option.level)) return false;
    // 根据传入的 moduleName 过滤日志
    const { moduleNameRegExp } = innerConfig;
    return moduleNameRegExp.test(option.moduleName);
}

// 打印日志 - 实现
function printLogger(option: LoggerOption, message: any[]) {
    // 生产环境不打印日志
    if (isProdEnv) return;
    const loggerOption: Required<LoggerOption> = { ...innerConfig.defaultOption, ...option };
    const { isPrint = true, moduleName, level } = loggerOption;
    if (!isPrint) return;
    if (!filterLog({ level, moduleName })) return;
    const logArgs: any[] = [
        // `%c${lodash.repeat("%s", message.length + 1)}`,
        // levelStyle[level],
        `${level === 'log' || level === 'info' ? '✧' /*✦*/ : ''}[${dayjs(new Date()).format('HH:mm:ss')}] ${lodash.padEnd(
            level.toLowerCase(),
            5
        )} | ${moduleName} - `
    ];
    const log = Function.prototype.bind.call(console[level] || console.log, console);
    log.apply(console, logArgs.concat(message));
}

function time<T = any>(label: string, timeFn: () => T, loggerOption: LoggerOption): T {
    const startTime = Date.now();
    const result = timeFn();
    const endTime = Date.now();
    printLogger.call(null, loggerOption, [`${label || '耗时'}: ${endTime - startTime}ms`, result]);
    return result;
}

class Logger {
    public log(moduleName: string, ...loggerDetail: any[]) {
        printLogger({ level: 'log', moduleName }, loggerDetail);
    }

    public info(moduleName: string, ...loggerDetail: any[]) {
        printLogger({ level: 'info', moduleName }, loggerDetail);
    }

    public warn(moduleName: string, ...loggerDetail: any[]) {
        printLogger({ level: 'warn', moduleName }, loggerDetail);
    }

    public error(moduleName: string, ...loggerDetail: any[]) {
        printLogger({ level: 'error', moduleName }, loggerDetail);
    }

    /**
     * 获取一个Logger
     * @param moduleName  打印日志的模块名称
     * @param option      日志选项
     */
    public getLogger(moduleName: string, option: LoggerOption = {}) {
        const loggerOption: LoggerOption = { ...option, moduleName };
        return {
            /**
             * 表达式满足条件才会打印日志
             * @param expression bool表达式
             */
            if: (expression: boolean) => this.getLogger(moduleName, { ...option, isPrint: expression }),
            /**
             * 打印函数执行耗时
             * @param label   日志前缀Label
             * @param timeFn  目标函数
             */
            time: <T = any>(label: string, timeFn: () => T): T => time(label, timeFn, loggerOption),
            /** log日志 */
            log: (...message: any[]) => printLogger({ ...loggerOption, level: 'log' }, message),
            /** info日志 */
            info: (...message: any[]) => printLogger({ ...loggerOption, level: 'info' }, message),
            /** warn日志 */
            warn: (...message: any[]) => printLogger({ ...loggerOption, level: 'warn' }, message),
            /** error日志 */
            error: (...message: any[]) => printLogger({ ...loggerOption, level: 'error' }, message)
        };
    }
}

const logger = new Logger();

export { LoggerConfig, setConfig, initLogger, logger };
