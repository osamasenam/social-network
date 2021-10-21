import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


export default function FindPeople() {

    const [users, setUsers] = useState();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if(searchTerm) {
            console.log("getting people from database...",searchTerm);
            fetch(`/find-people/${searchTerm}`)
                .then(res => res.json())
                .then(results => {
                    // console.log('results: ', results);
                    setUsers(results);
                })
                .catch(console.log);
        } else {
            console.log('getting latest users from database', users);
            fetch(`/find-people/latest3`)
                .then(res => res.json())
                .then(results => {
                    // console.log('results: ', results);
                    setUsers(results);
                })
                .catch(console.log);
        }
        return () => {
            console.log(`About to replace ${searchTerm} with a new value`);
        };
    }, [searchTerm]);

    return(
        <div className="find-people">
            <h2>Find People</h2>
            
            <h1>Here you can search for people...</h1>
            <input type="text" onChange={(e) => setSearchTerm(e.target.value)} />
            <div className='container'>
                {users && users.map((user, i) => (
                    <Link to={`/user/${user.id}`} key={i}>
                        <p >{user.first}</p>
                        <img src={user.image} />
                    </Link>
                
                ))}
            </div>
        </div>
    );
}