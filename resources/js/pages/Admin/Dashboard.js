import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {
    AppProvider, TextContainer, Card,Page,Layout,Thumbnail
} from "@shopify/polaris";
import {Provider, TitleBar} from '@shopify/app-bridge-react';
import enTranslations from '@shopify/polaris/locales/en.json';
const HOME_URL =window.home_url;
import DiamondPreview from './Search';
export default function App (){
        const url = HOME_URL+'img/diamond.png';
        const actualPageMarkup = (                               
                    <Card sectioned>
                        <Card.Section>
                            <TextContainer>Diamond Search App allows you to display thousands of variant of diamonds straight onto your website.
                            </TextContainer>
                        </Card.Section>
                        <Card.Section>
                        <div id="searchPreview" className="search-options search-options">
                            <DiamondPreview />
                        </div>
                        </Card.Section>
                    </Card>
        );
        return(
            <div> {actualPageMarkup} </div>
        );
}
if (document.getElementById("dashboard")) {
    ReactDOM.render(<AppProvider i18n={enTranslations}><App /></AppProvider>, document.getElementById("dashboard"));
}