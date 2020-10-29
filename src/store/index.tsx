import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import flights, {sagaWatcher}  from './flights';


const saga = createSagaMiddleware();

const rootReducer = combineReducers({
  flights
});

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(saga),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
);

saga.run(sagaWatcher);
