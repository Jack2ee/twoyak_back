import React, { Component, Fragment } from 'react';

class SearchMultiResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      multiResult: ''
    }
  }
  
  render () {
    if (this.props.multiResult) {
      return (
        <Fragment>
          {this.props.multiResult.map((i, k) => 
            <div key={k}>
              <div>충돌성분: {i.first_ingr} - {i.second_ingr}</div>
              <div>요약: {i.review}</div>
              <div>상세: {i.more_info}</div>
              <div>비고: {i.note}</div>
            </div>
            )
          }
        </Fragment>
      )
    } else {
      return (
        <Fragment />
      )
    }
  }
}


export default SearchMultiResult;