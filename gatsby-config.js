module.exports = {
    // Note: it must *not* have a trailing slash.
    pathPrefix: '/mf-website',
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `src`,
                path: `${__dirname}/src/`,
            },
        },
        'gatsby-transformer-remark',
        'gatsby-plugin-glamor',
        'gatsby-plugin-sass',
        {
            resolve: 'gatsby-plugin-typography',
            options: {
                pathToConfigModule: 'src/utils/typography',
            },
        },
    ]
};
