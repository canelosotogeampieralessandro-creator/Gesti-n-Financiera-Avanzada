import React, { useState, useEffect } from 'react';
import { useSimulation } from './context/SimulationContext';

export const SimuladorBonosView = () => {
    const { financialData, metrics, updateSimulation } = useSimulation();

    // Valores interactivos (en millones de dólares y porcentajes)
    const [montoEmisionM, setMontoEmisionM] = useState(100); // 100 Millones
    const [tasaCupon, setTasaCupon] = useState(8.5); // 8.5%
    const [plazo, setPlazo] = useState(7); // 7 años

    // Estado simulado local
    const [simulatedMetrics, setSimulatedMetrics] = useState({ ...metrics });
    const [simulatedData, setSimulatedData] = useState({ ...financialData });

    // Recalcular estado simulado cada vez que cambia el slider o el financialData base
    useEffect(() => {
        // El monto de emisión se ingresa en millones, pero la data está en miles (x1000)
        const montoEmisionMiles = montoEmisionM * 1000;
        
        // Nueva deuda: Deuda actual + nueva emisión
        const nuevaDeuda = financialData.deuda + montoEmisionMiles;
        
        // Nuevos gastos: Gastos actuales + (nueva emisión * tasa cupón)
        // La tasa cupón viene en porcentaje (ej 8.5) -> / 100
        const nuevoGastoEmision = montoEmisionMiles * (tasaCupon / 100);
        const nuevosGastosFinancieros = financialData.gastosFinancieros + nuevoGastoEmision;
        
        // Nuevo Kd global = Gastos totales / Deuda total
        const nuevoKd = nuevosGastosFinancieros / nuevaDeuda;

        // Nuevos cálculos derivados
        const valorTotal = nuevaDeuda + financialData.patrimonio;
        const pesoDeuda = nuevaDeuda / valorTotal;
        const pesoPatrimonio = financialData.patrimonio / valorTotal;
        
        const costoDeudaDespuesImpuestos = nuevoKd * (1 - financialData.tasaImpuesto);
        const wacc = (pesoDeuda * costoDeudaDespuesImpuestos) + (pesoPatrimonio * financialData.ke);
        
        const ratioDeudaPatrimonio = nuevaDeuda / financialData.patrimonio;
        const coberturaIntereses = nuevosGastosFinancieros > 0 ? (financialData.ebitda / nuevosGastosFinancieros) : 0;

        setSimulatedData({
            ...financialData,
            deuda: nuevaDeuda,
            gastosFinancieros: nuevosGastosFinancieros,
            kd: nuevoKd
        });

        setSimulatedMetrics({
            wacc,
            ratioDeudaPatrimonio,
            coberturaIntereses,
            pesoDeuda,
            pesoPatrimonio,
            costoDeudaDespuesImpuestos
        });
    }, [montoEmisionM, tasaCupon, plazo, financialData]);

    const formatNumber = (val) => new Intl.NumberFormat('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(val);
    const formatPercent = (val) => `${(val * 100).toFixed(2)}%`;

    const handleApplySimulation = () => {
        updateSimulation({
            deuda: simulatedData.deuda,
            gastosFinancieros: simulatedData.gastosFinancieros,
            kd: simulatedData.kd
        });
        alert('¡Simulación aplicada con éxito! El estado global (WACC) ha sido actualizado.');
    };

    return (
        <div className="flex flex-col h-full w-full bg-exalmar-light rounded-2xl p-6 shadow-inner overflow-y-auto animate-fade-in-up">
            <div className="mb-6">
                <h3 className="text-3xl font-black text-exalmar-blue tracking-tight uppercase">Simulador de Emisión de Bonos</h3>
                <p className="text-gray-500 mt-1 font-medium">Laboratorio de pruebas: Analiza el impacto de emitir nueva deuda en el mercado de capitales (en US$).</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                
                {/* Panel de Controles (Sliders) */}
                <div className="lg:col-span-4 bg-white rounded-2xl shadow-lg p-6 border-t-4 border-exalmar-blue flex flex-col gap-6">
                    <h4 className="text-gray-700 font-bold uppercase tracking-widest text-sm mb-2 flex items-center gap-2">
                        <i className="ph ph-sliders text-exalmar-blue text-lg"></i>
                        Parámetros del Bono
                    </h4>
                    
                    {/* Monto Slider */}
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-bold text-gray-600">Monto de Emisión (US$)</label>
                            <span className="text-lg font-black text-exalmar-blue">{montoEmisionM}M</span>
                        </div>
                        <input 
                            type="range" min="0" max="250" step="10"
                            value={montoEmisionM}
                            onChange={(e) => setMontoEmisionM(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-exalmar-blue"
                        />
                        <div className="flex justify-between text-xs text-gray-400 font-medium">
                            <span>0M</span>
                            <span>250M</span>
                        </div>
                    </div>

                    {/* Tasa Cupón Slider */}
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-bold text-gray-600">Tasa Cupón Anual</label>
                            <span className="text-lg font-black text-orange-500">{tasaCupon.toFixed(1)}%</span>
                        </div>
                        <input 
                            type="range" min="4" max="15" step="0.1"
                            value={tasaCupon}
                            onChange={(e) => setTasaCupon(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                        />
                        <div className="flex justify-between text-xs text-gray-400 font-medium">
                            <span>4.0%</span>
                            <span>15.0%</span>
                        </div>
                    </div>

                    {/* Plazo Slider */}
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-bold text-gray-600">Plazo del Bono</label>
                            <span className="text-lg font-black text-purple-500">{plazo} años</span>
                        </div>
                        <input 
                            type="range" min="3" max="15" step="1"
                            value={plazo}
                            onChange={(e) => setPlazo(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                        />
                        <div className="flex justify-between text-xs text-gray-400 font-medium">
                            <span>3 años</span>
                            <span>15 años</span>
                        </div>
                    </div>

                    <button 
                        onClick={handleApplySimulation}
                        className="mt-auto bg-exalmar-blue hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                    >
                        <i className="ph ph-check-circle text-xl"></i>
                        Aplicar Emisión al WACC
                    </button>
                </div>

                {/* Panel de Impacto (Comparativa) */}
                <div className="lg:col-span-8 bg-white rounded-2xl shadow-lg p-6 border-t-4 border-gray-300">
                    <h4 className="text-gray-700 font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                        <i className="ph ph-scales text-gray-500 text-lg"></i>
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

                        {/* Deuda Total */}
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col justify-between">
                            <span className="text-sm font-bold text-gray-500 mb-2">Deuda Total (Miles US$)</span>
                            <div className="flex items-center justify-between">
                                <div className="text-gray-400">
                                    <div className="text-xs">Actual</div>
                                    <div className="text-xl font-bold">${formatNumber(financialData.deuda)}</div>
                                </div>
                                <i className="ph ph-arrow-right text-gray-300 text-xl"></i>
                                <div className="text-orange-500">
                                    <div className="text-xs font-bold text-gray-500">Simulado</div>
                                    <div className="text-2xl font-black">${formatNumber(simulatedData.deuda)}</div>
                                </div>
                            </div>
                        </div>

                        {/* Cobertura de Intereses */}
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col justify-between">
                            <span className="text-sm font-bold text-gray-500 mb-2">Cobertura de Intereses (EBITDA / Gastos)</span>
                            <div className="flex items-center justify-between">
                                <div className="text-gray-400">
                                    <div className="text-xs">Actual</div>
                                    <div className="text-xl font-bold">{formatNumber(metrics.coberturaIntereses)}x</div>
                                </div>
                                <i className="ph ph-arrow-right text-gray-300 text-xl"></i>
                                <div className={simulatedMetrics.coberturaIntereses < metrics.coberturaIntereses ? 'text-red-500' : 'text-exalmar-green'}>
                                    <div className="text-xs font-bold text-gray-500">Simulado</div>
                                    <div className="text-2xl font-black">{formatNumber(simulatedMetrics.coberturaIntereses)}x</div>
                                </div>
                            </div>
                        </div>

                        {/* Ratio Deuda / Patrimonio */}
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col justify-between">
                            <span className="text-sm font-bold text-gray-500 mb-2">Ratio Deuda / Patrimonio</span>
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
                    <div className="mt-6 p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex gap-4">
                        <i className="ph ph-info text-2xl text-exalmar-blue mt-1"></i>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Emitir <strong>US$ {montoEmisionM}M</strong> en bonos a una tasa del <strong>{tasaCupon}%</strong> incrementará la deuda total a <strong>US$ {formatNumber(simulatedData.deuda / 1000)}M</strong>. Esto elevará los gastos financieros anuales, reduciendo la cobertura de intereses de <strong>{formatNumber(metrics.coberturaIntereses)}x</strong> a <strong>{formatNumber(simulatedMetrics.coberturaIntereses)}x</strong>. {simulatedMetrics.ratioDeudaPatrimonio > 1.5 && <span className="text-red-600 font-bold">Atención: El ratio Deuda/Patrimonio supera el nivel conservador de 1.5x, elevando el riesgo financiero.</span>}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};
