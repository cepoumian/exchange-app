import React from 'react';
import { Link } from 'react-router-dom';
// Custom utilities
import currency_list from './utilities/currency_list'

const Table = (props) => {
  
  const { base, rates } = props;
  
  if (!rates) {
    return null;
  }

  return (
    <div className="table-responsive-sm">
      <table className="table table-striped table-hover mt-2 mt-md-3">
        <thead className="thead-dark">
          <tr>
            <th scope="col">{currency_list[base].name}</th>
            <th scope="col" className="text-right py-3 pr-5">1.00 {base}</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((currency) => {
            return (
              <tr key={currency.ticker}>
                <td className="pl-5 py-3">{currency.name} ({currency.ticker})</td>
                <td className="text-right py-3 pr-5">
                  <Link className="deco-none" to={`/Swapper?base=${base}&quote=${currency.ticker}`}>{currency.rate.toFixed(6)}</Link>
                </td>
              </tr>
            );
          }
          )}
        </tbody>
      </table>      
    </div>
  )

}

export default Table;