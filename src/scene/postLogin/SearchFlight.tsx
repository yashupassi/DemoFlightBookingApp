import React, { memo, useMemo } from 'react'
import { WText, WView } from '../../common/ui'
import Colors from '../../common/styles/Colors'
import { Utils } from '../../common/util'
import { Platform } from 'react-native'
import { SearchFlightForm } from '../../components'

function SearchFlight() {
    const isAndroid: boolean = Platform.OS === 'android'
    
    const renderTopContent = useMemo(() => {
        return (
            <WView padding={Utils.scaleSize(20)} dial={1} flex={0.3}>
                <WText fontWeight="700" fontSize={Utils.scaleSize(isAndroid ? 28 : 26)} color={Colors.white}>{"Book your"}</WText>
                <WText fontWeight="700" fontSize={Utils.scaleSize(isAndroid ? 28 : 26)} color={Colors.white}>{"Flight"}</WText>
            </WView>
        )
    }, [])

    return (
        <WView backgroundColor={Colors.theme_color} flex>
            {renderTopContent}
            <SearchFlightForm />
        </WView>
    )
}

export default memo(SearchFlight)