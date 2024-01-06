import React, { memo, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  DEVICE_CONSTANTS_LOADING,
} from '../redux/Types';
import {
  getDeviceStateToProps,
  updateDeviceUIConstraints,
} from '../redux/device/Action';
import RNPostLoginRoutes from '../PostLoginRoutes';

/**
 * Functional component representing the main scene of the application.
 * This component serves as the entry point and determines the appropriate routes based on the user's onboarding and login status.
 * @returns {JSX.Element} React element representing the MainScene component.
 */
function MainScene() {
  // Redux dispatch function
  const dispatch = useDispatch();
  // Redux state for device-related data
  const { is_logged_in, is_on_board, is_loading, ...rest } = useSelector(
    getDeviceStateToProps,
    shallowEqual,
  );

  // Effect hook to initialize the application
  useEffect(() => {
    dispatch(
      updateDeviceUIConstraints({
        [DEVICE_CONSTANTS_LOADING]: true,
      }),
    );
  }, []);

 
  return <RNPostLoginRoutes {...rest} />
}

export default memo(MainScene);
