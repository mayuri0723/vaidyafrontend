import React, { useState, useEffect } from 'react'
import {Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import '../visitingcalender.css'
import * as _ from 'lodash'
import { getPatientDetail } from '../actions/prescriptionActions';
import BillHistoryTab from './BillHistoryTab'
import dayjs from 'dayjs'


const VisitingCalender = ({ patientId }) => {
  const dispatch = useDispatch();
  // console.log("visit", patientId)
  // const [patientVisits, setPatientVisits] = useState({
  //    patientInfoDetail:{}
  // })

  const OldPrescriptions = useSelector((state) => state.getPatientPrescriptionList)
  const { loadingp, errorp, patientPrescriptionData } = OldPrescriptions;

  const PrescriptionVisitData1 = _.orderBy(patientPrescriptionData, [item => item.createdAt], ['desc']);

  // filter visits based on patientId
  const filteredVisits = PrescriptionVisitData1?.filter(visit => visit.prescriptionUser === patientId);
  // console.log("visitcalender", filteredVisits)

  useEffect(() => {
    dispatch(getPatientDetail());
  }, [dispatch])


  return (
    <div>
      <Card>
        <Card.Body>
          <h6> Patient Name:{filteredVisits[0]?.Patient[0].name}</h6>
          <h6>Weight:{filteredVisits[0]?.Patient[0].weight} </h6>
        </Card.Body>
      </Card>
      <table className="striped bordered visiting" bordercolor="#6caaa8">
        <thead>
          <tr>
            <th>
             No
            </th>
            <th>
              Visit Date
              </th>
            {/* <th>Next Visit</th> */}
            <th> Prescription Days</th>
            {/* <th> Lapse Days</th> */}
            <th>Remark</th>

          </tr>
        </thead>

        <tbody>
          {filteredVisits?.map((v, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{dayjs(v.createdAt).format('DD/MM/YYYY')}</td>
                {/* <td></td> */}
                 <td>{v.prescriptiondays}</td>
                <td>{v.Remark}</td> 
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ display: "none" }}>
        <BillHistoryTab PatientId={patientId} />
      </div>
    </div>
  )
}

export default VisitingCalender