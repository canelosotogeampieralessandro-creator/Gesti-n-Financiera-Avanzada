const fs = require('fs');

const viewCode = fs.readFileSync('src/SimuladorBonosView.jsx', 'utf8')
    .replace("import React, { useState, useEffect } from 'react';", '')
    .replace("import { useSimulation } from './context/SimulationContext';", '')
    .replace("export const SimuladorBonosView = () => {", "const SimuladorBonosView = () => {");

let lines = fs.readFileSync('panel_de_riesgos_exalmar.html', 'utf8').split('\n');

// 1. Insert View Code before WaccView
let waccViewIdx = lines.findIndex(l => l.includes('// --- INICIO WACC VIEW ---'));
lines.splice(waccViewIdx, 0, "// --- INICIO SIMULADOR BONOS ---\\n" + viewCode + "\\n// --- FIN SIMULADOR BONOS ---");

// 2. Update menuData
let menuWacc = lines.findIndex(l => l.includes("{ id: 'liquidez-wacc', title: 'Dashboard WACC Interactivo' }"));
if (menuWacc !== -1) {
    lines.splice(menuWacc, 0, "                    { id: 'liquidez-simulador-bonos', title: 'Simulador de Emisión de Bonos' },");
}

// 3. Update renderContent
let renderWacc = lines.findIndex(l => l.includes("if (activeSubMenu === 'liquidez-wacc') return <WaccView />;"));
if (renderWacc !== -1) {
    lines.splice(renderWacc, 0, "                if (activeSubMenu === 'liquidez-simulador-bonos') return <SimuladorBonosView />;");
}

fs.writeFileSync('panel_de_riesgos_exalmar.html', lines.join('\n'));
console.log('panel_de_riesgos_exalmar.html updated with SimuladorBonosView!');
