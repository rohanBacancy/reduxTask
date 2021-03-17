export const ADD_USER = "ADD_USER";
export const EDIT_USER = "EDIT_USER";
export const DELETE_USER = "DELETE_USER";

export const addUser = (newUser) =>
{
    return{
        type:ADD_USER,
        userData:newUser
    }
}

export const editUser = (id,editedUser) =>
{
    return{
        type:EDIT_USER,
        id:id,
        editedUserData:editedUser
    }
}

export const deleteUser = (id) =>
{
    return{
        type:DELETE_USER,
        id:id
    }   
}