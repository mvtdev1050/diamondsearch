import ReactDOM from 'react-dom';
import React, { useCallback, useRef, useState } from "react";
import Table from 'rc-table';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
if (window.option){var option=window.option;} else{var option='Login';}
if(option=='view'){var option_text='View Product';}else if(option=='call'){var option_text='Call Now';}else{var option_text='Login For Price';}
import DataTable from 'react-data-table-component';

export default function DiamondTable() {
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

    const data = [
        {
            
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
            
            sku: 'HG176',
            shape: 'Pear',
            carat: '0.30',
            color: 'G',
            clarity: 'VS1',
            report: 'FDI',
            price: option_text,
            trId: 'RC2',
        },
        {
            
            sku: 'HG177',
            shape: 'Pear',
            carat: '0.30',
            color: 'G',
            clarity: 'VS1',
            report: 'FDI',
            price: option_text,
            trId: 'RC3',
        },
        {
            
            sku: 'HG178',
            shape: 'Pear',
            carat: '0.30',
            color: 'G',
            clarity: 'VS1',
            report: 'FDI',
            price: option_text,
            trId: 'RC4',
        },
        {
            
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
            
            sku: 'HG176',
            shape: 'Pear',
            carat: '0.30',
            color: 'G',
            clarity: 'VS1',
            report: 'FDI',
            price: option_text,
            trId: 'RC6',
        },
        {
            
            sku: 'HG177',
            shape: 'Pear',
            carat: '0.30',
            color: 'G',
            clarity: 'VS1',
            report: 'FDI',
            price: option_text,
            trId: 'RC7',
        },
        {
            
            sku: 'HG178',
            shape: 'Pear',
            carat: '0.30',
            color: 'G',
            clarity: 'VS1',
            report: 'FDI',
            price: option_text,
            trId: 'RC8',
        },
        {
            
            sku: 'HG175',
            shape: 'Pear',
            carat: '0.30',
            color: 'G',
            clarity: 'VS1',
            report: 'FDI',
            price: option_text,
            trId: 'RC11',
        },
        {
            
            sku: 'HG176',
            shape: 'Pear',
            carat: '0.30',
            color: 'G',
            clarity: 'VS1',
            report: 'FDI',
            price: option_text,
            trId: 'RC12',
        },
        {
            
            sku: 'HG177',
            shape: 'Pear',
            carat: '0.30',
            color: 'G',
            clarity: 'VS1',
            report: 'FDI',
            price: option_text,
            trId: 'RC13',
        },
        {
            
            sku: 'HG178',
            shape: 'Pear',
            carat: '0.30',
            color: 'G',
            clarity: 'VS1',
            report: 'FDI',
            price: option_text,
            trId: 'RC14',
        },
        {
            
            sku: 'HG175',
            shape: 'Pear',
            carat: '0.30',
            color: 'G',
            clarity: 'VS1',
            report: 'FDI',
            price: option_text,
            trId: 'RC15',
        },
        {
            
            sku: 'HG176',
            shape: 'Pear',
            carat: '0.30',
            color: 'G',
            clarity: 'VS1',
            report: 'FDI',
            price: option_text,
            trId: 'RC16',
        },
        {
            
            sku: 'HG177',
            shape: 'Pear',
            carat: '0.30',
            color: 'G',
            clarity: 'VS1',
            report: 'FDI',
            price: option_text,
            trId: 'RC17',
        },
        {
            
            sku: 'HG178',
            shape: 'Pear',
            carat: '0.30',
            color: 'G',
            clarity: 'VS1',
            report: 'FDI',
            price: option_text,
            trId: 'RC18',
        },
    ];
    const selectProps = { indeterminate: isIndeterminate => isIndeterminate };


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
                        <div className="cust-data-table">
                        <DataTable columns={columns} data={data} selectableRows  pagination />
                        </div>
                    
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
    )
}
if (document.getElementById('diamondCompareTable')) {
    ReactDOM.render(<DiamondTable />, document.getElementById('diamondCompareTable'));
}