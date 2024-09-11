document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('dataForm').style.display = 'block';
});

document.getElementById('farmForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const location = document.getElementById('location').value;
    const dataType = document.getElementById('dataType').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    fetchData(location, dataType, startDate, endDate);
});

function fetchData(location, dataType, startDate, endDate) {
    // Mock API call to get data
    // Replace with actual API calls to MODIS, SMAP, NEXRAD
    const modisData = "Map showing vegetation health and temperature";
    const smapData = "Detailed map of soil moisture levels";
    const nexradData = "Rainfall data and forecasts";

    document.getElementById('modisMap').innerText = modisData;
    document.getElementById('smapMap').innerText = smapData;
    document.getElementById('nexradMap').innerText = nexradData;

    const recommendations = "Soil moisture is low. Increase irrigation and prepare for potential flooding.";
    document.getElementById('recommendations').innerText = recommendations;

    document.getElementById('results').style.display = 'block';
}
