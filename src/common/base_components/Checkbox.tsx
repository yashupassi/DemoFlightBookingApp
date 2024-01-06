import React, { memo } from 'react';
import { WRow, WText, WTouchable } from '../ui';
import { Utils } from '../util';
import CheckedIcon from '../../../assets/img/checkbox.svg'
import UnCheckedIcon from '../../../assets/img/unchecked.svg'

const CustomCheckbox = ({ label, selected, onPress }: any) => {
    return (
        <WTouchable margin={[0, 0, Utils.scaleSize(10), 0]} onPress={onPress}>
            <WRow dial={5} spaceBetween>
                <WText fontSize={Utils.scaleSize(13)}>{label}</WText>
                {selected
                    ?
                    <CheckedIcon height={Utils.scaleSize(20)} width={Utils.scaleSize(20)} />
                    :
                    <UnCheckedIcon height={Utils.scaleSize(20)} width={Utils.scaleSize(20)} />
                }

            </WRow>
        </WTouchable>
    );
};


export default memo(CustomCheckbox);
