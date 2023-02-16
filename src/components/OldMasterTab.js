import React, { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import OldPatientTab from './OldPatientTab';
import ViewDetailTab from './ViewDetailTab';
import VisitingCalender from './VisitingCalender';
import BillHistoryTab from './BillHistoryTab';
import OldPrescriptions from './OldPrescriptions';

const OldMasterTab = () => {
  const [key, setKey] = useState('oldPatient')
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [isSelectedTab, setIsSelectedTab] = useState(false);

  const SetTab = (tabkey) => {
    if ((tabkey === "oldprescription" || tabkey === "oldTherapy" || tabkey === "oldinquiry"
      || tabkey === "patientvisit" || tabkey === "Bill" || tabkey === "view" || tabkey === "oldPatient")
      && selectedPatientId !== null) {
      setKey(tabkey);
      setIsSelectedTab(false);
    }
    else {
      alert("Please select a Patient");
    }
  }

  const choosePatient = (oldPatient) => {
    setSelectedPatientId(oldPatient);
    setIsSelectedTab(true);
  };

  useEffect(() => {
    if (isSelectedTab) {
      SetTab("oldprescription")
    }
  }, [isSelectedTab])




  return (
    <div style={{ marginTop: "4rem" }}>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => SetTab(k)}
        className="mb-3"
      >
        <Tab eventKey="oldPatient" title="Patient">
          <OldPatientTab choosePatient={choosePatient} />
        </Tab>
        <Tab eventKey="oldprescription" title="Prescription">
          <OldPrescriptions patientIds={selectedPatientId} />
        </Tab>
        {/* <Tab eventKey="oldTherapy" title="Therapy">

        </Tab>
        <Tab eventKey="oldinquiry" title="Inquiry">

        </Tab> */}
        <Tab eventKey="patientvisit" title="Visiting Calender">
          <VisitingCalender patientId={selectedPatientId} />
        </Tab>
        <Tab eventKey="Bill" title="Bill history">
          <BillHistoryTab PatientId={selectedPatientId} />
        </Tab>
        {/* <Tab eventKey="view" title="View">
          <ViewDetailTab PatientIds={selectedPatientId} />
        </Tab> */}
      </Tabs>
    </div>
  )
}

export default OldMasterTab