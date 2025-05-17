import React, { use, useState } from 'react';

const Users = ({usersPromise}) => {
    const initialUsers  = use(usersPromise);
    const [users, setUsers] =useState(initialUsers);

    const handleUser = e =>{
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const newUser = {name, email};
        console.log(newUser);

        //create user in the database
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data =>{
            console.log('data after creating user in the db', data)
            if(data.insertedId){
                newUser._id = data.insertedId;
                const newsUsers = [...users, newUser];
                setUsers(newsUsers);
                alert('User added successfully.')
                e.target.reset();
            }
        })
    }

    return (
        <div>
            {/* add user */}
           <div>
            <form onSubmit={handleUser}>
                <input type="text" name='name' />
                <br />
                <input type="email" name='email' />
                <br />
                <input type="submit" value="Add user" />
            </form>
           </div>
           {/* view users */}
           <div>
            {
                users.map(user => <p key={user._id}>{user.name} : {user.email}</p>)
            }
           </div>
        </div>
    );
};

export default Users;