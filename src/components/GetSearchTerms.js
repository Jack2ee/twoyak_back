import React, { Component, Fragment } from 'react';
import axios from 'axios';

import AutosuggestSearchSingle from './AutosuggestSearchSingle';
import AutosuggestSearchMulti from './AutosuggestSearchMulti';

class GetSearchTerms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerms: null,
      isRender: false
    }
  }

  // searchTerm 받기
  getSearchTerm = async () => {
    const response = await axios.get('http://54.180.159.24/search_terms');
    return await response;
  };

  // rendering searchTerm
  componentDidMount () {
    if (!this.state.searchTerm)
      {
        this.getSearchTerm().then(response =>
          {
            this.setState({searchTerms: response.data, isRender: true})
            console.log(response.data)})
        .catch(error => console.log(error))
      };
  };

  render() {
    if (this.state.isRender) {
      return (
        <Fragment>
          <AutosuggestSearchSingle searchTerms={this.state.searchTerms} />
          <AutosuggestSearchMulti searchTerms={this.state.searchTerms} />
        </Fragment>
      );
    } else {
      return (
        <div>
          Spinner
        </div>
      )
    }
  }
}

export default GetSearchTerms;