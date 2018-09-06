import { createStore, combineReducers } from 'redux';

// Import reducers
import expensesReducer from '../reducers/expensesReducer';
import filtersReducer from '../reducers/filtersReducer';


export default () => {
    // Creating a store
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
};