import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Badge from 'react-bootstrap/Badge';
import {faFemale, faMale, faChevronRight } from '@fortawesome/free-solid-svg-icons'


const addCategory = (props, categoryName, amount, items) => {
    return(
        <tr onClick={()=>props.callback(categoryName)} key={categoryName}>
            {items[0].gender == 'male' && <td className='icon' width = "10%"><FontAwesomeIcon className='male' icon={faMale} /></td>}
            {items[0].gender == 'female' && <td className='icon' width="10%"><FontAwesomeIcon className='female' icon={faFemale} /></td>}
            {items[0].gender != 'male' && items[0].gender != 'female' && <td width="10%"></td>}
            <td width='40%'>{categoryName}</td>
            <td width='10%'><Badge variant="secondary">{amount}</Badge></td>
            <td width='10%'><FontAwesomeIcon className='chevron' icon={faChevronRight} /></td>
        </tr>
    )
}

const ShopCategories = (props) => {
    // the props are: items = isSearch, searchCategories, urgentOrUpcoming[], categories{categoryName: amount}, searchCategories[], callback
    let finalTable = [];
    if (props.isSearch) {
        for (const category of props.searchCategories) {
            finalTable.push(addCategory(props, category, props.categories[category], props.items[category]))
        }
    } else {
        for (const category of Object.keys(props.categories)) {
            finalTable.push(addCategory(props, category, props.categories[category], props.items[category]));
        }
    }

    return(finalTable);
}
export default ShopCategories;
