// A function to load the footer automatically
function loadFooter() {
    const footerTemplate = `
        <footer>
            <p>&copy; 2026 ABOUND SOLUTION LTD. All Rights Reserved.</p>
        </footer>
    `;
    document.getElementById('footer-placeholder').innerHTML = footerTemplate;
}

loadFooter();