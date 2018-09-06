import React from 'react';

// Package for displaying dates
import moment from 'moment';

// Import datepicker 
import { SingleDatePicker } from "react-dates";



class ExpenseForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: "",
            buttonText: props.buttonText
        }
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({
            description
        }))
    }

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({
            note
        }))
    }

    onAmountChange = (e) => {
        const amount = e.target.value;
        // Regular expression for only allowing numbers from 1 to infinity
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({
                amount
            }))
        }
    }

    onDateChange = (createdAt) => {
        if(createdAt) {
            this.setState(() => ({
                createdAt
            }))
        }
    }

    onFocusChange = ({ focused }) => {
        this.setState(() => ({
            calendarFocused: focused
        }));
    }

    onSubmit = (e) => {
        e.preventDefault();

        if(!this.state.description || !this.state.amount) {
            // Set error to "Please provide description and amount"
            this.setState(() => ({
                error: "Please provide a description and an amount"
            }));
        } else {
            this.setState(() => ({
                error: ""
            }));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(), // To get the unix timestamp
                note: this.state.note
            })
        }
    }
    
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="text"
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input 
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker 
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <textarea
                        placeholder="Add a note for your expense (optional)"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    >
                    </textarea>
                    <button>{this.state.buttonText}</button>
                </form>
            </div>
        )
    }
}

export default ExpenseForm;