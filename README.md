# Trading Dashboard front-end

This is a React.js based front-end application.

## Key properties of React.js

Is used for SPA (Single-Page Applications) in which there is only one HTML page, and the content is re-rendered on the client.

Typically there is a single root React component ("app") that encapsulates all the other components.
It is therefore typical to have only one call to ReactDOM.render().

### Props and State

"props"  and "state"  are core concepts of React. Actually, only changes in props  and/ or state  trigger React to re-render your components and potentially update the DOM in the browser.

"props" allow you to pass data from a parent (wrapping) component to a child (embedded) component.

Whilst "props" allow you to pass data down the component tree (and hence trigger an UI update), "state" is used to change the component state from within. Changes to state also trigger an UI update.

#### setState() method

setState() takes an argument passed to it and merges it with the existing state.

## Notes on New Generation JavaScript

### Spread syntax (...)

Spread syntax allows an iterable such as an array expression or string to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected, or an object expression to be expanded in places where zero or more key-value pairs (for object literals) are expected.

```
class Instrument {
  constructor(name, currentPrice) {
    this.name = name
    this.currentPrice = currentPrice
  }

  getPrice = () => { return this.currentPrice }
}

let inst = new Instrument('Sony', '7800')
console.log(inst.getPrice())

const inst_details = {
  // use Spread syntax to extract a flat map of properties from inst
  ...inst,
  type: 'equity'
}
```

### Rest syntax (...)

Rest syntax looks exactly like spread syntax, but is used for destructuring arrays and objects. In a way, rest syntax is the opposite of spread syntax: spread 'expands' an array into its elements, while rest collects multiple elements and 'condenses' them into a single element.

```
function sumAll(...args) { // args is the name for the array
  let sum = 0;

  for (let arg of args) sum += arg;

  return sum;
}

alert( sumAll(1) ); // 1
alert( sumAll(1, 2) ); // 3
```

### Destructuring

Allows extraction of elements from arrays or attriutes from objects.

### Array functions

```
const nums = [1,2,3]
const numsSquare = nums.map((n) => { return Math.pow(n, 2) })
console.log(numsSquare)
```

Some other functions are:
  * find;
  * reduce;
  * slice.

## Build Workflow

Projects are managed using a build workflow. It enables code optimization and usage of a next-gen JavaScript.

This includes:
  * Dependency Manager: E.g. npm, to pull in all the required libraries;
  * Bundler: E.g. Webpack, to bundle all the files into one (to support older browsers);
  * Compiler for a Next-Gen JavaScript: E.g. Babel;
  * Development Server: a test web server to test application on our own machine.

### Installing create-react-app

To install the create-react-app tool:
```
curl -sL https://rpm.nodesource.com/setup_8.x | sudo -E bash -
sudo yum remove -y nodejs npm
sudo dnf install nodejs
sudo npm install -g create-react-app
```

Check versions:
```
npm --version
node --version
```

### Making an app

```
create-react-app dashboard
npm start
```

## Notes on Recharts

### Installation

npm install recharts

### Includes

```javascript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
```

### Sample Custom Component

```javascript
import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class PriceChart extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
    <div>
      <LineChart width={800} height={500} data={this.props.data}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <XAxis dataKey="timestamp"/>
        <YAxis domain={['dataMin', 'dataMax']}/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{r: 3}}/>
      </LineChart>
    </div>
    )
  }

}

export default PriceChart;
```

### Sample Usage

```javascript
const tradePrices = [
  {timestamp: "2018-12-12 09:00:00.000000", price: 1},
  {timestamp: "2018-12-12 09:00:01.000000", price: 2},
  {timestamp: "2018-12-12 09:00:02.000000", price: 3},
  {timestamp: "2018-12-12 09:00:03.000000", price: 2},
  {timestamp: "2018-12-12 09:00:04.000000", price: 1},
];

<PriceChart data={tradePrices}/>
```

## Notes

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `serve build`

Allows serving an optimized build via HTTP.

Alternative is to use a Python web server, E.g.:
```
cd build
python -m SimpleHTTPServer 8000
```

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
