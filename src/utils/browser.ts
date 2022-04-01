import { logger } from '@/utils/logger';

const log = logger.getLogger('src/utils/browser.ts');
const { userAgent } = navigator;
log.info('浏览器信息 -> ', userAgent);

/**
 * 浏览器类型
 */
const browserType = {
    // 判断是否Opera浏览器 Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.170 Safari/537.36 OPR/53.0.2907.99
    isOpera: userAgent.indexOf('OPR') > -1,
    // 判断是否IE浏览器 Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; rv:11.0) like Gecko
    isIE11: userAgent.indexOf('rv') > -1,
    // 判断是否Edge浏览器 Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.18363
    isEdge: userAgent.indexOf('Edge') > -1,
    // IE11以下浏览器 Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729)
    elseIE: userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1,
    // Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0
    isFirefox: userAgent.indexOf('Firefox') > -1,
    // 判断是否Safari浏览器 Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.1 Safari/603.1.30
    isSafari: userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1,
    // 判断Chrome浏览器 Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36
    isChrome: userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Edge') <= -1
};

export { browserType };
