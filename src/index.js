import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import CosBuddy from './components/CosBuddy'
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'

ReactDOM.render(
  <Router>
      <CosBuddy />
  </Router>
  , document.getElementById('root'))
