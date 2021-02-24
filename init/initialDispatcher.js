import {userActions} from "../bus/user/actions";
import {serverDispatch} from "../helpers/serverDispatch";

export const initialDispatcher = async (
    context,
    store
) => {
    await serverDispatch(store, (dispatch) => {
        dispatch(userActions.setUserType('guest'));
    });

    const state = store.getState();

    const stateUpdates = {
        user: {
            userType: state.user.userType
        }
    };

    return {
        store,
        stateUpdates,
    };
}
