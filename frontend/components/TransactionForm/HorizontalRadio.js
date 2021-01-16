import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export default class HorizontalRadio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: -1,
    };
  }

  updateSelected(i) {
    this.setState({
      selected: i,
    });
  }

  render() {
    const options = [];
    this.props.options.forEach((option, i) => {
      options.push(
          <Col key = {option + i.toString()}>
            <Container>
              <Row className="justify-content-center">
                <Button
                  variant={'outline-secondary'} size={'md'} block
                  active = {this.state.selected == i}
                  onClick={() => this.updateSelected(i)}>{option}</Button>
              </Row>
            </Container>
          </Col>,
      );
    });
    return (
      <Container>
        <p className = "text-muted">{this.props.name}</p>
        <Row className="justify-content-center">
          {options}
        </Row>
      </Container>
    );
  }
}
