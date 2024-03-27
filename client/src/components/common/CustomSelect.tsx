import React from 'react'
import Select, { ActionMeta, SingleValue } from 'react-select'

interface IOption {
  value: string
  label: string
}

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
  options: IOption[]
  value: string | undefined
  showErrors?: boolean
}

export const CustomSelect: React.FC<ICustomSelect> = ({ options, value, showErrors, onChange }) => {
  const defaultValue = (options: IOption[], value: string | undefined) => {
    if (options) {
      return options.find((option) => option?.value === value)
    }
  }

  return (
    <Select
      className={showErrors ? 'error' : ''}
      value={defaultValue(options, value)}
      options={options}
      onChange={onChange}
    />
  )
}

export default CustomSelect
