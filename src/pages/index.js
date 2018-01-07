import React from "react";
import Helmet from 'react-helmet';

import Link from 'gatsby-link';
import Img from 'gatsby-image';

import {Card, CardTitle, CardText} from 'react-md/lib/Cards';
import {Grid, Cell} from 'react-md/lib/Grids';
import {Media, MediaOverlay} from 'react-md/lib/Media';

function imageSizes(data, basename) {
    for (let edge of data.allFile.edges) {
        let node = edge.node;
        if (node.relativePath === 'images/' + basename + '.jpg') {
            return node.childImageSharp.sizes;
        }
    }
    return null;
}

function mediaForPage(data, node) {
    let text = node.frontmatter.label ? node.frontmatter.label : node.frontmatter.title;
    if (node.frontmatter.hero_image) {
        return (
            <Media>
                <Img sizes={imageSizes(data, node.frontmatter.hero_image)}/>
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
    let result = [];
    for (let edge of data.allMarkdownRemark.edges) {
        let node = edge.node;
        if (node.frontmatter.subheader) {
            result.push(cardForPage(data, node));
        }
    }
    return result;
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
        allMarkdownRemark(
            sort: { order: ASC, fields: [frontmatter___index] }
        ) {
            edges {
                node {
                    frontmatter {
                        title
                        subheader
                        index
                        label
                        hero_image
                    }
                    fields {
                        slug
                    }
                }
            }
        }
  }
`;
