import React, { use, useState } from 'react';
import { Link } from 'react-router';

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
                const newUsers = [...users, newUser]; // ✅ fixed here
                setUsers(newUsers);
                alert('User added successfully.')
                e.target.reset();
            }
        })
    }

    // delete
    const handleUserDelete = (id) =>{
        console.log('Delete this user',id)
        fetch(`http://localhost:3000/users/${id}`,{
            method:'DELETE'

        } )
        .then(res => res.json())
        .then (data =>{
            if(data.deletedCount){
                  const remainingUsers = users.filter(user => user._id !== id);
                  setUsers(remainingUsers);
                console.log('after delete', data)
            }
        })
    }

    return (
        <div>
            {/* add user */}
           <div>
            <h4>Users: {users.length}</h4>
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
                users.map(user => <p key={user._id}>{user.name} : {user.email}
                <Link to={`/users/${user._id}`}>Details</Link>
                <button onClick={() => handleUserDelete(user._id)}>X</button>
                </p>)
            }
           </div>
        </div>
    );
};

export default Users;
