import React, { memo } from 'react'
import { Root } from './src'
import { injectStore, store } from './src/redux';

const WrappedComponent = injectStore(Root, store);

const App = () =>  <WrappedComponent />
export default memo(App);