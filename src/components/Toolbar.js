import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Toolbar extends Component {
  render () {
    return (
      <div>
        <Link to='/'>투약</Link>
        <Link to='/Search'>검색</Link>
        <Link to='/Contents'>컨텐츠</Link>
        <Link to='/Login'>로그인</Link>
      </div>
    )
  }
};

export default Toolbar;