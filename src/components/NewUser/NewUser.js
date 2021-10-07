import React, { useState } from 'react';

import NewUserForm from './NewUserForm';

const NewUser = () => {

    const [message, setMessage] = useState('');

    const onAddNewUserHandler = (enteredUserData) => {
        setMessage(enteredUserData.message);
    };

    return (
        <div className="justify-center items-center flex flex-col">
            <NewUserForm onAddNewUser={onAddNewUserHandler} />
            <div className="m-2 max-w-max justify-self-center">
                <h1>{message}</h1>
            </div>
        </div>
    );
};

export default NewUser;