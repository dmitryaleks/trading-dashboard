import React, { Component } from 'react';

class Trade extends Component {

    state = {
      highlighted: false,
    }

    render() {
      return (
        <tbody>
          <tr style={{backgroundColor: this.state.highlighted? 'orange':'white'}}>
            <td>{this.props.tradeid}</td>
            <td>{this.props.timestamp}</td>
            <td>{this.props.restingorderid}</td>
            <td>{this.props.incomingorderid}</td>
            <td>{this.props.quantity}</td>
            <td>{this.props.price}</td>
          </tr>
        </tbody>
      );
    }

    componentDidMount() {
      this.setState({status: this.props.status})
      this.setState({quantity_filled: this.props.quantity_filled})
      this.flash()
    }

    flash() {
      this.setState({highlighted:true})
      setTimeout(() => {this.setState({highlighted:false})}, 500)
    }
}

export default Trade;
