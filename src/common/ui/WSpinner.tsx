import React from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator } from 'react-native';
import Colors from '../styles/Colors';

/**
 * WSpinner component for rendering an activity indicator (spinner).
 *
 * @param {object} props - The properties of the component.
 * @returns {JSX.Element} - Rendered WSpinner component.
 */
const WSpinner = ({ size, color }: any) => {
    return (
        <ActivityIndicator
            size={size}
            color={color}
        />
    )
}

// PropTypes for type checking
WSpinner.propTypes = {
    size: PropTypes.string,
    color: PropTypes.string
}

// Default values for props
WSpinner.defaultProps = {
    size: 'small',
    color: Colors.white
}

export default WSpinner;
