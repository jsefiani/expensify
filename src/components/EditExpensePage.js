import React from 'react';
import {connect} from 'react-redux';

import ExpenseForm from '../components/ExpenseForm';

// Import actions
import { removeExpense, editExpense } from "../actions/expensesActions";

export class EditExpensePage extends React.Component {

    constructor(props) {
        super(props);
    }

    onSubmit = (expense) => {
        this.props.editExpense(this.props.expense.id, expense)
        this.props.history.push('/')
    }

    onRemoveExpense = () => {
        // this.props.dispatch(removeExpense({ id: this.props.expense.id }))
        this.props.removeExpense({id: this.props.expense.id})
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <ExpenseForm
                    expense={this.props.expense}
                    buttonText="Save Expense"
                    onSubmit={this.onSubmit}
                />
                <button onClick={this.onRemoveExpense}>
                    Remove Expense
                </button>
            </div>
        );
    }
}

// Get access to the right expense 
const mapStateToProps = (state, props) => ({
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
})

const mapDispatchToProps = (dispatch, props) => {
    return {
        editExpense: (id, expense) => dispatch(editExpense(id, expense)),
        removeExpense: id => dispatch(removeExpense(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);