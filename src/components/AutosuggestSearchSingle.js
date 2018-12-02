import React, { Component, Fragment } from 'react';
import axios from 'axios';

import MyAutosuggest from './Autosuggest';
import SearchSingleResult from './SearchSingleResult';

class AutosuggestSearchSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerms: this.props.searchTerms,
      value: '',
      searchResult: ''
    }
  }

  valueCallbackForSingleSearch = (valueFromChild) => {
    this.setState({
      value: JSON.stringify(valueFromChild)
    })
  }

  submitSingleHandler = () => {
    axios.get('http://54.180.159.24/singleSearch/' + JSON.parse(this.state.value).search_term )
      .then(response =>
        {
          console.log(response.data)
          this.setState({
            searchResult: response.data
          })
        })
      .catch(err => console.log(err))

    this.setState({
      value: '',
      searchResult: ''
    })
  }

  render () {
    return (
      <Fragment>
        <MyAutosuggest searchTerms={this.state.searchTerms} callbackFromParent={this.valueCallbackForSingleSearch} />
        <button type='submit' onClick={this.submitSingleHandler}>검색</button>
        <SearchSingleResult searchResult={this.state.searchResult} />
      </Fragment>
    )
  }
}

export default AutosuggestSearchSingle;