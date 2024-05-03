+++
title = 'Lesson1 SPR'
date = 2024-04-20T18:59:33+05:30
tags=["springBootCourse"]
+++


Problem When we have multiple reason to change the file.
```js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Is there any issue with this code ????
function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        axios.get('/api/user/123')
            .then(response => setUser(response.data))
            .catch(error => setError('Error fetching user data'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>User Profile</h1>
            {user && (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    {/* More user details */}
                </div>
            )}
            {/* Additional unrelated UI elements */}
        </div>
    );
}
```

A lot of things happening in the file. There should be one single reason to change the file. New api need to add then this file will change, html page needs to change or state needs to add then we have to change the file.

We can make separate file for hooks and state, html view and another for api calls.