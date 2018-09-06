import React from 'react';

// Importing components
import ExpenseList from './ExpenseList';
import ExpenseListFilters from '../components/ExpenseListFilters';

const ExpenseDashboardPage = () => (
    <div>
        <ExpenseListFilters />
        <ExpenseList />
    </div>
);

export default ExpenseDashboardPage;