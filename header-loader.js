// Header Loader for PowerGridX
// This script loads the shared header component across all pages

function loadHeader() {
    fetch('header.html')
        .then(response => response.text())
        .then(html => {
            // Insert header at the beginning of body
            document.body.insertAdjacentHTML('afterbegin', html);
            
            // Execute any scripts in the loaded header
            const scripts = document.querySelectorAll('header script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                newScript.textContent = script.textContent;
                document.head.appendChild(newScript);
                script.remove();
            });
        })
        .catch(error => {
            console.error('Error loading header:', error);
            // Fallback: create a basic header if loading fails
            createFallbackHeader();
        });
}

function createFallbackHeader() {
    const fallbackHeader = `
        <header class="bg-slate-600 shadow-sm">
            <div class="px-4 py-3">
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                            <span class="text-white font-bold text-sm">P</span>
                        </div>
                        <div>
                            <h1 class="text-lg font-bold text-white">PowerGridX</h1>
                            <p class="text-xs text-gray-300">Smart Infrastructure Platform</p>
                        </div>
                    </div>
                    <nav class="flex space-x-2">
                        <a href="index.html" class="bg-orange-500 text-white px-4 py-2 rounded text-sm font-medium">Dashboard</a>
                        <a href="smart-grid.html" class="text-white px-3 py-2 text-sm hover:bg-slate-500 rounded">Smart Grid</a>
                        <a href="transformers.html" class="text-white px-3 py-2 text-sm hover:bg-slate-500 rounded">Transformers</a>
                        <a href="audit-log.html" class="text-white px-3 py-2 text-sm hover:bg-slate-500 rounded">Audit Log</a>
                        <a href="dispatch.html" class="text-white px-3 py-2 text-sm hover:bg-slate-500 rounded">Dispatch</a>
                    </nav>
                </div>
            </div>
            <div class="bg-gray-100 px-4 py-2 border-t border-slate-500">
                <div class="flex justify-between items-center text-sm">
                    <div class="flex items-center space-x-4">
                        <span class="font-semibold text-gray-800">PowerGridX Dashboard</span>
                        <span class="flex items-center space-x-1">
                            <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span class="text-green-600 font-medium">LIVE</span>
                        </span>
                    </div>
                    <div class="flex items-center space-x-4 text-gray-600">
                        <span>Cloud Connected • Live Data</span>
                    </div>
                </div>
            </div>
        </header>
    `;
    document.body.insertAdjacentHTML('afterbegin', fallbackHeader);
}

// Load header when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
} else {
    loadHeader();
}
