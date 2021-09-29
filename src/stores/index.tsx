import { combineReducers} from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'

import infoReducer from './info/reducer'

const rootReducer = (history: History) => 
  combineReducers({
    router: connectRouter(history),
    infoReducer
  })

export default rootReducer