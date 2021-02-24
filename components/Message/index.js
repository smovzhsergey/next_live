import {useSelector} from 'react-redux';

const Message = () => {

    const {userType} = useSelector( state => state.user);

    return (
        <div >
            <h2>Тип пользователя - {userType}</h2>
        </div>
    )
}

export default Message;