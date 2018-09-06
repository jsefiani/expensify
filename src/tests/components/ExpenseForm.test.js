import React from 'react';
import { shallow } from "enzyme";
import ExpenseForm from '../../components/ExpenseForm';
import expenses from "../fixtures/expenses";
import moment from 'moment';

test('Should render expense form correctly', () => {
    const wrapper = shallow(<ExpenseForm />)
    expect(wrapper).toMatchSnapshot();
});

test('Should render expense form with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]}/>)
    expect(wrapper).toMatchSnapshot();
});

test('Should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />)
    //Submit form
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });
    expect(wrapper.state("error").length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('Should set description on input change', () => {
    const value = 'New description';
    const wrapper = shallow(<ExpenseForm />)
    // Target 1st input (description)
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('description')).toBe(value);
    expect(wrapper).toMatchSnapshot();
});

test('Should set note on textarea change', () => {
    const value = "New note";
    const wrapper = shallow(<ExpenseForm />)
    // Target textarea
    wrapper.find('textarea').simulate('change', {
        target: { value }
    });
    expect(wrapper.state('note')).toBe(value);
    expect(wrapper).toMatchSnapshot();
});

test('Should set amount if valid input', () => {
    const value = "23.50"
    const wrapper = shallow(<ExpenseForm />)
    // Target amount input
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe(value);
    expect(wrapper).toMatchSnapshot();
});

test('Should not set amount if invalid input', () => {
    const value = "22.222";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe("");
    expect(wrapper).toMatchSnapshot();
});

test('Should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>)
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt,
    })
});

test('Should set new date on date change', () => {
    // Create a moment instance
    const now = moment();
    // Render component
    const wrapper = shallow(<ExpenseForm />);
    // We need to read the props from the SingleDatePicker component
    wrapper.find('SingleDatePicker').prop('onDateChange')(now)
    expect(wrapper.state('createdAt')).toEqual(now)
});

test('Should set calendar focus on change', () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("SingleDatePicker").prop("onFocusChange")({focused: true})
    expect(wrapper.state('calendarFocused')).toEqual(true);
});