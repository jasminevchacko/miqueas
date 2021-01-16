import NavigationBar from '../frontend/components/NavigationBar';
import React from 'react';
import Router from 'next/router';
import { Spinner, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faExpand, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import translate from '../frontend/components/translate.js';
import { getItems } from '../frontend/actions/Items.js';
import ShopCategories from '../frontend/components/ShopCategories.js';
import CategoryItems from '../frontend/components/CategoryItems.js';
import Search from '../frontend/components/Search.js';
import SingleItemView from '../frontend/components/SingleItemView/SingleItemView';

class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: '1', isLoading: true, isUrgent: true, urgentOrUpcoming: [], categories: {}, searchItems: [], 
      searchCategories: [], urgentItems: [], upcomingItems: [], currentItems: [], isCategoryList: true, isCategorySelected: false, isItemSelected: false, selectedCategory: null, 
      backButton: false, shoppingNeeded: true, query: null
    }
    this.handleChange = this.handleChange.bind(this);
  }
  async componentDidMount() {
    let urgentOrUpcoming = {};
    let categories = {};
    try {
      let items = await getItems();
      for (let item of items) {
        if (item.reorder_level != null && item.reorder_level <= item.stock + 1) {
          if (urgentOrUpcoming[item.category] == null) {
            urgentOrUpcoming[item.category] = [];
            categories[item.category] = 0;
          }
          urgentOrUpcoming[item.category].push(item);
          categories[item.category]++;
        }
      }
      if (categories.length == 0) {
        this.setState({shoppingNeeded: false});
      } else {
        this.setState({ isLoading: false, urgentOrUpcoming: urgentOrUpcoming, categories: categories });
      }
    } catch (e) {
      console.error(e);
    }
  }
  handleChange(value) {
    this.setState({ selectedValue: value });
    let foundMatches = [];
    switch (value) {
      case 1:
        this.setState({ isUrgent: true, currentItems: this.state.urgentItems }); 
        break;
      case 2:
        this.setState({ isUrgent: false, currentItems: this.state.upcomingItems });
        break; 
    }
  }
  selectCategory = (category) => {
    let urgentOrUpcoming = this.state.urgentOrUpcoming[category];
    let urgentItems = [];
    let upcomingItems = [];
    for (let item of urgentOrUpcoming) {
      if (item.reorder_level <= item.stock) {
        urgentItems.push(item);
      } else {
        upcomingItems.push(item);
      }
    }
    this.setState({ urgentItems: urgentItems, upcomingItems: upcomingItems, currentItems: urgentItems, isCategoryList: false, 
      isCategorySelected: true, selectedCategory: category, backButton: true, isSearch: false });
  }
  selectItem = (item) => {
    this.setState({ isCategorySelected: false, isItemSelected: true, selectedItem: item })
  }
  goBack() {
    if (this.state.isItemSelected) {
      this.setState({ isCategorySelected: true, isItemSelected: false });
    } else if (this.state.isCategorySelected) {
      this.setState({ isCategoryList: true, isCategorySelected: false, backButton: false, isUrgent: true, urgentItems: [], upcomingItems: [], currentItems: []});
    } else {
      //It should never reach this else condition but if it does, re-render the component
      this.forceUpdate();
    }
  }
  searchResults = (results, query) => {
    if (!this.state.isCategorySelected) {
      this.setState({searchCategories: results, isSearch: true})
    } else {
      this.setState({searchItems: results, isSearch: true, query: query})
    }
  }
  clearResults = () => {
    this.setState({isSearch: false})
  }
  render() {
    return (
      <div>
        {!this.state.isItemSelected && <div>
          {this.state.backButton && <img
            alt={'Back'}
            className='invBack'
            src={'../resources/arrow-back.png'}
            width={30}
            height={30}
            onClick={() => this.goBack()}>
          </img>}
          <div className="clean">
            {!this.state.isLoading && !this.state.isCategorySelected &&
            <div>
              <div className= 'addHeader'>
                <center>
                  <Search data={Object.keys(this.state.categories)} searchType="category" createSearchResults={this.searchResults} clear={this.clearResults}></Search>
                </center>
              </div>
            <hr />
           </div>   
              }
            {!this.state.isLoading && this.state.isCategorySelected &&
             <div>
              <div className= 'addHeader'>
                <center>
                  <Search data={this.state.isUrgent ? this.state.urgentItems : this.state.upcomingItems}
                    searchType="name" createSearchResults={this.searchResults} clear={this.clearResults}></Search>
                </center>
              </div>
           </div> 
            }
            {this.state.isCategorySelected && <center>
              <div style={{'padding': '1.2rem', 'paddingBottom': '0'}}>
                <ToggleButtonGroup className="location" name="Radio" value={this.state.value} onChange={this.handleChange}>
                  <ToggleButton
                    className={this.state.isUrgent ? 'selected' : 'o1'} value={1}>urgent</ToggleButton>
                  <ToggleButton
                    className={this.state.isUrgent ? 'o1' : 'selected'} value={2}>upcoming</ToggleButton>
                </ToggleButtonGroup>
                </div>
              </center>}
              {this.state.isCategoryList && <div style={{ height: '63vh', overflowY: 'auto' }}>
                  <table bordercollapse='collapse'><tbody>
                  <tr><th colSpan={4}>Category</th></tr>
                  {!this.state.isLoading && <ShopCategories items={this.state.urgentOrUpcoming} isSearch={this.state.isSearch} searchCategories= {this.state.searchCategories} categories={this.state.categories} callback={this.selectCategory} />}
                </tbody></table>
                {this.state.isLoading && <center><Spinner className="spinner" animation='border'/></center>}
              </div>}
            {this.state.isCategorySelected && <div>
                <hr style={{'marginBottom': '0'}}/>
                <center><h3>{this.state.selectedCategory}</h3></center>
                <div style={{ height: '63vh', overflowY: 'auto' }}>
                <CategoryItems items={this.state.isSearch ? this.state.searchItems : this.state.currentItems} callback={this.selectItem} />
              </div>
              </div>}
            <div className="Footer"><NavigationBar selector={1} /></div>
          </div>
        </div>}
        {this.state.isItemSelected && <>
          <SingleItemView onBack={() => this.goBack()}  item={this.state.selectedItem} />
          <div className="Footer"><NavigationBar selector={1}/></div>
        </>}
      </div>
    );
  }
}
export default ShoppingList;
