import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Order from './components/Order'
import Trade from './components/Trade'
import TextInput from './components/TextInput'
import InstrumentSelector from './components/InstrumentSelector'
import SideSelector from './components/SideSelector'
import ServerManager from './components/ServerManager'
import PriceChart from './components/PriceChart'
import Socket from './socket/Socket'

const serverHostName = new ServerManager ().getServerHostname();

document.title = "Trading Dashboard";

class App extends Component {

  // WebSocket to get push notifications from the backend
  socket
  orderDisplayLimit = 10
  tradeDisplayLimit = 10

  constructor() {
    super()

    this.handleClick = this.handleClick.bind(this)
    this.socket = new Socket()
    this.startSubscriptions()
  }

  startSubscriptions() {

    this.socket.subscribeForPushNotifications("ORDERS", () => {
      this.getOrders()
    })

    this.socket.subscribeForPushNotifications("TRADE", () => {
      this.getTrades()
      this.getTradesByInstrument(this.state.ord_props.instcode);
    })
  }

  state = {
    orders: [],
    trades: [],
    tradePrices: [],
    ord_props: {}
  }

  onNewOrderUpdate(key, value) {
    var ord_p = this.state.ord_props
    ord_p[key] = value
    this.setState({ ord_props: ord_p })
    if (key === 'instcode') {
      this.getTradesByInstrument(this.state.ord_props.instcode)
    }
  }

  componentDidMount() {
    this.refreshData();
  }

  refreshData() {
    this.getOrders()
    this.getTrades()
  }

  getOrders() {
	console.log("GET ORDERS");
    axios.get(serverHostName + `/order?limit=` + this.orderDisplayLimit)
      .then(res => {
        const order_list = res.data;
        if (typeof(order_list) != 'string') {
          this.setState({ orders: order_list });
        } else {
          this.setState({ orders: [] });
        }
      });
  }

  getTrades() {
	console.log("GET TRADES");
    axios.get(serverHostName + `/trade?limit=` + this.tradeDisplayLimit)
      .then(res => {
        const trade_list = res.data;
        if (typeof(trade_list) != 'string') {
          this.setState({ trades: trade_list });
        } else {
          this.setState({ trades: [] });
        }
      });
  }

  getTradesByInstrument(instrCode) {
	console.log("GET TRADES BY INSTRUMENT: " + instrCode);
    axios.get(serverHostName + `/trade/byInstr?instCode=` + instrCode)
      .then(res => {
        const trade_list = res.data;
        if (trade_list !== "") {
          trade_list.reverse()
        }
        this.setState({ tradePrices: trade_list });
      });
  }

  handleClick() {
    axios.post(serverHostName + '/order/add', {
      "InstrCode": this.state.ord_props.instcode,
      "Quantity": this.state.ord_props.quantity,
      "Price": this.state.ord_props.price,
      "Notes": "A",
      "Side": this.state.ord_props.side,
	})
	.then(
		(response) => {},
		(error) => { console.log(error) }
	);
  }

  render() {

    var selectedTrades = []
    if (this.state.tradePrices.length > 0) {
      selectedTrades = this.state.tradePrices.map(trade => { return {"timestamp": trade.Timestamp, "price": trade.Price}});
    }

    return (
      <div>
        <div className="MainBlock">
        <div className="OrderEntry">
          <h1 className="Title" id="title">Trading Dashboard</h1>
          <InstrumentSelector
             onInputUpdate={(key, value) => this.onNewOrderUpdate(key, value)} tag="instcode"/>
          <SideSelector
             onInputUpdate={(key, value) => this.onNewOrderUpdate(key, value)} tag="side"/>
          <TextInput
             onInputUpdate={(key, value) => this.onNewOrderUpdate(key, value)} input_name="Quantity" tag="quantity"/>
          <TextInput
             onInputUpdate={(key, value) => this.onNewOrderUpdate(key, value)} input_name="Price" tag="price"/>
          <button className="Button" id="btn_send_order" onClick={this.handleClick}>Send order</button>
        </div>
        <div className="Chart">
          <PriceChart instrumentCode={this.state.ord_props.instcode} data={selectedTrades}/>
        </div>
        </div>
        <ul>
        <div className="MainBlock">
            <div className="FloatLeft">
            <h1 className= "Title" id="title">Orders</h1>
            <table className="DataTable" id="orders">
              <tbody>
                <tr>
                  <th>Order ID</th>
                  <th>Timestamp</th>
                  <th>Inst</th>
                  <th>Side</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Filled Quantity</th>
                  <th>Fill Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </tbody>
              {this.state.orders.map(order =>
                <Order key={order.OrderID} orderid={order.OrderID} timestamp={order.Timestamp} instrument={order.InstrCode} side={order.Side} quantity={order.Quantity} price={order.Price} quantity_filled={order.QuantityFilled} fill_price={order.FillPrice} status={order.Status}/>
              )}
            </table>
            <h1 className="Title" id="title">Trades</h1>
            <table className="DataTable" id="trades">
              <tbody>
                <tr>
                  <th>Trade ID</th>
                  <th>Timestamp</th>
                  <th>Resting order ID</th>
                  <th>Incoming order ID</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </tbody>
              {this.state.trades.map(trade =>
                <Trade key={trade.TradeID} tradeid={trade.TradeID} timestamp={trade.Timestamp} restingorderid={trade.RestingOrderID} incomingorderid={trade.IncomingOrderID} quantity={trade.Quantity} price={trade.Price} />
              )}
            </table>
            </div>
            <div className="Clear" />
        </div>
        </ul>
      </div>
    );
  }

}

export default App;
