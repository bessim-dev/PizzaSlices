import { graphql } from 'gatsby';
import React, { useState } from 'react';
import styled from 'styled-components';


const BeersGrid = styled.div`
margin-top:2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px,1fr));
  grid-gap:2rem;
`
const StyledBeer = styled.div`
  display:grid;
  border:1px solid #6e6e6e;
  padding:2rem;
  text-align:center;
  img{
    width:100%;
    height:200px;
    object-fit:contain;
    display:grid;
    align-items:center;
    font-size:14px;
  }

`

function Beer({ beer }) {
  const rating = Math.round(beer.rating.average)
  return (
    <StyledBeer >
      <img src={beer.image} alt={beer.name} />
      <h3>{beer.name}</h3>
      {beer.price}
      <p title={`${rating} out of 5 stars`}>
        {`⭐`.repeat(rating)}
        <span style={{ filter: 'grayscale(100%)' }}>
          {`⭐`.repeat(5 - rating)}
        </span>
      </p>
    </StyledBeer>
  )
}


export default function BeersPage({ data }) {
  //some  beersdon't have an image so to fix that i will change every beer and add it to the valid beers array
  function checkImage(beer) {
    var image = new Image();
    image.src = beer.image;
    return image.complete
  }
  const beers = data.beers.nodes.filter(checkImage)
  console.log(beers)
  return (
    <>
      <h2 className="center">We have {beers.length} different type of Beers Available</h2>
      <BeersGrid>
        {
          beers.length && beers.map((beer) => <Beer beer={beer} key={beer.id} />)
        }
      </BeersGrid>
    </>
  );
}

export const query = graphql`
  query {
    beers: allBeer{
      nodes {
        name
        id
        price
        image
        rating{
          average
          reviews
        }
      }
    }
  }
`