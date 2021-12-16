import React, {Component} from 'react'
import ReactDOM from 'react-dom'
export default function App (){
        const actualPageMarkup = (              
            <h3>Diamond Search</h3> 
        );
        return(
            <div>{actualPageMarkup}</div>
        );
}
if (document.getElementById("search-main")) {
    ReactDOM.render(<App />, document.getElementById("search-main"));
}