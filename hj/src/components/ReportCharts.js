// import React, { useState, useEffect } from 'react';
// import { Chart } from 'primereact/chart';
// import axios from 'axios';

// export default function SoilDataCharts({ledger}) {
//     const [stackedBarData, setStackedBarData] = useState({});
//     const [stackedBarOptions, setStackedBarOptions] = useState({});
//     const [lineChartData, setLineChartData] = useState({});
//     const [lineChartOptions, setLineChartOptions] = useState({});

//     useEffect(() => {

//                 const data = ledger;

//                 const timestamps = data.map(entry => entry.timestamp);
//                 const sandData = data.map(entry => entry.sand);
//                 const clayData = data.map(entry => entry.clay);
//                 const loamyData = data.map(entry => entry.loamy);
//                 const nitrogenData = data.map(entry => entry.nitrogen);
//                 const phosphorusData = data.map(entry => entry.phosphorus);
//                 const potassiumData = data.map(entry => entry.potassium);
//                 const sulfurData = data.map(entry => entry.sulfur);

//                 const documentStyle = getComputedStyle(document.documentElement);
//                 const textColor = documentStyle.getPropertyValue('--text-color');
//                 const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
//                 const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

//                 // Stacked Bar Chart Data
//                 const barData = {
//                     labels: timestamps,
//                     datasets: [
//                         {
//                             type: 'bar',
//                             label: 'Sand',
//                             backgroundColor: documentStyle.getPropertyValue('--blue-500'),
//                             data: sandData
//                         },
//                         {
//                             type: 'bar',
//                             label: 'Clay',
//                             backgroundColor: documentStyle.getPropertyValue('--green-500'),
//                             data: clayData
//                         },
//                         {
//                             type: 'bar',
//                             label: 'Loamy',
//                             backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
//                             data: loamyData
//                         }
//                     ]
//                 };

//                 const barOptions = {
//                     maintainAspectRatio: false,
//                     aspectRatio: 0.8,
//                     plugins: {
//                         legend: {
//                             labels: {
//                                 color: textColor
//                             }
//                         }
//                     },
//                     scales: {
//                         x: {
//                             stacked: true,
//                             ticks: {
//                                 color: textColorSecondary
//                             },
//                             grid: {
//                                 color: surfaceBorder
//                             }
//                         },
//                         y: {
//                             stacked: true,
//                             ticks: {
//                                 color: textColorSecondary
//                             },
//                             grid: {
//                                 color: surfaceBorder
//                             }
//                         }
//                     }
//                 };

//                 // Line Chart Data
//                 const lineData = {
//                     labels: timestamps,
//                     datasets: [
//                         {
//                             label: 'Nitrogen (N)',
//                             data: nitrogenData,
//                             borderColor: documentStyle.getPropertyValue('--blue-500'),
//                             tension: 0.4
//                         },
//                         {
//                             label: 'Phosphorus (P)',
//                             data: phosphorusData,
//                             borderColor: documentStyle.getPropertyValue('--teal-500'),
//                             tension: 0.4
//                         },
//                         {
//                             label: 'Potassium (K)',
//                             data: potassiumData,
//                             borderColor: documentStyle.getPropertyValue('--orange-500'),
//                             tension: 0.4
//                         },
//                         {
//                             label: 'Sulfur (S)',
//                             data: sulfurData,
//                             borderColor: documentStyle.getPropertyValue('--purple-500'),
//                             tension: 0.4
//                         }
//                     ]
//                 };

//                 const lineOptions = {
//                     maintainAspectRatio: false,
//                     aspectRatio: 0.6,
//                     plugins: {
//                         legend: {
//                             labels: {
//                                 color: textColor
//                             }
//                         }
//                     },
//                     scales: {
//                         x: {
//                             ticks: {
//                                 color: textColorSecondary
//                             },
//                             grid: {
//                                 color: surfaceBorder
//                             }
//                         },
//                         y: {
//                             ticks: {
//                                 color: textColorSecondary
//                             },
//                             grid: {
//                                 color: surfaceBorder
//                             }
//                         }
//                     }
//                 };

//                 setStackedBarData(barData);
//                 setStackedBarOptions(barOptions);
//                 setLineChartData(lineData);
//                 setLineChartOptions(lineOptions);

//             // .catch(error => console.error('Error fetching soil data:', error));
//     }, []);

