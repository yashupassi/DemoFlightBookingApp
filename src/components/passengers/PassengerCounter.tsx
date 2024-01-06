import React, { memo } from 'react'
import { WRow, WText, WTouchable, WView } from '../../common/ui'
import Colors from '../../common/styles/Colors'
import { Utils } from '../../common/util'
import { ICON_TYPE_PASSENGER_ADULT, ICON_TYPE_PASSENGER_CHILD, ICON_TYPE_PASSENGER_INFANT } from '../../redux/Types'
import AdultIcon from '../../../assets/img/adult.svg'
import ChildIcon from '../../../assets/img/child.svg'
import InfantIcon from '../../../assets/img/infant.svg'
import { Platform } from 'react-native'

function PassengerCounter(props: any) {
    const isAndroid = Platform.OS ==='android'
    const { icon, passengerType, passengerAgeDescription, onAdd, onSubtract }: any = props

    const getIcon = (iconName:string) => {
        switch (iconName) {
            case ICON_TYPE_PASSENGER_ADULT:
                return (
                    <>
                        <AdultIcon height={Utils.scaleSize(30)} width={Utils.scaleSize(25)} fill={'rgba(0,0,0,0.5)'} />
                    </>
                )
                break;
            case ICON_TYPE_PASSENGER_CHILD:
                return (
                    <>
                        <ChildIcon height={Utils.scaleSize(30)} width={Utils.scaleSize(20)} color={"rgba(0,0,0,0.5)"} fill={'rgba(0,0,0,0.5)'} />
                    </>
                )
                break;
            case ICON_TYPE_PASSENGER_INFANT:
                return (
                    <>
                        <InfantIcon height={Utils.scaleSize(30)} width={Utils.scaleSize(20)} color={"rgba(0,0,0,0.5)"} fill={'rgba(0,0,0,0.5)'} />
                    </>
                )
                break;
            default:
                return (
                    <>

                    </>
                )
        }
    }

    return (
        <WRow style={{borderBottomWidth:Utils.scaleSize(2), borderColor:Colors.gray}} padding={[Utils.scaleSize(10), 0]} dial={5} spaceBetween>
            <WRow dial={5}>
                {getIcon(icon)}
            <WView margin={[0, Utils.scaleSize(10)]}>
                <WText fontWeight={"600"} fontSize={Utils.scaleSize(13)} color={Colors.black}>{passengerType}</WText>
                <WText fontWeight={"600"} fontSize={Utils.scaleSize(11)} color={Colors.dark_gray}>{passengerAgeDescription}</WText>
            </WView>
            </WRow>
            

            <WRow backgroundColor={Colors.gray} style={{ borderRadius: Utils.scaleSize(5) }}>
                <WTouchable onPress={onSubtract} padding={[Utils.scaleSize(7), Utils.scaleSize(10)]}>
                    <WText fontWeight={"600"} fontSize={Utils.scaleSize(15)} color={Colors.dark_gray}>{"-"}</WText>
                </WTouchable>

                <WView backgroundColor={Colors.light_gray} padding={Utils.scaleSize(isAndroid ? 4 : 0.5)} />

                <WTouchable onPress={onAdd} margin={[0, Utils.scaleSize(2)]} padding={[Utils.scaleSize(7), Utils.scaleSize(10)]}>
                    <WText fontWeight={"600"} fontSize={Utils.scaleSize(15)} color={Colors.dark_gray}>{"+"}</WText>
                </WTouchable>
            </WRow>
        </WRow>
    )
}


export default memo(PassengerCounter)