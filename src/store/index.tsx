import {
  createStore, compose, applyMiddleware, combineReducers,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import flights, { sagaWatcher } from './flights';

const saga = createSagaMiddleware();

const rootReducer = combineReducers({
  flights,
});

export const composeEnhancers = (window && (window as any)
  .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(saga),
  ),
);

saga.run(sagaWatcher);
