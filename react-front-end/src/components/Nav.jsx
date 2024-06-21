import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Nav (props) {
    console.log(props)
    const thing = ""
    return (
      
      <div className="">
        <h2>Hello</h2>
        <Link to="/"> <h2> Home </h2> </Link>
        <Link to="/componentA"> <h2> Component A</h2> </Link>
      </div>
    )
  }


