import {Route, Routes} from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Nav (props) {
    console.log(props)
    const thing = ""
    return (
      
      <div className="">
        <h2>Hello</h2>
        <Routes> 
            <Route path="/" element={<Home/>}/> 
            <Route path="/componentA" element={<ComponentA/>}/> 
            <Route path="/componentA/:id" element={<ComponentADetails/>}/> 
        </Routes>
      </div>
    )
  }





