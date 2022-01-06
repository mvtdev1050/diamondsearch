import ReactDOM from 'react-dom';
import React, { useCallback, useRef, useState } from "react";
import Table from 'rc-table';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
if (window.option){var option=window.option;} else{var option='Login';}
if(option=='view'){var option_text='View Product';}else if(option=='call'){var option_text='Call Now';}else{var option_text='Login For Price';}

export default function StaticTable() {
    const columns = [
        {
            title: '',
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

    const data = [
        {
            compare: <div className="compare-checkbox-wrap"><input type="checkbox" id="compare" style={{ display: "none" }} /><label htmlFor="compare" className="compare-checkbox"></label></div>,
            sku: 'HG175',
            shape: 'Round',
            carat: '0.30',
            color: 'G',
            clarity: 'VS1',
            report: 'FDI',
            price: option_text,
            trId: 'RC1',
        },
        {
            compare: <div className="compare-checkbox-wrap"><input type="checkbox" id="compare" style={{ display: "none" }} /><label htmlFor="compare" className="compare-checkbox"></label></div>,
            sku: 'HG175',
            shape: 'Round',
            carat: '0.30',
            color: 'G',
            clarity: 'VS1',
            report: 'FDI',
            price: option_text,
            trId: 'RC2',
        },
        {
            compare: <div className="compare-checkbox-wrap"><input type="checkbox" id="compare1" style={{ display: "none" }} /><label htmlFor="compare1" className="compare-checkbox"></label></div>,
            sku: 'HG175',
            shape: 'Round',
            carat: '0.30',
            color: 'G',
            clarity: 'VS1',
            report: 'None',
            price: option_text,
            trId: 'RC3',
        },
        {
            compare: <div className="compare-checkbox-wrap"><input type="checkbox" id="compare1" style={{ display: "none" }} /><label htmlFor="compare1" className="compare-checkbox"></label></div>,
            sku: 'HG175',
            shape: 'Round',
            carat: '0.30',
            color: 'G',
            clarity: 'VS1',
            report: 'None',
            price: option_text,
            trId: 'RC4',
        }
    ];
    const data1 = [
        {
            compare: <div className="compare-checkbox-wrap"><input type="checkbox" id="compare" style={{ display: "none" }} /><label htmlFor="compare" className="compare-checkbox"></label></div>,
            sku: 'HG175',
            shape: 'Round',
            carat: '0.30',
            color: 'G',
            clarity: 'VS1',
            report: 'FDI',
            price: option_text,
            trId: 'RC5',
        },
        {
            compare: <div className="compare-checkbox-wrap"><input type="checkbox" id="compare1" style={{ display: "none" }} /><label htmlFor="compare1" className="compare-checkbox"></label></div>,
            sku: 'HG175',
            shape: 'Round',
            carat: '0.30',
            color: 'G',
            clarity: 'VS1',
            report: 'None',
            price: option_text,
            trId: 'RC6',
        }
    ];
    return (
        <div>
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
                        <Table rowKey="trId" columns={columns} data={data} />
                        <div className='table-info'>
                            <div className='table-info-inner'>
                                <h4>Diamond Information</h4>
                                <div class="diamond-info"><div class="info-left"><ul><li><b>Carat weight:</b> 0.3</li><li><b>Shape:</b> Round</li><li><b>Color:</b> K</li><li><b>Clarity:</b>  SI1</li><li><b>Lab:</b> GIA</li><li><b>Report:</b> 2416589892</li><li><b>Stock Number:</b> 75318</li></ul></div><div class="info-right"><ul><li><b>Measurements:</b> 4.28 x 4.32 x 2.66 </li><li><b>Table:</b> 57</li><li><b>Depth:</b> 61.9</li><li><b>Symmetry:</b> Excellent</li><li><b>Polish:</b> Excellent</li><li><b>Cut:</b> Excellent</li></ul></div></div>
                                <div className='btn-outer'>
                                    <a href="#" className='cust-btn'> Inquire Now</a>
                                    <a href="#"> View more details</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='table-info-outer'>
                        <Table rowKey="trId" columns={columns} data={data1} />
                        <div className='table-info'>
                            <div className='table-info-inner'>
                                <h4>Diamond Information</h4>
                                <div class="diamond-info"><div class="info-left"><ul><li><b>Carat weight:</b> 0.3</li><li><b>Shape:</b> Round</li><li><b>Color:</b> K</li><li><b>Clarity:</b>  SI1</li><li><b>Lab:</b> GIA</li><li><b>Report:</b> 2416589892</li><li><b>Stock Number:</b> 75318</li></ul></div><div class="info-right"><ul><li><b>Measurements:</b> 4.28 x 4.32 x 2.66 </li><li><b>Table:</b> 57</li><li><b>Depth:</b> 61.9</li><li><b>Symmetry:</b> Excellent</li><li><b>Polish:</b> Excellent</li><li><b>Cut:</b> Excellent</li></ul></div></div>
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
    )
}
if (document.getElementById('staticTable')) {
    ReactDOM.render(<StaticTable />, document.getElementById('staticTable'));
}