import React, { useContext, useState } from 'react'
import { LanguageContext } from './context';
import { supportedLanguages } from './constants'
import './App.scss';
import TagsInput from './components/TagsInput';

const App = () => {
  const [tagsList, setTagsList] = useState([])
  const langContext = useContext(LanguageContext)
  const { content, setSiteContent, setSiteLanguage, siteLanguage } = langContext

  const handleOnLanguageChange = (language) => {
    const { value, content } = language
    setSiteContent(content)
    setSiteLanguage(value)
  }

  const handleOnChange = (list) => {
    console.log('list', list)
    setTagsList(list)
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
    </div>
  );
}

export default App;
