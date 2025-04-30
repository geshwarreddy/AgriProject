// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import "../styles/SuggestionForm.css";

// // const SuggestionForm = () => {
// //   const { id } = useParams();
// //   const [ledger, setLedger] = useState(null);
// //   const [suggestion, setSuggestion] = useState("");

// //   useEffect(() => {
// //     const fetchLedger = async () => {
// //       try {
// //         const response = await fetch(`http://localhost:3001/api/ledgers/${id}`);
// //         const data = await response.json();
// //         setLedger(data);
// //       } catch (error) {
// //         console.error("Error fetching ledger data:", error);
// //       }
// //     };

// //     fetchLedger();
// //   }, [id]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await fetch(
// //         "http://localhost:3001/api/send-suggestion",
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify({
// //             contactNumber: ledger.contactNumber,
// //             message: suggestion,
// //           }),
// //         }
// //       );
// //       const result = await response.json();
// //       alert(result.message);
// //     } catch (error) {
// //       console.error("Error sending suggestion:", error);
// //     }
// //   };

// //   if (!ledger) {
// //     return <div>Loading...</div>;
// //   }

// //   return (
// //     <div className="suggestion-form-main">
// //       <div className="suggestion-form-p1">
// //         <h1>Ledger Details</h1>
// //         <table className="suggestion-details-table">
// //           <tbody>
// //             <tr>
// //               <th>Farmer Name</th>
// //               <td>{ledger.farmerName}</td>
// //             </tr>
// //             <tr>
// //               <th>Pincode</th>
// //               <td>{ledger.pincode}</td>
// //             </tr>
// //             <tr>
// //               <th>Aadhar Number</th>
// //               <td>{ledger.aadharNumber}</td>
// //             </tr>
// //             <tr>
// //               <th>Contact Number</th>
// //               <td>{ledger.contactNumber}</td>
// //             </tr>
// //             <tr>
// //               <th>Area Ploughed</th>
// //               <td>{ledger.areaPloughed}</td>
// //             </tr>
// //             <tr>
// //               <th>Season</th>
// //               <td>{ledger.season}</td>
// //             </tr>
// //             <tr>
// //               <th>Crop Grown</th>
// //               <td>{ledger.cropGrown}</td>
// //             </tr>
// //             <tr>
// //               <th>Seeds Used</th>
// //               <td>{ledger.seedsUsed}</td>
// //             </tr>
// //             <tr>
// //               <th>Seed Sown Date</th>
// //               <td>{new Date(ledger.seedSownDate).toLocaleDateString()}</td>
// //             </tr>
// //             <tr>
// //               <th>Transplanting</th>
// //               <td>{ledger.transplanting}</td>
// //             </tr>
// //             <tr>
// //               <th>Irrigation Method</th>
// //               <td>{ledger.irrigationMethod}</td>
// //             </tr>
// //             <tr>
// //               <th>Fertilizers Used</th>
// //               <td>{ledger.fertilizersUsed}</td>
// //             </tr>
// //             <tr>
// //               <th>Harvesting Date</th>
// //               <td>{new Date(ledger.harvestingDate).toLocaleDateString()}</td>
// //             </tr>
// //             <tr>
// //               <th>Yield</th>
// //               <td>{ledger.yield}</td>
// //             </tr>
// //           </tbody>
// //         </table>
// //       </div>
// //       <div className="suggestion-form-p2">
// //         <h1>Suggestion Form</h1>
// //         <form onSubmit={handleSubmit} id="suggestion-form">
// //           <div className="suggestion-form-group">
// //             <label htmlFor="suggestion">Message:</label>
// //             <textarea
// //               id="suggestion"
// //               value={suggestion}
// //               onChange={(e) => setSuggestion(e.target.value)}
// //               required
// //             />
// //           </div>
// //           <button type="submit">Submit</button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SuggestionForm;
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "../styles/SuggestionForm.css";

// const SuggestionForm = () => {
//   const { id } = useParams();
//   const [ledger, setLedger] = useState(null);
//   const [suggestion, setSuggestion] = useState("");
//   const [translatedSuggestion, setTranslatedSuggestion] = useState("");

//   const states = {
//     "Andhra Pradesh": "te",
//     "Tamil Nadu": "ta",
//     "Karnataka": "kn",
//     "Kerala": "ml",
//     "Telangana": "te",
//     "Maharashtra": "mr",
//     "Gujarat": "gu",
//     "West Bengal": "bn",
//     "Punjab": "pa",
//     "Odisha": "or",
//     // Add more states and their language codes as needed
//   };

//   useEffect(() => {
//     const fetchLedger = async () => {
//       try {
//         const response = await fetch(`http://localhost:3001/api/ledgers/${id}`);
//         const data = await response.json();
//         setLedger(data);
//       } catch (error) {
//         console.error("Error fetching ledger data:", error);
//       }
//     };

//     fetchLedger();
//     // fetchStateLanguage(533244);
//   }, [id]);

//   const fetchStateLanguage = async (pincode) => {
//     try {
//       const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
//       const stateName = response.data[0]?.PostOffice[0]?.State;
//       console.log("stateName in fetchState Language",stateName,response);
//       return states[stateName] || "en"; // Default to English if state not found
//     } catch (error) {
//       console.error("Error fetching state language:", error);
//       return "en"; // Default to English on error
//     }
//   };

//   const translateMessage = async (message, targetLanguage) => {
//     const options = {
//       method: "POST",
//       url: "https://ai-translate.p.rapidapi.com/translate",
//       headers: {
//         "x-rapidapi-key": "a9100ac388mshd6d88b7c8059a1cp19b185jsn5dd39f1b88cf",
//         "x-rapidapi-host": "ai-translate.p.rapidapi.com",
//         "Content-Type": "application/json",
//       },
//       data: {
//         texts: [message],
//         tl: targetLanguage,
//         sl: "auto",
//       },
//     };

//     try {
//       const response = await axios.request(options);
//       console.log("response  in translateMessage Language",response)
//       return response.data.texts[0];
//     } catch (error) {
//       console.error("Error translating message:", error);
//       return message; // Return original message on error
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!ledger) {
//       alert("Ledger details not available.");
//       return;
//     }

//     try {
//       console.log("ledger.pincode",ledger.pincode);
//       const targetLanguage = await fetchStateLanguage(ledger.pincode);
//       const translated = await translateMessage(suggestion, targetLanguage);
//       setTranslatedSuggestion(translated);

//       const response = await fetch("http://localhost:3001/api/send-suggestion", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           contactNumber: ledger.contactNumber,
//           message: translated,
//         }),
//       });

//       const result = await response.json();
//       alert(result.message);
//     } catch (error) {
//       console.error("Error sending suggestion:", error);
//     }
//   };

//   if (!ledger) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="suggestion-form-main">
//       <div className="suggestion-form-p1">
//         <h1>Ledger Details</h1>
//         <table className="suggestion-details-table">
//           <tbody>
//             <tr>
//               <th>Farmer Name</th>
//               <td>{ledger.farmerName}</td>
//             </tr>
//             <tr>
//               <th>Pincode</th>
//               <td>{ledger.pincode}</td>
//             </tr>
//             <tr>
//               <th>Aadhar Number</th>
//               <td>{ledger.aadharNumber}</td>
//             </tr>
//             <tr>
//               <th>Contact Number</th>
//               <td>{ledger.contactNumber}</td>
//             </tr>
//             <tr>
//               <th>Area Ploughed</th>
//               <td>{ledger.areaPloughed}</td>
//             </tr>
//             <tr>
//               <th>Season</th>
//               <td>{ledger.season}</td>
//             </tr>
//             <tr>
//               <th>Crop Grown</th>
//               <td>{ledger.cropGrown}</td>
//             </tr>
//             <tr>
//               <th>Seeds Used</th>
//               <td>{ledger.seedsUsed}</td>
//             </tr>
//             <tr>
//               <th>Seed Sown Date</th>
//               <td>{new Date(ledger.seedSownDate).toLocaleDateString()}</td>
//             </tr>
//             <tr>
//               <th>Transplanting</th>
//               <td>{ledger.transplanting}</td>
//             </tr>
//             <tr>
//               <th>Irrigation Method</th>
//               <td>{ledger.irrigationMethod}</td>
//             </tr>
//             <tr>
//               <th>Fertilizers Used</th>
//               <td>{ledger.fertilizersUsed}</td>
//             </tr>
//             <tr>
//               <th>Harvesting Date</th>
//               <td>{new Date(ledger.harvestingDate).toLocaleDateString()}</td>
//             </tr>
//             <tr>
//               <th>Yield</th>
//               <td>{ledger.yield}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       <div className="suggestion-form-p2">
//         <h1>Suggestion Form</h1>
//         <form onSubmit={handleSubmit} id="suggestion-form">
//           <div className="suggestion-form-group">
//             <label htmlFor="suggestion">Message:</label>
//             <textarea
//               id="suggestion"
//               value={suggestion}
//               onChange={(e) => setSuggestion(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit">Submit</button>
//         </form>
//         {translatedSuggestion && (
//           <div className="translated-message">
//             <h2>Translated Message</h2>
//             <p>{translatedSuggestion}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SuggestionForm;


//v2
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/SuggestionForm.css";
import ReportCharts from './ReportCharts';
const SuggestionForm = () => {
  //const api=`http://localhost:3001`
  const api=`https://agriproject-120l.onrender.com`
  const { id } = useParams();
  const [ledger, setLedger] = useState(null);
  const [suggestion, setSuggestion] = useState("");
  const [translatedSuggestion, setTranslatedSuggestion] = useState("");

  const states = {
    "Andhra Pradesh": "te",
    "Tamil Nadu": "ta",
    "Karnataka": "kn",
    "Kerala": "ml",
    "Telangana": "te",
    "Maharashtra": "mr",
    "Gujarat": "gu",
    "West Bengal": "bn",
    "Punjab": "pa",
    "Odisha": "or",
  };

  useEffect(() => {
    const fetchLedger = async () => {
      try {
        const response = await fetch(`${api}/api/ledgers/${id}`);
        const data = await response.json();
        setLedger(data);
      } catch (error) {
        console.error("Error fetching ledger data:", error);
      }
    };

    fetchLedger();
  }, [id]);

  const fetchStateLanguage = async (pincode) => {
    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
      const stateName = response.data[0]?.PostOffice[0]?.State;
      return states[stateName] || "en";
    } catch (error) {
      console.error("Error fetching state language:", error);
      return "en";
    }
  };

  const translateMessage = async (message, targetLanguage) => {
    const options = {
      method: "POST",
      url: "https://ai-translate.p.rapidapi.com/translate",
      headers: {
        "x-rapidapi-key": "a9100ac388mshd6d88b7c8059a1cp19b185jsn5dd39f1b88cf",
        "x-rapidapi-host": "ai-translate.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        texts: [message],
        tl: targetLanguage,
        sl: "auto",
      },
    };

    try {
      const response = await axios.request(options);
      return response.data.texts[0];
    } catch (error) {
      console.error("Error translating message:", error);
      return message;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ledger) {
      alert("Ledger details not available.");
      return;
    }

    try {
      const targetLanguage = await fetchStateLanguage(ledger.pincode);
      const translated = await translateMessage(suggestion, targetLanguage);
      setTranslatedSuggestion(translated);

      const response = await fetch(`${api}/api/send-suggestion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactNumber: ledger.contactNumber,
          message: translated,
        }),
      });

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Error sending suggestion:", error);
    }
  };

  if (!ledger) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <div className="suggestion-form-container">
        <div className="suggestion-form-section ledger-details">
          <h1>Ledger Details</h1>
          <div className="table-container">
            <table className="ledger-table">
              <tbody>
                <tr>
                  <th>Farmer Name</th>
                  <td>{ledger.farmerName}</td>
                </tr>
                <tr>
                  <th>Pincode</th>
                  <td>{ledger.pincode}</td>
                </tr>
                <tr>
                  <th>Aadhar Number</th>
                  <td>{ledger.aadharNumber}</td>
                </tr>
                <tr>
                  <th>Contact Number</th>
                  <td>{ledger.contactNumber}</td>
                </tr>
                <tr>
                  <th>Area Ploughed</th>
                  <td>{ledger.areaPloughed}</td>
                </tr>
                <tr>
                  <th>Season</th>
                  <td>{ledger.season}</td>
                </tr>
                <tr>
                  <th>Crop Grown</th>
                  <td>{ledger.cropGrown}</td>
                </tr>
                <tr>
                  <th>Seeds Used</th>
                  <td>{ledger.seedsUsed}</td>
                </tr>
                <tr>
                  <th>Seed Sown Date</th>
                  <td>{new Date(ledger.seedSownDate).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <th>Transplanting</th>
                  <td>{ledger.transplanting}</td>
                </tr>
                <tr>
                  <th>Irrigation Method</th>
                  <td>{ledger.irrigationMethod}</td>
                </tr>
                <tr>
                  <th>Fertilizers Used</th>
                  <td>{ledger.fertilizersUsed}</td>
                </tr>
                <tr>
                  <th>Harvesting Date</th>
                  <td>{new Date(ledger.harvestingDate).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <th>Yield</th>
                  <td>{ledger.yield}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="suggestion-form-section suggestion-input">
          <h1>Suggestion Form</h1>
          <form onSubmit={handleSubmit} className="suggestion-form">
            <div className="form-group">
              <label htmlFor="suggestion">Message:</label>
              <textarea
                id="suggestion"
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                required
                placeholder="Enter your suggestion here..."
              />
            </div>
            <button type="submit" className="submit-button">Submit Suggestion</button>
          </form>

          {/* {translatedSuggestion && (
          <div className="translated-section">
            <h2>Translated Message</h2>
            <div className="translated-content">
              <p>{translatedSuggestion}</p>
            </div>
          </div>
        )} */}
        </div>

      </div>
      <ReportCharts ledger={ledger} />
    </>
  );
};

export default SuggestionForm;