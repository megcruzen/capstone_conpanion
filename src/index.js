import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import ConBuddy from './components/ConBuddy'
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'

ReactDOM.render(
  <Router>
      <ConBuddy />
  </Router>
  , document.getElementById('root'))
