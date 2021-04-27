import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';
import SEO from '../components/SEO';
import Toppings from '../components/Toppings';

export default function PizzasPage({ data,pageContext }) {
  const pizzas = data.pizzas.nodes;
  return (
    <>
          <SEO
        title={
          pageContext.topping
            ? `Pizzas With ${pageContext.topping}`
            : `All Pizzas`
        }
      />
      <Toppings activeTopping={pageContext.topping}/>
      <PizzaList pizzas={pizzas} />
    </>
  );
}
export const query = graphql`
  query PizzaQuery($regex: String) {
    pizzas: allSanityPizza(filter: {toppings: {elemMatch: {name: {regex: $regex}}}}) {
      nodes{
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
    }
      }
      
  }
`;
