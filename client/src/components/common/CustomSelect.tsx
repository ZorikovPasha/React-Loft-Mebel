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
  value: string
}

export const CustomSelect: React.FC<ICustomSelect> = ({ onChange, options, value }) => {
	const defaultValue = (options: IOption[], value: string) => {
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
