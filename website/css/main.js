async function injectComponent(placeholderId, filePath) {
    try {
        
        const response = await fetch(filePath);
        
        
        if (!response.ok) {
            throw new Error(`Could not find the file: ${filePath} (Status: ${response.status})`);
        }
        
        
        const htmlContent = await response.text();
        
        
        document.getElementById(placeholderId).innerHTML = htmlContent;
        
    } catch (error) {
        console.error("Component Injection Error:", error);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    injectComponent("header-placeholder", "components/header.html");
    injectComponent("footer-placeholder", "components/footer.html");
});