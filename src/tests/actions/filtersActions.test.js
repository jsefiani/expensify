import { 
    setTextFilter, 
    setEndDate, 
    setStartDate, 
    sortByAmount, 
    sortByDate 
} from "../../actions/filtersActions";
import moment from 'moment';

// setStartDate action
test('Should generate set start date action object', () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    })
});

// setEndDate action
test('Should generate set end date action object', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    })
});

// setTextFiler action
test('Should generate set text filter action object with provided value', () => {
    const action = setTextFilter("Water bill")
    expect(action).toEqual({
        type: "SET_TEXT_FILTER",
        text: "Water bill"
    })
});

test('Should generate set text filter action object with default value', () => {
    const action = setTextFilter()
    expect(action).toEqual({
        type: "SET_TEXT_FILTER",
        text: ""
    })
});

// sortByAmount action
test("Should generate sort by amount action object", () => {
    const action = sortByAmount();
    expect(action).toEqual({
        type: "SORT_BY_AMOUNT",
        sortBy: "amount"
    })
});

// sortByDate action
test("Should generate sort by amount action object ", () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: "SORT_BY_DATE",
        sortBy: "date"
    })
});