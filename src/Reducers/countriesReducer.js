import { GET_COUNTRIES, SORT_C_ASC, SORT_C_DESC} from "../Constants";


function countriesReducer(state, action) {
    let stateCopy = [...state];
    // console.log(action.payload);
    switch(action.type) {
        case GET_COUNTRIES:
            stateCopy = action.payload;
            break;

        case SORT_C_ASC:
            stateCopy.sort((a,b) => {
                if(a.name > b.name) return 1;
                if(a.name < b.name) return -1;
                return 0;
            });
            break;
        case SORT_C_DESC:
            stateCopy.sort((a,b) => {
                if(a.name < b.name) return 1;
                if(a.name > b.name) return -1;
                return 0;
            });
            break;
        default:
    }
    return stateCopy;
}
export default countriesReducer;