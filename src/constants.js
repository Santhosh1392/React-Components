import contentInEnglish from './context/Language/i18n/en-US.json'
import contentInTelugu from './context/Language/i18n/te.json'
import contentInMalayalam from './context/Language/i18n/ma.json'
import contentInTamil from './context/Language/i18n/ta.json'
import contentInKannada from './context/Language/i18n/ka.json'
import contentInHindi from './context/Language/i18n/hi.json'

export const supportedLanguages = [
  {
    name: 'English',
    value: 'en-US',
    content: contentInEnglish   
  },
  {
    name: 'Telugu',
    value: 'te',
    content: contentInTelugu   
  },
  {
    name: 'Malayalam',
    value: 'ma',
    content: contentInMalayalam   
  },
  {
    name: 'Tamil',
    value: 'ta',
    content: contentInTamil   
  },
  {
    name: 'Kannada',
    value: 'ka',
    content: contentInKannada   
  },
  {
    name: 'Hindi',
    value: 'hi',
    content: contentInHindi   
  }
]