import React from 'react';
import PropTypes from 'prop-types';

import module from './container.module.css';

const Container = ({ children }) => (
  <div className={module.container}>{children}</div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired
};

export default Container;
