import {useSelector, useDispatch} from 'react-redux';
import {userActions} from "../../bus/user/actions";

const User = () => {
    const {userId, userType, visitCounts} = useSelector( state => state.user);
    console.log(visitCounts)
    const dispatch = useDispatch();

    const upgradeUser = () => {
        let type;
        if (userType === 'guest' || userType === 'friend') {
            type = userType === 'guest' ? 'friend' : 'familyMember';

            dispatch(userActions.setUserType(type));
        }
    }

    return (
        <div>
            <p>ID пользователя - {userId}</p>
            <p>Тип пользователя - {userType}</p>
            <p>Количество посещений - {visitCounts}</p>
            <button onClick = { upgradeUser }>Временно повысить свой статус</button>
        </div>
    )
}

export default User;