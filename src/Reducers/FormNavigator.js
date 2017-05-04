/**
 *  
 * Form Navigator
 * 
 * State:
 *  - formSectionInputs
 *  - formIndex
 */

const FormNavigator = (state = {}, action) => {
    switch(action.type) {
         case 'NEXT_FORM_SECTION':
            return Object.assign({}, state, {
                formSectionInputs: state.formSectionInputs,
                sectionIndex:state.sectionIndex,
            })
    }
}