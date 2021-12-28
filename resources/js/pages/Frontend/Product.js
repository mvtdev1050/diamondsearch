import ReactDOM from 'react-dom';
import React from "react";
import 'rc-tooltip/assets/bootstrap.css';
import 'react-tabs/style/react-tabs.css';
import 'rc-slider/assets/index.css';
const HOME_URL =window.home_url;

export default function DiamondProduct() {
    return (
        <div className='serch-outer diamond-product'>  
            <div className='cust-container'>
                <div className="product-page">
                    <div className="product-info">
                    <h4 class="page-title title">1.2ct M Color, SI2 Clarity, Round Diamond</h4>
                    <p class="short-info">1.2 Carat,  M Color, SI2 Clarity, Round shaped diamond</p>
                    <div class="diamond-details">
                    <div class="left">
                        <ul>
                            <li><strong> Carat weight </strong>: 1.2</li>
                            <li><strong>Shape</strong> : Round</li>
                            <li><strong>Color</strong> : M</li>
                            <li> <strong> Clarity</strong>: SI2</li>
                            <li><strong> Symmetry </strong>: VG</li>
                            <li><strong>Polish</strong>: VG </li>
                            <li><strong>Fluorescence</strong>: Faint </li>
                        </ul>
                    </div>
                    <div class="right">
                        <ul>
                            <li> <strong>Measurements </strong>: 6.66-6.71x4.22</li>
                            <li><strong> Table </strong>: 60%</li>
                            <li><strong> Depth </strong>: 63.1%</li>
                            <li><strong> Lab </strong>: N/A</li>
                            <li><strong> Report# </strong>: </li>
                            <li><strong> Stock Number </strong>: Y2480</li>
                        </ul>
                    </div>
                </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
if (document.getElementById('searchProduct')) {
    ReactDOM.render(<DiamondProduct />, document.getElementById('searchProduct'));
};