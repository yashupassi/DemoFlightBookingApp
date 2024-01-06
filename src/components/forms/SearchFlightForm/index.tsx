import React, { memo, useState } from "react";
import { Keyboard, Platform, Switch } from "react-native";
import { Helper } from "../../../apis";
import { Utils } from "../../../common/util";
import Colors from "../../../common/styles/Colors";
import { WRow, WText, WTouchable, WView } from "../../../common/ui";
import { CustomDatePicker, CustomDropdown, FullButton, Input } from "../../../common/base_components";
import { useNavigation } from "@react-navigation/native";
import { ECONOMY_CLASS, FLIGHT_CLASS, FLIGHT_CLASS_DATA, FLIGHT_DATE, FLIGHT_FROM, FLIGHT_NON_STOP_FIRST, FLIGHT_TO, LIST_SCREEN, PASSENGERS_SCREEN } from "../../../redux/Types";
import moment from "moment";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getFlightStateToProps, updateFlightUIConstraints } from "../../../redux/flights/Action";


function SearchFlightForm() {
    const isAndroid: boolean = Platform.OS === 'android'

    const [error, setError] = useState<any>([]);
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const { whiteContainer } = getStyles()
    const dispatch = useDispatch()
    const navigation: any = useNavigation()


    const { departure, arrival, flight_date, flight_class, adult_count, child_count, infant_count, is_non_stop_flight } = useSelector(getFlightStateToProps, shallowEqual);


    /** Check if a field has an error.
    * @param {string} key - Field key to check for an error.
    * @returns {Object} - Object indicating the error status and message.
    */
    const isError = (key: any) => {
        if (error && error.length) {
            return error.findIndex((ele: any) => ele.fieldName === key) > -1
                ? {
                    status: true,
                    message:
                        error[error.findIndex((ele: any) => ele.fieldName === key)]
                            .message,
                }
                : { status: false, message: '' };
        } else return { status: false, message: '' };
    };

    const onSubmit = () => {
        Keyboard.dismiss()
        const request_body = { departure, arrival };
        Helper.isValidForm(Object.keys(request_body), request_body)
            .then(async ({ status, response }: any) => {
                if (status) {
                    setError([]);
                    navigation.navigate(LIST_SCREEN)
                } else {
                    setError(response && response.length ? response : []);
                }
            })
            .catch((err: any) => Utils.log(err));
    }

    const onChangeDate = (event: any, selectedDate: any) => {
        onChangeValue(FLIGHT_DATE, selectedDate)
        if (Platform.OS === 'android') setShowDatePicker(false)
    };


    const onClickPassengers = () => {
        navigation.navigate(PASSENGERS_SCREEN)
    }

    const onChangeValue = (key: string, value: any) => {
        dispatch(updateFlightUIConstraints({
            [key]: value
        }))
    }

    return (
        <WView padding={Utils.scaleSize(20)} backgroundColor={Colors.white} flex style={whiteContainer}>
            <Input
                title={'From'}
                placeholder={'Delhi'}
                isError={isError('departure')}
                onChange={(value: string) => {
                    onChangeValue(FLIGHT_FROM, value)
                }}
                value={departure}
                autoCapitalize={"none"}
            />

            <Input
                title={'To'}
                placeholder={'Mumbai'}
                isError={isError('arrival')}
                onChange={(value: string) => {
                    onChangeValue(FLIGHT_TO, value)
                }}
                value={arrival}
                autoCapitalize={"none"}
            />

            <WTouchable onPress={onClickPassengers}>
                <Input
                    title={'Passengers'}
                    pointerEvents={'none'}
                    editable={false}
                    placeholder={'DD/MM/YYYY'}
                    value={`${adult_count} Adult, ${child_count} Child, ${infant_count} Infant`}
                />
            </WTouchable>

            <WTouchable onPress={() => { setShowDatePicker(true) }}>
                <Input
                    title={'Departure Date'}
                    pointerEvents={'none'}
                    editable={false}
                    placeholder={'DD/MM/YYYY'}

                    value={moment(flight_date).format("DD/MM/YYYY")}
                />
            </WTouchable>

            {showDatePicker && (
                <CustomDatePicker
                    mode={'date'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'inline'}
                    value={flight_date}
                    onChange={onChangeDate}
                    closeModal={() => setShowDatePicker(false)}
                    minDate={new Date()}
                />
            )}
            <CustomDropdown
                data={FLIGHT_CLASS_DATA}
                value={flight_class}
                onChange={(item:any)=> onChangeValue(FLIGHT_CLASS, item?.value)}
                title={"Class"}
                placeholder={"Select class"} />


            <WRow dial={4} margin={[Utils.scaleSize(20), 0]} spaceBetween>
                <WText color={Colors.dark_gray} fontSize={Utils.scaleSize(isAndroid ? 14 : 12)} >{"NonStop flights first"}</WText>
                <Switch
                    trackColor={{ false: Colors.gray, true: Colors.orange }}
                    thumbColor={Colors.white}
                    onValueChange={() => onChangeValue(FLIGHT_NON_STOP_FIRST, !is_non_stop_flight)}
                    value={is_non_stop_flight}
                />
            </WRow>

            <FullButton loading={false} label={"Submit"} onPress={onSubmit} />

        </WView>
    )
}

const getStyles = () => {
    return ({
        whiteContainer: {
            borderTopRightRadius: Utils.scaleSize(15),
            borderTopLeftRadius: Utils.scaleSize(15)
        }
    })
}

export default memo(SearchFlightForm)