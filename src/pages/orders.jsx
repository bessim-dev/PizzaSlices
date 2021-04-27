import { graphql } from "gatsby";
import GatsbyImage from "gatsby-image";
import React, { useState } from "react";
import styled from "styled-components";
import SEO from "../components/SEO";
import usePizza from "../utils/usePizza";
import useForm from "../utils/useForm";
import PizzaOrder from "../components/PizzaOrder";
import formatMoney from "../utils/formatMoney";
import calculateOrderTotal from "../utils/calculateOrderTotal";
const SIZES = {
  S: 0.75,
  M: 1,
  L: 1.25,
};
const calculatePrice = (price, size) => {
  return price * SIZES[size];
};
const moneyFormatter = (money) => {
  const formatter = Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "EUR",
  });
  return formatter.format(money / 100);
};
const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  fieldset {
    grid-column: span 2;
    max-height: 600px;
    display: grid;
    gap: 1rem;
    align-content: start;
    overflow: auto;
    &.menu,
    &.order {
      grid-column: span 1;
      height: 600px;
    }
  }
  .mapleSyrup {
    display: none;
  }
  @media (max-width: 900px) {
    fieldset.menu,
    fieldset.order {
      grid-column: span 2;
    }
  }
`;
const StyledMenu = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0px 1.3rem;
  align-content: center;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
  .gatsby-image-wrapper {
    grid-row: span 2 / auto;
    height: 100%;
  }
  button {
    font-size: 1.5rem;
  }
  button + button {
    margin-left: 1rem;
  }
  .remove {
    background: none;
    color: var(--red);
    font-size: 3rem;
    position: absolute;
    top: 0;
    right: 0;
    box-shadow: none;
    line-height: 1rem;
  }
`;
export default function OrdersPage({ data }) {
  const pizzas = data.pizzas.nodes;
  const { values, updateValue } = useForm({
    name: "",
    email: "",
    mapleSyrup: "",
  });
  const {
    order,
    addOrder,
    removeOrder,
    error,
    loading,
    message,
    submitOrder,
  } = usePizza({
    pizzas,
    values,
  });
  if (message) {
    return <p>{message}</p>;
  }
  return (
    <>
      <SEO title="Order a Pizza!" />
      <StyledForm onSubmit={submitOrder}>
        <fieldset disabled={loading}>
          <legend>Your Info</legend>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={updateValue}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={updateValue}
          />
          <input
            type="mapleSyrup"
            name="mapleSyrup"
            id="mapleSyrup"
            value={values.mapleSyrup}
            onChange={updateValue}
            className="mapleSyrup"
          />
        </fieldset>
        <fieldset className="menu" disabled={loading}>
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <StyledMenu key={pizza.id}>
              <GatsbyImage
                width={50}
                height={50}
                alt={pizza.name}
                fluid={pizza.image.asset.fluid}
              />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              {Object.keys(SIZES).map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() =>
                    addOrder({
                      id: pizza.id,
                      size,
                    })
                  }
                >
                  {size} {moneyFormatter(calculatePrice(pizza.price, size))}{" "}
                </button>
              ))}
            </StyledMenu>
          ))}
        </fieldset>
        <fieldset className="order" disabled={loading}>
          <legend>Order!</legend>
          <PizzaOrder
            order={order}
            removeFromOrder={removeOrder}
            pizzas={pizzas}
          />
        </fieldset>
        <fieldset disabled={loading}>
          <h3>
            Your Total is {formatMoney(calculateOrderTotal(order, pizzas))}
          </h3>
          <div>{error ? <p>Error: {error}</p> : ''}</div>
          <button type="submit" disabled={loading}>
            {loading ? 'Placing Order...' : 'Order Ahead'}
          </button>
        </fieldset>
      </StyledForm>
    </>
  );
}
export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        price
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
