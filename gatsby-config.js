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
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 960,
                            linkImagesToOriginal: false,
                        }
                    }
                ]
            }
        },
        'gatsby-transformer-sharp',
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
