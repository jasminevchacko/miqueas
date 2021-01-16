import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      needsClearButton: false,
    }
  }
  /*This componentDidUpdate is so that if someone changes the list while search
  is being performed (eg toggling) the search gets updated automatically (without
  more typing necessary first)*/
  componentDidUpdate(prevProps) {
    if (prevProps.data != this.props.data && this.state.query
      && this.state.query.length > 1) {
      this.createSearch();
    }
  }
  createSearch = () => {
    let foundMatches = [];
    /*There are three different options for search type. Name searches through the item's name,
    category searches through the items category, and all searches through all the properties
    in the item object for a match.
    */
    if (this.props.searchType == "name") {
      this.props.data.forEach(item => {
        if (item.name.includes(this.state.query)) {
          foundMatches.push(item);
        }
      })
    } else if (this.props.searchType == "category") {
      this.props.data.forEach(category => {
        if (category.includes(this.state.query)) {
          foundMatches.push(category);
        }
      })
    } else if (this.props.searchType == "all") {
      this.props.data.forEach(item => {
        for (var property in item) {
          var val = item[property];
          if (typeof val == "string" && val.includes(this.state.query)) {
            foundMatches.push(item);
            break;
          }
        }
      })
    }
    this.props.createSearchResults(foundMatches, this.state.query);
  }
  /*I created the search so that it updates the search results every 2 characters
  so lots of unnecessary searches don't get performed but depending on what the client 
  wants this can be changed. */
  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        this.setState({ needsClearButton: true })
        if (this.state.query.length % 2 === 0) {
          this.createSearch()
        }
      } else {
        this.setState({ needsClearButton: false });
        this.props.clear();
      }
    })
  }
  clearSearch() {
    this.setState({ query: '', needsClearButton: false });
    this.props.clear();
    this.search.value = '';
  }
  render() {
    return (
      <form>
        <input
          className="search"
          placeholder="Search"
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        {!this.state.needsClearButton && <FontAwesomeIcon className="searchButtons" icon={faExpand}></FontAwesomeIcon>}
        {this.state.needsClearButton && <FontAwesomeIcon className="searchButtons" onClick={() => this.clearSearch()} icon={faTimesCircle}></FontAwesomeIcon>}
      </form>
    )
  }
}
export default Search