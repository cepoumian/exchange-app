import React from 'react';

//Custom utilities
import currency_list from './utilities/currency_list.js';
import { checkRequestStatus, json } from './utilities/miscMethods';

class Swapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rate: 0,
      baseTicker: 'MXN',
      baseValue: 0,
      quoteTicker: 'USD',
      quoteValue: 0, 
    };
    this.getRate = this.getRate.bind(this);
    this.changeBaseTicker = this.changeBaseTicker.bind(this);
    this.changeBaseValue = this.changeBaseValue.bind(this);
    this.changeQuoteTicker = this.changeQuoteTicker.bind(this);
    this.changeQuoteValue = this.changeQuoteValue.bind(this);
  }

  componentDidMount() {
    const { baseTicker, quoteTicker } = this.state;
    this.getRate(baseTicker, quoteTicker);
  }

  getRate(base, quote) {
    fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${base}&symbols=${quote}`)
    .then(checkRequestStatus)
    .then(json)
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }

      const rate = data.rates[quote];

      this.setState({
        rate,
        baseValue: 1,
        quoteValue: Number((1 * rate).toFixed(3))        
      });

    })
    .catch((error) => console.log(error.message));
  }

  toBaseOperation(amount, rate) {
    return amount * (1/rate);
  }

  toQuoteOperation(amount, rate) {
    return amount * rate;
  }

  swap(amount, rate, operation) {
    const input = parseFloat(amount);

    if (Number.isNaN(input)) {
      return '';
    }
    return operation(input, rate).toFixed(3);
  }

  changeBaseTicker(event) {
    const baseTicker = event.target.value;
    this.setState({ baseTicker });
    this.getRate(baseTicker, this.state.quoteTicker);
  }

  changeBaseValue(event) {
    const quoteValue = this.swap(event.target.value, this.state.rate, this.toQuoteOperation);
    this.setState({
      baseValue: event.target.value,
      quoteValue
    });
  }

  changeQuoteTicker(event) {
    const quoteTicker = event.target.value;
    this.setState({ quoteTicker });
    this.getRate(this.state.baseTicker, quoteTicker);
  }

  changeQuoteValue(event) {
    const baseValue = this.swap(event.target.value, this.state.rate, this.toBaseOperation);
    this.setState({
      quoteValue: event.target.value,
      baseValue
    });      
  }

  render() {
    const { rate, baseTicker, baseValue, quoteTicker, quoteValue } = this.state;

    const currencies = Object.keys(currency_list)
    .map((ticker) => {
      return <option key={ticker} value={ticker}>{ticker}</option>
    });

    return(
      <>
      <div className="mb-3">
        <h2>Currency Swapper</h2>
        <h3> 1 {currency_list[baseTicker].name} = {rate.toFixed(3)} {currency_list[quoteTicker].name}</h3>
      </div>
      <form className="form-row">
        <div className="form-group">
          <select value={baseTicker} onChange={this.changeBaseTicker} className="form-control mb-2">
            {currencies}
          </select>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">{currency_list[baseTicker].symbol}</div>
            </div>
            <input id="base" className="form-control" value={baseValue} onChange={this.changeBaseValue} type="number"/>            
          </div>
          <small className="text-secondary">{currency_list[baseTicker].name}</small>
        </div>
        <div className="col-md-2 d-flex justify-content-center align-items-center">
          <h3>=</h3>
        </div>
        <div className="form-group col-md-5">
          <select value={quoteTicker} onChange={this.changeQuoteTicker} className="form-control mb-2">
            {currencies}
          </select>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">{currency_list[quoteTicker].symbol}</div>
            </div>
            <input id="quote" className="form-control" value={quoteValue} onChange={this.changeQuoteValue} type="number"/>
          </div>
          <small className="text-secondary">{currency_list[quoteTicker].name}</small>       
        </div>
      </form>
      </>
    );
  }
}

export default Swapper;