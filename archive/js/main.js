let state = [{}];

function doFetch() {
    fetch('https://api.loopreturns.com/api/v1/warehouse/return/list', {
        method: "GET",
        headers:{
            'X-Authorization': 'fef05ad27fc885f168cbc5c89b11aff106c91ee4',
        }               
    })
        .then(response => response.json())
        .then(data => {
        console.log('api working');
        state = data;
        console.log(state);

        render();
        });
}


function render() {
    //get reasons from data and create an array
    let reasons = [];
    let reasonCounts = {};  
    
    for (let info of state) {
        if (!(info.line_items[0].return_reason in reasons)){
            reasons.push(info.line_items[0].return_reason);
        }
    }

    //loop through reasons and create reasonCounts object
    for (let reason of reasons) {
        reasonCounts[reason] = reasonCounts[reason] ? reasonCounts[reason] + 1 : 1;
    }
    console.log('reasonCounts is: ',reasonCounts); 

    // Fetch the div from the page
    let countsOutputDiv = document.querySelector('.output');
    // Clear anything that might be in the div
    countsOutputDiv.innerHTML = '';

    // calc highest return count for chart width
    let countArray = Object.values(reasonCounts);
    let highest = Math.max(...countArray);
    console.log('highest is: ', highest);

    //loop through reasonCounts object and create variables for reasons and respective counts
    for (let returnReason of Object.keys(reasonCounts)){
        let retReason = returnReason;
        let returnCount = reasonCounts[returnReason];
        // console.log('return reason is: ', retReason, 'return count is: ', returnCount);

        let countsDiv = document.createElement('div');

        countsDiv.classList.add('bars');
        countsDiv.textContent = retReason + ': ' + returnCount;

        // Make width proportional to highest count
        // let fractionalreturnCount = returnCount / highest;
        // countsDiv.style.width = fractionalreturnCount * 800 + 'px';
        countsDiv.style.width = returnCount * 100 + 'px';

        countsOutputDiv.appendChild(countsDiv);
    }    
}

doFetch();
