import React, { useContext } from 'react'
import { CalcContext } from '../context/CalcContext'

const Screen = () => {

    const {calc} = useContext(CalcContext)

  return (
    <div className="screen">
      {calc.expression ? calc.expression : "0"}
    </div>
  )
}

export default Screen