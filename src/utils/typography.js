import Typography from "typography";
import lawtonTheme from "typography-theme-lawton";

import background from '../images/glossy-light-blue.png';

lawtonTheme.overrideThemeStyles = () => ({
    'body': {
        backgroundImage: 'url(' + background +')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        backgroundColor: 'rgb(77, 127, 149)',
    }
});

const typography = new Typography(lawtonTheme);

module.exports = typography;

