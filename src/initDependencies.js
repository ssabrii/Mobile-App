import { apiHost, cacheDomainPrefix, xDeviceVersion } from './config';

import { AsyncStorage } from 'react-native';
import Requester from 'locktrip-service-layer';

let config = {
    "apiHost": apiHost,
    "cacheDomainPrefix": cacheDomainPrefix
};

let requester = new Requester(AsyncStorage, config, { "X-Device-Version": xDeviceVersion });

export default requester;
