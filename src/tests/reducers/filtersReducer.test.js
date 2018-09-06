import filtersReducer from "../../reducers/filtersReducer";
import moment from 'moment';

test('Should setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
});

// Sort by amount reducer
test('Should set sortBy to amount', () => {
    const state = filtersReducer(undefined, {
      type: "SORT_BY_AMOUNT",
      sortBy: "amount"
    });
    expect(state.sortBy).toBe('amount')
});

// Sort by date reducer
test('Should set sortBy to date', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    }
    const action = {
        type: 'SORT_BY_DATE',
        sortBy: 'date'
    }
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('date')
});

// Text filter reducer
test('Should set text filter', () => {
    const action = {
        type: "SET_TEXT_FILTER",
        text: "Some text"
    }
    const state = filtersReducer(undefined, action)
    expect(state).toEqual({
        ...state,
        text: "Some text"
    });
}) 

// Should set startDate filter
test('Should set start date filter', () => {
    const startDate = moment();
    const state = filtersReducer(undefined, { type: "SET_START_DATE", startDate });
    expect(state.startDate).toBe(startDate)
});

// Should set endDate filter
test('Should set end date filter', () => {
    const endDate = moment();
    const state = filtersReducer(undefined, { type: "SET_END_DATE", endDate });
    expect(state.endDate).toBe(endDate)
});