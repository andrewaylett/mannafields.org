import React from "react";

import Container from '../components/container';

export default ({data}) => {
    const post = data.markdownRemark;
    return (
        <Container>
            <h1>{post.frontmatter.title}</h1>
            <Container><div dangerouslySetInnerHTML={{__html: post.html}}/></Container>
        </Container>
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

