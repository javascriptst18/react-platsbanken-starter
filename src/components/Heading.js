import React from 'react';
import styled from 'styled-components';

function MyHeading(){
  return <h1>Hehe!</h1>
}

const StyledHeading = styled(MyHeading)`
  color: ${props => props.primary ? 'lightsalmon' : 'teal'};
  font-size: 3em;
  border-bottom: 1px solid red;
`;

export default StyledHeading;