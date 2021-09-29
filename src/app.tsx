import React, { Suspense } from "react"
import { hot } from "react-hot-loader/root"
import { createHashHistory } from "history"
import RouterComponent from "./router/router"
import { routerMiddleware } from "connected-react-router"
import { Provider } from "react-redux"
import { applyMiddleware, createStore } from "redux"
import rootReducer from "./stores/index"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"
import promise from "redux-promise-middleware"
import logger from "redux-logger"
import thunk from "redux-thunk"

export const history = createHashHistory()

const getMiddlewares = () => {
  const middlewares = [thunk, promise, logger]
  if (import.meta.env.PROD) {
    middlewares.pop()
  }
  return middlewares
}

const store = createStore(
  rootReducer(history),
  composeWithDevTools(
    applyMiddleware(...getMiddlewares(), routerMiddleware(history))
  )
)

function App() {
  return (
    <Suspense fallback={<div>正在拼命获取数据，请稍后...</div>}>
      <Provider store={store}>
        <RouterComponent />
      </Provider>
    </Suspense>
  )
}

export default hot(App)
