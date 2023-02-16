import React, { useState, useEffect } from 'react'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';
import { Form, Button, Modal, ListGroup, InputGroup } from 'react-bootstrap'
import { getPrescription, getDietChartList } from '../actions/prescriptionActions'
import { useDispatch, useSelector } from 'react-redux'
import '../documentTab.css'
import jsPDF from 'jspdf'
import { DiechartList } from './DiechartList';


const DocumentTab = () => {
  const dispatch = useDispatch();

  //Prescription  Get API 
  const GetPrescription = useSelector((state) => state.getPrescriptionDetails)
  const { loading, error, prescriptionList } = GetPrescription;

  // console.log("prescription is", prescriptionList)
  //Diet Chart Get API Call
  const getDietDetails = useSelector((state) => state.getDietData)
  const { loadingDiet, errorDiet, DietList } = getDietDetails;

  useEffect(() => {
    dispatch(getDietChartList());
    dispatch(getPrescription());
  }, [dispatch])

  const dietCategories = [...new Set(DiechartList.map((item) => item.category))];

  const generatePdf = () => {
    var doc = new jsPDF('p', 'pt', 'a4');
    doc.html(document.getElementById("dietinstructions"), {
      callback: function (pdf) {
        pdf.save("DietChart.pdf");
      }
    })
  }
  const [showInstruction, setShowInstruction] = useState(false);
  const handelInstructionShow = (e) => {
    setShowInstruction(true)
  }
  const handelInstructionclose = (e) => {
    setShowInstruction(false)
  }


  return (
    <div>
      <Tab.Container id="left-tabs-example" defaultActiveKey="Image">
        <Row>
          <Col className='ms-3' sm={2}>

            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="Image">Image</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Video">Video</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Report">Report</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Diet Chart">Diet Chart</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={8}>
            <Tab.Content>

              {prescriptionList?.map((p) => (
                <>
                  <Tab.Pane eventKey="Image">
                    <div><h1>Image</h1>
                    <img src={p?.Image} /></div>
                    
                  </Tab.Pane>
                  <br />
                  <Tab.Pane eventKey="Video">
                    <div>
                    <h1>Video</h1>
                    <video src={p.Video} controls width="50%" height="50%">

                    </video>
                    </div>
                   
                    {/* <video width="300px" controls height="500px" src={p.Video}/> */}
                  </Tab.Pane>
                  <br />
                  <Tab.Pane eventKey="Report">
                    <h1></h1>
                    <a alt="StackExchange"
                      href={p.report}
                      download >
                      <img height={"80px"} src={"images/pdf-file.png"} />
                    </a>
                  </Tab.Pane>

                </>

              ))}
              {DietList?.map((d) => (
                <>
                  <Tab.Pane eventKey="Diet Chart" key={d.id}>
                    <div>
                      {/* dispaly the diet chart pdf */}

                      <Button onClick={handelInstructionShow}> Diet Chart Pdf</Button>
                      <Modal
                        show={showInstruction}
                        size='lg'
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        onHide={handelInstructionclose}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Diet chart instructions</Modal.Title>

                          <Button>Send Email</Button>

                        </Modal.Header>
                        <Modal.Body>

                          <div id="dietinstructions" style={{ padding: '15px 10px' }}>

                            <dl>
                              <dt>What to take ? </dt>
                              <dd>
                                <ul>
                                  {
                                    dietCategories.map((category) => {
                                      return <li>
                                        {
                                          DietList[0].pateientDietChart.filter((_) => { return _.diet.category == category && _.allowance == '1' })
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
                                    dietCategories?.map((category) => {
                                      return <li>
                                        {
                                          DietList[0].pateientDietChart.filter((_) => { return _.diet.category == category && _.allowance == '2' })
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
                                          DietList[0].pateientDietChart.filter((_) => { return _.diet.category == category && _.allowance == '3' })
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
                                  {DietList[0].wtodo}
                                </ul>
                              </dd>
                              <dt>What to Don't</dt>
                              <dd>
                                <ul>
                                  {DietList[0].wto_dont}
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
                    </div>
                  </Tab.Pane>
                </>))}
            </Tab.Content>

          </Col>
        </Row>
      </Tab.Container>
    </div>
  )
}

export default DocumentTab