import dva from 'dva';
import './index.css';
import { browserHistory } from 'dva/router';
import createLoding from 'dva-loading'

// 1. Initialize
const app = dva({
	history: browserHistory
	});

// 2. Plugins
app.use(createLoding());

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
