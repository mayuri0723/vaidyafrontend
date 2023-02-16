import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getPrescriptionDetail, getPatientDetail } from '../actions/prescriptionActions'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import PrescriptionWindow from './PrescriptionWindow';

const OldPatientTab = ({ choosePatient }) => {
  const dispatch = useDispatch();
  const prescription = useSelector((state) => state.getPrescripionList)
  const { loading, error, prescriptionData } = prescription;
  // console.log("Prescription is", prescriptionData);

  const prescriptionDetail = useSelector((state) => state.getPatientPrescriptionList)
  const { loadingp, errorp, patientPrescriptionData } = prescriptionDetail;

  // console.log("prescriptionDetail", prescriptionDetail)

  const uniqueData = Array.from(new Set(patientPrescriptionData?.map(item => item.Patient[0]?._id))).map(id => {
    return patientPrescriptionData?.filter(dataItem => dataItem.Patient[0]?._id === id)[0];
  });

  useEffect(() => {
    dispatch(getPrescriptionDetail());
    dispatch(getPatientDetail());
  }, [dispatch])

  const setPatientDetail = (e) => {
    choosePatient(e.target.id);
    // console.log("setpatient id",e.target.id);
    // console.log("holg")
  };



  const searchPatient = (e) => {
    var input, filter, table, tr, td, i, txtValue;
    input = e.target.value;
    // console.log("input",input)
    filter = input.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 1; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));


  return (
    <div>
      {/* table Starts */}
      <table className="table table-borderless" bordercolor="#6caaa8" id="myTable">
        <tr>
          <td>
            <Form.Control
              type="search"
              placeholder="Search  Patient here"
              className="me-2"
              aria-label="Search"
              onChange={searchPatient}
            />
          </td>
          <td >
            Contact
          </td>
          <td>
            Add Prescription
          </td>
          <td >
            Full Detail
          </td>
        </tr>
        {uniqueData.map((data, index) => (
          <tr key={index}>
            <>
              <td> {data.Patient[0]?.name}</td>
              <td>{data.Patient[0]?.phone}</td>
              <td>
                <div>
                  <Button variant="outlined" onClick={handleClickOpen}>
                    Add
                  </Button>
                  <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                    sx={{
                      "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                          width: "100%",
                          maxWidth: "902px",  // Set your width here
                        },
                      },
                    }}
                  >
                    <DialogTitle id="responsive-dialog-title">Prescription</DialogTitle>
                    <DialogContent>
                      <DialogContentText>

                        <br />
                     
                      </DialogContentText>
                      <PrescriptionWindow />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={handleClose}>Submit</Button>
                    </DialogActions>
                  </Dialog>
                </div>



              </td>
              <td>
                <div>
                  <Button onClick={setPatientDetail} id={data.Patient[0]?._id} >View</Button>
                </div>
                <div style={{ display: "none" }}>
                </div>
              </td>
            </>
          </tr>
        ))}
      </table>
      {/* table End */}


    </div>
  )
}

export default OldPatientTab