import React from 'react';

// Importing component
import ExpenseListItem from './ExpenseListItem';

// Connect method for connecting component to Redux store
import { connect } from "react-redux";

// Importing filter function
import selectExpenses from '../selectors/expenses';

// Unconnected component
export const ExpenseList = (props) => (
    <div>
        {
            props.expenses.length === 0 ? (
                <p>No expenses found</p>
            ):(
                props.expenses.map(expense => {
                    return (
                        <ExpenseListItem key={expense.id} {...expense} />
                    )
                })
            )
        }
    </div>
);

// Getting data from store
const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    };
};

// Connecting component to Redux store
export default connect(mapStateToProps)(ExpenseList);
