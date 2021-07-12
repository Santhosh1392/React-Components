import React, { useEffect, useState } from 'react'
import './TimePicker.scss'

const timeRegex = /^(0?[1-9]|1[012])(:[0-5]\d)[APap][mM]$/
const HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const MINUTES = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
  51, 52, 53, 54, 55, 56, 57, 58, 59,
]
const AMPM = ['AM', 'PM']
const timePickerData = [
  { name: 'hours', value: HOURS},
  { name: 'minutes', value: MINUTES},
  { name: 'ampm', value: AMPM}
]

const DropDown = ({values, name, onChange, value}) => {
  const [selectedValue, setSelectedValue] = useState(value || '')
  const handleOnClick = (value) => {
    setSelectedValue(name !== 'ampm' && value < 10 ? `0${value}` : value)
  }

  useEffect(() => {
    if (onChange instanceof Function) {
      onChange(selectedValue, name)
    }
  }, [selectedValue])

  return (
    <div className="dropdown-container">
      {values && values.map((value, index) => (
        <div
          onClick={() => handleOnClick(value)}
          className={`option--value ${selectedValue === value && 'active-option'}`}
          key={`option-value-${index}`}>
          {name !== 'ampm' && value < 10 ? `0${value}` : value}
        </div>
      ))}
    </div>
  )
}

const TimePicker = ({ time, onChange }) => {
  const [showOverlay, setShowOverlay] = useState(false)
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [amPm, setAmPm] = useState('')

  const handleOnChange = (value, name) => {
    if (name === 'hours') setHours(value)
    else if (name === 'minutes') setMinutes(value)
    else setAmPm(value)
  }

  const getFormattedTime = () => {
    const formattedHours = hours && hours > 12 ? hours - 12 : hours
    return `
      ${formattedHours >= 10 ? formattedHours : `0${formattedHours}`}${formattedHours && ' : '}
      ${minutes >= 10 ? minutes : `0${minutes}`} ${amPm}`
  }

  const setInitialTime = () => {
    if (time) {
      let newTime = time.toLowerCase().replace(/\s/g, '')
      console.log('newTime', newTime)
      if (timeRegex.test(newTime)) {
        const isAmPm = newTime.includes('am')
        newTime = newTime.replace(isAmPm ? 'am' : 'pm', '')
        const dataArray = newTime.split(':')
        const curHours = dataArray[0]
        const curMinutes = dataArray[1]
        setHours(curHours)
        setMinutes(curMinutes)
        setAmPm(isAmPm ? 'AM' : 'PM')
        return
      }
    }
    const dateObj = new Date()
    const curHours = dateObj.getHours()
    const curMinutes = dateObj.getMinutes()
    setHours(curHours)
    setMinutes(curMinutes)
    setAmPm(curHours > 12 ? 'PM' : 'AM')
  }

  useEffect(() => {
    setInitialTime()
  }, [])

  useEffect(() => {
    if (onChange instanceof Function && !showOverlay && hours && minutes && amPm) {
      onChange(getFormattedTime())
    }
  }, [showOverlay])

  useEffect(() => {
    if (hours && minutes && amPm && showOverlay) setShowOverlay(false)
  }, [hours, minutes, amPm])
  
  const data = { hours, minutes, 'ampm': amPm}

  return (
    <div className="time-picker-container">
      <div className="input--section" onClick={() => setShowOverlay(true)}>
        {getFormattedTime()}
      </div>
      {showOverlay && (
        <div className="dropdown--section">
          {timePickerData && timePickerData.map(td => {
            const {name, value} = td
            return (
              <DropDown
                values={value}
                onChange={handleOnChange}
                name={name}
                value={data[name]}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default TimePicker