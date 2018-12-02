import React, { Fragment } from 'react';

import Toolbar from './Toolbar';
import GetSearchTerms from './GetSearchTerms';

const Layout = () => {
  return (
    <Fragment>
      <Toolbar />
      <GetSearchTerms />
    </Fragment>
  )
}

export default Layout;