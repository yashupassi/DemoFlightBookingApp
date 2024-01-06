import React, { memo, useMemo, useState } from 'react'
import { WView } from '../../common/ui'
import Colors from '../../common/styles/Colors'
import { FullButton, Header } from '../../common/base_components'
import { useNavigation } from '@react-navigation/native'
import { Utils } from '../../common/util'
import { PassengerCounter } from '../../components'
import { FLIGHT_ADULTS, FLIGHT_CHILD, FLIGHT_INFANT, ICON_TYPE_PASSENGER_ADULT, ICON_TYPE_PASSENGER_CHILD, ICON_TYPE_PASSENGER_INFANT } from '../../redux/Types'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getFlightStateToProps, updateFlightUIConstraints } from '../../redux/flights/Action'

function Passengers() {

    const navigation: any = useNavigation()
    const dispatch = useDispatch()
    const { adult_count, child_count, infant_count } = useSelector(getFlightStateToProps, shallowEqual);

    const onChangeValue = (key: string, value: any) => {
        dispatch(updateFlightUIConstraints({
            [key]: value
        }))
    }

    const handleCount = (incrementType: string, passengerType: string) => {
        if (incrementType === 'add') {
            switch (passengerType) {
                case ICON_TYPE_PASSENGER_ADULT:
                    onChangeValue(FLIGHT_ADULTS, adult_count + 1)
                    break;
                case ICON_TYPE_PASSENGER_CHILD:
                    onChangeValue(FLIGHT_CHILD, child_count + 1)
                    break;
                case ICON_TYPE_PASSENGER_INFANT:
                    onChangeValue(FLIGHT_INFANT, infant_count + 1)
                    break;
            }
        }
        else{
            switch (passengerType) {
                case ICON_TYPE_PASSENGER_ADULT:
                    const count = adult_count > 1 ? adult_count - 1 : adult_count
                    onChangeValue(FLIGHT_ADULTS, count)
                    break;
                case ICON_TYPE_PASSENGER_CHILD:
                    const childCount = child_count > 0 ? child_count - 1 : child_count
                    onChangeValue(FLIGHT_CHILD, childCount)
                    break;
                case ICON_TYPE_PASSENGER_INFANT:
                    const infantCount = infant_count > 0 ? infant_count - 1 : infant_count
                    onChangeValue(FLIGHT_INFANT, infantCount)
                    break;
            }
        }
    }

    const renderHeader = useMemo(() => {
        return (
            <Header leftPress={() => navigation.pop()} label='Passengers' />
        )
    }, [])

    const onContinue = ()=>{
        navigation.pop()
    }

    return (
        <WView backgroundColor={Colors.white} flex>
            {renderHeader}
            <WView padding={Utils.scaleSize(20)} flex>
                <PassengerCounter onSubtract={()=> handleCount('subtract', ICON_TYPE_PASSENGER_ADULT)} onAdd={() => handleCount('add', ICON_TYPE_PASSENGER_ADULT)} icon={ICON_TYPE_PASSENGER_ADULT} passengerType={`${adult_count} Adult`} passengerAgeDescription={"(>12 years)"} />
                <PassengerCounter onSubtract={()=> handleCount('subtract', ICON_TYPE_PASSENGER_CHILD)} onAdd={() => handleCount('add', ICON_TYPE_PASSENGER_CHILD)} icon={ICON_TYPE_PASSENGER_CHILD} passengerType={`${child_count} Child`} passengerAgeDescription={"(2-12 years)"} />
                <PassengerCounter onSubtract={()=> handleCount('subtract', ICON_TYPE_PASSENGER_INFANT)} onAdd={() => handleCount('add', ICON_TYPE_PASSENGER_INFANT)} icon={ICON_TYPE_PASSENGER_INFANT} passengerType={`${infant_count} Infant`} passengerAgeDescription={"(<2 years)"} />
            </WView>
            <WView padding={Utils.scaleSize(10)}>
            <FullButton loading={false} label={"Continue"} onPress={onContinue} />
            </WView>
        </WView>
    )
}

export default memo(Passengers)