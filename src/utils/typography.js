import Typography from "typography";

import background from '../images/glossy-light-blue.png';

const typography = new Typography({
    overrideStyles: () => ({
        'body': {
            backgroundImage: 'url(' + background + ')',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top',
            backgroundColor: 'rgb(87, 127, 152)',
            backgroundAttachment: 'fixed',
        }
    })
});

module.exports = typography;

