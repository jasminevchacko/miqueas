import React from 'react';
import {getItemVariation} from '../../actions/Items';
import TransactionHeader from './TransactionHeader';
import ItemHeader from './ItemHeader';
import GenderSelector from './GenderSelector';
import VerticalRadio from './VerticalRadio';
import QuantitySelector from './QuantitySelector';
import LocationSelector from './LocationSelector';
import NavButtons from './NavButtons';

export default class TransactionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.category,
      itemVariation: {},
      gender: 'none',
      quantity: 0,
      typeColor: 'none',
      size: 'none',
      isLoading: true,
      location: 'none',
      name: this.props.name,
      recipient: 'none',
      formCompleted: false,
    };
  }

  async componentDidMount() {
    const itemVar = await getItemVariation(this.state.name);
    if (itemVar) {
      this.initStateFromVariation(itemVar);
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  checkRequired(itemProperty) {
    return (itemProperty != null && itemProperty.length > 1);
  }

  checkOneOption(itemProperty) {
    if (itemProperty != null && itemProperty.length == 1) {
      return itemProperty[0];
    }
    return 'none';
  }

  initStateFromVariation(itemVar) {
    this.setState({
      gender: this.checkOneOption(itemVar.gender),
      size: this.checkOneOption(itemVar.size),
      typeColor: this.checkOneOption(itemVar.typeColor),
      isLoading: false,
      itemVariation: itemVar,
    });
  }

  setFormInvalid() {
    this.setState({
      formCompleted: false,
    });
  }

  validateForm(skipCheck) {
    if (skipCheck != 'quantity' && this.state.quantity == 0) {
      this.setFormInvalid();
      return;
    }
    if (skipCheck != 'location' && this.state.location == 'none') {
      this.setFormInvalid();
      return;
    }
    if (skipCheck != 'gender' &&
      this.checkRequired(this.state.itemVariation.gender) &&
      this.state.gender == 'none') {
      this.setFormInvalid();
      return;
    }
    if (skipCheck != 'size' &&
      this.checkRequired(this.state.itemVariation.size) &&
      this.state.size == 'none') {
      this.setFormInvalid();
      return;
    }
    if (skipCheck != 'typeColor' &&
      this.checkRequired(this.state.itemVariation.typeColor) &&
      this.state.typeColor == 'none') {
      this.setFormInvalid();
      return;
    }
    this.setState({
      formCompleted: true,
    });
  }

  handleGenderSwap(i) {
    let gender = 'none';
    switch (i) {
      case 0:
        gender = 'male';
        break;
      case 1:
        gender = 'female';
        break;
      case 2:
        gender = 'unisex';
        break;
    }
    this.setState({
      gender: gender,
    });
    this.validateForm('gender');
  }

  changeQuantity(i) {
    this.setState({
      quantity: i,
    });
    if (i == 0) {
      this.setFormInvalid();
    } else {
      this.validateForm('quantity');
    }
  }

  changeSize(newSize) {
    this.setState({
      size: newSize,
    });
    this.validateForm('size');
  }

  changeTypeColor(newTypeColor) {
    this.setState({
      typeColor: newTypeColor,
    });
    this.validateForm('typeColor');
  }

  changeLocation(newLocation) {
    this.setState({
      location: newLocation,
    });
    this.validateForm('location');
  }

  // This updates the overall transactionState with form properties
  handleAddItem() {
    const transactionState = this.props.transactionState;
    const items = transactionState.transactionItems;
    items[items.length - 1].item = {
      name: this.state.name,
      category: this.state.category,
      gender: this.state.gender,
      typeColor: this.state.typeColor,
      size: this.state.size,
      location: this.state.location,
    };
    items[items.length - 1].quantityChanged = this.state.quantity;
    items[items.length - 1].recipient = this.state.recipient;
    this.props.setTransactionState(transactionState);
  }

  handleSameItem() {
    this.handleAddItem();
    let transaction = this.props.transactionState;
    transaction.transactionItems.push({
      item: {
        name: this.state.name,
        category: this.state.category,
        gender: "",
        typeColor: "",
        size: "",
        location: "",
      },
      recipient: "",
      quantityChanged: 0,
      expiration_date: 0
    });
    this.props.setTransactionState(transaction);
    this.setState({
      gender: this.checkOneOption(this.state.itemVariation.gender),
      size: this.checkOneOption(this.state.itemVariation.size),
      typeColor: this.checkOneOption(this.state.itemVariation.typeColor),
      quantity: 0,
      location: 'none',
      formCompleted: false,
    });
  }

  resetTransaction() {
    let transaction = this.props.transactionState;
    transaction.transactionItems = [];
    this.props.setTransactionState(transaction);
  }

  render() {
    const header = <div><TransactionHeader name={'Transaction Form'} onBack={() => {this.resetTransaction()}}/>
      <hr style={{'marginTop': 0}}/>
      <ItemHeader name={this.props.name} category={this.props.category}/>
      <hr style={{'marginTop': 0}}/></div>;

    if (this.state.itemVariation == null ||
      this.state.itemVariation.name == undefined) {
      if (this.state.isLoading) {
        return <div style = {{'textAlign': 'center'}}>
          {header}
          <p>Loading...</p>
        </div>;
      } else {
        return <div style = {{'textAlign': 'center'}}>
          {header}
          <p> Could not find specified item </p>
        </div>;
      }
    }

    const genderSelector = (this.state.itemVariation.gender == null ||
      this.state.itemVariation.gender.length < 2) ? <div/> :
      <div><GenderSelector gender={this.state.gender} onClick= {
        (i) => this.handleGenderSwap(i)
      }/>
      <hr/></div>;

    const typeColorSelector = (this.state.itemVariation.typeColor == null ||
      this.state.itemVariation.typeColor.length < 2) ? <div/> :
      <div><VerticalRadio name={'Type/Color'}
        options = {this.state.itemVariation.typeColor}
        onUpdate={(i) => {
          this.changeTypeColor(i);
        }}
        selected={
          this.state.itemVariation.typeColor.indexOf(this.state.typeColor)
        }/><hr/></div>;

    const sizeSelector = (this.state.itemVariation.size == null ||
      this.state.itemVariation.size.length < 2) ? <div/> :
      <div><VerticalRadio name={'Size'}
        options = {this.state.itemVariation.size}
        onUpdate = {(i) => {
          this.changeSize(i);
        }}
        selected={
          this.state.itemVariation.size.indexOf(this.state.size)
        }/><hr/></div>;

    return (
      <div>
        {header}
        {genderSelector}
        <QuantitySelector quantity={this.state.quantity}
          onChange={(i) => this.changeQuantity(i)}/>
        <hr/>
        {typeColorSelector}
        {sizeSelector}
        <LocationSelector onUpdate={(name) => {
          this.changeLocation(name);
        }}
        location = {this.state.location}/>
        <hr/>
        <NavButtons
          handleSameItem = {() => this.handleSameItem()}
          handleAddItem = {() => this.handleAddItem()}
          disabled = {!this.state.formCompleted}
        />
      </div>
    );
  }
}
