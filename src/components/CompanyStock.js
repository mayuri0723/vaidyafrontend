import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMedicines } from '../actions/prescriptionActions'
import '../clinical.css'

const CompanyStock = () => {
  const dispatch = useDispatch();
  const allMedicines = useSelector((state) => state.getallMedicineList)
  const { loadingMedicine, errorMedicine, medicinesList } = allMedicines;
  // console.log("Medicine List", medicinesList)

  useEffect(() => {
    dispatch(getMedicines());
  }, [dispatch])

  return (
    <div>
      <table className="clinical">
        <thead>
          <tr>
            <th>
              <h4>Medicine Name</h4>
            </th>
            <th>
              <h4>Company Name</h4>
            </th>
            <th colspan={2}> <h4>Current Stock</h4></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {medicinesList?.map((m) => {
            return (
              <tr>
                <td>{m.medicineName}</td>
                <td>{m.supplierName}</td>
                <td colspan={2}>{m.Qty}</td>
                <td>Add Stock</td>
              </tr>
            )

          })}


        </tbody>
      </table>
    </div>
  )
}

export default CompanyStock