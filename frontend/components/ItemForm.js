import React from 'react';
import SmartForm from './SmartForm';

/**
 * Class to create a form for entering items
 */
class ItemForm extends React.Component {
  /**
   * Renders the ItemForm
   * @return {jsx} the jsx rendering of the ItemForm
   */
  render() {
    return <SmartForm target = "/inventory" components = {
      [{
        'type': 'dropdown',
        'name': 'Category(Categoría)',
        'required': true,
        'options': ['School (Escuela)',
          'Personal Hygiene (Artículos de higiene personal)',
          'Medical Supplies (Artículos médicos)',
          'Home Items (Artículos de casa)',
          'Sports Equipment (Equipo deportivo)',
          'Boys Pants (Pantalones de niños)',
          'Girls Pants (Pantalones de niñas)',
          'Shoes (Zapatos)',
          'Boys Shirts (Camisas de niños)',
          'Girls Shirts (Camisas de niñas)',
          'Underwear (Ropa interior)',
          'Socks (Calcetines)'],
      }, {
        'type': 'date',
        'name': 'Date(Fecha)',
        'required': true,
      }, {
        'type': 'time',
        'name': 'Time(Tiempo)',
        'required': true,
      }, {
        'type': 'dropdown',
        'name': 'Staff(Empleado)',
        'required': true,
        'options': [
          'Test',
          'Test2',
          'Test3',
        ],
      }, {
        'type': 'number',
        'name': 'Quantity Change (Cambio de cantidad)',
        'required': true,
      }, {
        'type': 'textarea',
        'name': 'Note(Nota)',
        'required': false,
        'placeholder': 'Test Text Area'
      }]
    }/>;
  }
}

export default ItemForm;
