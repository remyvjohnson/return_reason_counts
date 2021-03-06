import React, { useState, useEffect } from 'react';
import './App.css';
import BarChart from './components/barchart/barchart.js';
import Nav from './components/nav/nav.js';

function App() {
  const [reasonCounts, setReasonCounts] = useState({});
  const [limitBy, setLimitBy] = useState(false);

  function doFetch() {
      fetch('https://api.loopreturns.com/api/v1/warehouse/return/list', {
        method: "GET",
        headers:{
            'X-Authorization': 'fef05ad27fc885f168cbc5c89b11aff106c91ee4',
        }               
      })
        .then(response => response.json())
        .then(data => {
          console.log('receiving data: ', data);

          //pass data down to getReasons to create reasons list
          const reasonsData = getReasons(data);
          //create reasons count obj by running reasonsData/getReasons as an argument
          getReasonCounts(reasonsData);
        });    
  }


  function getReasons(data){
    let reasonList = [];

    for (let info of data) {
      for (let item of info.line_items ) {
        if (!(item.return_reason in reasonList)){
          reasonList.push(item.return_reason);
        };
      };
    }
    //return reasonList so getReasonCounts can use it (see below)
    return reasonList
  }
  

  function getReasonCounts(reasonList){
    let newReasonCounts = {};

    for (let reason of reasonList) {
      newReasonCounts[reason] = newReasonCounts[reason] ? newReasonCounts[reason] + 1 : 1;
    };
    
    //doesn't get set until a render happens
    setReasonCounts(newReasonCounts);
    console.log('reasons counts', reasonCounts);
    // return newReasonCounts
  }


  function onLimitByChange(ev) {
    const value = ev.target.value;
    console.log('onLimitByChange', value);
    if (value === 'all') {
      setLimitBy(false); // if "all" is selected, set to false
    } else { // otherwise, just set with value
      setLimitBy(value);
    }
  }

  console.log('getting to useEffects')
  useEffect(doFetch, []);


  function isRelevantReason(reason) {
    if(limitBy === "Fit Issues") {
      return reason === "Body Too Big" || reason === "Body Too Small" || reason === "Size - Too Small"
      || reason === "Size - Too Large" || reason === "Body Too Long" || reason === "Body Too Short"
      || reason === "Sleeve Too Long" || reason === "Sleeve Too Short" || reason === "Sleeve Too Tight"
      || reason === "Sleeve Too Big" || reason === "Neckline Too High" || reason === "Neckline Too Low"
      || reason === "Not Bra-Friendly" || reason === "Pocket Placement" || reason === "Too Big In Waist"
      || reason === "Too Small In Waist" || reason === "Too Big In Leg" || reason === "Too Small In Leg"
      || reason === "Length Too Long" || reason === "Length Too Short" || reason === "Too Wide" || reason === "Too Narrow"
    }
    if(limitBy === "Style Issues") {
      return reason === "Style" || reason === "Color" || reason === "Quality Didn't Match Price"
      || reason === "Changed My Mind" || reason === "Inaccurate Website Description"
    }
    if(limitBy === "Operations and Shipping Issues") {
      return reason === "Product Damaged, but Shipping Box Intact" || reason === "Product and Shipping Box Both Damaged"
      || reason === "Item Arrived Too Late" || reason === "Wrong Item Sent" || reason === "Received Extra Item I Didn't Purchase (No Refund Needed)"
    }
    if(limitBy === "Other Issues") {
      return reason === "Purchased Multiple Sizes" || reason === "Found Better Price" || reason === "Ordered Wrong Item"
      || reason === "Unauthorized Purchase"
    } else {
      return true
    }
  }


  return (
    <div className="GridContainer">
      <Nav 
        filter = {onLimitByChange}
        value = {limitBy}
        showAll = "all"
        showFitIssues = "Fit Issues"
        showStyleIssues = "Style Issues"
        showOpsAndShippingIssues = "Operations and Shipping Issues"
        showOtherIssues = "Other Issues"
      />

      <BarChart
        dropDownValue = {limitBy}
        fitIssuesTitle = "Return Reasons with Fit Issues"
        styleIssuesTitle = "Return Reasons with Style Issues"
        opsAndShippingIssuesTitle = "Return Reasons with Operations and Shipping Issues"
        otherIssuesTitle = "Other Return Reasons"
        allIssuesTitle = "All Return Reasons"
        reasonCounts = {reasonCounts}
        isRelevantReason = {isRelevantReason}
      />
      
    
    </div>
  );
};

export default App;
