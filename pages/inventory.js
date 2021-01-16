import NavigationBar from '../frontend/components/NavigationBar';
import React from 'react';
import Router from 'next/router';
import { Spinner, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faExpand, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import translate from '../frontend/components/translate.js';
import { getItems } from '../frontend/actions/Items.js';
import CategoryList from '../frontend/components/CategoryList.js';
import CategoryItems from '../frontend/components/CategoryItems.js';
import Search from '../frontend/components/Search.js';
import SingleItemView from '../frontend/components/SingleItemView/SingleItemView';


class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: '1', isLoading: true, isSchool: true, isOther: false, data: [], categories: [], searchItems: [], 
      searchCategories: [], isLogTable: true, isCategorySelected: false, isItemSelected: false, selectedCategory: null, 
      backButton: false
    }
    this.handleChange = this.handleChange.bind(this);
  }
  async componentDidMount() {
    let dataTable = {}
    let categories = []
    try {
      let items = await getItems();
      for (let item of items) {
        if (dataTable[item.category] == null) {
          dataTable[item.category] = [];
          categories.push(item.category);
        }
        dataTable[item.category].push(item);
      }
      this.setState({ isLoading: false, data: dataTable, categories: categories });
    } catch (e) {
      console.error(e);
    }
  }

  handleChange(value) {
    this.setState({ selectedValue: value });
    switch (value) {
      case 1:
        this.setState({ isSchool: true, isOther: false }); break;
      case 2:
        this.setState({ isSchool: false, isOther: true }); break;
    }
  }
  selectCategory = (category) => {
    this.setState({ isLogTable: false, isCategorySelected: true, selectedCategory: category, backButton: true, isSearch: false });
  }

  selectItem = (item) => {
    this.setState({ isCategorySelected: false, isItemSelected: true, selectedItem: item })
  }
  goBack() {
    if (this.state.isItemSelected) {
      this.setState({ isCategorySelected: true, isItemSelected: false });
    } else if (this.state.isCategorySelected) {
      this.setState({ isLogTable: true, isCategorySelected: false, backButton: false });
    } else {
      //It should never reach this else condition but if it does, re-render the component
      this.forceUpdate();
    }
  }

  searchResults = (results) => {
    if (!this.state.isCategorySelected) {
      this.setState({searchCategories: results, isSearch: true})
    } else {
      this.setState({searchItems: results, isSearch: true})
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
                  <Search data={this.state.categories} searchType="category" createSearchResults={this.searchResults} clear={this.clearResults}></Search>
                </center>
              </div>
           </div>   
              }
            {!this.state.isLoading && this.state.isCategorySelected &&
             <div>
              <div className= 'addHeader'>
                <center>
                  <Search data={this.state.data[this.state.selectedCategory]}
                    searchType="name" createSearchResults={this.searchResults} clear={this.clearResults}></Search>
                </center>
              </div>
           </div> 
            }
            {this.state.isLogTable && <div>
              <center>
                <ToggleButtonGroup className="location" name="Radio" value={this.state.value} onChange={this.handleChange}>
                  <ToggleButton
                    className={this.state.isSchool ? 'selected' : 'o1'} value={1}>school</ToggleButton>
                  <ToggleButton
                    className={this.state.isOther ? 'selected' : 'o1'} value={2}>other</ToggleButton>
                </ToggleButtonGroup>
                <hr style={{ marginBottom : 0 }}/>
              </center>

              <div style={{ height: '63vh', overflowY: 'auto' }}>

                <table bordercollapse='collapse'><tbody>
                  <tr><th colSpan={3}>Category</th></tr>
                  {!this.state.isLoading && <CategoryList items={this.state.data} categories={this.state.isSearch ? this.state.searchCategories : this.state.categories} callback={this.selectCategory} />}
                </tbody></table>
                {this.state.isLoading && <center><Spinner className="spinner" animation='border'/></center>}
              </div>
            </div>}
            {this.state.isCategorySelected && <div>
                <h5 style={{ textAlign: 'center' }}> {this.state.selectedCategory}</h5>
                <div style={{ height: '63vh', overflowY: 'auto' }}>
                <CategoryItems items={this.state.isSearch ? this.state.searchItems : this.state.data[this.state.selectedCategory]} callback={this.selectItem} />
              </div>
              </div>}
            <div className="Footer"><NavigationBar selector={4} /></div>
          </div>
        </div>}
        {this.state.isItemSelected && <>
          <SingleItemView onBack={() => this.goBack()}  item={this.state.selectedItem} />
          <div className="Footer"><NavigationBar selector={4}/></div>
        </>}
      </div>
    );
  }
}
export default Inventory;
