import React from 'react';
import { connect } from 'react-redux';
// Import datepicker 
import { DateRangePicker} from "react-dates";

// Import actions
import { 
    setTextFilter, 
    sortByAmount, 
    sortByDate,
    setStartDate, 
    setEndDate 
} from "../actions/filtersActions";


export class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    }

    onDatesChange = ({startDate, endDate}) => {
        this.props.setStartDate(startDate)
        this.props.setEndDate(endDate)
    }

    onFocusChange = (calendarFocused) => {
        this.setState(() => ({
            calendarFocused
        }))
    }

    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    }

    onFilterChange = (e) => {
        if (e.target.value === "date") {
            this.props.sortByDate()
        } else if (e.target.value === "amount") {
            this.props.sortByAmount();
        }
    }

    render() {
        return (
            <div>
                <input
                    value={this.props.filters.text}
                    onChange={this.onTextChange}
                    type="text"
                />
                <select
                    value={this.props.filters.sortBy}
                    onChange={this.onFilterChange}
                >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker
                    startDate={this.props.filters.startDate}
                    endDate={this.props.filters.endDate}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    isOutsideRange={() => false} // Be able to choose past dates
                    numberOfMonths={1}
                    showClearDates={true} // Clear dates
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => {
    return {
        setTextFilter: (text) => dispatch(setTextFilter(text)),
        sortByDate: () => dispatch(sortByDate()),
        sortByAmount: () => dispatch(sortByAmount()),
        setStartDate: (startDate) => dispatch(setStartDate(startDate)),
        setEndDate: (endDate) => dispatch(setEndDate(endDate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);

