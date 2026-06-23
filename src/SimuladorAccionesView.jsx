import React, { useState, useEffect } from 'react';
import { useSimulation } from './context/SimulationContext';

export const SimuladorAccionesView = () => {
    const { financialData, metrics, updateSimulation } = useSimulation();

    // Valores interactivos
    const [nuevasAccionesM, setNuevasAccionesM] = useState(20); // 20 Millones
    const [precioAccion, setPrecioAccion] = useState(0.50); // US$ 0.50

    // Constantes
    const ACCIONES_BASE_M = 295.5; // Millones de acciones actuales
    
    // Estado simulado local
    const [simulatedMetrics, setSimulatedMetrics] = useState({ ...metrics, roe: 0 });
    const [simulatedData, setSimulatedData] = useState({ ...financialData });
    const [metricasBase, setMetricasBase] = useState({ roe: 0, utilidadNeta: 0 });

    // Recalcular estado simulado cada vez que cambia el slider o el financialData base
    useEffect(() => {
        // Cálculo de Utilidad Neta Base (Asumiendo Utilidad = (EBITDA - Gastos) * (1 - T))
        const utilidadNetaBase = (financialData.ebitda - financialData.gastosFinancieros) * (1 - financialData.tasaImpuesto);
        const roeActual = utilidadNetaBase / financialData.patrimonio;

        setMetricasBase({
            roe: roeActual,
            utilidadNeta: utilidadNetaBase
        });

        // Simulación
        // Monto recaudado en miles de dólares
        const montoRecaudadoMiles = (nuevasAccionesM * 1000000 * precioAccion) / 1000;
        
        // Nuevo Patrimonio: Patrimonio actual + Monto recaudado
        const nuevoPatrimonio = financialData.patrimonio + montoRecaudadoMiles;
        
        // Nuevo ROE (Asumiendo que la Utilidad Neta se mantiene constante a corto plazo)
        const nuevoRoe = utilidadNetaBase / nuevoPatrimonio;

        // Nuevos cálculos derivados (WACC, Ratio Deuda/Patrimonio)
        const valorTotal = financialData.deuda + nuevoPatrimonio;
        const pesoDeuda = financialData.deuda / valorTotal;
        const pesoPatrimonio = nuevoPatrimonio / valorTotal;
        
        const costoDeudaDespuesImpuestos = financialData.kd * (1 - financialData.tasaImpuesto);
        const wacc = (pesoDeuda * costoDeudaDespuesImpuestos) + (pesoPatrimonio * financialData.ke);
        
        const ratioDeudaPatrimonio = financialData.deuda / nuevoPatrimonio;

        setSimulatedData({
            ...financialData,
            patrimonio: nuevoPatrimonio
        });

        setSimulatedMetrics({
            ...metrics,
            wacc,
            ratioDeudaPatrimonio,
            pesoDeuda,
            pesoPatrimonio,
            roe: nuevoRoe
        });
    }, [nuevasAccionesM, precioAccion, financialData, metrics]);

    const formatNumber = (val) => new Intl.NumberFormat('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(val);
    const formatPercent = (val) => `${(val * 100).toFixed(2)}%`;

    const handleApplySimulation = () => {
        updateSimulation({
            patrimonio: simulatedData.patrimonio
        });
        alert('¡Simulación de Acciones aplicada con éxito! El estado global (WACC) ha sido actualizado.');
    };

    const porcentajeDilucion = (nuevasAccionesM / (ACCIONES_BASE_M + nuevasAccionesM)) * 100;

    return (
        <div className="flex flex-col h-full w-full bg-exalmar-light rounded-2xl p-6 shadow-inner overflow-y-auto animate-fade-in-up">
            <div className="mb-6">
                <h3 className="text-3xl font-black text-exalmar-blue tracking-tight uppercase">Simulador de Emisión de Acciones</h3>
                <p className="text-gray-500 mt-1 font-medium">Laboratorio de pruebas: Analiza el impacto de levantar capital patrimonial y la dilución del ROE.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                
                {/* Panel de Controles (Sliders) */}
                <div className="lg:col-span-4 bg-white rounded-2xl shadow-lg p-6 border-t-4 border-[#8b5cf6] flex flex-col gap-6">
                    <h4 className="text-gray-700 font-bold uppercase tracking-widest text-sm mb-2 flex items-center gap-2">
                        <i className="ph ph-sliders text-[#8b5cf6] text-lg"></i>
                        Estructura de la Emisión
                    </h4>
                    
                    {/* Acciones Slider */}
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-bold text-gray-600">Nuevas Acciones (Millones)</label>
                            <span className="text-lg font-black text-[#8b5cf6]">{nuevasAccionesM}M</span>
                        </div>
                        <input 
                            type="range" min="0" max="100" step="1"
                            value={nuevasAccionesM}
                            onChange={(e) => setNuevasAccionesM(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#8b5cf6]"
                        />
                        <div className="flex justify-between text-xs text-gray-400 font-medium">
                            <span>0M</span>
                            <span>100M</span>
                        </div>
                    </div>

                    {/* Precio Slider */}
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-bold text-gray-600">Precio por Acción (US$)</label>
                            <span className="text-lg font-black text-green-500">${precioAccion.toFixed(2)}</span>
                        </div>
                        <input 
                            type="range" min="0.30" max="1.00" step="0.05"
                            value={precioAccion}
                            onChange={(e) => setPrecioAccion(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                        />
                        <div className="flex justify-between text-xs text-gray-400 font-medium">
                            <span>$0.30</span>
                            <span>$1.00</span>
                        </div>
                    </div>

                    {/* Resumen de Recaudación */}
                    <div className="mt-4 bg-[#8b5cf6]/10 p-4 rounded-xl border border-[#8b5cf6]/20">
                        <div className="text-xs font-bold text-[#8b5cf6] uppercase mb-1">Capital a Recaudar</div>
                        <div className="text-2xl font-black text-gray-800">${formatNumber(nuevasAccionesM * precioAccion)}M</div>
                        <div className="text-xs text-gray-500 mt-2">Añadirá liquidez y engrosará el Patrimonio.</div>
                    </div>

                    <button 
                        onClick={handleApplySimulation}
                        className="mt-auto bg-[#8b5cf6] hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                    >
                        <i className="ph ph-check-circle text-xl"></i>
                        Aplicar Emisión al WACC
                    </button>
                </div>

                {/* Panel de Impacto (Comparativa) */}
                <div className="lg:col-span-8 bg-white rounded-2xl shadow-lg p-6 border-t-4 border-gray-300">
                    <h4 className="text-gray-700 font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                        <i className="ph ph-chart-line-up text-gray-500 text-lg"></i>
                        Impacto Financiero (Actual vs Simulado)
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* WACC */}
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col justify-between">
                            <span className="text-sm font-bold text-gray-500 mb-2">Costo Promedio Ponderado (WACC)</span>
                            <div className="flex items-center justify-between">
                                <div className="text-gray-400">
                                    <div className="text-xs">Actual</div>
                                    <div className="text-xl font-bold">{formatPercent(metrics.wacc)}</div>
                                </div>
                                <i className="ph ph-arrow-right text-gray-300 text-xl"></i>
                                <div className={simulatedMetrics.wacc > metrics.wacc ? 'text-red-500' : 'text-exalmar-green'}>
                                    <div className="text-xs font-bold text-gray-500">Simulado</div>
                                    <div className="text-2xl font-black">{formatPercent(simulatedMetrics.wacc)}</div>
                                </div>
                            </div>
                        </div>

                        {/* Patrimonio Total */}
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col justify-between">
                            <span className="text-sm font-bold text-gray-500 mb-2">Patrimonio Total (Miles US$)</span>
                            <div className="flex items-center justify-between">
                                <div className="text-gray-400">
                                    <div className="text-xs">Actual</div>
                                    <div className="text-xl font-bold">${formatNumber(financialData.patrimonio)}</div>
                                </div>
                                <i className="ph ph-arrow-right text-gray-300 text-xl"></i>
                                <div className="text-[#8b5cf6]">
                                    <div className="text-xs font-bold text-gray-500">Simulado</div>
                                    <div className="text-2xl font-black">${formatNumber(simulatedData.patrimonio)}</div>
                                </div>
                            </div>
                        </div>

                        {/* ROE */}
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col justify-between">
                            <span className="text-sm font-bold text-gray-500 mb-2">ROE (Return on Equity)</span>
                            <div className="flex items-center justify-between">
                                <div className="text-gray-400">
                                    <div className="text-xs">Actual</div>
                                    <div className="text-xl font-bold">{formatPercent(metricasBase.roe)}</div>
                                </div>
                                <i className="ph ph-arrow-right text-gray-300 text-xl"></i>
                                <div className={simulatedMetrics.roe < metricasBase.roe ? 'text-red-500' : 'text-exalmar-green'}>
                                    <div className="text-xs font-bold text-gray-500">Simulado</div>
                                    <div className="text-2xl font-black">{formatPercent(simulatedMetrics.roe)}</div>
                                </div>
                            </div>
                        </div>

                        {/* Ratio Deuda / Patrimonio */}
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col justify-between">
                            <span className="text-sm font-bold text-gray-500 mb-2">Apalancamiento (Deuda / Patrimonio)</span>
                            <div className="flex items-center justify-between">
                                <div className="text-gray-400">
                                    <div className="text-xs">Actual</div>
                                    <div className="text-xl font-bold">{formatNumber(metrics.ratioDeudaPatrimonio)}x</div>
                                </div>
                                <i className="ph ph-arrow-right text-gray-300 text-xl"></i>
                                <div className={simulatedMetrics.ratioDeudaPatrimonio > metrics.ratioDeudaPatrimonio ? 'text-red-500' : 'text-exalmar-green'}>
                                    <div className="text-xs font-bold text-gray-500">Simulado</div>
                                    <div className="text-2xl font-black">{formatNumber(simulatedMetrics.ratioDeudaPatrimonio)}x</div>
                                </div>
                            </div>
                        </div>

                    </div>
                    
                    {/* Explicación Dinámica */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-purple-50 border border-purple-100 flex gap-4">
                            <i className="ph ph-users-three text-2xl text-purple-600 mt-1"></i>
                            <div>
                                <h5 className="font-bold text-purple-800 text-sm mb-1">Efecto Dilución</h5>
                                <p className="text-xs text-purple-700 leading-relaxed">
                                    Pasar de {ACCIONES_BASE_M}M a <strong>{(ACCIONES_BASE_M + nuevasAccionesM).toFixed(1)}M</strong> de acciones significa que los accionistas actuales sufrirán una dilución del <strong>{porcentajeDilucion.toFixed(2)}%</strong> sobre su participación, diluyendo temporalmente el ROE de {formatPercent(metricasBase.roe)} a {formatPercent(simulatedMetrics.roe)}.
                                </p>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-green-50 border border-green-100 flex gap-4">
                            <i className="ph ph-shield-check text-2xl text-green-600 mt-1"></i>
                            <div>
                                <h5 className="font-bold text-green-800 text-sm mb-1">Impacto en Riesgo</h5>
                                <p className="text-xs text-green-700 leading-relaxed">
                                    La inyección de capital baja tu nivel de apalancamiento a <strong>{formatNumber(simulatedMetrics.ratioDeudaPatrimonio)}x</strong>. Sin embargo, dado que el Patrimonio (Ke = 12.4%) es más costoso que la Deuda (Kd = 9.26%), <strong>el WACC Global subirá</strong>, encareciendo tu costo de capital promedio.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
