import React from "react";

import Link from 'gatsby-link';

import {Card, CardTitle, CardText} from 'react-md/lib/Cards';
import {Grid, Cell} from 'react-md/lib/Grids';

export default () => (
    <Card>
        <Grid>
            <Card className={Cell.getClassName({size: 4})}>
                <CardTitle title='Recent News'/>
                <CardText>Work in progress</CardText>
            </Card>
            <Card className={Cell.getClassName({size: 4})}>
                <CardTitle title='Mannafields'/>
                <CardText>
                    <p>Located in central Edinburgh, on Easter Road, Mannafields Christian School provides high quality
                        primary and secondary education from a Christ-centred perspective.</p>
                    <ul>
                        <li><Link to="/about/">About the School</Link></li>
                        <li><Link to="/why-christian-education/">About Christian Education</Link></li>
                        <li><Link to="/contact-us/">Contact the School</Link></li>
                        <li><Link to="/giving/donate/">Donate to the School</Link></li>
                    </ul>
                    <p>Some of our brothers and sisters in Christ have set up a <a
                        href="http://www.sunrisechristianschool.org.uk/">Christian School in Glasgow</a>.</p>
                </CardText>
            </Card>
            <Card className={Cell.getClassName({size: 4})}>
                <CardTitle title='Something Else'/>
                <CardText>Work in progress</CardText>
            </Card>
        </Grid>
    </Card>
);
