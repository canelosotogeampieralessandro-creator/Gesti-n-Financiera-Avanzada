const fs = require('fs');

let lines = fs.readFileSync('src/App.jsx', 'utf8').split('\n');

// 1. Delete MercadoMonetarioView
let mmvStart = lines.findIndex(l => l.includes('const MercadoMonetarioView = '));
let mmvEnd = lines.findIndex((l, i) => i > mmvStart && l === '            };');
if (mmvStart !== -1 && mmvEnd !== -1) lines.splice(mmvStart, mmvEnd - mmvStart + 1);

// 2. Delete SimuladorTasasView
let stvStart = lines.findIndex(l => l.includes('const SimuladorTasasView = '));
let stvEnd = lines.findIndex((l, i) => i > stvStart && l === '            };');
if (stvStart !== -1 && stvEnd !== -1) lines.splice(stvStart, stvEnd - stvStart + 1);

// 3. Delete MercadoCapitalesView
let mcvStart = lines.findIndex(l => l.includes('const MercadoCapitalesView = '));
let mcvEnd = lines.findIndex((l, i) => i > mcvStart && l === '            };');
if (mcvStart !== -1 && mcvEnd !== -1) lines.splice(mcvStart, mcvEnd - mcvStart + 1);

// 4. Update menuData to add WaccView
let menuCapitales = lines.findIndex(l => l.includes("{ id: 'liquidez-mercado-capitales', title: 'Mercado de Capitales' }"));
if (menuCapitales !== -1) {
    lines.splice(menuCapitales + 1, 0, "                    { id: 'liquidez-wacc', title: 'Dashboard WACC Interactivo' }");
    lines[menuCapitales] += ','; // add comma to the previous element
}

// 5. Update renderContent to add WaccView
let renderCapitales = lines.findIndex(l => l.includes("if (activeSubMenu === 'liquidez-mercado-capitales') return <MercadoCapitalesView />;"));
if (renderCapitales !== -1) {
    lines.splice(renderCapitales + 1, 0, "                if (activeSubMenu === 'liquidez-wacc') return <WaccView />;");
}

// 6. Wrap App return with SimulationProvider
let appReturnStart = lines.findIndex(l => l.includes('return (') && lines[l+1] && lines[l+1].includes('<div className="flex h-screen'));
if (appReturnStart === -1) {
    appReturnStart = lines.findIndex(l => l.includes('<div className="flex h-screen'));
}
if (appReturnStart !== -1) {
    // Insert <SimulationProvider> before <div className="flex h-screen...
    lines.splice(appReturnStart, 0, "            return (\n                <SimulationProvider>");
    
    // Find the end of App component
    let appEnd = lines.length - 1;
    while(appEnd > 0 && !lines[appEnd].includes('export default App;')) {
        appEnd--;
    }
    appEnd--; // go to the line before export
    lines.splice(appEnd, 0, "                </SimulationProvider>");
    
    // Remove the original "return (" if we added it
    let originalReturn = lines.findIndex((l, i) => i > appReturnStart && l.includes('return ('));
    if (originalReturn !== -1 && originalReturn < appReturnStart + 3) {
        lines.splice(originalReturn, 1);
    }
}

fs.writeFileSync('src/App.jsx', lines.join('\n'));
console.log('App.jsx cleaned and updated!');
