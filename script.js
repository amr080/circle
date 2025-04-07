// Basic console log to confirm script is working
document.addEventListener('DOMContentLoaded', () => {
    console.log("Script loaded successfully");

    // Define the base URL
    const baseUrl = 'https://www.sec.gov';

    // Get all links in the table
    const links = document.querySelectorAll('.tableFile a');

    // Add click event to each link
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default navigation
            
            // Get the relative URL from the href
            const relativeUrl = link.getAttribute('href');
            
            // Construct the full URL
            const fullUrl = baseUrl + relativeUrl;
            
            // Open in a new tab
            window.open(fullUrl, '_blank');
        });

        // Optional: Add hover effect to the row
        const row = link.closest('tr');
        row.addEventListener('mouseover', () => {
            row.style.backgroundColor = '#f0f0f0';
            row.style.cursor = 'pointer';
        });
        
        row.addEventListener('mouseout', () => {
            row.style.backgroundColor = row.classList.contains('evenRow') ? '#f8f8f8' : '';
        });
    });
});