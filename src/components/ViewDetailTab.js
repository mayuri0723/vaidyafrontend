import React, { useState, useEffect } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getPatientDetail } from '../actions/prescriptionActions';
import * as _ from 'lodash'
import dayjs from 'dayjs'

const ViewDetailTab = ({ PatientIds }) => {
  const dispatch = useDispatch();

  //Prescription API to fetch Prescription List
  const OldPrescriptions = useSelector((state) => state.getPatientPrescriptionList)
  const { loadingp, errorp, patientPrescriptionData } = OldPrescriptions;


  const PrescriptionVisitData = _.orderBy(patientPrescriptionData, [item => item.createdAt], ['desc']);

  // filter visits based on patientId

  const filteredView = PrescriptionVisitData?.filter(visit => visit.prescriptionUser === PatientIds);
  // console.log("filteredView", filteredView)

  return (
    <div style={{ marginTop: "3rem" }}>

      <div className="card">
        <div className="card-body">
          <div className="col">
            <h6> Patient Name:{filteredView[0]?.Patient[0].name}</h6>
            <h6>Weight:{filteredView[0]?.Patient[0].weight} </h6>
            <h6>Age:{filteredView[0]?.Patient[0].age} </h6>
            <h6>Address:{filteredView[0]?.Patient[0].address} </h6>
            <h6>Reference:{filteredView[0]?.Patient[0].reference} </h6>
          </div>
        </div>
      </div>



      {filteredView?.map((v, index) => {
        return (
          <Row key={index}>
            <Col>
              {/* {index + 1} */}
              <h2 style={{fontWeight:"bold", color:"#357e7c"}}>{dayjs(v.createdAt).format('DD/MM/YYYY')}</h2>
            </Col>
            <table className="table table-borderless" bordercolor="#6caaa8" style={{ backgroundColor: "aliceblue" }}>
              <tr>
                {/* <td>
                  <Card style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>Ayurveda</Card.Title>
                      <Card.Text>
                        Ayurveda:{v.ayurveda}
                        <br />
                        Modern Diagnosis:{v.mDiagnosis}
                        <br />
                        Modern System:{v.modernSystem}
                        <br />
                        Treatment:{v.prescriptionTreatment}-{v.treatmentdays}

                      </Card.Text>

                    </Card.Body>
                  </Card>
                </td> */}
                <td>
                  <Card style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>Diet Chart</Card.Title>

                      <Card.Text>
                        <h6>What to take ? </h6>

                          <span>   {v.Diet_Chart[0].pateientDietChart.filter((e) => e.allowance === '1')?.map((ele) => {
                            return ele.diet.name
                          })}</span>

                       
                        <h6>What to avoid ?  </h6>
                          {v.Diet_Chart[0].pateientDietChart.filter((e) => e.allowance === '2')?.map((ele) => {
                            return ele.diet.name
                          })}
                      
                        <h6>take Ocassionaly </h6>
                          {v.Diet_Chart[0].pateientDietChart.filter((e) => e.allowance === '3')?.map((ele) => {
                            return ele.diet.name
                          })}
                       
                        <h6>What to Do</h6>
                        <span>  {v.Diet_Chart[0].wtodo}</span>
                        <h6>What to Don't </h6>
                        <span> {v.Diet_Chart[0].wto_dont}</span>

                      </Card.Text>

                    </Card.Body>
                  </Card>
                </td>

              </tr>

              <tr>
                <td>
                  <Card style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>Symptoms</Card.Title>
                      <Card.Text>
                        {v.Symptoms.join(',')}
                      </Card.Text>

                    </Card.Body>
                  </Card>
                </td>

                <td>
                  <Card style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>Medicines</Card.Title>
                      <ul>
                        {v.medicineData.map((medicine, i) => {
                          return (
                            <li key={i}>
                              <p>Name: {v.PatientMedicines.find((el)=> el._id === medicine.medicineDetails)?.medicineName}</p>
                              <p>Dose: {medicine.dose}</p>
                            </li>
                          );
                        })}
                      </ul>

                      <Card.Text>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </td>
              </tr>

            </table>
          </Row>
        );


      })}


    </div>
  )
}

export default ViewDetailTab