//     return (
//         <div>
//             <div className="card">
//                 <h3>Soil Texture Distribution (Stacked Bar Chart)</h3>
//                 <Chart type="bar" data={stackedBarData} options={stackedBarOptions} />
//             </div>
//             <div className="card">
//                 <h3>Soil Nutrient Levels Over Time (Line Chart)</h3>
//                 <Chart type="line" data={lineChartData} options={lineChartOptions} />
//             </div>
//         </div>
//     );
// }
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import '../styles/ReportCharts.css';
export default function SoilDataCharts({ ledger }) {
    const [stackedBarData, setStackedBarData] = useState({});
    const [stackedBarOptions, setStackedBarOptions] = useState({});
    const [lineChartData, setLineChartData] = useState({});
    const [lineChartOptions, setLineChartOptions] = useState({});
    const [testResults, setTestResults] = useState([]);
    console.log("ledger", ledger);
    const copyRecentReportToClipboard = () => {
        if (!ledger || !ledger.soilTests || ledger.soilTests.length === 0) {
            alert('No soil test reports available to copy.');
            return;
        }

        // Get the most recent soil test report
        const recentTest = ledger.soilTests[ledger.soilTests.length - 1];

        // Format the report into a readable text format
        const reportText = `
            Soil Test Report
            -----------------
            Date: ${new Date(recentTest.timestamp).toLocaleDateString()}
            pH: ${recentTest.pH}
            Nitrogen: ${recentTest.nitrogen}
            Phosphorus: ${recentTest.phosphorus}
            Potassium: ${recentTest.potassium}
            Organic Carbon: ${recentTest.organicCarbon}
            Moisture Level: ${recentTest.moistureLevel}
            Microbial Count: ${recentTest.microbialCount}
            Enzyme Activity: ${recentTest.enzymeActivity}
        `;

        // Copy the formatted text to the clipboard
        navigator.clipboard.writeText(reportText)
            .then(() => {
                alert('Recent soil test report copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };
    useEffect(() => {
        // Check if ledger and soilTests exist
        if (!ledger || !ledger.soilTests) return;

        const soilTests = ledger.soilTests;
        console.log("soilTests", soilTests);
        // Extract data from soilTests
        const timestamps = soilTests.map(test => new Date(test.timestamp).toLocaleDateString());
        const sandData = soilTests.map(test => test.soilComposition.sand);
        const clayData = soilTests.map(test => test.soilComposition.clay);
        const loamyData = soilTests.map(test => test.soilComposition.loam);
        const nitrogenData = soilTests.map(test => test.nitrogen);
        const phosphorusData = soilTests.map(test => test.phosphorus);
        const potassiumData = soilTests.map(test => test.potassium);
        const sulfurData = soilTests.map(test => test.sulfur || 0); // Default to 0 if sulfur is not defined

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        // Stacked Bar Chart Data
        const barData = {
            labels: timestamps,
            datasets: [
                {
                    type: 'bar',
                    label: 'Sand',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    data: sandData
                },
                {
                    type: 'bar',
                    label: 'Clay',
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    data: clayData
                },
                {
                    type: 'bar',
                    label: 'Loamy',
                    backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
                    data: loamyData
                }
            ]
        };

        const barOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        // Line Chart Data
        const lineData = {
            labels: timestamps,
            datasets: [
                {
                    label: 'Nitrogen (N)',
                    data: nitrogenData,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                },
                {
                    label: 'Phosphorus (P)',
                    data: phosphorusData,
                    borderColor: documentStyle.getPropertyValue('--teal-500'),
                    tension: 0.4
                },
                {
                    label: 'Potassium (K)',
                    data: potassiumData,
                    borderColor: documentStyle.getPropertyValue('--orange-500'),
                    tension: 0.4
                },
                {
                    label: 'Sulfur (S)',
                    data: sulfurData,
                    borderColor: documentStyle.getPropertyValue('--purple-500'),
                    tension: 0.4
                }
            ]
        };

        const lineOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setStackedBarData(barData);
        setStackedBarOptions(barOptions);
        setLineChartData(lineData);
        setLineChartOptions(lineOptions);
        // Prepare test results for DataTable
        const results = soilTests.map(test => ({
            timestamp: new Date(test.timestamp).toLocaleDateString(),
            pH: test.pH,
            organicCarbon: test.organicCarbon,
            moistureLevel: test.moistureLevel,
            microbialCount: test.microbialCount,
            enzymeActivity: test.enzymeActivity
        }));
        setTestResults(results);
    }, [ledger]); // Add ledger as a dependency
    const getColorCodedValue = (value, min, max) => {
        let color = "green"; // Default for normal range

        if (value < min) {
            color = "rgb(3, 179, 255)"; // Below normal range
        } else if (value > max) {
            color = "red"; // Above normal range
        }

        return <span style={{ color }}>{value}</span>;
    };


    return (
        <div style={{ position: 'relative' }}>
            <button 
                onClick={copyRecentReportToClipboard} 
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    padding: '5px 10px',
                    backgroundColor: '#11afef',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >Copy Recent Report
            </button>
            <div className="card" >
                <h3>Soil Texture Distribution (Stacked Bar Chart)</h3>
                <Chart type="bar" data={stackedBarData} options={stackedBarOptions} />
            </div>
            <div className="card">
                <h3>Soil Nutrient Levels Over Time (Line Chart)</h3>
                <Chart type="line" data={lineChartData} options={lineChartOptions} />
            </div>
            <div className="card">
                <h3>Soil Test Results</h3>
                <DataTable value={testResults} paginator rows={5}>
                    <Column field="timestamp" header="Date" />
                    <Column field="pH" header="pH Level" body={(rowData) => getColorCodedValue(rowData.pH, 6.5, 7.5)} />
                    <Column field="organicCarbon" header="Organic Carbon (%)" body={(rowData) => getColorCodedValue(rowData.organicCarbon, 0.5, 1.5)} />
                    <Column field="moistureLevel" header="Moisture Level (%)" body={(rowData) => getColorCodedValue(rowData.moistureLevel, 20, 40)} />
                    <Column field="microbialCount" header="Microbial Count (CFU/g)" body={(rowData) => getColorCodedValue(rowData.microbialCount, 10000, 100000)} />
                    <Column field="enzymeActivity" header="Enzyme Activity (mg/kg/hr)" body={(rowData) => getColorCodedValue(rowData.enzymeActivity, 10, 50)} />
                </DataTable>
            </div>
        </div>
    );
}
