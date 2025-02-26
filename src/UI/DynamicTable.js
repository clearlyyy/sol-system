
import "../styles/table.css"


//Give the function a dict and it gives you a table
//Implementation is a bit scuffed but honestly i cant think of another way. 
export const DynamicTable = ({ data, selectedBody, type }) => {


    function getSciNotation(num) {
        const expString = num.toExponential();
        const [base, exponent] = expString.split('e');
        const formattedExponent = exponent.startsWith('+') ? exponent.slice(1) : exponent;

        return `${base} * 10^${formattedExponent}`
    }

    if (!data)
    {   
        if (selectedBody.name == "Sun")
        {
            if (type == "Orbital Information") {
                data = ([
                    { label: "No Orbital Information For the Sun." }
                    
                  ]);
            }
            else if (type =="Physical Characteristics") {
                const customData = selectedBody.userData;
                data = ([
                    { label: "Diameter", value: (customData.size * 2).toLocaleString() + " km" },
                    { label: "Mass", value: getSciNotation(customData.mass) + " kg"},
                    { label: "Surface Gravity", value: customData.gravity.toFixed(2) + "m/s²" + " (" + (customData.gravity / 9.81 ).toFixed(1) + "g)" },
                    { label: "Density", value: customData.density.toFixed(2) + " g/cm³" },
                    { label: "Axial Tilt", value: customData.tilt.toFixed(1) + "°" },
                    
                  ]);
            }
        }
        else {
            if (type == "Orbital Information") {
                const customData = selectedBody.userData;
                data = ([
                    { label: "Semi Major Axis", value: customData.A.toLocaleString() + " km" },
                    { label: "Eccentricity", value: customData.EC.toFixed(8) },
                    { label: "Inclination", value: customData.i.toFixed(3) + "°" },
                    { label: "Periapsis", value: customData.omega.toFixed(2) + " km" },
                    { label: "Ascending Node", value: customData.Omega.toFixed(3) + "°" },
                    { label: "Mean Motion", value: customData.meanMotion.toFixed(6) + " deg/day" },
                    { label: "Mean Anomaly", value: customData.meanAnomaly.toFixed(3) + "°" },
                    { label: "True Anomaly", value: customData.trueAnomaly.toFixed(4) + "°" },
                  ]);
            }
            else if (type == "Physical Characteristics") {
                const customData = selectedBody.userData;
                data = ([
                    { label: "Diameter", value: (customData.size * 2).toLocaleString() + " km" },
                    { label: "Mass", value: getSciNotation(customData.mass) + " kg"},
                    { label: "Surface Gravity", value: customData.gravity.toFixed(2) + "m/s²" + " (" + (customData.gravity / 9.81 ).toFixed(1) + "g)" },
                    { label: "Density", value: customData.density.toFixed(2) + " g/cm³" },
                    { label: "Axial Tilt", value: customData.tilt.toFixed(1) + "°" },
                    { label: "Escape Velocity", value: customData.escapeVelocity.toFixed(3) + " km/s" },
                    { label: "Side Real Period", value: customData.siderealPeriod.toFixed(2) + " hrs" },
                    { label: "Average Temp (Day)", value: customData.meanTempDay.toFixed(1) + "° C, " + ((customData.meanTempNight * (1.8)) + 32) + "° F"  },
                    { label: "Average Temp (Night)", value: customData.meanTempNight.toFixed(1) + "° C, " + ((customData.meanTempNight * (1.8)) + 32).toFixed(1) + "° F" },
                  ]);
            }
        }
    }
    
    return (
        <table className="table" border="0">
            <tbody>
                {data.map((item, index) => (
                    <tr className="table-row" key={index}>
                        <td>{item.label}</td>
                        <td>{item.value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
