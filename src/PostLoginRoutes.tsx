import React, { PureComponent } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LIST_SCREEN, PASSENGERS_SCREEN, SEARCH_FLIGHT_SCREEN } from './redux/Types';
import NavigationService from './NavigationService';
import { List, Passengers, SearchFlight } from './scene/postLogin';
import { keyboardAwareFunc } from './common/base_components';

const Stack = createNativeStackNavigator();

class RNPostLoginRoutes extends PureComponent {
    render() {
        return (
            <NavigationContainer ref={(ref: any) => NavigationService.setNavigationRef(ref)}>
                <Stack.Navigator initialRouteName={SEARCH_FLIGHT_SCREEN}>
                <Stack.Screen name={SEARCH_FLIGHT_SCREEN} component={keyboardAwareFunc(SearchFlight)} options={{ headerShown: false }} />
                <Stack.Screen name={LIST_SCREEN} component={List} options={{ headerShown: false }} />
                <Stack.Screen name={PASSENGERS_SCREEN} component={Passengers} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default RNPostLoginRoutes;
