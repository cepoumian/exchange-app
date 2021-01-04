import React from 'react';

const Table = (props) => {
  
  const { base, rates } = props;
  
  if (!rates) {
    return null;
  }

  return (
    <table className="table mt-5">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col" className="text-right py-3 pr-5">1.00 {base}</th>
        </tr>
      </thead>
      <tbody>
        {rates.map((currency) => {
          return (
            <tr key={currency.ticker}>
              <td className="pl-5 py-3">{currency.name} ({currency.ticker})</td>
              <td className="text-right py-3 pr-5">{currency.rate.toFixed(6)}</td>
            </tr>            
            );
          }
        )}
      </tbody>
    </table>
  )

}

export default Table;