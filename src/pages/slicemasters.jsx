import { graphql, Link } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';

const SliceMastersGrid = styled.div`
  display:grid;
  grid-gap:2rem;
  grid-template-columns:repeat(auto-fill,minmax(250px, 1fr));
`
const StyledSliceMaster = styled.div`
display: grid;
align-items:start;
a{
  text-decoration:none;
}
.gatsby-image-wrapper{
  margin:0;
  height:400px;
  object-fit:cover;
}
h2{
  transform:rotate(-2deg);
  text-align: center;
  font-size: 4rem;
  margin-bottom: -2rem;
  position: relative;
  z-index:2;
}
.description{
  background: var(--yellow);
  padding: 1rem;
  margin:2rem;
  margin-top: -6rem;
  z-index:2;
  position: relative;
  text-align: center;
  transform:rotate(1deg);
}
`
export default function SlicemastersPage({data}) {
  const sliceMasters = data.sliceMasters.nodes;
  return (
    <>
      <SliceMastersGrid>
        {
          sliceMasters.map(person => (
            <StyledSliceMaster key={person.id}>
              <Link to={`/sliceMasters/${person.slug.current}`}>
                <h2>
                  <span className="mark">{person.name} </span>
                </h2>
              </Link>
              <GatsbyImage fluid={person.image.asset.fluid}/>
              <p className="description">{person.description} </p>
            </StyledSliceMaster>
          ))
        }
      </SliceMastersGrid>
    </>
  );
}

export const query = graphql`
  query {
    sliceMasters : allSanityPerson{
      totalCount
      nodes{
        name
        id
        slug{
          current
        }
        description
        image {
          asset {
            fluid(maxWidth:400){
              ...GatsbySanityImageFluid
            }
          }
        }
      }

    }
  }
`