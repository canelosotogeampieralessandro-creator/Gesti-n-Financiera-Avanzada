const fs = require('fs');

const viewCode = fs.readFileSync('src/EstrategiaFinanciamientoView.jsx', 'utf8')
    .replace("import React, { useState, useEffect } from 'react';", '')
    .replace("import { useSimulation } from './context/SimulationContext';", '')
    .replace("export const EstrategiaFinanciamientoView = () => {", "const EstrategiaFinanciamientoView = () => {");

let lines = fs.readFileSync('panel_de_riesgos_exalmar.html', 'utf8').split('\n');

// 1. Insert View Code before WaccView
let waccViewIdx = lines.findIndex(l => l.includes('// --- INICIO WACC VIEW ---'));
lines.splice(waccViewIdx, 0, "// --- INICIO ESTRATEGIA VIEW ---\\n" + viewCode + "\\n// --- FIN ESTRATEGIA VIEW ---");

// 2. Update menuData
let menuEscenarios = lines.findIndex(l => l.includes("{ id: 'liquidez-escenarios', title: 'Stress Test: Escenarios Múltiples' }"));
if (menuEscenarios !== -1) {
    lines.splice(menuEscenarios + 1, 0, "                    { id: 'liquidez-estrategia', title: 'Motor de Decisión Financiera' },");
}

// 3. Update renderContent
let renderEscenarios = lines.findIndex(l => l.includes("if (activeSubMenu === 'liquidez-escenarios') return <EscenariosView />;"));
if (renderEscenarios !== -1) {
    lines.splice(renderEscenarios + 1, 0, "                if (activeSubMenu === 'liquidez-estrategia') return <EstrategiaFinanciamientoView />;");
}

fs.writeFileSync('panel_de_riesgos_exalmar.html', lines.join('\n'));
console.log('panel_de_riesgos_exalmar.html updated with EstrategiaFinanciamientoView!');
