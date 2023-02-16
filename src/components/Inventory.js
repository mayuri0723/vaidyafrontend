import React, { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ClinicalStock from './ClinicalStock';
import CompanyStock from './CompanyStock';
import InventoryBill from './InventoryBill';
import NewMedicine from './NewMedicine';

const Inventory = () => {
  const [key, setKey] = useState('clinicalStock')
  return (
    <div style={{ marginTop: "4rem" }}>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="clinicalStock" title="Clinical Stock">
          <ClinicalStock />
        </Tab>
        <Tab eventKey="companyStock" title="Company Stock">
          <CompanyStock />
        </Tab>
        <Tab eventKey="newMedicine" title="New Medicine">
          <NewMedicine />
        </Tab>

        <Tab eventKey="inventorybill" title="Bill History">
          <InventoryBill />
        </Tab>

      </Tabs>
    </div>
  )
}

export default Inventory