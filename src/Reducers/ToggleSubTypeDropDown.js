import { TOGGLE_SUB_DOC_TYPE_DROPDOWN } from '../actions'

const initialToggleState = false;

export default function(state  = initialToggleState , action) {
    return !state;
}