import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ActiveLink from './ActiveLink';
import {addTransaction} from '../actions/Transactions.js';

class ReviewItemModel {
  constructor(name, gender, quantity, attributes, remIndex) {
    this.name = name;
    this.gender = gender;
    this.quantity = quantity;
    this.attributes = attributes;
    this.remIndex = remIndex;
  }
}


class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    const add_items = [];
    const rem_items = [];

    const transItems = this.props.transactionState.transactionItems;
    for (let i = 0; i < transItems.length; i++) {
      const item = new ReviewItemModel(transItems[i].item.name,
          transItems[i].item.gender,
          transItems[i].quantityChanged,
          [transItems[i].item.size,
            transItems[i].item.typeColor],
          i);
      if (item.quantity > 0) {
        add_items.push(item);
      } else {
        rem_items.push(item);
      }
    }

    this.state = {
      showPopup: false,
      add_items: add_items,
      rem_items: rem_items,
      deleteQueued: -1,
      deleteAdd: false,
      deleteSplitArrIndex: -1,
      transactionState: this.props.transactionState,
    };
  }

  hidePopup() {
    this.setState({
      showPopup: false,
      deleteQueued: -1,
      deleteAdd: false,
      deleteSplitArrIndex: -1,
    });
  }

  deleteItem(i, deleteAdd, splitArrIndex) {
    this.setState({
      showPopup: true,
      deleteQueued: i,
      deleteAdd: deleteAdd,
      deleteSplitArrIndex: splitArrIndex,
    });
  }

  hardDelete() {
    const add_items = this.state.add_items;
    const rem_items = this.state.rem_items;
    const transState = this.state.transactionState;
    if (this.state.deleteQueued != -1 && this.state.deleteSplitArrIndex != -1) {
      if(this.state.deleteAdd) {
        add_items.splice(this.state.deleteSplitArrIndex, 1);
        for (let i = this.state.deleteSplitArrIndex; i < add_items.length; i ++) {
          add_items[i].remIndex--;
        }
        for (let i = 0; i < rem_items.length; i ++) {
          if (rem_items[i].remIndex > this.state.deleteQueued) {
            rem_items[i].remIndex--;
          }
        }
      } else {
        rem_items.splice(this.state.deleteSplitArrIndex, 1);
        for (let i = this.state.deleteSplitArrIndex; i < rem_items.length; i ++) {
          rem_items[i].remIndex--;
        }
        for (let i = 0; i < add_items.length; i ++) {
          if (add_items[i].remIndex > this.state.deleteQueued) {
            add_items[i].remIndex--;
          }
        }
      }
      transState.transactionItems.splice(this.state.deleteQueued, 1);
    }
    this.setState({
      add_items: add_items,
      rem_items: rem_items,
      transactionState: transState,
      deleteQueued: -1,
      deleteAdd: false,
      deleteSplitArrIndex: -1,
      showPopup: false,
    });
  }

  handleSubmit() {
    // console.log(this.props.transactionState);
    addTransaction(this.state.transactionState);
    this.props.setTransactionState({
      transactionItems: [],
      transaction_date: new Date(),
      staff_name: 'Staff 1',
    });
  }

  render() {
    const addItems = [];
    const remItems = [];

    if (this.state.add_items.length > 0) {
      addItems.push(<h3 className = {'mini-header'}>Added Items</h3>);
    }

    if (this.state.rem_items.length > 0) {
      remItems.push(<h3 className = {'mini-header'}>Removed Items</h3>);
    }

    for (let i = 0; i < this.state.add_items.length; i++) {
      addItems.push(<ReviewItem item={this.state.add_items[i]} onDelete={
        () => {
          this.deleteItem(this.state.add_items[i].remIndex, true, i);
        }} key={this.state.add_items[i].remIndex} />);
    }
    for (let i = 0; i < this.state.rem_items.length; i++) {
      remItems.push(<ReviewItem item={this.state.rem_items[i]} onDelete={
        () => {
          this.deleteItem(this.state.rem_items[i].remIndex, false, i);
        }} key={this.state.rem_items[i].remIndex} />);
    }

    return (
      <>
        <Popup show={this.state.showPopup} onHide={() => {
          this.hidePopup();
        }}
        onConfirm={() => {
          this.hardDelete();
        }}/>
        <Navbar bg={'light'} >
          <Navbar.Collapse className={'justify-content-center'}>
            <Navbar.Brand>
              {'Review and Submit'}
            </Navbar.Brand>
          </Navbar.Collapse>
        </Navbar>
        <hr style={{'marginTop': '0px', 'marginBottom': '0px'}}/>
        <Container className={'item-block'}>
          <br/>
          {addItems}
          {remItems}
          <NavButtons
            handleSubmit = {() => this.handleSubmit()}
          />
        </Container>
      </>
    );
  }
}

class ReviewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.item.quantity,
    };
  }

  onQuantityChange(val) {
    this.setState({quantity: val});
  }

  render() {
    const additionalAttributes = [];
    this.props.item.attributes.forEach((attr) => {
      additionalAttributes.push(<p className={'super-shrink-text'}
        style={{'marginBottom': '0px', 'marginLeft': '12px'}}
        key={attr}>
        {attr}</p>);
    });
    let genderIcon = <></>;
    if (this.props.item.gender.toLowerCase() == 'male' ||
      this.props.item.gender.toLowerCase() == 'female') {
      const path = '../resources/' +
        this.props.item.gender.toLowerCase() + '.png';
      genderIcon = <img
        alt={this.props.item.gender}
        src={path}
        height={20}
        className = {'side-img'}
        style = {{'marginTop': '5px'}}
      />;
    }
    return (
      <Card style={{'marginBottom': '13px', 'borderColor': '#C4C4C4'}}>
        <Card.Body style={{
          'lineHeight': '100%',
          'verticalAlign': 'middle',
          'padding': '0.5rem',
          // 'paddingRight': '0.5rem',
          // 'paddingBottom': '0.5rem',
          // 'paddingTop': '0.8rem'
        }}>
          <Container width={'100%'} style={{'paddingLeft': '15px',
            'paddingRight': '0px'}}>
            <Row>
              <Col xs = {1} sm={1} md={1} lg={1} xl={1}
                style={{'paddingLeft': '0.5rem', 'paddingRight': '0.5rem',
                  'marginTop': '5px'}}>
                <Trash onClick={this.props.onDelete}/>
              </Col>
              <Col xs = {4} sm={4} md={4} lg={4} xl={4}
                style={{'paddingLeft': '0.5rem', 'paddingRight': '0rem',
                  'maxWidth': '40%', 'flexBasis': '40%', 'marginTop': '5px'}}>
                <Card.Text className={'shrink-text'}>
                  {this.props.item.name}
                </Card.Text>
              </Col>
              <Col xs={3} sm={3} md={3} lg={3} xl={3}
                style={{'paddingLeft': '0.5rem', 'paddingRight': '0rem',
                  'marginTop': '5px'}}>
                {genderIcon}
                {additionalAttributes}
              </Col>
              <Col xs={2} sm={2} md={2} lg={2} xl={2}
                style={{'paddingLeft': '0rem', 'paddingRight': '0.5rem'}}>
                <FormControl style={{'fontSize': '0.7rem', 'textAlign': 'center',
                  'borderColor': '#51ADA9'}}
                type={'number'}
                placeholder={'0'}
                value = {this.state.quantity}
                onChange={(e) => {
                  this.onQuantityChange(e.target.value);
                }}
                />
              </Col>
              <Col xs={1} sm={1} md={1} lg={1} xl={1}
                style={{'paddingLeft': '0.5rem', 'paddingRight': '0.5rem',
                  'marginTop': '5px'}}>
                <img
                  alt={'Edit'}
                  src={'../resources/right.png'}
                  height={10}/>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    );
  }
}

class Trash extends React.Component {
  render() {
    return (<img
      alt={'Delete'}
      src={'../resources/trashcan.png'}
      height={15}
      onClick={this.props.onClick}/>);
  }
}

class Popup extends React.Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton/>
        <Modal.Body>
          <p>Are you sure you want to delete this item?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="link" onClick={this.props.onConfirm}>
            Yes
          </Button>
          <Button variant="link" onClick={this.props.onHide}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

class NavButtons extends React.Component {
  render() {
    return (
      <Navbar sticky={'bottom'} style={{'paddingTop': '50px',
        'paddingLeft': '0px',
        'paddingRight': '0px'}}>
        <Container>
          <Row style={{'width': '100%', 'marginLeft': '0px'}}>
            <Col style={{'marginRight': '10px'}}>
              <Row className = 'justify-content-center'>
                <ActiveLink href={'/add'}>
                  <Button
                    variant={'outline-secondary'} block
                    style={{'height': '54px'}}
                    className={'btn-outline-secondary-miqueas'}>
                      add new item
                  </Button>
                </ActiveLink>
              </Row>
            </Col>
            <Col style={{'marginLeft': '10px'}}>
              <Row className = 'justify-content-center'>
                <ActiveLink href='/log'>
                  <Button
                    onClick={this.props.handleSubmit}
                    variant={'secondary'} block
                    style={{'height': '54px',
                      'fontWeight': 'bold',
                      'background': '#51ADA9',
                      'borderColor': '#51ADA9'}}>
                      submit
                  </Button>
                </ActiveLink>
              </Row>
            </Col>
          </Row>
        </Container>
      </Navbar>
    );
  }
}

export default ReviewForm;
