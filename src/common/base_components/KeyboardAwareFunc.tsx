import React, { PureComponent } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Colors from '../styles/Colors';

// HOC to wrap a component with KeyboardAwareScrollView for improved keyboard interaction
const keyboardAwareFunc = (Component: any) => {
    // Returning a new class that extends PureComponent
    return class extends PureComponent {
        // Render method for the enhanced component
        render = () => <KeyboardAwareScrollView // Wrapping the component with KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
            bounces={false}
            nestedScrollEnabled={true}
            style={{ flexGrow: 1, backgroundColor: Colors.white }}
            keyboardShouldPersistTaps={"always"}
            contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.white }}>
            <Component {...this.props} />
        </KeyboardAwareScrollView>
    }
}

export default keyboardAwareFunc;