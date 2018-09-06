import React from 'react';
import { connect } from 'react-redux';
import { addExpense } from '../actions/expensesActions'
import ExpenseForm from './ExpenseForm';

export class AddExpensePage extends React.Component {
    constructor(props) {
        super(props);
    }

    onSubmit = (expense) => {
        //Add returned expense object to the store 
        // props.dispatch(addExpense(expense))
        this.props.addExpense(expense);
        // Redirect user to dashboard
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h1>Add expense</h1>
                <ExpenseForm
                    buttonText="Add Expense"
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addExpense: (expense) => dispatch(addExpense(expense))
    }
}

export default connect(undefined, mapDispatchToProps)(AddExpensePage);