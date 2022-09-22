import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";

import { graphql } from "gatsby";

import { Card, CardText, CardTitle } from "react-md/lib/Cards";
import { Grid, Cell } from "react-md/lib/Grids";
import { Avatar } from "react-md/lib/Avatars";
import { ChipLink } from "../components/Chips";
import { Media, MediaOverlay } from "react-md/lib/Media";
import Img from "gatsby-image";

import { MdArrowBack, MdArrowUpward, MdArrowForward } from "react-icons/md";

import module from "./normalpage.module.css";
import Link from "gatsby-link";

function arrow(direction) {
  if (direction === "back") {
    return <MdArrowBack />;
  }
  if (direction === "upward") {
    return <MdArrowUpward />;
  }
  if (direction === "forward") {
    return <MdArrowForward />;
  }
}

function maybeLink(node, direction) {
  if (node) {
    return (
      <ChipLink
        to={node.fields.slug}
        avatar={<Avatar icon={arrow(direction)} />}
        label={node.frontmatter.label ? node.frontmatter.label : node.frontmatter.title}
      />
    );
  }
}

function navigation({ prev, next, markdownRemark, parents }) {
  if (markdownRemark.fields.level >= 3) {
    const parent = parents.edges[parents.edges.length - 1].node;
    return (
      <Grid>
        <Cell className={module.cell} size={4}>
          {maybeLink(prev, "back")}
        </Cell>
        <Cell className={module.cell} size={4}>
          {maybeLink(parent, "upward")}
        </Cell>
        <Cell className={module.cell} size={4}>
          {maybeLink(next, "forward")}
        </Cell>
      </Grid>
    );
  }
}

function header(data) {
  if (data.imageSharp) {
    return (
      <Media>
        <Img sizes={data.imageSharp.sizes} />
        <div className={module.breadcrumbs_block}>
          <Link to="/">Home</Link>
          {data.parents
            ? data.parents.edges.map(({ node }) => (
                <Link to={node.fields.slug} key={node.fields.slug}>
                  {node.frontmatter.label ? node.frontmatter.label : node.frontmatter.title}
                </Link>
              ))
            : []}
        </div>
        <MediaOverlay>
          <CardTitle title={data.markdownRemark.frontmatter.title} />
        </MediaOverlay>
      </Media>
    );
  } else {
    return [
      <div className={module.breadcrumbs_inline} key="breadcrumbs">
        <Link to="/">Home</Link>
        {data.parents
          ? data.parents.edges.map(({ node }) => [
              <span key="span"> &gt; </span>,
              <Link to={node.fields.slug} key={node.fields.slug}>
                {node.frontmatter.label ? node.frontmatter.label : node.frontmatter.title}
              </Link>,
            ])
          : []}
      </div>,
      <CardTitle title={data.markdownRemark.frontmatter.title} key="title" />,
    ];
  }
}

function getNavList(query) {
  const edges = query.allMarkdownRemark ? query.allMarkdownRemark.edges : [];
  return edges.map(({ node }) => (
    <Link to={node.fields.slug} className={Cell.getClassName({ size: 4 })} key={node.fields.slug}>
      <Card className={module.card_link}>
        <CardTitle title={node.frontmatter.label ? node.frontmatter.label : node.frontmatter.title} />
      </Card>
    </Link>
  ));
}

const NormalPage = ({ data }) => {
  const post = data.markdownRemark;
  return (
    <div>
      <Card>
        <Helmet>
          <title>
            {post.frontmatter.label ? post.frontmatter.label : post.frontmatter.title} | Mannafields Christian School
          </title>
        </Helmet>
        {header(data)}
        <CardText>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          {navigation(data)}
        </CardText>
      </Card>

      <Grid>{getNavList(data, post.fields.slug)}</Grid>
    </div>
  );
};

NormalPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        label: PropTypes.string,
        title: PropTypes.string.isRequired,
      }).isRequired,
      html: PropTypes.string.isRequired,
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default NormalPage;

export const query = graphql`
  query PageDataQuery($slug: String!, $resolved_slug: String!, $parent_regex: String!, $prev: String!, $next: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        label
      }
      fields {
        slug
        level
      }
    }
    prev: markdownRemark(fields: { slug: { eq: $prev } }) {
      frontmatter {
        title
        label
      }
      fields {
        slug
      }
    }
    next: markdownRemark(fields: { slug: { eq: $next } }) {
      frontmatter {
        title
        label
      }
      fields {
        slug
      }
    }
    imageSharp(fields: { matching_page: { eq: $slug } }) {
      fields {
        matching_page
      }
      # Specify the image processing steps right in the query
      # Makes it trivial to update as your page's design changes.
      sizes(maxWidth: 960) {
        ...GatsbyImageSharpSizes
      }
    }
    allMarkdownRemark(
      filter: { fields: { parent: { eq: $resolved_slug } } }
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
            level
            parent
          }
        }
      }
    }
    parents: allMarkdownRemark(filter: { fields: { slug: { regex: $parent_regex } } }) {
      edges {
        node {
          fields {
            slug
            level
            parent
            resolved_slug
            parent_regex
          }
          frontmatter {
            label
            title
          }
        }
      }
    }
  }
`;
