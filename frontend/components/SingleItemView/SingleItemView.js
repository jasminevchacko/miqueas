import React from 'react';
import ItemHeader from '../TransactionForm/ItemHeader';
import SingleViewHeader from './SingleViewHeader';
import SingleItemStock from './SingleItemStock';
import SingleItemInfoLine from './SingleItemInfo';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { updateStock } from '../../actions/Items.js';

class SingleItemView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stock: this.props.item.stock,
      tempStock: this.props.item.stock,
      editMode: false,
      item: {}
    };
  }
  
  componentDidMount() {
    let currentItem = this.props.item;
    console.log(currentItem);
    this.setState({ item: currentItem });
  }

  updateStockUI(i) {
    this.setState({
      tempStock: (i>=0) ? i : 0,
    });
    
  }

  triggerEdit() {
    this.setState({
      editMode: true,
    });
  }

  // This will need to update on the backend as well!!!
  saveStock() {
    // We might not need to have a separate stock attribute
    this.setState({
      stock: this.state.tempStock,
      editMode: false,
    });
    updateStock(this.state.item._id, this.state.tempStock);
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

  render() {
    return (
      <div>
        <SingleViewHeader onBack={this.props.onBack} name={'Details'}/>
        <ItemHeader name={this.props.item.name} category={this.props.item.category}/>
        <hr style={{'marginTop': 0}}/>
        <SingleItemStock stock={this.state.tempStock}
          editMode={this.state.editMode}
          onUpdate={(i) => (this.updateStockUI(i))}
          onEdit={() => this.triggerEdit()}
        />
        <hr style={{'marginTop': 0}}/>
        <Container>
          <SingleItemInfoLine title={'Type/Color'} data={this.props.item.typeColor}/>
          <SingleItemInfoLine title={'Size'} data={this.props.item.size}/>
          <SingleItemInfoLine title={'Gender'} data={this.props.item.gender}/>
        </Container>
        <hr style={{'marginTop': 0}}/>
        <Container>
          <SingleItemInfoLine title={'Location'} data={this.props.item.location}/>
          <SingleItemInfoLine title={'Date Checked'} data={'Data unavailable'}/>
          <SingleItemInfoLine title={'Time Checked'} data={'Data unavailable'}/>
        </Container>
        <hr style={{'marginTop': 0}}/>
        <Container>
          <Button
            variant={'secondary'} block
            style={{'minHeight': '54px',
              'fontWeight': 'bold',
              'background': '#51ADA9',
              'borderColor': '#51ADA9'}}
            onClick = {() => this.saveStock()}
            hidden = {!this.state.editMode}>
            save
          </Button>
        </Container>
      </div>
    );
  }

}

export default SingleItemView;
