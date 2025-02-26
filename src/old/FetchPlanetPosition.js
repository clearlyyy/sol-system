//Deprecated, using NASA's API was too much of a hassle, calculating celestial bodys positions from J2000 causes less problems.

// JPL Horizons API endpoint
const API_URL = "https://ssd.jpl.nasa.gov/api/horizons.api";

// Function to query JPL Horizons API for orbital elements
async function getOrbitalElements(target, startTime, stopTime, stepSize) {
    const params = new URLSearchParams({
        format: "text",
        COMMAND: `'${target}'`,
        OBJ_DATA: "'YES'",
        MAKE_EPHEM: "'YES'",
        EPHEM_TYPE: "'ELEMENTS'",
        CENTER: "'500@10'",  // Sun-centered
        START_TIME: `'${startTime}'`,
        STOP_TIME: `'${stopTime}'`,
        STEP_SIZE: `'${stepSize}'`,
        REF_PLANE: "'ECLIPTIC'",
        REF_SYSTEM: "'J2000'",
        OUT_UNITS: "'AU-D'",
        CSV_FORMAT: "'YES'",
    });

    const response = await fetch(`${API_URL}?${params.toString()}`);
    
    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }
    const data = await response.text();
    return data;
}

// Function to parse the API response and extract mean anomaly and eccentricity for each day
function parseOrbitalElements(responseText) {
    const lines = responseText.split("\n");

    // Filter out lines that contain the metadata, like the header information
    const filteredLines = lines.filter(line => !line.includes("JPL/HORIZONS"));

    // Find the start of the data section
    const startIndex = filteredLines.findIndex(line => line.includes("$$SOE"));
    if (startIndex === -1) {
        throw new Error("Could not find the start of the data section ($$SOE).");
    }

    // Find the end of the data section
    const endIndex = filteredLines.findIndex(line => line.includes("$$EOE"));
    if (endIndex === -1) {
        throw new Error("Could not find the end of the data section ($$EOE).");
    }

    // Extract all data lines between $$SOE and $$EOE
    const dataLines = filteredLines.slice(startIndex + 1, endIndex);

    // Parse each data line
    const results = dataLines.map(line => {
        const columns = line.trim().split(",").map(col => col.trim());

        // Extract EC (eccentricity) and MA (mean anomaly)
        const EC = parseFloat(columns[2]); // Eccentricity
        const MA = parseFloat(columns[9]); // Mean anomaly (degrees)

        if (isNaN(EC) || isNaN(MA)) {
            throw new Error("Could not parse eccentricity or mean anomaly from the response.");
        }

        return { date: columns[1].trim(), meanAnomaly: MA, eccentricity: EC };
    });

    return results;
}
// Function to solve Kepler's equation for eccentric anomaly (E)
function solveKepler(M, EC, tolerance = 1e-6, maxIter = 100) {
    let E = M; // Initial guess
    for (let i = 0; i < maxIter; i++) {
        const deltaE = (E - EC * Math.sin(E) - M) / (1 - EC * Math.cos(E));
        E -= deltaE;
        if (Math.abs(deltaE) < tolerance) {
            return E;
        }
    }
    throw new Error("Kepler's equation did not converge.");
}

// Function to calculate true anomaly (θ) from mean anomaly (M) and eccentricity (EC)
function meanAnomalyToTrueAnomaly(M, EC) {
    const E = solveKepler(M, EC); // Solve for eccentric anomaly
    const theta = 2 * Math.atan2(
        Math.sqrt(1 + EC) * Math.sin(E / 2),
        Math.sqrt(1 - EC) * Math.cos(E / 2)
    );
    return theta;
}

// Main function to query the API and calculate true anomaly for each day in the date range
async function getTrueAnomaly(target, startDate, endDate, stepSize) {
    try {
        // Query the JPL Horizons API for orbital elements
        const responseText = await getOrbitalElements(target, startDate, endDate, stepSize);

        // Parse the response to extract mean anomaly and eccentricity for each day
        const orbitalElements = parseOrbitalElements(responseText);

        // Calculate true anomaly for each day
        const trueAnomalies = orbitalElements.map(({ date, meanAnomaly, eccentricity }) => {
            // Convert mean anomaly from degrees to radians
            const M = (meanAnomaly * Math.PI) / 180;
            
            
            // Calculate true anomaly
            const theta = meanAnomalyToTrueAnomaly(M, eccentricity);

            // Convert true anomaly back to degrees
            const thetaDegrees = (theta * 180) / Math.PI;

            return { date, trueAnomaly: thetaDegrees };
        });

        return trueAnomalies;
    } catch (error) {
        console.error("Error:", error.message);
        throw error;
    }
}

// Prints list of planetery true anomalys at every step in the given time range.
async function getPlanetPosition(target, startDate, endDate, stepSize) {

    let trueAnomaliesArray = [];

    try {
        
        // Get true anomalies for each day in the date range
        const trueAnomalies = await getTrueAnomaly(target, startDate, endDate, stepSize);

        trueAnomalies.forEach(({ date, trueAnomaly }) => {
            trueAnomaliesArray.push({date, trueAnomaly});
        });
        return trueAnomaliesArray;
    } catch (error) {
        console.error("Error in main.js:", error.message);
    }

    
};

export default getPlanetPosition;