import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class PriceChart extends Component {

  render() {
    return (
    <div>
      <LineChart width={900} height={380} data={this.props.data}
        margin={{top: 5, right: 30, left: 20, bottom: 0}}>
        <XAxis dataKey="timestamp"/>
        <YAxis label={{value:'yen', position: 'insideLeft'}} domain={['dataMin - 5', 'dataMax + 5']}/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend>"avc"</Legend>
        <Line name={this.props.instrumentCode + ' price'} dataKey="price" stroke="#8884d8" strokeWidth={6} dot={false} activeDot={{r: 5}}/>
      </LineChart>
    </div>
    )
  }

}

export default PriceChart;
