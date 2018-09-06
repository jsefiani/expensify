import React from 'react';
import { shallow } from "enzyme";
// Test data
import expenses from "../fixtures/expenses";
// Importing component
import { EditExpensePage } from "../../components/EditExpensePage";

let editExpense, removeExpense, wrapper, history;
beforeEach(() => {
    editExpense = jest.fn();
    removeExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<EditExpensePage
        history={history}
        editExpense={editExpense}
        removeExpense={removeExpense}
        expense={expenses[1]}
    />);
})

test('Should render EditExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should handle editExpense', () => {
    wrapper.find("ExpenseForm").prop("onSubmit")(expenses[1]);
    // What should have happened?
    expect(history.push).toHaveBeenLastCalledWith("/");
    expect(editExpense).toHaveBeenLastCalledWith(expenses[1].id, expenses[1]); 
});

test('Should handle removeExpense', () => {
    wrapper.find("button").prop("onClick")();
    // What should have happened?
    expect(history.push).toHaveBeenCalledWith('/');
    expect(removeExpense).toHaveBeenCalledWith({id: expenses[1].id})
});