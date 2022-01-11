import ReactDOM from 'react-dom';
import React, { useCallback, useRef, useEffect, useState } from "react";
import {
    AppProvider, DescriptionList, Card, TextField, ColorPicker, Select, Button, hsbToRgb, rgbToHsb, rgbString, FormLayout, Modal, PageActions, Layout, Loading, Page
} from "@shopify/polaris";
import enTranslations from '@shopify/polaris/locales/en.json';
import { Provider, TitleBar } from '@shopify/app-bridge-react';
const ShopifyAdmin = { r: 28, g: 34, b: 96 };
const MINIMUM_DIFFERENCE = 100;
const HOME_URL = window.home_url;
const API_KEY = window.api_key;
const STORE_ID = window.store_id;
const STORE_NAME = window.storename;
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider, { SliderTooltip } from 'rc-slider';
Object.prototype.getkeybyvalue = function( value ) {
    for( var prop in this ) {
        if( this.hasOwnProperty( prop ) ) {
             if( this[ prop ] === value )
                 return prop;
        }
    }
}
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const clarmark = {
    9: '',
    18: '',
    27: '',
    36: '',
    45: '',
    54: '',
    63: '',
    72: '',
    81: '',
    90: '',
}
const colormark = {
    0: '',
    10: '',
    20: '',
    30: '',
    40: '',
    50: '',
    60: '',
    70: '',
    80: '',
    90: '',
};
const colorAlph = {
    0: 'D',
    10: 'E',
    20: 'F',
    30: 'G',
    40: 'H',
    50: 'I',
    60: 'J',
    70: 'K',
    80: 'L',
    90: 'M',
};
const clarAlph = {
    0: 'I3',
    9: 'I2',
    18: 'I1',
    27: 'S13',
    36: 'S12',
    45: 'S11',
    54: 'VS2',
    63: 'VS1',
    72: 'VVS2',
    81: 'VVS1',
    90: 'IF',

};
if (window.size) { var size = window.size; } else { var size = '14px'; }
if (window.option) { var option = window.option; } else { var option = 'login'; }
if (window.color) { var col = window.color; } else { var col = 'rgba(0,0,0,1)'; }
if (window.color_min) { var color_min = colorAlph.getkeybyvalue(window.color_min);} else { var color_min = 0; }
if (window.color_max) { var color_max = colorAlph.getkeybyvalue(window.color_max);} else { var color_max = 90; }
if (window.clarity_min) { var clarity_min = clarAlph.getkeybyvalue(window.clarity_min); } else { var clarity_min = 0; }
if (window.clarity_max) { var clarity_max = clarAlph.getkeybyvalue(window.clarity_max); } else { var clarity_max = 90; }
export default function Form() {
    const config = { apiKey: API_KEY, host: btoa(STORE_NAME) };
    const [sizeValue, setSizeValue] = useState(size);
    const [priceOption, setPriceOption] = useState(option);
    const rgbVal = col.replace(/[^\d*.?\d*,]/g, "").split(",");
    const [range, setRange] = useState({
        color: [color_min,color_max],
        clarity: [clarity_min,clarity_max],
    });
    const [color, setColor] = useState(
        rgbToHsb({
            red: rgbVal[0],
            green: rgbVal[1],
            blue: rgbVal[2],
            alpha: rgbVal[3]
        })
    );
    const handleRange = (values, name) => {
        const data = {
            ...range,
            [name]: values
        };
        setRange(data);
    };
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
        setColor({ color });
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
            color_min: colorAlph[range.color[0]],
            color_max: colorAlph[range.color[1]],
            clarity_min: clarAlph[range.clarity[1]],
            clarity_max: clarAlph[range.clarity[0]],

        }
        const url = HOME_URL + 'backend/save-setting';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };
        fetch(url, requestOptions)
            .then(toast.success("Settings Saved Successfully")
                //,window.setTimeout(function () {window.location.reload()}, 3000)
            )
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
                            </FormLayout.Group>
                            <FormLayout.Group>
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
                                <div className='range-options color-range'>
                                    <div className="inner-range-options color-slider admin-range">
                                        <h3 className="option-title uppercase">COLOR</h3>
                                        <div className="value-box">
                                            <div className="value-left">
                                                <p>Colorless</p>
                                            </div>
                                            <div className="value-right">
                                                <p>Near Colorless</p>
                                            </div>
                                        </div>
                                        <Range marks={colormark} min={0}  max={90} step={10} defaultValue={range.color} onChange={(values) => handleRange(values, "color")} />
                                        <ul className="steps-labels">
                                            <li key={'D'}>D</li>
                                            <li key={'E'}>E</li>
                                            <li key={'F'}>F</li>
                                            <li key={'G'}>G</li>
                                            <li key={'H'}>H</li>
                                            <li key={'I'}>I</li>
                                            <li key={'J'}>J</li>
                                            <li key={'K'}>K</li>
                                            <li key={'L'}>L</li>
                                            <li key={'M'}>M</li>
                                        </ul>
                                    </div>
                                </div>
                            </FormLayout.Group>
                            <FormLayout.Group>
                                <div className='range-options color-range'>
                                    <div className="inner-range-options clarity-slider admin-range">
                                        <h3 className="option-title uppercase">CLARITY</h3>
                                        <div className="value-box">
                                            <div className="value-left">
                                                <p>Inclusion Visible at 10x Magnification</p>
                                            </div>
                                            <div className="value-right">
                                                <p>Flawless</p>
                                            </div>
                                        </div>
                                        <Range marks={clarmark} min={0} max={90} step={9} defaultValue={range.clarity} onChange={(values) => handleRange(values, "clarity")} />
                                        <ul className="steps-labels">
                                            <li key={'I3'}>I3</li>
                                            <li key={'I2'}>12</li>
                                            <li key={'I1'}>I1</li>
                                            <li key={'S13'}>S13</li>
                                            <li key={'S12'}>S12</li>
                                            <li key={'S11'}>S11</li>
                                            <li key={'VS2'}>VS2</li>
                                            <li key={'VS1'}>VS1</li>
                                            <li key={'VVS2'}>VVS2</li>
                                            <li key={'VVS1'}>VVS1</li>
                                            <li key={'IF'}>IF</li>
                                        </ul>
                                    </div>
                                </div>
                            </FormLayout.Group>
                            <FormLayout.Group>
                                <div className="color-pick">
                                    <p style={{ padding: '20px 0px 0px 0px' }} className='option-title'> Color Picker for search page </p>
                                    <ColorPicker
                                        id="color-picker"
                                        onChange={setColor}
                                        color={color}
                                        allowAlpha
                                    />
                                    <DescriptionList
                                        items={[
                                            {
                                                term: "Color",
                                                description: (
                                                    <TextField
                                                        id="color-field"
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
                                </div>
                                <div></div>
                            </FormLayout.Group>
                        </FormLayout>
                        <ToastContainer autoClose={3000} />
                    </Card>
                    <Layout.Section>
                        <PageActions primaryAction={submitAction} />
                    </Layout.Section>
                </Layout>
            </Page>
        </div >
    );
    return (
        <Provider config={config} >
            <TitleBar title="" />
            <div className="style-form"> {actualPageMarkup} </div>
        </Provider>
    );
}
if (document.getElementById('layout-form')) {
    ReactDOM.render(<AppProvider i18n={enTranslations}> <Form /> </AppProvider>, document.getElementById('layout-form'));
}

