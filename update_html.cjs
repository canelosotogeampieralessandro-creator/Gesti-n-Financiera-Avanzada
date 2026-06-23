const fs = require('fs');

const contextCode = `
            // --- INICIO CONTEXTO SIMULACION ---
            const { createContext, useContext, useEffect } = React;
            const INITIAL_STATE = {
                deuda: 300000,
                patrimonio: 317089,
                ebitda: 100000,
                gastosFinancieros: 27807,
                tasaImpuesto: 0.295,
                kd: 0.0926,
                ke: 0.124,
            };
            const SimulationContext = createContext();
            const useSimulation = () => useContext(SimulationContext);
            
            const SimulationProvider = ({ children }) => {
                const [financialData, setFinancialData] = useState(INITIAL_STATE);
                const [metrics, setMetrics] = useState({
                    wacc: 0, ratioDeudaPatrimonio: 0, coberturaIntereses: 0, pesoDeuda: 0, pesoPatrimonio: 0, costoDeudaDespuesImpuestos: 0
                });

                const calculateMetrics = (data) => {
                    const { deuda, patrimonio, ebitda, gastosFinancieros, tasaImpuesto, kd, ke } = data;
                    const valorTotal = deuda + patrimonio;
                    const pesoDeuda = deuda / valorTotal;
                    const pesoPatrimonio = patrimonio / valorTotal;
                    const costoDeudaDespuesImpuestos = kd * (1 - tasaImpuesto);
                    const wacc = (pesoDeuda * costoDeudaDespuesImpuestos) + (pesoPatrimonio * ke);
                    const ratioDeudaPatrimonio = deuda / patrimonio;
                    const coberturaIntereses = gastosFinancieros > 0 ? (ebitda / gastosFinancieros) : 0;
                    setMetrics({ wacc, ratioDeudaPatrimonio, coberturaIntereses, pesoDeuda, pesoPatrimonio, costoDeudaDespuesImpuestos });
                };

                useEffect(() => { calculateMetrics(financialData); }, [financialData]);
                const updateSimulation = (updates) => { setFinancialData(prev => ({ ...prev, ...updates })); };
                const resetSimulation = () => { setFinancialData(INITIAL_STATE); };

                return (
                    <SimulationContext.Provider value={{ financialData, metrics, updateSimulation, resetSimulation }}>
                        {children}
                    </SimulationContext.Provider>
                );
            };
            // --- FIN CONTEXTO SIMULACION ---
`;

