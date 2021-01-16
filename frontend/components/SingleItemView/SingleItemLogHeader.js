import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

function SingleItemLogHeader(props) {
  return (
    <>
      <Navbar bg={'light'}>
        <Navbar.Brand>
          <img
            alt={'Back'}
            onClick={props.onBack}
            src={'../resources/arrow-back.png'}
            width={30}
            height={30}>
          </img>
        </Navbar.Brand>
        <Navbar.Collapse className={'justify-content-center'}
          style={{'marginLeft': '0px'}}>
          <Navbar.Brand>
            {props.name}
          </Navbar.Brand>
        </Navbar.Collapse>
        <Navbar.Brand className={'justify-content-right'}>
          <img
            alt={'Edit'}
            src={'../resources/pencil.svg'}
            width={15}
            height={15}
            style={{'marginLeft':'75%'}}
            onClick={(i) => {
              props.onEdit();
            }}/>
        </Navbar.Brand>
      </Navbar>
      <hr style={{'marginTop': 0}}/>
    </>
  );

}

export default SingleItemLogHeader;
