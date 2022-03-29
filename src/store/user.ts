interface IState {
  name: string
  menu: string[]
}
interface Iaction {
  type: string
  payload: any
}
const initialState: IState = {
  name: '',
  menu: [],
}

export default function userStore(state = initialState, action: Iaction) {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.payload.name,
      }
    case 'SET_MENU':
      return {
        ...state,
        menu: action.payload.menu,
      }
    default: {
      return state
    }
  }
}
