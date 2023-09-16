import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
	isConnected: false,
  MessageLists: []
}

function reducer(state = initialState, action){

	let returnState;

	switch(action.type){

	case 'CONNEXION' :

			returnState = {
				...state,
				isConnected: action.value,
			}

		return returnState || state

	case 'DECONNEXION' :

		return initialState

	case 'UPDATE_MESSAGE' :

    let newMessageArray = [...state.MessageLists]

    action.payload.id = state.MessageLists.length + 1

    newMessageArray.push(action.payload)

    console.log(newMessageArray);

				returnState = {
					...state,
					MessageLists: newMessageArray,
				}

			return returnState || state

    case 'CLEAR_MESSAGE' :

      console.log('clear');

      let newArray = Array()

        returnState = {
          ...state,
          MessageLists: newArray,
        }
      return returnState || state
	default:
		return state;
	}
}


const persistConfig = {
  key: 'Kabakoo_persist-key-2c1BsFJWAub7xzjCL1QhlKo9J',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}
