import React from 'react';

import Link from 'gatsby-link';

import PropTypes from 'prop-types';
import {Chip} from 'react-md/lib/Chips';

import css_module from './chips.module.scss';

class ChipLink extends React.Component {
    render() {
        return (
            <Link to={this.props.to} className={css_module.chip}>
                <Chip label={this.props.label}
                      avatar={this.props.avatar}/>
            </Link>
        );
    }

    static propTypes = {
        to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
    }
}

class ChipA extends React.Component {
    render() {
        return (
            <a href={this.props.to} className={css_module.chip}>
                <Chip label={this.props.label}
                      avatar={this.props.avatar}/>
            </a>
        );
    }

    static propTypes = {
        to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
    }
}

module.exports = {
    'ChipLink': ChipLink,
    'ChipA': ChipA,
};
