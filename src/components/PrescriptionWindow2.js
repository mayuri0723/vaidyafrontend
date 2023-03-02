
import React, { useState, useEffect } from 'react'
import { Form, Button, Modal,InputGroup, Card } from 'react-bootstrap'
import DeleteIcon from '@mui/icons-material/Delete';
import '../prescription.css'
import { getUserInfoDetails } from '../actions/userActions'
import { addPrescriptionUser, addDietChart } from '../actions/prescriptionActions'
import { useDispatch, useSelector } from 'react-redux'
import Icon from '@mui/material/Icon';
import { DiechartList } from './DiechartList';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import jsPDF from 'jspdf'
import Alert from 'react-bootstrap/Alert';
import { getMedicines } from '../actions/prescriptionActions'
import '../prescriptionWindow.css'
let googleTransliterate = require("google-input-tool");


function PrescriptionWindow2() {
    const defaultData = {
        diet: "",
        prescriptiondays: "",
        // ayurveda: "",
        // ayurvedaDiagnosis: "",
        // mDiagnosis: "",
        // modernSystem: "",
        // treatement: "",
        // treatmentdays: "",
        // panchkarma: [],
        image: "",
        video: "",
        report: "",
        payment: {},
        Remark: ""
      }
    
      const [prescription, setPrescription] = useState(defaultData);
      const [isOpen, setIsOpen] = useState(false);
      const dispatch = useDispatch();
    
      //Prescription API Data
      const PrescriptionDetails = useSelector((state) => state.addPatientPrescription)
      const { successpresc, errorprescription, patientPrescription } = PrescriptionDetails;
    
      const submitHandler = (e) => {
        e.preventDefault();
        dispatch(addDietChart(preDiet))
          .then((response) => {
            if (medicineAndDoseArray.length != 0) {
              medicineAndDoseArray.splice(0, medicineAndDoseArray.length);
    
            }
            inputFields.map((obj) => {
              medicineAndDoseArray.push({ dose: obj.dose, medicineDetails: obj.med._id })
            });
    
            // console.log("Response is", response)
            // console.log("medicine ", medicineAndDoseArray)
            let mainPrescription = {
              prescriptionUser: patient?._id,
              Symptoms: symptomList,
              diet_chart: response._id,
              medicineData: medicineAndDoseArray,
              // ayurveda_diagnosis: prescription.ayurvedaDiagnosis,
              // mDiagnosis: prescription.mDiagnosis,
              // modernSystem: prescription.modernSystem,
              // prescriptionTreatment: prescription.treatement,
              // treatmentdays: prescription.treatmentdays,
              // panchkarma: prescription.panchkarma,
              // ayurveda: prescription.ayurveda,
              Image: imagefile,
              Video: videofile,
              report: reportfile,
              payment: inputVal,
              prescriptiondays: prescription.prescriptiondays,
              Remark: prescription.Remark
    
            }
            dispatch(addPrescriptionUser(mainPrescription))
    
          })
          .catch(e => console.log(e))
    
      }
    
      //dietchart API
      const DietchartDetails = useSelector((state) => state.addPatientDietChart)
      const { success, errorDiet, patientdiet } = DietchartDetails;
    
      const allMedicines = useSelector((state) => state.getallMedicineList)
      const { loadingMedicine, errorMedicine, medicinesList } = allMedicines;
    
    
      // User(Patient)List
      const Patient = useSelector((state) => state.userInfoDetails)
      const { loadingUsers, errorUsers, users } = Patient;
    //  console.log("Patient List",users)
    
      useEffect(() => {
        dispatch(getUserInfoDetails());
        dispatch(getMedicines());
      }, [dispatch])
    
    
      //translation code
      let maxResult = 8;
      let request = new XMLHttpRequest();
      const [translateinputValue, setTranslateInputValue] = React.useState("");
      const [translatedValue, setTranslatedValue] = React.useState("");
      const [selectValue, setSelectValue] = React.useState("");
      const [symptomList, setSymptomList] = useState([]);
      const handleSelectChange = (event) => {
        setSelectValue(event.target.value);
      };
      const onSymptomChange = (event) => {
        setTranslateInputValue(event.target.value);
      };
      React.useEffect(() => {
        googleTransliterate(request, translateinputValue, selectValue, maxResult).then(
          function (response) {
            // console.log(response, "response");
            setTranslatedValue(response[0][0]);
          }
        );
      }, [translateinputValue]);
    
    
      const addSymptomArray = () => {
        setTranslateInputValue('');
        if (selectValue === "") {
    
          setSymptomList(prevItems => prevItems.concat(document.getElementById("lan").value));
          return
        }
        setSymptomList(prevItems => prevItems.concat(document.getElementById("translatedvalue").value));
      }
    
      const removeSymptomArray = item => {
        // Remove an item from the array using `filter`
        setSymptomList(prevItems => prevItems?.filter(i => i !== item));
      };
    
      //use state for dynamic input fields for medicines
      const [inputFields, setInputFields] = useState([]);
      const addFields = (event) => {
        let medicineName = event.target.textContent.trim();
        let isMedicineAdded = inputFields.find((_) => { return _.med.medicineName == medicineName })?.med?._id !== undefined
        if (!isMedicineAdded) {
          let med = allMedicines?.medicinesList?.find((med) => { return med.medicineName === medicineName })
          let newfield = { Dose: '', med: med }
          setInputFields([...inputFields, newfield])
          return
        }
        alert(`${medicineName} is already added.`);
      }
    
      const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
      }
    
      //payment states
      const [inputVal, setInputVal] = useState({
        Consulting: "",
        medicine: "",
        paid: "",
        Debit_Credit: "",
        discount: ""
      });
      const updateInputVal = (pairs) =>
        setInputVal((prevInputVal) => ({ ...prevInputVal, ...pairs }));
    
      const onValueChange = (event) => {
        const { name, value } = event.target;
        if (name === "Consulting") {
          const newPaid = Number(value) + Number(inputVal.medicine);
          updateInputVal({ paid: newPaid });
        }
        if (name === "medicine") {
          const newPaid = Number(value) + Number(inputVal.Consulting);
          updateInputVal({ paid: newPaid });
        }
        if (name === "discount") {
          // console.log("value",value)
          const newPaid = Number(inputVal.paid) - Number(value);
          updateInputVal({ Debit_Credit: newPaid });
          // console.log("paid",inputVal)
        }
        updateInputVal({ [name]: value });
      };
    
      // Modal
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      // const handleShow = () => setShow(true);
      const handleShow = () => {
        setAllowanceState("1");
        setShow(true);
    
      };
    
      //checkboxes
      const [allowanceState, setAllowanceState] = React.useState("");
      const dietCategories = [...new Set(DiechartList?.map((item) => item.category))];
    
      function getIdFromUnicode(unicode) {
        switch (unicode) {
          case "✓": {
            return "1";
          }
          case "✗": {
            return "2";
          }
          case "!": {
            return "3";
          }
          default: {
            return "0";
          }
        }
      }
    
      function getUniCodeFromId(id) {
        switch (id) {
          case "1": {
            return "&#10003;";
          }
          case "2": {
            return "&#x2717;";
          }
          case "3": {
            return "!";
          }
          default: {
            return "&#9634;";
          }
        }
      }
    
    
      const [dietArray, setDietArray] = React.useState([]);
      const [preDiet, setPreDiet] = useState({
        wtodo: "",
        wto_dont: "",
        pateientDietChart: []
      });
    
      const setDietArrayLocally = (e) => {
        if (dietArray.length != 0) {
          dietArray.splice(0, dietArray.length)
          setDietArray([...dietArray]);
        }
        DiechartList.forEach((element) => {
          let inputId = "lb" + element.id;
          let unicode = document.getElementById(inputId).textContent.toString();
          if (unicode !== "▢") {
            setDietArray(dietArray => [...dietArray, { diet: element, allowance: getIdFromUnicode(unicode) }]);
          }
    
        });
        document.getElementById('dos').checked = true;
        setAllowanceState("1");
        setPreDiet(preDiet => ({ ...preDiet, wtodo: document.getElementById('what_todo').value, wto_dont: document.getElementById('what_todont').value }));
    
      };
    
      useEffect(() => {
        setPreDiet(preDiet => ({ ...preDiet, pateientDietChart: dietArray }))
      }, [dietArray])
    
    
      // get all funtion
      const handelAllButtonClick = (e) => {
        if (allowanceState === "4") {
          DiechartList.forEach((element) => {
            let id = "lb" + element.id;
            document.getElementById(id).innerHTML = getUniCodeFromId(
              allowanceState
            );
            // document.getElementById(inputId).value = allowanceState;
          });
          return
        }
        DiechartList.forEach((element) => {
          let id = "lb" + element.id;
          if (document.getElementById(id).innerHTML === "▢") {
            document.getElementById(id).innerHTML = getUniCodeFromId(
              allowanceState
            );
          }
    
        });
      };
    
      const headerChange = (e) => {
        if (e.target.value == '5') {
        }
        setAllowanceState(e.target.value);
      }
    
      const handelMarkState = (e) => {
        let index = e.target.id.replace("lb", "");
        if (allowanceState === "1") {
          e.target.innerHTML = "&#10003;";
        } else if (allowanceState === "2") {
          e.target.innerHTML = "&#x2717;";
        } else if (allowanceState === "3") {
          e.target.innerHTML = "!";
        } else {
          e.target.innerHTML = "&#9634;";
        }
      };
    
    
      const [showInstruction, setShowInstruction] = useState(false);
      const handelInstructionShow = (e) => {
        setShowInstruction(true)
      }
      const handelInstructionclose = (e) => {
        setShowInstruction(false)
      }
    
      const generatePdf = () => {
        var doc = new jsPDF('p', 'pt', 'a4');
        doc.html(document.getElementById("instructions"), {
          callback: function (pdf) {
            pdf.save("Instructions.pdf");
          }
        })
      }
    
      // const [isPanchkarmaChecked, setIsPanchkarmaChecked] = useState(true);
      // //panchkarma toggle
      // const toggleSelect = () => {
      //   setIsPanchkarmaChecked(!isPanchkarmaChecked)
      // }
    
    
      // //add input box on selection
      // const selectPanchkarma = (e) => {
      //   if (prescription.panchkarma.every((el) => el.panchkarma_name !== e.target.value)) {
      //     const tempData = { panchkarma_name: e.target.value, panchkarma_days: '0' }
      //     setPrescription({ ...prescription, panchkarma: [...prescription.panchkarma, tempData] })
      //   }
      // }
    
    
      // const removeDays = (pname) => {
      //   const a = prescription.panchkarma.filter((v) => v.panchkarma_name !== pname)
      //   setPrescription({ ...prescription, panchkarma: a })
    
      // }
    
      // const handlePanchkarmaDay = (e) => {
      //   const tempDay = prescription.panchkarma.map((el) => {
      //     if (el.panchkarma_name === e.target.name) {
      //       return { panchkarma_name: e.target.name, panchkarma_days: e.target.value }
      //     }
      //     else {
      //       return { ...el }
      //     }
      //   })
      //   setPrescription({ ...prescription, panchkarma: tempDay })
      // }
    
    
      const [medicineAndDoseArray, setMedicineAndDoseArray] = React.useState([]);
      const updateDose = (e) => {
        // getmedicine name using the id
        let medicineName = document.getElementById('me' + e.target.id).textContent.trim();
        // first find the index where of the medicine whose dose is to be set
        const newState = inputFields.map((obj) => {
          if (obj.med.medicineName === medicineName) {
            return { ...obj, dose: e.target.value };
          }
          return obj;
        });
        setInputFields(newState);
      }
    
      //image upload 
      
    
      const [imagefile, setImageFile] = useState();
      const handleImageUpload = (file) => {
        if (file.size <= 7 * 1024) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
          console.log(fileReader.result)
          setImageFile(fileReader.result)
          setPrescription({ ...prescription, image: imagefile })
        };
      } else {
       alert("File size exceeded the limit of 7KB");
       
      }
      }
    
      const [videofile, setVideoFile] = useState();
      const handleVideoUpload = (video) => {
        if (video.size <= 20 * 1024) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(video)
        fileReader.onload = () => {
          console.log(fileReader.result)
          setVideoFile(fileReader.result)
          setPrescription({ ...prescription, video: videofile })
    
        }
      } else {
        alert("File size exceeded the limit of 20KB");
       }
      }
    
      const [reportfile, setReportFile] = useState();
      const handleReportUpload = (report) => {
        if (report.size <= 12 * 1024) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(report)
        fileReader.onload = () => {
          console.log(fileReader.result)
          setReportFile(fileReader.result)
          setPrescription({ ...prescription, report: reportfile })
        }
      } else {
        alert("File size exceeded the limit of 12KB");
       }
      }
    
      //patient list
      const [patient, setPatient] = useState();
    
      const setUser = (e) => {
        // console.log(e)
        const selectedUserPhone = e.target.innerText.split("-")?.[1].trim()
        const user = users?.find((user) => user?.phone.toString() === selectedUserPhone)
    
        setPatient(user);
        // console.log(selectedUserId)
        // console.log("this is ", patient, user);
      }
    
      useEffect(() => {
        if (imagefile != null) document.getElementById("markImageAttached").innerHTML = "✓";
        if (videofile != null) document.getElementById("markVideoAttached").innerHTML = "✓";
        if (reportfile != null) document.getElementById("markReportAttached").innerHTML = "✓";
        // if (dietArray.length != 0) document.getElementById("markDietChartAttached").innerHTML = "✓";
      }, [imagefile, videofile, reportfile])
    
      const togglePopup = () => {
        setIsOpen(!isOpen);
      }
    
    
      return (
        <>
          <div className="card">
            <div className="card-body">
              <Autocomplete
                id="highlights-demo"
                // sx={{ width: 300 }}
                sx={{
                  "& fieldset": { border: 'none' },
                }}
                freeSolo
                options={users}
                style={{
                  width: 150,
                  margin: "-24px 15px 0px 54px",
                  fontWeight: "bold"
                }}
                getOptionLabel={(option) => `${option?.name} - ${option?.phone}`}
                renderInput={(params) => (
                  <TextField {...params} label=" Select Patient"
                    margin="normal" />
                )}
                renderOption={(props, option, { inputValue }) => {
                  const matches = match(`${option?.name} - ${option?.phone}`, inputValue, { insideWords: true });
                  const parts = parse(`${option?.name} - ${option?.phone}`, matches);
    
                  return (
                    <li {...props} onClick={setUser} >
                      <div>
                        {parts.map((part, index) => (
                          <span
                            key={index}
    
                            style={{
                              fontWeight: part.highlight ? 400 : 200,
                            }}>
                            {part.text}
                          </span>
                        ))}
                      </div>
                    </li>
                  );
                }}
              />
              <div className="col">
    
                <h5>{patient?.name}</h5>
              </div>
            </div>
          </div>
    
          {/* second Card */}
          <div className="symptomcard">
            <div className="card-body">
              <div className="row align-items-start">
                <div className="col">
                  <input
                    id="lan"
                    type="text"
                    name="symptoms"
                    className='sym-input'
                    onChange={onSymptomChange}
                    value={prescription.translateinputValue}
                    placeholder="Add symptoms"
                    required
                  />
                  <Button style={{ margin: "-4px 0 0 11px" }} onClick={addSymptomArray}>Add</Button>
                </div>
                <div className="col">
                  <Autocomplete
                    id="highlights-demo"
                    // sx={{ width: 300 }}
                    sx={{
                      "& fieldset": { border: 'none' },
                    }}
                    freeSolo
                    options={allMedicines?.medicinesList}
                    style={{
                      width: 200,
                      margin: "-24px 15px 0px 54px",
                      fontWeight: "bold"
                    }}
                    getOptionLabel={(option) => option?.medicineName}
                    renderInput={(params) => (
                      <TextField {...params} label="Add Medicines"
                        margin="normal" />
                    )}
                    renderOption={(props, option, { inputValue }) => {
                      const matches = match(option.medicineName, inputValue, { insideWords: true });
                      const parts = parse(option.medicineName, matches);
    
                      return (
                        <li {...props} onClick={addFields} >
                          <div>
                            {parts.map((part, index) => (
                              <span
                                key={index}
    
                                style={{
                                  fontWeight: part.highlight ? 400 : 200,
                                }}>
                                {part.text}
                              </span>
                            ))}
                          </div>
                        </li>
                      );
                    }}
                  />
                </div>
                {/* <div class="col">
                  <h5 align="center">Dose</h5>
                </div> */}
                {/* <div class="col">
                  <h5 align="center">Other Details</h5>
                </div> */}
                <div className="col">
                  <input type="text" className='d-input' placeholder="00"
                    value={prescription.prescriptiondays}
                    onChange={(e) => setPrescription({ ...prescription, prescriptiondays: e.target.value })}
                  />
                  <h5 align="center" style={{ fontWeiight: "300", margin: "-25px 107px 0 0" }}>Days</h5>
                </div>
              </div>
            </div>
          </div>
    
    
          <Form onSubmit={submitHandler}>
            {/* table Starts */}
            <table className="table table-borderless" bordercolor="black">
              <tr>
                <td style={{ borderRight: "1px solid " }}>
                  {symptomList.map(item => (
                    <div key={item}>
                      {item}
                      <button onClick={() => removeSymptomArray(item)}>Remove</button>
                    </div>
                  ))}
                  <input id="translatedvalue" className='p-input' value={translatedValue} type="hidden" />
    
                  <div style={{ margin: "800px 1px 2px 0px" }}>
                    <Icon baseClassName="fas" className="fa-plus-circle" fontSize="small" onClick={togglePopup} />
                    {isOpen && <input className='popup-box'
                      content={<>
                        <b>Remark</b>
    
    
                      </>}
                      value={prescription.Remark}
                      onChange={(e) => setPrescription({ ...prescription, Remark: e.target.value })}
                      handleClose={togglePopup}
                    />}
                  </div>
    
    
                </td>
                <td>
                  {inputFields.map((input, index) => {
                    return (
                      <div key={index}>
                        <div id="divOuter">
                          <div id="divInner">
    
                            <h6 id={'med' + index} >{input.med.medicineName}</h6>
                            <input type="hidden" className='p-input' value={input.med.id} name="medId[]" />
                            <input id={'d' + index} className='partitioned' type="text" placeholder='Dose' name='dose' maxlength="4" onChange={updateDose} />
                            <Button variant="contained"
                              onClick={() => removeFields(index)}
                            >  <DeleteIcon fontSize='medium' />  </Button>
                          </div>
                        </div>
    
                      </div>
                    )
                  })}
                  {/* {console.log("inputfields", inputFields)} */}
                </td>
                <td>
                </td>
                <td style={{ width: "40%" }}>
                 
                </td>
              </tr>
            </table>
            {/* table End */}
            <table border="1px" bordercolor="black" cellspacing="5px" cellpadding="5%" align="center" >
                    {/* <tr>
                      <td colspan="2">
                        <input type="text" id="ayurvedaDiagnosis" className='p-input' placeholder='Ayurveda Diagnosis'
                          value={prescription.ayurvedaDiagnosis}
                          onChange={(e) => setPrescription({ ...prescription, ayurvedaDiagnosis: e.target.value })}
                        />
                      </td>
                    </tr> */}
                    {/* <tr>
                      <td>
                        <input type="text" id="mDiagnosis" className='p-input' placeholder='M Diagnosis'
                          value={prescription.mDiagnosis}
                          onChange={(e) => setPrescription({ ...prescription, mDiagnosis: e.target.value })}
                        />
                      </td>
                      <td>
                        <input type="text" id="modernSystem" placeholder='Modern System' className='p-input'
                          value={prescription.modernSystem}
                          onChange={(e) => setPrescription({ ...prescription, modernSystem: e.target.value })}
                        />
                      </td>
                    </tr> */}
                    {/* <tr>
                      <td>
                        <input type="text" id="treatement" placeholder='Treatment' className='p-input'
                          value={prescription.treatement}
                          onChange={(e) => setPrescription({ ...prescription, treatement: e.target.value })}
                        />
                      </td>
                      <td>
                        <select
                          className='p-input'
                          value={prescription.treatmentdays}
                          onChange={(e) => setPrescription({ ...prescription, treatmentdays: e.target.value })}
                        >
                          <option selected value="">Select</option>
                          <option value="Month">Month</option>
                          <option value="Years">Years</option>
                          <option value="Days">Days</option>
                        </select>
                      </td>
                    </tr> */}
                    {/* <tr>
                      <td>
                        <input type="text" className='p-input' placeholder='Ayurveda'
                          value={prescription.ayurveda}
                          onChange={(e) => setPrescription({ ...prescription, ayurveda: e.target.value })}
                        />
                      </td>
                      <td>
                        <div style={{
                          display: "flex",
                          justifyContent: "center"
                        }}>
                          <Form.Check
                            inline
                            label="Panchkarma"
                            name="stone"
    
                            id='stone'
                            style={{ marginBottom: "-18px" }}
                            onClick={toggleSelect}
    
                          />
                          <select style={{ width: "150px" }}
                            className='p-input'
                            id="panchkarma"
                            name='panchkarma'
                            disabled={isPanchkarmaChecked}
                            value={prescription.panchkarma}
                            onChange={selectPanchkarma}
    
                          >
                            <option selected value=""></option>
                            <option value="Vaman">Vaman</option>
                            <option value="Virechan">Virechan</option>
                            <option value="Basti">Basti</option>
                            <option value="Nasya">Nasya</option>
                            <option value="Raktamokshana">Raktamokshana</option>
                          </select>
                        </div>
                      </td>
                    </tr> */}
                    {/* <tr>
                      <Card>
                        {
                          prescription.panchkarma.map((item) => (
                            <>
                              <Card.Body>
                                {item.panchkarma_name}
                                <input className='p-input' type="text" name={item.panchkarma_name} placeholder='days' onChange={(e) => handlePanchkarmaDay(e)} />
                                <Button onClick={() => removeDays(item.panchkarma_name)}>-</Button>
                              </Card.Body>
                            </>
                          ))
                        }
                      </Card>
                    </tr> */}
                    <tr>
                      <td colSpan={'2'}>
                        <table className="table table-bordered border-primary" border={"1px"} style={{ width: "100%" }}>
                          <tr>
                            <td>Payment
                            </td>
                            <td > Rupee</td>
                            <td style={{ width: "30%" }}>Document</td>
                          </tr>
                          <tr>
                            <td> Consultation</td>
                            <td>
                              <input
                                type="text"
                                name="Consulting"
                                className='p-input'
                                value={inputVal.Consulting}
                                onChange={onValueChange}
                              /></td>
                            <td>
                              Image
                              <div className="image-upload">
                                <img src='images/upload.png' />
                                <input id="file-input" type="file" className='p-input'
                                  value={prescription.image}
                                  onChange={(e) => handleImageUpload(e.target.files[0])} />
                                <label id="markImageAttached" ></label>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td> Medicines</td>
                            <td>
                              <input
                                type="text"
                                name="medicine"
                                className='p-input'
                                value={inputVal.medicine}
                                onChange={onValueChange}
                              /> </td>
                            <td> Video
                              <div className="image-upload">
                                <img src='images/video.png' />
                                <input id="video-file-input"
                                  value={prescription.video}
                                  onChange={(e) => handleVideoUpload(e.target.files[0])}
                                  type="file" />
                                <label id="markVideoAttached" ></label>
    
                              </div>
                            </td>
    
                          </tr>
                          <tr>
                            <td> Paid</td>
                            <td>
                              <input
                                type="text"
                                name="paid"
                                className='p-input'
                                value={inputVal.paid}
    
                                onChange={onValueChange} /></td>
                            <td> Report
                              <div className="image-upload">
                                <img src='images/medical-report.png' />
                                <input id="report-file-input"
                                  value={prescription.report}
                                  onChange={(e) => handleReportUpload(e.target.files[0])}
                                  type="file" />
                                <label id="markReportAttached" ></label>
    
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td> Debit/Credit</td>
                            <td>
                              <input
                                className='p-input'
                                type="text"
                                name="Debit_Credit"
                                value={inputVal.Debit_Credit}
                                onChange={onValueChange} readOnly />
                            </td>
                            <td>
                              Diet
                              <div className="image-upload">
                                &nbsp;&nbsp;
                                <img src='images/cereal.png' onClick={handleShow} />
                                <Modal
                                  show={show}
                                  size="lg"
                                  aria-labelledby="contained-modal-title-vcenter"
                                  centered
                                  onHide={handleClose}>
                                  <Modal.Header closeButton>
                                    <Modal.Title>Diet Chart</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    <div>
                                      <div className="row align-items-center">
                                        <div className="col">
                                          <input
                                            id="dos"
                                            defaultChecked
                                            type="radio"
                                            value="1"
                                            name="allowance"
    
                                            onChange={headerChange}
                                          />
                                          <label htmlFor="dos">Do's</label>
                                        </div>
                                        <div className="col">
                                          <input
                                            id="dont"
                                            type="radio"
                                            value="2"
                                            name="allowance"
                                            onChange={headerChange}
                                          />
                                          <label htmlFor="dont">Dont's</label>
                                        </div>
                                        <div className="col">
                                          <input
                                            id="Occasional"
                                            type="radio"
                                            value="3"
                                            name="allowance"
                                            onChange={headerChange}
                                          />
                                          <label htmlFor="Occasional">Occasional</label>
                                        </div>
                                        <div className="col">
                                          <input
                                            id="Omit"
                                            type="radio"
                                            value="4"
                                            name="allowance"
                                            onChange={headerChange}
                                          />
                                          <label htmlFor="Omit">Omit</label>
                                        </div>
                                        <div className="col">
                                          <input
                                            id="all"
                                            type="button"
                                            value="all"
                                            name="allowance"
                                            onClick={handelAllButtonClick}
                                          />
                                          <label htmlFor="all">All</label>
                                        </div>
                                        <div className="col">
                                          <Button variant="success" onClick={() => handelInstructionShow()} >Import</Button>
                                        </div>
                                      </div>
                                    </div>
    
                                    <div>
    
                                      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                        {
                                          dietCategories.map((category, index) => {
                                            return <div className='categoryClass' style={{ display: 'flex', flexDirection: 'column', margin: '0 10px' }}>
                                              {category}
                                              {
                                                DiechartList?.filter((elem) => { return elem.category == category }).map((diet, index) => (
                                                  <div key={index}>
                                                    {
                                                      <span
                                                        onClick={handelMarkState}
                                                        id={"lb" + diet.id}
                                                        style={{ fontSize: "1.5rem", cursor: "pointer" }}
                                                        dangerouslySetInnerHTML={{ __html: getUniCodeFromId(dietArray.find((elem) => { return diet.id == elem.diet.id })?.allowance) }}
                                                      ></span>
                                                    }
    
                                                    <label htmlFor={"lb" + diet.id}> {diet.name}</label>
                                                  </div>
                                                ))
                                              }
                                            </div>
                                          })
                                        }
                                      </div>
                                      <div className="row">
                                        <div className="col">
                                          <InputGroup>
                                            <InputGroup.Text >What to do</InputGroup.Text>
                                            <Form.Control id={'what_todo'} as="textarea" aria-label="With textarea" />
                                          </InputGroup>
                                        </div>
                                        <div className="col">
                                          <InputGroup>
                                            <InputGroup.Text>What to don't</InputGroup.Text>
                                            <Form.Control id={'what_todont'} as="textarea" aria-label="With textarea" />
                                          </InputGroup>
                                        </div>
                                      </div>
    
                                    </div>
    
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                      Close
                                    </Button>
                                    <Button
                                      variant="primary"
                                      onClick={setDietArrayLocally}
                                    >
                                      Save Changes
                                    </Button>
                                  </Modal.Footer>
                                </Modal>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Discount</td>
                            <td>
                              <input
                                className='p-input'
                                type="text"
                                name="discount"
                                value={inputVal.discount}
                                onChange={onValueChange} />
                            </td>
                          </tr>
    
                          <tr>
                            <td>Mode </td>
                            <td> Cash</td>
                            <td>
                              <label>
                                Select a Language:
                                <select value={selectValue} onChange={handleSelectChange} className='p-input'>
                                  <option value="">English</option>
                                  <option value="gu-t-i0-und">Gujarati</option>
                                  <option value="mr-t-i0-und">Marathi</option>
                                  <option value="sa-t-i0-und">Sanskrit</option>
                                </select>
                              </label>
                              <br /></td>
                          </tr>
    
                        </table>
                      </td>
    
                    </tr>
                  </table>
            <Button type='submit' variant='primary' >
              Save
            </Button>
          </Form>
          <Modal
            show={showInstruction}
            size='lg'
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={handelInstructionclose}
          >
            <Modal.Header closeButton>
              <Modal.Title>Diet chart instructions</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div id="instructions" style={{ padding: '15px 10px' }}>
                <div>
                  {/* <Button>Send Email</Button> */}
                </div>
                <dl>
                  <dt>What to take ? </dt>
                  <dd>
                    <ul>
                      {
                        dietCategories.map((category) => {
                          return <li>
                            {
                              dietArray?.filter((_) => { return _.diet.category == category && _.allowance == '1' })
                                .map((element) => element.diet.name).join(", ")
                            }
                          </li>
                        })
                      }
                    </ul>
                  </dd>
                  <dt>What to avoid ?</dt>
                  <dd>
                    <ul>
                      {
                        dietCategories.map((category) => {
                          return <li>
                            {
                              dietArray?.filter((_) => { return _.diet.category == category && _.allowance == '2' })
                                .map((element) => element.diet.name).join(", ")
    
                            }
                          </li>
                        })
                      }
                    </ul>
                  </dd>
                  <dt>Take occasionally.</dt>
                  <dd>
                    <ul>
                      {
                        dietCategories.map((category) => {
                          return <li>
                            {
                              dietArray?.filter((_) => { return _.diet.category == category && _.allowance == '3' })
                                .map((element) => element.diet.name).join(", ")
                            }
                          </li>
                        })
                      }
                    </ul>
                  </dd>
                  <dt>What to Do</dt>
                  <dd>
                    <ul>
                      {preDiet.wtodo}
                    </ul>
                  </dd>
                  <dt>What to Don't</dt>
                  <dd>
                    <ul>
                      {preDiet.wto_dont}
                    </ul>
                  </dd>
                </dl>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handelInstructionclose}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => generatePdf()}
              >
                Get pdf
              </Button>
            </Modal.Footer>
          </Modal>
        </>
    
      )
    }

export default PrescriptionWindow2