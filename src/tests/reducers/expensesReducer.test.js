import expensesReducer from "../../reducers/expensesReducer";

// Importing test data
import expenses from '../fixtures/expenses';

test("Should set default state", () => {
    const state = expensesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
});

// Remove expense reducer
test('Should remove expense by ID', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([
        expenses[0],
        expenses[2]
    ])
});

test('Should not remove expense if ID wasn\'t found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses)
});

// Adding expense reducer
test('Should add an expense', () => {
    const expense = {
        id: "109",
        description: "Gas bill",
        note: '',
        createdAt: 20000,
        amount: 29500
    }
    const action = {
        type: 'ADD_EXPENSE',
        expense
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([
        ...expenses,
        expense
    ])
})


// Edit expense reducer
test('Should edit an expense', () => {
    const amount = 122000
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: {
            amount
        }
    }
    const state = expensesReducer(expenses, action);
    expect(state[1].amount).toBe(amount)
});

test('Should not edit an expense if not found', () => {
    const amount = 122000
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-98',
        updates: {
            amount
        }
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses)
});

