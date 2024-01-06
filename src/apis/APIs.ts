import AppConfig from '../configs/AppConfig';
import Utils from '../common/util/Utils';
import Helper from './Helper';
import { Alert } from 'react-native';
import { ERROR, STATUS } from '../redux/Types';
import NetInfo from '@react-native-community/netinfo';

const RESOURCE = AppConfig.base_url;

const GET = async ( baseUrl: string, endpoint: string) => {
    const res = await NetInfo.fetch();
    if (res.isConnected) {
        return fetch(`${baseUrl}${endpoint}`, {
            method: 'GET',
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }),
        }).then(Utils.verifyResponse);
    }
    Alert.alert(
        "No internet connection.",
        "",
        [
            {
                text: 'Got it!'
            }
        ]
    )
    return new Promise((resolve, rejects) =>
        rejects({
            [STATUS]: ERROR,
        }),
    );
};

export const GetList = () =>
    GET( RESOURCE, `/4829d4ab0e96bfab50e7`)
        .then((response: any) => response.json())
        .catch(Utils.handleError);