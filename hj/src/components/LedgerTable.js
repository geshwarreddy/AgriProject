import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import "../styles/LedgerTable.css";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
const LedgerTable = () => {
  const [ledgerData, setLedgerData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [newReport, setNewReport] = useState({
    timestamp: new Date(),
    pH: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    organicCarbon: '',
    moistureLevel: '',
    microbialCount: '',
    enzymeActivity: '',
    soilComposition: {
      sand: '',
      clay: '',
      loam: '',
    },
  });
  const [selectedLedger, setSelectedLedger] = useState(null);
  const navigate = useNavigate();
  const {role} =JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/ledgers");
        console.log(response);
        const data = await response.json();
        console.log(data);
        setLedgerData(data);
      } catch (error) {
        console.error("Error fetching ledger data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSuggestionClick = (id) => {
    navigate(`/suggestion-form/${id}`);
  };
  const handleAddReportClick = (ledger) => {
    setSelectedLedger(ledger);
    setVisible(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReport((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!selectedLedger) return;

    const updatedLedger = {
      ...selectedLedger,
      soilTests: [...selectedLedger.soilTests, newReport],
    };

    try {
      const response = await fetch(`http://localhost:3001/api/ledgers/${selectedLedger._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedLedger),
      });

      if (response.ok) {
        const updatedData = ledgerData.map((ledger) =>
          ledger._id === selectedLedger._id ? updatedLedger : ledger
        );
        setLedgerData(updatedData);
        setVisible(false);
        setNewReport({
          timestamp: new Date(),
          pH: '',
          nitrogen: '',
          phosphorus: '',
          potassium: '',
          organicCarbon: '',
          moistureLevel: '',
          microbialCount: '',
          enzymeActivity: '',
          soilComposition: {
            sand: '',
            clay: '',
            loam: '',
          },
        });
      } else {
        console.error("Failed to update ledger");
      }
    } catch (error) {
      console.error("Error updating ledger:", error);
    }
  };

  return (
    <main className="ledger-main">
      <h1 id="ledger-table-heading">Farmer Soil Reports</h1>
      <div className="ledger-table-container">
        <table className="ledger-table">
          <thead>
            <tr>
              <th>Farmer Name</th>
              <th>Pincode</th>
              <th>Aadhar Number</th>
              <th>Contact Number</th>
              <th>Area Ploughed</th>
              <th>Season</th>
              <th>Crop Grown</th>
              <th>Seeds Used</th>
              <th>Seed Sown Date</th>
              <th>Transplanting</th>
              <th>Irrigation Method</th>
              <th>Fertilizers Used</th>
              <th>Harvesting Date</th>
              <th>Yield</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ledgerData.map((ledger) => (
              <tr key={ledger._id}>
                <td>{ledger.farmerName}</td>
                <td>{ledger.pincode}</td>
                <td>{ledger.aadharNumber}</td>
                <td>{ledger.contactNumber}</td>
                <td>{ledger.areaPloughed}</td>
                <td>{ledger.season}</td>
                <td>{ledger.cropGrown}</td>
                <td>{ledger.seedsUsed}</td>
                <td>{new Date(ledger.seedSownDate).toLocaleDateString()}</td>
                <td>{ledger.transplanting}</td>
                <td>{ledger.irrigationMethod}</td>
                <td>{ledger.fertilizersUsed}</td>
                <td>{new Date(ledger.harvestingDate).toLocaleDateString()}</td>
                <td>{ledger.yield}</td>
                <td>
                  <button onClick={() => handleSuggestionClick(ledger._id)} className="give-sug-btn">
                    Give Suggestions
                  </button>
                 { role==="expert"&&<button onClick={() => handleAddReportClick(ledger)} className="give-sug-btn">
                    Add Soil Reports
                  </button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog
        header="Add Soil Test Report"
        visible={visible}
        style={{ width: '50vw' }}
        onHide={() => setVisible(false)}
      >
      <div>
          <label>pH:</label>
          <InputNumber 
            value={newReport.pH} 
            onValueChange={(e) => setNewReport((prev) => ({ ...prev, pH: e.value }))} 
            placeholder="Normal: 6.5 - 7.5" 
            min={0} 
            max={14} 
          />
          <label>Nitrogen:</label>
          <InputNumber 
            value={newReport.nitrogen} 
            onValueChange={(e) => setNewReport((prev) => ({ ...prev, nitrogen: e.value }))} 
            placeholder="Normal: 0.1 - 0.5" 
            min={0} 
          />
          <label>Phosphorus:</label>
          <InputNumber 
            value={newReport.phosphorus} 
            onValueChange={(e) => setNewReport((prev) => ({ ...prev, phosphorus: e.value }))} 
            placeholder="Normal: 10 - 20" 
            min={0} 
          />
          <label>Potassium:</label>
          <InputNumber 
            value={newReport.potassium} 
            onValueChange={(e) => setNewReport((prev) => ({ ...prev, potassium: e.value }))} 
            placeholder="Normal: 100 - 300" 
            min={0} 
          />
          <label>Organic Carbon:</label>
          <InputNumber 
            value={newReport.organicCarbon} 
            onValueChange={(e) => setNewReport((prev) => ({ ...prev, organicCarbon: e.value }))} 
            placeholder="Normal: 0.5 - 1.5" 
            min={0} 
          />
          <label>Moisture Level:</label>
          <InputNumber 
            value={newReport.moistureLevel} 
            onValueChange={(e) => setNewReport((prev) => ({ ...prev, moistureLevel: e.value }))} 
            placeholder="Normal: 20 - 40" 
            min={0} 
          />
          <label>Microbial Count:</label>
          <InputNumber 
            value={newReport.microbialCount} 
            onValueChange={(e) => setNewReport((prev) => ({ ...prev, microbialCount: e.value }))} 
            placeholder="Normal: 10,000 - 100,000" 
            min={0} 
          />
          <label>Enzyme Activity:</label>
          <InputNumber 
            value={newReport.enzymeActivity} 
            onValueChange={(e) => setNewReport((prev) => ({ ...prev, enzymeActivity: e.value }))} 
            placeholder="Normal: 10 - 50" 
            min={0} 
          />
          <label>Soil Composition (Sand):</label>
          <InputNumber 
            value={newReport.soilComposition.sand} 
            onValueChange={(e) => setNewReport((prev) => ({
              ...prev,
              soilComposition: { ...prev.soilComposition, sand: e.value }
            }))} 
            placeholder="Normal: 0 - 100" 
            min={0} 
            max={100} 
          />
          <label>Soil Composition (Clay):</label>
          <InputNumber 
            value={newReport.soilComposition.clay} 
            onValueChange={(e) => setNewReport((prev) => ({
              ...prev,
              soilComposition: { ...prev.soilComposition, clay: e.value }
            }))} 
            placeholder="Normal: 0 - 100" 
            min={0} 
            max={100} 
          />
          <label>Soil Composition (Loam):</label>
          <InputNumber 
            value={newReport.soilComposition.loam} 
            onValueChange={(e) => setNewReport((prev) => ({
              ...prev,
              soilComposition: { ...prev.soilComposition, loam: e.value }
            }))} 
            placeholder="Normal: 0 - 100" 
            min={0} 
            max={100} 
          />
          <Button label="Submit" onClick={handleSubmit} />
        </div>
      </Dialog>

    </main>
  );
};

export default LedgerTable;
