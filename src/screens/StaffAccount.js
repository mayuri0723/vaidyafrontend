import React, { useState, useEffect } from 'react'
import CardGroup from 'react-bootstrap/CardGroup';
import { Col, Button, Row, Card, ListGroup } from 'react-bootstrap'
import { getUserInfoDetails, updateUserStaff } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

const StaffAccount = () => {

  const dispatch = useDispatch()

  // UserList
  const userLists = useSelector((state) => state.userInfoDetails)
  const { users } = userLists;
  // console.log("users are", users)

  const adminFilter = users?.filter((e) => e.isAdmin === true)

  const [isAdmin, setIsAdmin] = useState();

  // const handleChange = (event, id) => {
  //   setIsAdmin(event.target.value === 'true');
  //   dispatch(updateUserStaff({id: id, isAdmin: isAdmin}))
  // }

  useEffect(() => {
    dispatch(getUserInfoDetails());
  }, [dispatch])


  return (
    <div>
      StaffAccount
      <article class="card">
        <header>
          <h2>Staff details</h2>
        </header>
        {/* <img src="balloons2.jpg" alt="Hot air balloons"/> */}
        <div class="content">
          <Card>
            <Card.Body>

            </Card.Body>
          </Card>
          <table className="striped bordered visiting" bordercolor="#6caaa8">
            <thead>
              <tr>
                <th>
                  Staff Name
                </th>
                <th>Access</th>
              </tr>
            </thead>
            <tbody>
              {adminFilter.map((admin, i) => {
                return (
                  <tr>
                    <td>
                      <li key={i}>
                        <p>{admin.name}</p>
                      </li>
                    </td>
                    <td>
                      <select value={isAdmin} >
                        <option value="true">Enable</option>
                        <option value="false">Disable</option>
                      </select>
                      
                      {/* <p>{admin.isAdmin ? 'True' : 'False'}</p> */}
                    </td>
                  </tr>
                );
              })}




{/* {adminFilter.map((admin, i) => {
                return (
                  <tr>
                    <td>
                      <li key={i}>
                        <p>{admin.name}</p>
                      </li>
                    </td>
                    <td>
                      <select value={isAdmin} onChange={(e) => handleChange(e, admin.id)}>
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </select>
                    </td>
                  </tr>
                );
              })} */}
            </tbody>
          </table>
        </div>
      </article>


    </div>
  )
}

export default StaffAccount