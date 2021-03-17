import * as actionTypes from './actions';

const users = [
    {
        id:1,
        name:'Lenne Graham',
        email:'Sincere@april.biz',
        address:'C-503, Twin Tower , Yep',
        phone:'9812345671',
        website:'hildegard.org',
    },
];

const reducer = (state = users,action) =>
{
    switch(action.type)
    {
        case actionTypes.ADD_USER:
            return [...state,action.userData];
        case actionTypes.EDIT_USER:
            let tempUsers2 = [...state];
            tempUsers2 = tempUsers2.map((usr) => usr.id == action.id ? usr=action.editedUserData : usr);
            console.log(action.id)
            console.log(tempUsers2)
            state = tempUsers2;
            return state;
        case actionTypes.DELETE_USER:
            let tempUsers = [...state];
            tempUsers = tempUsers.filter((usr) => usr.id !== action.id);
            state = tempUsers;
            return state;
        default:
            return state;
    }
}

export default reducer;