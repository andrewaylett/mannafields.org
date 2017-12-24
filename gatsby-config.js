module.exports = {
    // Note: it must *not* have a trailing slash.
    pathPrefix: '/mf-website',
    plugins: [
        'gatsby-plugin-glamor',
        {
            resolve: 'gatsby-plugin-typography',
            options: {
                pathToConfigModule: 'src/utils/typography',
            },
        },
    ]
};
