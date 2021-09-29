import { handleActions } from "redux-actions"
interface IState {
  myname: string
}

const defaultState: IState = {
  myname: "xj",
}

export default handleActions<IState, any>(
  {
    TOOGLE_NAME: (state, { payload: { myname } }) => {
      return {
        ...state,
        myname,
      }
    },
  },
  defaultState
)
