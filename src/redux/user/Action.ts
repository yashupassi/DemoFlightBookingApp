import { Utils } from "../../common/util";
import { USER_DATA, USER_KEY, USER_RESET, USER_ROOT, USER_UPDATE } from "../Types";
import { DispatchCB } from "../Store";
import { Alert } from 'react-native';

/** Map state to props */
export const getEditProfileStateToProps = (state: any) => {
    const { user } = state;
    const user_key = user && user[USER_KEY] ? user[USER_KEY] : {};

    const user_data = user_key && user_key[USER_DATA] ? user_key[USER_DATA] : undefined;
    const uid: string = user_data && user_data.id ? user_data.id : "";
    const name: string = user_data && user_data.name ? user_data.name : "";
    const bio: string = user_data && user_data.bio ? user_data.bio : "";
    const image: string = user_data && user_data.image ? user_data.image : "";
    const handleName: string = user_data && user_data.handleName ? user_data.handleName : "";


    return ({
        uid,
        name,
        bio,
        image,
        handleName
    })
}


/** Manage User UI Constraints */
export const updateUserUIConstraints = (obj: any): any => {
    return (dispatch: DispatchCB, getState: any) => {
        try {
            const formData = getState()[USER_ROOT][USER_KEY];
            const data = Object.assign(formData, obj);

            dispatch(updateUserState(data));
        } catch (error) {
            Utils.log("Update User UI Constraints ===> error ", error);
        }
    }
}

/** Update User data state */
const updateUserState = (obj: any): any => {
    return (dispatch: DispatchCB, getState: any) => {
        try {
            const formData = getState()[USER_ROOT][USER_KEY];

            dispatch({
                type: USER_UPDATE,
                payload: Object.assign(formData, obj)
            })
        } catch (error) {
            Utils.log("Update User Data State ===> error ", error);
        }
    }
}

/** Reset user data state */
export const resetUserState = () => {
    return (dispatch: DispatchCB) => {
        try {
            dispatch({
                type: USER_RESET,
                payload: {}
            })
        } catch (error) {
            Utils.log("Reset Login State ===> error ", error);
        }
    }
}
