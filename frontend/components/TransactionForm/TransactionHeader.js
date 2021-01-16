import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ActiveLink from '../ActiveLink';

export default class TransactionHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      showPopup: false,
    };
  }


  handleClose() {
    this.setState({
      showPopup: false,
    });
  }

  render() {
    const show = this.state.showPopup;

    return (
      <>
        <Navbar bg={'light'}>
          <Navbar.Brand>
            <img
              alt={'Back'}
              src={'../resources/arrow-back.png'}
              width={30}
              height={30}
              onClick={() => {
                this.setState({showPopup: true});
              }}>
            </img>
          </Navbar.Brand>
          <Navbar.Collapse className={'justify-content-center'}
            style={{'marginLeft': '-30px'}}>
            <Navbar.Brand>
              {this.state.name}
            </Navbar.Brand>
          </Navbar.Collapse>
        </Navbar>
        <Modal show={show} onHide={() => {
          this.setState({showPopup: false});
        }}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to go back?</Modal.Title>
          </Modal.Header>
          <Modal.Body>Any edits will be lost.</Modal.Body>
          <Modal.Footer>
            <Button variant="link" onClick={() => {
              this.props.onBack();
            }}>
              <ActiveLink href={'/add'}>
                  Go Back
              </ActiveLink>
            </Button>
            <Button variant="link" onClick={() => {
              this.setState({showPopup: false});
            }}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
