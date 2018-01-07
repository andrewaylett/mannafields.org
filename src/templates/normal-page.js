import React from "react";
import Helmet from 'react-helmet';

import {Card, CardText, CardTitle} from 'react-md/lib/Cards';
import {Grid, Cell} from 'react-md/lib/Grids';
import {FontIcon} from 'react-md/lib/FontIcons';
import {Avatar} from 'react-md/lib/Avatars';
import {ChipLink} from '../components/Chips';

import module from './normalpage.module.css';

function maybeLink(ref, direction, label) {
    if (ref) {
        return <ChipLink to={ref}
                         avatar={<Avatar icon={<FontIcon>arrow_{direction}</FontIcon>}/>}
                         label={label ? label : direction} />;
    }
}

function navigation({up, prev, next}) {
    if (up || prev || next) {
        return <Grid>
            <Cell className={module.cell} size={4}>{maybeLink(prev, 'back')}</Cell>
            <Cell className={module.cell} size={4}>{maybeLink(up, 'upward', 'Contents')}</Cell>
            <Cell className={module.cell} size={4}>{maybeLink(next, 'forward')}</Cell>
        </Grid>
    }
}

export default ({data}) => {
    const post = data.markdownRemark;
    return (
        <Card>
            <Helmet>
                <title>{post.frontmatter.label ? post.frontmatter.label : post.frontmatter.title} | Mannafields Christian School</title>
            </Helmet>
            <CardTitle title={post.frontmatter.title}/>
            <CardText>
                {navigation(post.frontmatter)}
                <div dangerouslySetInnerHTML={{__html: post.html}}/>
                {navigation(post.frontmatter)}
            </CardText>
        </Card>
    );
};

export const query = graphql`
  query PageDataQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        label
        up
        prev
        next
      }
    }
  }
`;

