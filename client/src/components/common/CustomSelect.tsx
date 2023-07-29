import React from 'react'
import Select, { ActionMeta, SingleValue } from 'react-select'

type OptionsType = {
  value: string
  label: string
}[]

interface ICustomSelect {
  onChange: (
    newValue: SingleValue<{
      value: string
      label: string
    }>,
    actionMeta: ActionMeta<{
      value: string
      label: string
    }>
  ) => void
  options: OptionsType
  value: string
}

const CustomSelect: React.FC<ICustomSelect> = ({ onChange, options, value }) => {
  const defaultValue = (options: OptionsType, value: string) => {
    if (options) {
      return options.find((option) => option?.value === value)
    }
  }
  return (
    <Select
      value={defaultValue(options, value)}
      options={options}
      onChange={onChange}
    />
  )
}

export default CustomSelect
