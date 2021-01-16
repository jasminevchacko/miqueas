import React, { Component, useState } from 'react';
import dynamic from 'next/dynamic';
const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false });
import { useMediaQuery } from 'react-responsive';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

import translate from './translate.js';
import {searchQuery} from '../actions/searchQuery';
import ActiveLink from './ActiveLink.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getCategories } from '../actions/Items.js';
import { getItemVariation } from '../actions/Items.js';

import VerticalRadio from './TransactionForm/VerticalRadio';
import Search from './Search';
import { Category } from 'styled-icons/material';



const Test = ({language, transactionState, setTransactionState}) => {
    const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
    const isMobile = useMediaQuery({ maxWidth: 767 })

    const [category, setCategory] = useState(translate("Category", language));
    const [name, setName] = useState(translate("Item", language));

    const [findCategory, setFindCategory] = useState(false);
    const [findName, setFindName] = useState(false);

    const [categoryList, setCategoryList] = useState([]);
    const [itemList, setItemList] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [searchCategories, setSearchCategories] = useState([]);
    const [searchItems, setSearchItems] = useState([]);

    const createCategories = async () => {
      try {
        let items = await getCategories();
        let categories = [];
        for (let item of items) {
          if (!categories.includes(item.category)) {
            categories.push(item.category);
          }
        }
        setCategoryList(categories);
      } catch (e) {
        console.error(e);
      }
    }
    if (categoryList.length === 0) {
      createCategories();
    }
    

    const handleScan = async (data) => {
      if (data) {
        let translations = data.split("(");
        let item = translations[0].substring(0, translations[0].length - 1)
        setName(translate(item, language));
        await getItemVariation(item).then(itemVar => {
          setCategory(translate(itemVar.category, language));
        });
      }
    }

    function handleNext() {
      let transaction = transactionState;
      transaction.transactionItems.push({
        item: {
          name: name,
          category: category,
          gender: "",
          typeColor: "",
          size: "",
          location: "",
        },
        recipient: "",
        quantityChanged: 0,
        expiration_date: 0
      });
      setTransactionState(transaction);
    }

    function handleFindCategory() {

      setFindCategory(true);
    }

    function handleFindName() {
      setFindName(true);
    }

    function goBack() {
      setIsSearch(false)
      if(findCategory) {
        setFindCategory(false);
      } else {
        setFindName(false);
      }
    }

    const changeCategory = async (category) =>  {
      setCategory(category);
      setName("");
      try {
        let items = await getCategories();
        let itemList = [];
        for (let item of items) {
          if (item.category === category && !itemList.includes(item.name)) {
            itemList.push(item.name);
          }
        }
        setItemList(itemList);
      } catch (e) {
        console.error(e);
      }
    }

    const changeName = (name) => {
      setName(name);
    }

    const searchResults = (results) => {
      if (findCategory) {
        setSearchCategories(results);
      } else {
        setSearchItems(results);
      }
      setIsSearch(true);
    }
   const clearResults = () => {
      setIsSearch(false);
    }

    const handleError = err => {
      console.error(err)
    }

    let winWidth = '70%'
    if (isTablet) {
      winWidth = '80%'
    }
    if (isDesktopOrLaptop) {
      winWidth = '90%'
    }
    
  
    return (

        <div>
          {!findCategory && !findName &&
            <div>
              <div className = 'qrDiv'>
                <center>
                <QrReader delay={300} onError={handleError} onScan={handleScan} style={{ width: winWidth }}/>
                </center>
              </div>
              <div className = 'item-fields'>
                <Button 
                  variant={'outline-secondary'} 
                  style={{
                    'minHeight': '42px', 'borderColor': '#51ADA9',
                    'color': '#51ADA9', 'fontWeight': 'bold'
                  }}
                  size={'md'}
                  onClick={() => handleFindCategory()} 
                  block > 
                  {category}
                </Button>
                <Button 
                  variant={'outline-secondary'} 
                  style={{
                    'minHeight': '42px', 'borderColor': '#51ADA9',
                    'color': '#51ADA9', 'fontWeight': 'bold'
                  }}
                  size={'md'} 
                  onClick={() => handleFindName()}
                  block >
                  {name}
                </Button>
                </div>
                <div>
                  <center>
                  <ActiveLink href='/transaction'>
                    <Button 
                    onClick = {() => handleNext()} 
                    size={'md'}
                    variant={'secondary'}
                    style={{
                      'minHeight': '50px',
                      'width': '50%',
                      'fontWeight': 'bold',
                      'background': '#51ADA9',
                      'borderColor': '#51ADA9'
                    }}>
                      Next
                    </Button>
                  </ActiveLink>
                </center>
              </div>
          </div>
          }
          {findCategory &&
            <div>
              <div className= 'addHeader'>
                <img
                  alt={'Back'}
                  className = 'addBack'
                  src={'../resources/arrow-back.png'}
                  width={30}
                  height={30}
                  onClick={() => goBack()}>
                </img>
                <center>
                <Search data={categoryList} searchType="category" createSearchResults={(results) => searchResults(results)} clear={() => clearResults()}></Search>
                </center>
            </div>
            <hr />
              <div className="addRadio">
                <VerticalRadio 
                  noLeftCol = {true}
                  options = {isSearch ? searchCategories : categoryList} 
                  onUpdate={(i) => {
                    changeCategory(i);
                  }}
                  selected = {categoryList.indexOf(category)}
              />
              </div>
              <Button 
                    onClick = {() => goBack()} 
                    className = 'addCheck'
                    size={'md'}
                    variant={'secondary'}
                    style={{
                      'minHeight': '50px',
                      'width': '20%',
                      'fontWeight': 'bold',
                      'background': '#51ADA9',
                      'borderColor': '#51ADA9'
                    }}>
                  ✓
              </Button>
            </div>
          }
        {findName &&
          <div>
            <div className='addHeader'>
              <img
                alt={'Back'}
                className='addBack'
                src={'../resources/arrow-back.png'}
                width={30}
                height={30}
                onClick={() => goBack()}>
              </img>
              <center>
                <Search data={itemList} searchType="category" createSearchResults={(results) => searchResults(results)} clear={() => clearResults()}></Search>
              </center>
            </div>
            <hr />
            <div className="addRadio">
              <VerticalRadio
                noLeftCol={true}
                options={isSearch ? searchItems : itemList}
                onUpdate={(i) => {
                  changeName(i);
                }}
                selected={itemList.indexOf(name)}
              />
            </div>
            <Button
              onClick={() => goBack()}
              className='addCheck'
              size={'md'}
              variant={'secondary'}
              style={{
                'minHeight': '50px',
                'width': '20%',
                'fontWeight': 'bold',
                'background': '#51ADA9',
                'borderColor': '#51ADA9'
              }}>
              ✓
              </Button>
          </div>
        }
      
      </div>
    )
}


export default Test;
