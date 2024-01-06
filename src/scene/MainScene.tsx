import React, { memo, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { FoodZoneStorage } from '../apis';
import {
  DEVICE_CONSTANTS_IS_LOGGED_IN,
  DEVICE_CONSTANTS_IS_ON_BOARD,
  DEVICE_CONSTANTS_LOADING,
  RESPONSE,
  STATUS,
  SUCCESS,
} from '../redux/Types';
import {
  getDeviceStateToProps,
  updateDeviceUIConstraints,
} from '../redux/device/Action';
import RNPostLoginRoutes from '../PostLoginRoutes';
import { Loader } from '../common/base_components';

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
    init();
  }, []);

  /**
   * Function to initialize the application.
   * Retrieves onboarding and login data from storage and updates the Redux state accordingly.
   */
  const init = async () => {
    // Retrieve user login data
    const user_data_obj: any = await FoodZoneStorage.getFoodZoneLoginData(null);
    const user_data = user_data_obj && user_data_obj[STATUS] === SUCCESS ? user_data_obj[RESPONSE] : {};
    // const is_user_logged_in = user_data && user_data.token ? true : false;
    const is_user_logged_in = user_data === true ? true : false;


    // updateUserUIConstraints({
    //     [USER_DATA]: is_user_logged_in ? user_data : {}
    // });
    // Update Redux state with login and onboarding information
    dispatch(
      updateDeviceUIConstraints({
        [DEVICE_CONSTANTS_LOADING]: false,
        [DEVICE_CONSTANTS_IS_LOGGED_IN]: is_user_logged_in,
        [DEVICE_CONSTANTS_IS_ON_BOARD]: is_on_board,
      }),
    );
  };

  /**
  * Loading component displayed while the application is initializing.
  * @returns {JSX.Element} Loading spinner component.
  */
 
  // If the application is still loading, display the Loading component
  // if (is_loading) return <Loader />;
  // If the user is logged in, display post-login routes
  // if (is_logged_in) return <RNPostLoginRoutes {...rest} />
  // Otherwise, display regular routes
  // return <RNRoutes {...rest} />;
  return <RNPostLoginRoutes {...rest} />
}

export default memo(MainScene);
