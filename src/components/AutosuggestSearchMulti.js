import React, { Component, Fragment } from 'react';
import axios from 'axios';

import MyAutosuggest from './Autosuggest';
import SearchMultiResult from './SearchMultiResult';

class AutosuggestSearchSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerms: this.props.searchTerms,
      inputs: [],
      multiResult: '',
      numOfInputs: [0, 0],
    }
  }

  callbackForMultiSearch = (valueFromChild) => {
    let newInput = `query${this.state.inputs.length+1}`
    this.setState({
      inputs: [...this.state.inputs, { [newInput]: valueFromChild }],
    })
  }

  submitMultiHandler = () => {
    const inputsToParams = JSON.stringify(this.state.inputs)
    axios.get('http://54.180.159.24/multiSearch/', { params: {search: inputsToParams}})
      .then(response =>
        {
          console.log(response.data)
          this.setState({
            multiResult: response.data
          })
        })
      .catch(err => console.log(err))
    
    this.setState({
      inputs: [],
      multiResult: ''
    })
  }

  inputAppendHandler = () => {
    this.setState({
      numOfInputs: [...this.state.numOfInputs, 0]
    })
  }

  inputRemoveHandler = () => {
    if (this.state.numOfInputs.length > 1) {
      this.setState({
        numOfInputs: this.state.numOfInputs.pop()
      })
    }
  }

  render () {
    return (
      <Fragment>
        {this.state.numOfInputs.map((i ,k) => 
          <MyAutosuggest searchTerms={this.state.searchTerms} id={i} key={k} callbackFromParent={this.callbackForMultiSearch} />)}
        <button onClick={this.inputAppendHandler}>+</button>
        <button onClick={this.inputRemoveHandler}>-</button>
        <button type='submit' onClick={this.submitMultiHandler}>검색</button>
        <SearchMultiResult multiResult={this.state.multiResult} />
        <div>{JSON.stringify(this.state.inputs)}</div>
      </Fragment>
    )
  }
}

export default AutosuggestSearchSingle;