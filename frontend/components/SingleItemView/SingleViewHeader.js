import Navbar from 'react-bootstrap/Navbar';
import React from 'react';

export default function SingleViewHeader(props) {
  return (
    <>
      <Navbar bg={'light'}>
        <Navbar.Brand>
          <img
            onClick={()=>{props.onBack()}}
            alt={'Back'}
            src={'../resources/arrow-back.png'}
            width={30}
            height={30}>
          </img>
        </Navbar.Brand>
        <Navbar.Collapse className={'justify-content-center'}
          style={{'marginLeft': '-30px'}}>
          <Navbar.Brand>
            {props.name}
          </Navbar.Brand>
        </Navbar.Collapse>
      </Navbar>
      <hr style={{'marginTop': 0}}/>
    </>
  );
}
