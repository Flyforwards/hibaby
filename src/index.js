import dva from 'dva';
import './index.css';
import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading';
import { message } from 'antd';
import "./utils";


// 1. Initialize
const app = dva({
	history: browserHistory,
 	onError (error) {
    message.error(error.message)
  },
});

// 2. Plugins
app.use(createLoading({ effects: true }));

// 3. Model
app.model(require('./models/layout'));
app.model(require('./models/etc'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
