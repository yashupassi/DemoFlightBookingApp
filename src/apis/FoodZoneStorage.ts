import AsyncStorage from '@react-native-async-storage/async-storage';
import Utils from '../common/util/Utils';
import { STATUS, SUCCESS, ERROR, RESPONSE, FOODZONE_LOGIN_DATA, FOODZONE_USER_DATA, FOODZONE_CART_DATA,  } from '../redux/Types';

export default class FoodZoneStorage {

    /** Store FoodZone Login data */
    static storeFoodZoneLoginData = async (data:any) => {
        try {
            await AsyncStorage.setItem(FOODZONE_LOGIN_DATA, JSON.stringify(data));
            return new Promise(resolve => resolve({
                [STATUS]: SUCCESS
            }));
        } catch (e) {
            // error
            Utils.log("Store FoodZone Login Data ===> error ", e);

            return new Promise((resolve, rejects) => rejects({
                [STATUS]: ERROR
            }));
        }
    }

    /** Get FoodZone Login data */
    static getFoodZoneLoginData = async (key:any) => {
        try {
            const data = await AsyncStorage.getItem(FOODZONE_LOGIN_DATA);
            const res = data && data.length ? JSON.parse(data) : {};

            return new Promise(resolve => resolve({
                [STATUS]: SUCCESS,
                [RESPONSE]: res && key && res[key] ? res[key] : res
            }));
        } catch (e) {
            // error
            Utils.log("Get FoodZone Login Data ===> error ", e);

            return new Promise((resolve, rejects) => rejects({
                [STATUS]: ERROR,
                [RESPONSE]: e
            }));
        }
    }

    /** Clear FoodZone Login data */
    static clearFoodZoneLoginData = async () => {
        try {
            await AsyncStorage.removeItem(FOODZONE_LOGIN_DATA);
            return new Promise(resolve => resolve({
                [STATUS]: SUCCESS
            }));
        } catch (e) {
            // error
            Utils.log("Remove FoodZone Login Data ===> error ", e);

            return new Promise((resolve, rejects) => rejects({
                [STATUS]: ERROR
            }));
        }
    }


    /** Store FoodZone User data */
    static storeFoodZoneUserData = async (data:any) => {
        try {
            await AsyncStorage.setItem(FOODZONE_USER_DATA, JSON.stringify(data));
            return new Promise(resolve => resolve({
                [STATUS]: SUCCESS
            }));
        } catch (e) {
            // error
            Utils.log("Store FoodZone User Data ===> error ", e);

            return new Promise((resolve, rejects) => rejects({
                [STATUS]: ERROR
            }));
        }
    }

    /** Get FoodZone User data */
    static getFoodZoneUserData = async (key:any) => {
        try {
            const data = await AsyncStorage.getItem(FOODZONE_USER_DATA);
            const res = data && data.length ? JSON.parse(data) : {};

            return new Promise(resolve => resolve({
                [STATUS]: SUCCESS,
                [RESPONSE]: res && key && res[key] ? res[key] : res
            }));
        } catch (e) {
            // error
            Utils.log("Get FoodZone User Data ===> error ", e);

            return new Promise((resolve, rejects) => rejects({
                [STATUS]: ERROR,
                [RESPONSE]: e
            }));
        }
    }

    /** Clear FoodZone User data */
    static clearFoodZoneUserData = async () => {
        try {
            await AsyncStorage.removeItem(FOODZONE_USER_DATA);
            return new Promise(resolve => resolve({
                [STATUS]: SUCCESS
            }));
        } catch (e) {
            // error
            Utils.log("Remove FoodZone User Data ===> error ", e);

            return new Promise((resolve, rejects) => rejects({
                [STATUS]: ERROR
            }));
        }
    }

    /** Store FoodZone Cart data */
    static storeFoodZoneCartData = async (data:any) => {
        try {
            await AsyncStorage.setItem(FOODZONE_CART_DATA, JSON.stringify(data));
            return new Promise(resolve => resolve({
                [STATUS]: SUCCESS
            }));
        } catch (e) {
            // error
            Utils.log("Store FoodZone Cart Data ===> error ", e);

            return new Promise((resolve, rejects) => rejects({
                [STATUS]: ERROR
            }));
        }
    }

    /** Get FoodZone Cart data */
    static getFoodZoneCartData = async (key:any) => {
        try {
            const data = await AsyncStorage.getItem(FOODZONE_CART_DATA);
            const res = data && data.length ? JSON.parse(data) : {};

            return new Promise(resolve => resolve({
                [STATUS]: SUCCESS,
                [RESPONSE]: res && key && res[key] ? res[key] : res
            }));
        } catch (e) {
            // error
            Utils.log("Get FoodZone Cart Data ===> error ", e);

            return new Promise((resolve, rejects) => rejects({
                [STATUS]: ERROR,
                [RESPONSE]: e
            }));
        }
    }

    /** Clear FoodZone Cart data */
    static clearFoodZoneCartData = async () => {
        try {
            await AsyncStorage.removeItem(FOODZONE_CART_DATA);
            return new Promise(resolve => resolve({
                [STATUS]: SUCCESS
            }));
        } catch (e) {
            // error
            Utils.log("Remove FoodZone Cart Data ===> error ", e);

            return new Promise((resolve, rejects) => rejects({
                [STATUS]: ERROR
            }));
        }
    }

}