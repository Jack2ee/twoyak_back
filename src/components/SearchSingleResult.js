import React, { Component, Fragment } from 'react';
import ReactHtmlParser from 'react-html-parser';

class SearchSingleResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render () {
    if (typeof this.props.searchResult === 'string') {
      return (
        <Fragment />
      )
    } else if (typeof this.props.searchResult.product_name === 'undefined') {
      return (
        <Fragment>
          <div>분류: {this.props.searchResult[0]}</div>
          <div>성분: {this.props.searchResult[8]}</div>
          <div>효능효과: {this.props.searchResult[5].filter(i => typeof i !== 'object').map((i, k) => <div key={k}>{ReactHtmlParser(i)}</div>)}</div>
          <div>복용방법: {this.props.searchResult[6].filter(i => typeof i !== 'object').map((i, k) => <div key={k}>{ReactHtmlParser(i)}</div>)}</div>
          <div>의약품분류: {this.props.searchResult[1]}</div>
          <div>제약사: {this.props.searchResult[2]}</div>
          <div>보관방법: {this.props.searchResult[3]}</div>
          <div>유효기간: {this.props.searchResult[4]}</div>
          <div>주의사항: {this.props.searchResult[7].filter(i => typeof i !== 'object').map((i, k) => <div key={k}>{ReactHtmlParser(i)}</div>)}</div>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <div>제조사: {this.props.searchResult.enterprise_name}</div>
          <div>효능효과: {JSON.parse(this.props.searchResult.benefits).map((i, k) => <div key={k}>{i}</div> )}</div>
          <div>성분: {this.props.searchResult.ingredients}</div>
          <div>유통기간: {this.props.searchResult.shelf_life}</div>
          <div>기준: {this.props.searchResult.standard}</div>
          <div>보관방법: {JSON.parse(this.props.searchResult.storage).map((i, k) => <div key={k}>{i}</div>)}</div>
          <div>복용방법: {this.props.searchResult.suggested_use}</div>
          <div>주의사항: {JSON.parse(this.props.searchResult.warnings).map((i, k) => <div key={k}>{i}</div>)}</div>
        </Fragment>
      )
    }
  }
}

export default SearchSingleResult;