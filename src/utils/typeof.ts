import { logger } from '@/utils/logger';

const log = logger.getLogger('src/utils/typeof.ts');

/** 所有变量类型 */
enum TypeEnum {
    string = 'string',
    number = 'number',
    object = 'object',
    array = 'array',
    function = 'function',
    null = 'null',
    boolean = 'boolean',
    symbol = 'symbol',
    json = 'json',
    math = 'math',
    regexp = 'regexp',
    date = 'date',
    undefined = 'undefined',
    nan = 'nan',
    reactNode = 'react_node'
}

/**
 * 判断对象类型
 * @param object 对象
 */
const variableTypeOf = (object?: any): TypeEnum => {
    const typeStr = Object.prototype.toString.call(object);
    let typeName: TypeEnum;
    switch (`${typeStr}`.toLowerCase()) {
        case '[object string]':
            typeName = TypeEnum.string;
            break;
        case '[object number]':
            if (Number.isNaN(object)) {
                return TypeEnum.nan;
            }
            typeName = TypeEnum.number;
            break;
        case '[object object]':
            if (object.$$typeof && object.props) {
                const type = variableTypeOf(object.$$typeof);
                if (type === TypeEnum.symbol || type === TypeEnum.reactNode) {
                    return TypeEnum.reactNode;
                }
            }
            typeName = TypeEnum.object;
            break;
        case '[object array]':
            typeName = TypeEnum.array;
            break;
        case '[object function]':
            typeName = TypeEnum.function;
            break;
        case '[object null]':
            typeName = TypeEnum.null;
            break;
        case '[object boolean]':
            typeName = TypeEnum.boolean;
            break;
        case '[object date]':
            typeName = TypeEnum.date;
            break;
        // 不常用
        case '[object symbol]':
            typeName = TypeEnum.symbol;
            break;
        case '[object json]':
            typeName = TypeEnum.json;
            break;
        case '[object math]':
            typeName = TypeEnum.math;
            break;
        case '[object regexp]':
            typeName = TypeEnum.regexp;
            break;
        // 貌似不会走的分支
        case '[object undefined]':
            typeName = TypeEnum.undefined;
            break;
        // 无法识别
        default:
            if (object === undefined) {
                return TypeEnum.undefined;
            }
            log.info('varTypeOf -> ', object, ' | -> ', typeStr, ' | ', `${typeStr}`.toLowerCase());
            typeName = TypeEnum.object;
    }
    return typeName;
};

export { TypeEnum, variableTypeOf };
