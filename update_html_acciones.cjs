const fs = require('fs');

const viewCode = fs.readFileSync('src/SimuladorAccionesView.jsx', 'utf8')
    .replace("import React, { useState, useEffect } from 'react';", '')
    .replace("import { useSimulation } from './context/SimulationContext';", '')
    .replace("export const SimuladorAccionesView = () => {", "const SimuladorAccionesView = () => {");

let lines = fs.readFileSync('panel_de_riesgos_exalmar.html', 'utf8').split('\n');

// 1. Insert View Code before WaccView
let waccViewIdx = lines.findIndex(l => l.includes('// --- INICIO WACC VIEW ---'));
lines.splice(waccViewIdx, 0, "// --- INICIO SIMULADOR ACCIONES ---\\n" + viewCode + "\\n// --- FIN SIMULADOR ACCIONES ---");

// 2. Update menuData
let menuBonos = lines.findIndex(l => l.includes("{ id: 'liquidez-simulador-bonos', title: 'Simulador de Emisión de Bonos' }"));
if (menuBonos !== -1) {
    lines.splice(menuBonos + 1, 0, "                    { id: 'liquidez-simulador-acciones', title: 'Simulador de Emisión de Acciones' },");
}

// 3. Update renderContent
let renderBonos = lines.findIndex(l => l.includes("if (activeSubMenu === 'liquidez-simulador-bonos') return <SimuladorBonosView />;"));
if (renderBonos !== -1) {
    lines.splice(renderBonos + 1, 0, "                if (activeSubMenu === 'liquidez-simulador-acciones') return <SimuladorAccionesView />;");
}

fs.writeFileSync('panel_de_riesgos_exalmar.html', lines.join('\n'));
console.log('panel_de_riesgos_exalmar.html updated with SimuladorAccionesView!');
