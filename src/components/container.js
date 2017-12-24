import React from "react";

import module from './container.module.css';

export default ({ children }) => (
    <div className={module.container}>{children}</div>
);
