import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import history from 'helpers/history.helper';
import store from 'redux/store';
import Routing from 'containers/routing';
import { NotificationContainer } from '../notification';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
};
export const app = initializeApp(firebaseConfig);

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Router history={history}>
				<Routing />
				<NotificationContainer />
			</Router>
		</Provider>
	);
};

export default App;
