import React, { useState } from 'react';

const NewUserForm = (props) => {

    const [enteredFirstName, setEnteredFirstName] = useState('');
    const [enteredLastName, setEnteredLastName] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredOccupation, setEnteredOccupation] = useState('');

    const firstNameChangeHandler = (event) => {
        setEnteredFirstName(event.target.value);
    };
    const lastNameChangeHandler = (event) => {
        setEnteredLastName(event.target.value);
    };
    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
    };
    const occupationChangeHandler = (event) => {
        setEnteredOccupation(event.target.value);
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        const userData = {
            first_name: enteredFirstName,
            last_name: enteredLastName,
            email: enteredEmail,
            occupation: enteredOccupation
        };

        try {
            const response = await fetch('https://api-how-much-do-you-know-node.herokuapp.com/user/add-user', {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log('data', data);
            props.onAddNewUser({
                ...userData,
                message: "Thank you, the user has been added."
            });
        }
        catch (error) {
            console.log(error);
            props.onAddNewUser({
                ...userData,
                message: "Sorry, something went wrong! Please try again later."
            });
            return;
        }

        setEnteredFirstName('');
        setEnteredLastName('');
        setEnteredEmail('');
        setEnteredOccupation('');
    };

    return (
        <div className="w-1/4 min-w-min p-7 bg-indigo-100 rounded-md shadow-lg">
            <form onSubmit={submitHandler}>
                <div className="grid items-center justify-center">
                    <div className="w-7/8 bg-white p-1 m-3 rounded-md flex justify-center">
                        <input
                            className="p-1"
                            required
                            minLength="4"
                            type="text"
                            name="first_name"
                            value={enteredFirstName}
                            placeholder="First Name"
                            onChange={firstNameChangeHandler} />
                    </div>
                    <div className="w-7/8 bg-white p-1 m-3 rounded-md flex justify-center">
                        <input
                            className="p-1"
                            required
                            minLength="4"
                            type="text"
                            name="last_name"
                            value={enteredLastName}
                            placeholder="Last Name"
                            onChange={lastNameChangeHandler} />
                    </div>
                    <div className="w-7/8 bg-white p-1 m-3 rounded-md flex justify-center">
                        <input
                            className="p-1"
                            required
                            pattern=".+@.+\.com"
                            type="email"
                            name="email"
                            value={enteredEmail}
                            placeholder="Email"
                            onChange={emailChangeHandler} />
                    </div>
                    <div className="w-7/8 bg-white p-1 m-3 rounded-md flex justify-center">
                        <input
                            className="p-1"
                            required
                            minLength="4"
                            type="text"
                            name="occupation"
                            value={enteredOccupation}
                            placeholder="Occupation"
                            onChange={occupationChangeHandler} />
                    </div>
                    <div className="text-sm font-medium bg-indigo-100 p-2 w-20 mx-3 rounded-md text-gray-500 hover:bg-indigo-50 hover:text-blue-700 justify-self-end flex justify-center">
                        <button type="submit">Add User</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default NewUserForm;