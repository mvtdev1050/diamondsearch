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
    if (window.family){var family=window.family;} else{var family='Arial Sans-Serif';}
    if (window.size){var size=window.size;} else{var size='14';}
    if (window.weight){var weight=window.weight;} else{var weight='600';}
    if (window.option){var option=window.option;} else{var option='Login';}
    if (window.color){var col=window.color;} else{var col='rgba(1,1,1,1)';}
    const [fontFamilyValue, setFontFamilyValue] = useState(family);
    const [sizeValue, setSizeValue] = useState(size);
    const [weightValue, setWeightValue] = useState(weight);
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
    const handleWeightChange = (value) => {
        setWeightValue(value);
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

    const handleFamilyChange = (value) => {
        setFontFamilyValue(value);
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
        { label: 'Login Button', value: 'Login' },
        { label: 'Call', value: 'Call' },
        { label: 'View Product', value: 'View Product' },
    ];
    const sizeOptions = [
        { label: 'Select Any Option', value: '' },
        { label: '10', value: '10' },
        { label: '12', value: '12' },
        { label: '14', value: '14' },
        { label: '16', value: '16' },
        { label: '18', value: '18' },
        { label: '20', value: '20' },
    ];
    const weightOptions = [
        { label: 'Select Any Option', value: '' },
        { label: '100', value: '100' },
        { label: '200', value: '200' },
        { label: '300', value: '300' },
        { label: '400', value: '400' },
        { label: '500', value: '500' },
        { label: '600', value: '600' },
        { label: '700', value: '700' },
        { label: '800', value: '800' },
        { label: '900', value: '900' },
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
            font_family: fontFamilyValue,
            font_size: sizeValue,
            font_weight: weightValue,
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
                                     <TextField
                                        label=" Font Famliy:"
                                        required="true"
                                        name="family"
                                        value={fontFamilyValue}
                                        onChange={handleFamilyChange}
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
                                        label="Font Weight :"
                                        required="true"
                                        name="weight"
                                        options={weightOptions}
                                        value={weightValue}
                                        onChange={handleWeightChange}
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

