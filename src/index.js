import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import Conpanion from './components/Conpanion'
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'

ReactDOM.render(
  <Router>
      <Conpanion />
  </Router>
  , document.getElementById('root'))
