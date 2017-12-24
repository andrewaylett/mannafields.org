import Typography from "typography";
import lawtonTheme from "typography-theme-lawton";

import background from '../images/glossy-light-blue.png';

lawtonTheme.overrideThemeStyles = () => ({
    'body': {
        backgroundImage: 'url(' + background +')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top',
        backgroundColor: 'rgb(87, 127, 152)',
    }
});

const typography = new Typography(lawtonTheme);

module.exports = typography;

