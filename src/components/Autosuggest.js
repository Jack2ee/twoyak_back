import React, { Component, Fragment } from 'react';
// import ReactDom from 'react-dom'; autosuggest elasticsearch
import Autosuggest from 'react-autosuggest';
// import axios from 'axios';
// import { debounce } from 'throttle-debounce'; autosuggest elasticsearch

class MyAutosuggest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerms: this.props.searchTerms,
      value: '',
      inputs: {
        search_type: '', search_term: ''
      },
      suggestions: [],
      searchResult: ''    
    }
  };

  escapeRegexCharacters = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  getSuggestions = (value) => {
    const escapeedValue = this.escapeRegexCharacters(value.trim());

    if ( escapeedValue === '' ) {
      return [];
    } 

    const regex = new RegExp('^' + escapeedValue, 'i');

    return this.state.searchTerms.filter(searchTerm => regex.test(searchTerm.title));
  };

  getSuggestionValue = (suggestion) => {
    if (suggestion.category === '의약품명') {
      this.setState({
        inputs: {search_type: 'drug_name', search_term: suggestion.title}
      })
    } else if (suggestion.category === '성분명(영문)') {
      this.setState({
        inputs: {search_type: 'drug_ingr_eng', search_term: suggestion.title}
      })
    } else if (suggestion.category === '성분명(국문)') {
      this.setState({
        inputs: {search_type: 'drug_ingr_kor', search_term: suggestion.title}
      })
    } else if (suggestion.category === '건강기능식품 제품명') {
      this.setState({
        inputs: {search_type: 'sup', search_term: suggestion.title}
      })
    } else {
      this.setState({
        inputs: {search_type: 'sup_ingr', search_term: suggestion.title}
      })
    }
    return suggestion.title
  };

  renderSuggestion = (suggestion) => {
    return <span>{suggestion.title}</span>;
  };

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    })
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  shouldRenderSuggestions = (value) => {
    return value.trim().length > 1;
  };

  onBlur = () => {
    if (this.state.inputs.search_type && this.state.inputs.search_term) {
      this.props.callbackFromParent(this.state.inputs)
    }
  }

  onFocus = () => {
    this.setState({
      inputs: {
        search_type: '', search_term: ''
      },
      value: ''
    })
  }

  render () {
    const { value, suggestions } = this.state

    const inputProps = {
      placeholder: '제품명을 입력하세요.',
      value,
      onChange: this.onChange,
      onBlur: this.onBlur,
      onFocus: this.onFocus
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        shouldRenderSuggestions={this.shouldRenderSuggestions}
        highlightFirstSuggestion={true}
        inputProps={inputProps}
      />
    )
  }
}

export default MyAutosuggest;