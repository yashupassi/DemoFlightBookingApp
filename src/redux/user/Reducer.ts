import { LOG_OUT, USER_DATA, USER_KEY, USER_LOCATION, USER_RESET, USER_UPDATE } from "../Types";

const INIT_STATE = {
    [USER_KEY]: {
        [USER_DATA]: undefined,
        [USER_LOCATION]:null
    }
}

export default (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case USER_UPDATE:
            return { ...state, [USER_KEY]: action.payload };
        case USER_RESET:
        case LOG_OUT:
            return {
                ...state,
                ...{
                    [USER_KEY]: {
                        [USER_DATA]: undefined,
                        [USER_LOCATION]:null
                    }
                }
            }
        default:
            return state;
    }
};