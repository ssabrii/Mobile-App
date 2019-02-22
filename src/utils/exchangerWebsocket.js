import { socketHostPrice, socketHost } from '../config';
import {
    setLocPriceWebsocketConnection
} from '../redux/action/exchangerSocket';
import {
    updateLocAmounts,
    clearLocAmounts
} from '../redux/action/locAmounts'
import {setLocEurRate} from '../redux/action/exchangeRates'
import {
    setSeconds
} from '../redux/action/locPriceUpdateTimer'
import store from '../redux/store';
import Stomp from 'stompjs';
import {
    Platform, NativeModules, DeviceEventEmitter
} from 'react-native'


const WEBSOCKET_RECONNECT_DELAY = 5000;
const DEFAULT_SOCKET_METHOD = 'getLocPrice';
const UNSUBSCRIBE_SOCKET_METHOD = 'unsubscribe';
const topic = "/topic/loc_rate";

const androidStomp = NativeModules.StompModule;

class WS {
    static self;
    static stompJSClient;

    constructor() {
        console.log('@@exchangerWebsocket::constructor');
        
        WS.self = this;
        this.ws = null;
        this.grouping = false;
        this.shoudSocketReconnect = true;
        this.initSocket();
        this.locAmounts = [];
    }

    initSocket() {
        console.log('@@[WS] exchangerWebsocket::initSocket', socketHostPrice);
        
        this.ws = new WebSocket(socketHostPrice);
        this.ws.onmessage = this.handleRecieveMessage;
        this.ws.onopen = this.connect;
        this.ws.onclose = () => { 
            console.log(`@@[WS] ${require('moment')().format('YYYY-MM-DD hh:mm:ss')} onClone, this`, this);
            this.close(this); 
        };

        this.connectStompJSLockRate();
    }

    connectStompJSLockRate() {
        console.log('@@[STOMP] connectStompJSLockRate() -> this', this);

        let client = Stomp.client(socketHost);
        WS.stompJSClient = client;
        client.debug = msg => console.info('@@[STOMP] DEBUG', msg);

        const onSubscribe = () => client.subscribe(
            topic, 
            (data) => {
                console.info(`@@@@[STOMP] ${require('moment')().format('YYYY-MM-DD hh:mm:ss')} [EVENT]`, {data,body:data.body});
                store.dispatch(setLocEurRate(Number(data.body)));
            }
        );

        this.stompAndroid();
    
        client.connect(
          null,
          null,
          onSubscribe
        );
    }

    stompAndroid() {
        if (Platform.OS === 'android') {
            DeviceEventEmitter.removeAllListeners("onStompConnect");
            DeviceEventEmitter.addListener("onStompConnect", () => {
                console.info(`@@@@[STOMP][ANDROID] ${require('moment')().format('YYYY-MM-DD HH:mm:ss')} Connected`);

            });
            
            DeviceEventEmitter.removeAllListeners("onStompError");
            DeviceEventEmitter.addListener("onStompError", ({type, message}) => {
                console.info(`@@@@[STOMP][ANDROID] ${require('moment')().format('YYYY-MM-DD HH:mm:ss')} Error`,{type, message});
            });

            // DeviceEventEmitter.removeAllListeners("onStompMessage");
            DeviceEventEmitter.addListener("onStompMessage", ({message}) => {
                //const {message} = body;
                console.info(`@@@@[STOMP][ANDROID] ${require('moment')().format('YYYY-MM-DD HH:mm:ss')} Message`,{message});
                store.dispatch(setLocEurRate(Number(message)));

            });

            androidStomp.getData('',topic);
        }
    }

    startGrouping(scehduleTime = 20 * 1000){
        console.log("LOC PRICE startGrouping")
        this.grouping = true;
        if (this.timerOut !== undefined && this.timerOut !== null) {
            clearTimeout(this.timerOut);
            this.timerOut = null;
        }
        console.log("LOC PRICE stopGrouping setInterval");
        this.timer = setInterval(this.onTick, scehduleTime);
    }

