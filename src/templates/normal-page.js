import React from "react";

import {Card, CardText} from 'react-md/lib/Cards';

export default ({data}) => {
    const post = data.markdownRemark;
    return (
        <Card>
            <CardText><div dangerouslySetInnerHTML={{__html: post.html}}/></CardText>
        </Card>
    );
};

export const query = graphql`
  query PageDataQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

