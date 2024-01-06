import { LOG_OUT, FLIGHT_KEY, FLIGHT_DATA, FLIGHT_REQUEST_LOADING, FLIGHT_UPDATE, FLIGHT_RESET, FLIGHT_SEARCHED_DATA, FLIGHT_FROM, FLIGHT_TO, FLIGHT_DATE, FLIGHT_ADULTS, FLIGHT_CHILD, FLIGHT_INFANT, FLIGHT_CLASS, ECONOMY_CLASS, FLIGHT_NON_STOP_FIRST } from "../Types";

const INIT_STATE = {
    [FLIGHT_KEY]: {
        [FLIGHT_DATA]: undefined,
        [FLIGHT_REQUEST_LOADING]: false,
        [FLIGHT_FROM]: '',
        [FLIGHT_TO]: '',
        [FLIGHT_DATE]: new Date(),
        [FLIGHT_ADULTS]: 1,
        [FLIGHT_CHILD]: 0,
        [FLIGHT_INFANT]: 0,
        [FLIGHT_CLASS]: ECONOMY_CLASS,
        [FLIGHT_NON_STOP_FIRST]: false

    }
}

export default (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case FLIGHT_UPDATE:
            return { ...state, [FLIGHT_KEY]: action.payload };
        case FLIGHT_RESET:
        case LOG_OUT:
            return {
                ...state,
                ...{
                    [FLIGHT_KEY]: {
                        [FLIGHT_DATA]: undefined,
                        [FLIGHT_REQUEST_LOADING]: false,
                        [FLIGHT_FROM]: '',
                        [FLIGHT_TO]: '',
                        [FLIGHT_DATE]: new Date(),
                        [FLIGHT_ADULTS]: 1,
                        [FLIGHT_CHILD]: 0,
                        [FLIGHT_INFANT]: 0,
                        [FLIGHT_CLASS]: ECONOMY_CLASS,
                        [FLIGHT_NON_STOP_FIRST]: false
                    }
                }
            }
        default:
            return state;
    }
};