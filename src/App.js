import React, { useContext } from 'react'
import { LanguageContext } from './context';
import { supportedLanguages } from './constants'
import './App.scss';

const App = () => {
  const langContext = useContext(LanguageContext)
  const { content, setSiteContent, setSiteLanguage, siteLanguage } = langContext

  const handleOnLanguageChange = (language) => {
    const { value, content } = language
    setSiteContent(content)
    setSiteLanguage(value)
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
    </div>
  );
}

export default App;
