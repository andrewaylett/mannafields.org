import React from "react";
import Helmet from 'react-helmet';

import Link from 'gatsby-link';
import Img from 'gatsby-image';

import {Card, CardTitle, CardText} from 'react-md/lib/Cards';
import {Grid, Cell} from 'react-md/lib/Grids';
import {Media, MediaOverlay} from 'react-md/lib/Media';

function imageResolutions(data, for_page) {
    for (let edge of data.allImageSharp.edges) {
        let node = edge.node;
        if (node.fields.matching_page === for_page) {
            return node.resolutions;
        }
    }
    return null;
}

function mediaForPage(data, node) {
    let text = node.frontmatter.label ? node.frontmatter.label : node.frontmatter.title;
    let resolutions = imageResolutions(data, node.fields.slug);
    if (resolutions) {
        return (
            <Media>
                <Img resolutions={resolutions}/>
                <MediaOverlay>
                    <CardTitle title={text}/>
                </MediaOverlay>
            </Media>
        );
    } else {
        return (
            <Media>
                <MediaOverlay>
                    <CardTitle title={text}/>
                </MediaOverlay>
            </Media>
        );
    }
}

function cardForPage(data, node) {
    return <Card className={Cell.getClassName({side: 4})} key={node.fields.slug}>
        <Link to={node.fields.slug}>
            {mediaForPage(data, node)}
        </Link>
    </Card>;
}

function cards(data) {
    return data.allMarkdownRemark.edges.map(
        ({node}) => cardForPage(data, node)
    );
}

export default ({data}) => (
    <div>
        <Helmet>
            <title>Mannafields Christian School</title>
        </Helmet>
        <Card>
            <CardText>
                <p>Located in central Edinburgh, on Easter Road, Mannafields Christian School provides high quality
                    primary and secondary education from a Christ-centred perspective.</p>
            </CardText>
        </Card>
        <Grid>
            {cards(data)}
        </Grid>
    </div>
);

export const query = graphql`
  query IndexImageSampleQuery {
      allImageSharp(
         filter: { fields: { level: { eq: 1 } } }
      ) {
          edges {
              node {
                  fields {
                    matching_page
                  }
                  # Specify the image processing steps right in the query
                  # Makes it trivial to update as your page's design changes.
                  resolutions(width: 300, height: 225) {
                      ...GatsbyImageSharpResolutions
                  }
              }
          }
      }
        allMarkdownRemark(
            filter: { fields: { level: { eq: 1 } } }
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
`;
