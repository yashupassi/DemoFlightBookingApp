// Import necessary components, styles, and utilities from React, custom UI components,
// and React Native modules
import React, { memo } from 'react';
import Colors from '../../common/styles/Colors';// Custom color definitions
import Utils from '../../common/util/Utils';// Utility functions
import { WButton } from '../ui';// Assuming this is a custom UI button component
import { Platform } from 'react-native';


// Functional component for a full-width button
function FullButton(props: any) {

    // Destructure props for easy access
    const { label, style,btnStyle, onPress, loading, color, icon, disabled, spinnerColor= Colors.white }:any = props;
    
    // Destructure styles from the result of getStyles
    const { containerStyle } = getStyles();

    // Render the custom button using the WButton component
    return (
            <WButton
            label={label}
            isLoading={loading}
            onPress={onPress}
            color={color}
            icon={icon}
            buttonTextStyle={btnStyle}
            disabled={disabled}
            spinnerColor={spinnerColor}
            containerStyle={[containerStyle, style]} />
        
    );
}

// Function to get the styles for the component
const getStyles = () => {

    return ({
        containerStyle: {
            height: Utils.scaleSize(40),
            borderRadius: Utils.scaleSize(5),
            backgroundColor: Colors.orange,
            shadowOffset: {
                width: 1,
                height: 3,
            },
            shadowOpacity: 0.1,
            shadowColor: Colors.black,
            elevation: Platform.OS === 'ios' ? 2 : 0,
            justifyContent:'center'
        }
    })
}

// Memoize the component to optimize rendering performance
export default memo(FullButton);