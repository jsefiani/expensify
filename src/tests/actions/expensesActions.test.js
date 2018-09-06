import { addExpense, editExpense, removeExpense } from '../../actions/expensesActions';

// RemoveExpense fn
test('Should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: "123abc"
    })
});

// EditExpense fn
test('Should setup edit expense action object', () => {
    const action = editExpense("123abc", {amount: 20});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: "123abc",
        updates: {amount: 20}
    })
})

// AddExpense
test('Should setup add expense action object with provided values', () => {
    const action = addExpense({ description: "Water bill", note: "Expensive...", amount: 300, createdAt: 1000 })
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: "Water bill",
            note: "Expensive...",
            amount: 300, 
            createdAt: 1000
        }
    })
})

test('Should setup add expense action object with default values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            amount: 0,
            createdAt: 0,
            description: "",
            note: ""
        }
    })
});
