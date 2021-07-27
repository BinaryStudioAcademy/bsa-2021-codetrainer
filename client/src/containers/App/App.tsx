import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import history from 'helpers/history.helper';
import store from 'redux/store';
import Routing from 'containers/Routing';

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Router history={history}>
				<Routing />
			</Router>
		</Provider>
	);
};

export default App;
