import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { listDoctors } from '../actions/productActions'
import { listConsultants, updatePrescriptionData } from '../actions/consultationActions.js'
import { IconButton } from '@mui/material'
import Box from '@mui/material/Box';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { format, setDayOfYear } from "date-fns";
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DatePicker from "react-datepicker";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation } from 'react-router-dom';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const Prescription = ({ match, history }) => {
    const prescriptionId = match.params.id
    // console.log(prescriptionId)
    const dispatch = useDispatch();
    const [actualname, setActualName] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [appointmentRowData, setAppointmentRowData] = useState([])
    const [observation, setObservation] = useState('');
    const [date, setDate] = useState(new Date());
    const [isgenerated, setIsgenerated] = useState(false);
    const [prescrptionfile, setPrescrptionfile] = useState('');
    const [isApiCall, setIsApiCall] = useState(false);
    // const [mailId, setMailId] = useState();
    const location = useLocation();
    // console.log(location.state)


    const doctorList = useSelector((state) => state.doctorList)
    const { loading, error, doctors } = doctorList;
    // console.log("Doctor List", doctors);

    const patientList = useSelector((state) => state.consultationList)
    // console.log("List is", patientList)
    const { loadingConsultant, errorConsultant, consultants } = patientList;

    const appointmentDetails = consultants?.find((r) => r._id === prescriptionId)
    // if(appointmentDetails)
    // console.log("appointmentDetails", appointmentDetails)
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    // console.log("user info", userInfo);
    const isAdmin = userInfo?.isAdmin;

    const doctorInfo = doctors?.find((doctor) => doctor.email_id == userInfo?.email)
    // console.log("Doctor Info", doctorInfo)
    //columns

    const [sortModel, setSortModel] = useState([
        {
            field: "date",
            sort: "desc"
        }
    ]);

    const patientHistory = [
        { field: '_id', headerName: 'ID', width: 90, hide: true },
        { field: 'patientName', headerName: 'Patient Name', width: 190 },
        {
            field: 'date', headerName: 'Appointment Date', width: 190,
            type: 'dateTime', sortable: true, valueGetter: ({ value }) => value && new Date(value)
        },
        { field: 'patientHeight', headerName: 'Height', width: 120 },
        { field: 'patientWeight', headerName: 'Weight', width: 140 },
        { field: 'Observation', headerName: 'Observation', width: 120 },
        {
            field: 'prescriptionSource', headerName: 'Prescription', width: 120,
            renderCell: (params) => {
                return (
                    <div className='d-flex justify-content-between align-items-center' style={{ cursor: 'pointer' }}>
                        <IconButton
                            color='primary'
                            size="large"
                            // onClick={()=>window.open(`${params.row.prescriptionSource}`,'_blank')}
                            onClick={() => pdf(params)}
                        >
                            <FileDownloadIcon />
                            {/* <a type= "application/pdf" target="_blank"   href={`${params.prescriptionSource}`}/> */}
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

    useEffect(() => {
        // Dispatch the list doctors action and fill our state
        dispatch(listDoctors())
        dispatch(listConsultants())
    }, [dispatch])

    useEffect(() => {
        const data = consultants?.length > 0 && consultants[0] !== 'undefined' && consultants?.filter((consultantInfo) => consultantInfo?.name == doctorInfo?.name)
       const uniqueData= data?.length > 0 && data?.filter((e)=>e.patientEmail_address===appointmentDetails.patientEmail_address)
    //    console.log("Data is",uniqueData)
        setAppointmentRowData(uniqueData)
    }, [consultants, doctorInfo])

    //use state for dynamic input fields
    const [inputFields, setInputFields] = useState([
        { drug: '', frequency: '', duration: '', instruction: '' }
    ])

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }

    const addFields = () => {
        let newfield = { drug: '', frequency: '', duration: '', instruction: '' }
        setInputFields([...inputFields, newfield])
    }

    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }
    //GeneratePDF Function

    const [head] = React.useState(["Drug", "Daily Dose", "Duration", "Instruction"]);
    const [body, setBody] = useState([]);


    const generatePDF = () => {
        let doc = new jsPDF("p", "pt", "a4", true);
        doc.setFont("Calibri", "bold");
        doc.setFontSize(12);
        doc.setTextColor(14, 3, 64);

        //   doc.text("Prescription", 20, 140);
        // doc.text("Octonyan loves jsPDF", 25, 10);
        // doc.text("This is centred text.", 100, 20, null, null, "center");
        doc.addImage("/images/mindvein.png", "PNG", 40, 80, 150, 90);
        doc.text(`Doctor's Name: ${appointmentDetails.name}`, 520, 135, null, null, "right");
        doc.text("Address : Sector 8, Sheltor Complex, \n" +
            "Near KGN Xpress Hotel, Kharghar,\n" + "Navi Mumbai 410210, \n" + "Maharashtra, India.", 550, 147, null, null, "right");
        doc.text("Phone No:(+91) 8567029029", 550, 200, null, null, "right");
        // doc.addImage("/images/mindvein.png", "PNG", X-axis, Y-asis, width, height);
        doc.line(20, 230, 550, 230);
        doc.text("Prescription", 20, 270);

        //   doc.text("Table 2", 20, 300);
        //   doc.line(20, 302, 550, 302);

        doc.autoTable({
            margin: { top: 250, left: 20, bottom: 30 },
            head: [head],
            body: body,
        });



        // window.open(doc.output("bloburl"), "_blank");
        // const p = doc.output("bloburl");
        const p = doc.output("datauristring");
        setPrescrptionfile(p);
        setIsApiCall(true);

    }
    const apiCall = () => {
        const prescriptionData = {
            patientName: actualname,
            patientHeight: height,
            patientWeight: weight,
            Observation: observation,
            name: appointmentDetails.name,
            date: appointmentDetails.appointment_date,
            prescriptionSource: prescrptionfile
        }
        // console.log("prescriptionId", prescriptionId, prescriptionData)
        dispatch(updatePrescriptionData(prescriptionId, prescriptionData))

    }

    useEffect(() => {
        if (isApiCall) {
            apiCall()
        }
    }, [isApiCall])


    const submit = async (e) => {
        e.preventDefault();
        const data = []
        inputFields.forEach((a, index) => {
            data.push(Object.values(a));
        })
        setBody(data);
        // console.log(inputFields)
        setIsgenerated(true);

        //api call

    }

    useEffect(() => {
        if (isgenerated) {
            generatePDF();
            setIsgenerated(false)
        }

    }, [isgenerated]);



    return (
        <div style={{ marginTop: "6rem" }}>
            <div>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(r) => r._id}
                        rows={appointmentRowData}
                        columns={patientHistory}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                        sortModel={sortModel}
                        onSortModelChange={(model) => setSortModel(model)}
                    />
                </Box>
            </div>
            <div className="container mt-4 p-4">
                <h4>Patient Information</h4>
                <hr />
                <div className="row">
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '23ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="outlined-basic" label="Patient Name" value={actualname}
                            // onChange={(name) => setName()}
                            onChange={(e) => setActualName(e.target.value)}
                            variant="outlined" />
                        <TextField id="outlined-basic" label="Patient Height" value={height}
                            // onChange={(height) => setHeight(height)}
                            onChange={(e) => setHeight(e.target.value)}
                            variant="outlined" />
                        <TextField id="outlined-basic" label="Patient Weight" value={weight}
                            // onChange={(weight) => setWeight(weight)}
                            onChange={(e) => setWeight(e.target.value)}
                            variant="outlined" />
                        {/* <TextField id="outlined-basic" label="Date" variant="outlined" /> */}
                        <DatePicker
                            selected={date}
                            onChange={(e) => setDate(e)}
                            dateFormat="MMM d, yyyy hh:mm aa"
                            placeholderText="Please Select Date"
                        />
                    </Box>


                </div>
                <h4>Patient Observation</h4>
                <hr />
                <div className="row">
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '23ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={3}
                            // placeholder="Minimum 3 rows"
                            value={observation}
                            onChange={(e) => setObservation(e.target.value)}
                            // onChange={(o) => setObservation(o)}
                            style={{ width: '100ch' }}
                        />

                    </Box>
                </div>

                <h4>Prescriptions</h4>
                <hr />
                <div className="row">
                    <Box
                        component="form"
                        sx={{ m: 1 }}
                        noValidate
                        autoComplete="off">
                        {inputFields.map((input, index) => {
                            return (
                                <div key={index}>
                                    <TextField id="outlined-basic" label="Drug" variant="outlined"
                                        name='drug'
                                        onChange={event => handleFormChange(index, event)}
                                        sx={{ mr: 2 }}
                                    />
                                    <FormControl sx={{ mr: 2, minWidth: 120 }}>
                                        <InputLabel id="demo-simple-select-helper-label">Frequency</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            // value={age}
                                            name='frequency'
                                            label="frequency"
                                            onChange={event => handleFormChange(index, event)}
                                        // onChange={handleChange}
                                        >
                                            <MenuItem value={'1-0-0'}>1-0-0</MenuItem>
                                            <MenuItem value={'1-1-0'}>1-1-0</MenuItem>
                                            <MenuItem value={'1-1-1'}>1-1-1</MenuItem>
                                            <MenuItem value={'0-1-1'}>0-1-1</MenuItem>
                                            <MenuItem value={'1-0-1'}>1-0-1</MenuItem>
                                            <MenuItem value={'1-0-0'}>1-0-0</MenuItem>
                                        </Select>

                                    </FormControl>
                                    <TextField id="outlined-basic" label="Duration" variant="outlined"
                                        name='duration'
                                        helperText="Duration in Days"
                                        sx={{ mr: 2 }}
                                        onChange={event => handleFormChange(index, event)}
                                    />
                                    <TextField id="outlined-basic" label="Instruction" variant="outlined"
                                        name='instruction'
                                        sx={{ mr: 2 }}
                                        onChange={event => handleFormChange(index, event)}
                                    />
                                    <Button variant="contained"
                                        onClick={() => removeFields(index)}
                                        sx={{ mt: 1 }}

                                    >   <DeleteIcon fontSize='medium' /> </Button>
                                </div>
                            )
                        })}
                        <Button variant="contained"
                            onClick={() => addFields()}
                        >Add </Button>
                    </Box>
                </div>

            </div>
            <Stack spacing={3} direction="row" style={{ marginLeft: "309px" }}>
                <Button variant="contained"
                    onClick={(e) => submit(e)}
                >Submit</Button>
                {/* <Button variant="outlined">Outlined</Button> */}
            </Stack>
        </div>


    )
}

export default Prescription