import ActiveLink from './ActiveLink'
import {Button} from 'react-bootstrap';
import {ShoppingCart, Person} from 'styled-icons/material'
import {Plus} from 'styled-icons/boxicons-regular'
import {Clipboard} from 'styled-icons/boxicons-regular'
import {Menu} from 'styled-icons/boxicons-regular/Menu'

function NavigationBar(props) {
  let isProfile = false; let isShopping = false; let isAdd = false; let isLog = false; let isInventory = false;
  switch(props.selector){
    case 0:
      isProfile = true;
      break;
    case 1:
      isShopping = true;
      break;
    case 2:
      isAdd = true;
      break;
    case 3: 
      isLog = true;
      break;
    case 4:
      isInventory = true;
      break;
  }
  return(
  <div style={{marginLeft: 'auto', marginRight: 'auto'}}>
    <ActiveLink href="/profile">
      <Button className="footer-btn" style={isProfile ? {color: 'white', backgroundColor:'#51ADA9'} : {backgroundColor:'white'}}>
        <Person size="40%"/><span className="caption">profile</span></Button>
      </ActiveLink>
    <ActiveLink href="/shop">
      <Button className="footer-btn" style={isShopping ? {color: 'white', backgroundColor:'#51ADA9'} : {backgroundColor:'white'}}>
        <ShoppingCart size="40%"/><span className="caption">shopping list</span></Button>
      </ActiveLink>
    <ActiveLink href="/add">
      <Button className="add-btn" variant="secondary" style={isAdd ? {color: 'white', backgroundColor:'#51ADA9'} : {backgroundColor:'white'}}>
      <Plus size="65%" /><div className="caption"></div></Button>
      </ActiveLink>
    <ActiveLink href="/log">
      <Button className="footer-btn" style={isLog ? {color: 'white', backgroundColor:'#51ADA9'} : {backgroundColor:'white'}}>
        <Clipboard size="40%"/><span className="caption">log</span></Button>
      </ActiveLink>
    <ActiveLink href="/inventory">
      <Button className="footer-btn" style={isInventory ? {color: 'white', backgroundColor:'#51ADA9'} : {backgroundColor:'white'}}>
        <Menu size="40%"/><span className="caption">inventory</span></Button>
      </ActiveLink>
  </div>)
}
export default NavigationBar;