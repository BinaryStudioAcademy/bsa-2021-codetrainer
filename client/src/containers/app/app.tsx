import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import history from 'helpers/history.helper';
import store from 'redux/store';
import Routing from 'containers/routing';
import { NotificationContainer } from '../notification';
import { ToastProvider } from 'react-toast-notifications';

const App: React.FC = () => {
	return (
		<ToastProvider>
			<Provider store={store}>
				<Router history={history}>
					<Routing />
					<NotificationContainer />
				</Router>
			</Provider>
		</ToastProvider>
	);
};

export default App;
