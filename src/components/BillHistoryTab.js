import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import * as _ from 'lodash'
import dayjs from 'dayjs'
import { getPatientDetail } from '../actions/prescriptionActions';
import { useDispatch, useSelector } from 'react-redux'

const BillHistoryTab = ({ PatientId }) => {
    const dispatch = useDispatch();


    const OldPrescriptions = useSelector((state) => state.getPatientPrescriptionList)
    const { loadingp, errorp, patientPrescriptionData } = OldPrescriptions;

    const PrescriptionVisitData = _.orderBy(patientPrescriptionData, [item => item.createdAt], ['desc']);
    // console.log("PrescriptionVisitData", PrescriptionVisitData);

    const filterbill = PrescriptionVisitData?.filter(visit => visit.prescriptionUser === PatientId);

    
    let Total = 0;
    let Paid =0;
    filterbill.map((bill) =>  {
        bill.payment?.Debit_Credit? Total += bill.payment?.Debit_Credit: Total += 0
        bill.payment?.paid? Paid += bill.payment?.paid: Paid += 0
    })


    return (
        <div>
            <Card>
                <Card.Body>
                  <h6>Patient Name:{filterbill[0]?.Patient[0].name}</h6>  
                    </Card.Body>
            </Card>
            <table className="striped bordered visiting" bordercolor="#1d4e4a">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Visit Date</th>
                        <th>Consulting</th>
                        <th>Medicine</th>
                        <th>Total</th>
                        <th>Paid</th>
                    </tr>
                </thead>
                <tbody>

                    {filterbill?.map((v, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{dayjs(v.createdAt).format('DD/MM/YYYY')}</td>
                                <td>{v.payment?.Consulting}</td>
                                <td>{v.payment?.medicine}</td>
                                <td>{v.payment?.Debit_Credit}</td>
                                <td>{v.payment?.paid}</td>
                               
                            </tr>
                        );
                    })}
                    <tr>
                        <td>Total</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{Total}</td>
                        <td>{Paid}</td>


                    </tr>

                </tbody>
            </table>
        </div>
    )
}

export default BillHistoryTab