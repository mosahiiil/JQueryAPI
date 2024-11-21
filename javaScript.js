const apiUrl = 'https://reqres.in/api/users';

// Fetch and display data on page load
document.addEventListener("DOMContentLoaded", fetchData);

// Fetch data from API and populate the table
async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayData(data.data); // Access the 'data' property to get user list
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Display data in the table
function displayData(data) {
    const dataList = document.getElementById('dataList');
    dataList.innerHTML = ''; // Clear the table body

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.first_name} ${item.last_name}</td>
            <td>${item.email}</td>
        `;
        dataList.appendChild(row);
    });
}

// Add new data (simulated locally)
// Add new data (using input ID)
async function addData() {
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const value = document.getElementById('value').value;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, first_name: name, email: value })
        });
        const newData = await response.json();
        
        // Use the provided ID for display purposes
        newData.id = id;
        newData.first_name = name;
        newData.email = value;

        addRowToTable(newData);
        console.log("Added data:", newData);
    } catch (error) {
        console.error("Error adding data:", error);
    }
}


function addRowToTable(item) {
    const dataList = document.getElementById('dataList');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.first_name}</td>
        <td>${item.email}</td>
    `;
    dataList.appendChild(row);
}

async function updateData() {
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const value = document.getElementById('value').value;

    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ first_name: name, email: value })
        });
        const updatedData = await response.json();
        updateRowInTable(id, { id, first_name: name, email: value });
        console.log("Updated data:", updatedData);
    } catch (error) {
        console.error("Error updating data:", error);
    }
}

function updateRowInTable(id, item) {
    const rows = document.querySelectorAll('#dataList tr');
    rows.forEach(row => {
        if (row.children[0].innerText == id) {
            row.children[1].innerText = item.first_name;
            row.children[2].innerText = item.email;
        }
    });
}

async function deleteData() {
    const id = document.getElementById('id').value;

    try {
        await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        deleteRowFromTable(id);
        console.log(`Deleted data with ID: ${id}`);
    } catch (error) {
        console.error("Error deleting data:", error);
    }
}

function deleteRowFromTable(id) {
    const rows = document.querySelectorAll('#dataList tr');
    rows.forEach(row => {
        if (row.children[0].innerText == id) {
            row.remove();
        }
    });
}
