import {GET_COUNTRIES, SORT_C_ASC, SORT_C_DESC} from '../Constants/index';


export function getCountries(countries){
    return {
        type: GET_COUNTRIES,
        payload: countries
    }
}

export function sortAsc(countries){
    return {
        type: SORT_C_ASC,
        payload: countries
    }
}

export function sortDesc(countries){
    return {
        type: SORT_C_DESC,
        payload: countries
    }
}



