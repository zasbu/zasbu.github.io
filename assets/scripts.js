document.addEventListener('DOMContentLoaded', () => {
    const addEntryForm = document.getElementById('add-entry-form');
    const settingsTableBody = document.querySelector('#settings-table tbody');

    // Retrieve existing entries from local storage
    const entries = JSON.parse(localStorage.getItem('entries')) || [];

    // Function to render entries
    const renderEntries = () => {
        settingsTableBody.innerHTML = '';
        entries.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.player}</td>
                <td>${entry.mouse}</td>
                <td>${entry.hz}</td>
                <td>${entry.dpi}</td>
                <td>${entry.sens}</td>
                <td>${entry.edpi}</td>
                <td>${entry.resolution}</td>
                <td>${entry.aspectRatio}</td>
                <td>${entry.mousepad}</td>
                <td>${entry.keyboard}</td>
            `;
            settingsTableBody.appendChild(row);
        });
    };

    // Initial render
    renderEntries();

    // Handle form submission
    addEntryForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newEntry = {
            player: document.getElementById('player').value,
            mouse: document.getElementById('mouse').value,
            hz: document.getElementById('hz').value,
            dpi: document.getElementById('dpi').value,
            sens: document.getElementById('sens').value,
            edpi: document.getElementById('edpi').value,
            resolution: document.getElementById('resolution').value,
            aspectRatio: document.getElementById('aspect-ratio').value,
            mousepad: document.getElementById('mousepad').value,
            keyboard: document.getElementById('keyboard').value,
        };

        entries.push(newEntry);
        localStorage.setItem('entries', JSON.stringify(entries));
        renderEntries();

        addEntryForm.reset();
        alert('Entry added successfully!');
    });

    // Search functionality
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filteredEntries = entries.filter(entry => entry.player.toLowerCase().includes(query));
        
        settingsTableBody.innerHTML = '';
        filteredEntries.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.player}</td>
                <td>${entry.mouse}</td>
                <td>${entry.hz}</td>
                <td>${entry.dpi}</td>
                <td>${entry.sens}</td>
                <td>${entry.edpi}</td>
                <td>${entry.resolution}</td>
                <td>${entry.aspectRatio}</td>
                <td>${entry.mousepad}</td>
                <td>${entry.keyboard}</td>
            `;
            settingsTableBody.appendChild(row);
        });
    });
});
