import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import QuantityButtons from './QuantityButtons';

export default class QuantitySelector extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <p className = "text-muted">Quantity Changed</p>
          </Col>
          <QuantityButtons onChange={this.props.onChange}
            quantity={this.props.quantity}
            negativeAllowed={true}/>
        </Row>
      </Container>
    );
  }
}
