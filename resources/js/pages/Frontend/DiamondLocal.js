import ReactDOM from 'react-dom';
import 'rc-tooltip/assets/bootstrap.css';
import React, { useCallback, useRef, useEffect, useState } from "react";
import Slider, { SliderTooltip  } from 'rc-slider';
import Table from 'rc-table';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import 'rc-slider/assets/index.css';
import '../../../sass/custom.css';
import * as ReactIcon from 'react-icons/fa';

if (window.option){var option=window.option;} else{var option='Login';}
if(option=='view'){var option_text='View Product';}else if(option=='call'){var option_text='Call Now';}else{var option_text='Login For Price';}
const HOME_URL =window.home_url;
window.shape="Round";
const shapes = [
    {
        name: 'Round',
        image: '//cdn.shopify.com/s/files/1/0588/7852/5589/t/1/assets/diamond-round.svg?v=12693028039347699321',
    },
    {
        name: 'Oval',
        image: '//cdn.shopify.com/s/files/1/0588/7852/5589/t/1/assets/diamond-oval.svg?v=2497033182748759259',
    },
    {
        name: 'Cushion',
        image: '//cdn.shopify.com/s/files/1/0588/7852/5589/t/1/assets/diamond-cusion.svg?v=11214961818959539646',
    },
    {
        name: 'Princess',
        image: '//cdn.shopify.com/s/files/1/0588/7852/5589/t/1/assets/diamond-pricess.svg?v=16220410196671539921',
    },
    {
        name: 'Pear',
        image: '//cdn.shopify.com/s/files/1/0588/7852/5589/t/1/assets/diamond-pear.svg?v=3686681557302028351',
    },
    {
        name: 'Marquise',
        image: '//cdn.shopify.com/s/files/1/0588/7852/5589/t/1/assets/diamond-marquise.svg?v=13322033320278941088',
    },
    {
        name: 'Asscher',
        image: '//cdn.shopify.com/s/files/1/0588/7852/5589/t/1/assets/diamond-asscher.svg?v=4564496663447661558',
    },
    {
        name: 'Radiant',
        image: '//cdn.shopify.com/s/files/1/0588/7852/5589/t/1/assets/diamond-radiant.svg?v=16126585984193094258',
    },
    {
        name: 'Heart',
        image: '//cdn.shopify.com/s/files/1/0588/7852/5589/t/1/assets/diamond-heart.svg?v=15786379548922254164',
    }

];
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
};
const colorAlph = {
    0: 'D',
    9: 'E',
    18: 'F',
    27: 'G',
    36: 'H',
    45: 'I',
    54: 'J',
    63: 'K',
    72: 'L',
    81: 'M',
    90: 'N',
};
const clarAlph = {
    0: '12',
    9: 'I1',
    18: 'S13',
    27: 'S12',
    36: 'S11',
    45: 'VS2',
    54: 'VS1',
    63: 'VVS2',
    72: 'VVS1',
    81: 'IF',
    90: 'FL',
};
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
export default function DiamondLocal() {
    var rows = new Array();
    var i =0;
    const { Handle } = Slider;
    const [activeShape, setActiveShape] = React.useState(null);
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
        price: [64,341888],
        color: [0, 90],
        clarity: [0, 90],
        length: [1, 3],
        polish: [0, 100],
        table: [0, 100],
        symmetry:[0, 100],
        depth: [40.90, 79.70],
        cut: [0, 100],
       
    });
    const demo={ 
        color: ["D", "F"],
        clarity: ["IF", "I3"],
        polish: ["Excellent", "Poor"],
        symmetry:["Excellent","Poor"],
        cut: ["Excellent", "Poor"],
    };
    const AfterSubmit = () => {
        var req = {
            range:{
                shapes: window.shape,
                size_from: range.carat[0],
                size_to: range.carat[1],
                price_total_from: range.price[0],
                price_total_to: range.price[1],

                color_from: colorAlph[range.color[0]],
                color_to: colorAlph[range.color[1]],
                clarity_from: demo.clarity[0],
                clarity_to: demo.clarity[1],
                polish_from: demo.polish[0],
                polish_to: demo.polish[1],
                symmetry_from: demo.symmetry[0],
                symmetry_to: demo.symmetry[1],
                cut_from: demo.cut[0],
                cut_to: demo.cut[1],

                depth_percent_from: range.depth[0],
                depth_percent_to: range.depth[1],
                table_percent_from: range.table[0],
                table_percent_to: range.table[1],
                meas_length_from: range.length[0],
                meas_length_to: range.length[1],
                meas_width_from: range.length[1],
                meas_width_to: range.length[1],
            }
        };
        const url = '/api/backend/rapnet-api';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'},
            body: JSON.stringify(req),
        };
        return fetch(url, requestOptions)
            .then(response => response.json())
            .catch(error => {console.error('There was an error!', error);})
    };
    const handleAfter = () => {
        AfterSubmit().then((arr) => {arr.forEach(e => 
            {
                i++;
                var c="compare_"+i;
                rows[i] =
                    {
                        compare: <div className="compare-checkbox-wrap"><input type="checkbox" id={c} style={{ display: "none" }} /><label htmlFor={c} className="compare-checkbox"></label></div>,
                        sku: '',
                        shape: e.shape,
                        carat: e.size,
                        color: e.color,
                        clarity: e.clarity,
                        report: '',
                        price: option_text,
                        trId: 'RC'+i,
                    }   
            })
            setTableData(rows);
        })
    }
    const handleRange = (values, name) => {
        setRange({
            ...range,
            [name]: values
        });
        console.log(name);
       // handleAfter();   
    };
    const handleActiveShape = (name) => {
        console.log(name);
        window.shape=name;
        setActiveShape(name);   
        handleAfter();   
    };
       const columns = [
        {
            title: 'Compare',
            dataIndex: 'compare',
            key: 'compare',
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku',
        },
        {
            title: 'Shape',
            dataIndex: 'shape',
            key: 'shape',
        },
        {
            title: 'Carat',
            dataIndex: 'carat',
            key: 'carat',
        },
        {
            title: 'Color',
            dataIndex: 'color',
            key: 'color',
        },
        {
            title: 'Clarity',
            dataIndex: 'clarity',
            key: 'clarity',
        },
        {
            title: 'Report',
            dataIndex: 'report',
            key: 'report',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
    ];

    const [tableData, setTableData] = useState(
        [
            {
                compare: <div className="compare-checkbox-wrap"><input type="checkbox" id="compare" style={{ display: "none" }} /><label htmlFor="compare" className="compare-checkbox"></label></div>,
                sku: '',
                shape: '',
                carat: '',
                color: '',
                clarity: '',
                report: '',
                price: '',
                trId: '',
            },
        ]
    )
    const [loadMore, setLoadMore] = React.useState(false);
    useEffect(()=>{
        console.log("effect");
        handleActiveShape(window.shape);
    }, []) 
    return (
        <div className='serch-outer diamond-search'>
            <div className='cust-container'>
                <div className="search-header">
                    <h2 className="title">Search For Diamonds</h2>
                </div>
                <div id="searchHeader" className="search-options search-options">
                    <div className="inner-search-options">
                        <h3 className="option-title uppercase">SHAPE</h3>
                        <div className="shapes">
                            <ul className='shapes-ul'>
                                {shapes.map((shape, index) => (
                                    <li key={index} className={activeShape === shape.name ? 'active' : null} onClick={() => handleActiveShape(shape.name)}  >
                                        <div className="icon shape-round">
                                            <img src={shape.image} alt={shape.name} />
                                        </div>
                                        <div className="text">{shape.name}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='range-options'>
                    <div className="inner-range-options">
                        <h3 className="option-title uppercase">CARAT</h3>
                        <Range  min={0.08} max={11.07} step={0.01}  tipFormatter={value => `${value}`} value={range.carat} onChange={(values) => handleRange(values, "carat")}   allowCross={false} draggableTrack/>
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
                        <Range min={64} max={341888} defaultValue={range.price} tipFormatter={value => `$${value}`} onChange={(values) => handleRange(values, "price")}     />
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
                        <Range marks={marks} min={0} max={90} step={9}  defaultValue={range.color} onChange={(values) => handleRange(values, "color")}     />
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
                        <Range marks={marks} min={0} max={90} step={9} defaultValue={range.clarity} onChange={(values) => handleRange(values, "clarity")}     />
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
                            <li key={'IF'}>IF</li>
                            <li key={'FL'}>FL</li>
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
                                    <Range min={1} max={3} step={0.01} defaultValue={range.length} onChange={(values) => handleRange(values, "length")}     />
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

                                    <Range marks={marksLetter} step={25} defaultValue={range.polish} onChange={(values) => handleRange(values, "polish")}     />
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
                                    <Range min={0} max={100} step={0.01} defaultValue={range.table} tipFormatter={value => `${value}%`}  onChange={(values) => handleRange(values, "table")}     />
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

                                    <Range marks={marksLetter} step={20} defaultValue={range.symmetry} onChange={(values) => handleRange(values, "symmetry")}     />
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
                                    <Range min={40.90} max={79.70} step={0.01} defaultValue={range.depth} onChange={(values) => handleRange(values, "depth")}     />
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

                                    <Range marks={marksLetter} step={25} defaultValue={range.cut} onChange={(values) => handleRange(values, "cut")}     />
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
                    <Tabs>
                        <TabList>
                            <Tab>
                                Results <span>(4)</span>
                            </Tab>
                            <Tab>
                                Comparison <span>(2)</span>
                            </Tab>
                        </TabList>

                        <TabPanel>
                            <div className='table-info-outer'>
                                <Table rowKey="trId" columns={columns} data={tableData} />
                                <div className='table-info'>
                                    <div className='table-info-inner'>
                                        <h4>Diamond Information</h4>
                                        <ul>
                                            <li key={'li1'} ><b>Carat weight:</b> 0.30</li>
                                            <li key={'li2'} ><b>Shape:</b> Pear</li>
                                            <li key={'li3'} ><b>Color:</b> F</li>
                                            <li key={'li4'} ><b>Clarity:</b> I1</li>
                                            <li key={'li5'} ><b>Symmetry:</b> VG</li>
                                            <li key={'li6'} ><b>Polish:</b> VG</li>
                                        </ul>
                                        <div className='btn-outer'>
                                            <a href="#" className='cust-btn'> Add to cart</a>
                                            <a href="#" className='cust-btn'> Inquire Now</a>
                                            <a href="#"> View more details</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className='table-info-outer'>
                                <Table rowKey="trId" columns={columns} />
                                <div className='table-info'>
                                    <div className='table-info-inner'>
                                        <h4>Diamond Information</h4>
                                        <ul>
                                            <li key={'li1'} ><b>Carat weight:</b> 0.30</li>
                                            <li key={'li2'} ><b>Shape:</b> Pear</li>
                                            <li key={'li3'} ><b>Color:</b> F</li>
                                            <li key={'li4'} ><b>Clarity:</b> I1</li>
                                            <li key={'li5'} ><b>Symmetry:</b> VG</li>
                                            <li key={'li6'} ><b>Polish:</b> VG</li>
                                        </ul>
                                        <div className='btn-outer'>
                                            <a href="#" className='cust-btn'> Add to cart</a>
                                            <a href="#" className='cust-btn'> Inquire Now</a>
                                            <a href="#"> View more details</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
if (document.getElementById('searchLocal')) {
    ReactDOM.render(<DiamondLocal />, document.getElementById('searchLocal'));
};
