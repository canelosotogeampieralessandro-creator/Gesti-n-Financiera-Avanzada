import React, { useState, useEffect } from 'react';
import { useSimulation } from './context/SimulationContext';

export const EscenariosView = () => {
    const { financialData, metrics } = useSimulation();

    // Valores base del Contexto
    const BASE_EBITDA = financialData.ebitda; // 100M
    const BASE_KD = financialData.kd; // 9.26%
    const BASE_KE = financialData.ke; // 12.4%

    // Escenarios Predefinidos
    const PRESETS = {
        base: { ebitda: BASE_EBITDA, kd: BASE_KD * 100, ke: BASE_KE * 100 },
        optimista: { ebitda: 130000, kd: 7.5, ke: 11.0 }, // La Niña / Buena pesca / Tasas bajas
        pesimista: { ebitda: 60000, kd: 11.5, ke: 14.5 } // El Niño / Mala pesca / Tasas altas
    };

    // Estado interactivo
    const [escenarioActivo, setEscenarioActivo] = useState('base');
    const [ebitdaSim, setEbitdaSim] = useState(PRESETS.base.ebitda);
    const [kdSim, setKdSim] = useState(PRESETS.base.kd);
    const [keSim, setKeSim] = useState(PRESETS.base.ke);

    // Métricas simuladas
    const [simMetrics, setSimMetrics] = useState({ wacc: 0, cobertura: 0 });

    const applyPreset = (key) => {
        setEscenarioActivo(key);
        setEbitdaSim(PRESETS[key].ebitda);
        setKdSim(PRESETS[key].kd);
        setKeSim(PRESETS[key].ke);
    };

    // Recalcular métricas cuando cambian los sliders
    useEffect(() => {
        const pesoDeuda = metrics.pesoDeuda;
        const pesoPatrimonio = metrics.pesoPatrimonio;
        
        // Simular WACC
        const costoDeudaDespuesImpuestos = (kdSim / 100) * (1 - financialData.tasaImpuesto);
        const nuevoWacc = (pesoDeuda * costoDeudaDespuesImpuestos) + (pesoPatrimonio * (keSim / 100));

        // Simular Cobertura (EBITDA / Gastos Financieros)
        // Ojo: Si el Kd sube, asumimos que SOLO la deuda futura es más cara, o que toda la deuda refinanciada es más cara.
        // Para simplificar y ver el efecto del estrés: Gastos financieros simulados = Deuda * (kdSim/100)
        const nuevosGastos = financialData.deuda * (kdSim / 100);
        const nuevaCobertura = nuevosGastos > 0 ? (ebitdaSim / nuevosGastos) : 0;

        setSimMetrics({
            wacc: nuevoWacc,
            cobertura: nuevaCobertura,
            gastos: nuevosGastos
        });

        // Desmarcar preset si se movió manualmente
        if (
            ebitdaSim !== PRESETS.optimista.ebitda && ebitdaSim !== PRESETS.pesimista.ebitda && ebitdaSim !== PRESETS.base.ebitda
        ) {
            setEscenarioActivo('manual');
        }
    }, [ebitdaSim, kdSim, keSim, financialData, metrics]);

    const formatNumber = (val) => new Intl.NumberFormat('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(val);
    const formatPercent = (val) => `${(val * 100).toFixed(2)}%`;

    // Normalización para los gráficos (Tornado)
    const MAX_WACC = 0.16; // 16% max scale
    const baseWaccWidth = (metrics.wacc / MAX_WACC) * 100;
    const simWaccWidth = (simMetrics.wacc / MAX_WACC) * 100;

    const MAX_COBERTURA = 8; // 8x max scale
    const baseCobWidth = Math.min((metrics.coberturaIntereses / MAX_COBERTURA) * 100, 100);
    const simCobWidth = Math.min((simMetrics.cobertura / MAX_COBERTURA) * 100, 100);

    return (
        <div className="flex flex-col h-full w-full bg-exalmar-light rounded-2xl p-6 shadow-inner overflow-y-auto animate-fade-in-up">
            <div className="mb-6">
                <h3 className="text-3xl font-black text-exalmar-blue tracking-tight uppercase">Análisis de Sensibilidad</h3>
                <p className="text-gray-500 mt-1 font-medium">Stress Test de la Estructura de Capital: Simula escenarios macroeconómicos y operativos extremos.</p>
            </div>

            {/* Presets */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <button 
                    onClick={() => applyPreset('optimista')}
                    className={`flex-1 p-4 rounded-xl shadow-md border-2 transition-all flex flex-col items-center gap-2 ${escenarioActivo === 'optimista' ? 'border-green-500 bg-green-50 text-green-700' : 'border-transparent bg-white hover:border-green-300'}`}
                >
                    <i className="ph ph-trend-up text-3xl text-green-500"></i>
                    <span className="font-black uppercase text-sm">Escenario Optimista</span>
                    <span className="text-xs text-center opacity-80">Fenómeno La Niña (Alta Cuota)<br/>Tasas FED a la baja</span>
                </button>
                <button 
                    onClick={() => applyPreset('base')}
                    className={`flex-1 p-4 rounded-xl shadow-md border-2 transition-all flex flex-col items-center gap-2 ${escenarioActivo === 'base' ? 'border-exalmar-blue bg-blue-50 text-exalmar-blue' : 'border-transparent bg-white hover:border-blue-300'}`}
                >
                    <i className="ph ph-equals text-3xl text-exalmar-blue"></i>
                    <span className="font-black uppercase text-sm">Escenario Base</span>
                    <span className="text-xs text-center opacity-80">Estado actual de la Compañía<br/>Datos reportados</span>
                </button>
                <button 
                    onClick={() => applyPreset('pesimista')}
                    className={`flex-1 p-4 rounded-xl shadow-md border-2 transition-all flex flex-col items-center gap-2 ${escenarioActivo === 'pesimista' ? 'border-red-500 bg-red-50 text-red-700' : 'border-transparent bg-white hover:border-red-300'}`}
                >
                    <i className="ph ph-warning-circle text-3xl text-red-500"></i>
                    <span className="font-black uppercase text-sm">Escenario Pesimista (Estrés)</span>
                    <span className="text-xs text-center opacity-80">Fenómeno El Niño Fuerte<br/>Tasas globales altas</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Sliders Manuales */}
                <div className="lg:col-span-5 bg-white rounded-2xl shadow-lg p-6 border-t-4 border-gray-400 flex flex-col gap-6">
                    <h4 className="text-gray-700 font-bold uppercase tracking-widest text-sm mb-2 flex items-center gap-2">
                        <i className="ph ph-faders text-gray-500 text-lg"></i>
                        Variables Críticas
                    </h4>
                    
                    {/* EBITDA */}
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-bold text-gray-600">EBITDA Anual (Miles US$)</label>
                            <span className="text-lg font-black text-gray-800">${formatNumber(ebitdaSim)}</span>
                        </div>
                        <input 
                            type="range" min="30000" max="180000" step="5000"
                            value={ebitdaSim}
                            onChange={(e) => { setEbitdaSim(Number(e.target.value)); setEscenarioActivo('manual'); }}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-600"
                        />
                        <div className="flex justify-between text-xs text-gray-400 font-medium">
                            <span>$30M</span>
                            <span>$180M</span>
                        </div>
                    </div>

                    {/* Costo de Deuda (Kd) */}
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-bold text-gray-600">Costo de Deuda (Kd)</label>
                            <span className="text-lg font-black text-orange-500">{kdSim.toFixed(2)}%</span>
                        </div>
                        <input 
                            type="range" min="5" max="18" step="0.1"
                            value={kdSim}
                            onChange={(e) => { setKdSim(Number(e.target.value)); setEscenarioActivo('manual'); }}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                        />
                        <div className="flex justify-between text-xs text-gray-400 font-medium">
                            <span>5.0%</span>
                            <span>18.0%</span>
                        </div>
                    </div>

                    {/* Costo de Patrimonio (Ke) */}
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-bold text-gray-600">Costo de Patrimonio (Ke)</label>
                            <span className="text-lg font-black text-purple-500">{keSim.toFixed(2)}%</span>
                        </div>
                        <input 
                            type="range" min="8" max="25" step="0.1"
                            value={keSim}
                            onChange={(e) => { setKeSim(Number(e.target.value)); setEscenarioActivo('manual'); }}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                        />
                        <div className="flex justify-between text-xs text-gray-400 font-medium">
                            <span>8.0%</span>
                            <span>25.0%</span>
                        </div>
                    </div>

                    <div className="mt-4 bg-gray-50 p-4 rounded-xl text-sm text-gray-600 flex items-start gap-3 border border-gray-200">
                        <i className="ph ph-info text-xl text-gray-400"></i>
                        <p>Mueve cualquier barra para entrar en modo <strong>Manual</strong> y observar la resiliencia del WACC y de los Ratios frente a los cambios.</p>
                    </div>
                </div>

                {/* Gráficos de Impacto */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    
                    {/* Alertas Tempranas (KPIs) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className={`p-5 rounded-2xl shadow-lg border-b-4 flex flex-col items-center justify-center transition-colors ${simMetrics.wacc > 0.12 ? 'bg-red-50 border-red-500' : 'bg-white border-exalmar-blue'}`}>
                            <span className="text-sm font-bold text-gray-500 mb-1 uppercase tracking-wider">Nuevo WACC</span>
                            <span className={`text-4xl font-black ${simMetrics.wacc > 0.12 ? 'text-red-600' : 'text-exalmar-blue'}`}>
                                {formatPercent(simMetrics.wacc)}
                            </span>
                            {simMetrics.wacc > 0.12 && <span className="text-xs font-bold text-red-500 mt-2 bg-red-100 px-2 py-1 rounded-full"><i className="ph ph-warning"></i> Costo de Capital Crítico</span>}
                        </div>

                        <div className={`p-5 rounded-2xl shadow-lg border-b-4 flex flex-col items-center justify-center transition-colors ${simMetrics.cobertura < 1.5 ? 'bg-red-50 border-red-500' : 'bg-white border-green-500'}`}>
                            <span className="text-sm font-bold text-gray-500 mb-1 uppercase tracking-wider">Cobertura Intereses</span>
                            <span className={`text-4xl font-black ${simMetrics.cobertura < 1.5 ? 'text-red-600' : 'text-green-600'}`}>
                                {formatNumber(simMetrics.cobertura)}x
                            </span>
                            {simMetrics.cobertura < 1.5 && <span className="text-xs font-bold text-red-500 mt-2 bg-red-100 px-2 py-1 rounded-full"><i className="ph ph-warning"></i> Riesgo de Liquidez / Default</span>}
                        </div>
                    </div>

                    {/* Gráfico Visual Comparativo (Tornado-style) */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 flex-grow flex flex-col">
                        <h4 className="text-gray-700 font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                            <i className="ph ph-chart-bar text-gray-500 text-lg"></i>
                            Impacto vs Línea Base
                        </h4>

                        <div className="flex flex-col gap-8 justify-center flex-grow">
                            
                            {/* Barra WACC */}
                            <div>
                                <div className="flex justify-between text-sm font-bold text-gray-600 mb-2">
                                    <span>Costo Ponderado de Capital (WACC)</span>
                                    <span>Escala: 0% - 16%</span>
                                </div>
                                <div className="relative h-12 bg-gray-100 rounded-lg overflow-hidden flex flex-col justify-center">
                                    {/* Linea Base */}
                                    <div className="absolute left-0 h-4 bg-gray-300 top-2 opacity-50 rounded-r-lg flex items-center" style={{ width: `${baseWaccWidth}%` }}>
                                    </div>
                                    {/* Simulado */}
                                    <div className={`absolute left-0 h-6 top-5 shadow-sm rounded-r-lg transition-all duration-500 flex items-center justify-end pr-2 ${simMetrics.wacc > metrics.wacc ? 'bg-red-400' : 'bg-green-400'}`} style={{ width: `${simWaccWidth}%` }}>
                                        <span className="text-xs font-black text-white">{formatPercent(simMetrics.wacc)}</span>
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-2 text-xs">
                                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-gray-300 rounded"></div> <span>Base: {formatPercent(metrics.wacc)}</span></div>
                                </div>
                            </div>

                            {/* Barra Cobertura */}
                            <div>
                                <div className="flex justify-between text-sm font-bold text-gray-600 mb-2">
                                    <span>Ratio de Cobertura de Intereses (EBITDA / Intereses)</span>
                                    <span>Escala: 0x - 8x</span>
                                </div>
                                <div className="relative h-12 bg-gray-100 rounded-lg overflow-hidden flex flex-col justify-center">
                                    {/* Linea Base */}
                                    <div className="absolute left-0 h-4 bg-gray-300 top-2 opacity-50 rounded-r-lg flex items-center" style={{ width: `${baseCobWidth}%` }}>
                                    </div>
                                    {/* Simulado */}
                                    <div className={`absolute left-0 h-6 top-5 shadow-sm rounded-r-lg transition-all duration-500 flex items-center justify-end pr-2 ${simMetrics.cobertura < 1.5 ? 'bg-red-400' : 'bg-blue-400'}`} style={{ width: `${simCobWidth}%` }}>
                                        <span className="text-xs font-black text-white">{formatNumber(simMetrics.cobertura)}x</span>
                                    </div>
                                    {/* Threshold Line */}
                                    <div className="absolute top-0 bottom-0 border-l-2 border-red-500 border-dashed z-10" style={{ left: `${(1.5 / MAX_COBERTURA) * 100}%` }}>
                                        <span className="absolute -top-1 left-1 text-[10px] text-red-600 font-bold bg-white/80 px-1 rounded">Riesgo (1.5x)</span>
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-2 text-xs">
                                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-gray-300 rounded"></div> <span>Base: {formatNumber(metrics.coberturaIntereses)}x</span></div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
