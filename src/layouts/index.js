import React from 'react';
import PropTypes from 'prop-types';

import Link from 'gatsby-link';
import FontIcon from 'react-md/lib/FontIcons';
import Avatar from 'react-md/lib/Avatars';
import TwitterBoxIcon from 'mdi-react/TwitterBoxIcon';
import FacebookBoxIcon from 'mdi-react/FacebookBoxIcon';

import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import {Grid, Cell} from 'react-md/lib/Grids';
import {Card, CardTitle, CardText} from 'react-md/lib/Cards';
import {Chip} from 'react-md/lib/Chips';

import module from './index.module.scss';

import 'react-md/src/scss/_react-md.scss'
import 'react-md/dist/react-md.blue-light_blue.min.css'
import 'react-md/src/scss/_typography.scss'

function getPageData(query) {
    const thisPageSlug = query.file.relativePath;

    switch (thisPageSlug) {
        case '/':
            return {
                frontmatter: {
                    title: "Home"
                },
                fields: {
                    slug: '/'
                }
            };

        default:
            for (let node of query.allMarkdownRemark.edges) {
                if (node.fields.slug === thisPageSlug) {
                    return node;
                }
            }
            throw "Didn't find page in collection";
    }
}

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
            primaryText: node.frontmatter.title,
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

const FooterCardOne = ()=>(
    <Card className={Cell.getClassName({size: 4})}>
        <CardTitle title='Get In Touch'/>
        <CardText className={module.chipBlock}>
            <ChipLink to='phone:+441316595602' avatar={<Avatar icon={<FontIcon>phone</FontIcon>}/>}
                      label='(+44) 131 659 5602'/>
            <ChipLink to='email:info@mannafields.org'
                      avatar={<Avatar icon={<FontIcon>email</FontIcon>}/>}
                      label='info@mannafields.org'/>
            <ChipLink to='https://www.facebook.com/MannafieldsChristianSchool'
                      avatar={<Avatar icon={<FacebookBoxIcon className={module.icon}/>}/>}
                      label='Facebook'/>
            <ChipLink to='https://twitter.com/mannafields'
                      avatar={<Avatar icon={<TwitterBoxIcon className={module.icon}/>}/>}
                      label='@mannafields'/>
        </CardText>
    </Card>
);

const FooterCardTwo = ()=>(
    <Card className={Cell.getClassName({size: 4})}>
        <CardTitle title='Footer Block Two'/>
        <CardText>
            <ChipLink to='phone:+441316595602' avatar={<Avatar icon={<FontIcon>phone</FontIcon>}/>}
                      label='(+44) 131 659 5602'/>
            <ChipLink to='email:info@mannafields.org'
                      avatar={<Avatar icon={<FontIcon>email</FontIcon>}/>}
                      label='info@mannafields.org'/>
            <ChipLink to='https://www.facebook.com/MannafieldsChristianSchool'
                      avatar={<Avatar icon={<FacebookBoxIcon className={module.icon}/>}/>}
                      label='Facebook'/>
            <ChipLink to='https://twitter.com/mannafields'
                      avatar={<Avatar icon={<TwitterBoxIcon className={module.icon}/>}/>}
                      label='@mannafields'/>
        </CardText>
    </Card>
);

const FooterCardThree = ()=>(
    <Card className={Cell.getClassName({size: 4})}>
        <CardTitle title='Footer Block Two'/>
        <CardText>
            <ChipLink to='phone:+441316595602' avatar={<Avatar icon={<FontIcon>phone</FontIcon>}/>}
                      label='(+44) 131 659 5602'/>
            <ChipLink to='email:info@mannafields.org'
                      avatar={<Avatar icon={<FontIcon>email</FontIcon>}/>}
                      label='info@mannafields.org'/>
            <ChipLink to='https://www.facebook.com/MannafieldsChristianSchool'
                      avatar={<Avatar icon={<FacebookBoxIcon className={module.icon}/>}/>}
                      label='Facebook'/>
            <ChipLink to='https://twitter.com/mannafields'
                      avatar={<Avatar icon={<TwitterBoxIcon className={module.icon}/>}/>}
                      label='@mannafields'/>
        </CardText>
    </Card>
);

export default ({children, data}) => (
    <div className={module.everything}>
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
                    <Grid>
                        <FooterCardOne/>
                        <FooterCardTwo/>
                        <FooterCardThree/>
                    </Grid>
                </div>
                <div className={module.bottom}>
                    Copyright &copy; 2004-2017 Mannafields Christian Education Association. Scottish Charity No.
                    SC006202
                </div>
            </div>
        </NavigationDrawer>
    </div>
);

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
                    }
                    fields {
                        slug
                    }
                }
            }
        }
    }
`;
