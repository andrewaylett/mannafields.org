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

const getNavList = () => {
    return [
        {
            primaryText: "Home",
            leftIcon: <FontIcon>home</FontIcon>,
            component: Link,
            to: "/"
        },
        {
            divider: true
        },
        {
            primaryText: 'About',
            leftIcon: <FontIcon>school</FontIcon>,
            component: Link,
            to: '/about/'
        }
    ];
};

class ChipLink extends React.Component {

    render() {
        return <a href={this.props.to}><Chip lassName={module.chiplink} label={this.props.label}
                                             avatar={this.props.avatar}/></a>;
    }

    static propTypes = {
        to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
    }
}

export default ({children}) => (
    <div className={module.everything}>
        <NavigationDrawer
            drawerTitle='Mannafields'
            toolbarTitle='Mannafields Christian School'
            contentClassName="main-content"
            navItems={getNavList()}
            mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
            tabletDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
            desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        >
            <div className={module.wrapper}>
                {children()}
                <div className={module.main}>
                    <Grid>
                        <Card className={Cell.getClassName({size: 4, tabletSize: 6})}>
                            <CardTitle>Get In Touch</CardTitle>
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
                        <Card className={Cell.getClassName({size: 4, tabletSize: 6})}>
                            <CardTitle>Footer block two</CardTitle>
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
                        <Card className={Cell.getClassName({size: 4, tabletSize: 6})}>
                            <CardTitle>Footer block three</CardTitle>
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
