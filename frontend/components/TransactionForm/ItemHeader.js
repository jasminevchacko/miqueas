import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default class ItemHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={{'width': '100%'}}>
        <Row className="justify-content-center">
          <strong>{this.props.name}</strong>
        </Row>
        <Row className="justify-content-center">
          <p>{this.props.category}</p>
        </Row>
      </Container>
    );
  }
}
