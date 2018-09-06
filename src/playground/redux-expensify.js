import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';


//
// ACTIONS
//
// ADD_EXPENSE
const addExpense = ({ description = '', note = '', amount = '', createdAt = new Date()} = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

//
// FILTERS
//

// SET_TEXT_FILTER
const setTextFilter = (text = "") => ({
    type: "SET_TEXT_FILTER", 
    text
});

// SORT_BY_DATE
const sortByDate = () => ({
  type: "SORT_BY_DATE",
  sortBy: "date"
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: "SORT_BY_AMOUNT",
    sortBy: "amount"
});

// SET_START_DATE
const setStartDate = (startDate = undefined) => ({
    type: 'SET_START_DATE',
    startDate
});

// SET_END_DATE
const setEndDate = (endDate = undefined) => ({
    type: 'SET_END_DATE',
    endDate
});

// Expenses reducer default state
const expensesReducerDefaultState = [];

// Creating expenses reducer
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense];

        case 'REMOVE_EXPENSE':
            return state.filter((expense) => expense.id !== action.id);

        case 'EDIT_EXPENSE':
            return state.map(expense => {
                if(action.id === expense.id) {
                    return {...expense, ...action.updates}
                    // return expense = Object.assign({}, expense, action.updates)
                } else {
                    return expense;
                }
            });

        default: 
            return state;
    }
};

// Filter reducer
// Setting up default value for filters state
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
};

// Creating filter reducer
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case "SET_TEXT_FILTER":
            return {
                ...state,
                text: action.text    
            }
        
        case "SORT_BY_DATE":
            return {
                ...state,
                sortBy: action.sortBy
            }
        
        case "SORT_BY_AMOUNT":
            return {
                ...state,
                sortBy: action.sortBy
            }

        case "SET_START_DATE": 
            return {
                ...state,
                startDate: action.startDate
            }
        
        case "SET_END_DATE": 
            return {
                ...state,
                endDate: action.endDate
            }

        default: 
            return state;
    }
};

// Setting up filter function
// Get filtered expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter(expense => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1
        } else if (sortBy === 'amount') {
            // 1 means that "b" will come first in the list
            return a.amount < b.amount ? 1 : -1
        }
    });
}


// Creating a store
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses);
});

// Adding expense
const expenseOne = store.dispatch(addExpense({
    description: 'Rent',
    amount: 30,
    createdAt: -100
}));

// Adding expense
const expenseTwo = store.dispatch(addExpense({
    description: 'Dildo',
    amount: 80,
    note: "For girlfriend",
    createdAt: 1000
}));

// // Adding expense
// const expenseThree = store.dispatch(addExpense({
//     description: 'Laptop',
//     amount: 1500,
// }));

// // Deleting expense
// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// // Editing an expense
// store.dispatch(editExpense(expenseTwo.expense.id, {
//     amount: 13
// }));

// // Editing filter text
// store.dispatch(setTextFilter('rent'));

// Editing filter text
// store.dispatch(setTextFilter(''));

// // Filtering by amount
// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// // Setting start date
// store.dispatch(setStartDate(-1000))
// store.dispatch(setStartDate())

// // Setting end date
// store.dispatch(setEndDate(99))





const demoState = {
    expenses: [{
        id: "sdsdsqdqfqfq",
        description: "January Rent",
        note: "This was the final payment",
        amount: 3234,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
};

