document.getElementById('search').addEventListener('keyup', function() {
    var input = document.getElementById('search');
    var filter = input.value.toLowerCase();
    var table = document.querySelector('table tbody');
    var tr = table.getElementsByTagName('tr');

    for (var i = 0; i < tr.length; i++) {
        var td = tr[i].getElementsByTagName('td')[0];
        if (td) {
            var txtValue = td.textContent || td.innerText;
            tr[i].style.display = txtValue.toLowerCase().indexOf(filter) > -1 ? "" : "none";
        }
    }
});

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

document.addEventListener('DOMContentLoaded', calculateEDPI);

document.querySelectorAll('th').forEach(header => {
    header.addEventListener('click', () => {
        const table = header.parentElement.parentElement.parentElement;
        const index = Array.from(header.parentElement.children).indexOf(header);
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
    
    table.querySelectorAll('th').forEach(th => th.classList.remove('sorted-asc', 'sorted-desc'));
    table.querySelectorAll('th')[column].classList.add(ascending ? 'sorted-asc' : 'sorted-desc');
    
    table.dataset.sort = ascending ? 'asc' : 'desc';
}
