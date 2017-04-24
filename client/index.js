import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import promise from "redux-promise-middleware"
import logger from "redux-logger"
import thunk from "redux-thunk"
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import rootReducer from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import flashMessages from './reducers/flashMessages';


const middleware = applyMiddleware(logger, thunk, promise())

const store = createStore(rootReducer, composeWithDevTools(middleware))

ReactDOM.render(
	<Provider store={store}>
		<Router history={createBrowserHistory()}>
			<div>
				<Route exact path='/' component={() => (
					<App>
						<Greetings />
					</App>
				)} />
				<Route exact path='/signup' component={() => (
					<App>
						<SignupPage />
					</App>
				)} />
			</div>
		</Router>
	</Provider>
	,document.getElementById('app')
)

