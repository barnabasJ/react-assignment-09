import * as React from 'react'
import { FormattedMessage } from 'react-intl';

export const Texts: React.FunctionComponent = () => {
  const [name, setName] = React.useState("Christian");
  const [gender, setGender] = React.useState("male");
  const [number, setNumber] = React.useState(1);

  const onNameChange = React.useCallback(e => {
    const { value } = e.target
    setName(value)
  }, [setName])

  const onNumberChange = React.useCallback(e => {
    const { value } = e.target
    setNumber(value)
  }, [setNumber])

  const onGenderChange = React.useCallback(e => {
    const { value } = e.target
    setGender(value)
  }, [setGender])

  return (
    <div>
      <h1>Texts</h1>
      <input
        type="text"
        value={name}
        onChange={onNameChange}
      />
      <input
        type="number"
        value={number}
        onChange={onNumberChange}
      />
      <select id="gender" value={gender} onChange={onGenderChange}>
          <option value="male">male</option>
          <option value="female">female</option>
      </select>
      <h1>{name}</h1>
      <FormattedMessage id="greeting" values={{name, gender, age: number}}/>
    </div>
  )
}
