import React from 'react';
import { TouchableOpacity as RNTouchable } from 'react-native';
import WStyles from './WStyles'

/**
 * Custom View component with additional styling options and touchable functionality.
 *
 * @param {Object} props - Component properties.
 * @returns {JSX.Element} - Customized View component.
 */
const View = (props: any) => {
    // Destructure props for better readability
    const {
        dial = 0,
        flex: _flex,
        style,
        spaceBetween,
        spaceAround,
        stretch,
        margin,
        padding,
        reverse,
        activeOpacity = 0.6,
        ...otherProps
    } = props;

    // Validate and adjust dial and flex values
    const _dial = dial > 0 && dial < 10 ? dial : 0;
    const flex = typeof (_flex) === "number" ? _flex : !_flex ? null : 1

    // Apply margin and padding styles using WStyles utility function
    const _WStyles = WStyles(margin, padding)

    // Determine justifyContent based on spaceBetween, spaceAround, and dial
    const justifyContent = spaceBetween ? 'space-between' : spaceAround ? 'space-around' : _dial === 0 ? null : _dial > 6 ? 'flex-end' :
        _dial > 3 ? 'center' : 'flex-start';

    // Determine alignItems based on stretch and dial
    const alignItems = stretch ? 'stretch' : _dial === 0 ? null : _dial % 3 === 0 ? 'flex-end' :
        _dial % 3 === 2 ? 'center' : 'flex-start';

    // Determine flexDirection based on reverse
    const flexDirection = reverse ? 'column-reverse' : 'column';

    return (
        <RNTouchable style={[{ flexDirection, justifyContent, alignItems, flex }, _WStyles, style]} {...otherProps} activeOpacity={activeOpacity}>
            {props.children}
        </RNTouchable>
    );
};

export default View;