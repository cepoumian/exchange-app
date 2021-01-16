import React from 'react';
// Custom modules
import Table from './Table'
// Custom utilities
import currency_list from './utilities/currency_list';
import { checkRequestStatus, json } from './utilities/miscMethods';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: 'MXN',
      rates: null,
      loading: true
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
    this.setState({ loading: true });
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
      this.setState({ rates, loading: false });
    })
    .catch(error => console.error(error.message))
  }

  render() {
    const { base, rates, loading } = this.state;

    return (
      <>
        <h2 className="mb-4 primaryText">Currency Exchange; a simple exchange rate reference and currency converter.</h2>
        <div className="d-flex flex-column">
          <div className="col-sm-6 col-lg-4 align-self-start">
            <div className="row align-items-baseline">
              <h4 className="my-4" id="currencySelectorLabel">Base currency</h4>
              <form className="form-inline ml-3">
                  <select value={base} onChange={this.handleChange} className="form-control-sm mr-1" disabled={loading}>
                    {Object.keys(currency_list).map((ticker) => {
                      return <option key={ticker} value={ticker}>{ticker}</option>
                    })}
                  </select>
              </form>            
            </div>            
          </div>
        </div>        
        <Table base={base} rates={rates} />
      </>
    );

  }

}

export default Main;