const waccViewCode = `
            // --- INICIO WACC VIEW ---
            const WaccView = () => {
                const { financialData, metrics, resetSimulation } = useSimulation();

                const formatPercent = (value) => \`\${(value * 100).toFixed(2)}%\`;
                const formatNumber = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

                const colorDeuda = "#ff9800"; 
                const colorPatrimonio = "#8b5cf6"; 
                const donaGradient = \`conic-gradient(\${colorDeuda} 0% \${metrics.pesoDeuda * 100}%, \${colorPatrimonio} \${metrics.pesoDeuda * 100}% 100%)\`;

                return (
                    <div className="flex flex-col h-full w-full bg-exalmar-light rounded-2xl p-6 shadow-inner overflow-y-auto animate-fade-in-up">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h3 className="text-3xl font-black text-exalmar-blue tracking-tight uppercase">Dashboard del WACC</h3>
                                <p className="text-gray-500 mt-1 font-medium">Costo Promedio Ponderado de Capital en Tiempo Real</p>
                            </div>
                            <button 
                                onClick={resetSimulation}
                                className="flex items-center gap-2 bg-white text-gray-600 px-4 py-2 rounded-lg font-bold shadow-sm hover:shadow-md transition-all border border-gray-200"
                            >
                                <i className="ph ph-arrow-counter-clockwise"></i>
                                Reiniciar Escenario
                            </button>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
                            
                            {/* 1. Medidor Principal WACC */}
                            <div className="bg-white rounded-2xl shadow-lg border-t-4 border-exalmar-blue p-6 flex flex-col items-center justify-center relative overflow-hidden group">
                                <div className="absolute -top-10 -right-10 text-exalmar-blue/5">
                                    <i className="ph ph-speedometer text-9xl"></i>
                                </div>
                                <h4 className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-4">WACC Actual</h4>
                                <div className="relative flex items-center justify-center w-48 h-48 mb-2">
                                    <svg className="absolute inset-0 w-full h-full text-exalmar-blue/20 animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5" />
                                    </svg>
                                    
                                    <div className="bg-gradient-to-br from-exalmar-blue to-blue-700 text-white w-40 h-40 rounded-full flex flex-col items-center justify-center shadow-inner z-10">
                                        <span className="text-4xl font-black">{formatPercent(metrics.wacc)}</span>
                                        <span className="text-xs font-medium opacity-80 mt-1">Costo de Capital</span>
                                    </div>
                                </div>
                                <div className="text-center mt-4 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-xl">
                                    Representa el retorno mínimo exigido por los inversionistas y acreedores.
                                </div>
                            </div>

                            {/* 2. Estructura de Capital (Gráfico Dona) */}
                            <div className="bg-white rounded-2xl shadow-lg border-t-4 border-gray-300 p-6 flex flex-col items-center justify-center">
                                <h4 className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-6">Estructura de Capital</h4>
                                
                                <div className="relative w-40 h-40 rounded-full flex items-center justify-center shadow-sm" style={{ background: donaGradient }}>
                                    <div className="w-28 h-28 bg-white rounded-full flex flex-col items-center justify-center shadow-inner z-10">
                                        <span className="font-bold text-gray-800 text-sm">Valor Total</span>
                                        <span className="font-black text-gray-900 text-xs">US$ {(financialData.deuda + financialData.patrimonio) / 1000}M</span>
                                    </div>
                                </div>

                                <div className="flex justify-between w-full mt-6 px-2 gap-4">
                                    <div className="flex flex-col items-center flex-1">
                                        <div className="flex items-center gap-1 mb-1">
                                            <span className="w-3 h-3 rounded-full bg-[#ff9800]"></span>
                                            <span className="text-xs font-bold text-gray-600">Deuda (Wd)</span>
                                        </div>
                                        <span className="text-lg font-black text-[#ff9800]">{formatPercent(metrics.pesoDeuda)}</span>
                                        <span className="text-[10px] text-gray-400">{formatNumber(financialData.deuda)}</span>
                                    </div>
                                    <div className="w-px bg-gray-200"></div>
                                    <div className="flex flex-col items-center flex-1">
                                        <div className="flex items-center gap-1 mb-1">
                                            <span className="w-3 h-3 rounded-full bg-[#8b5cf6]"></span>
                                            <span className="text-xs font-bold text-gray-600">Patrimonio (We)</span>
                                        </div>
                                        <span className="text-lg font-black text-[#8b5cf6]">{formatPercent(metrics.pesoPatrimonio)}</span>
                                        <span className="text-[10px] text-gray-400">{formatNumber(financialData.patrimonio)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* 3. Desglose de Costos y Ratios */}
                            <div className="flex flex-col gap-4">
                                {/* Costos Individuales */}
                                <div className="bg-white rounded-2xl shadow-md p-4 flex gap-4 flex-1">
                                    <div className="flex-1 bg-orange-50 rounded-xl p-3 border border-orange-100 flex flex-col justify-center">
                                        <div className="text-orange-500 text-xs font-bold mb-1 uppercase">Costo Deuda (Kd)</div>
                                        <div className="text-2xl font-black text-orange-700">{formatPercent(financialData.kd)}</div>
                                        <div className="text-[10px] text-orange-600 mt-1">Post-Impuesto: {formatPercent(metrics.costoDeudaDespuesImpuestos || 0)}</div>
                                    </div>
                                    <div className="flex-1 bg-purple-50 rounded-xl p-3 border border-purple-100 flex flex-col justify-center">
                                        <div className="text-purple-500 text-xs font-bold mb-1 uppercase">Costo Patrim. (Ke)</div>
                                        <div className="text-2xl font-black text-purple-700">{formatPercent(financialData.ke)}</div>
                                        <div className="text-[10px] text-purple-600 mt-1">Estimado vía CAPM</div>
                                    </div>
                                </div>

                                {/* Ratios Financieros Clave */}
                                <div className="bg-white rounded-2xl shadow-md p-5 flex-1 border-l-4 border-exalmar-blue flex flex-col justify-center">
                                    <h4 className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-3">Salud Financiera</h4>
                                    
                                    <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
                                        <div className="flex items-center gap-2">
                                            <i className="ph ph-scales text-gray-400 text-lg"></i>
                                            <span className="text-sm font-bold text-gray-700">Deuda / Patrimonio</span>
                                        </div>
                                        <span className={\`font-black \${metrics.ratioDeudaPatrimonio > 1.5 ? 'text-red-500' : 'text-exalmar-green'}\`}>
                                            {metrics.ratioDeudaPatrimonio.toFixed(2)}x
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <i className="ph ph-shield-check text-gray-400 text-lg"></i>
                                            <span className="text-sm font-bold text-gray-700">Cobertura de Intereses</span>
                                        </div>
                                        <span className={\`font-black \${metrics.coberturaIntereses < 3 ? 'text-red-500' : 'text-exalmar-green'}\`}>
                                            {metrics.coberturaIntereses.toFixed(2)}x
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="bg-blue-50 text-exalmar-blue p-4 rounded-xl flex items-start gap-4">
                            <i className="ph ph-info text-2xl mt-0.5"></i>
                            <p className="text-sm font-medium leading-relaxed">
                                Este motor financiero calculará automáticamente el impacto de cualquier simulación futura (emisión de bonos o acciones). Observa cómo se comporta el <strong>WACC</strong>, el ratio <strong>Deuda/Patrimonio</strong> y la <strong>Cobertura de Intereses</strong> al modificar la estructura de financiamiento en los próximos apartados.
                            </p>
                        </div>
                    </div>
                );
            };
            // --- FIN WACC VIEW ---
`;

