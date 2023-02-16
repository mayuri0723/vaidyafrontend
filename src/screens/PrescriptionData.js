import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { getPatientDetail } from '../actions/prescriptionActions';
import { Form, Button, Card } from 'react-bootstrap'

const PrescriptionData = () => {
  const dispatch = useDispatch();

  //Prescription API to fetch Prescription List
  const OldPrescriptions = useSelector((state) => state.getPatientPrescriptionList)
  const { loadingp, errorp, patientPrescriptionData } = OldPrescriptions;

  const today = dayjs().format('YYYY-MM-DD');
  const filteredTodayData = patientPrescriptionData?.filter(item => dayjs(item.createdAt).isSame(today, 'day'));

  const uniquePatientData = Array.from(new Set(filteredTodayData?.map(items => items.Patient[0]._id))).map(id => {
    return filteredTodayData?.filter(dataItem => dataItem.Patient[0]._id === id)[0];
  });

  useEffect(() => {
    dispatch(getPatientDetail());
  }, [dispatch])

  return (
    <div style={{ marginTop: "4rem" }}>
      <Card>
        <Card.Body>
          <h6> Today's Prescribed Data</h6>
          <h6> </h6>
        </Card.Body>
      </Card>
      <div style={{overflowX:"auto"}}>
      <table className="striped bordered visiting" bordercolor="#6caaa8">
        <thead>
          <tr>
            <th>
              No
            </th>
            <th>
              Patient Name
            </th>
            <th>
              Date
            </th>
         
            <th>
              Medicines
            </th>
            {/* <th>
              Panchakrma
            </th> */}
          </tr>
        </thead>

        <tbody>
          {filteredTodayData?.map((v, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{
                  v.Patient?.map((patient, p) => {
                    return (
                      <li key={p}>
                        <p>
                          {patient.name}
                        </p>
                      </li>
                    )
                  })
                }</td>
                <td>{dayjs(v.createdAt).format('DD/MM/YYYY')}</td>
         
                <td> {v.medicineData.map((medicine, i) => {
                  return (
                    <li key={i}>
                      <p>Name: {v.PatientMedicines.find((el) => el._id === medicine.medicineDetails)?.medicineName}</p>
                      <p>Dose: {medicine.dose}</p>
                    </li>
                  );
                })}</td>
                {/* <td>
                  {v.panchkarma?.map(item => (
                    <li key={item.id}>name:{item.panchkarma_name},days:{item.panchkarma_days}</li>
                  ))}
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    

    </div>
  )
}

export default PrescriptionData