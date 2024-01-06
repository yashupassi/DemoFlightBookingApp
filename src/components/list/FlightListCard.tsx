import React, { memo } from 'react'
import { WRow, WText, WView } from '../../common/ui'
import Colors from '../../common/styles/Colors'
import { Utils } from '../../common/util'
import { Platform } from 'react-native'
import { RUPPEE_SYMBOL } from '../../redux/Types'

function FlightListCard(props: any) {
    const { fromCity, fromCityCode, airlines, toCity, toCityCode, departureTime, duration, stops, arrivalTime, ticketFair }: any = props
    const isAndroid: boolean = Platform.OS === 'android'

    const { departureDot, horizontalLine, arrivalDot } = getStyles()

    return (
        <WView padding={Utils.scaleSize(15)} margin={[Utils.scaleSize(5), 0]} backgroundColor={Colors.white} style={{ borderRadius: Utils.scaleSize(10) }} >
            <WRow dial={5} spaceBetween>
                <WView dial={5}>
                    <WText fontWeight="600" fontSize={Utils.scaleSize(isAndroid ? 14 : 12)} color={Colors.theme_color}>{fromCity}</WText>
                    <WText fontSize={Utils.scaleSize(isAndroid ? 11 : 10)} color={Colors.theme_color}>{fromCityCode}</WText>
                </WView>
                <WText fontSize={Utils.scaleSize(isAndroid ? 14 : 12)} color={Colors.orange}>{airlines}</WText>
                <WView dial={5}>
                    <WText fontWeight="600" fontSize={Utils.scaleSize(isAndroid ? 14 : 12)} color={Colors.theme_color}>{toCity}</WText>
                    <WText fontSize={Utils.scaleSize(isAndroid ? 11 : 10)} color={Colors.theme_color}>{toCityCode}</WText>
                </WView>
            </WRow>

            <WRow margin={[Utils.scaleSize(10), 0, 0, 0]} dial={5} spaceBetween>
                <WView dial={5}>
                    <WText fontWeight="500" fontSize={Utils.scaleSize(isAndroid ? 14 : 12)} color={Colors.dark_gray}>{"Depart"}</WText>
                    <WText margin={[Utils.scaleSize(3), 0]} fontWeight="500" fontSize={Utils.scaleSize(isAndroid ? 11 : 10)} color={Colors.text_color_dark}>{departureTime}</WText>
                </WView>
                <WView dial={5}>
                    <WText fontWeight="500" fontSize={Utils.scaleSize(isAndroid ? 12 : 10)} color={Colors.dark_gray}>{duration}</WText>
                    <WText margin={[Utils.scaleSize(3), 0]} fontWeight="500" fontSize={Utils.scaleSize(isAndroid ? 12 : 10)} color={Colors.dark_gray}>{stops}</WText>
                </WView>
                <WView dial={5}>
                    <WText fontWeight="500" fontSize={Utils.scaleSize(isAndroid ? 14 : 12)} color={Colors.dark_gray}>{"Arr"}</WText>
                    <WText margin={[Utils.scaleSize(3), 0]} fontWeight="500" fontSize={Utils.scaleSize(isAndroid ? 11 : 10)} color={Colors.text_color_dark}>{arrivalTime}</WText>
                </WView>
            </WRow>
            <WRow margin={[Utils.scaleSize(5), 0, Utils.scaleSize(10), 0]} spaceBetween dial={5}>
                <WView backgroundColor={Colors.gray} style={departureDot} />
                <WView backgroundColor={Colors.gray} style={horizontalLine} />
                <WView backgroundColor={Colors.white} style={arrivalDot} />
            </WRow>

            <WRow spaceBetween dial={4}>
                <WText fontWeight="500" fontSize={Utils.scaleSize(isAndroid ? 14 : 12)} color={Colors.orange}>{`${RUPPEE_SYMBOL} ${ticketFair}`}</WText>
                <WText fontWeight="600" fontSize={Utils.scaleSize(isAndroid ? 11 : 10)} color={Colors.orange}>{"Book Ticket"}</WText>
            </WRow>
        </WView>
    )
}

const getStyles = () => {
    return ({
        departureDot: {
            height: Utils.scaleSize(12),
            width: Utils.scaleSize(12),
            borderRadius: Utils.scaleSize(50)
        },
        horizontalLine: {
            height: Utils.scaleSize(2),
            width: '90%'
        },
        arrivalDot: {
            height: Utils.scaleSize(12),
            width: Utils.scaleSize(12),
            borderRadius: Utils.scaleSize(50),
            borderColor: Colors.gray,
            borderWidth: Utils.scaleSize(2)
        }
    })
}

export default memo(FlightListCard)