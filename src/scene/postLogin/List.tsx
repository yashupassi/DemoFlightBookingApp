import React, { memo, useEffect, useMemo, useState } from 'react'
import { WRow, WText, WTouchable, WView } from '../../common/ui'
import Colors from '../../common/styles/Colors'
import { Header, Loader } from '../../common/base_components'
import { Utils } from '../../common/util'
import { FlatList } from 'react-native'
import { FilterModal, FlightListCard, SortModal } from '../../components'
import { useNavigation } from '@react-navigation/native'
import { shallowEqual, useSelector } from 'react-redux'
import { getFlightStateToProps } from '../../redux/flights/Action'
import moment from 'moment'
import FilterIcon from '../../../assets/img/filter.svg'
import SortIcon from '../../../assets/img/sort.svg'
import { HIGHEST_PRICE, LOWEST_PRICE } from '../../redux/Types'

function List() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [sortType, setSortType] = useState('')
    const [airlines, setAirlines] = useState([])
    const [isSortModalVisible, setIsSortModalVisible] = useState(false)
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false)
    const { greenContainer, listContainer, listFilterButtons } = getStyles()
    const navigation: any = useNavigation()

    const { flight_data } = useSelector(getFlightStateToProps, shallowEqual);

    useEffect(() => {
        if (flight_data?.length) {
            setData(flight_data)
            initAirlines()
        }
        setLoading(false)
    }, [])

    const initAirlines = () => {
        const airlineNames:any = [];
        for (const flight of flight_data) {
            for (const airline of flight?.displayData?.airlines) {
                if (!airlineNames.includes(airline?.airlineName)) {
                    airlineNames.push(airline?.airlineName);
                }
            }
        }
        setAirlines(airlineNames) 
    }

    const toggleSortModal = () => {
        setIsSortModalVisible(!isSortModalVisible)
    }
    const toggleFilterModal = () => {
        setIsFilterModalVisible(!isFilterModalVisible)
    }

    const onClearFilter = ()=>{
        if(sortType){
            handleSort(sortType === LOWEST_PRICE, true, flight_data)
        }
        else{
            setData(flight_data)
        }
        toggleFilterModal()
    }

    const handleFilter = (selecteAirline:any)=>{
        const flightData = flight_data
        if(selecteAirline?.length > 0){
            const filteredFlights = flightData.filter((flight:any) => {
                const flightAirlines = flight?.displayData?.airlines?.map((airline:any) => airline?.airlineName);
                return flightAirlines.filter((airline:any) => selecteAirline.includes(airline)).length > 0;
            });
            handleSort(sortType === LOWEST_PRICE, true, filteredFlights)
        }
        else{
            setData(flightData)
        }
        toggleFilterModal()
    }

    const handleSort = (isLowPriceSort: boolean,  isFromFilter:boolean = false, flightData:any = data) => {
        let sortedList = []
        if (isLowPriceSort) {
            sortedList = [...flightData].sort((a: any, b: any) => a?.fare - b?.fare);
        }
        else {
            sortedList = [...flightData].sort((a: any, b: any) => b?.fare - a?.fare);
        }
        setSortType(isLowPriceSort ? LOWEST_PRICE : HIGHEST_PRICE)
        setData(sortedList)
        if(!isFromFilter) toggleSortModal()
        
    }

    const _renderItem = ({ item, index }: any) => {
        const departureCity = item?.displayData?.source?.airport?.cityName
        const departureCityCode = item?.displayData?.source?.airport?.cityCode
        const arrivalCity = item?.displayData?.destination?.airport?.cityName
        const arrivalCityCode = item?.displayData?.destination?.airport?.cityCode
        const airline = item?.displayData?.airlines?.[0]?.airlineName
        const stop = item?.displayData?.stopInfo
        const duration = item?.displayData?.totalDuration
        const fare = item?.fare
        const departureTime = moment(item?.displayData?.source?.depTime).format('hh:mm A')
        const arrivalTime = moment(item?.displayData?.destination?.arrTime).format('hh:mm A')
        return (
            <FlightListCard
                fromCity={departureCity}
                fromCityCode={`(${departureCityCode})`}
                airlines={airline}
                toCity={arrivalCity}
                toCityCode={`(${arrivalCityCode})`}
                departureTime={departureTime}
                duration={duration}
                stops={stop}
                arrivalTime={arrivalTime}
                ticketFair={fare}
            />
        )
    }

    const renderHeader = useMemo(() => {
        return (
            <Header leftPress={() => navigation.pop()} label='Flights' />
        )
    }, [])

    const renderEmptyComponent = useMemo(() => {
        return (
            <WView dial={5} flex>
                <WText fontWeight="700" fontSize={Utils.scaleSize(24)} color={Colors.white}>{"No Flight Available"}</WText>
                <WText margin={[Utils.scaleSize(10), 0]} fontSize={Utils.scaleSize(13)} color={Colors.white}>{"Please search with different location"}</WText>
            </WView>
        )
    }, [])

    const renderListHeaderComponent = useMemo(() => {
        return (
            <WRow margin={[Utils.scaleSize(15), 0, Utils.scaleSize(5), 0]} spaceAround dial={5}>
                <WTouchable onPress={toggleSortModal} dial={5} style={listFilterButtons}>
                    <WRow dial={5}>
                        <SortIcon height={Utils.scaleSize(15)} width={Utils.scaleSize(15)} />
                        <WText margin={[0, Utils.scaleSize(10)]} fontSize={Utils.scaleSize(12)} color={Colors.white}>{"Sort"}</WText>
                    </WRow>
                </WTouchable>

                <WTouchable onPress={toggleFilterModal} dial={5} style={listFilterButtons}>
                    <WRow dial={5}>
                        <FilterIcon height={Utils.scaleSize(15)} width={Utils.scaleSize(15)} />
                        <WText margin={[0, Utils.scaleSize(10)]} fontSize={Utils.scaleSize(12)} color={Colors.white}>{"Filter"}</WText>
                    </WRow>
                </WTouchable>
            </WRow>
        )
    }, [data])

    const renderList = useMemo(() => {
        return (
            <WView flex backgroundColor={Colors.theme_color} style={greenContainer}>
                {renderListHeaderComponent}
                <FlatList
                    contentContainerStyle={listContainer}
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={_renderItem}
                    keyExtractor={(item, index) => `flights_list_${item?.id}`}
                    ListEmptyComponent={renderEmptyComponent}
                />
            </WView>
        )
    }, [data])

    return (
        <WView backgroundColor={Colors.white} flex>
            {renderHeader}
            {loading ? <Loader /> : renderList}
            <SortModal
                onApplySort={handleSort}
                onCloseModal={toggleSortModal}
                isModalVisible={isSortModalVisible} />
            <FilterModal
                airlinesData={airlines}
                onApplyFilter={handleFilter}
                onCloseModal={toggleFilterModal}
                isModalVisible={isFilterModalVisible}
                onClearFilter={onClearFilter}
            />
        </WView>
    )
}

const getStyles = () => {
    return ({
        greenContainer: {
            borderTopRightRadius: Utils.scaleSize(15),
            borderTopLeftRadius: Utils.scaleSize(15)
        },
        listContainer: {
            flexGrow: 1,
            paddingHorizontal: Utils.scaleSize(10),
            paddingVertical: Utils.scaleSize(10)
        },
        listFilterButtons: {
            backgroundColor: Colors.theme_color_opacity,
            borderRadius: Utils.scaleSize(8),
            width: '40%',
            height: Utils.scaleSize(30)
        }
    })
}

export default memo(List)