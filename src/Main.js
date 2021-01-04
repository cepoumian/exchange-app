import React from 'react';
// Custom imports
import currency_list from './utilities/currency_list';
import Table from './Table'
import { checkRequestStatus, json } from './utilities/miscMethods';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: 'MXN',
      rates: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.getRates = this.getRates.bind(this);
  }

  componentDidMount() {
    this.getRates(this.state.base);
  }

  handleChange(event) { 
    this.setState({base: event.target.value});
    this.getRates(event.target.value);
  }

  getRates(base) {
    fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${base}`)
    .then(checkRequestStatus)
    .then(json)
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }

      const rates = Object.keys(data.rates)
      .filter(ticker => ticker !== base)
      .map(ticker => ({
            ticker,
            rate: data.rates[ticker],
            name: currency_list[ticker].name,
            symbol: currency_list[ticker].symbol
          }))
      this.setState({ rates });
    })
    .catch(error => console.error(error.message))
  }

  render() {
    const { base, rates } = this.state;

    return (
      <>
        <h2>Currency Exchange; a simple exchange rate reference and currency converter.</h2>
        <form className="">          
            <h3 className="mb-4">Base currency</h3>
            <span className="mr-2">1</span>
            <select value={base} onChange={this.handleChange} className="mr-1 form-control-sm">
              {Object.keys(currency_list).map((ticker) => {
                return <option key={ticker} value={ticker}>{ticker}</option>
              })}
            </select>
            <span> equals </span>
        </form>
        <Table base={base} rates={rates} />
      </>
    );

  }

}

export default Main;