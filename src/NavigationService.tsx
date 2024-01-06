// import * as React from 'react';

// export const navigationRef: any = React.createRef();

// export function navigate(name: string,  params: any) {
//   navigationRef.current?.navigate(name, params);
// }

import { NavigationContainerRef, RouteProp, StackActions } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

let navigationRef: NavigationContainerRef<any> | null = null;

function setNavigationRef(ref: NavigationContainerRef<any> | null) {
  navigationRef = ref;
}

function navigate(name: string, params?: object) {
  if (navigationRef) {
    navigationRef.navigate(name, params);
  }
}

function goBack() {
  if (navigationRef) {
    navigationRef.goBack();
  }
}

function popToTop() {
  if (navigationRef) {
    navigationRef.dispatch(StackActions.popToTop());
  }
}

function reset(routeName: string, params?: object) {
  if (navigationRef) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: routeName, params }],
      })
    );
  }
}

function getActiveRouteName(): string | undefined {
  if (navigationRef) {
    const route = navigationRef.getCurrentRoute();
    return route ? route.name : undefined;
  }
  return undefined;
}

function fullReset(routeName: string, params?: object) {
  if (navigationRef) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: routeName, params }],
      })
    );
  }
}

const NavigationService={
  setNavigationRef,
  goBack,
  navigate,
  popToTop,
  reset,
  getActiveRouteName,
  fullReset
}

export default NavigationService
