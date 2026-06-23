const fs = require('fs');
const lines = fs.readFileSync('panel_de_riesgos_exalmar.html', 'utf8').split('\n');

let appStart = -1;
let renderContent = -1;
let appReturn = -1;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('const App = () => {')) appStart = i;
    if (lines[i].includes('const renderContent = () => {')) renderContent = i;
    if (lines[i].includes('<div className="flex h-screen bg-gray-50 font-sans text-gray-800 overflow-hidden')) appReturn = i - 1;
}

console.log('appStart', appStart);
console.log('renderContent', renderContent);
console.log('appReturn', appReturn);
