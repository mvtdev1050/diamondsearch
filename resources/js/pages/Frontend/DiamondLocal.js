import ReactDOM from 'react-dom';
import 'rc-tooltip/assets/bootstrap.css';
import React, { useCallback, useRef, useEffect, useState } from "react";
import Slider, { SliderTooltip  } from 'rc-slider';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import 'rc-slider/assets/index.css';
import '../../../sass/custom.css';
import * as ReactIcon from 'react-icons/fa';
import debounce from 'lodash/debounce';
import DataTable from 'react-data-table-component';
import Loader from "react-loader-spinner";
import Modal from 'react-modal';
import {ToastContainer} from 'react-toastify';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
  
if (window.option){var option=window.option;} else{var option='Login';}
if(option=='view'){var option_text='View Product';}else if(option=='call'){var option_text='Call Now';}else{var option_text='Login For Price';}
const HOME_URL =window.home_url;
const origin   = window.location.origin; 
const href   = window.location.href; 
const login_check= window.login;
const STORE_ID=window.store_id;
const login_link   = origin+'/account/login'; 
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
        backgroundColor: 'rgba(34, 34, 34, 0.5)'
      },
  };
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
const marksLetter = {
    25: '',
    50: '',
    75: '',
    100: '',
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


const clarityAlph = {
    0: 'I3',
    10: 'I2',
    20: 'I1',
    30: 'S13',
    40: 'S12',
    50: 'S11',
    60: 'VS2',
    70: 'VS1',
    80: 'VVS2',
    90: 'VVS1',
    100: 'IF',

};
const grade = {
    0: 'FAIR',
    25: 'FAIR',
    50: 'GOOD',
    75: 'VERY GOOD',
    100: 'EXCELLENT',
};
const columns = [
       
    {
        title: 'SKU',
        dataIndex: 'sku',
        key: 'sku',
        name: 'SKU',
        selector: row => row.sku,
        sortable: true,
    },
    {
        title: 'Shape',
        dataIndex: 'shape',
        key: 'shape',
        name: 'Shape',
        selector: row => row.shape,
        sortable: true,
    },
    {
        title: 'Carat',
        dataIndex: 'carat',
        key: 'carat',
        name: 'Carat',
        selector: row => row.carat,
        sortable: true,
    },
    {
        title: 'Color',
        dataIndex: 'color',
        key: 'color',
        name: 'Color',
        selector: row => row.color,
        sortable: true,
    },
    {
        title: 'Clarity',
        dataIndex: 'clarity',
        key: 'clarity',
        name: 'Clarity',
        selector: row => row.clarity,
        sortable: true,
    },
    {
        title: 'Report',
        dataIndex: 'report',
        key: 'report',
        name: 'Report',
        selector: row => row.report,
        sortable: true,
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        name: 'Price',
        selector: row => row.price,
        sortable: true,
    },
];
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
if (window.color_min) { var color_min = getKeyByValue(colorAlph,window.color_min);} else { var color_min = 0; }
if (window.color_max) { var color_max = getKeyByValue(colorAlph,window.color_max);} else { var color_max = 100; }
if (window.clarity_min) { var clarity_min = getKeyByValue(clarityAlph,window.clarity_min); } else { var clarity_min = 0; }
if (window.clarity_max) { var clarity_max = getKeyByValue(clarityAlph,window.clarity_max); } else { var clarity_max = 100; }
export default function DiamondLocal() {
    const [range, setRange] = useState({
        carat: [0.02, 11.07],
        price: [64,341888],
        color: [color_min,color_max],
        clarity: [clarity_min,clarity_max],
        length: [1, 3],
        polish: [0, 100],
        table: [0, 100],
        symmetry:[0, 100],
        depth: [40.90, 79.70],
        cut: [0, 100],
        shape: "Round"
    });
    const [right, setRight] = useState({
        carat: '',
        shape: '',
        color: '',
        clarity: '',
        sku:'',
        report: '',
        diamond_id:'',
        symmetry:'',
        polish:'',
        cut:'',
        lab:'',
        table:'',
        depth:'',
        link:href+'/product/'
       
    });
    const hoverChange = (time) =>{      
        setTimeout(function(){
            var tableCell=document.getElementsByClassName('rdt_TableCell');  
            for (var i = 0; i < tableCell.length; i++) {
                tableCell[i].addEventListener("mouseover", function(e) {
                this.click();
                })
            }
        },time);
    }
    const callHttpRequest = (ranges) => {
        hoverChange(8000);
        AfterSubmit(ranges)
    };
    const [stateDebounceCallHttpRequest] = useState(() =>
        debounce(callHttpRequest, 100, {
            leading: false,
            trailing: true
        })
    );
    const handleRange = (values, name) => {
        setLoader("cust-loader");
        setPending(true);
        const data = {
            ...range,
            [name]: values
        };
        setRange(data);
        stateDebounceCallHttpRequest(data);
    };
    const onRowClicked = (row, event) => {
        setRight({
            diamond_id: row.diamond_id,
            carat: row.carat,
            shape: row.shape,
            color: row.color,
            clarity: row.clarity,
            sku:row.sku,
            report: row.report,
            diamond_id: row.diamond_id,
            symmetry: row.symmetry,
            polish: row.polish,
            cut: row.cut,
            lab: row.lab,
            depth: row.depth,
            table: row.table,
            m_length: row.m_length,
            m_width: row.m_width,
            m_depth: row.m_depth,
            link: href+'/product/'+row.diamond_id,
       });
       setDiamondID(row.diamond_id);
    };
    const onSelectedRowChange = (rows, event) => {
        setCount1(rows['selectedCount']);
        setCompareTable(rows['selectedRows']);
        hoverChange(2000);
    };
    const [tableData, setTableData] = useState(
        [
            {
                sku: '',
                shape: '',
                carat: '',
                color: '',
                clarity: '',
                report: '',
                price: '',
                diamond_id:'',
                trId: '',
            },
        ]
    )
    const [compareData, setCompareTable] = useState(
        [
            {
                sku: '',
                shape: '',
                carat: '',
                color: '',
                clarity: '',
                report: '',
                price: '',
                diamond_id:'',
                trId: '',
            },
        ]
    )
    const [pending, setPending] = useState(true);
    const [count, setCount] = useState(0);
    const [count1, setCount1] = useState(0);
    const [loadMore, setLoadMore] = useState(false);
    const [modalIsOpen, setIsOpen] = useState();
    const [showLoader, setLoader] = useState('hidden');
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [inquiry, setInquiry] = useState('');
    const [diamondID, setDiamondID] = useState('');
    const handleFirstname = (event) => {
        setFirstname(event.target.value);
    }
    const handleLastname = (event) => {
        setLastname(event.target.value);
    }
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handlePhone = (event) => {
        setPhone(event.target.value);
    }
    const handleInquiry = (event) => {
        setInquiry(event.target.value);
    }
    const openModal= () => {
        setIsOpen(true);
    }
    const closeModal= () => {
        setIsOpen(false);
    }
    const  handleSubmit= () => {
       var data = {
        store_id:STORE_ID,
        diamond_id:diamondID,
        firstname: firstName,
        lastname: lastName,
        email: email,
        phone: phone,
        inquiry: inquiry,
    }
    const url = HOME_URL+'backend/inquiry';
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'*'},
        body: JSON.stringify(data),
    };
    fetch(url, requestOptions)
        .then(r => {
            toast.success("Inquiry Submitted Successfully");
            closeModal();
        })
        .catch(console.log("error"))
    }
    const AfterSubmit = async (range) => {
        var req = {
            range:{
                shapes: range.shape,
                size_from: range.carat[0],
                size_to: range.carat[1],
                price_total_from: range.price[0],
                price_total_to: range.price[1],
    
                color_from: colorAlph[range.color[0]],
                color_to: colorAlph[range.color[1]],
                clarity_from: clarityAlph[range.clarity[1]],
                clarity_to: clarityAlph[range.clarity[0]],
                polish_from: grade[range.polish[0]],
                polish_to: grade[range.polish[1]],
                symmetry_from: grade[range.symmetry[0]],
                symmetry_to: grade[range.symmetry[1]],
                cut_from: grade[range.cut[0]],
                cut_to: grade[range.cut[1]],
    
                depth_percent_from: range.depth[0],
                depth_percent_to: range.depth[1],
                table_percent_from: range.table[0],
                table_percent_to: range.table[1],
               // meas_length_from: range.length[0],
               // meas_length_to: range.length[1],
              //  meas_width_from: range.length[1],
              //  meas_width_to: range.length[1],
            }
        };
        const url = HOME_URL+'backend/get-diamonds';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'*'},
            body: JSON.stringify(req),
        };
        try {
            const response = await fetch(url, requestOptions) 
            var arr=await response.json();
            var rows = new Array();
            var i =0;
            arr.forEach(e => 
                {
                    var price=e.currency_symbol+''+e.total_sales_price;
                    if(i==0){
                        setRight({
                            carat: e.size,
                            shape: e.shape,
                            color: e.color,
                            clarity: e.clarity,
                            sku:e.stock_num,
                            report: e.cert_num,
                            diamond_id: e.diamond_id,
                            symmetry: e.symmetry,
                            polish: e.polish,
                            cut: e.cut,
                            lab: e.lab,
                            depth: e.depth_percent,
                            table: e.table_percent,
                            m_length: e.meas_length,
                            m_width: e.meas_width,
                            m_depth: e.meas_depth,
                            link: href+'/product/'+e.diamond_id,
                        });
                        setDiamondID(e.diamond_id);
                    }
                    i++;
                    rows[i] =
                        {
                            trId: 'RC'+i,
                            sku: e.stock_num,
                            shape: e.shape,
                            carat: e.size,
                            color: e.color,
                            clarity: e.clarity,
                            report: e.cert_num,
                            price: price,
                            diamond_id: e.diamond_id,
                            symmetry: e.symmetry,
                            cut: e.cut,
                            polish: e.polish,
                            lab: e.lab,
                            table: e.table_percent,
                            depth: e.depth_percent,
                            m_length: e.meas_length,
                            m_width: e.meas_width,
                            m_depth: e.meas_depth,
                        }
                        if(login_check=='0'){
                            var link='<a href={login_link} >{option_text}</a>';   
                            rows[i]['price']='Login For Price';   
                        }   
                })
            setCount(i);
            setTableData(rows);
            setPending(false);
            setLoader("hidden");
        } catch (err) {
            console.log('error: ', err);
        }
    };
    
    useEffect(()=>{ 
        setLoader("cust-loader");
        hoverChange(12000);
        AfterSubmit(range);
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
                                    <li key={index} className={range.shape === shape.name ? 'active' : null} onClick={() => handleRange(shape.name, 'shape')}  >
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
                    <div className="inner-range-options carat-slider">
                        <h3 className="option-title uppercase">CARAT</h3>
                        <Range  min={0.02} max={11.07} step={0.01}  tipFormatter={value => `${value}`} value={range.carat} onChange={(values) => handleRange(values, "carat")}   allowCross={false} draggableTrack/>
                        <div className="value-box">
                            <div className="value-left">
                                <span className='value-span'>{range.carat[0]} </span>
                            </div>
                            <div className="value-right">
                                <span className='value-span'>{range.carat[1]} </span>
                            </div>
                        </div>
                    </div>
                    <div className="inner-range-options price-slider">
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
                    <div className="inner-range-options color-slider">
                        <h3 className="option-title uppercase">COLOR</h3>
                        <div className="value-box">
                            <div className="value-left">
                                <p>Colorless</p>
                            </div>
                            <div className="value-right">
                                <p>Near Colorless</p>
                            </div>
                        </div>
                        <Range  marks={colorAlph} min={0} max={90} step={10} defaultValue={range.color} onChange={(values) => handleRange(values, "color")}     />

                    </div>
                    <div className="inner-range-options clarity-slider">
                        <h3 className="option-title uppercase">CLARITY</h3>
                        <div className="value-box">
                            <div className="value-left">
                                <p>Inclusion Visible at 10x Magnification</p>
                            </div>
                            <div className="value-right">
                                <p>Flawless</p>
                            </div>
                        </div>
                        <Range marks={clarityAlph}  step={10} min={0} max={100}  defaultValue={range.clarity} onChange={(values) => handleRange(values, "clarity")}     />
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
                                <div className="inner-range-options length-slider">
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
                                <div className="inner-range-options polish-slider">
                                    <h3 className="option-title uppercase">POLISH</h3>

                                    <Range  marks={marksLetter} step={25} defaultValue={range.polish} onChange={(values) => handleRange(values, "polish")}     />
                                    <ul className="steps-labels">
                                        <li key={'polishFair'}>FAIR</li>
                                        <li key={'polishGood'}>GOOD</li>
                                        <li key={'polishVgood'}>VERY GOOD</li>
                                        <li key={'polishExcellent'}>EXCELLENT</li>
                                    </ul>
                                </div>
                            </div>
                            <div className='range-options'>
                                <div className="inner-range-options table-slider">
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
                                <div className="inner-range-options symmetry-slider">
                                    <h3 className="option-title uppercase">SYMMETRY</h3>

                                    <Range marks={marksLetter} step={25} defaultValue={range.symmetry} onChange={(values) => handleRange(values, "symmetry")}     />
                                    <ul className="steps-labels">
                                        <li key={'symmetryFair'}>FAIR</li>
                                        <li key={'symmetryGood'}>GOOD</li>
                                        <li key={'symmetryVgood'}>VERY GOOD</li>
                                        <li key={'symmetryExcellent'}>EXCELLENT</li>
                                    </ul>
                                </div>
                      
                            </div>
                            <div className='range-options'>
                                <div className="inner-range-options depth-slider">
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
                                <div className="inner-range-options cut-slider">
                                    <h3 className="option-title uppercase">CUT</h3>

                                    <Range marks={marksLetter} step={25} defaultValue={range.cut} onChange={(values) => handleRange(values, "cut")}     />
                                    <ul className="steps-labels">
                                        <li key={'cutFair'}>FAIR</li>
                                        <li key={'cutGood'}>GOOD</li>
                                        <li key={'cutVgood'}>VERY GOOD</li>
                                        <li key={'cutExcellent'}>EXCELLENT</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <Loader type="TailSpin" color="#000" className={showLoader}/>
                <div id="diamondCompareTable" className="diamond-search-tab-view">
                    <Tabs>
                        <TabList>
                            <Tab>
                                Results <span>({count})</span>
                            </Tab>
                            <Tab>
                                Comparison <span>({count1})</span>
                            </Tab>
                        </TabList>

                        <TabPanel>
                            <div className='table-info-outer'>
                                <div className="cust-data-table">
                                <DataTable columns={columns} data={tableData} selectableRows  pagination highlightOnHover overflowY overflowX 
                                    onRowClicked={onRowClicked}  onSelectedRowsChange={onSelectedRowChange}/>
                                </div>
                                <div className='table-info'>
                                    <div className='table-info-inner'>
                                        <h4>Diamond Information</h4>
                                        <div className='diamond-info'>
                                            <div className="info-left">
                                                <ul>
                                                    <li key={'li1'} ><b>Carat weight:</b> {right.carat}</li>
                                                    <li key={'li2'} ><b>Shape:</b> {right.shape}</li>
                                                    <li key={'li3'} ><b>Color:</b> {right.color}</li>
                                                    <li key={'li4'} ><b>Clarity:</b>  {right.clarity}</li>
                                                    <li key={'li5'} ><b>Lab:</b> {right.lab}</li>
                                                    <li key={'li6'} ><b>Report:</b> {right.report}</li>
                                                    <li key={'li7'} ><b>Stock Number:</b> {right.sku}</li>

                                                </ul>
                                            </div>
                                            <div className="info-right">
                                                <ul>
                                                    <li key={'li8'} ><b>Measurements:</b> {right.m_length} x {right.m_width} x {right.m_depth} </li>
                                                    <li key={'li9'} ><b>Table:</b> {right.table}</li>
                                                    <li key={'li10'} ><b>Depth:</b> {right.depth}</li>
                                                    <li key={'li11'} ><b>Symmetry:</b> {right.symmetry}</li>
                                                    <li key={'li12'} ><b>Polish:</b> {right.polish}</li>
                                                    <li key={'li13'} ><b>Cut:</b> {right.cut}</li>
                                                   

                                                </ul>
                                            </div>
                                        </div>
                                        <div className='btn-outer'>
                                            <button className='cust-btn' onClick={openModal} >Inquire Now</button>
                                            <a href={right.link} target='_blank'> View more details</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel> 
                        <TabPanel>
                            <div className='table-info-outer'>
                            <div className="cust-data-table">
                                <DataTable columns={columns} data={compareData} selectableRows  pagination highlightOnHover overflowY overflowX 
                                onRowClicked={onRowClicked}  onSelectedRowsChange={onSelectedRowChange} />
                            </div>
                                <div className='table-info'>
                                    <div className='table-info-inner'>
                                        <h4>Diamond Information</h4>
                                        <div className='diamond-info'>
                                            <div className="info-left">
                                                <ul>
                                                    <li key={'li1'} ><b>Carat weight:</b> {right.carat}</li>
                                                    <li key={'li2'} ><b>Shape:</b> {right.shape}</li>
                                                    <li key={'li3'} ><b>Color:</b> {right.color}</li>
                                                    <li key={'li4'} ><b>Clarity:</b>  {right.clarity}</li>
                                                    <li key={'li5'} ><b>Lab:</b> {right.lab}</li>
                                                    <li key={'li6'} ><b>Report:</b> {right.report}</li>
                                                    <li key={'li7'} ><b>Stock Number:</b> {right.sku}</li>
                                                </ul>
                                            </div>
                                            <div className="info-right">
                                                <ul>
                                                    <li key={'li8'} ><b>Measurements:</b> {right.m_length} x {right.m_width} x {right.m_depth} </li>
                                                    <li key={'li9'} ><b>Table:</b> {right.table}</li>
                                                    <li key={'li10'} ><b>Depth:</b> {right.depth}</li>
                                                    <li key={'li11'} ><b>Symmetry:</b> {right.symmetry}</li>
                                                    <li key={'li12'} ><b>Polish:</b> {right.polish}</li>
                                                    <li key={'li13'} ><b>Cut:</b> {right.cut}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className='btn-outer'>
                                            <a href="#" className='cust-btn'> Inquire Now</a>
                                            <a href="#"> View more details</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
                <Modal isOpen={modalIsOpen} onRequestClose={closeModal}  style={customStyles} ariaHideApp={false}>
                    <div className="model-outer">
                        <h4 className="model-title">Diamond Inquiry</h4>
                        <ToastContainer autoClose={8000}  />
                        <div className="model-info">
                            <div className="model-image">
                                <img src={HOME_URL+'img/round.jpg'} />
                            </div> 
                            <div className="model-table">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td><strong>Carat Weight</strong>: {right.carat}</td>
                                                <td><strong>Measurements</strong>:  {right.m_length} x {right.m_width} x {right.m_depth}</td> 
                                            </tr>
                                            <tr>
                                                <td><strong>Shape</strong>:  {right.shape}</td>
                                                <td><strong>Depth</strong>: {right.depth}%</td>
                                            </tr> 
                                            <tr>
                                                <td><strong>Color</strong>: {right.color} </td>
                                                <td><strong>Table</strong>: {right.table}%</td>
                                            </tr> 
                                            <tr>
                                                <td><strong>Clarity</strong>: {right.clarity} </td>
                                                <td><strong>Cut</strong>: {right.cut} </td> 
                                               
                                            </tr> 
                                            <tr>
                                                <td><strong>Stock Number</strong>: {right.sku}</td>
                                                <td><strong>Symmetry</strong>: {right.symmetry}</td> 
                                            </tr> 
                                            <tr>
                                                <td><strong>Report</strong>: {right.report}</td>                                   
                                                <td><strong>Polish</strong>: {right.polish} </td> 
                                            </tr>
                                            <tr>
                                                <td><strong>Lab</strong>: {right.lab} </td>                                           
                                            </tr>
                                        </tbody>
                                    </table>
                            </div>
                        </div> 
                        <div className="clearfix"></div>
                        <div className="model-form">
                                    <div className='row'>
                                        <div className='col-6'>
                                            <input type="text" name="firstname" placeholder="First Name" required='' 
                                            value={firstName} onChange={handleFirstname}/>
                                        </div>
                                        <div className='col-6'>
                                            <input type="text" name="lastname" placeholder="Last Name" required='' 
                                            value={lastName} onChange={handleLastname}/>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <input type="email" name="email" placeholder="Email" required='' 
                                            value={email} onChange={handleEmail}/>
                                        </div>
                                        <div className='col-6'>
                                            <input type="tel" name="phone" placeholder="Phone" required=''
                                            value={phone} onChange={handlePhone}/>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <textarea name="inquiry" placeholder="Inquiry" required='' 
                                            value={inquiry} onChange={handleInquiry}></textarea>
                                        </div>
                                    </div>
                                    <div className='row btn-outer'>
                                        <button className="cust-btn submit-form" onClick={handleSubmit} type="button"
                                        >Submit</button>
                                    </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
}
if (document.getElementById('searchLocal')) {
    ReactDOM.render(<DiamondLocal />, document.getElementById('searchLocal'));
};
