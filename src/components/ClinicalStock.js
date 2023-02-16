import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMedicines } from '../actions/prescriptionActions'
import '../clinical.css'
import { Button } from 'react-bootstrap'

const ClinicalStock = () => {
    const dispatch = useDispatch();
    const [selectedRow, setSelectedRow] = useState(null);

    const allMedicines = useSelector((state) => state.getallMedicineList)
    const { loadingMedicine, errorMedicine, medicinesList } = allMedicines;
    // console.log("Medicine List", medicinesList)


    const handleAdd = (index) => {
        setSelectedRow(index);
    }

    const handleRemove = (index) => {
        setSelectedRow(null);
    }


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
                    {medicinesList?.map((m,index) => {
                        return (
                            <tr>
                                <td>{m.medicineName}</td>
                                <td>{m.supplierName}</td>
                                <td colspan={2}>{m.Qty}</td>
                                <td>

                                    {index === selectedRow &&
                                        <div>
                                            <input className='clinic-input' placeholder='Unit'/>
                                            <input className='clinic-input' placeholder='Gram' />
                                            <Button>Done</Button>
                                            <Button onClick={() => handleRemove(index)}>Remove</Button>
                                        </div>
                                    }
                                    <Button onClick={() => handleAdd(index)}>Add Stock</Button>

                                </td>
                            </tr>
                        )

                    })}


                </tbody>
            </table>
        </div>
    )
}

export default ClinicalStock