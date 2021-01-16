import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFemale, faMale, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const addCategory = (props, categoryName, items) => {
    return(
        <tr onClick={()=>props.callback(categoryName)} key={categoryName}>
            {items[0].gender == 'male' && <td className='icon' width = "10%"><FontAwesomeIcon className='male' icon={faMale} /></td>}
            {items[0].gender == 'female' && <td className='icon' width="10%"><FontAwesomeIcon className='female' icon={faFemale} /></td>}
            {items[0].gender != 'male' && items[0].gender != 'female' && <td width="10%"></td>}
            <td width='40%'>{categoryName}</td>
            <td width='10%'><FontAwesomeIcon className='chevron' icon={faChevronRight} /></td>
        </tr>
    )
}

const CategoryList = (props) => {
    let finalTable = [];
    for (let category of props.categories) {
        finalTable.push(addCategory(props, category, props.items[category]));
    }
    return(finalTable);
}
export default CategoryList;
