import React, { useState, useEffect } from 'react';
import './barchart.css';

function BarChart(props) {

  return (
    <div className="MainContent">
      <div className="BarChart-title">
        {
          props.dropDownValue === "Fit Issues" ? (
            <h1>{props.fitIssuesTitle}</h1> 
          )
          : props.dropDownValue === "Style Issues" ? (
            <h1>{props.styleIssuesTitle}</h1> 
          )
          : props.dropDownValue === "Operations and Shipping Issues" ? (
            <h1>{props.opsAndShippingIssuesTitle}</h1> 
          )
          : props.dropDownValue === "Other Issues" ? (
            <h1>{props.otherIssuesTitle}</h1> 
          ) :
            <h1>{props.allIssuesTitle}</h1> 
        }
      </div>


      <div className="BarChart">
      <br></br>
        {
            Object.entries(props.reasonCounts).sort((a,b) => b[1]-a[1])
            .filter(([reason, count]) => props.isRelevantReason(reason))                
            .map(([reason, count]) => (
              <div className="BarChart-bars" style={{height: (count * 40) + "px"}}>
              {reason}: {count}
              </div>
            ))
        }
      </div>
    </div>
    
  );
};

export default BarChart;
