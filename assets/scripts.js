document.getElementById('search').addEventListener('keyup', function() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById('search');
    filter = input.value.toLowerCase();
    table = document.querySelector('#settingsTable tbody');
    tr = table.getElementsByTagName('tr');

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName('td')[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }       
    }
});

// Function to calculate eDPI and update table
function calculateEDPI() {
    const table = document.querySelector('#settingsTable tbody');
    const rows = table.getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        if (cells.length) {
            const dpi = parseFloat(cells[3].textContent); // DPI is in the 4th column
            const sens = parseFloat(cells[4].textContent); // Sensitivity is in the 5th column
            
            if (!isNaN(dpi) && !isNaN(sens)) {
                const edpi = dpi * sens;
                cells[5].textContent = edpi.toFixed(2); // Update eDPI in the 6th column
            }
        }
    }
}

// Call the function to calculate eDPI when the page loads
document.addEventListener('DOMContentLoaded', () => {
    calculateEDPI();
    // Sort by Player name (column 0) by default when the page loads
    const table = document.querySelector('#settingsTable');
    sortTable(table, 0, false);
});

// Add sorting functionality
document.querySelectorAll('th').forEach((header, index) => {
    header.addEventListener('click', () => {
        const table = header.closest('table');
        const isNumeric = !isNaN(parseFloat(table.querySelector(`tbody tr td:nth-child(${index + 1})`).textContent));
        sortTable(table, index, isNumeric);
    });
});

function sortTable(table, column, isNumeric) {
    const rows = Array.from(table.querySelector('tbody').rows);
    const ascending = !table.dataset.sort || table.dataset.sort === 'desc';
    
    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[column].textContent.trim();
        const cellB = rowB.cells[column].textContent.trim();
        let comparison = 0;
        
        if (isNumeric) {
            comparison = parseFloat(cellA) - parseFloat(cellB);
        } else {
            comparison = cellA.localeCompare(cellB);
        }
        
        return ascending ? comparison : -comparison;
    });
    
    const tbody = table.querySelector('tbody');
    tbody.append(...rows);
    table.dataset.sort = ascending ? 'asc' : 'desc';
}
