import React, { useEffect, useState } from "react"
import { AsyncTypeahead, TypeaheadInputMulti, Token as RBTToken } from "react-bootstrap-typeahead"
import { defaultFilterBy } from "react-bootstrap-typeahead/lib/utils"
import _ from "lodash"

import * as AsyncField from "@/helpers/AsyncField"

const Select = ({
  id,
  placeholder,
  options,
  selected,
  isLoading,
  onChange,
  onSearch,
  disabled = false,
}): JSX.Element => (
  <AsyncTypeahead
    id={id}
    multiple
    selected={selected}
    onChange={onChange}
    onSearch={onSearch}
    options={options}
    isLoading={isLoading}
    minLength={0}
    useCache
    placeholder={placeholder}
    disabled={disabled}
    filterBy={(option, props) => {
      if (props.text.length === 0 && option.new) {
        return false
      }
      return defaultFilterBy(option, { ...props, filterBy: [] })
    }}
    renderInput={(inputProps, props) => (
      <TypeaheadInputMulti {...inputProps} selected={selected}>
        {selected.map((option, idx) => (
          <RBTToken index={idx} key={option.label} onRemove={props.onRemove} option={option}>
            {option.selectLabel || option.label}
          </RBTToken>
        ))}
      </TypeaheadInputMulti>
    )}
  />
)

const AsyncSearch = ({
  selectedValues,
  setSelectedValues,
  getOptions,
  id = "async-typeahead-select",
  placeholder = "Choose an option",
  maxSelectable = null,
}): JSX.Element => {
  const [optionsField, setOptionsField] = useState(AsyncField.createField({ defaultValue: [] }))

  const [options, setOptions] = useState([])
  const [initialized, setInitialized] = useState(false)

  const maxReached = maxSelectable ? selectedValues.length >= maxSelectable : false

  const searchOptions = (query) => {
    const field = AsyncField.cloneField(optionsField)

    setOptionsField(AsyncField.setFieldLoading(field))

    getOptions(query)
      .then((response) => {
        setOptionsField(AsyncField.setFieldReady(field, { value: response.data.data.options }))
        if (_.find(field.value, { label: query })) {
          setOptions(field.value)
        } else {
          setOptions(
            _.concat(field.value, {
              new: true,
              label: `New Option: ${query}`,
              value: query,
              selectLabel: query,
            })
          )
        }
      })
      .catch(() => {
        setOptionsField(AsyncField.setFieldFailed(field))
      })
  }

  useEffect(() => {
    if (!initialized) {
      // preload options
      searchOptions("")
      setInitialized(true)
    }
  }, [initialized])

  return (
    <Select
      id={id}
      placeholder={placeholder}
      options={options}
      selected={selectedValues}
      onChange={setSelectedValues}
      isLoading={AsyncField.isLoading(optionsField)}
      onSearch={searchOptions}
      disabled={maxReached}
    />
  )
}

export default AsyncSearch
