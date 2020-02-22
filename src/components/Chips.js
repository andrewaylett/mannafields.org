import React from 'react';

import Link from 'gatsby-link';

import {Chip} from 'react-md/lib/Chips';

import css_module from './chips.module.scss';

export class ChipLink extends React.Component {
    render() {
        return (
            <Link to={this.props.to} className={css_module.chip}>
                <Chip label={this.props.label}
                      avatar={this.props.avatar}/>
            </Link>
        );
    }
}

export class ChipA extends React.Component {
    render() {
        return (
            <a href={this.props.to} className={css_module.chip}>
                <Chip label={this.props.label}
                      avatar={this.props.avatar}/>
            </a>
        );
    }
}
