// Import necessary components, styles, and utilities from React, custom UI components,
// and React Native modules
import React, {  useMemo } from 'react'
import PropTypes from 'prop-types'
import { WRow, WText, WTouchable, WView } from '../ui';
import Utils from '../util/Utils';
import Colors from '../styles/Colors';
import BackIcon from '../../../assets/img/back.svg'

// Interface for the Header component props
interface HeaderInterface {
    label?: string;
    leftPress?: () => any;
    rightPress?: () => any;
    rightLabel?: string;
    showRightIcon?: boolean;
    iconRight?: any;
    iconLeft?:any;
    children?: Element;
}

// Functional component for a customizable header with left and right icons or labels
function NewHeader ({ label, leftPress, rightPress, rightLabel, showRightIcon, iconRight, iconLeft, children }: HeaderInterface){
    
    // Destructure styles from the result of getStyles
    const { container, leftIconContainer, rightIconContainer } = getStyles();

    // Memoized left icon for performance optimization
    const leftIcon = useMemo(() => {
        return (
            <WTouchable onPress={leftPress} dial={5} stretch padding={[Utils.scaleSize(1), Utils.scaleSize(1)]} style={leftIconContainer}>
               {iconLeft ? iconLeft : <BackIcon />}
            </WTouchable>
        )
    }, [iconLeft]);

    // Memoized right icon or label for performance optimization
    const rightIcon = useMemo(() => {
        return (
            <WTouchable onPress={rightPress} dial={5} stretch style={rightLabel ? {} : rightIconContainer}>
                {
                    rightLabel ?
                        <WText fontSize={Utils.scaleSize(14)} color={Colors.black} >{rightLabel}</WText>
                        : iconRight
                }
            </WTouchable>
        )
    }, [showRightIcon, rightLabel, rightPress, iconRight]);

    // Render the customizable header with left and right icons or labels
    return (
        <WRow padding={[0, Utils.scaleSize(10)]} style={container} dial={5} backgroundColor={Colors.white}>
            {leftIcon}
            <WView flex dial={5}>
                <WRow dial={5}>
                    {children}
                    <WText margin={[0, Utils.scaleSize(children ? 5 : 0)]} fontSize={Utils.scaleSize(15)} color={Colors.black} fontWeight={"700"}>{label}</WText>
                </WRow>
            </WView>
            {rightIcon}
        </WRow>
    )
}

// Function to get the styles for the component
const getStyles = () => {
    return ({
        container: {
            minHeight: Utils.scaleSize(56),
        },
        leftIconContainer: {
            width: Utils.scaleSize(30),
            height: Utils.scaleSize(30)
        },
        rightIconContainer: {
            width: Utils.scaleSize(30),
            height: Utils.scaleSize(30)
        },
    })
}

// Define propTypes for the Header component
Header.propTypes = {
    label: PropTypes.string,
    leftPress: PropTypes.func,
    rightPress: PropTypes.func,
    showRightIcon: PropTypes.bool,
    leftCrossIcon: PropTypes.bool
}

export default NewHeader;
