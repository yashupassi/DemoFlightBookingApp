import React from 'react'
import PropTypes from 'prop-types'
import { WTouchable, WText, WSpinner, WRow } from '.';
import Colors from '../styles/Colors';
import Utils from '../util/Utils';

/**
 * WButton component for rendering a customizable button with optional loading spinner.
 *
 * @param {object} props - The properties of the component.
 * @param {bool} props.disabled - Whether the button is disabled.
 * @param {bool} props.isLoading - Whether the button is in a loading state.
 * @param {number} props.dial - The dial property for styling.
 * @param {string} props.label - The label or text of the button.
 * @param {object} props.containerStyle - Custom styles for the button container.
 * @param {function} props.component - A custom component to render inside the button.
 * @param {function} props.onPress - The function to be called when the button is pressed.
 * @param {array} props.btnPadding - Padding values for the button.
 * @param {number} props.fontSize - Font size of the button text.
 * @param {string} props.fontWeight - Font weight of the button text.
 * @param {string} props.color - Color of the button text.
 * @param {string} props.spinnerColor - Color of the loading spinner.
 * @param {string} props.fontFamily - Font family for the button text.
 * @param {ReactNode} props.icon - Icon to be displayed inside the button.
 * @param {object} props.buttonTextStyle - Custom styles for the button text.
 *
 * @returns {JSX.Element} - Rendered WButton component.
 */

const WButton = ({ disabled, isLoading, dial, label, containerStyle, component, onPress, btnPadding, fontSize, fontWeight, color, spinnerColor = Colors.white, fontFamily, icon, buttonTextStyle } : any) => {
    return (
        <WTouchable disabled={disabled} dial={dial} onPress={isLoading ? () => { } : onPress} style={containerStyle} padding={btnPadding}>
             <WRow dial={5} >
             {!isLoading && icon}
            {
                isLoading ?
                    <WSpinner color={spinnerColor}/>
                    :
                    component && typeof component === "function" ? component() :
                        <WText style={buttonTextStyle} fontSize={fontSize} fontWeight={fontWeight} color={color} line={0}>{label}</WText>
            }
            </WRow>
        </WTouchable>
    )
}

// PropTypes for type checking
WButton.propTypes = {
    isLoading: PropTypes.bool,
    label: PropTypes.string,
    containerStyle: PropTypes.any,
    component: PropTypes.func,
    onPress: PropTypes.func,
    btnPadding: PropTypes.array,
    dial: PropTypes.number.isRequired,
    fontSize: PropTypes.number,
    fontWeight: PropTypes.string,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    spinnerColor: PropTypes.string
}

// Default values for props
WButton.defaultProps = {
    isLoading: false,
    dial: 5,
    fontSize: Utils.scaleSize(14),
    fontWeight: '700',
    color: Colors.white,
    fontFamily:'AtkinsonHyperlegible-Bold'
}

export default WButton;