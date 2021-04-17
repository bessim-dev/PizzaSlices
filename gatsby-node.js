import _fetch from "isomorphic-fetch";

const path = require(`path`);

async function turnToppingsIntoPage({graphql, actions}){
    const {createPage} = actions
    const toppingTemplate = path.resolve('./src/pages/pizzas.jsx')
    const {data} = await graphql(`
        query {
            toppings: allSanityTopping {
                nodes {
                  name
                  id
                }
              }
        }
    `)
    data.toppings.nodes.forEach(topping => {
        createPage({
            path:`topping/${topping.name.toLowerCase()}`,
            component:toppingTemplate,
            context:{
                regex : `/${topping.name}/i`
            }
        })
    })
}
async function turnPizzaIntoPage({ graphql, actions }){
    const { createPage } = actions

    const pizzaTemplate = path.resolve('./src/templates/Pizza.jsx')

    const {data} = await graphql(`
        query {
            pizzas : allSanityPizza {
                nodes {
                    name
                    slug {
                        current
                    }
                }
            }
        }
    `)
    data.pizzas.nodes.forEach(pizza => {
        createPage({
          path: `pizza/${pizza.slug.current}`,
          component: pizzaTemplate,
          context: {
            slug:pizza.slug.current,
          },
        })
      })
}
async function fetchBeersAndTurnIntoNodes({actions,createNodeId,createContentDigest}){
      const res = await _fetch('https://api.sampleapis.com/beers/ale');
      const beers = await res.json();
      console.log(beers)

}
export async function sourceNodes(param){
    await fetchBeersAndTurnIntoNodes(param)
}

export async function createPages(params){
    await Promise.all([turnPizzaIntoPage(params),turnToppingsIntoPage(params)]) 
    
}