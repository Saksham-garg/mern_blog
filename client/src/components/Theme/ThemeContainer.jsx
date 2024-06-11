import React from 'react'
import { useSelector } from 'react-redux'
const ThemeContainer = ({children}) => {
    const { themes } = useSelector((state) => state.theme)
  return (
    <div className={themes}>
        <div className="bg-white text-gray-700 dark:bg-[rgb(16,23,42)] dark:text-white min-h-screen">
            {children}
        </div>
    </div>
  )
}

export default ThemeContainer