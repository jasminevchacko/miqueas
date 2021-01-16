import NavigationBar from '../frontend/components/NavigationBar';
import React from 'react';
import { Spinner, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import translate from '../frontend/components/translate.js';
import { getTransactions, getTransactionItem, deleteTransaction } from '../frontend/actions/Transaction.js';
import { getItemName } from '../frontend/actions/Items.js';
import LogTable from '../frontend/components/LogTable.js';
import Search from '../frontend/components/Search.js';
import SingleItemLogView from '../frontend/components/SingleItemView/SingleItemLogView';


const getItem = (id, transId, staff, date) => {
  return new Promise((resolve, reject) => {
    getTransactionItem(id).then(function (response) {
      if(response == null) {
        console.log(transId);
      }
      response.staff = staff;
      response.date = date;
      response.time = date.substring(11, 16);
      response.transactionItemId = id;
      response.transactionId = transId;
      resolve(response);
    }, function (error) {
      reject(error);
    })
  })
}
const getName = (transactionItem) => {
  return new Promise((resolve, reject) => {
    getItemName(transactionItem.item).then(function (response) {
      const wholeItem = {...transactionItem, ...response};
      resolve(wholeItem);
    }, function (error) {
      reject(error);
    })
  })
}

class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: '1', isLoading: true, isAdmin: false, isAll: true, isBodega: false,
      isDownstairs: false, isCloset: false, isSearch: false, allItems: [], bodegaItems: [], downstairsItems: [], otherItems: [],
      currentItems: [], closetItems: [], isItemSelected: false, selectedItem: null, searchItems: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    /* This code here gets all the transactions. In each transaction there is a transaction item array that
    contains ids of the items changed in the transaction. Each transaction item has an item id in it which
    corresponds with the item in inventory it is changing the stock of. 
    
    The Figma called for name, staff, date, child, and quantity changed for the log table. The staff and 
    date come from the transaction, the quantity changed and child come from transaction item, and the name 
    comes from item. */
    let transactionArray = [];
    try {
      let transactions = await getTransactions();
      for (let transaction of transactions) {
        transaction.transactionItems.map((id) => {
          transactionArray.push(getItem(id, transaction._id, transaction.staff_name, transaction.transaction_date))
        })
      }
    } catch (e) {
      console.error(e);
    }
    Promise.all(transactionArray).then(values => {
      let promiseArray = [];
      for (let item of values) {
        promiseArray.push(getName(item));
      }
      Promise.all(promiseArray).then(results => {
        for (let finalItem of results) {
          this.setState({ allItems: [...this.state.allItems, finalItem] })
          /*Currently closet/closetItems isn't used for anything right now. It was supposed to be
          implemented for admins so please implement it once administrators are created :) */
          switch(finalItem.location) {
            case "downstairs":
              this.setState({ downstairsItems: [...this.state.downstairsItems, finalItem] }); break;
            case "bodega":
              this.setState({ bodegaItems: [...this.state.bodegaItems, finalItem] }); break;
            case "closet":
            this.setState({ closetItems: [...this.state.closetItems, finalItem] }); break;
            default:
              this.setState({ otherItems: [...this.state.otherItems, finalItem] });
          }
        }
        this.setState({currentItems: this.state.allItems, isLoading: false});
      })
    })
  }

  handleChange(value) {
    this.setState({selectedValue: value});
    switch (value) {
      case 1:
        this.setState({isAll: true, isBodega: false, isDownstairs: false,
          isCloset: false, currentItems: this.state.allItems}); break;
      case 2:
        this.setState({isAll: false, isBodega: true, isDownstairs: false,
           isCloset: false, currentItems: this.state.bodegaItems}); break;
      case 3:
        this.setState({isAll: false, isBodega: false, isDownstairs: true,
           isCloset: false, currentItems: this.state.downstairsItems}); break;
      case 4:
        this.setState({isAll: false, isBodega: false, isDownstairs: false, isCloset: true}); break;
    }
  }
  goBack() {
    this.setState({isItemSelected: false});
  }

  selectItem = (item) => {
    this.setState({ isItemSelected: true, selectedItem: item });
  }

  searchResults = (results) => {
      this.setState({searchItems: results, isSearch: true})
  }

  clearResults = () => {
    this.setState({isSearch: false})
  }


  render() {
    return (
      <div>
        {!this.state.isItemSelected &&
          <div>
            {this.state.isItemSelected &&
            <FontAwesomeIcon onClick={() => this.goBack()} className='back'
                             icon={faArrowLeft}/>}
            <div className="Clean">
            {!this.state.isLoading && !this.state.isItemSelected && <Search data={this.state.currentItems} searchType="all" createSearchResults={this.searchResults} clear={this.clearResults}></Search>}
              {!this.state.isItemSelected && <div>
                <div style={{'padding': '1.2rem', 'paddingBottom': '0'}}>
                  <ToggleButtonGroup className="Location" name="Radio"
                                     value={this.state.value}
                                     onChange={this.handleChange}>
                    <ToggleButton
                      className={this.state.isAll ? 'selected' : 'o1'}
                      value={1}>all</ToggleButton>
                    <ToggleButton
                      className={this.state.isBodega ? 'selected' : 'o1'}
                      value={2}>bodega</ToggleButton>
                    <ToggleButton
                      className={this.state.isDownstairs ? 'selected' : 'o1'}
                      value={3}>downstairs</ToggleButton>
                    {this.state.isAdmin && <ToggleButton
                      className={this.state.isCloset ? 'selected' : 'o1'}
                      value={4}>closet</ToggleButton>}
                  </ToggleButtonGroup>
                </div>
                <hr style={{ marginBottom : 0 }}/>
                <table>
                  <thead>
                  <tr className="logHeader" fontWeight='bold'>
                    <td className="h3"/>
                    <td className='h1'>Name</td>
                    <td className='h1'>Staff</td>
                    <td className='h1'>Child</td>
                    <td className='h1'>Quantity Changed</td>
                    <td className='h2'></td>
                  </tr>
                  </thead>
                </table>
              </div>}
              <div style={{height: '63vh', overflowY: 'auto'}}>
                {this.state.isLoading &&
                <Spinner className="spinner" animation='border'></Spinner>}
                <table bordercollapse='collapse'>
                  <tbody>
                  {!this.state.isLoading && !this.state.isItemSelected &&
                    <LogTable items={this.state.isSearch ? this.state.searchItems : this.state.currentItems} callback={this.selectItem}></LogTable>}
                  </tbody>
                </table>
              </div>
              <div className="Footer"><NavigationBar selector={3}/></div>
            </div>
          </div>
        }
        {
          this.state.isItemSelected &&
            <>
              <SingleItemLogView onBack = {() => {this.goBack()}}
                item = {this.state.selectedItem}/>
              <div className="Footer"><NavigationBar selector={3}/></div>
            </>
        }
      </div>
    );
  }
}

export default Log;