let lines = fs.readFileSync('panel_de_riesgos_exalmar.html', 'utf8').split('\n');

// 1. Insert Context and WaccView after menuData
let menuDataIdx = lines.findIndex(l => l.includes('const menuData = ['));
lines.splice(menuDataIdx, 0, contextCode + waccViewCode);

// 2. Update menuData to add WaccView
let menuCapitales = lines.findIndex(l => l.includes("{ id: 'liquidez-mercado-capitales', title: 'Mercado de Capitales' }"));
if (menuCapitales !== -1) {
    lines.splice(menuCapitales + 1, 0, "                    { id: 'liquidez-wacc', title: 'Dashboard WACC Interactivo' }");
    lines[menuCapitales] += ','; // add comma
}

// 3. Update renderContent to add WaccView
let renderCapitales = lines.findIndex(l => l.includes("if (activeSubMenu === 'liquidez-mercado-capitales') return <MercadoCapitalesView />;"));
if (renderCapitales !== -1) {
    lines.splice(renderCapitales + 1, 0, "                if (activeSubMenu === 'liquidez-wacc') return <WaccView />;");
}

// 4. Wrap App return with SimulationProvider
let appReturnStart = lines.findIndex((l, i) => i > renderCapitales && l.includes('return (') && lines[i+1] && lines[i+1].includes('<div className="flex w-full h-screen'));
if (appReturnStart === -1) appReturnStart = lines.findIndex(l => l.includes('<div className="flex w-full h-screen'));
if (appReturnStart !== -1) {
    lines.splice(appReturnStart, 0, "            return (\\n                <SimulationProvider>");
    
    // Find end of App component
    let rootLine = lines.findIndex(l => l.includes('const root = ReactDOM.createRoot'));
    let appEnd = rootLine - 1;
    while(appEnd > 0 && !lines[appEnd].includes('};')) appEnd--;
    
    lines.splice(appEnd, 0, "                </SimulationProvider>\\n            );");
    
    let origRet = lines.findIndex((l, i) => i > appReturnStart && i < appReturnStart+5 && l.includes('return ('));
    if (origRet !== -1) lines.splice(origRet, 1);
}

fs.writeFileSync('panel_de_riesgos_exalmar.html', lines.join('\n'));
console.log('panel_de_riesgos_exalmar.html updated!');
