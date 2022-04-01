import moment from 'moment';
// import 'font-awesome/css/font-awesome.css';
// import 'amis/lib/themes/default.css';
// import 'antd/dist/antd.css';
// import 'antd/dist/antd.compact.css';
import '@/assets/css/amis-reset.less';
import '@/assets/css/global-class.less';
import '@/assets/css/amis-class.less';
import 'simplebar/src/simplebar.css';
import { logger, setConfig } from '@/utils/logger';

moment.locale('zh-cn');
const log = logger.getLogger("src/global.tsx");

// 全局日志配置
setConfig({
  level: 'log',
  // moduleNameRegExp: /.*/,
  // moduleNameRegExp: /^src\/schema-app|src\/utils\/|src\/service\/.*/,
  // moduleNameRegExp: /src\/schema-app\.tsx/,
  moduleNameRegExp: /src\/utils\/amis-render-options\.tsx/,
});

log.info("global.tsx加载完成");
