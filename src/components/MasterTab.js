import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DocumentTab from './DocumentTab';
import PrescriptionWindow2 from './PrescriptionWindow2';
import TabComponent from './TabComponent';



const MasterTab = () => {
  const [key, setKey] = useState('basic detail');

  return (
    <div style={{ marginTop: "4rem" }}>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="basic detail" title="Basic Detail">
          <TabComponent />
        </Tab>
        <Tab eventKey="prescription" title="Prescription">
          <PrescriptionWindow2 />
        </Tab>
        {/* <Tab eventKey="document" title="Documents">
         <DocumentTab/>
          </Tab> */}
      </Tabs>
    </div>
  )
}

export default MasterTab