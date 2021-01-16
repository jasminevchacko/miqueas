import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default class Popup extends React.Component {

  render() {
    return (
      <Modal show={this.props.showPopup} onHide={() => {
        this.props.onCancel();
      }}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.text}</Modal.Body>
        <Modal.Footer>
          <Button variant="link" onClick={() => {
            this.props.onConfirm();
          }}>
            {this.props.confirmText}
          </Button>
          <Button variant="link" onClick={() => {
            this.props.onCancel();
          }}>
            {this.props.cancelText}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

}
