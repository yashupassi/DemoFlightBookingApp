import React, { memo } from 'react';;
import { WRow, WText, WTouchable, WView } from '../ui';
import Colors from '../styles/Colors';
import { Utils } from '../util';
import { Platform } from 'react-native';

const CustomRadioButton = ({ label, selected, onPress }: any) => {
    const { radioButtonIconContainer, radioButtonIcon } = getStyles()
    return (
        <WTouchable margin={[0, 0, Utils.scaleSize(10), 0]} onPress={onPress} >
            <WRow dial={5} spaceBetween>
            <WText fontSize={Utils.scaleSize(13)}>{label}</WText>
            <WView style={radioButtonIconContainer}>
                {selected && <WView backgroundColor={Colors.black} style={radioButtonIcon} />}
            </WView>
            </WRow>
            
            
        </WTouchable>
    )
};

const getStyles = () => {
    const isAndroid = Platform.OS ==='android'
    return ({
        
        radioButtonIconContainer: {
            width: Utils.scaleSize(20),
            height: Utils.scaleSize(20),
            borderRadius: Utils.scaleSize(50),
            borderWidth: Utils.scaleSize(isAndroid ? 4 : 2),
            borderColor: Colors.black,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: Utils.scaleSize(10),
        },
        radioButtonIcon: {
            width: Utils.scaleSize(12),
            height: Utils.scaleSize(12),
            borderRadius: Utils.scaleSize(6),
        },
    })
}
export default memo(CustomRadioButton)