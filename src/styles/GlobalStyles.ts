import { createGlobalStyle } from 'styled-components';
import InstrumentSans from '../assets/fonts/InstrumentSans-VariableFont_wdth,wght.ttf';
import InstrumentSansItalic from '../assets/fonts/InstrumentSans-Italic-VariableFont_wdth,wght.ttf';

const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'InstrumentSans';
        src: url(${InstrumentSans}) format('truetype');
    }

    @font-face {
        font-family: 'InstrumentSans-Italic';
        src: url(${InstrumentSansItalic}) format('truetype');
    }

    body {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'InstrumentSans';
    }

    h1, h2, h3, h4, h5, h6, p, a, span, li {
        margin: 0;
    }

    img {
        width: 100%;
    }

    p {
        line-height: 150%;
    }

    a {
        text-decoration: none;
    }

`;

export default GlobalStyles;
