import EventEmitter from 'eventemitter3';
import React, { memo, useEffect, useState } from 'react';
import {
    Dimensions,
    Platform,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import { MainScene } from './scene';
import Colors from './common/styles/Colors';
import { ConnectionInfo } from './common/base_components';
import { useDispatch } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { RequestList } from './redux/flights/Action';

interface Props {
    booted: boolean;
}

const PORTRAIT = 0;
const LANDSCAPE = 1;

const Rootrn: React.FC<Props> = (props) => {
    const [orientation, setOrientation] = useState<number | null>(null);
    const [viewableScreenWidth, setViewableScreenWidth] = useState<number | null>(
        null
    );
    const [
        viewableScreenHeightWithHeader,
        setViewableScreenHeightWithHeader,
    ] = useState<number | null>(null);
    const [viewableScreenHeight, setViewableScreenHeight] = useState<number | null>(
        null
    );
    const [screenWidth, setScreenWidth] = useState<number | null>(null);
    const [screenHeight, setScreenHeight] = useState<number | null>(null);
    const [scale, setScale] = useState<number | null>(null);
    const [fontScale, setFontScale] = useState<number | null>(null);
    const [isOnline, setIsOnline] = useState<boolean | null>(null);

    const _orientationEventEmitter = new EventEmitter();
    const aorEventEmitter = new EventEmitter();

    const dispatch = useDispatch()

    useEffect(() => {
        const getInitialSizeData = () => {
            const width = Math.round(Dimensions.get('window').width);
            const height = Math.round(Dimensions.get('window').height);
            const scale = Dimensions.get('window').scale;
            const fontScale = Dimensions.get('window').fontScale;

            setScreenWidth(width);
            setScreenHeight(height);
            setOrientation(width > height ? LANDSCAPE : PORTRAIT);
            setScale(scale);
            setFontScale(fontScale);
        };

        getInitialSizeData();

        closeSplash();
        dispatch(RequestList())

    }, []);


    const closeSplash = () => {
        if (Platform.OS === 'android') {
            SplashScreen.hide();
        }
    };


    const _onScreenUpdate = (event: any) => {
        const width = Math.round(event.nativeEvent.layout.width);
        const height = Math.round(event.nativeEvent.layout.height);
        const orientation = width > height ? 'LANDSCAPE' : 'PORTRAIT';
        if (orientation !== orientation) {
            // emit orientation change event
            _orientationEventEmitter.emit('orientation');
        }
        if (viewableScreenWidth !== width) {
            setViewableScreenWidth(width);
            setViewableScreenHeightWithHeader(height - headerHeight());
            setViewableScreenHeight(height);
            setOrientation(orientation);
        }
    };

    const headerHeight = () => {
        return Platform.OS === 'ios' ? 64 : 56;
    };

    const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
        return (
            <>
                <SafeAreaView style={{ backgroundColor: Colors.white }}>
                </SafeAreaView>
                <SafeAreaView
                    onLayout={(event) => _onScreenUpdate(event)}
                    style={{
                        flex: 1,
                        backgroundColor: Colors.white,
                    }}>
                    {children}
                </SafeAreaView>
            </>
        );
    };

    const _handleStatus = async () => {
        try {
            // Handle status
        } catch (error) {
            // Handle error
        }
    };

    return (
        <Wrapper>
            <StatusBar
                hidden={false}
                barStyle={'dark-content'}
                backgroundColor={Colors.white}
            />
            {React.createElement(MainScene, {
                screenProps: {
                    booted: props.booted,
                    isPortrait: viewableScreenHeight > viewableScreenWidth,
                    screenWidth: viewableScreenWidth,
                    screenHeight: viewableScreenHeight,
                    screenHeightWithHeader: viewableScreenHeightWithHeader,
                    screenOrientation: orientation,
                    scale: scale,
                    fontScale: fontScale,
                    eventEmitter: aorEventEmitter,
                    isOnline: isOnline,
                },
            })}
            <ConnectionInfo
                onConnectionStatusChange={_handleStatus.bind(this)}
            />
        </Wrapper>
    );
};

export default memo(Rootrn);
