import React from 'react';
import { shallow } from "enzyme";
import { filters, altFilters } from '../fixtures/filters';
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import moment from 'moment';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

// This fn will be called before each test
beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setEndDate = jest.fn();
    setStartDate = jest.fn();
    wrapper = shallow(<ExpenseListFilters 
        filters={filters}
        setTextFilter={setTextFilter}
        sortByAmount={sortByAmount}
        sortByDate={sortByDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
    />)
})

test('Should render filtered expense list correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should render filtered expense list with alt data correctly', () => {
    // Pass altFilters to ExpenseListFilters component by using setProps()
    expect(wrapper.setProps({filters: altFilters})).toMatchSnapshot();
});

test('Should handle text change', () => {
    const value = 'rent';
    wrapper.find('input').simulate('change', {
        target: {
            value
        }
    })
    expect(setTextFilter).toHaveBeenLastCalledWith(value)
})

test('Should sort by date', () => {
    // Change sortBy to amount
    expect(wrapper.setProps({ filters: altFilters })).toMatchSnapshot();
    const value = 'date';
    wrapper.find('select').simulate('change', {
        target: {value}
    })
    expect(sortByDate).toHaveBeenCalled();
})

test('Should sort by amount', () => {
    const value = 'amount';
    wrapper.find('select').simulate('change', {
        target: { value }
    })
    expect(sortByAmount).toHaveBeenCalled();
})

test('Should handle date change', () => {
    const startDate = moment(0).add(4, 'years');
    const endDate = moment(0).add(8, 'years');
    wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate })
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
})

test('Should handle date focus changes', () => {
    const calendarFocused = 'endDate'
    wrapper.find('DateRangePicker').prop('onFocusChange')( calendarFocused )
    expect(wrapper.state("calendarFocused")).toBe(calendarFocused);
})
