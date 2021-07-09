import React from 'react'
const getId = () => `_${Math.random().toString(36).substr(2, 9)}`;

const TagItem = ({
  tag, isLastIndex, backspacePressedCount, handleOnRemoveTag
}) => {
  return (
    <div
      className={
        `tag__box ${backspacePressedCount === 1 && isLastIndex && 'warning__box'}`
      }
      key={`${getId()}`}
    >
      <span>{tag}</span>
      <span
        className="close__mark"
        onClick={() => handleOnRemoveTag(tag)}>
        ×
      </span>
    </div>
  )
}

export default TagItem