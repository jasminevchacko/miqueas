import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Col from 'react-bootstrap/Col';
import React from 'react';

export default function QuantityButtons(props) {
  let pHolder = '0';
  if (props.quantity == '') {
    pHolder = '';
  }
  return (
    <Col>
      <InputGroup>
        <InputGroup.Prepend>
          <Button variant="outline-secondary"
            style={{'color': '#51ADA9',
              'borderRight': 'none',
              'opacity': '1'}}
            disabled={
              (props.negativeAllowed) ? false : parseInt(props.quantity) <= 0
            }
            onClick={() =>
              props.onChange(parseInt(props.quantity) - 1)
            }>-
          </Button>
        </InputGroup.Prepend>
        <FormControl style={{'textAlign': 'center',
          'borderRight': 'none', 'borderLeft': 'none',
          'borderColor': 'rgb(108, 117, 125)'}}
        type={'number'}
        placeholder={pHolder}
        value = {props.quantity}
        onChange = {(e) => {
          props.onChange(e.target.value);
        }}
        />
        <InputGroup.Append>
          <Button variant="outline-secondary"
            style={{'color': '#51ADA9',
              'borderLeft': 'none'}}
            onClick={() =>
              props.onChange(parseInt(props.quantity) + 1)}>+
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Col>
  );
}
