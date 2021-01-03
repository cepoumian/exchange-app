import React from 'react'
import currency_list from './utilities/currency_list'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base_currency: 'MXN',
      rates: null
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) { 
    this.setState({base_currency: event.target.value});
  }

  render() {
    const { base_currency, rates } = this.state;

    return (
      <>
        <h2>Currency Exchange; a simple exchange rate reference and currency converter.</h2>
        <form className="">          
            <h3 className="mb-4">Base currency</h3>
            <span className="mr-2">1</span>
            <select value={base_currency} onChange={this.handleChange} className="mr-1 form-control-sm">
              {Object.keys(currency_list).map((ticker) => {
                return <option key={ticker} value={ticker}>{ticker}</option>
              })}
            </select>
            <span> equals </span>
        </form>
      </>
    );

  }

}

export default Main;