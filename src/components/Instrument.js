import React from 'react';

function Instrument(props) {
  return (
    <option value={props.instr_code}>{props.instr_code}</option>
  )
}

export default Instrument;
