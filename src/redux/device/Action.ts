import Utils from "../../common/util/Utils";
import { DEVICE_CONSTANTS_KEY, DEVICE_CONSTANTS_IS_LOGGED_IN, DEVICE_CONSTANTS_ROOT, DEVICE_CONSTANTS_UPDATE, DEVICE_CONSTANTS_RESET, DEVICE_CONSTANTS_IS_ON_BOARD, DEVICE_CONSTANTS_LOADING } from "../Types";
import { DispatchCB } from "../Store";

/** Map state to props */
export const getDeviceStateToProps = (state: any) => {
    const { device_constants } = state;
    const device_constants_key = device_constants && device_constants[DEVICE_CONSTANTS_KEY] ? device_constants[DEVICE_CONSTANTS_KEY] : {};

    const is_logged_in = device_constants_key && device_constants_key[DEVICE_CONSTANTS_IS_LOGGED_IN] ? device_constants_key[DEVICE_CONSTANTS_IS_LOGGED_IN] : false;
    const is_on_board = device_constants_key && device_constants_key[DEVICE_CONSTANTS_IS_ON_BOARD] ? device_constants_key[DEVICE_CONSTANTS_IS_ON_BOARD] : false;
    const is_loading = device_constants_key && device_constants_key[DEVICE_CONSTANTS_LOADING] ? device_constants_key[DEVICE_CONSTANTS_LOADING] : false;


    return ({
        is_logged_in,
        is_on_board,
        is_loading
    })
}


/** Manage Device UI Constraints */
export const updateDeviceUIConstraints = (obj: any): any => {
    return (dispatch: DispatchCB, getState: any) => {
        try {
            const formData = getState()[DEVICE_CONSTANTS_ROOT][DEVICE_CONSTANTS_KEY];
            const data = Object.assign(formData, obj);

            dispatch(updateDeviceState(data));
        } catch (error) {
            Utils.log("Update Device UI Constraints ===> error ", error);
        }
    }
}

/** Update device data state */
const updateDeviceState = (obj: any): any => {
    return (dispatch: DispatchCB, getState: any) => {
        try {
            const formData = getState()[DEVICE_CONSTANTS_ROOT][DEVICE_CONSTANTS_KEY];

            dispatch({
                type: DEVICE_CONSTANTS_UPDATE,
                payload: Object.assign(formData, obj)
            })
        } catch (error) {
            Utils.log("Update Device Data State ===> error ", error);
        }
    }
}

/** Reset device data state */
export const resetDeviceState = () => {
    return (dispatch: DispatchCB) => {
        try {
            dispatch({
                type: DEVICE_CONSTANTS_RESET,
                payload: {}
            })
        } catch (error) {
            Utils.log("Reset Login State ===> error ", error);
        }
    }
}



