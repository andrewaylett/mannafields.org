import React from 'react';
import PropTypes from 'prop-types';

import Link from 'gatsby-link';
import FontIcon from 'react-md/lib/FontIcons';
import Avatar from 'react-md/lib/Avatars';
import TwitterBoxIcon from 'mdi-react/TwitterBoxIcon';
import FacebookBoxIcon from 'mdi-react/FacebookBoxIcon';

import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import {Chip} from 'react-md/lib/Chips';

import module from './index.module.scss';

import 'react-md/src/scss/_react-md.scss'
import 'react-md/dist/react-md.blue-light_blue.min.css'
import 'react-md/src/scss/_typography.scss'

function getNavList(query) {
    const result = [
        {
            primaryText: "Home",
            leftIcon: <FontIcon>home</FontIcon>,
            component: Link,
            to: "/"
        },
        {
            divider: true
        },
    ];

    for (let node of query.allMarkdownRemark.edges) {
        node = node.node;
        let pageDetails = {
            primaryText: node.frontmatter.label ? node.frontmatter.label : node.frontmatter.title,
            component: Link,
            to: node.fields.slug,
        };
        if (node.frontmatter.icon) {
            pageDetails.leftIcon = <FontIcon>{node.frontmatter.icon}</FontIcon>;
        }
        if (node.frontmatter.subheader) {
            pageDetails.subheader = true;
        }
        result.push(pageDetails);
    }

    return result;
}

class ChipLink extends React.Component {
    render() {
        return (
            <span>
            <Link to={this.props.to}>
                <Chip lassName={module.chiplink} label={this.props.label}
                      avatar={this.props.avatar}/>
            </Link>
                &nbsp;
            </span>)
    }

    static propTypes = {
        to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
    }
}

class ChipA extends React.Component {
    render() {
        return (
            <span>
            <a href={this.props.to}>
                <Chip lassName={module.chiplink} label={this.props.label}
                      avatar={this.props.avatar}/>
            </a>
                &nbsp;
            </span>)
    }

    static propTypes = {
        to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
    }
}

export default ({children, data}) => {
    // const pageData = getPageData(data);
    return <div className={module.everything}>
        <NavigationDrawer
            drawerTitle='Mannafields'
            toolbarTitle='Mannafields Christian School'
            contentClassName="main-content"
            navItems={getNavList(data)}
            mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
            tabletDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
            desktopDrawerType={NavigationDrawer.DrawerTypes.FULL_HEIGHT}
        >
            <div className={module.wrapper}>
                {children()}
                <div className={module.main}>
                    <ChipA to='tel:+441316595602' avatar={<Avatar icon={<FontIcon>phone</FontIcon>}/>}
                           label='(+44) 131 659 5602'/>
                    <ChipA to='mailto:info@mannafields.org'
                           avatar={<Avatar icon={<FontIcon>email</FontIcon>}/>}
                           label='info@mannafields.org'/>
                    <ChipA to='https://www.facebook.com/MannafieldsChristianSchool'
                           avatar={<Avatar icon={<FacebookBoxIcon className={module.icon}/>}/>}
                           label='Facebook'/>
                    <ChipA to='https://twitter.com/mannafields'
                           avatar={<Avatar icon={<TwitterBoxIcon className={module.icon}/>}/>}
                           label='@mannafields'/>
                    <ChipLink to='/contact-us/'
                              avatar={<Avatar icon={<FontIcon>school</FontIcon>}/>}
                              label='Contact Us'/>
                </div>
                <div className={module.bottom}>
                    Copyright &copy; 2004-2017 Mannafields Christian Education Association. Scottish Charity No.
                    SC006202
                </div>
            </div>
        </NavigationDrawer>
    </div>
};

export const query = graphql`
    query LayoutQuery {
        file {
            relativePath
        }
        allMarkdownRemark(
            sort: { order: ASC, fields: [frontmatter___index] }
        ) {
            edges {
                node {
                    frontmatter {
                        title
                        icon
                        subheader
                        index
                        label
                    }
                    fields {
                        slug
                    }
                }
            }
        }
    }
`;
