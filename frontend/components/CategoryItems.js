import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFemale, faMale, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const addNameGroup = (props, items) => {
    /*These counts exist because in the table, items with the same name are divided into male and 
    female entries. The counts are primarly used for row-span.
    */
    let femaleCount = 0, maleCount = 0;
    let femaleGroup = [], maleGroup = [], otherGroup = [];
    let section = [];
    for (let item of items) {
        if (item.gender == 'female') {
            femaleCount++;
            femaleGroup.push(item);
        } else if (item.gender == 'male') {
            maleCount++;
            maleGroup.push(item);
        } else {
            otherGroup.push(item);
        }
    }
    //isFirst is added to these items so name and gender icon don't appear multiple times due to row-span.
    if (femaleGroup.length != 0) {
        femaleGroup[0].isFirst = true;
    }
    if (maleGroup.length != 0) {
        maleGroup[0].isFirst = true;
    }
    femaleGroup = femaleGroup.concat(maleGroup);
    let itemGroup = femaleGroup.concat(otherGroup);

    for (let item of itemGroup) {
        section.push(
            <tr onClick={() => props.callback(item)} key={item._id}>
                {item.gender == 'male' && item.isFirst && <td rowSpan={maleCount} className='icon'><FontAwesomeIcon className='male' icon={faMale} /></td>}
                {item.gender == 'female' && item.isFirst && <td rowSpan={femaleCount} className='icon'><FontAwesomeIcon className='female' icon={faFemale} /></td>}
                {item.gender == null && <td>None</td>}
                {item.isFirst && <td rowSpan={item.gender == 'female' ? femaleCount : maleCount} style={{ 'textAlign': 'left', 'borderRight': '1px solid rgb(211, 211, 211)' }} width='20%'>{item.name}</td>}
                <td width='30%'>{item.typeColor}</td>
                <td width='20%'>{item.size}</td>
                <td width='10%'>{item.stock}</td>
                <td width='10%'><FontAwesomeIcon className='chevron' icon={faChevronRight} /></td>
            </tr>);
    }
    return section;
}

const CategoryItems = (props) => {
    /* finalTable is what gets returned with the proper JSX, dataTable is an array of categories that 
    each have an array of items, and sortTable is an array of category names. */
    let finalTable = [], dataTable = [], sortTable = [];

    finalTable.push(<tr key={1}><th colSpan={2}>Name</th><th>Type/Color</th><th>Size</th><th colSpan={2}>Stock</th></tr>)
    for (let item of props.items) {
        if (dataTable[item.name] == null) {
            dataTable[item.name] = [];
            sortTable.push(item.name);
        }
        dataTable[item.name].push(item);
    }
    sortTable.sort();
    for (let i = 0; i < sortTable.length; i++) {
        let name = sortTable[i]
        finalTable = finalTable.concat(addNameGroup(props, dataTable[name]))
    }
    return (<table className='items'><tbody>{finalTable}</tbody></table>);
}
export default CategoryItems;
