import {createConnectLocal} from 'redux-local-state';

const selectLocalState = (state) => state.local;
export default createConnectLocal(selectLocalState);