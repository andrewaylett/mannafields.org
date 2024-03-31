const path = require('path');

const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ actions, getNode, node }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' });
    const level = (slug.match(/\//g) || []).length - 1;
    const parent = path.resolve(slug, '..');
    const resolvedSlug = path.resolve(slug);

    let str = '';
    const componentArray = resolvedSlug.split('/');
    componentArray.pop();
    componentArray
      .map((x) => x + '\\/')
      .reverse()
      .forEach((elem) => {
        str = '(' + elem + str + ')?';
      });
    str = '/^' + str + '$/';
    console.log(str);

    createNodeField({
      node,
      name: 'parent_regex',
      value: str,
    });
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
    createNodeField({
      node,
      name: 'level',
      value: level,
    });
    createNodeField({
      node,
      name: 'parent',
      value: parent,
    });
    createNodeField({
      node,
      name: 'resolved_slug',
      value: resolvedSlug,
    });
  }

  if (node.internal.type === 'ImageSharp') {
    const slug = createFilePath({ node, getNode, basePath: 'images/pages' });
    const level = (slug.match(/\//g) || []).length - 1;
    const matchingPage = slug.replace(/\..*$/, '/');
    createNodeField({
      node,
      name: 'level',
      value: level,
    });
    createNodeField({
      node,
      name: 'matching_page',
      value: matchingPage,
    });
  }
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___index] }) {
        edges {
          node {
            fields {
              slug
              level
              resolved_slug
              parent
              parent_regex
            }
            frontmatter {
              index
            }
          }
        }
      }
    }
  `);

  const edges = result.data.allMarkdownRemark.edges;

  edges.reduce((map, { node }) => {
    if (map.has(node.fields.parent)) {
      const siblings = map.get(node.fields.parent);
      const prev = siblings[siblings.length - 1];
      prev.next = node.fields.slug;
      node.prev = prev.fields.slug;
      siblings.push(node);
    } else {
      map.set(node.fields.parent, [node]);
    }
    return map;
  }, new Map());

  edges.forEach(({ node }) => {
    const component = path.resolve('./src/templates/normal-page.js');
    const context = {
      // Data passed to context is available in page queries as GraphQL variables.
      slug: node.fields.slug,
      level: node.fields.level,
      resolved_slug: node.fields.resolved_slug,
      parent_regex: node.fields.parent_regex,
      next: node.next ? node.next : '',
      prev: node.prev ? node.prev : '',
    };
    console.log(context);
    createPage({
      path: node.fields.slug,
      component,
      context,
    });
  });
};

// exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
//   const config = getConfig();
//   config.output.hashFunction = 'sha256';
//   actions.replaceWebpackConfig(config);
// };
