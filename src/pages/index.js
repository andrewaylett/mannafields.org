import React from "react";
import Helmet from 'react-helmet';

import Link from 'gatsby-link';
import Img from 'gatsby-image';

import {Card, CardTitle, CardText} from 'react-md/lib/Cards';
import {Grid, Cell} from 'react-md/lib/Grids';
import {Media, MediaOverlay} from 'react-md/lib/Media';

function imageSizes(data, for_page) {
    for (let edge of data.allImageSharp.edges) {
        let node = edge.node;
        if (node.fields.matching_page === for_page) {
            return node.sizes;
        }
    }
    return null;
}

function mediaForPage(data, node) {
    let text = node.frontmatter.label ? node.frontmatter.label : node.frontmatter.title;
    let sizes = imageSizes(data, node.fields.slug);
    if (sizes) {
        return (
            <Media>
                <Img sizes={sizes}/>
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

const openingDay = () => (Date.now() < new Date('2019-10-20')) ? <Card>
    <CardTitle title={'New Building Opening Celebration: 19th September 2019'}/>
    <CardText>
        <p>
            Please join us in celebrating all that God's done for the school over the last few months in giving us our new building, 19th September 2019, 6:30pm in the school.
        </p>
    </CardText>
</Card> : [];

const openDay = () => (Date.now() < new Date('2019-10-27')) ? <Card>
    <CardTitle title={'Open Day: 26th October 2019'}/>
    <CardText>
        <p>
            Come and visit the school for our open day: 26th October 2019, 1-3pm in the school.
        </p>
    </CardText>
</Card> : [];

export default ({data}) => (
    <div>
        <Helmet>
            <title>Mannafields Christian School</title>
        </Helmet>
        <Card>
            <CardText>
                <p>Located in central Edinburgh, Mannafields Christian School provides high quality
                    primary and secondary education from a Christ-centred perspective.</p>
            </CardText>
        </Card>
        <Grid>
            {cards(data)}
        </Grid>
        {openingDay()}
        {openDay()}
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
                  sizes(maxWidth: 960) {
                      ...GatsbyImageSharpSizes
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
