const fs = require('fs');

const viewCode = fs.readFileSync('src/EscenariosView.jsx', 'utf8')
    .replace("import React, { useState, useEffect } from 'react';", '')
    .replace("import { useSimulation } from './context/SimulationContext';", '')
    .replace("export const EscenariosView = () => {", "const EscenariosView = () => {");

let lines = fs.readFileSync('panel_de_riesgos_exalmar.html', 'utf8').split('\n');

// 1. Insert View Code before WaccView
let waccViewIdx = lines.findIndex(l => l.includes('// --- INICIO WACC VIEW ---'));
lines.splice(waccViewIdx, 0, "// --- INICIO ESCENARIOS VIEW ---\\n" + viewCode + "\\n// --- FIN ESCENARIOS VIEW ---");

// 2. Update menuData
let menuAcciones = lines.findIndex(l => l.includes("{ id: 'liquidez-simulador-acciones', title: 'Simulador de Emisión de Acciones' }"));
if (menuAcciones !== -1) {
    lines.splice(menuAcciones + 1, 0, "                    { id: 'liquidez-escenarios', title: 'Stress Test: Escenarios Múltiples' },");
}

// 3. Update renderContent
let renderAcciones = lines.findIndex(l => l.includes("if (activeSubMenu === 'liquidez-simulador-acciones') return <SimuladorAccionesView />;"));
if (renderAcciones !== -1) {
    lines.splice(renderAcciones + 1, 0, "                if (activeSubMenu === 'liquidez-escenarios') return <EscenariosView />;");
}

fs.writeFileSync('panel_de_riesgos_exalmar.html', lines.join('\n'));
console.log('panel_de_riesgos_exalmar.html updated with EscenariosView!');
