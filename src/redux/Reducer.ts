import { combineReducers } from 'redux'
import Device from './device/Reducer'
import User from './user/Reducer'
import Flight from './flights/Reducer'
import { DEVICE_CONSTANTS_ROOT,USER_ROOT, FLIGHT_ROOT } from './Types';

export default combineReducers({
    [DEVICE_CONSTANTS_ROOT]: Device,
    [USER_ROOT]:User,
    [FLIGHT_ROOT]:Flight
});