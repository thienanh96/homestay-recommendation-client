import {
    CHANGE_HEADER_STATUS
} from "../constants/gui-change";



export const changeStatusHeader = (show) => {
    return {
        type: CHANGE_HEADER_STATUS,
        show
    }
}



