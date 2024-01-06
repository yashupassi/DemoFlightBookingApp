import React, { memo, useState } from 'react';
import { WText, WView } from '../ui';
import { Utils } from '../util';
import Colors from '../styles/Colors';
import { Dropdown } from 'react-native-element-dropdown';
import { Platform } from 'react-native';

const CustomDropdown = ({ style, title, fontSize, titleStyle, onFocus, onBlur, placeholder, data, onChange, value }: any) => {
    const { container, dropdown } = getStyles()
    return (
        <WView style={[container, style]}>
            {title?.length > 0 &&
                <WText
                    style={[{ marginLeft: Utils.scaleSize(10) }, titleStyle]}
                    color={Colors.dark_gray}
                    fontFamily={'AtkinsonHyperlegible-Regular'}
                    fontSize={fontSize || Utils.scaleSize(15)}>
                    {title}
                </WText>}

            <Dropdown
                style={dropdown}
                // placeholderStyle={styles.placeholderStyle}
                // selectedTextStyle={styles.selectedTextStyle}
                data={data}
                search={false}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={placeholder}
                value={value}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={onChange}
            />
        </WView>
    );
};

const getStyles = () => {
    return ({
        container: {
            marginTop: Utils.scaleSize(10),
        },
        dropdown: {
            minHeight: Utils.scaleSize(40),
            borderColor: Colors.border_gray,
            borderWidth: Utils.scaleSize(Platform.OS === 'ios' ? 2 : 3),
            borderRadius: Utils.scaleSize(5),
            paddingHorizontal: 8,
        },
    })
}

export default memo(CustomDropdown);
