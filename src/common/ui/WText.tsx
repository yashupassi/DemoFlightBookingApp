import React from 'react';
import { Text as RNText, Platform } from 'react-native';
import WStyles from './WStyles';
import Colors from '../styles/Colors';

/**
 * Custom Text component with additional styling options.
 *
 * @param {Object} props - Component properties.
 * @returns {JSX.Element} - Customized Text component.
 */
const Text = (props: any) => {
    const {
        lines = 1,
        fontWeight = "500",
        fontStyle = "normal",
        fontFamily = "AtkinsonHyperlegible-Regular",
        letterSpacing = 0,
        color = Colors.black,
        style,
        center,
        right,
        transparent,
        margin,
        padding,
        onPress,
        ...rest
    } = props;
    // Determine text alignment based on props
    const textAlign = center ? 'center' : right ? 'right' : null;

    // Set font size from props or default to 12
    const fontSize = props.fontSize ? props.fontSize : 12;

    // Set background color to transparent or default
    const backgroundColor = transparent ? 'transparent' : null;

    // Apply margin and padding styles using the WStyles utility function
    const _WStyles = WStyles(margin, padding);

    return (
        <RNText
            {...rest}
            onPress={onPress}
            style={[{ fontSize, fontStyle, letterSpacing, textAlign, color, backgroundColor, fontWeight: fontWeight }, _WStyles, style]}
            numberOfLines={lines}
        >
            {props.children}
        </RNText>
    );
}

export default Text;
