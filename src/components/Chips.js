import React from "react";
import PropTypes from "prop-types";

import Link from "gatsby-link";

import { Chip } from "react-md/lib/Chips";

import cssModule from "./chips.module.scss";

export class ChipLink extends React.Component {
  render() {
    return (
      <Link to={this.props.to} className={cssModule.chip}>
        <Chip label={this.props.label} avatar={this.props.avatar} />
      </Link>
    );
  }
}

ChipLink.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  avatar: PropTypes.node.isRequired,
};

export class ChipA extends React.Component {
  render() {
    return (
      <a href={this.props.to} className={cssModule.chip}>
        <Chip label={this.props.label} avatar={this.props.avatar} />
      </a>
    );
  }
}

ChipA.prototype.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  avatar: PropTypes.node.isRequired,
};
