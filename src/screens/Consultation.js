import React, { useState, useEffect } from 'react';
import { Container, Row, Card, Col, ListGroup, Button, Image, Form, Table, Modal } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Accordion } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import DatePicker, { addDays, subDays } from "react-datepicker";
import { useDispatch, useSelector } from 'react-redux'
import { useFilePicker } from "use-file-picker";
import { listDoctors, createDoctor, updateAppointments, cancelAppointmentDates } from '../actions/productActions'
import { listConsultants, updateConsultation, getConsultantDetails, consultationLink } from '../actions/consultationActions.js'
import Message from '../components/Message'
import Loader from '../components/Loader'
import dayjs from 'dayjs'
import { createAppointment, cancelAppointments } from '../actions/consultationActions';
import { APPOINTMENT_CREATE_RESET } from '../constants/consultationConstants';
import "react-datepicker/dist/react-datepicker.css";
import "../doctorCard.css";
import DoctorDataCard from '../components/DoctorDataCard';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import "../tab.css";
import CancelIcon from '@mui/icons-material/Cancel';
import PaymentsSharpIcon from '@mui/icons-material/PaymentsSharp';
import axios from "axios";
import { cleanData } from 'jquery';
import moment from 'moment';
import Prescription from './Prescription';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const Consultation = ({ match, history }) => {
  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin'));
  // console.log("Logged in Successfuly", isLogin)
  const currentYear = new Date().getFullYear();
  const baseUrl = process.env.REACT_APP_API__BASE_URL;
  const [startDate, setStartDate] = useState(new Date());
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const [show, setShow] = useState(false);
  const [editRow, setEditRow] = useState({ id: "", fromDate: new Date(), toDate: new Date() })
  const [key, setKey] = useState('Appointments');
  const [appointmentRowData, setAppointmentRowData] = useState([])
  const [select, setSelection] = React.useState([]);
  const [modalShow, setModalShow] = React.useState({ isBoolean: false });
  const [excludeDate, setExcludeDate] = useState('')
  const [postdata, setPostdata] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = (date) => {
    handleShow();
    setEditRow({ id: date.row._id, fromDate: new Date(date.row.from), toDate: new Date(date.row.to) })
    // console.log("handle", date.row)
  }

  const [endDate, setEndDate] = useState(null);
  const dispatch = useDispatch()

  // doctor Slot Tab Columns
  //by default sorting
  const [docsortModel, setDocsortModel] = useState(
    [
      {
        field: "from",
        sort: "desc"
      }
    ]);

  const doctorSlotColumns = [
    { field: '_id', headerName: 'ID', width: 90, hide: true },
    {
      field: 'from',
      headerName: 'From',
      sortable: true,
      width: 180,
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value),
      sortingOrder: ['asc', 'desc'],
    },
    {
      field: 'to',
      headerName: 'To',
      sortable: true,
      width: 180,
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <IconButton
              color='primary'
              onClick={() =>
                handleEdit(params)}
              size="large">
              <EditIcon />
            </IconButton>
            <IconButton
              color='primary'
              onClick={() => doctorAppointmentCancel(doctorInfo, params.row._id)}
              size="large">
              <DeleteIcon />

            </IconButton>
          </div>
        );
      },
    }

  ];

  const [sortModel, setSortModel] = useState([
    {
      field: "date",
      sort: "desc"
    }
  ]);
  // Appointment Tab Columns
  const appointmentColumns = [
    { field: '_id', headerName: 'ID', width: 90, hide: true },
    { field: 'patientName', headerName: 'Patient Name', width: 120 },
    {
      field: 'date', headerName: ' Appointment Date', width: 190,
      type: 'dateTime', sortable: true, valueGetter: ({ value }) => value && new Date(value)
    },
    { field: 'appointment_status', headerName: 'Status', width: 120 },
    { field: 'payment_status', headerName: 'Payment Status', width: 140 },
    {
      field: 'consultationLink', headerName: 'Consultation Link', width: 140,
      renderCell: (params) => {
        return (
          <div className='d-flex justify-content-between align-items-center' style={{ cursor: 'pointer' }}>
            <Button
              color="secondary" size="medium"
              disabled={params.row.payment_status === "Unpaid"}
              onClick={() => zoomMeeting(params)}>
              Link
            </Button>
            {/* <IconButton
              disabled={params.row.payment_status === "Unpaid"}
              color='primary'
              onClick={() => zoomMeeting(params)}
              size="large">
              <LinkIcon />
            </IconButton> */}
          </div>
        )
      }
    },
    // {
    //   field: 'status', headerName: 'Consultation Status', width: 180,
    //   renderCell: (params) => {
    //     return (
    //       <div className='d-flex justify-content-between align-items-center' style={{ cursor: 'pointer' }}>
    //         {/* // disabled={params.row.payment_status === "Paid" &&  params.row.consultationLink=='' ? false:true} */}
    //         {params.row.payment_status === "Unpaid" && params.row.consultationLink === '' ? 'Not Done' : 'Done'}

    //       </div>
    //     )
    //   }
    // },
    {
      field: 'action', headerName: 'Action', width: 120,
      renderCell: (params) => {
        return (
          <div className='d-flex justify-content-between align-items-center' style={{ cursor: 'pointer' }}>
            <IconButton
              color='primary'
              onClick={() => doctorappointmnetDelete(params.id)
              }
              size="large">
              <DeleteIcon />
              {/* <EditIcon /> */}
            </IconButton>
          </div>
        )
      }

    },
  ];


  const [patientSortModel, setPatientSortModel] = useState([
    {
      field: "date",
      sort: "desc"
    }
  ]);
  //patient Data columns
  const patientColumns = [
    { field: '_id', headerName: 'ID', width: 90, hide: true, },
    { field: 'name', headerName: 'Doctor Name', width: 180 },
    {
      field: 'date', headerName: 'Appointment Date', width: 160,
      type: 'dateTime', sortable: true, valueGetter: ({ value }) => value && new Date(value),

    },
    { field: 'appointment_status', headerName: 'Status', width: 100 },
    { field: 'payment_status', headerName: 'Payment Status', width: 120 },
    {
      field: 'payment', headerName: 'Payment', width: 80,
      renderCell: (params) => {
        // console.log("Param is", typeof params.row.doc_fee)
        return (
          <div className='d-flex justify-content-between align-items-center' style={{ cursor: 'pointer' }}>
            <Button
              color="secondary" size="small"
              disabled={params.row.payment_status === "Paid"}
              onClick={() => payment(params)}>
              Pay
            </Button>

            {/* <IconButton
              color='primary'
              disabled={params.row.payment_status === "Paid"}
              onClick={() => payment(params)}
              size="large">
              <PaymentsSharpIcon />
            </IconButton> */}
          </div>
        )
      }
    },
    {
      field: 'consultationLink', headerName: 'Consultation Link', width: 140, editable: false,
      renderCell: (params) => {
        // console.log("params", params);
        return (
          <div className='d-flex justify-content-between align-items-center' style={{ cursor: 'pointer' }}>
            <Button
              color="secondary" size="medium"
              disabled={params.row.payment_status === "Unpaid" || params.row.consultationLink === ''}
              onClick={() => patientLink(params)}
            >
              Link
            </Button>
            {/* <IconButton
              // disabled={params.row.payment_status === "Unpaid" && consultationLinkDisabled(params.row.appointment_date)}
                 disabled={params.row.payment_status === "Unpaid" || params.row.consultationLink ===''}
              color='primary'
              onClick={() => patientLink(params)}
              size="large">
              <LinkIcon />
            </IconButton> */}
          </div>
        )
      }
    },
    {
      field: 'prescriptionSource', headerName: 'Prescription', width: 120,
      renderCell: (params) => {
        return (
          <div className='d-flex justify-content-between align-items-center' style={{ cursor: 'pointer' }}>
            <IconButton
              color='primary'
              size="large"
              disabled={params.row.prescriptionSource === ''}
              onClick={() => pdf(params)}
            >
              <FileDownloadIcon />
            </IconButton>
          </div>
        )
      }
    },
    {
      field: 'action', headerName: 'Cancel', width: 120,
      renderCell: (params) => {
        return (
          <div className='d-flex justify-content-between align-items-center' style={{ cursor: 'pointer' }}>
            <IconButton
              color='primary'
              // onClick={() => appointmentCancel(params.id)
              onClick={() => setModalShow({ isBoolean: true, id: params.id })
              }
              size="large">
              <CancelIcon />
            </IconButton>
          </div>
        )
      }
    },
  ];


  //Display the pdf function
  const pdf = (consultant) => {
    // console.log("first", consultant.row.prescriptionSource)
    var win = window.open();
    win.document.write('<iframe src="' + consultant.row.prescriptionSource + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
  }


  const doctorList = useSelector((state) => state.doctorList)
  const { loading, error, doctors } = doctorList;


  const consultationList = useSelector((state) => state.consultationList)
  const { loadingConsultant, errorConsultant, consultants } = consultationList;

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const isAdmin = userInfo?.isAdmin;
  const isSuperAdmin = userInfo?.isSuperAdmin;

  const doctorInfo = doctors?.find((doctor) => doctor.email_id == userInfo?.email)
  // console.log("docInfo", doctorInfo)


  //cancel the appointment
  const cancelAppointment = useSelector((state) => state.cancelAppointments)
  const { loadingApp, errorApp, appointments } = cancelAppointment

  //add from and to time at patient side
  const [docDate, setDocDate] = useState({
    "date": "",
    "docName": ""
  })
  const [fromTime, setFromTime] = useState(new Date())
  const [toTime, setToTime] = useState(new Date())
  const onChangeDate = (date, name) => {
    const newDocDate = {
      date,
      docName: name
    }
    setDocDate(newDocDate)
    setStartDate(date)
    let filterTime
    if (name) {
      const consultantDate = doctors?.find((doctor) => doctor.name == name)?.consultant_date
      filterTime = consultantDate?.find((dates) => dayjs(dates.from).format("ddd, MMM DD, YYYY") == dayjs(date).format("ddd, MMM DD, YYYY"))
    }
    // console.log("filter time", filterTime)
    // console.log("from", typeof filterTime?.from)
    // console.log("To", typeof filterTime?.to)
    if (filterTime) {

      setFromTime(filterTime.from)
      setToTime(filterTime.to)

    }
    else {
      setFromTime(new Date())
      setToTime(new Date())
    }
    // console.log("filter time",filterTime)

  }

  // console.log("from time",fromTime)
  useEffect(() => {
  }, [docDate])

  function handleDateChange(date) {
    // initial change: start by setting the startDate
    if (!startDate && !endDate) {
      setStartDate(date);
      // startDate has been set, set the end date
    } else if (startDate && !endDate) {
      setEndDate(date);
    }
    // user is choosing another range => set the start date
    // and set the endDate back to null
    if (startDate && endDate) {
      setStartDate(date);
      setEndDate(null);
    }
  }

  const [doctor, setDoctor] = useState("");
  const appointmentCreate = useSelector((state) => state.createAppointment)
  const { appointment, success, errorAppointment } = appointmentCreate

  // use effect for create appointment
  useEffect(() => {
    if (success) {
      dispatch({ type: APPOINTMENT_CREATE_RESET })
    }
  }, [history, success])

  const consultationLinkDisabled = (consultationDate) => {
    const timeDiff = dayjs().diff(consultationDate, "minutes")
    // console.log("Consultation Date is", consultationDate, timeDiff);
    if (0 <= timeDiff && timeDiff <= 25) {
      return false
    } else {
      return true
    }
  }

  // console.log("modal show", modalShow)
  // Generate URL function of zoom
  const zoomMeeting = (consultant) => {
    // console.log("Consultant is",consultant)
    const metas = document.getElementsByTagName('meta');

    for (let i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute('name') === "viewport") {
        metas[i].setAttribute('content', "width=1024, initial-scale=1");
        break;
      }
    }

    const data = {
      // email: "mayurichavan842@gmail.com",
      email: "info@mindvein.com"
    };
    axios
      .post(`https://testzoomapi-mayuri0723.vercel.app/meeting`, data)
      .then((response) => {
        let URL =
          response.data.join_url.replaceAll(
            "https://us05web.zoom.us/j/",
            "http://localhost:9999/?"
          ) + `?role=1&name=${consultant.row.name}`;
        console.log({ URL });
        console.log(consultant.row.name);
        console.log(response.data)
        // window.innerWidth = 1024;
        // window.open(`${URL}`,'_blank',"width=1268");
        // const meetingLinkWitoutPassword = response.data.join_url.split("?")[0];
        // const webClinetMeetingLink = meetingLinkWitoutPassword.replaceAll("/j/", "/wc/") + "/join";
        // console.log({webClinetMeetingLink},{meetingLinkWitoutPassword});
        window.open(`${URL}`, '_blank');
        // var newWindow =  window.open("/prescription",'_blank',"toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
        window.open(`/prescription/${consultant.id}`, '_blank', "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
        // console.log(consultant)
        dispatch(consultationLink(consultant.row._id, response.data.join_url))
      })
      .catch((err) => console.error(err));


  };

  const patientLink = (consultant) => {
    // console.log("consultant", consultant)
    window.open(consultant.row.consultationLink, "_blank")
  }

  //calling from payment button
  const payment = (params) => {
    // console.log("Transaction", typeof params.row.doc_fee)
    const transactionData = {
      "txnid": "T" + params.id,
      "amount": params.row.doc_fee,
      "name": params.row.patientName,
      "email": params.row.patientEmail_address,
      "phone": userInfo?.phone + "",
      "productinfo": "Consultation",
      "surl": `http://localhost:3000/api/easebuzz/easebuzz_reponse/${params.id}`,
      "furl": `http://localhost:3000/api/easebuzz/easebuzz_reponse/${params.id}`,
      "udf1": "",
      "udf2": "",
      "udf3": "",
      "udf4": "",
      "udf5": "",
      "address1": "",
      "address2": "",
      "city": "",
      "state": "",
      "country": "",
      "zipcode": "",
      "sub_merchant_id": "",
      "unique_id": "",
      "split_payments": "",
      "customer_authentication_id": "",
      "udf6": "",
      "udf7": "",
      "udf8": "",
      "udf9": "",
      "udf10": ""
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    console.log("object", transactionData, config)
    axios.post("http://localhost:3000/api/easebuzz/initiate_payment", transactionData, config)
      .then((response) => {
        console.log("Response is", response.data)

        window.location.href = response.data

      })
      .catch(e => console.log(e))
  }

  const placeAppointmentHandler = (doctor) => {
    const doctorfee = doctors?.find((doc) => doc.name === doctor)
    // console.log("Doctor fee",doctorfee)
    var name = doctor
    var payment_status = "Unpaid"
    var appointment_status = "Confirmed"
    var appointment_date = startDate
    var confirmed_date = startDate
    var payment_details = "Done"
    var prescriptionSource = ""
    var patientEmail_address = userInfo?.email
    var patientName = userInfo?.name
    var patientWeight = ""
    var patientHeight = ""
    var Observation = ""
    var consultationLink = ""
    var actual_patientName = ""
    var doc_fee = doctorfee.consultation_fee

    setDoctor("")
    console.log("doctor", appointment_date)
    // console.log("Consultation Doctor", doctors.consultation_fee)
    dispatch(
      createAppointment({
        name: name,
        date: docDate.date,
        payment_status: payment_status,
        appointment_status: appointment_status,
        appointment_date: appointment_date,
        confirmed_date: confirmed_date,
        payment_details: payment_details,
        prescriptionSource: prescriptionSource,
        patientEmail_address: patientEmail_address,
        patientName: patientName,
        patientWeight: patientWeight,
        patientHeight: patientHeight,
        Observation: Observation,
        actual_patientName: actual_patientName,
        consultationLink: consultationLink,
        doc_fee: doc_fee
      })
    )
    alert('Appointment is Booked. You have to make the payment for the appointment.Please click on the payment button from the below appointment list.')
    window.location.reload(false);
  }


  //Add appointment dates in doctor
  const addDateAppointmentHandler = (docInfo, from, to) => {
    const availabeTime = {}
    availabeTime['from'] = dayjs(from).format('YYYY-MM-DDTHH:mm:ssZ')
    availabeTime['to'] = dayjs(to).format('YYYY-MM-DDTHH:mm:ssZ')
    let newDates = Object.assign([], docInfo?.consultant_date);
    // console.log("Doc", docInfo)
    // console.log("Consulatny DAte", docInfo?.consultant_date)
    // const newDates = []
    // console.log("New Dates", docInfo, availabeTime, newDates)
    newDates.push(availabeTime)
    // console.log("AvailableTime", availabeTime)
    const consultants_Date = {
      name: docInfo.name,
      qualification: docInfo.qualification,
      email_id: docInfo.email_id,
      phone_no: docInfo.phone_no,
      consultant_date: newDates
    }
    // console.log(docInfo._id, consultants_Date)
    dispatch(createDoctor(docInfo._id, consultants_Date))
    alert('Slot Added Successfully..')
    window.location.reload(false);
  }



  const excludeAppointmentDate = () => {
    const dates = consultants?.filter((e) => e.name === doctor)
    const bookedDates = [];
    dates.forEach((e) => {
      // console.log(dayjs(startDate).format('ddd, MMM DD, YYYY') , dayjs(e).format('ddd, MMM DD, YYYY'))
      console.log(startDate, e)

      if (dayjs(startDate).format('ddd, MMM DD, YYYY,h:mm A') === dayjs(e.appointment_date).format('ddd, MMM DD, YYYY,h:mm A')) {
        bookedDates.push(new Date(e.appointment_date))
      }

    })
    setExcludeDate(bookedDates)
    console.log("Exclude date", bookedDates)
  }

  const filterPassTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime()
  }



  useEffect(() => {
    excludeAppointmentDate();
  }, [doctor, startDate])

  useEffect(() => {
    // Dispatch the list doctors action and fill our state
    dispatch(listDoctors())
    dispatch(listConsultants())
  }, [dispatch])

  //for  adding prescription 
  const updateConsultationHandler = (id, name, date, file, consulatantData) => {
    const details1 = {
      name,
      date,
      prescriptionSource: file,
      appointment_status: consulatantData.appointment_status,
      payment_details: consulatantData.payment_details,
      payment_status: consulatantData.payment_status,
      patientEmail_address: consulatantData.patientEmail_address,
      patientName: consulatantData.patientName,
      patientHeight: consulatantData.patientHeight,
      patientWeight: consulatantData.patientWeight,
      actual_patientName: consulatantData.actual_patientName,
      Observation: consulatantData.Observation,
      consultationLink: consulatantData.consultationLink
    }
    // console.log(id, consulatantData)
    dispatch(updateConsultation(id, details1))
  }

  //for updation of doc date

  const updateAppointmentDoctorDates = (docInfo, from, to) => {
    // console.log('DOCINFOID', docInfo._id)
    const updatedDate = {
      from: editRow.fromDate,
      to: editRow.toDate
    }
    dispatch(updateAppointments(docInfo._id, editRow.id, updatedDate))
    // toast.success("Lorem ipsum dolor")
    // console.log('Date', editRow)
  }


  //cancel appointment patient side
  const appointmentCancel = () => {

    // const redundData={
    //     "status": true,
    //     "refund_amount": 1,
    //     "reason": "Refund initiated, Your Request Id:RU0EBGAKA9",
    //     "easebuzz_id": "T3W4E9GPRZ",
    //     "refund_id": "RU0EBGAKA9"
    // }
    if (modalShow.id) {
      dispatch(cancelAppointments(modalShow.id))
      // alert('Appointment Cancelled  Successfully..')
      window.location.reload(false);
    }

  }


  const doctorappointmnetDelete = (id) => {
    dispatch(cancelAppointments(id))
    window.location.reload(false);
  }

  const doctorAppointmentCancel = (doctorInfo, id) => {
    // console.log("Doctors info id :",doctorInfo)
    dispatch(cancelAppointmentDates(doctorInfo._id, id))
    alert("Appointment Slot deleted Successfully");
    window.location.reload(false);
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     dispatch(listConsultants())

  //   }, 60000);
  //   return () => clearInterval(interval);
  // }, [dispatch]);

  //Appointment Tab Data
  useEffect(() => {
    const data = consultants?.length > 0 && consultants[0] !== 'undefined' && consultants?.filter((consultantInfo) => consultantInfo?.name == doctorInfo?.name)
    // const data = consultants?.filter((consultantInfo) => consultantInfo?.name == doctorInfo?.name)
    setAppointmentRowData(data)
  }, [consultants, doctorInfo])

  return (
    <Container>
      <Card className="text-center">
        <Card.Header> Online Consultation</Card.Header>
        <Card.Body>
          <Card.Text>
            We have team of health experts like Psychiatrist (Medical Council of India-MCI, registered), Sexologist, Child Psychiatrist, Clinical Psychologist (Council of India-RCI registered), Occupational Therapist, Speech Therapist, Remedial/Special Educators who mindfully listen, understand and guide you with the quality and intense awareness throughout the process of consultation and therapy. We strongly believe in the natural elements for health and wellness hence we emphasis more on it.
          </Card.Text>
          <div className="doctorCardDetail">
            <DoctorDataCard />
          </div>
          {isLogin ?

            <>
              <Card.Title style={{ fontFamily: "Open Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol" }}>
                ** Note After you book your doctor appointment, the consultation link will be active... Please be available in time.
              </Card.Title>
              <Card.Text>
                <Card>
                  <ListGroup variant='flush'>

                    <ListGroup.Item>
                      {/* 1strow */}
                      {loading ? (
                        <Loader />
                      ) : error ? (
                        <Message variant='danger'>{error}</Message>
                      ) : (
                        <>
                          {
                            isSuperAdmin ? <>
                              <h1></h1>
                            </> : null
                          }
                          {
                            !isAdmin && !isSuperAdmin ? <>
                              <Accordion>
                                <Card >
                                  <Accordion.Toggle as={Card.Header} eventKey="0">
                                    <h6 style={{ fontSize: "20px" }}>Refund Policy
                                      <img src={"images/refund.png"} />
                                    </h6>
                                  </Accordion.Toggle>

                                  <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                      <p className="display-linebreak">If from Doctors side Appointment get's cancelled then total amount of
                                        fees will be refunded.
                                        If Patient cancels the appointment before the 12 hrs of the appointment 25% of amount will be deducted from the fee and will be refunded.</p>
                                    </Card.Body>
                                  </Accordion.Collapse>
                                </Card>
                              </Accordion>
                              <h3>Book New Appointment</h3>
                              <Row>
                                <Col>

                                  <div style={{
                                    marginTop: "1px",
                                    padding: "0px 1px 9px 2px"
                                  }}>
                                    <Form.Label>Select Doctors </Form.Label>
                                    <Box
                                      component="form"
                                      sx={{
                                        '& .MuiTextField-root': { width: '30ch' },
                                      }}
                                      noValidate
                                      autoComplete="off"
                                    >
                                      <TextField
                                        id="outlined-select-currency"
                                        select

                                        sx={{
                                          width: { sm: 200, md: 300 },
                                          "& .MuiInputBase-root": {
                                            height: 35
                                          }
                                        }}

                                        value={doctor}
                                        onChange={(e) => setDoctor(e.target.value)}
                                      // helperText="Please select the Doctor"
                                      >
                                        {doctors?.map((option) => (
                                          <MenuItem key={option.value} value={option.name}>
                                            {option.name}
                                          </MenuItem>
                                        ))}
                                      </TextField>
                                    </Box>
                                  </div>
                                </Col>
                                <Col>
                                  <Form.Label>Select Slots</Form.Label>
                                  <DatePicker
                                    // isClearable
                                    selected={docDate.date}
                                    onChange={(date) => onChangeDate(date, doctor)}
                                    showTimeSelect
                                    minTime={new Date(fromTime)}
                                    maxTime={new Date(toTime)}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    excludeTimes={excludeDate}
                                    placeholderText='Select the Date & Time'
                                    disabled={!doctor}
                                    filterTime={filterPassTime}
                                    minDate={moment().toDate()}
                            
                                  />
                                </Col>
                                <Col>
                                  <Form.Label>Book Appointment</Form.Label>
                                  {/* {console.log("pay", !docDate.date)} */}
                                  <Button
                                    variant="success"
                                    disabled={!doctor || !docDate.date}
                                    className='btn-block'
                                    type='button'
                                    onClick={() => placeAppointmentHandler(doctor)}
                                  >
                                    Book Appointment
                                  </Button>


                                </Col>
                              </Row>
                            </> : null
                          }
                          {
                            !isAdmin && !isSuperAdmin ? <>
                              <h3>Appointment List</h3>
                              <div>
                                <Box sx={{ height: 400, width: '100%' }}>
                                  <DataGrid
                                    getRowId={(r) => r._id}
                                    rows={consultants?.length > 0 && consultants[0] !== 'undefined' && consultants?.filter((consultantmail) => consultantmail?.patientEmail_address == userInfo?.email)}
                                    columns={patientColumns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    disableSelectionOnClick
                                    sortModel={patientSortModel}
                                    onSortModelChange={(model) => setPatientSortModel(model)}
                                    experimentalFeatures={{ newEditingApi: true }}
                                    onSelectionChange={(newSelection) => {
                                      setSelection(newSelection.rows);
                                    }}

                                  />

                                  <Modal
                                    show={modalShow.isBoolean}
                                    onHide={() => setModalShow({ isBoolean: false })}
                                    size="lg"
                                    aria-labelledby="contained-modal-title-vcenter"
                                    centered
                                  >
                                    <Modal.Header closeButton>
                                      <Modal.Title id="contained-modal-title-vcenter">
                                        Cancel Appointment
                                      </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                      <h4>Refund Policy</h4>
                                      <p>
                                        If from Doctors side Appointment get's cancelled then total amount of fees will be refunded.
                                        If Patient cancels the appointment before the 12 hrs of the appointment 25% of amount will be deducted
                                        from the fee and will be refunded.
                                      </p>
                                    </Modal.Body>
                                    <Modal.Footer>
                                      <Button
                                        variant="success"
                                        onClick={appointmentCancel}
                                      >Confirm</Button>
                                      <Button className="outline-danger"
                                        onClick={() => setModalShow({ isBoolean: false })}>Cancel</Button>
                                    </Modal.Footer>
                                  </Modal>
                                </Box>
                              </div>
                            </> :
                              <>
                                {
                                  doctorInfo ? <>
                                    {/* Doctor Slots Tab */}
                                    <div>
                                      <Tabs id="controlled-tab-example"
                                        defaultActiveKey="Appointments"
                                        activeKey={key}
                                        onSelect={(k) => setKey(k)}
                                        className="mb-3" >

                                        <Tab eventKey="Appointments" title={<span>Appointments <i className="fa fa-calendar-o" aria-hidden="true"></i> </span>}>
                                          <div>
                                            <Box sx={{ height: 400, width: '100%' }}>
                                              <DataGrid
                                                getRowId={(r) => r._id}
                                                rows={appointmentRowData}
                                                columns={appointmentColumns}
                                                pageSize={5}
                                                rowsPerPageOptions={[5]}
                                                sortModel={sortModel}
                                                onSortModelChange={(model) => setSortModel(model)}
                                                disableSelectionOnClick
                                                experimentalFeatures={{ newEditingApi: true }}
                                              />
                                            </Box>
                                          </div>
                                        </Tab>
                                        <Tab eventKey="DoctorSlots" title={<span>Doctor Slots <i className="fa fa-clock-o" aria-hidden="true"></i> </span>}>
                                          <Row>
                                            <Col style={{
                                              display: "flex",
                                              justifyContent: "space-around"
                                            }}>
                                              <Card.Title>From</Card.Title>&nbsp;
                                              <DatePicker
                                                selected={from}
                                                onChange={(date) => setFrom(date)}
                                                showTimeSelect
                                                timeIntervals={30}
                                                timeCaption="Time"
                                                dateFormat="MMM d, yyyy hh:mm aa"
                                                placeholderText="Please Select From Time"
                                              />

                                              <Card.Title> To</Card.Title>&nbsp;
                                              <DatePicker
                                                selected={to}
                                                onChange={(date) => setTo(date)}
                                                showTimeSelect
                                                timeIntervals={30}
                                                timeCaption="Time"
                                                dateFormat="MMM d, yyyy hh:mm aa"
                                                placeholderText="Please Select To Time"
                                              />
                                            </Col>
                                            <Col>
                                              <Button
                                                size="lg"
                                                variant="primary"
                                                type="submit"
                                                onClick={() => addDateAppointmentHandler(doctorInfo, from, to)}>
                                                Add</Button>
                                            </Col>
                                          </Row>
                                          <Box sx={{ height: 400, width: '100%' }}>
                                            <DataGrid
                                              getRowId={(r) => r._id}
                                              rows={doctorInfo?.consultant_date}
                                              columns={doctorSlotColumns}
                                              pageSize={5}
                                              rowsPerPageOptions={[5]}
                                              disableSelectionOnClick
                                              experimentalFeatures={{ newEditingApi: true }}
                                              sortModel={docsortModel}
                                              onSortModelChange={(model) => setDocsortModel(model)}
                                            />
                                          </Box>
                                          {/* Modal for from and to time */}
                                          <Modal
                                            show={show}
                                            dialogClassName="modal-50w"
                                            onHide={handleClose}>
                                            <Modal.Header closeButton>
                                              <Modal.Title>Edit the Appointment Dates</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                              <Card.Title>From</Card.Title>
                                              <DatePicker
                                                selected={editRow.fromDate}
                                                onChange={(date) => setEditRow({ ...editRow, fromDate: new Date(date) })}
                                                showTimeSelect
                                                timeIntervals={30}
                                                timeCaption="Time"
                                                dateFormat="MMMM d, yyyy hh:mm aa"
                                                placeholderText="Please Select From Time"
                                              />

                                              <Card.Title> To</Card.Title>
                                              <DatePicker
                                                selected={editRow.toDate}
                                                onChange={(date) => setEditRow({ ...editRow, toDate: new Date(date) })}
                                                showTimeSelect
                                                timeIntervals={30}
                                                timeCaption="Time"
                                                dateFormat="MMMM d, yyyy hh:mm aa"
                                                placeholderText="Please Select To Time"
                                              />
                                            </Modal.Body>
                                            <Modal.Footer>
                                              <Button variant="secondary" onClick={handleClose}>
                                                Close
                                              </Button>
                                              <Button
                                                variant="primary"
                                                onClick={() => { updateAppointmentDoctorDates(doctorInfo, from, to); handleClose(); }}>
                                                Save Changes
                                              </Button>
                                            </Modal.Footer>
                                          </Modal>

                                        </Tab>
                                      </Tabs>

                                    </div>

                                  </> : null
                                }
                              </>
                          }
                        </>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Card.Text> </> :
            <Card.Text>
            </Card.Text>
          }
        </Card.Body>

        {/* <Card.Footer className="text-muted">
              <p>
            &copy; {currentYear} <strong>Mindvein</strong> - Medicine online Store
          </p>
          </Card.Footer> */}
      </Card>
      <p className="footer-links">
        <a
          href="#"
          target="_blank"
        >
        </a>
      </p>
    </Container >
  )
}

export default Consultation

