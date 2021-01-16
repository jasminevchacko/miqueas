import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ActiveLink from '../ActiveLink';

export default class EditTransactionFormNavButtons extends React.Component {
  render() {
    return (
      <Navbar sticky={'bottom'}>
        <Container>
          <Row style={{'width': '100%', 'margin': '0px'}}>
            <Col style={{'marginRight': '10px'}}>
              <Row className = 'justify-content-center'>
                <Button
                  variant={'outline-secondary'} block
                  style={{'minHeight': '54px', 'borderColor': '#51ADA9',
                    'color': '#51ADA9', 'fontWeight': 'bold'}}
                  className={'btn-outline-secondary-miqueas'}
                  onClick={this.props.handleSameItem}>
                  delete transaction
                </Button>
              </Row>
            </Col>
            <Col style={{'marginLeft': '10px'}}>
              <Row className = 'justify-content-center'>
                <Button
                  variant={'secondary'} block
                  style={{'minHeight': '54px',
                    'fontWeight': 'bold',
                    'background': '#51ADA9',
                    'borderColor': '#51ADA9'}}
                  disabled={this.props.disabled}
                  onClick={this.props.handleAddItem}>
                  save edit
                </Button>
              </Row>
            </Col>
          </Row>
        </Container>
      </Navbar>
    );
  }
}
