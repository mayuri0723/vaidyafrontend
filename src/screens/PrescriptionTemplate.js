import React, { useState } from 'react'
import "../trial.css"
import jsPDF from "jspdf";
import "jspdf-autotable";

const PrescriptionTemplate = (inputFields) => {

    // console.log("Success Prescription Template",inputFields)
    //     doc.save('Prescription.pdf')
    const data = []
    // inputFields.forEach((a)=>{
    //     data.push(Object.values(a));
    // })
    const [head] = React.useState(["Drug", "Daily Dose", "Duration", "Instruction"]);
    const [body] = React.useState(data);

    
    const generatePDF = () => {
        let doc = new jsPDF("p", "pt", "a4");

        doc.setFont("Calibri", "bold");
        doc.setFontSize(14);
        doc.setTextColor(14, 3, 64);

        //   doc.text("Prescription", 20, 140);
        doc.text("Octonyan loves jsPDF", 25, 10);
        doc.addImage("/images/mindvein.png", "PNG", 20, 60, 140, 74);
        doc.text("Doctor's Name", 520, 135, null, null, "right");
        // doc.addImage("/images/mindvein.png", "PNG", X-axis, Y-asis, width, height);
        doc.line(20, 142, 550, 142);
        doc.text("Prescription", 20, 190);

        //   doc.text("Table 2", 20, 300);
        //   doc.line(20, 302, 550, 302);

        doc.autoTable({
            margin: { top: 250, left: 20, bottom: 30 },
            head: [head],
            body: [body[0], body[1], body[2]],
        });

        //   doc.autoTable({
        //     margin: { top: 400, left: 20, bottom: 30 },
        //     head: [head],
        //     body: [body[0], body[1], body[2], body[3], body[4]],
        //   });

        window.open(doc.output("bloburl"), "_blank");

    }

    return (
        <div style={{ marginTop: "10rem" }}>
            <button onClick={generatePDF} type="primary">Download PDF</button>
        </div>

    )
}

export default PrescriptionTemplate