var plugins = [{
      plugin: require('D:/Github shit/gatsbyP/gatsby/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('D:/Github shit/gatsbyP/gatsby/node_modules/gatsby-source-sanity/gatsby-ssr'),
      options: {"plugins":[],"projectId":"crllpd9g","dataset":"production","watchMode":true,"token":"sktwG5uCAubtMUjvpryTJ6Us6huTOLFpRtIFKDlGdXrktJg41HQ0PlMhkrHC8TB5nzuzR5AAKaYnPup3yeXbBEJGBCoojb47ca67r3Dn8KA6PyakYHYF8Lh0QSrJcICNQsU0hykoRHsvniNVPXhLTvCWUp2Ab3YysM52d8hewhCs1HDUsiWN","graphqlTag":"default"},
    },{
      plugin: require('D:/Github shit/gatsbyP/gatsby/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
