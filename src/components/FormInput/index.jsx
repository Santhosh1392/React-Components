/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import './FormInput.scss'

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/

const FormInput = ({
  type, value, onChange, className, placeholder,
  labelText, errorDescription, multiline, required, readOnly
}) => {
  const [inputValue, setInputValue] = useState(value || '')
  const [isFocused, setIsFocused] = useState(false)
  const [isInputValid, setIsInputValid] = useState(required || false)
  const [errorMessage, setErrorMessage] = useState(errorDescription || '')

  const handleOnChange = (e) => {
    const { value } = e.target
    setInputValue(value)
  }

  const handleValidation = () => {
    switch (type) {
      case 'email': {
        const isValid = EMAIL_REGEX.test(inputValue)
        setErrorMessage(
          inputValue ? errorDescription || 'Please enter valid email'
          : 'This field is required'
        )
        setIsInputValid(isValid)
        break;
      }
      case 'password': {
        const isValid = PASSWORD_REGEX.test(inputValue)
        setErrorMessage(
          inputValue && !isValid ? errorDescription || 'Password should contain atleast one number and one special character'
          : 'This field is required'
        )
        setIsInputValid(isValid)
        break;
      }
      default: 
        if (inputValue) {
          setIsInputValid(true)
        }
        break;
    }
  }

  const handleOnInputFocus = () => {
    if (!isFocused) setIsFocused(true)
  }

  useEffect(() => {
    handleValidation()
    if (onChange instanceof Function) {
      onChange(inputValue)
    }
  }, [inputValue])

  return (
    <div className='form-input-container'>
      {labelText && <label>{labelText}</label>}
      {!multiline ? (
        <input
          type={type}
          placeholder={placeholder}
          className={`
            ${className} input-element 
            ${isFocused && !isInputValid && 'invalid-input'}`
          }
          onChange={handleOnChange}
          value={inputValue}
          onFocus={handleOnInputFocus}
          readOnly={readOnly}
        />
      ) : (
        <textarea
          placeholder={placeholder}
          className={`
            ${className} text-area input-element 
            ${isFocused && !isInputValid && 'invalid-input'}`
          }
          onChange={handleOnChange}
          value={inputValue}
          onFocus={handleOnInputFocus}
          rows={4}
          readOnly={readOnly}
        />
      )}
      {isFocused && inputValue && !isInputValid && (
        <p className='error-message'>{errorMessage}</p>
      )}
    </div>
  )
}

FormInput.defaultProps = {
  type: 'text',
  multiline: false,
  labelText: null,
  className: null,
  required: true,
  readOnly: false
}

export default FormInput