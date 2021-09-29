import React from "react"
import { hot } from "react-hot-loader/root"
import {
  HashRouter,
  withRouter,
  Switch,
  Redirect,
  Route,
} from "react-router-dom"
import PageLoading from "../components/PageLoading"

let routes: any[] = []
try {
  const modules = import.meta.globEager('../pages/*/routes.tsx')
  for (const path in modules) {
    routes = routes.concat(modules[path].default)
  }
} catch (error) {
  console.error(error.message)
}

routes.push({
  path: "/",
  redirect: '/home',
})
routes.push({
  path: "*",
  redirect: "/home",
})

console.table(routes)

const SwitchRouterComponent = () => {
  return (
    <React.Suspense fallback={<PageLoading />}>
      <Switch>
        {routes.map((route, index) =>
          route.redirect ? (
            <Redirect exact key={index} from={route.path} to={route.redirect} />
          ) : (
            <Route
              key={index}
              path={route.path}
              exact={!!route.exact}
              component={route.component}
            />
          )
        )}
      </Switch>
    </React.Suspense>
  )
}

const WithRouterComponent = withRouter(SwitchRouterComponent)

const getConfirmation = (message: any, callback: any) => {
  // this is the default behavior 与prompt一起使用
  //   <Prompt
  //   when={formIsHalfFilledOut}
  //   message="Are you sure you want to leave?"
  // />

  const allowTransition = window.confirm(message)
  callback(allowTransition)
}

const RouteComponent = () => {
  return (
    <HashRouter getUserConfirmation={getConfirmation}>
      <WithRouterComponent />
    </HashRouter>
  )
}

export default hot(RouteComponent)
