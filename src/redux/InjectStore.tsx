import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

const injectStore = (Component:any, store:Store) => {
    return class extends PureComponent {
        render = () => <Provider store={store}>
            <Component {...this.props} />
        </Provider>
    }
}

export default injectStore;