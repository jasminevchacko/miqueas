import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFemale, faMale, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const createSection = (props, itemGroup, date) => {
    var section = []
    section.push(<tr key={date}><th style = {{paddingLeft: "8%"}}colSpan={7}>{date}</th></tr>)
    for (let item of itemGroup) {
        section.push(
            <tr onClick={() => props.callback(item)} 
            key={item.transactionItemId}>
                {item.gender=='male' && <td className='icon'><FontAwesomeIcon className='male' icon={faMale} /></td>}
                {item.gender=='female' && <td className='icon'><FontAwesomeIcon className='female' icon={faFemale} /></td>}
                {item.gender != 'female' && item.gender != 'male' && <td className='icon'> </td>}
                <td width="10%">{item.name}</td>
                <td width="23%">{item.staff}</td>
                <td width="25%">{item.recipient}</td>
                <td className={item.quantityChanged < 0 ? 'red':'green'} >{item.quantityChanged}</td>
                <td ><FontAwesomeIcon className='chevron' icon={faChevronRight} /></td>
            </tr>
    )}
    return section;
}

const LogTable = (props) => {
    let dataTable = [];
    let finalTable = [];
    let sortTable = [];
    let items = props.items.sort((a,b) => (a.date > b.date) ? 1 : -1);
    console.log("items: ", items);
    for (let item of items) {
        let year = item.date.substring(0,4);
        let month = item.date.substring(5,7);
        let day = item.date.substring(8, 10);
        item.visibleDate = month + "/" + day + "/" + year;
        if (dataTable[item.visibleDate] == null) {
            dataTable[item.visibleDate] = [];
            sortTable.push(year + month + day);
        }
        dataTable[item.visibleDate].push(item);
    }
    sortTable.sort();
    for (let i = sortTable.length-1; i>=0; i--) {
        let date = sortTable[i].substring(4,6) + "/" + sortTable[i].substring(6,8) + "/" + sortTable[i].substring(0,4);
        finalTable = finalTable.concat(createSection(props, dataTable[date], date))
    }
    return(finalTable);
}
export default LogTable;