    stopGrouping() {
        console.log("LOC PRICE stopGrouping");
        const that = this;
        clearInterval(that.timer);
        that.timer = null;
        this.timerOut = setTimeout(()=>{
            console.log("LOC PRICE stopGrouping timerOut");
            that.grouping = false;
            that.timerOut = null;
        }, 10 * 1000);
    }

    onTick() {
        console.log('@@@@[WS] exchangerWebsocket::onTick');
        
        let clonedLocAmounts = [...WS.self.locAmounts];
        WS.self.locAmounts = [];
        
        if (clonedLocAmounts.length > 0) {
            store.dispatch(updateLocAmounts(clonedLocAmounts));
        }
    }

    connect() {
        console.log(`@@[WS] ${require('moment')().format('YYYY-MM-DD hh:mm:ss')} exchangerWebsocket::connect`);
        
        store.dispatch(setLocPriceWebsocketConnection(true));
    }

    sendMessage(id, method, params, isMarked = false) {
        console.log(`@@@@[WS] ${require('moment')().format('YYYY-MM-DD hh:mm:ss')} exchangerWebsocket::sendMessage`, id, method, params, this.markedID);
        if (this.ws.readyState === 1 && id) {
            method = method ? method : DEFAULT_SOCKET_METHOD;
            if (isMarked) {
                if (method === DEFAULT_SOCKET_METHOD) {
                    this.markedID = id;
                }
                else if (method === UNSUBSCRIBE_SOCKET_METHOD){
                    this.markedID = null;
                }
            }
            if (!(method === UNSUBSCRIBE_SOCKET_METHOD && this.markedID === id)) {
                this.ws.send(JSON.stringify({ id, method, params }));
            }
        }
    }

    handleRecieveMessage(event) {
        console.log(`@@[WS] ${require('moment')().format('YYYY-MM-DD hh:mm:ss')} exchangerWebsocket::handleRecieveMessage`, event);
        
        if (event) {
            const data = JSON.parse(event.data);
            if (data.params && data.params.secondsLeft) {
                const seconds = Math.round(data.params.secondsLeft / 1000);
                store.dispatch(setSeconds(seconds));
            }
            if (!WS.self.grouping) {
                store.dispatch(updateLocAmounts({fiatAmount: data.id, params: data.params, error: data.error}));
            }
            else {
                // console.log("handleRecieveMessage gropuing", WS.self.locAmounts);
                WS.self.locAmounts = [...WS.self.locAmounts, {fiatAmount: data.id, params: data.params, error: data.error}];
            }
        }
    }

    close() {
        console.log(`@@exchangerWebsocket::close ${require('moment')().format('YYYY-MM-DD hh:mm:ss')}`);
        
        if (Platform.OS === 'android') {
            DeviceEventEmitter.removeAllListeners("onStompConnect");
            DeviceEventEmitter.removeAllListeners("onStompError");
            DeviceEventEmitter.removeAllListeners("onStompMessage");

            androidStomp.close();
        }
        
        
        if (this.shoudSocketReconnect) {
            if (store.getState().currency.isLocPriceWebsocketConnected) {
                store.dispatch(clearLocAmounts());
                store.dispatch(setLocPriceWebsocketConnection(false));
            }
            setTimeout(() => {
                this.initSocket();
            }, WEBSOCKET_RECONNECT_DELAY);
        }
    }

    disconnect() {
        console.log(`@@[WS/STOMP] ${require('moment')().format('YYYY-MM-DD hh:mm:ss')} 1/3 exchangerWebsocket::disconnect`, event);
        
        this.shoudSocketReconnect = false;
        if (this.ws) {
            console.log('@@[WS] 2/3 exchangerWebsocket::close');
            this.ws.close();
        }

        if (WS.stompJSClient) {
            console.log('@@[STOMP] 3/3 exchangerWebsocket::disconnect');
            WS.stompJSClient.disconnect();
            WS.stompJSClient = null;
        }
    }
}

export default WS;
export const WebsocketClient = new WS();