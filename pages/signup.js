import React from 'react';
import { signUp, verifyToken } from '../frontend/actions/Users';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import Router from 'next/router';

class SignUp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      confirmpass: '',
      validated: false,
    };

    this.errorKeys = [];
  }

  onChange = (event, type) => {
    this.setState({
      [type]: event.target.value,
    });
  };

  submitForm = async (event) => {
    event.preventDefault();

    const { name, email, password } = this.state;

    const form = event.currentTarget;
    if (form.checkValidity() === false || !this.doPasswordsMatch()
      || !this.isValidEmailAddr(email)) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      await signUp(name, email, password) .then(() => Router.push('/signin'))
        .catch(e => { console.log(e) })
    }

    this.setState({
      validated: true,
    });
  };

  doPasswordsMatch() {
    const {password, confirmpass} = this.state;
    return (password === confirmpass);
  }

  isValidEmailAddr(addr) {
    // Check the email address with the RFC 5322 Official Standard Regex
    const exp = new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\."
      + "[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23"
      + "-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9]"
      +"(?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25"
      + "[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?"
      + "[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-"
      + "\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])");
    return exp.test(addr);
  }

  render() {
    const { name, email, password, confirmpass, validated } = this.state;

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
        <Form noValidate onSubmit={this.submitForm}>
          <Form.Label>Sign Up</Form.Label>
          <Form.Group>
            <Form.Control type="text" placeholder="Name (First Last)"
                          value = {name} onChange={
                            (e) => this.onChange(e, "name")
                          } required isInvalid = {validated && name == ""}
                          isValid = {validated && name != ""}/>
            <Form.Control.Feedback type="invalid">
              Please enter your name
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Control type="email" placeholder="Email"
                          value = {email} onChange={
                            (e) => this.onChange(e, "email")
                          } required isInvalid = {validated && !this.isValidEmailAddr(email)}
                          isValid = {validated && this.isValidEmailAddr(email)}/>
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
            <Form.Control type="password" placeholder="Confirm Password"
                          value = {confirmpass} onChange={
                            (e) => this.onChange(e, "confirmpass")
                          } required isInvalid = {validated && (!this.doPasswordsMatch() || password == "")}
                          isValid = {validated && this.doPasswordsMatch() && password!=""}/>
            <Form.Control.Feedback type="invalid">
              {(this.doPasswordsMatch() ? "Please enter a password" :
                "Passwords do not match")}
            </Form.Control.Feedback>
          </Form.Group>
          <Container>
            <Row className={'justify-content-center'}>
              <Button type="submit" size={'lg'}
                      style={{'fontSize' : '14px', 'width': '144px',
                        'height': '54px', 'background': '#51ADA9',
                        'borderColor':'#51ADA9'}}>
                Sign Up
              </Button>
            </Row>
            <Row className={'justify-content-center'}>
              <p style={{'marginTop':'20px', 'fontSize': '13px', 'color':'#51ADA9'}}>
                Already have an account? <a href={"/signin"}>Sign in</a>
              </p>
            </Row>
          </Container>
        </Form>
      </Container>
    );
  }
}

export default SignUp;

