import React from 'react';
import Link from 'gatsby-link';

import module from './index.module.css';

export default ({children}) => (
    <div className={module.wrapper}>
        <Link className={module.header} to='/'>Mannafields Christian School</Link>
        <div className={module.main}>
            {children()}
        </div>
        <div className={module.bottom}>
            Copyright &copy; 2004-2017 Mannafields Christian Education Association. Scottish Charity No. SC006202
        </div>
    </div>
);
