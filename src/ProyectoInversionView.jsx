import React, { useState } from 'react';

export const ProyectoInversionView = () => {
    const [activeTab, setActiveTab] = useState('capex');

    const formatNum = (val) => new Intl.NumberFormat('en-US').format(val);

    const capexData = [
        { componente: 'Obras civiles e infraestructura', monto: 7100, icon: 'ph-buildings' },
        { componente: 'Maquinaria y equipo de proceso', monto: 17400, icon: 'ph-gear' },
        { componente: 'Sistema ambiental (PAMA / efluentes)', monto: 3800, icon: 'ph-plant' },
        { componente: 'Instalaciones eléctricas y mecánicas', monto: 3800, icon: 'ph-lightning' },
        { componente: 'Costos indirectos e intangibles', monto: 2500, icon: 'ph-clipboard-text' },
        { componente: 'Contingencias (5%)', monto: 1730, icon: 'ph-shield-warning' },
        { componente: 'Capital de trabajo incremental', monto: 3500, icon: 'ph-coins' },
    ];

    const flujoCaja = [
        { anio: 1, ebit: 11127, nopat: 7845, depreciacion: 3633, fcl: 11478 },
        { anio: 2, ebit: 11600, nopat: 8178, depreciacion: 3633, fcl: 11811 },
        { anio: 3, ebit: 12086, nopat: 8521, depreciacion: 3633, fcl: 12154 },
        { anio: 4, ebit: 12588, nopat: 8874, depreciacion: 3633, fcl: 12507 },
        { anio: 5, ebit: 13104, nopat: 9238, depreciacion: 3633, fcl: 19851 }, // Incluye rescate
    ];

    const financiamientoData = [
        { fuente: 'Línea de capital de trabajo', mercado: 'Monetario', monto: 3500, pct: 8.8, plazo: '1 año', tasa: '9.5%', costoDi: '6.7%' },
        { fuente: 'Bonos corporativos', mercado: 'Capitales', monto: 22000, pct: 55.2, plazo: '7 años', tasa: '9.0%', costoDi: '6.3%' },
        { fuente: 'Arrendamiento (leasing)', mercado: 'Capitales', monto: 8000, pct: 20.1, plazo: '5 años', tasa: '9.5%', costoDi: '6.7%' },
        { fuente: 'Aporte de capital', mercado: 'Capitales', monto: 6330, pct: 15.9, plazo: 'Permanente', tasa: '12.1%', costoDi: '12.1%' },
    ];

    return (
        <div className="flex flex-col h-full w-full bg-exalmar-light rounded-2xl p-6 shadow-inner overflow-y-auto animate-fade-in-up">
            
            <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-gray-200 pb-4">
                <div>
                    <h3 className="text-3xl font-black text-exalmar-blue tracking-tight uppercase">Proyecto de Inversión</h3>
                    <p className="text-gray-500 mt-1 font-medium">Modernización a tecnología Steam Dried (Harina Prime)</p>
                </div>
                
                <div className="flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm overflow-x-auto">
                    <button 
                        onClick={() => setActiveTab('capex')}
                        className={`whitespace-nowrap px-4 py-2 rounded-md text-sm font-bold transition-colors ${activeTab === 'capex' ? 'bg-exalmar-blue text-white shadow' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <i className="ph ph-factory mr-2"></i> 1. Resumen y CAPEX
                    </button>
                    <button 
                        onClick={() => setActiveTab('evaluacion')}
                        className={`whitespace-nowrap px-4 py-2 rounded-md text-sm font-bold transition-colors ${activeTab === 'evaluacion' ? 'bg-exalmar-blue text-white shadow' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <i className="ph ph-chart-line-up mr-2"></i> 2. Evaluación Financiera
                    </button>
                    <button 
                        onClick={() => setActiveTab('financiamiento')}
                        className={`whitespace-nowrap px-4 py-2 rounded-md text-sm font-bold transition-colors ${activeTab === 'financiamiento' ? 'bg-exalmar-blue text-white shadow' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <i className="ph ph-scales mr-2"></i> 3. Estrategia Mixta
                    </button>
                </div>
            </div>

            {/* TAB: CAPEX */}
            {activeTab === 'capex' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in-up">
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-exalmar-blue h-full flex flex-col">
                            <h4 className="text-gray-700 font-bold uppercase tracking-widest text-sm mb-4">Descripción del Proyecto</h4>
                            <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                                Modernizar una línea de la planta de harina y aceite de pescado, reemplazando el secado directo (FAQ) por secadores a vapor (Steam Dried), incorporando tratamiento de efluentes (PAMA) y automatización.
                            </p>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <div className="text-xs text-gray-500 font-bold uppercase mb-1">Horizonte</div>
                                    <div className="text-2xl font-black text-gray-800">5 Años</div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <div className="text-xs text-gray-500 font-bold uppercase mb-1">Escenario</div>
                                    <div className="text-2xl font-black text-gray-800">Realista</div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 col-span-2">
                                    <div className="text-xs text-gray-500 font-bold uppercase mb-1">Moneda Base</div>
                                    <div className="text-lg font-black text-gray-800 flex items-center justify-between">
                                        Soles (S/)
                                        <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded">Expresado en miles</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-gray-400">
                            <div className="flex justify-between items-center mb-6">
                                <h4 className="text-gray-700 font-bold uppercase tracking-widest text-sm">Detalle de Inversión Inicial (CAPEX)</h4>
                                <div className="bg-exalmar-blue text-white px-4 py-2 rounded-lg font-black text-xl shadow">
                                    TOTAL: S/ 39,830
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                {capexData.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-exalmar-blue">
                                                <i className={`ph ${item.icon} text-xl`}></i>
                                            </div>
                                            <span className="font-bold text-gray-700">{item.componente}</span>
                                        </div>
                                        <div className="font-black text-gray-800">
                                            S/ {formatNum(item.monto)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: EVALUACIÓN FINANCIERA */}
            {activeTab === 'evaluacion' && (
                <div className="flex flex-col gap-6 animate-fade-in-up">
                    {/* Tarjetas de Indicadores Top */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white p-5 rounded-2xl shadow-md border-b-4 border-exalmar-blue">
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Valor Actual Neto (VAN)</div>
                            <div className="text-3xl font-black text-gray-800">S/ 12,177</div>
                            <div className="text-xs text-green-600 font-bold mt-1 bg-green-50 inline-block px-2 py-1 rounded">@ WACC 8.7%</div>
                        </div>
                        <div className="bg-white p-5 rounded-2xl shadow-md border-b-4 border-exalmar-green">
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tasa Interna de Retorno</div>
                            <div className="text-3xl font-black text-exalmar-green">18.9%</div>
                            <div className="text-xs text-gray-500 mt-1">&gt; WACC (Viable)</div>
                        </div>
                        <div className="bg-white p-5 rounded-2xl shadow-md border-b-4 border-orange-500">
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Payback Simple</div>
                            <div className="text-3xl font-black text-gray-800">3.4 <span className="text-lg">años</span></div>
                            <div className="text-xs text-gray-500 mt-1">Recuperación rápida</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-500 to-green-600 p-5 rounded-2xl shadow-lg text-white flex flex-col justify-center items-center">
                            <i className="ph ph-check-circle text-4xl mb-2 shadow-sm rounded-full"></i>
                            <div className="text-xl font-black uppercase tracking-widest drop-shadow-md">Decisión: Viable</div>
                        </div>
                    </div>

                    {/* Tabla de Flujo de Caja */}
                    <div className="bg-white rounded-2xl shadow-lg border-t-4 border-gray-400 overflow-hidden">
                        <div className="p-5 border-b border-gray-100 bg-gray-50">
                            <h4 className="text-gray-700 font-bold uppercase tracking-widest text-sm">Flujo de Caja Libre Incremental (S/ 000)</h4>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white text-gray-400 text-xs uppercase tracking-wider border-b border-gray-200">
                                        <th className="p-4 font-bold">Concepto</th>
                                        <th className="p-4 font-bold text-right text-gray-800">Año 0</th>
                                        <th className="p-4 font-bold text-right">Año 1</th>
                                        <th className="p-4 font-bold text-right">Año 2</th>
                                        <th className="p-4 font-bold text-right">Año 3</th>
                                        <th className="p-4 font-bold text-right">Año 4</th>
                                        <th className="p-4 font-bold text-right">Año 5</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    <tr className="border-b border-gray-50 hover:bg-gray-50">
                                        <td className="p-4 text-gray-700 font-medium">Inversión Inicial</td>
                                        <td className="p-4 text-right font-black text-red-500">(39,830)</td>
                                        <td colSpan="5"></td>
                                    </tr>
                                    <tr className="border-b border-gray-50 hover:bg-gray-50">
                                        <td className="p-4 text-gray-700 font-medium">EBIT Incremental</td>
                                        <td></td>
                                        {flujoCaja.map(fc => <td key={'ebit'+fc.anio} className="p-4 text-right text-gray-600">{formatNum(fc.ebit)}</td>)}
                                    </tr>
                                    <tr className="border-b border-gray-50 hover:bg-gray-50">
                                        <td className="p-4 text-gray-700 font-medium">NOPAT (Utilidad op. desp. de imp.)</td>
                                        <td></td>
                                        {flujoCaja.map(fc => <td key={'nopat'+fc.anio} className="p-4 text-right text-gray-600">{formatNum(fc.nopat)}</td>)}
                                    </tr>
                                    <tr className="border-b border-gray-50 hover:bg-gray-50">
                                        <td className="p-4 text-gray-700 font-medium">(+) Depreciación</td>
                                        <td></td>
                                        {flujoCaja.map(fc => <td key={'dep'+fc.anio} className="p-4 text-right text-gray-600">{formatNum(fc.depreciacion)}</td>)}
                                    </tr>
                                    <tr className="bg-blue-50/30 border-t border-gray-200">
                                        <td className="p-4 text-exalmar-blue font-black uppercase text-xs">Flujo de Caja Libre (FCL)</td>
                                        <td className="p-4 text-right font-black text-red-500">(39,830)</td>
                                        {flujoCaja.map(fc => <td key={'fcl'+fc.anio} className="p-4 text-right font-black text-exalmar-blue">{formatNum(fc.fcl)}</td>)}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: FINANCIAMIENTO */}
            {activeTab === 'financiamiento' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in-up">
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="bg-gradient-to-br from-exalmar-dark to-exalmar-blue rounded-2xl shadow-lg p-8 text-white relative overflow-hidden flex flex-col h-full">
                            <div className="absolute right-0 top-0 opacity-10">
                                <i className="ph ph-chart-pie text-[150px]"></i>
                            </div>
                            
                            <h4 className="text-blue-200 font-bold uppercase tracking-widest text-xs mb-8">Resumen de Estructura</h4>
                            
                            <div className="flex-grow flex flex-col justify-center">
                                <div className="mb-8 relative z-10">
                                    <div className="text-sm text-blue-100 mb-1">Costo Promedio Ponderado</div>
                                    <div className="text-5xl font-black text-white flex items-baseline gap-2">
                                        7.4% <span className="text-xl text-green-400 font-bold bg-green-400/20 px-2 py-1 rounded">&lt; TIR (18.9%)</span>
                                    </div>
                                    <div className="text-xs text-blue-200 mt-2">Costo después de impuestos. WACC referencial: 8.7%</div>
                                </div>
                                
                                <div className="space-y-4 relative z-10">
                                    <div className="bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-sm">
                                        <div className="text-xs uppercase text-blue-200 font-bold mb-1">Deuda Total (84.1%)</div>
                                        <div className="text-xl font-black">S/ 33,500 <span className="text-sm font-normal">mil</span></div>
                                    </div>
                                    <div className="bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-sm">
                                        <div className="text-xs uppercase text-blue-200 font-bold mb-1">Patrimonio Propio (15.9%)</div>
                                        <div className="text-xl font-black">S/ 6,330 <span className="text-sm font-normal">mil</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-2xl shadow-lg border-t-4 border-gray-400 overflow-hidden h-full">
                            <div className="p-6 border-b border-gray-100">
                                <h4 className="text-gray-700 font-bold uppercase tracking-widest text-sm">Desglose de Estrategia Mixta</h4>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-widest border-b border-gray-200">
                                            <th className="p-4 font-bold">Fuente / Instrumento</th>
                                            <th className="p-4 font-bold">Mercado</th>
                                            <th className="p-4 font-bold text-right">Monto (S/)</th>
                                            <th className="p-4 font-bold text-center">Peso</th>
                                            <th className="p-4 font-bold">Plazo</th>
                                            <th className="p-4 font-bold text-right">Costo Neto</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {financiamientoData.map((f, i) => (
                                            <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                                <td className="p-4 font-bold text-gray-800">{f.fuente}</td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-1 rounded text-xs font-bold ${f.mercado === 'Monetario' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}`}>
                                                        {f.mercado}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right font-black text-gray-600">{formatNum(f.monto)}</td>
                                                <td className="p-4 text-center">
                                                    <div className="bg-gray-100 text-gray-700 px-2 py-1 rounded font-bold text-xs inline-block">
                                                        {f.pct}%
                                                    </div>
                                                </td>
                                                <td className="p-4 text-gray-600 text-xs">{f.plazo}</td>
                                                <td className="p-4 text-right font-black text-exalmar-blue">{f.costoDi}</td>
                                            </tr>
                                        ))}
                                        <tr className="bg-green-50/50 border-t-2 border-gray-200">
                                            <td colSpan="2" className="p-4 font-black uppercase text-xs text-gray-700">Total / Promedio</td>
                                            <td className="p-4 text-right font-black text-gray-800">39,830</td>
                                            <td className="p-4 text-center font-black text-gray-800">100%</td>
                                            <td className="p-4"></td>
                                            <td className="p-4 text-right font-black text-exalmar-green text-lg">7.4%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
