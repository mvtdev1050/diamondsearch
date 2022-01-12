import ReactDOM from 'react-dom';
import 'rc-tooltip/assets/bootstrap.css';
import React, { useCallback, useRef, useState } from "react";
import Slider, { SliderTooltip  } from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../../../sass/custom.css';
import * as ReactIcon from 'react-icons/fa';
import StaticTable from './Table';
import DiamondHeader from '../Frontend/DiamondHeader';

const marks = {
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
    100:'',
};
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
export default function DiamondPreview() {
const { Handle } = Slider;

const handle = props => {
    const { value, dragging, index, ...restProps } = props;
    return (
      <SliderTooltip
        prefixCls="rc-slider-tooltip"
        overlay={`${value} %`}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </SliderTooltip>
    );
  };
    const [range, setRange] = useState({
        carat: [0.08, 11.07],
        price: [64, 341888],
    })
    const handleRange = (values, name) => {
        setRange({
            ...range,
            [name]: values
        })
    }
    return (
        <div className='serch-outer diamond-search'>
            <div className='cust-container'>
                <div className="search-header">
                    <h2 className="title">Search For Diamonds</h2>
                </div>
                <div id="searchHeader" className="search-options search-options">
                    <DiamondHeader />
                </div>
                <div className='range-options'>
                    <div className="inner-range-options">
                        <h3 className="option-title uppercase">CARAT</h3>
                        <Range  tipFormatter={value => `${value}`} value={range.carat} onChange={(values) => handleRange(values, "carat")} allowCross={false} draggableTrack/>
                        <div className="value-box">
                            <div className="value-left">
                                <span className='value-span'>{range.carat[0]} </span>
                            </div>
                            <div className="value-right">
                                <span className='value-span'>{range.carat[1]} </span>
                            </div>
                        </div>
                    </div>
                    <div className="inner-range-options">
                        <h3 className="option-title uppercase">PRICE</h3>
                        <Range min={0} max={341888} defaultValue={range.price} tipFormatter={value => `$${value}`} onChange={(values) => handleRange(values, "price")} />
                        <div className="value-box">
                            <div className="value-left">
                                <span className='value-span'>{range.price[0]} </span>
                            </div>
                            <div className="value-right">
                                <span className='value-span'>{range.price[1]} </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='range-options color-range'>
                    <div className="inner-range-options">
                        <h3 className="option-title uppercase">COLOR</h3>
                        <div className="value-box">
                            <div className="value-left">
                                <p>Colorless</p>
                            </div>
                            <div className="value-right">
                                <p>Near Colorless</p>
                            </div>
                        </div>
                        <Range marks={marks} min={9} max={99} step={9} defaultValue={[18, 72]} onChange={(values) => handleRange(values, "color")} />
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
                            <li key={'N'}>N</li>
                        </ul>
                    </div>
                    <div className="inner-range-options">
                        <h3 className="option-title uppercase">CLARITY</h3>
                        <div className="value-box">
                            <div className="value-left">
                                <p>Inclusion Visible at 10x Magnification</p>
                            </div>
                            <div className="value-right">
                                <p>Flawless</p>
                            </div>
                        </div>
                        <Range marks={marks} min={9} max={99} step={9} defaultValue={[18, 72]} onChange={(values) => handleRange(values, "clarity")} />
                        <ul className="steps-labels">
                            <li key={'12'}>12</li>
                            <li key={'I1'}>I1</li>
                            <li key={'S13'}>S13</li>
                            <li key={'S12'}>S12</li>
                            <li key={'S11'}>S11</li>
                            <li key={'VS2'}>VS2</li>
                            <li key={'VS1'}>VS1</li>
                            <li key={'VVS2'}>VVS2</li>
                            <li key={'VVS1'}>VVS1</li>
                            <li key={'FL'}>FL</li>
                            <li key={'FL2'}>FL</li>
                        </ul>
                    </div>
                </div>
                <div className="advance-search">
                    <div className="advance-header">
                        <p className="toggleText">Advanced search  <ReactIcon.FaAngleDown /></p>
                    </div>
                </div>
                <div id="staticTable" className="diamond-search-tab-view">
                    <StaticTable />
                </div>
            </div>
        </div>
    );
}
if (document.getElementById('searchPreview')) {
    ReactDOM.render(<DiamondPreview />, document.getElementById('searchPreview'));
};
