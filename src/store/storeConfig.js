import {createStore, combineReducers} from 'redux'
import UserReducer from './reducers/user'
import CollectReducer from './reducers/collects'
import ShowModalReducer from './reducers/showModal'
import BarcodeReducer from './reducers/barcodes'


const reducers = combineReducers({
    user: UserReducer,
    collects: CollectReducer,
    showModal: ShowModalReducer,
    barcodes: BarcodeReducer

})

const storeConfig = createStore(reducers)

export default storeConfig