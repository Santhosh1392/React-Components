import React, { useContext, useState } from 'react'
import { LanguageContext } from './context';
import { supportedLanguages } from './constants'
import './App.scss';
import TagsInput from './components/TagsInput';
import { FormInput, OtpForm, TimePicker } from './components';

const App = () => {
  const [tagsList, setTagsList] = useState([])
  const langContext = useContext(LanguageContext)
  const { content, setSiteContent, setSiteLanguage, siteLanguage } = langContext
  const [otpString, setOtpString] = useState('')

  const handleOnLanguageChange = (language) => {
    const { value, content } = language
    setSiteContent(content)
    setSiteLanguage(value)
  }

  const handleOnChange = (list) => {
    console.log('list', list)
    setTagsList(list)
  }

  const handleOnTimeChange = () => {}
  const handleOnOTPChange = (data) => {
    setOtpString(data.otpString)
  }

  return (
    <div className="App">
      <div className="content">
        <div className="lang-buttons-flex">
          {supportedLanguages && supportedLanguages.map((language, index) => {
            const { name, value } = language;
            return (
              <div
                key={`${value}-language-${index}`}
                className={`language-button ${value === siteLanguage && 'active'}`}
                onClick={() => handleOnLanguageChange(language)}>
                {name}
              </div>
            )
          })}
        </div>
        <div className="lang-provider-example">
          <h2>{content.WELCOME_HEADING}</h2>
          <p>{content.INTRO_DESCRIPTION}</p>
        </div>
      </div>
      <h2>Tags Input Demo</h2>
      <TagsInput onChange={handleOnChange} />
      <h3>Added Tags: {`[ ${tagsList.join(', ')} ]`}</h3>
      <h3>Timepicker Component</h3>
      <TimePicker
        time="10:14a"
        onChange={handleOnTimeChange}
      />
      <h3>OTP Form Demo</h3>
      <OtpForm onChange={handleOnOTPChange} />
      <h4>OTP: {otpString}</h4>
      <div className="form-section">
        <h4>With Labels</h4>
        <FormInput
          placeholder="user@xyz.com"
          errorDescription="Enter valid email address"
          type="email"
          labelText="Email"
        />
        <FormInput
          placeholder="Password"
          type="password"
          labelText="Password"
        />
        <FormInput
          labelText="Readonly"
          value="Readonly Input"
          readOnly
        />
        <h4>Without Labels</h4>
        <FormInput
          multiline
          placeholder="Description"
        />
        <FormInput
          type="date"
        />
        <FormInput
          type="time"
        />
      </div>
    </div>
  );
}

export default App;
