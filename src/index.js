import dva from 'dva';
import './index.css';
import { browserHistory } from 'dva/router';
import createLoding from 'dva-loading';
import { message } from 'antd';


// 1. Initialize
const app = dva({
	history: browserHistory,
 	onError (error) {
    message.error(error.message)
  },
});

// 2. Plugins
app.use(createLoding());

// 3. Model
app.model(require('./models/layout'))

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
