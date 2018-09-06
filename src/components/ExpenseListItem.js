import React from 'react';
import moment from 'moment';

import { Link } from 'react-router-dom';

const ExpenseListItem = ({ description, amount, createdAt, id}) => {
    return (
        <div>
            <Link to={`/edit/${id}`}><h3>{description}</h3></Link>
            <h4>{amount} - {moment(createdAt).format("MMMM Do, YYYY")}</h4>
        </div>
    );
}

export default ExpenseListItem;