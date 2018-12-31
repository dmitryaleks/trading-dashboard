import React, { Component } from 'react';
import axios from 'axios';
import Instrument from './Instrument'
import ServerManager from './ServerManager'
import './Selector.css'

const serverHostName = new ServerManager ().getServerHostname();

class InstrumentSelector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            instruments: []
        }
    }

    componentDidMount() {
      this.getInstruments()
    }

    getInstruments() {
      axios.get(serverHostName + `/instruments`)
        .then(res => {
          const inst_list = res.data;
          this.setState({ instruments: inst_list });
          // initialize the instrument with the first instrument available
          this.props.onInputUpdate(this.props.tag, this.state.instruments[0].InstrCode);
        });
    }

    render() {

        return (
            <div className="HorizontalDiv">
              <label className="Label" id="lab" htmlFor="sel">Instrument: </label>
              <br />
              <select className="Select" id="sel" value={this.state.inputValue} onChange={evt => this.submitInputValue(evt)} onBlur={evt => this.submitInputValue(evt)}>
                {this.state.instruments.map(instr =>
                  <Instrument key={instr.InstrCode} instr_code={instr.InstrCode} />
                )}

              </select>
            </div>
        )
    }

    submitInputValue(evt) {
      this.setState({
          inputValue: evt.target.value
      });
      this.props.onInputUpdate(this.props.tag, evt.target.value);
    }
}

export default InstrumentSelector;
