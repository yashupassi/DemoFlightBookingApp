import Utils from "../../common/util/Utils";
import { FLIGHT_RESET, FLIGHT_UPDATE, FLIGHT_ROOT, FLIGHT_KEY, FLIGHT_DATA, FLIGHT_REQUEST_LOADING, FLIGHT_SEARCHED_DATA, FLIGHT_FROM, FLIGHT_TO, FLIGHT_DATE, FLIGHT_CLASS, ECONOMY_CLASS, FLIGHT_ADULTS, FLIGHT_CHILD, FLIGHT_INFANT, FLIGHT_NON_STOP_FIRST } from "../Types";
import { DispatchCB } from "../Store";
import { GetList } from "../../apis/APIs";

/** Map state to props */
export const getFlightStateToProps = (state: any) => {
    const { flight } = state;
    const flight_key = flight && flight[FLIGHT_KEY] ? flight[FLIGHT_KEY] : {};

    const flight_data = flight_key && flight_key[FLIGHT_DATA] ? flight_key[FLIGHT_DATA] : [];
    const loading = flight_key && flight_key[FLIGHT_REQUEST_LOADING] ? flight_key[FLIGHT_REQUEST_LOADING] : false;

    const departure = flight_key && flight_key[FLIGHT_FROM] ? flight_key[FLIGHT_FROM] : '';
    const arrival = flight_key && flight_key[FLIGHT_TO] ? flight_key[FLIGHT_TO] : '';
    const flight_date = flight_key && flight_key[FLIGHT_DATE] ? flight_key[FLIGHT_DATE] : new Date();
    const flight_class = flight_key && flight_key[FLIGHT_CLASS] ? flight_key[FLIGHT_CLASS] : ECONOMY_CLASS;
    const adult_count = flight_key && flight_key[FLIGHT_ADULTS] ? flight_key[FLIGHT_ADULTS] : 1;
    const child_count = flight_key && flight_key[FLIGHT_CHILD] ? flight_key[FLIGHT_CHILD] : 0;
    const infant_count = flight_key && flight_key[FLIGHT_INFANT] ? flight_key[FLIGHT_INFANT] : 0;
    const is_non_stop_flight = flight_key && flight_key[FLIGHT_NON_STOP_FIRST] ? flight_key[FLIGHT_NON_STOP_FIRST] : false;


    return ({
        flight_data,
        loading,

        departure,
        arrival,
        flight_date,
        flight_class,
        adult_count,
        child_count, 
        infant_count,
        is_non_stop_flight
    })
}


/** Manage Flight UI Constraints */
export const updateFlightUIConstraints = (obj: any): any => {
    return (dispatch: DispatchCB, getState: any) => {
        try {
            const formData = getState()[FLIGHT_ROOT][FLIGHT_KEY];
            const data = Object.assign(formData, obj);

            dispatch(updateFlightState(data));
        } catch (error) {
            Utils.log("Update Flight UI Constraints ===> error ", error);
        }
    }
}

/** Update Flight data state */
const updateFlightState = (obj: any): any => {
    return (dispatch: DispatchCB, getState: any) => {
        try {
            const formData = getState()[FLIGHT_ROOT][FLIGHT_KEY];

            dispatch({
                type: FLIGHT_UPDATE,
                payload: Object.assign(formData, obj)
            })
        } catch (error) {
            Utils.log("Update Flight Data State ===> error ", error);
        }
    }
}

/** Reset Flight data state */
export const resetFlightState = () => {
    return (dispatch: DispatchCB) => {
        try {
            dispatch({
                type: FLIGHT_RESET,
                payload: {}
            })
        } catch (error) {
            Utils.log("Reset Flight State ===> error ", error);
        }
    }
}

export const RequestList = () => {
    return async (dispatch: DispatchCB, getState: any) => {
        try {
            dispatch(updateFlightUIConstraints({
                [FLIGHT_REQUEST_LOADING]: true,
            }))
            try {
                const res = await GetList();
                const results = res?.data?.result || []
                if (res.status === 'error') {
                    dispatch(updateFlightUIConstraints({
                        [FLIGHT_REQUEST_LOADING]: false,
                    }))
                }
                if (results?.length) {
                    dispatch(updateFlightUIConstraints({
                        [FLIGHT_REQUEST_LOADING]: false,
                        [FLIGHT_DATA]: results
                    }))
                }
                else {
                    const errors = res && res.error_stack ? res.error_stack : {}
                    const message = errors && errors.message ? errors.message : "Something went wrong."
                    dispatch(updateFlightUIConstraints({
                        [FLIGHT_REQUEST_LOADING]: false,
                    }))
                }
            }

            catch (error: any) {
                const message = error && error.message ? error.message : "Something went wrong.";
                dispatch(updateFlightUIConstraints({
                    [FLIGHT_REQUEST_LOADING]: false,
                }))
            }
        }
        catch (error: any) {
            Utils.log("error == >", error)
            dispatch(updateFlightUIConstraints({
                [FLIGHT_REQUEST_LOADING]: false,
            }))
        }
    }
}



