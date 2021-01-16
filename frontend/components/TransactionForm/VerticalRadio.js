import React from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class VerticalRadio extends React.Component {
  render() {
    const options = [];
    this.props.options.forEach((option, i) => {
      options.push(
          <Form.Check
            custom
            type={'radio'}
            label = {option}
            name = {this.props.name + 'Radio'}
            id = {option + i.toString()}
            key = {option + i.toString()}
            onClick = {() => {this.props.onUpdate(option)}}
            onChange = {() => {}}
            checked = {this.props.selected == i}
          />);
      i++;
    });
    return (
      <Container>
        <Row>
          {!this.props.noLeftCol && <Col>
            <p className = {'text-muted'}>{this.props.name}</p>
          </Col>}
          <Col>
            <Form>
              <Container>
                {options}
              </Container>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
