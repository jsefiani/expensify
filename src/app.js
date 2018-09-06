import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import AppRouter from './routers/AppRouter';
import { addExpense } from './actions/expensesActions';
import { setTextFilter } from "./actions/filtersActions";
import getVisibleExpenses from "./selectors/expenses";

import 'normalize.css/normalize.css';
import './styles/styles.scss';
// Importing styles datepicker
import 'react-dates/lib/css/_datepicker.css';

// Import Redux store
import configureStore from './store/configureStore';

// Configure state
const store = configureStore();

store.subscribe(() => {
    const state = store.getState();
    const getFilteredExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(getFilteredExpenses);
})

store.dispatch(addExpense({
    description: "Dildo",
    amount: 10,
    note: "Bought dildo for my girlfriend's birthday"
}));

store.dispatch(addExpense({
    description: "House",
    amount: 100000,
}));

store.dispatch(addExpense({
    description: "Bought new car",
    amount: 40000,
    note: "I stole this car lol",
    createdAt: 100
}));

store.dispatch(addExpense({
    description: "Bought laptop",
    amount: 4000,
}));



// Provider will provide store to all the components of our application
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);



ReactDOM.render(jsx, document.getElementById('app'));

