import ReactDOM from 'react-dom';
import React from "react";
import 'rc-tooltip/assets/bootstrap.css';
import 'react-tabs/style/react-tabs.css';
import 'rc-slider/assets/index.css';
const HOME_URL =window.home_url;

export default function DiamondProduct() {
    return (
        <div>
        </div>
    );
}
if (document.getElementById('searchProduct')) {
    ReactDOM.render(<DiamondProduct />, document.getElementById('searchProduct'));
};