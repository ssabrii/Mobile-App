import createStore from './reduxStore'

let store;
if (!store) {
    console.log('@@index store')
    store = createStore();
}

export default store;
