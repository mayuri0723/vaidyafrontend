import React, { useState, useEffect } from 'react'
import { getUserInfoDetails } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'


function UserList(props) {
    const dispatch = useDispatch()
    // UserList
    const userLists = useSelector((state) => state.userInfoDetails)
    const { users } = userLists;


    useEffect(() => {

        dispatch(getUserInfoDetails());
    }, [dispatch])

    //create a new array by filtering the original array
    const filteredData = users.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.text.toLowerCase().includes(props.input)
        }
    })


    return (
        <div>

            <ul>
                {users.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>

        </div>
    )
}

export default UserList