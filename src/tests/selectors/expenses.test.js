import selectExpenses from '../../selectors/expenses';
import moment from 'moment';

// Importing test data
import expenses from '../fixtures/expenses';


// Text filter
test('Should filter by text value', () => {
    const filters = {
        text: "e",
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([
        expenses[2],
        expenses[1]
    ])
});

// Start date filter
test("Should filter by start date", () => {
    const filters = {
        text: "",
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    }

    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([
        expenses[2],
        expenses[0]
    ])
});

// End date filter
test("Should filter by end date", () => {
    const filters = {
        text: "",
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0)
    }

    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([
        expenses[0],
        expenses[1]
    ])
});

// Sort by date
test('Should filter by date', () => {
    const filters = {
        text: "",
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([
        expenses[2],
        expenses[0],
        expenses[1]
    ])
});

// Sort by amount
test('Should filter by amount', () => {
    const filters = {
        text: "",
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([
        expenses[1],
        expenses[2],
        expenses[0]
    ])
});