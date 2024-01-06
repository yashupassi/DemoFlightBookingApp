import { DEVICE_CONSTANTS_KEY, DEVICE_CONSTANTS_IS_LOGGED_IN, DEVICE_CONSTANTS_UPDATE, DEVICE_CONSTANTS_RESET, LOG_OUT,  DEVICE_CONSTANTS_REQUEST_STATUS, STATUS, MESSAGE, DEVICE_CONSTANTS_IS_ON_BOARD, DEVICE_CONSTANTS_LOADING, DEVICE_CONSTANTS_LANGUAGE, DEFAULT_LANGUAGE } from "../Types";

const INIT_STATE = {
    [DEVICE_CONSTANTS_KEY]: {
        [DEVICE_CONSTANTS_IS_LOGGED_IN]: false,
        [DEVICE_CONSTANTS_IS_ON_BOARD]: false,
        [DEVICE_CONSTANTS_LOADING]:false,
        [DEVICE_CONSTANTS_LANGUAGE]:DEFAULT_LANGUAGE,
        [DEVICE_CONSTANTS_REQUEST_STATUS]: {
            [STATUS]: undefined,
            [MESSAGE]: undefined
        },
    }
}

export default (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case DEVICE_CONSTANTS_UPDATE:
            return { ...state, [DEVICE_CONSTANTS_KEY]: action.payload };
        case DEVICE_CONSTANTS_RESET:
        case LOG_OUT:
            return {
                ...state,
                ...{
                    [DEVICE_CONSTANTS_KEY]: {
                        [DEVICE_CONSTANTS_IS_LOGGED_IN]: false,
                        [DEVICE_CONSTANTS_IS_ON_BOARD]: false,
                        [DEVICE_CONSTANTS_LOADING]:false,
                        [DEVICE_CONSTANTS_LANGUAGE]:DEFAULT_LANGUAGE,
                        [DEVICE_CONSTANTS_REQUEST_STATUS]: {
                            [STATUS]: undefined,
                            [MESSAGE]: undefined
                        },
                    }
                }
            }
        default:
            return state;
    }
};