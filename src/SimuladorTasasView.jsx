import React, { useState } from 'react';

export const SimuladorTasasView = () => {
    // Estado de la simulación
    const [tasa, setTasa] = useState(8);

    // Datos base (ficticios para la simulación inicial)
    const deudaBase = 500; // Millones
    const ventas = 1000;
    const costos = 600;
    const ebitda = ventas - costos;

    // Escenario Base (Real al 8%)
    const tasaReal = 8;
    const interesesReal = deudaBase * (tasaReal / 100);
    const utilidadReal = ebitda - interesesReal;

    // Escenario Simulado
    const interesesSimulado = deudaBase * (tasa / 100);
    const utilidadSimulada = ebitda - interesesSimulado;

    // Para la matriz de sensibilidad (5% a 15%)
    const tasasSensibilidad = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    // Helper para formatear
    const formatCurrency = (val) => `$ ${val.toFixed(1)} M`;

    return (
        <div className="flex flex-col h-full w-full bg-exalmar-light rounded-2xl p-6 shadow-inner overflow-y-auto animate-fade-in-up">
            <div className="mb-6">
                <h3 className="text-3xl font-black text-exalmar-blue tracking-tight uppercase">Simulador de Tasas de Interés</h3>
                <p className="text-gray-500 mt-1 font-medium">Analiza el impacto del costo financiero sobre la utilidad neta</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                
                {/* 1. Control Interactivo y Resultados Principales */}
                <div className="xl:col-span-3 bg-white p-6 rounded-2xl shadow-lg border-t-4 border-exalmar-blue flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1 w-full">
                        <div className="flex justify-between items-end mb-4">
                            <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Ajuste de Tasa de Interés</label>
                            <span className="text-3xl font-black text-exalmar-blue bg-blue-50 px-4 py-1 rounded-lg border border-blue-100">{tasa.toFixed(1)}%</span>
                        </div>
                        <input 
                            type="range" 
                            min="4" 
                            max="15" 
                            step="0.5" 
                            value={tasa}
                            onChange={(e) => setTasa(Number(e.target.value))}
                            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-exalmar-blue"
                        />
                        <div className="flex justify-between text-xs font-bold text-gray-400 mt-2 px-1">
                            <span>4% (Mín)</span>
                            <span>8% (Base)</span>
                            <span>15% (Máx)</span>
                        </div>
                        <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-600">
                            <i className="ph ph-info mr-2 text-exalmar-blue"></i>
                            Deuda Base asumida: <strong>{formatCurrency(deudaBase)}</strong>
                        </div>
                    </div>
                    
                    <div className="flex gap-4 w-full md:w-auto">
                        <div className="bg-red-50 p-6 rounded-2xl border border-red-100 min-w-[160px] text-center flex-1">
                            <i className="ph ph-trend-down text-3xl text-red-500 mb-2"></i>
                            <p className="text-xs font-bold text-red-800 uppercase tracking-widest mb-1">Gasto Financiero</p>
                            <h4 className="text-2xl font-black text-red-600">{formatCurrency(interesesSimulado)}</h4>
                            <p className="text-xs text-red-400 mt-2">
                                {tasa > tasaReal ? `↑ +${formatCurrency(interesesSimulado - interesesReal)}` : 
                                 tasa < tasaReal ? `↓ -${formatCurrency(interesesReal - interesesSimulado)}` : '-'}
                            </p>
                        </div>
                        <div className="bg-green-50 p-6 rounded-2xl border border-green-100 min-w-[160px] text-center flex-1">
                            <i className="ph ph-trend-up text-3xl text-green-500 mb-2"></i>
                            <p className="text-xs font-bold text-green-800 uppercase tracking-widest mb-1">Utilidad Neta</p>
                            <h4 className="text-2xl font-black text-green-600">{formatCurrency(utilidadSimulada)}</h4>
                            <p className="text-xs text-green-500 mt-2">
                                {utilidadSimulada < utilidadReal ? `↓ -${formatCurrency(utilidadReal - utilidadSimulada)}` : 
                                 utilidadSimulada > utilidadReal ? `↑ +${formatCurrency(utilidadSimulada - utilidadReal)}` : '-'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 2. Estado de Resultados Dinámico */}
                <div className="xl:col-span-1 bg-white p-6 rounded-2xl shadow-lg flex flex-col">
                    <h4 className="text-lg font-black text-exalmar-dark mb-4 flex items-center gap-2">
                        <i className="ph ph-table text-exalmar-blue"></i> Estado de Resultados
                    </h4>
                    <div className="overflow-x-auto flex-grow">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b-2 border-gray-100 text-xs text-gray-400 uppercase tracking-wider">
                                    <th className="py-3 px-2 font-bold">Concepto</th>
                                    <th className="py-3 px-2 font-bold text-right">Real (8%)</th>
                                    <th className="py-3 px-2 font-bold text-right text-exalmar-blue">Simulado</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                <tr className="border-b border-gray-50">
                                    <td className="py-3 px-2 text-gray-600 font-medium">Ventas</td>
                                    <td className="py-3 px-2 text-right text-gray-800 font-bold">{ventas}</td>
                                    <td className="py-3 px-2 text-right text-gray-800 font-bold">{ventas}</td>
                                </tr>
                                <tr className="border-b border-gray-50">
                                    <td className="py-3 px-2 text-gray-600 font-medium">Costos</td>
                                    <td className="py-3 px-2 text-right text-gray-800 font-bold">-{costos}</td>
                                    <td className="py-3 px-2 text-right text-gray-800 font-bold">-{costos}</td>
                                </tr>
                                <tr className="border-b border-gray-50 bg-gray-50/50">
                                    <td className="py-3 px-2 text-gray-800 font-black">EBITDA</td>
                                    <td className="py-3 px-2 text-right text-gray-800 font-black">{ebitda}</td>
                                    <td className="py-3 px-2 text-right text-gray-800 font-black">{ebitda}</td>
                                </tr>
                                <tr className="border-b border-gray-50">
                                    <td className="py-3 px-2 text-red-500 font-medium flex items-center gap-1">
                                        Gasto Financiero 
                                        {tasa > tasaReal && <i className="ph ph-arrow-up text-red-500"></i>}
                                        {tasa < tasaReal && <i className="ph ph-arrow-down text-green-500"></i>}
                                    </td>
                                    <td className="py-3 px-2 text-right text-red-500 font-bold">-{interesesReal.toFixed(1)}</td>
                                    <td className={`py-3 px-2 text-right font-bold ${tasa > tasaReal ? 'text-red-600' : 'text-green-600'}`}>
                                        -{interesesSimulado.toFixed(1)}
                                    </td>
                                </tr>
                                <tr className="bg-exalmar-light/50">
                                    <td className="py-3 px-2 text-exalmar-dark font-black text-base">Utilidad Neta</td>
                                    <td className="py-3 px-2 text-right text-exalmar-dark font-black text-base">{utilidadReal.toFixed(1)}</td>
                                    <td className={`py-3 px-2 text-right font-black text-base ${utilidadSimulada < utilidadReal ? 'text-red-500' : 'text-exalmar-green'}`}>
                                        {utilidadSimulada.toFixed(1)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 3. Análisis de Sensibilidad y Gráfico Dinámico */}
                <div className="xl:col-span-2 bg-white p-6 rounded-2xl shadow-lg flex flex-col">
                    <h4 className="text-lg font-black text-exalmar-dark mb-4 flex items-center gap-2">
                        <i className="ph ph-chart-line text-exalmar-blue"></i> Matriz de Sensibilidad
                    </h4>
                    <p className="text-xs text-gray-500 mb-6">Impacto de variaciones de la tasa de interés sobre la utilidad neta.</p>
                    
                    <div className="flex-grow flex flex-col justify-center h-full gap-2">
                        {tasasSensibilidad.map(t => {
                            const intSim = deudaBase * (t / 100);
                            const utilSim = ebitda - intSim;
                            // Normalizamos para el ancho de la barra (Max utilidad es con tasa 4% = 380)
                            const widthPct = (utilSim / 380) * 100;
                            const isCurrent = t === tasa;
                            
                            return (
                                <div key={t} className="flex items-center gap-4 text-sm group">
                                    <div className={`w-12 text-right font-bold ${isCurrent ? 'text-exalmar-blue text-base' : 'text-gray-500'}`}>
                                        {t}%
                                    </div>
                                    <div className="flex-grow bg-gray-100 h-6 rounded-r-md relative flex items-center">
                                        <div 
                                            className={`h-full rounded-r-md transition-all duration-300 ${isCurrent ? 'bg-exalmar-blue shadow-md' : 'bg-blue-200 group-hover:bg-blue-300'}`}
                                            style={{ width: `${widthPct}%` }}
                                        ></div>
                                        <span className={`absolute left-2 font-bold text-xs ${isCurrent ? 'text-white' : 'text-exalmar-dark'} z-10`}>
                                            ${utilSim.toFixed(1)}
                                        </span>
                                    </div>
                                    {isCurrent && <i className="ph ph-arrow-left text-exalmar-blue animate-pulse"></i>}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
