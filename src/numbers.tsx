import * as React from 'react'
import { FormattedNumber } from 'react-intl';

export const Numbers: React.FunctionComponent = () => {
  const [number, setNumber] = React.useState(0);

  const onChange = React.useCallback(e => {
    const { value } = e.target
    setNumber(value)
  }, [setNumber])

  return (
    <div>
    <h1>Number</h1>
    <input
      type="number"
      step="0.01"
      value={number}
      onChange={onChange}
    />
    <p><FormattedNumber value={number} /></p>
    <p><FormattedNumber currency="EUR" style="currency" value={number} /></p>
    <p><FormattedNumber currency="EUR" minimumFractionDigits={3} style="currency" value={number} /></p>
  </div>
  )
}