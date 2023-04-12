import './App.css';
import Navbar from './components/Navbar';
import React, { Component } from 'react'  //rcc
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';


// import PropTypes from 'prop-types'  //impt
// import NewsItem from './components/NewsItem'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  pageSize = 15;
  apikey = process.env.REACT_APP_NEWS_API

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {
    return (
      <div>
        <Router>
        <LoadingBar
          height={3}
            color='#f11946'
            progress={this.state.progress}
          />
          <Navbar />
          
          
          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress} apikey={this.apikey} key="general" pageSize={this.pageSize} country="in" category="general" />} />
            <Route path="/business" element={<News setProgress={this.setProgress} apikey={this.apikey} key="business" pageSize={this.pageSize} country="in" category="business" />} />
            <Route path="/entertainment" element={<News setProgress={this.setProgress} apikey={this.apikey} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />} />
            <Route path="/health" element={<News setProgress={this.setProgress} apikey={this.apikey} key="health" pageSize={this.pageSize} country="in" category="health" />} />
            <Route path="/science" element={<News setProgress={this.setProgress} apikey={this.apikey} key="science" pageSize={this.pageSize} country="in" category="science" />} />
            <Route path="/sports" element={<News setProgress={this.setProgress} apikey={this.apikey} key="sports" pageSize={this.pageSize} country="in" category="sports" />} />
            <Route path="/technology" element={<News setProgress={this.setProgress} apikey={this.apikey} key="technology" pageSize={this.pageSize} country="in" category="technology" />} />
            <Route path="/international" element={<News setProgress={this.setProgress} apikey={this.apikey} key="us" pageSize={this.pageSize} country="us" category="general" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}

//b3188b861e2542e3bc03a2184552d690
