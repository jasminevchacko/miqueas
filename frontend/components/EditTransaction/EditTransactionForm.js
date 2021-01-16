import React from 'react';
import SingleViewHeader from '../SingleItemView/SingleViewHeader';
import ItemHeader from '../TransactionForm/ItemHeader';
import {getItemVariation} from '../../actions/Items';
import {
  deleteTransactionItem,
  updateTransactionItem,
} from '../../actions/Transaction';
import {Spinner} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import GenderSelector from '../TransactionForm/GenderSelector';
import QuantitySelector from '../TransactionForm/QuantitySelector';
import VerticalRadio from '../TransactionForm/VerticalRadio';
import LocationSelector from '../TransactionForm/LocationSelector';
import EditTransactionFormNavButtons from './EditTransactionFormNavButtons';
import Popup from '../Popup';

export default class EditTransactionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      category: props.item.category,
      gender: props.item.gender,
      size: props.item.size,
      typeColor: props.item.typeColor,
      quantity: props.item.quantityChanged,
      location: props.item.location,
      recipient: props.item.recipient,
      transactionId: props.item.transactionId,
      transactionItemId: props.item.transactionItemId,
      itemVariation: {},
      requirements: {
        gender: false,
        size: false,
        typeColor: false,
      },
      isLoading: true,
      error: false,
      showBackPopup: false,
      showDeletePopup: false,
    };
  }

  async componentDidMount() {
    const itemVar = await getItemVariation(this.state.name);
    if (itemVar) {
      this.initReqsFromVariation(itemVar);
    } else {
      this.setState({
        isLoading: false,
        error: true,
      });
    }
  }

  checkRequired(itemProperty) {
    return (itemProperty != null && itemProperty.length > 1);
  }

  initReqsFromVariation(itemVar) {
    this.setState({
      requirements: {
        gender: this.checkRequired(itemVar.gender),
        size: this.checkRequired(itemVar.size),
        typeColor: this.checkRequired(itemVar.typeColor),
      },
      isLoading: false,
      itemVariation: itemVar,
    });
  }

  updateProperty(prop, val) {
    const state = Object.assign({}, this.state);
    state[prop] = val;
    this.setState(state);
  }

  async delTransaction() {
    await deleteTransactionItem(this.state.transactionItemId, this.state.transactionId);
  }

  async updateTransaction() {
    let transaction =
      {
        item: {
          name: this.state.name,
          category: this.state.category,
          gender: this.state.gender,
          typeColor: this.state.typeColor,
          size: this.state.size,
          location: this.state.location,
        },
        quantityChanged: this.state.quantity,
      };
    await updateTransactionItem(this.state.transactionItemId, transaction);
  }

  render() {
    return (
      <>
        <SingleViewHeader name={'Details'} onBack={() => {
          this.setState({
            showBackPopup: true,
          });
        }}/>
        <ItemHeader name={this.state.name} category={this.state.category}/>
        <hr style={{'marginTop': 0}}/>
        {!this.state.isLoading && !this.state.error && <>
          {/* Quantity Selector*/}
          <QuantitySelector quantity={this.state.quantity}
            onChange={(i) => {
              this.updateProperty('quantity', i);
            }}/>
          <hr/>

          {/*Gender Selector*/}
          {this.state.requirements.gender && <>
            <GenderSelector gender={this.state.gender} onClick= {
              (i) => {
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
                this.updateProperty('gender', gender);
              }
            }/><hr/>
          </>}

          {/*Type/Color Selector*/}
          {this.state.requirements.typeColor && <>
            <VerticalRadio name={'Type/Color'}
              options = {this.state.itemVariation.typeColor}
              onUpdate={(newTC) => {
                this.updateProperty('typeColor', newTC);
              }}
              selected={
                this.state.itemVariation.typeColor.indexOf(this.state.typeColor)
              }/><hr/></>}

          {/*Size Selector*/}
          {this.state.requirements.size && <>
            <VerticalRadio name={'Size'}
              options = {this.state.itemVariation.size}
              onUpdate = {(newSize) => {
                this.updateProperty('size', newSize);
              }}
              selected={
                this.state.itemVariation.size.indexOf(this.state.size)
              }/><hr/></>}

          {/*Location Selector*/}
          <LocationSelector onUpdate={(name) => {
            this.updateProperty('location', name);
          }}
          location = {this.state.location}/>
          <hr/>

          {/*Nav Buttons*/}
          <EditTransactionFormNavButtons
            handleSameItem = {() => {
              this.setState({
                showDeletePopup: true,
              });
            }}
            handleAddItem = {() => {
              this.updateTransaction().then(() => {
                window.location = '/log'; // Forces refresh of the log page
              });
            }}
            disabled = {this.state.quantity === 0}
          />
          <hr style = {{'height': '30px', 'border-top': 'transparent'}}/>
        </>
        }
        {this.state.isLoading && !this.state.error && <>
          <Container>
            <Row className="justify-content-center">
              <Spinner className="spinner" animation='border'/>
            </Row>
          </Container>
        </>}
        {this.state.error && <>
          <strong>ERROR</strong>
          <p>Problem Loading Item Variation from Database</p>
        </>}

        {/* Go Back Confirmation Popup */}
        <Popup
          showPopup = {this.state.showBackPopup}
          title = {"Are you sure you want to go back?"}
          text = {"Any edits will be lost."}
          confirmText = {"Go Back"}
          cancelText = {"Cancel"}
          onCancel = {() => {
            this.setState({
              showBackPopup: false
            });
          }}
          onConfirm = {() => {
            this.props.onBack();
          }}
        />

        {/* Delete Transaction Confirmation Popup */}
        <Popup
          showPopup = {this.state.showDeletePopup}
          title = {""}
          text = {"Are you sure you want to delete this transaction?"}
          confirmText = {"Yes"}
          cancelText = {"No"}
          onCancel = {() => {
            this.setState({
              showDeletePopup: false
            });
          }}
          onConfirm = {() => {
            this.delTransaction().then(r => {
              window.location = "/log"; // This forces a refresh of the log page
            });
          }}
        />
      </>
    );
  }
}
