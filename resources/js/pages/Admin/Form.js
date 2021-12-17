import ReactDOM from 'react-dom';
import React, { useCallback, useRef, useState } from "react";
import {
    AppProvider, DescriptionList,  Card, TextField, ColorPicker, Select, Button, hsbToRgb, rgbToHsb, rgbString, FormLayout, Modal, PageActions, Layout, Loading, Page
} from "@shopify/polaris";
import enTranslations from '@shopify/polaris/locales/en.json';
import {Provider, TitleBar} from '@shopify/app-bridge-react';
const ShopifyAdmin = { r: 28, g: 34, b: 96 };
const MINIMUM_DIFFERENCE = 100;
const HOME_URL =window.home_url;
const API_KEY =window.api_key;
const STORE_ID=window.store_id;
const STORE_NAME=window.storename;
import {ToastContainer} from 'react-toastify';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Form() {
    const config = {apiKey: API_KEY, host: btoa(STORE_NAME)};
    if (window.size){var size=window.size;} else{var size='14px';}
    if (window.option){var option=window.option;} else{var option='login';}
    if (window.color){var col=window.color;} else{var col='rgba(0,0,0,1)';}
    const [sizeValue, setSizeValue] = useState(size);
    const [priceOption, setPriceOption] = useState(option);
    const rgbVal = col.replace(/[^\d*.?\d*,]/g, "").split(","); 
    const [color, setColor] = useState(
        rgbToHsb({
            red: rgbVal[0],
            green: rgbVal[1],
            blue: rgbVal[2],
            alpha: rgbVal[3]
        })
     );
    const handlePriceOptionChange = (value) => {
        setPriceOption(value);
    }
    const handleSizeChange = (value) => {
        setSizeValue(value);
    }

    const handleRgbChange = (value) => {
        const rgbValues = value.replace(/[^\d*.?\d*,]/g, "").split(",");
        const color = rgbToHsb({
            red: rgbValues[0],
            green: rgbValues[1],
            blue: rgbValues[2],
            alpha: rgbValues[3]
        });
        setState({ color });
    }

    const rgbaColor = rgbString(hsbToRgb(color));
    const divStyle = {
        width: "60px",
        height: "20px",
        backgroundColor: rgbaColor,
        borderRadius: "3px 3px 3px 3px"
    };
    const columnOptions = [
        { label: 'Select Any Option', value: '' },
        { label: 'Login For Price', value: 'login' },
        { label: 'Call Now', value: 'call' },
        { label: 'View Product', value: 'view' },
    ];
    const sizeOptions = [
        { label: 'Select Any Option', value: '' },
        { label: '12px', value: '12px' },
        { label: '13px', value: '13px' },
        { label: '14px', value: '14px' },
        { label: '15px', value: '15px' },
        { label: '16px', value: '16px' },
        { label: '17px', value: '17px' },
        { label: '18px', value: '18px' },
    ];
    const { hue, brightness, saturation } = color;
    const rgb = hsbToRgb(hue / 360, saturation, brightness);
    const { r, g, b } = rgb;
    const hex = rgbToHex(r, g, b);
    const diff = calcColorDifference(ShopifyAdmin, rgb);
    const isOkay = isColorOkay(diff);

    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    function calcColorDifference(c1, c2) {
        return Math.sqrt(
            Math.pow(c2.r - c1.r, 2) +
            Math.pow(c2.g - c1.g, 2) +
            Math.pow(c2.b - c1.b, 2)
        );
    }
    function isColorOkay(colorDiff) {
        return colorDiff > MINIMUM_DIFFERENCE;
    }
    const handleFieldSubmit = () => {
        var data = {
            store_id: STORE_ID,
            font_size: sizeValue,
            color: rgbaColor,
            column_option: priceOption,

        }
        const url = HOME_URL+'backend/save-setting';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };
        fetch(url, requestOptions)
            .then(toast.success("Settings Saved Successfully"))
            .catch(console.log("error"))
    }
    const submitAction = {
        content: "Submit",
        onAction: handleFieldSubmit,
    };

    const actualPageMarkup = (
        <div className="form">
            <Page title="Settings">
                <Layout>                  
                    <Card sectioned>
                            <FormLayout>
                                <FormLayout.Group>
                                    <Select
                                        label=" Font size :"
                                        required="true"
                                        name="size"
                                        value={sizeValue}
                                        options={sizeOptions}
                                        onChange={handleSizeChange}
                                    />
                                     <Select
                                        label="Price Column Option:"
                                        required="true"
                                        name="option"
                                        options={columnOptions}
                                        onChange={handlePriceOptionChange}
                                        value={priceOption}

                                    />
                                </FormLayout.Group>
                                <FormLayout >
                                    <p style={{ padding: '20px 0px 0px 0px' }}> Color Picker for search page </p>
                                    <ColorPicker
                                        onChange={setColor}
                                        color={color}
                                        allowAlpha
                                    />
                                </FormLayout>
                                <FormLayout.Group>
                                    <DescriptionList
                                        items={[
                                            {
                                                term: "Color",
                                                description: (
                                                    <TextField
                                                        label="Color"
                                                        labelHidden
                                                        onChange={() => handleRgbChange}
                                                        value={rgbaColor}
                                                        prefix={<div style={divStyle} />}
                                                    />
                                                )
                                            }
                                        ]}
                                    />
                                </FormLayout.Group>
                            </FormLayout>
                            <ToastContainer autoClose={5000}  />
                     </Card>
                    <Layout.Section>
                        <PageActions primaryAction={submitAction} />
                    </Layout.Section>
                </Layout>
            </Page>
        </div>
    );
    return (
        <Provider config={config} >
            <TitleBar title=""/>
            <div className="style-form"> {actualPageMarkup} </div>
        </Provider>
    );
}
if (document.getElementById('layout-form')) {
    ReactDOM.render(<AppProvider i18n={enTranslations}> <Form /> </AppProvider>, document.getElementById('layout-form'));
}

