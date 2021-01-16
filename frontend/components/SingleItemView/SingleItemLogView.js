import React from 'react';
import SingleItemLogHeader from './SingleItemLogHeader';
import ItemHeader from '../TransactionForm/ItemHeader';
import Container from 'react-bootstrap/Container';
import SingleItemInfoLine from './SingleItemInfo';
import EditTransactionForm from '../EditTransaction/EditTransactionForm';

class SingleItemLogView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editItem: false,
    }
  }

  convertToLocalTime(dateString) {
    const date = new Date(dateString);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let end = 'am';
    if (hours > 12) {
      hours -= 12;
      end = 'pm';
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    return (hours + ':' + minutes + ' ' + end);
  }

  setEdit(shouldEdit) {
    this.setState({
      editItem: shouldEdit,
    });
  }


  render() {
    return (
      <>
        {
          !this.state.editItem && <>
            <SingleItemLogHeader name={'Details'} onEdit={() => {
              this.setEdit(true);
            }}
            onBack = {this.props.onBack}/>
            <ItemHeader name={this.props.item.name} category={this.props.item.category}/>
            <hr style={{'marginTop': 0}}/>
            <Container>
              <SingleItemInfoLine title={'Quantity Changed'} data={this.props.item.quantityChanged}/>
              <SingleItemInfoLine title={'Stock'} data={this.props.item.stock}/>
            </Container>
            <hr style={{'marginTop': 0}}/>
            <Container>
              <SingleItemInfoLine title={'Staff'} data={this.props.item.staff}/>
              <SingleItemInfoLine title={'Gender'} data={this.props.item.gender}/>
              <SingleItemInfoLine title={'Recipient'} data={this.props.item.recipient}/>
            </Container>
            <hr style={{'marginTop': 0}}/>
            <Container>
              <SingleItemInfoLine title={'Type'} data={this.props.item.typeColor}/>
              <SingleItemInfoLine title={'Location'} data={this.props.item.location}/>
              <SingleItemInfoLine title={'Date'} data={this.props.item.visibleDate}/>
              <SingleItemInfoLine title={'Time'} data={this.convertToLocalTime(this.props.item.date)}/>
            </Container>
            <hr style={{'marginTop': 0}}/>
          </>
        }
        { this.state.editItem && <>
          <EditTransactionForm name={this.props.item.name} item={this.props.item}
            onBack={() => {this.setEdit(false)}}/>
        </>}
      </>
    );
  }

}

export default SingleItemLogView;
