import React, { Component } from 'react';
import './TextInput.css'

class TextInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        }
    }

    render() {

        return (
            <div className="HorizontalDiv">
              <label className="Label" id="lab" htmlFor="in">{this.props.input_name}: </label>
              <br />
              <input id={this.props.tag} className="InputOrder" value={this.state.inputValue} onBlur={evt => this.submitInputValue(evt)} onChange={(evt => this.onChanged(evt))}/>
            </div>
        )
    }

    updateInputValue(evt) {
      this.setState({
          inputValue: evt.target.value
      });
    }

    submitInputValue(evt) {
      this.props.onInputUpdate(this.props.tag, evt.target.value);
    }

    onChanged(evt) {
        let newText = '';
        let numbers = '0123456789';

        let text = evt.target.value
        for (var i=0; i < text.length; i++) {

            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
        }
        this.setState({ inputValue: newText });
	}
}

export default TextInput;
