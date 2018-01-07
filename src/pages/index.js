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
            <Card className={Cell.getClassName({size: 4})}>
                <Link to='/about/'>
                    <Media>
                        <Img sizes={imageSizes(data, 'about')}/>
                        <MediaOverlay>
                            <CardTitle title='About Mannafields'/>
                        </MediaOverlay>
                    </Media>
                </Link>
            </Card>
            <Card className={Cell.getClassName({size: 4})}>
                <Link to='/contact-us/'>
                    <Media>
                        <Img sizes={imageSizes(data, 'contact')}/>
                        <MediaOverlay>
                            <CardTitle title='Contact Mannafields'/>
                        </MediaOverlay>
                    </Media>
                </Link>
            </Card>
            <Card className={Cell.getClassName({size: 4})}>
                <Link to='/why-christian-education/'>
                    <Media>
                        <Img sizes={imageSizes(data, 'about')}/>
                        <MediaOverlay>
                            <CardTitle title='What We Do' subtitle={'Why Christian Education?'}/>
                        </MediaOverlay>
                    </Media>
                </Link>
            </Card>
            <Card className={Cell.getClassName({size: 4})}>
                <Link to='/about/'>
                    <Media>
                        <Img sizes={imageSizes(data, 'about')}/>
                        <MediaOverlay>
                            <CardTitle title='About Mannafields'/>
                        </MediaOverlay>
                    </Media>
                </Link>
            </Card>
            <Card className={Cell.getClassName({size: 4})}>
                <Link to='/contact-us/'>
                    <Media>
                        <Img sizes={imageSizes(data, 'contact')}/>
                        <MediaOverlay>
                            <CardTitle title='Contact Mannafields'/>
                        </MediaOverlay>
                    </Media>
                </Link>
            </Card>
            <Card className={Cell.getClassName({size: 4})}>
                <Link to='/why-christian-education/'>
                    <Media>
                        <Img sizes={imageSizes(data, 'about')}/>
                        <MediaOverlay>
                            <CardTitle title='What We Do' subtitle={'Why Christian Education?'}/>
                        </MediaOverlay>
                    </Media>
                </Link>
            </Card>
            <Card className={Cell.getClassName({size: 4})}>
                <Link to='/about/'>
                    <Media>
                        <Img sizes={imageSizes(data, 'about')}/>
                        <MediaOverlay>
                            <CardTitle title='About Mannafields'/>
                        </MediaOverlay>
                    </Media>
                </Link>
            </Card>
            <Card className={Cell.getClassName({size: 4})}>
                <Link to='/contact-us/'>
                    <Media>
                        <Img sizes={imageSizes(data, 'contact')}/>
                        <MediaOverlay>
                            <CardTitle title='Contact Mannafields'/>
                        </MediaOverlay>
                    </Media>
                </Link>
            </Card>
            <Card className={Cell.getClassName({size: 4})}>
                <Link to='/why-christian-education/'>
                    <Media>
                        <Img sizes={imageSizes(data, 'about')}/>
                        <MediaOverlay>
                            <CardTitle title='What We Do' subtitle={'Why Christian Education?'}/>
                        </MediaOverlay>
                    </Media>
                </Link>
            </Card>
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
  }
`;
