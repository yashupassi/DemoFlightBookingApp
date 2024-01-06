import React, { memo, useState } from 'react';
import { Modal } from 'react-native';
import { WView } from '../../common/ui';
import Colors from '../../common/styles/Colors';
import { Utils } from '../../common/util';
import { CustomRadioButton } from '../../common/base_components';
import { HIGHEST_PRICE, LOWEST_PRICE } from '../../redux/Types';

const SortModal: React.FC = ({ isModalVisible, onCloseModal, onApplySort }: any) => {
    const [sortType, setSortType] = useState('')

    const onSort = (type:string)=>{
        setSortType(type)
        onApplySort(type === LOWEST_PRICE)
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={onCloseModal}>
            <WView flex backgroundColor={Colors.tranparent_opcaity}>
                <WView
                    backgroundColor={Colors.white}
                    padding={[Utils.scaleSize(30), Utils.scaleSize(20)]}
                    style={{ marginTop: 'auto' }}>
                    <CustomRadioButton
                        selected={sortType === LOWEST_PRICE}
                        onPress={() => onSort(LOWEST_PRICE)}
                        label={"Lowest Price"} />
                    <CustomRadioButton selected={sortType === HIGHEST_PRICE} onPress={() => onSort(HIGHEST_PRICE)} label={"Highest Price"} />

                </WView>
            </WView>
        </Modal>
    );
};

export default memo(SortModal);
