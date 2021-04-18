import { graphql, Link } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';
import Pagination from '../components/Pagination';

const SliceMastersGrid = styled.div`
  display:grid;
  grid-gap:2rem;
  grid-template-columns:repeat(auto-fill,minmax(250px, 1fr));
`
const StyledSliceMaster = styled.div`
display: flex;
flex-direction:column;
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
export default function Slicemasters({data,pageContext}) {
  const sliceMasters = data.sliceMasters.nodes;
  const {elementPerPage,currentPage,skip,numOfPages}=pageContext;
  return (
    <>
    <Pagination base="/slicemasters" elementPerPage={elementPerPage} currentPage={currentPage} skip={skip} numOfPages={numOfPages} />
      <SliceMastersGrid>
        {
          sliceMasters.map(person => (
            <StyledSliceMaster key={person.id}>
              <Link to={`/slicemasters/${person.slug.current}`}>
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
  query($skip: Int =0,$elementPerPage: Int!) {
    sliceMasters : allSanityPerson(limit:$elementPerPage,skip:$skip){
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