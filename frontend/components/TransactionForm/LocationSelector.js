import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export default class LocationSelector extends React.Component {

  render() {
    const selected = ['bodega', 'downstairs'].indexOf(this.props.location);
    const bodegaBtnStyle = {'height': '64px',
      'fontSize': '14px',
      'textAlign': 'center'};
    if (selected == 0) {
      bodegaBtnStyle['backgroundColor'] = '#51ADA9';
      bodegaBtnStyle['color'] = 'white';
    }
    const bodegaBtn = (
      <Col style = {{'paddingLeft': '0px', 'paddingRight': '5px'}}>
        <Container>
          <Row className="justify-content-center">
            <Button id="bodegaBtn" variant={'outline-secondary'} size={'sm'} block
              active = {selected == 0}
              onClick={() => this.props.onUpdate('bodega')}
              style={bodegaBtnStyle}>bodega
            </Button>
          </Row>
        </Container>
      </Col>);

    const downBtnStyle = {'height': '64px',
      'fontSize': '14px',
      'textAlign': 'center'}
    if (selected == 1) {
      downBtnStyle['backgroundColor'] = '#51ADA9';
      downBtnStyle['color'] = 'white';
    }
    const downstairsBtn = (
      <Col style = {{'paddingLeft': '5px', 'paddingRight': '0px'}}>
        <Container>
          <Row className="justify-content-center">
            <Button id="downBtn" variant={'outline-secondary'} size={'sm'} block
              active = {selected == 1}
              onClick={() => this.props.onUpdate('downstairs')}
              style={downBtnStyle}>
                down<br />stairs
            </Button>
          </Row>
        </Container>
      </Col>
    );

    return (
      <Container>
        <Row className="justify-content-center">
          <Col>
            <p className = "text-muted">Location</p>
          </Col>
          <Col>
            <Container>
              <Row className="justify-content-center">
                {bodegaBtn}
                {downstairsBtn}
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}
