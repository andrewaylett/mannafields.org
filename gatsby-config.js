module.exports = {
    plugins: [
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: "Mannafields Christian School",
                short_name: "Mannafields",
                start_url: "/",
                background_color: "#2f4f63",
                theme_color: "#2f4f63",
                display: "browser",
                icons: [
                    {
                        // Everything in /static will be copied to an equivalent
                        // directory in /public during development and build, so
                        // assuming your favicons are in /static/favicons,
                        // you can reference them here
                        src: `/favicons/logo-192x192.png`,
                        sizes: `192x192`,
                        type: `image/png`,
                    },
                    {
                        src: `/favicons/logo-512x512.png`,
                        sizes: `512x512`,
                        type: `image/png`,
                    },
                ],
            },
        },
        'gatsby-plugin-offline',
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
        'gatsby-plugin-catch-links',
        'gatsby-plugin-sass',
    ]
};
