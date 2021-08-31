import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import history from 'helpers/history.helper';
import store from 'redux/store';
import Routing from 'containers/routing';
import { NotificationContainer } from '../notification';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyA8hTXhq8wzWikJrcHjmiXdd7BmlKbzvoE',
	authDomain: 'codetr.firebaseapp.com',
	projectId: 'codetr',
	storageBucket: 'codetr.appspot.com',
	messagingSenderId: '357129737103',
	appId: '1:357129737103:web:ada61c15b35d5252ff71fa',
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
