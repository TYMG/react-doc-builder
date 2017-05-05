import {defineState} from 'redux-localstore'


/**
 *  
 * Form Navigator
 * 
 * State:
 *  - formSectionInputs
 *  - formIndex
 */


const defaultState = -1

const initialState = defineState(defaultState,'formNavigator')

const FormNavigator = (state = initialState, action) => {
    switch (action.type) {
        case 'NEXT_FORM_SECTION':
            return action.nextFormSection/*Object.assign({}, state, {
                sectionIndex: action.nextFormSection
            })*/
        default:
            return state
    }
}

export default FormNavigator
