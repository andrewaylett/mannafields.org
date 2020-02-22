import React from 'react';

import Helmet from 'react-helmet';

import { StaticQuery, graphql } from 'gatsby';

import Link from 'gatsby-link';
import Avatar from 'react-md/lib/Avatars';
import TwitterBoxIcon from 'mdi-react/TwitterBoxIcon';
import FacebookBoxIcon from 'mdi-react/FacebookBoxIcon';

import { MdHome, MdSchool, MdPhone, MdEmail, MdMenu } from 'react-icons/md';

import NavigationDrawer from 'react-md/lib/NavigationDrawers';

import module from './index.module.scss';

import 'react-md/src/scss/_react-md.scss';
import 'react-md/dist/react-md.blue-light_blue.min.css';
import 'react-md/src/scss/_typography.scss';

import 'typeface-roboto';

import './main.css';

import { ChipLink, ChipA } from '../components/Chips';

class EmLink extends React.Component {
  render () {
    return <u><Link {...this.props}/></u>;
  }
}

function getNavList (query) {
  const result = [
    {
      primaryText: 'Home',
      leftIcon: <MdHome className={module.home}/>,
      component: Link,
      to: '/'
    }
  ];

  for (let node of query.allMarkdownRemark.edges) {
    node = node.node;
    const level = (node.fields.slug.match(/\//g) || []).length - 1;
    if (level > 2) {
      continue;
    }
    const pageDetails = {
      primaryText: node.frontmatter.label ? node.frontmatter.label : node.frontmatter.title,
      component: Link,
      to: node.fields.slug
    };
    if (level === 1) {
      result.push({ divider: true });
      pageDetails.component = EmLink;
    }
    result.push(pageDetails);
  }

  return result;
}

export default ({ children }) => {
  return <StaticQuery
    query={graphql`
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
        `}
    render={data =>
      <div className={module.everything}>
        <NavigationDrawer
          toolbarTitle='Mannafields Christian School'
          contentClassName="main-content"
          navItems={getNavList(data)}
          defaultMedia='mobile'
          mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
          tabletDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
          desktopDrawerType={NavigationDrawer.DrawerTypes.FULL_HEIGHT}
          temporaryIcon={<MdMenu className={module.hamburger}/>}
        >
          <Helmet>
            <link rel='icon' href='/favicons/logo-192x192.png'/>
          </Helmet>
          <div className={module.wrapper}>
            {children}
            <div className={module.main}>
              <ChipLink to='/contact-us/'
                avatar={<Avatar icon={<MdSchool/>}/>}
                label='Contact Us'/>
              <ChipA to='tel:+441315163221' avatar={<Avatar icon={<MdPhone/>}/>}
                label='(+44) 131 516 3221'/>
              <ChipA to='mailto:info@mannafields.org'
                avatar={<Avatar icon={<MdEmail/>}/>}
                label='info@mannafields.org'/>
              <ChipA to='https://www.facebook.com/MannafieldsChristianSchool'
                avatar={<Avatar icon={<FacebookBoxIcon className={module.icon}/>}/>}
                label='Facebook'/>
              <ChipA to='https://twitter.com/mannafields'
                avatar={<Avatar icon={<TwitterBoxIcon className={module.icon}/>}/>}
                label='@mannafields'/>
            </div>
            <div className={module.bottom}>
                            Copyright &copy; 2004-2020 Mannafields Christian Education Association. Scottish Charity No.
                            SC006202
            </div>
          </div>
        </NavigationDrawer>
      </div>
    }/>;
};
