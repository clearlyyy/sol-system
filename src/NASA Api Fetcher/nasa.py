import requests
import json
import re

def fetch_horizons_data(target='801', center='899', start_time='2025-02-11', stop_time='2025-02-12'):
    url = "https://ssd.jpl.nasa.gov/api/horizons.api"
    params = {
        "format": "text",
        "COMMAND": target,
        "CENTER": f"500@{center}",
        "MAKE_EPHEM": "YES",
        "EPHEM_TYPE": "ELEMENTS",
        "OUT_UNITS": "KM-S",
        "REF_PLANE": "ECLIPTIC",
        "START_TIME": start_time,
        "STOP_TIME": stop_time,
        "STEP_SIZE": "1d",
        "CSV_FORMAT": "NO"
    }

    response = requests.get(url, params=params)
    if response.status_code != 200:
        return {"error": "Failed to retrieve data", "status_code": response.status_code}
    
    # Uncomment the following lines to print the raw response for debugging:
    # print("Raw Response Data:\n")
    # print(response.text)
    
    return parse_horizons_response(response.text)

def parse_horizons_response(text_data):
    # Collect the block between $$SOE and $$EOE
    lines = text_data.splitlines()
    recording = False
    data_block = []
    for line in lines:
        if "$$SOE" in line:
            recording = True
            continue  # Skip the $$SOE marker line
        if "$$EOE" in line:
            break
        if recording:
            data_block.append(line.strip())
    
    if not data_block:
        return {"error": "No ephemeris data found"}
    
    # Join the block into one string.
    block = " ".join(data_block)
    
    # Define the keys we care about.
    keys = ["EC", "IN", "OM", "W", "N", "MA", "A"]
    # Regular expression: look for key = number (allowing for scientific notation)
    pattern = r'\b(?P<key>' + '|'.join(keys) + r')\s*=\s*(?P<value>[-+]?\d*\.\d+(?:E[-+]?\d+)?|\d+)'
    
    matches = re.findall(pattern, block)
    
    result = {}
    for key in keys:
        # Pick the first occurrence for each key.
        for m in matches:
            if m[0] == key:
                try:
                    result[key] = float(m[1])
                except ValueError:
                    return {"error": f"Invalid numeric value for {key}"}
                break

    if len(result) != len(keys):
        return {"error": "Failed to parse data", "parsed": result, "matches": matches}
    
    return result

def format_output(parsed_data):
    # Map the original keys to the desired output keys.
    mapping = {
        "A": "A",
        "EC": "EC",
        "IN": "i",
        "W": "omega",
        "OM": "Omega",
        "N": "meanMotion",
        "MA": "j2000MeanAnomaly"
    }
    # Define the order in which to print the keys.
    keys_order = ["A", "EC", "IN", "W", "OM", "N", "MA"]
    
    output_lines = []
    for key in keys_order:
        out_key = mapping[key]
        value = parsed_data[key]
        if out_key == "meanMotion":
            # For meanMotion, print the raw value and append a literal " * 86400"
            line = f"{out_key}={{ {value:.15E} * 86400 }}"
        else:
            line = f"{out_key}={{ {value:.15E} }}"
        output_lines.append(line)
    
    return "\n".join(output_lines)

# Example usage:
if __name__ == "__main__":
    parsed = fetch_horizons_data()
    # If there was an error, print it.
    if isinstance(parsed, dict) and "error" in parsed:
        print(json.dumps(parsed, indent=4))
    else:
        formatted = format_output(parsed)
        print("\nParsed Data:")
        print(formatted)
