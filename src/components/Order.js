import React, { Component } from 'react';
import axios from 'axios';
import ServerManager from './ServerManager'

const serverHostName = new ServerManager ().getServerHostname();

class Order extends Component {

    state = {
      highlighted: false,
      status: "",
      quantity_filled: 0
    }

    render() {
      return (
        <tbody>
          <tr style={{backgroundColor: this.getRowColor()}}>
            <td>{this.props.orderid}</td>
            <td>{this.props.timestamp}</td>
            <td>{this.props.instrument}</td>
            <td>{this.props.side}</td>
            <td id="order_quantity">{this.props.quantity}</td>
            <td id="order_price">{this.props.price}</td>
            <td>{this.props.quantity_filled}</td>
            <td>{this.props.fill_price}</td>
            <td style={{backgroundColor: this.getStatusColor() }} id="order_status">{this.props.status}</td>
            <td id="order_cancel" onClick={this.cancelOrder.bind(this, this.props.orderid)}><button>Cancel</button></td>
          </tr>
        </tbody>
      );
    }

    getRowColor() {
      return this.state.highlighted? 'orange':'white'
    }

    getStatusColor() {
      return this.props.status==="C"?this.getRowColor():
                                     this.state.highlighted? 'orange':'MediumSpringGreen'
    }

    componentDidMount() {
      this.setState({status: this.props.status})
      this.setState({quantity_filled: this.props.quantity_filled})
      this.flash()
    }

    componentDidUpdate() {
      if (this.state.status !== this.props.status ||
          this.state.quantity_filled !== this.props.quantity_filled) {

        this.setState({status: this.props.status})
        this.setState({quantity_filled: this.props.quantity_filled})

        this.flash()
      }
    }

    flash() {
      this.setState({highlighted:true})
      setTimeout(() => {this.setState({highlighted:false})}, 500)
    }

    cancelOrder(orderID) {
      axios.post(serverHostName + '/order/delete', {
        "OrderID": this.props.orderid
	    });
    }
}

export default Order;
