import React, { useState, useEffect } from 'react';
import './nav.css';

function Nav(props) {
  return (
    <nav className="NavBar">    
      <label> Filter Results:
        <select onChange={props.filter} value={props.value}>
        <option value={props.showAll}>{props.showAll}</option>
        <option value={props.showFitIssues}>{props.showFitIssues}</option>
        <option value={props.showStyleIssues}>{props.showStyleIssues}</option>
        <option value={props.showOpsAndShippingIssues}>{props.showOpsAndShippingIssues}</option>
        <option value={props.showOtherIssues}>{props.showOtherIssues}</option>
        </select>
      </label>
    </nav>
  );
};

export default Nav;
