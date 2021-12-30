import ReactDOM from 'react-dom';
import React from "react";
import 'rc-tooltip/assets/bootstrap.css';
import 'react-tabs/style/react-tabs.css';
import 'rc-slider/assets/index.css';
const HOME_URL =window.home_url;
export default function ProductCart() {
    const AddCart = async (diamond_id) => {
        var req = {
            "diamond_id":diamond_id
        };
        const url = HOME_URL+'backend/add-cart';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'*','Access-Control-Allow-Methods':'*'},
            body: JSON.stringify(req),
        };
        try {
            const response = await fetch(url, requestOptions) 
            var product_id=await response.json();
            console.log("--"+product_id);
                let formData = {
                'items': [{
                 'id': product_id,
                 'quantity':1
                 }]
                };             
                fetch('/cart/add.js', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                .then(r => {
                    console.log(formData+"Success:"+r);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
               
        } catch (err) {
            console.log('error: ', err);
        }
    }
    return (
        <a className="add-to-bag " onClick={() => AddCart(diamond_id)} >Add To Shopping Bag</a>
    );
}
if (document.getElementById('add-to-cart')) {
    ReactDOM.render(<ProductCart />, document.getElementById('add-to-cart'));
};