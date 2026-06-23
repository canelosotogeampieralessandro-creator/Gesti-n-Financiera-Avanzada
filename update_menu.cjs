const fs = require('fs');
let content = fs.readFileSync('panel_de_riesgos_exalmar.html', 'utf8');

const targetMenuStr = `                    { id: 'liquidez-simulador-bonos', title: 'Simulador de Emisión de Bonos' },
                    { id: 'liquidez-simulador-acciones', title: 'Simulador de Emisión de Acciones' },
                    { id: 'liquidez-escenarios', title: 'Stress Test: Escenarios Múltiples' },
                    { id: 'liquidez-estrategia', title: 'Motor de Decisión Financiera' },
                    { id: 'liquidez-wacc', title: 'Dashboard WACC Interactivo' }
                ]
            },
            { 
                id: 'crediticio', 
                title: 'Estrategia de Financiamiento', 
                type: 'expandable',
                subItems: [
                    { id: 'crediticio-matriz', title: 'Matriz de riesgo' },
                    { id: 'crediticio-mapa', title: 'Mapa de calor' }
                ]
            },`;

const replacementMenuStr = `                    { id: 'liquidez-simulador-bonos', title: 'Simulador de Emisión de Bonos' },
                    { id: 'liquidez-simulador-acciones', title: 'Simulador de Emisión de Acciones' },
                    { id: 'liquidez-escenarios', title: 'Stress Test: Escenarios Múltiples' },
                    { id: 'liquidez-wacc', title: 'Dashboard WACC Interactivo' }
                ]
            },
            { 
                id: 'crediticio', 
                title: 'Estrategia de Financiamiento', 
                type: 'expandable',
                subItems: [
                    { id: 'liquidez-estrategia', title: 'Motor de Decisión Financiera' }
                ]
            },`;

content = content.replace(targetMenuStr, replacementMenuStr);

fs.writeFileSync('panel_de_riesgos_exalmar.html', content);
console.log('Menu reorganized in panel_de_riesgos_exalmar.html');
