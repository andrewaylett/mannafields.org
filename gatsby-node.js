const path = require(`path`);
const {createFilePath} = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({node, getNode, boundActionCreators}) => {
    const {createNodeField} = boundActionCreators;
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({node, getNode, basePath: `pages`});
        let level = (slug.match(/\//g) || []).length - 1;
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
              }
            }
          }
        }
      }
    `);

    result.data.allMarkdownRemark.edges.map(({node}) => {
        console.log(node.fields);
        const component = path.resolve(`./src/templates/normal-page.js`);
        const context = {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug
        };
        createPage({
            path: node.fields.slug,
            component,
            context,
        })
    });
};
