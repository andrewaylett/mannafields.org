const path = require(`path`);
const {createFilePath} = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({node, getNode, boundActionCreators}) => {
    const {createNodeField} = boundActionCreators;
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({node, getNode, basePath: `pages`});
        let level = (slug.match(/\//g) || []).length - 1;
        const parent = path.resolve(slug, '..');
        const resolved_slug = path.resolve(slug);
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        });
        createNodeField({
            node,
            name: `level`,
            value: level,
        });
        createNodeField({
            node,
            name: `parent`,
            value: parent,
        });
        createNodeField({
            node,
            name: `resolved_slug`,
            value: resolved_slug,
        });
    }
};

exports.createPages = async ({graphql, boundActionCreators}) => {
    const {createPage} = boundActionCreators;

    const result = await graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
                level
                resolved_slug
              }
            }
          }
        }
      }
    `);

    result.data.allMarkdownRemark.edges.map(({node}) => {
        const component = path.resolve(`./src/templates/normal-page.js`);
        const context = {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
            level: node.fields.level,
            resolved_slug: node.fields.resolved_slug,
        };
        console.log(context);
        createPage({
            path: node.fields.slug,
            component,
            context,
        })
    });
};
