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

    const data = [
        {
            compare: <div className="compare-checkbox-wrap"><input type="checkbox" id="compare" style={{ display: "none" }} /><label htmlFor="compare" className="compare-checkbox"></label></div>,
            sku: 'HG175',
            shape: 'Pear',
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
            shape: 'Pear',
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
            shape: 'Pear',
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
            shape: 'Pear',
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
            shape: 'Pear',
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
            shape: 'Pear',
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
                        <Table rowKey="trId" columns={columns} data={data1} />
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
    )
}
if (document.getElementById('staticTable')) {
    ReactDOM.render(<StaticTable />, document.getElementById('staticTable'));
}