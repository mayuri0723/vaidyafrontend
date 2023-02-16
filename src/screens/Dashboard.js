import React, { useState, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../dashboard.css';
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from 'react-redux'
import { createDashboardAppointment, getPatientppointments } from '../actions/dashboardActions'
import { getUserInfoDetails } from '../actions/userActions'
import dayjs from 'dayjs';

const Dashboard = () => {

  const [todayAppointments, setTodayAppointments] = useState([]);
  const [tomorrowAppointments, setTomorrowAppointments] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  const appointmentdefaultData = {
    appointmentDate: "",
    appointmentTime: "",
    patientName: "",
    patientContact: ""
  }
  const [appointment, setAppointment] = useState(appointmentdefaultData)
  const dispatch = useDispatch();

  const addAppointmentData = useSelector((state) => state.patientAppointment)
  const { loading, error, success, appointmentData } = addAppointmentData

  const getAppointments = useSelector((state) => state.getAppointmentPatients)
  const { loadingapp, appointmentsData, errorapp } = getAppointments

  // User(Patient)
  const Patient = useSelector((state) => state.userInfoDetails)
  const { loadingUsers, errorUsers, users } = Patient;


  const adminFilter = users?.filter(e => e.isAdmin === false && dayjs(e.createdAt).isSame(dayjs(), 'day'));
  // console.log("Dashoabrd filter admin", adminFilter)

  // const showRegisterPatients = adminFilter?.filter((e) => e.createdAt === dayjs())
  // console.log("showRegisterPatients",showRegisterPatients)


  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createDashboardAppointment(
      dayjs(appointment.appointmentDate).format('YYYY-MM-DD'),
      dayjs(appointment.appointmentTime).format('HH:mm'),
      appointment.patientName,
      appointment.patientContact,
    ))
    setAppointment(appointmentdefaultData)
  }

  useEffect(() => {
    dispatch(getPatientppointments());
    dispatch(getUserInfoDetails());
  }, [dispatch])

  useEffect(() => {
    const today = dayjs().format('YYYY-MM-DD');
    const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');

    const todayAppointments = appointmentsData?.filter(appointments => {
      return dayjs(appointments.appointmentDate).format('YYYY-MM-DD') === today;
    });

    const tomorrowAppointments = appointmentsData?.filter(appointments => {
      return dayjs(appointments.appointmentDate).format('YYYY-MM-DD') === tomorrow;
    });

    setTodayAppointments(todayAppointments);
    setTomorrowAppointments(tomorrowAppointments);
  }, [appointmentsData]);

  return (
    <>
      <Container>
        {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
        <Row style={{ marginTop: "4rem" }}>
          <Col >
            <Card.Header>Today's Patient</Card.Header>
            <Card border="info" style={{ width: '18rem' }}>

              <Card.Body>

                <Card.Text>
                  {todayAppointments?.map(appointment => (
                    <div key={appointment.id}>
                      <p>Patient Name: {appointment.patientName}</p>
                      <p>Phone Number: {appointment.patientContact}</p>
                    </div>
                  ))}
                  <hr />
                  {/* <h3>Today's  Patients</h3> */}
                  {adminFilter?.map(user => (
                    <div key={user.id}>
                      <p>Patient Name: {user.name}</p>
                 
                    </div>
                  ))}
                </Card.Text>
              </Card.Body>
            </Card>
            <br />
          </Col>
          <Col >
            <Card border="info" style={{ width: '18rem' }}>
              <Card.Header>Tomorrow's Patient</Card.Header>
              <Card.Body>

                <Card.Text>
                  {tomorrowAppointments?.map(appointment => (
                    <div key={appointment.id}>
                      <p>Patient Name: {appointment.patientName}</p>
                      <p>Phone Number: {appointment.patientContact}</p>
                    </div>
                  ))}

                </Card.Text>
              </Card.Body>
            </Card>
            <br />
          </Col>
          {/* <Col >
                        <Card border="info" style={{ width: '18rem' }}>
                            <Card.Header>Quick SMS</Card.Header>
                            <Card.Body>
                                <Card.Title></Card.Title>
                                <Card.Text>
                                <input type="text" id="patientPhone" className='p-input' placeholder='Mobile' style={{margin:"0px 14px 9px 0px"}} />
                                <textarea id="w3review" name="message" className='p-input' rows="3" cols="50" placeholder='Message'></textarea>
                                <Button>
                                  Send
                                </Button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <br />
                    </Col> */}
        </Row>

        {/* Columns are always 50% wide, on mobile and desktop */}
        <Row md="auto">
          <Col >
            <Card border="info" style={{ width: '22rem' }}>
              <Card.Header>Appointment</Card.Header>
              <Card.Body>
                <Card.Text>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <DatePicker
                      placeholderText="Select Date"
                      selected={appointment.appointmentDate}
                      onChange={(date) => setAppointment({ ...appointment, appointmentDate: date })} />
                    <DatePicker
                      selected={appointment.appointmentTime}
                      showTimeSelect
                      placeholderText="Time"
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      // value={}
                      onChange={(time) => setAppointment({ ...appointment, appointmentTime: time })}
                    />

                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <input type="text" id="pName" className='p-input' placeholder='Patient Name' style={{ margin: "0 14px 9px 0" }}
                      value={appointment.patientName}
                      onChange={(e) => setAppointment({ ...appointment, patientName: e.target.value })}
                    />
                    <input type="text" id="patientPhone" className='p-input' placeholder='Mobile'
                      value={appointment.patientContact}
                      onChange={(e) => setAppointment({ ...appointment, patientContact: e.target.value })}
                    />
                  </div>
                  <Button onClick={submitHandler} variant='primary'>
                    Save
                  </Button>
                </Card.Text>
              </Card.Body>
            </Card>
            <br />
          </Col>
          {/* Notification */}
          {/* <Col >
            <Card border="info" style={{ width: '18rem' }}>
              <Card.Header>Notification</Card.Header>
              <Card.Body>
             
                <Card.Text>
                  fgfgf
                </Card.Text>
              </Card.Body>
            </Card>
            <br />
          </Col> */}
          {/* Reminder */}
          {/* <Col>
            <Card border="info" style={{ width: '18rem' }}>
              <Card.Header>Reminder</Card.Header>
              <Card.Body>
             
                <Card.Text>
                  <input type="text" id="subject" className='p-input' placeholder='Subject' style={{ margin: "0 14px 9px 0" }} />
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <input type="checkbox" id="r1" name="SMS" value="sms" style={{ width: " 45%", height: "16px" }} />
                    <label for="r1">SMS</label>
                    <input type="checkbox" id="r2" name="Mail" value="mail" style={{ width: " 45%", height: "16px" }} />
                    <label for="r2">Mail</label>
                    <input type="checkbox" id="r3" name="Dashboard" value="dashboard" style={{ width: " 45%", height: "16px" }} />
                    <label for="r3">Dashboard</label>
                  </div>
                  <Button variant='primary'>
                    Save
                  </Button>
                </Card.Text>
              </Card.Body>
            </Card>
            <br />
          </Col> */}
        </Row>
      </Container>

    </>
  )
}

export default Dashboard