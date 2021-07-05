import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './ToastMessage.scss'

const ToastMessage = ({title, description, closable, position, toastType}) => {
  const [showToast, setShowToast] = useState(true)
  const handleCloseToast = () => {
    setShowToast(false)
  }
  return (
    <>
      {showToast && (
        <div className={`toast-message-container ${position.toLowerCase()} ${toastType.toLowerCase()}`}>
          {closable && <div onClick={handleCloseToast} className="close-icon">&#10006;</div>}
          {title && <h4 className='toast-title'>{title}</h4>}
          {description && <p className='toast-description'>{description}</p>}
        </div>
      )}
    </>
  )
}

ToastMessage.defaultProps = {
  title: 'Hey, There!',
  description: 'Simple Description',
  closable: true,
  position: 'TOP-RIGHT',
  toastType: 'SUCCESS'
}

ToastMessage.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  closable: PropTypes.bool,
  position: PropTypes.string,
  toastType: PropTypes.string
}
export default ToastMessage