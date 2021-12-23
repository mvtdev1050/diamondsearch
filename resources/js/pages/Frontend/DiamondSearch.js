import ReactDOM from 'react-dom';
import 'rc-tooltip/assets/bootstrap.css';
import React, { useCallback, useRef, useState } from "react";
import Slider, { SliderTooltip  } from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../../../sass/custom.css';
import * as ReactIcon from 'react-icons/fa';
import DiamondHeader from './DiamondHeader';
import DiamondTable from './DiamondTable';

const HOME_URL =window.home_url;
const marks = {
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
};
const marksLetter = {
    0: '',
    25: '',
    50: '',
    75: '',
    100: '',
}
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
export default function DiamondSearch() {
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
        color: [15, 75],
        clarity: [20, 80],
        length: [1, 100],
        polish: [1, 100],
        table: [1, 100],
        symmetry:[1, 100],
        depth: [1, 100],
        cut: [1, 100],
       
    })
    const handleRange = (values, name) => {
        setRange({
            ...range,
            [name]: values
        });
    }
    const [loadMore, setLoadMore] = React.useState(false);
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
                        <Range min={64} max={341888} defaultValue={range.price} tipFormatter={value => `$${value}`} onChange={(values) => handleRange(values, "price")} />
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
                        <Range marks={marks} min={9} max={99} step={9}  defaultValue={range.color} onChange={(values) => handleRange(values, "color")} />
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
                        <Range marks={marks} min={9} max={99} step={9} defaultValue={range.clarity} onChange={(values) => handleRange(values, "clarity")} />
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
                        <p className="toggleText"
                            onClick={() => {
                                setLoadMore(!loadMore);
                            }}>{loadMore ? "Hide Advanced search" : "Advanced search"}  <ReactIcon.FaAngleDown /></p>
                    </div>
                    {loadMore && (
                        <div className="advance-container" >
                            <div className='range-options'>
                                <div className="inner-range-options">
                                    <h3 className="option-title uppercase">LENGTH TO WIDTH RATIO</h3>
                                    <Range defaultValue={range.length} onChange={(values) => handleRange(values, "length")} />
                                    <div className="value-box">
                                        <div className="value-left">
                                            <span className='value-span'>{range.length[0]} </span>
                                        </div>
                                        <div className="value-right">
                                            <span className='value-span'>{range.length[1]} </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="inner-range-options">
                                    <h3 className="option-title uppercase">POLISH</h3>

                                    <Range marks={marksLetter} step={4} defaultValue={range.polish} onChange={(values) => handleRange(values, "polish")} />
                                    <ul className="steps-labels">
                                        <li key={'good'}>GOOD</li>
                                        <li key={'vgood'}>VERY GOOD</li>
                                        <li key={'excellent'}>EXCELLENT</li>
                                        <li key={'deal'}>IDEAL</li>
                                    </ul>
                                </div>
                            </div>
                            <div className='range-options'>
                                <div className="inner-range-options">
                                    <h3 className="option-title uppercase">TABLE %</h3>
                                    <Range defaultValue={range.table} onChange={(values) => handleRange(values, "table")} />
                                    <div className="value-box">
                                        <div className="value-left">
                                            <span className='value-span'>{range.table[0]} </span>
                                        </div>
                                        <div className="value-right">
                                            <span className='value-span'>{range.table[1]} </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="inner-range-options">
                                    <h3 className="option-title uppercase">SYMMETRY</h3>

                                    <Range marks={marksLetter} step={4} defaultValue={range.symmetry} onChange={(values) => handleRange(values, "symmetry")} />
                                    <ul className="steps-labels">
                                        <li key={'symmetryFair'}>  FAIR</li>
                                        <li key={'symmetryExcellent'}>EXCELLENT</li>
                                        <li key={'symmetryVgood'}>VERY GOOD</li>
                                        <li key={'symmetryGood'}>GOOD</li>                                     
                                        <li key={'symmetryDeal'}>IDEAL</li>
                                    </ul>
                                </div>
                      
                            </div>
                            <div className='range-options'>
                                <div className="inner-range-options">
                                    <h3 className="option-title uppercase">DEPTH %</h3>
                                    <Range defaultValue={range.depth} onChange={(values) => handleRange(values, "depth")} />
                                    <div className="value-box">
                                        <div className="value-left">
                                            <span className='value-span'>{range.depth[0]} </span>
                                        </div>
                                        <div className="value-right">
                                            <span className='value-span'>{range.depth[1]} </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="inner-range-options">
                                    <h3 className="option-title uppercase">CUT</h3>

                                    <Range marks={marksLetter} step={4} defaultValue={range.cut} onChange={(values) => handleRange(values, "cut")} />
                                    <ul className="steps-labels">
                                        <li key={'cutGood'}>GOOD</li>
                                        <li key={'cutVgood'}>VERY GOOD</li>
                                        <li key={'cutExcellent'}>EXCELLENT</li>
                                        <li key={'cutDeal'}>IDEAL</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div id="diamondCompareTable" className="diamond-search-tab-view">
                    <DiamondTable />

                </div>
            </div>
        </div>
    );
}
if (document.getElementById('searchPage')) {
    ReactDOM.render(<DiamondSearch />, document.getElementById('searchPage'));
};
