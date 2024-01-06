import AsyncStorage from '@react-native-async-storage/async-storage';
import Utils from '../common/util/Utils';
import { STATUS, SUCCESS, ERROR, RESPONSE, FLIGHTBOOK_LOGIN_DATA, FLIGHTBOOK_USER_DATA,  } from '../redux/Types';

export default class FoodZoneStorage {

    /** Store FlightBook Login data */
    static storeFlightBookLoginData = async (data:any) => {
        try {
            await AsyncStorage.setItem(FLIGHTBOOK_LOGIN_DATA, JSON.stringify(data));
            return new Promise(resolve => resolve({
                [STATUS]: SUCCESS
            }));
        } catch (e) {
            // error
            Utils.log("Store FlightBook Login Data ===> error ", e);

            return new Promise((resolve, rejects) => rejects({
                [STATUS]: ERROR
            }));
        }
    }

    /** Get FlightBook Login data */
    static getFlightBookLoginData = async (key:any) => {
        try {
            const data = await AsyncStorage.getItem(FLIGHTBOOK_LOGIN_DATA);
            const res = data && data.length ? JSON.parse(data) : {};

            return new Promise(resolve => resolve({
                [STATUS]: SUCCESS,
                [RESPONSE]: res && key && res[key] ? res[key] : res
            }));
        } catch (e) {
            // error
            Utils.log("Get FlightBook Login Data ===> error ", e);

            return new Promise((resolve, rejects) => rejects({
                [STATUS]: ERROR,
                [RESPONSE]: e
            }));
        }
    }

    /** Clear FlightBook Login data */
    static clearFlightBookLoginData = async () => {
        try {
            await AsyncStorage.removeItem(FLIGHTBOOK_LOGIN_DATA);
            return new Promise(resolve => resolve({
                [STATUS]: SUCCESS
            }));
        } catch (e) {
            // error
            Utils.log("Remove FlightBook Login Data ===> error ", e);

            return new Promise((resolve, rejects) => rejects({
                [STATUS]: ERROR
            }));
        }
    }


    /** Store FlightBook User data */
    static storeFlightBookUserData = async (data:any) => {
        try {
            await AsyncStorage.setItem(FLIGHTBOOK_USER_DATA, JSON.stringify(data));
            return new Promise(resolve => resolve({
                [STATUS]: SUCCESS
            }));
        } catch (e) {
            // error
            Utils.log("Store FlightBook User Data ===> error ", e);

            return new Promise((resolve, rejects) => rejects({
                [STATUS]: ERROR
            }));
        }
    }

    /** Get FlightBook User data */
    static getFlightBookUserData = async (key:any) => {
        try {
            const data = await AsyncStorage.getItem(FLIGHTBOOK_USER_DATA);
            const res = data && data.length ? JSON.parse(data) : {};

            return new Promise(resolve => resolve({
                [STATUS]: SUCCESS,
                [RESPONSE]: res && key && res[key] ? res[key] : res
            }));
        } catch (e) {
            // error
            Utils.log("Get FlightBook User Data ===> error ", e);

            return new Promise((resolve, rejects) => rejects({
                [STATUS]: ERROR,
                [RESPONSE]: e
            }));
        }
    }

    /** Clear FlightBook User data */
    static clearFlightBookUserData = async () => {
        try {
            await AsyncStorage.removeItem(FLIGHTBOOK_USER_DATA);
            return new Promise(resolve => resolve({
                [STATUS]: SUCCESS
            }));
        } catch (e) {
            // error
            Utils.log("Remove FlightBook User Data ===> error ", e);

            return new Promise((resolve, rejects) => rejects({
                [STATUS]: ERROR
            }));
        }
    }


}