import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { getPatientDetail } from '../actions/prescriptionActions';
import { getUserInfoDetails } from '../actions/userActions'
import * as _ from 'lodash'
import dayjs from 'dayjs'
import jsPDF from 'jspdf'

const PrescriptionLists = () => {
  const dispatch = useDispatch();
  const isLogin = localStorage.getItem('isLogin');
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  // User(Patient)List
  const Patient = useSelector((state) => state.userInfoDetails)
  const { loadingUsers, errorUsers, users } = Patient;

  //Prescription API to fetch Prescription List
  const PatientPrescriptions = useSelector((state) => state.getPatientPrescriptionList)
  const { loadingp, errorp, patientPrescriptionData } = PatientPrescriptions;

  useEffect(() => {
    dispatch(getUserInfoDetails());
    dispatch(getPatientDetail());
  }, [dispatch])


  const userPrescriptions = patientPrescriptionData?.filter(prescription => prescription?.prescriptionUser === userInfo?._id);
  // console.log("Prescriptions for the logged-in user", userPrescriptions);
  const generatePDF = (prescription) => {
    generatePrecription(prescription)
  }

  const generatePrecription = (prescription) => {
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

    // Add patient details and prescription information
    doc.setFontSize(18);
    doc.setFont('bold');
    doc.text('Prescription', 210, 120);
    doc.setFontSize(12);
    doc.text(`Patient Name: ${userInfo?.name}`, 50, 180);

    // Add prescription details
    doc.text(`Prescription Days: ${prescription.prescriptiondays}`, 50, 200);
    doc.text(`Remark: ${prescription.Remark}`, 50, 220);

    // Add medicine data
    const rows = [];
    const data = prescription?.medicineData?.map((med, i) => {
      const medicine = prescription?.PatientMedicines?.find((pMed) => pMed?._id === med?.medicineDetails);
      const dose = medicine && medicine.dose ? medicine.dose : '';
      rows.push([i + 1, medicine?.medicineName || '', med?.dose]);
    });
    doc.autoTable({
      startY: 270,
      head: [['No', 'Medicine Name', 'Dose']],
      body: rows,
      theme: 'striped',
      headStyles: { fillColor: '#ccf9f5', textColor: '#444' },
      styles: { textColor: '#444' },
      columnStyles: {
        0: { fontStyle: 'bold' },
        1: { cellWidth: 'wrap' },
        2: { cellWidth: 'wrap' },
      }
    });

    // Save PDF
    doc.save(`prescription.pdf`);
  };


  return (
    <div style={{ marginTop: "50px" }}>
      PrescriptionLists
      <table className="striped bordered visiting" bordercolor="#6caaa8">
        <thead>
          <tr>
            <th>
              No
            </th>
            <th>
              Visit Date
            </th>
            <th> Prescription Days</th>
            <th>Remark</th>
            <th>Print</th>
          </tr>
        </thead>

        <tbody>
          {userPrescriptions?.map((v, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{dayjs(v.createdAt).format('DD/MM/YYYY')}</td>
                <td>{v.prescriptiondays}</td>
                <td>{v.Remark}</td>
                <td>
                  <Button onClick={() => generatePDF(v)}>
                    Print
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export default PrescriptionLists