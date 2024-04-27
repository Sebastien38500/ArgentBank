import { title } from "process";
import "./AccountWrapper.scss";
import React from "react";
import PropTypes from 'prop-types';
function AccountWrap({title, amount, description, buttonText}) {
    return (
        <>
        <div className="account-content-wrapper">
            <h3 className="account-title">{title}</h3>
            <p className="account-amount">{amount}</p>
            <p className="account-amount-description">{description}</p>
        </div>
        <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
        </div>

</>
    )
}

AccountWrap.propTypes = {
    title: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    
  };
export default AccountWrap;