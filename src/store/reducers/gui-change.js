import {
    CHANGE_HEADER_STATUS,
} from "../constants/gui-change";
// reducer with initial state
const initialState = {
    showHeaderStatus: true
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_HEADER_STATUS:
            return { ...state, showHeaderStatus: !state.showHeaderStatus }
        default:
            return state;
    }
}

