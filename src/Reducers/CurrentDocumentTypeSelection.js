export default function currentDocumentTypeSelection(state = { } ,  action ){
    switch(action.type){
        case 'MODIFY_DOCUMENT_TYPE':
            return Object.assign({}, state, {
                "currentDocumentTypeSelection" : action.currentDocSubDocSelection
            })
        default:
        return state
    }
}