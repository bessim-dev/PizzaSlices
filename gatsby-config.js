import dotenv from 'dotenv';

dotenv.config({ path: '.env' });
export default {
  siteMetadata : {
    title: "Slick Slices",
    siteUrl: "https://gatsby.pizza",
    description: "the best Pizza in Tunisia",
    twitter: "@bessim"
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: `crllpd9g`,
        dataset: `production`,
        watchMode: true,
        // a token with read permissions is required
        // if you have a private dataset
        token: process.env.SANITY_TOKEN,

        // If the Sanity GraphQL API was deployed using `--tag <name>`,
        // use `graphqlTag` to specify the tag name. Defaults to `default`.
        graphqlTag: 'default',
      },
    },
  ],
};
