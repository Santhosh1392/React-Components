/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer, useState } from 'react'
import PropTypes from 'prop-types'
import './OtpForm.scss'

const SET_VALUE = 'SET_VALUE'
const getRandomID = () => `_${Math.random().toString(36).substr(2, 9)}`
const getInitialState = (numberOfInputs) => {
  const otpInputsData = []
  for (let i = 1; i <= numberOfInputs; i += 1) {
    otpInputsData.push({
      id: getRandomID(),
      value: '',
    })
  }
  return otpInputsData
}

const otpFormReducer = (state, action) => {
  const { type, value, index } = action
  const newState = [...state]
  if (type ===  SET_VALUE) {
    newState[index].value = value
  }
  return newState
}

const OtpForm = ({ numberOfInputs, showOtp, onChange }) => {
  const [inputsArray, setInputsArray] = useReducer(otpFormReducer, getInitialState(numberOfInputs))
  const [focusId, setFocusId] = useState('')

  const handleOnChange = (e, inputIndex) => {
    const { value } = e.target
    const updatedValue = value.replace(/[^0-9.]/g, '')
    let focusId = inputsArray[inputIndex].id
    if (value.length === 0 && updatedValue.length === 0) {
      const prevInputIndex = inputIndex - 1
      if (prevInputIndex >= 0) {
        focusId = inputsArray[prevInputIndex].id
      }
    } else if(updatedValue.length === 1) {
      const nextInputIndex = inputIndex + 1
      if (nextInputIndex < inputsArray.length) {
        focusId = inputsArray[nextInputIndex].id
      }
    }
    setFocusId(focusId)
    setInputsArray({
      type: SET_VALUE,
      value: updatedValue,
      index: inputIndex
    })
  }

  useEffect(() => {
    const el = document.getElementById(focusId)
    if (el) el.focus()
  }, [focusId])

  useEffect(() => {
    const returnState = {}
    let otpString = ''
    for (let i = 0; i < inputsArray.length; i += 1) {
      returnState[`digit${i + 1}`] = inputsArray[i].value
      otpString += inputsArray[i].value
    }
    returnState.otpString = otpString
    if (onChange instanceof Function) {
      onChange(returnState)
    }
  }, [inputsArray])

  return (
    <div className="otp-inputs-section">
      {inputsArray.map((input, index) => (
        <input
          type={showOtp ? 'text': 'password'}
          onChange={(e) => handleOnChange(e, index)}
          id={input.id}
          value={input.value}
          maxLength="1"
          key={input.id}
        />
      ))}
    </div>
  )
}

OtpForm.defaultProps = {
  numberOfInputs: 4,
  showOtp: true,
  handleOnChange: null
}

OtpForm.propTypes = {
  numberOfInputs: PropTypes.number,
  showOtp: PropTypes.bool,
  handleOnDigitChange: PropTypes.func
}

export default OtpForm
