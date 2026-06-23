const fs = require('fs');

const lines = fs.readFileSync('panel_de_riesgos_exalmar.html', 'utf8').split('\n');

let startIdx = lines.findIndex(l => l.includes('const { useState } = React;'));
let endIdx = lines.findIndex(l => l.includes('const root = ReactDOM.createRoot'));

let code = lines.slice(startIdx + 1, endIdx).join('\n');

const imports = `import React, { useState } from "react";
import "./index.css";
import { MercadoMonetarioView } from "./MercadoMonetarioView";
import { SimuladorTasasView } from "./SimuladorTasasView";
import { MercadoCapitalesView } from "./MercadoCapitalesView";
import { WaccView } from "./WaccView";
import { SimulationProvider } from "./context/SimulationContext";

`;

const exportStmt = `\n\nexport default App;\n`;

fs.writeFileSync('src/App.jsx', imports + code + exportStmt);
console.log('App.jsx created');
