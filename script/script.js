
// Dark Mode 
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // cek dan simpan darkmode
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
        darkModeToggle.checked = true;
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            enableDarkMode();
            localStorage.setItem('darkMode', 'enabled');
        } else {
            disableDarkMode();
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    function enableDarkMode() {
        body.classList.add('dark-mode');
        // Update search and filter elements
        updateControlElements();
    }
    
    function disableDarkMode() {
        body.classList.remove('dark-mode');
        // Update search and filter elements
        updateControlElements();
    }
    
    function updateControlElements() {
        const searchInput = document.getElementById('searchInput');
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        if (searchInput) {
            searchInput.classList.toggle('dark-mode');
        }
        
        filterBtns.forEach(btn => {
            btn.classList.toggle('dark-mode');
        });
    }
});