import { createStore } from 'redux'


const initialstate = {
    user:null
}
function reducer(state=initialstate, action){
    switch(action.type){
        case "ADD_USER":
            return {
                ...state,
                user: action.user,
    
            }
        default:
            return state
    }
}


let store = createStore(reducer)
export default store