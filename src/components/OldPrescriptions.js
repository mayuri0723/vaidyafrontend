
import React, { useState, useEffect, useContext } from 'react'
import { getPatientDetail } from '../actions/prescriptionActions';
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import * as _ from 'lodash'
import CardGroup from 'react-bootstrap/CardGroup';
import { Col, Button, Row, Card, ListGroup } from 'react-bootstrap'
import '../oldPrescription.css'
import VisitingCalender from './VisitingCalender';



const OldPrescriptions = ({ patientIds }) => {
  const dispatch = useDispatch();
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [createdAtDates, setCreatedAtDates] = useState([]);
  const [patientDataPrescription, setPatientDataPrescription] = useState({
    createdAtDates: [],
    patientInfo: {}
  });

  const patientData = patientIds;
  const OldPrescriptions = useSelector((state) => state.getPatientPrescriptionList)
  const { loadingp, errorp, patientPrescriptionData } = OldPrescriptions;
  const PrescriptionDates = _.orderBy(patientPrescriptionData, [item => item.createdAt], ['desc']);

  useEffect(() => {
    dispatch(getPatientDetail());
  }, [dispatch])

  useEffect(() => {
    const patientId = patientData;
    const patientPrescriptions = PrescriptionDates?.filter(prescription => prescription.Patient[0]?._id === patientId);
    setPatientDataPrescription({
      createdAtDates: patientPrescriptions?.map(prescription => prescription.createdAt),
      patientInfo: {
        name: patientPrescriptions[0]?.Patient[0]?.name,
        weight: patientPrescriptions[0]?.Patient[0]?.weight,
        age: patientPrescriptions[0]?.Patient[0]?.age,
        gender: patientPrescriptions[0]?.Patient[0]?.gender,
      }
    });

  }, [patientData]);

  const patientId = patientData;
  const patientPrescriptions = PrescriptionDates?.filter(prescription => prescription.Patient[0]?._id === patientId);
  const visits = patientDataPrescription.createdAtDates?.map((date) => {
    const prescriptionD = patientPrescriptions?.filter(p => p.createdAt === date);
    const newMedicineData = prescriptionD[0]?.medicineData.map((v) => {
      const p = prescriptionD[0]?.PatientMedicines.find(e => e?._id === v.medicineDetails)
      return { ...v, medicineData: p }
    })
    return {
      visitDate: dayjs(date).format('DD/MM/YYYY'),
      medicinePrescribed: newMedicineData,
      symptomObserved: prescriptionD[0]?.Symptoms
    };
  });


  const handleDateClick = (visit) => {
    setSelectedVisit(visit);

  };

  return (
    <div>

      <div className="card">
        <div className="card-body">
          <div className="col">
            <h5>Patient Details</h5>
            <h6> Patient Name: {patientDataPrescription.patientInfo?.name}</h6>
            <h6>Weight: {patientDataPrescription.patientInfo?.weight}</h6>
            {/* <h6>Sex: {patientDataPrescription.patientInfo.gender}</h6> */}
          </div>
        </div>
      </div>

      <CardGroup>
        <div className="date-card-container">
          <Card>
            <Card.Header>Visit Dates</Card.Header>
            <ListGroup variant="flush">
              {visits.map((visit, index) => (
                <ListGroup.Item key={index} onClick={() => handleDateClick(visit)}>
                  {visit.visitDate}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
          {selectedVisit && (
            <div className="symptoms-medicines-container">
              <Card className="symptoms-medicines-card">
                <Card.Header>Symptoms</Card.Header>
                <ListGroup variant="flush">
                  {selectedVisit.symptomObserved?.map((symptom, index) => (
                    <ListGroup.Item key={index}>{symptom}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
              <Card className="symptoms-medicines-card">
                <Card.Header>Medicines</Card.Header>
                <ListGroup variant="flush">
                  {selectedVisit.medicinePrescribed?.map((medicine, index) => (
                    <ListGroup.Item key={index}>
                      {medicine.medicineData?.medicineName} ({medicine?.dose})
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            </div>
          )}
        </div>
      </CardGroup>
      <div style={{ display: "none" }}>
        <VisitingCalender patientId={patientIds} />
      </div>

    </div>
  )
}

export default OldPrescriptions