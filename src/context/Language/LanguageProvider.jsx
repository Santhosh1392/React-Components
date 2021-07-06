import React, { createContext, useState } from 'react'
import contentInEnglish from './i18n/en-US.json';

const LanguageContext = createContext({
  siteLanguage: 'en-US',
  content: contentInEnglish,
  setSiteContent: () => {},
  setSiteLanguage: () => {},
})

const LanguageProvider = ({
  children, currentLanguage = 'en-US', siteContent = contentInEnglish
}) => {
  const [siteLanguage, setSiteLanguage] = useState(currentLanguage);
  const [content, setSiteContent] = useState(siteContent);
  return (
    <LanguageContext.Provider
      value={{
        siteLanguage,
        setSiteLanguage,
        content,
        setSiteContent,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export { LanguageContext, LanguageProvider }

