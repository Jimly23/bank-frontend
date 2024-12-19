import React from 'react'

const Button = ({text, style, type}) => {
  return (
    <button type={type} className={`px-5 ${style && style} pt-1 pb-2 rounded-md text-white bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600  font-medium cursor-pointer text-center`}>
      {text}
    </button>
  )
}

export default Button