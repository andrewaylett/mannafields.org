import React from "react";
import Helmet from 'react-helmet';

import {Card, CardText, CardTitle} from 'react-md/lib/Cards';
import {Grid, Cell} from 'react-md/lib/Grids';
import {FontIcon} from 'react-md/lib/FontIcons';
import {Avatar} from 'react-md/lib/Avatars';
import {ChipLink} from '../components/Chips';
import {Media, MediaOverlay} from 'react-md/lib/Media';
import Img from 'gatsby-image';

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
            <Cell className={module.cell} size={4}>{maybeLink(prev, 'back', 'Previous')}</Cell>
            <Cell className={module.cell} size={4}>{maybeLink(up, 'upward', 'Contents')}</Cell>
            <Cell className={module.cell} size={4}>{maybeLink(next, 'forward', 'Next')}</Cell>
        </Grid>
    }
}

function imageSizes(data, basename) {
    for (let edge of data.allFile.edges) {
        let node = edge.node;
        if (node.relativePath === 'images/' + basename + '.jpg') {
            return node.childImageSharp.sizes;
        }
    }
    return null;
}

function header(data) {
    if (data.markdownRemark.frontmatter.hero_image) {
        return <Media>
            <Img sizes={imageSizes(data, data.markdownRemark.frontmatter.hero_image)}/>
            <MediaOverlay>
                <CardTitle title={data.markdownRemark.frontmatter.title}/>
            </MediaOverlay>
        </Media>;
    } else {
        return <CardTitle title={data.markdownRemark.frontmatter.title}/>
    }
}

export default ({data}) => {
    const post = data.markdownRemark;
    return (
        <Card>
            <Helmet>
                <title>{post.frontmatter.label ? post.frontmatter.label : post.frontmatter.title} | Mannafields Christian School</title>
            </Helmet>
            {navigation(post.frontmatter)}
            {header(data)}
            <CardText>
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
        hero_image
      }
    }
      allFile {
          edges{
              node {
                  relativePath
                  childImageSharp {
                      # Specify the image processing steps right in the query
                      # Makes it trivial to update as your page's design changes.
                      sizes(maxWidth: 960) {
                          ...GatsbyImageSharpSizes
                      }
                  }
              }
          }
      }
  }
`;

