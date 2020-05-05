import * as React from 'react'
import { FormattedDate } from 'react-intl';

export const Dates: React.FunctionComponent = () => {
  const [date, setDate] = React.useState("");

  const onChange = React.useCallback(e =>  {
   const {value } = e.target
   setDate(value)
  }, [setDate])

  return (
    <div>
      <h1>Dates</h1>
      <div>
        <input type="date" value={date} onChange={onChange}></input>
      </div>
      <FormattedDate value={date}/>
    </div>
  )
}