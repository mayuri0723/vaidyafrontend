
import React, { useState, useEffect } from 'react'
import { Form, Button, Modal, InputGroup, Card } from 'react-bootstrap'
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
    image: "",
    video: "",
    report: "",
    payment: {},
    Remark: "",
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

        let mainPrescription = {
          prescriptionUser: patient?._id,
          Symptoms: symptomList,
          diet_chart: response._id,
          medicineData: medicineAndDoseArray,
          Image: imagefile,
          Video: videofile,
          report: reportfile,
          payment: inputVal,
          prescriptiondays: prescription.prescriptiondays,
          Remark: prescription.Remark

        }
        console.log(mainPrescription)
        dispatch(addPrescriptionUser(mainPrescription))
        .then(() => {
          // Call the generatePrecription function after saving the data

          generatePrecription();
        });

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

  //select langauage
  const handleSelectChange = (event) => {
    setSelectValue(event.target.value);
  };
  const onSymptomChange = (event) => {
    setTranslateInputValue(event.target.value);
  };
  React.useEffect(() => {
    googleTransliterate(request, translateinputValue, selectValue, maxResult).then(
      function (response) {
        setTranslatedValue(response[0][0]);
      }
    );
  }, [translateinputValue]);

  //add symptoms
  const addSymptomArray = () => {
    setTranslateInputValue('');
    if (selectValue === "") {

      setSymptomList(prevItems => prevItems.concat(document.getElementById("lan").value));
      return
    }
    setSymptomList(prevItems => prevItems.concat(document.getElementById("translatedvalue").value));
  }
  //remove symptoms
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

  //remove field of medicines
  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1)
    setInputFields(data)
  }

  //payment{} states
  const [inputVal, setInputVal] = useState({
    Consulting: "",
    medicine: "",
    paid: "",
    Debit_Credit: "",
    discount: "",
    paymentmode: "",
    paymentRemark: "",

  });
  const updateInputVal = (pairs) =>
    setInputVal((prevInputVal) => ({ ...prevInputVal, ...pairs }));

  const onValueChange = (event) => {
    const { name, value } = event.target;
    if (name === "Consulting") {
      const newPaid = Number(value) + Number(inputVal.medicine);
      updateInputVal({ paid: newPaid });
    }
    else if (name === "medicine") {
      const newPaid = Number(value) + Number(inputVal.Consulting);
      updateInputVal({ paid: newPaid });
    }
    else if (name === "discount") {
      const newPaid = Number(inputVal.paid) - Number(value);
      updateInputVal({ Debit_Credit: newPaid });
    }
    else if (name === "paymentmode") {
      updateInputVal({ paymentmode: value });
    }
    else if (name === "paymentRemark") {
      updateInputVal({ paymentRemark: value });
    }
    updateInputVal({ [name]: value });


  };

  // Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
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

  //diet array 
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

  //pdf of precription
  const generatePrecription = () => {
    // Create a new PDF document
    const doc = new jsPDF('p', 'pt', 'a4');

    // Set background color for header section
    doc.setFillColor('#ccf9f5');
    doc.rect(0, 0, doc.internal.pageSize.width, 80, 'F');

    // Add logo
    const image = new Image();
    image.src = 'images/vaidya-logo-preview.png';
    doc.addImage(image, 'PNG', doc.internal.pageSize.width - 600, 10, 190, 100);

    // Add doctor name, phone number, and clinic address
    doc.setFontSize(10);
    doc.setTextColor('#444');
    doc.text('Doctor Name:', 400, 25);
    doc.setFont('bold');
    doc.text('DR.Meghhaa', 470, 25);
    doc.setFont('normal');
    doc.text('Phone Number:', 400, 40);
    doc.setFont('bold');
    doc.text('9175569131', 470, 40);
    doc.setFont('normal');
    doc.text('Clinic Address:', 400, 50);
    doc.setFont('bold');
    doc.text('Awadh Pride, 2nd Floor,', 470, 50);
    doc.text(' Metro Pillar no. Opposite 139,', 400, 60)
    doc.text('Nirant Chowk, Vastral, Ahmedabad-18', 400, 70);

    // Add patient details
    doc.setFontSize(18);
    doc.setFont('bold');
    doc.text('Prescription', 210, 120);
    doc.setFontSize(12);
    doc.text(`Patient Name: ${patient?.name}`, 50, 180);
    doc.text(`Prescription Days: ${prescription.prescriptiondays}`, 50, 200);
    doc.text(`Remark: ${prescription.Remark}`, 50, 220);

    // Add table for medicine details
    const rows = [];
    inputFields.forEach((input, index) => {
      const medicineName = input.med.medicineName;
      const dose = input.dose;
      const symptoms = prescription.symptomList;
      rows.push([`Medicine ${index + 1}`, medicineName, dose]);
    });

    doc.autoTable({
      startY: 250,
      head: [['', 'Medicine Name', 'Dose']],
      body: rows,
      theme: 'striped',
      headStyles: { fillColor: '#ccf9f5', textColor: '#444' },
      styles: { textColor: '#444' },
      columnStyles: {
        0: { fontStyle: 'bold' },
        1: { cellWidth: 'wrap' },
        2: { cellWidth: 'wrap' },
        3: { cellWidth: 'auto' }
      }
    });
    doc.save('prescription.pdf');

  }

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
            sx={{
              "& fieldset": { border: 'none' },
            }}
            freeSolo
            options={users}
            style={{
              width: 150,
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
              <label>
                Select a Language:
                <select value={selectValue} onChange={handleSelectChange} className='p-input'>
                  <option value="">English</option>
                  <option value="gu-t-i0-und">Gujarati</option>
                  <option value="mr-t-i0-und">Marathi</option>
                  <option value="sa-t-i0-und">Sanskrit</option>
                </select>
              </label>
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
            <div className="col">
              <input type="text" className='d-input' placeholder="00"
                value={prescription.prescriptiondays}
                onChange={(e) => setPrescription({ ...prescription, prescriptiondays: e.target.value })}
              />
              <h5 align="center" style={{ fontWeiight: "300", margin: "-25px 62px 0 0" }}> Prescription Days</h5>
            </div>
          </div>
        </div>
      </div>


      <Form onSubmit={submitHandler}>
        {/* table Starts */}
        <table id="pdf-content" className="table table-borderless" bordercolor="black">
          <tbody>
            <tr>
              <td style={{ borderRight: "1px solid " }}>
                {symptomList.map(item => (
                  <div key={item}>
                    {item}
                    <button onClick={() => removeSymptomArray(item)}>Remove</button>
                  </div>
                ))}
                <input id="translatedvalue" className='p-input' value={translatedValue} type="hidden" />

                {/* remark tag */}
                <div>
                  <Icon baseClassName="fas" className="fa-plus-circle" fontSize="small" onClick={togglePopup} />
                  {isOpen && <input className='popup-box'
                    content={<>
                      <b>Remark</b>
                    </>}
                    value={prescription.Remark}
                    onChange={(e) => setPrescription({ ...prescription, Remark: e.target.value })}
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
                          <input id={'d' + index} className='partitioned' type="text" placeholder='Dose' name='dose' maxLength="4" onChange={updateDose} />
                          <Button variant="contained"
                            onClick={() => removeFields(index)}
                          >  <DeleteIcon fontSize='medium' />  </Button>
                        </div>
                      </div>

                    </div>
                  )
                })}
              </td>
              <td>
              </td>
              <td style={{ width: "40%" }}>
              </td>
            </tr>
          </tbody>

        </table>
        {/* table End */}
        {/* payment table Starts */}
        <table cellSpacing="5px" cellPadding="5%" align="center" style={{ margin: "0 0 0" }} >
          <tbody>
            <tr>
              <td colSpan={'2'}>
                <h1 style={{margin: "8px 0 8px -71px"}}>Payment Section</h1>
                <table className="table table-bordered border-primary" border={"1px"} style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td>Payment
                      </td>
                      <td> Rupee</td>
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

                    </tr>
                    <tr>
                      <td> Debit</td>
                      <td>
                        <input
                          className='p-input'
                          type="text"
                          name="Debit_Credit"
                          value={inputVal.Debit_Credit}
                          onChange={onValueChange} readOnly />
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
                      <td>Mode of Payment</td>
                      <td>
                        <label>
                          select
                          <select
                            name="paymentmode"
                            value={inputVal.paymentmode}
                            onChange={onValueChange}
                            className='p-input'
                          >
                            <option value="Cash">Cash</option>
                            <option value="Online">Online</option>
                            <option value="Card Payment">Card Payment</option>
                          </select>
                        </label>
                        <br /></td>
                    </tr>
                    {/* Payment Remark */}
                    <tr>
                      <td colSpan={2}>
                        <div>
                          <Icon baseClassName="fas" className="fa-plus-circle" fontSize="small" onClick={togglePopup} />
                          {isOpen &&
                            <input className='popup-box'
                              content={<>  <b> Payment Remark</b> </>}
                              name="paymentRemark"
                              value={inputVal.paymentRemark}
                              onChange={onValueChange}
                            // handleClose={togglePopup}
                            />}
                        </div>
                      </td>

                    </tr>
                  </tbody>
                </table>
              </td>
              <td>

                <table border="1px" bordercolor="black" cellSpacing="5px" cellPadding="5%" align="center" style={{ margin: "-228px 0 0 0" }}>
                  <tbody>
                    <tr>
                      <td colSpan={'2'}>
                        <table className="table table-bordered border-primary" border={"1px"} style={{ width: "100%" }}>
                          <tbody>
                            <tr>


                              <td style={{ width: "30%" }}>Document</td>

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
                          </tbody>
                        </table>
                      </td>

                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>

        </table>

        {/* table End */}
        <div className='prebutton'>
          <Button type='submit' variant='primary'>
            Save
          </Button>
          {/* <Button
            variant='primary'
            onClick={() => generatePrecription()}
          >
            Print
          </Button> */}
        </div>

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