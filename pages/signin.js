import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {login} from '../frontend/actions/Users';
import Col from 'react-bootstrap/Col';
import Router from 'next/router';

class SignIn extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      validated: false,
    };
  }

  submitForm = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      try{
        await login(email, password);
        Router.push('/');
      } catch(e) {
        console.error(e);
        this.setState({validated: false, password: ""});
      }
    }

  };

  onChange = (event, type) => {
    this.setState({
      [type]: event.target.value,
    });
  };

  render() {
    const {email, password, validated} = this.state;

    return (
      <Container>
        <Container>
          <Row className={'justify-content-center'}>
            <img src={'../resources/logo.png'} width={'143px'} style={{
              'marginTop': '83px',
              'marginBottom': '40px'
            }}/>
          </Row>
        </Container>
        <Form noValidate validated={validated} onSubmit={(evt) => this.submitForm(evt)}>
          <Form.Label>Sign In</Form.Label>
          <Form.Group>
            <Form.Control type="email" placeholder="Email"
                          value = {email} onChange={
              (e) => this.onChange(e, "email")
            } required isInvalid = {validated && email==""}
                          isValid = {validated && email!=""}/>
            <Form.Control.Feedback type="invalid">
              Please enter a valid email
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Control type="password" placeholder="Password"
                          value = {password} onChange={
              (e) => this.onChange(e, "password")
            } required isInvalid = {validated && password == ""}
                          isValid = {validated && password != ""}/>
            <Form.Control.Feedback type="invalid">
              Please enter a password
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Check
              label="Remember me"
              type="checkbox"
            />
          </Form.Group>
          <Container>
            <Row className={'justify-content-center'}>
              <Button type="submit" size={'lg'}
                      style={{'fontSize' : '14px', 'width': '144px',
                        'height': '54px', 'background': '#51ADA9',
                        'borderColor':'#51ADA9'}}>
                Sign In
              </Button>
            </Row>
          </Container>
        </Form>
        <Container>
          <Row>
            <Col>
              <Row className={'justify-content-center'}>
                <p style={{'marginTop':'20px', 'fontSize': '13px', 'color':'#51ADA9'}}>
                  <a href={"/signup"} style={{'color':'#51ADA9',
                    'textDecorationLine':'underline'}}>Sign up</a>
                </p>
              </Row>
            </Col>
            <Col>
              <Row className={'justify-content-center'}>
                <p style={{'marginTop':'20px', 'fontSize': '13px', 'color':'#51ADA9'}}>
                  <a href={"/"} style={{'color':'#51ADA9',
                  'textDecorationLine':'underline'}}>Forgot Password?</a>
                </p>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

export default SignIn
