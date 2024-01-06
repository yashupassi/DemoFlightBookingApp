import React, { memo, useEffect, useMemo, useState } from 'react';
import { FlatList, Modal } from 'react-native';
import { WRow, WView } from '../../common/ui';
import Colors from '../../common/styles/Colors';
import { Utils } from '../../common/util';
import { CustomCheckbox, FullButton } from '../../common/base_components';

const FilterModal: React.FC = ({ isModalVisible, onCloseModal, onApplyFilter, airlinesData, onClearFilter }: any) => {
    const [airlines, setAirlines] = useState([])

    const clearFilter = ()=>{
        setAirlines([])
        onClearFilter()
    }

    const onClickAirline = (data: string) => {
        const tempArr = [...airlines]
        const index = tempArr.indexOf(data);
        if (index !== -1) {
            tempArr.splice(index, 1);
        } else {
            tempArr.push(data);
        }
        setAirlines(tempArr)
    }

    const _renderItem = ({ item, index }: any) => {
        const isSelected = airlines.indexOf(item) > -1
        return (
            <CustomCheckbox selected={isSelected} onPress={() => onClickAirline(item)} label={item} />
        )
    }

    const renderAirlines = useMemo(() => {
        return (
            <FlatList
                data={airlinesData}
                renderItem={_renderItem} />

        )
    }, [airlinesData, airlines])

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={onCloseModal}>
            <WView flex backgroundColor={Colors.tranparent_opcaity}>
                <WView
                    backgroundColor={Colors.white}
                    padding={Utils.scaleSize(20)}
                    style={{ marginTop: 'auto' }}>
                    {renderAirlines}
                    <WRow spaceBetween dial={4} margin={[Utils.scaleSize(10)]}>
                        <FullButton style={{ backgroundColor: Colors.darker_gray, flex: 0.45 }} label={"Clear"} onPress={clearFilter} />
                        <FullButton style={{ flex: 0.45 }} disabled={!airlines?.length} label={"Apply"} onPress={() => onApplyFilter(airlines)} />
                    </WRow>
                </WView>
            </WView>
        </Modal>
    );
};

export default memo(FilterModal);
