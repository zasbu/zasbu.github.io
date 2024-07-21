document.getElementById('search').addEventListener('keyup', function() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById('search');
    filter = input.value.toLowerCase();
    table = document.querySelector('table tbody');
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

document.querySelectorAll('th').forEach(function(header) {
    header.addEventListener('click', function() {
        var table = header.closest('table');
        var tbody = table.querySelector('tbody');
        var rows = Array.from(tbody.querySelectorAll('tr'));
        var column = header.getAttribute('data-column');
        var isNumeric = !isNaN(rows[0].querySelector('td:nth-child(' + (Array.from(header.parentNode.children).indexOf(header) + 1) + ')').textContent);
        var ascending = header.classList.contains('sorted-asc');
        
        rows.sort(function(a, b) {
            var aText = a.querySelector('td:nth-child(' + (Array.from(header.parentNode.children).indexOf(header) + 1) + ')').textContent;
            var bText = b.querySelector('td:nth-child(' + (Array.from(header.parentNode.children).indexOf(header) + 1) + ')').textContent;
            
            if (isNumeric) {
                return ascending ? aText - bText : bText - aText;
            } else {
                return ascending ? aText.localeCompare(bText) : bText.localeCompare(aText);
            }
        });
        
        tbody.innerHTML = '';
        rows.forEach(function(row) {
            tbody.appendChild(row);
        });
        
        document.querySelectorAll('th').forEach(function(h) {
            h.classList.remove('sorted-asc', 'sorted-desc');
        });
        
        header.classList.toggle('sorted-asc', !ascending);
        header.classList.toggle('sorted-desc', ascending);
    });
});
