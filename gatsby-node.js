const path = require(`path`);
const {createFilePath} = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({node, getNode, actions}) => {
    const {createNodeField} = actions;
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({node, getNode, basePath: `pages`});
        let level = (slug.match(/\//g) || []).length - 1;
        const parent = path.resolve(slug, '..');
        const resolved_slug = path.resolve(slug);


        let str = '';
        let component_array = resolved_slug.split('/');
        component_array.pop();
        component_array.map((x) => (x + '\\/')).reverse().map((elem) => {str = '(' + elem + str + ')?'});
        str = '/^' + str + '$/';
        console.log(str);

        createNodeField({
            node,
            name: 'parent_regex',
            value: str,
        });
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

    if (node.internal.type === 'ImageSharp') {
        const slug = createFilePath({node, getNode, basePath: `images/pages`});
        let level = (slug.match(/\//g) || []).length - 1;
        let matching_page = slug.replace(/\..*$/, '/');
        createNodeField({
            node,
            name: 'level',
            value: level,
        });
        createNodeField({
            node,
            name: 'matching_page',
            value: matching_page,
        });
    }
};

exports.createPages = async ({graphql, actions}) => {
    const {createPage} = actions;

    const result = await graphql(`
      {
        allMarkdownRemark(
            sort: { order: ASC, fields: [frontmatter___index] }
        ) {
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

    let edges = result.data.allMarkdownRemark.edges;

    edges.reduce((map, {node}) => {
        if (map.has(node.fields.parent)) {
            const siblings = map.get(node.fields.parent);
            const prev = siblings[siblings.length-1];
            prev.next = node.fields.slug;
            node.prev = prev.fields.slug;
            siblings.push(node);
        } else {
            map.set(node.fields.parent, [node]);
        }
        return map;
    }, new Map());

    edges.forEach(({node}) => {
        const component = path.resolve(`./src/templates/normal-page.js`);
        const context = {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
            level: node.fields.level,
            resolved_slug: node.fields.resolved_slug,
            parent_regex: node.fields.parent_regex,
            next: node.next ? node.next : "",
            prev: node.prev ? node.prev : "",
        };
        console.log(context);
        createPage({
            path: node.fields.slug,
            component,
            context,
        })
    });
};
