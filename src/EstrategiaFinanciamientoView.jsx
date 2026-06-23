import React, { useState, useEffect } from 'react';
import { useSimulation } from './context/SimulationContext';

export const EstrategiaFinanciamientoView = () => {
    const { financialData, metrics } = useSimulation();

    // TABS: 'motor', 'ranking', 'matriz'
    const [activeTab, setActiveTab] = useState('motor');

    // Inputs del Usuario
    const [montoRequerido, setMontoRequerido] = useState(100); // en Millones
    const [toleranciaRiesgo, setToleranciaRiesgo] = useState('moderado'); // conservador, moderado, agresivo
    const [horizonte, setHorizonte] = useState('largo'); // corto, mediano, largo

    // Tasas base
    const [tasaBancaria, setTasaBancaria] = useState(4.25); // BCR = 4.25%
    const [tasaBonos, setTasaBonos] = useState(8.5);
    const [costoCapital, setCostoCapital] = useState(12.4);

    // Estado de los 4 escenarios simulados
    const [escenarios, setEscenarios] = useState([]);
    const [recomendacion, setRecomendacion] = useState(null);

    // Cálculos matemáticos
    useEffect(() => {
        const montoMiles = montoRequerido * 1000;
        const utilidadNetaActual = (financialData.ebitda - financialData.gastosFinancieros) * (1 - financialData.tasaImpuesto);

        const calcularEscenario = (nombre, pctDeuda, pctPatrimonio, tasaD) => {
            const nuevaDeuda = financialData.deuda + (montoMiles * pctDeuda);
            const nuevoPatrimonio = financialData.patrimonio + (montoMiles * pctPatrimonio);
            
            const nuevosGastos = financialData.gastosFinancieros + ((montoMiles * pctDeuda) * (tasaD / 100));
            // Asumimos utilidad neta constante operativa (solo cambia por los nuevos gastos financieros)
            const nuevaUtilidadNeta = (financialData.ebitda - nuevosGastos) * (1 - financialData.tasaImpuesto);
            
            const nuevoRoe = nuevaUtilidadNeta / nuevoPatrimonio;
            const nuevoRiesgo = nuevaDeuda / nuevoPatrimonio; // Ratio D/E
            const nuevaCobertura = nuevosGastos > 0 ? (financialData.ebitda / nuevosGastos) : 0;

            const valorTotal = nuevaDeuda + nuevoPatrimonio;
            const pesoD = nuevaDeuda / valorTotal;
            const pesoP = nuevoPatrimonio / valorTotal;
            
            // Calculamos Kd ponderado (deuda antigua + deuda nueva)
            const nuevoKd = nuevosGastos / nuevaDeuda;
            const kdDespuesImpuestos = nuevoKd * (1 - financialData.tasaImpuesto);
            const nuevoWacc = (pesoD * kdDespuesImpuestos) + (pesoP * (costoCapital / 100));

            return {
                id: nombre.toLowerCase().replace(' ', '-'),
                nombre,
                roe: nuevoRoe,
                riesgo: nuevoRiesgo,
                cobertura: nuevaCobertura,
                wacc: nuevoWacc,
                gastos: nuevosGastos
            };
        };

        const escBancario = calcularEscenario('Crédito Bancario', 1, 0, tasaBancaria);
        const escBonos = calcularEscenario('Bono Corporativo', 1, 0, tasaBonos);
        const escAcciones = calcularEscenario('Emisión de Acciones', 0, 1, 0); // No hay tasa D
        const escMixto = calcularEscenario('Financiamiento Mixto (70/30)', 0.7, 0.3, tasaBonos);

        const arrEscenarios = [escBancario, escBonos, escAcciones, escMixto];

        // Normalización para Scoring (Min-Max scaling inverso para los que "menor es mejor")
        const maxRoe = Math.max(...arrEscenarios.map(e => e.roe));
        const minRoe = Math.min(...arrEscenarios.map(e => e.roe));
        
        const maxRiesgo = Math.max(...arrEscenarios.map(e => e.riesgo));
        const minRiesgo = Math.min(...arrEscenarios.map(e => e.riesgo));

        const maxWacc = Math.max(...arrEscenarios.map(e => e.wacc));
        const minWacc = Math.min(...arrEscenarios.map(e => e.wacc));

        // Pesos según Tolerancia
        let pesoRoe, pesoRiesgo, pesoWacc;
        if (toleranciaRiesgo === 'conservador') {
            pesoRiesgo = 0.6; pesoWacc = 0.3; pesoRoe = 0.1;
        } else if (toleranciaRiesgo === 'agresivo') {
            pesoRiesgo = 0.1; pesoWacc = 0.3; pesoRoe = 0.6;
        } else {
            pesoRiesgo = 0.35; pesoWacc = 0.35; pesoRoe = 0.3;
        }

        const escenariosPuntuados = arrEscenarios.map(e => {
            // Normalizamos de 0 a 100
            const nRoe = maxRoe === minRoe ? 100 : ((e.roe - minRoe) / (maxRoe - minRoe)) * 100;
            // Riesgo inverso (menor riesgo = mayor score)
            const nRiesgo = maxRiesgo === minRiesgo ? 100 : ((maxRiesgo - e.riesgo) / (maxRiesgo - minRiesgo)) * 100;
            // WACC inverso (menor WACC = mayor score)
            const nWacc = maxWacc === minWacc ? 100 : ((maxWacc - e.wacc) / (maxWacc - minWacc)) * 100;

            const score = (nRoe * pesoRoe) + (nRiesgo * pesoRiesgo) + (nWacc * pesoWacc);
            
            return { ...e, score };
        });

        // Ordenamos por Score
        escenariosPuntuados.sort((a, b) => b.score - a.score);
        setEscenarios(escenariosPuntuados);
        setRecomendacion(escenariosPuntuados[0]);

    }, [montoRequerido, toleranciaRiesgo, horizonte, tasaBancaria, tasaBonos, costoCapital, financialData]);

    const formatPercent = (val) => `${(val * 100).toFixed(2)}%`;
    const formatNumber = (val) => new Intl.NumberFormat('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(val);

    const getJustificaciones = (nombre) => {
        if (nombre === 'Crédito Bancario') return [
            "Menor costo de capital inicial (basado en tasa de referencia baja).",
            "Obtención más rápida sin costos de estructuración altos.",
            "Maximiza el ROE por apalancamiento barato."
        ];
        if (nombre === 'Bono Corporativo') return [
            "Excelente para estructurar deuda a largo plazo sin ahogar el flujo de caja inmediato.",
            "Tasa fija competitiva que protege contra subidas de mercado.",
            "No diluye la participación de los accionistas actuales."
        ];
        if (nombre === 'Emisión de Acciones') return [
            "Protege absolutamente la salud financiera bajando el Ratio Deuda/Patrimonio.",
            "Ideal para perfiles conservadores, elimina el riesgo de default.",
            "Libera la presión sobre el EBITDA al no generar intereses."
        ];
        if (nombre === 'Financiamiento Mixto (70/30)') return [
            "El balance perfecto: aprovecha el escudo fiscal de la deuda sin disparar el riesgo.",
            "Suaviza la dilución del ROE comparado con una emisión pura de acciones.",
            "Mantiene el WACC equilibrado."
        ];
        return [];
    };

    return (
        <div className="flex flex-col h-full w-full bg-exalmar-light rounded-2xl p-6 shadow-inner overflow-y-auto animate-fade-in-up">
            
            <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-gray-200 pb-4">
                <div>
                    <h3 className="text-3xl font-black text-exalmar-blue tracking-tight uppercase">Estrategia de Financiamiento</h3>
                    <p className="text-gray-500 mt-1 font-medium">Motor de Recomendación Financiera y Análisis Multiescenario.</p>
                </div>
                
                {/* TABS de Navegación */}
                <div className="flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
                    <button 
                        onClick={() => setActiveTab('motor')}
                        className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${activeTab === 'motor' ? 'bg-exalmar-blue text-white shadow' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <i className="ph ph-cpu mr-2"></i> Motor
                    </button>
                    <button 
                        onClick={() => setActiveTab('ranking')}
                        className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${activeTab === 'ranking' ? 'bg-exalmar-blue text-white shadow' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <i className="ph ph-list-numbers mr-2"></i> Ranking
                    </button>
                    <button 
                        onClick={() => setActiveTab('matriz')}
                        className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${activeTab === 'matriz' ? 'bg-exalmar-blue text-white shadow' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <i className="ph ph-intersect mr-2"></i> Matriz 2D
                    </button>
                </div>
            </div>

            {/* CONTENIDO DEL TAB ACTIVO */}
            
            {activeTab === 'motor' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in-up">
                    {/* Controles del Motor */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-exalmar-blue">
                            <h4 className="text-gray-700 font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
                                <i className="ph ph-faders text-exalmar-blue text-lg"></i>
                                Requisitos de Capital
                            </h4>
                            
                            <div className="flex flex-col gap-2 mb-6">
                                <div className="flex justify-between items-end">
                                    <label className="text-sm font-bold text-gray-600">Monto Requerido (US$)</label>
                                    <span className="text-2xl font-black text-exalmar-blue">{montoRequerido}M</span>
                                </div>
                                <input 
                                    type="range" min="10" max="300" step="10"
                                    value={montoRequerido}
                                    onChange={(e) => setMontoRequerido(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-exalmar-blue"
                                />
                            </div>

                            <div className="flex flex-col gap-4 mb-6">
                                <label className="text-sm font-bold text-gray-600">Tolerancia al Riesgo</label>
                                <div className="flex gap-2">
                                    {['conservador', 'moderado', 'agresivo'].map(tol => (
                                        <button 
                                            key={tol}
                                            onClick={() => setToleranciaRiesgo(tol)}
                                            className={`flex-1 py-2 px-1 text-xs font-bold uppercase rounded-lg border-2 transition-all ${toleranciaRiesgo === tol ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-sm' : 'border-gray-200 text-gray-400 hover:border-orange-200'}`}
                                        >
                                            {tol}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 leading-tight">
                                    {toleranciaRiesgo === 'conservador' && 'Se penalizará fuertemente el aumento de deuda y se premiará la protección del riesgo.'}
                                    {toleranciaRiesgo === 'moderado' && 'Equilibrio entre maximizar rentabilidad (ROE) y controlar el riesgo (Apalancamiento).'}
                                    {toleranciaRiesgo === 'agresivo' && 'Se prioriza el crecimiento del ROE asumiendo mayores niveles de apalancamiento.'}
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <label className="text-sm font-bold text-gray-600">Tasas Proyectadas (Mercado)</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        <span className="text-xs text-gray-500 font-bold uppercase block mb-1">Tasa Bancaria</span>
                                        <input type="number" step="0.1" value={tasaBancaria} onChange={(e)=>setTasaBancaria(Number(e.target.value))} className="w-full bg-transparent text-lg font-black text-gray-800 outline-none" />
                                        <span className="text-[10px] text-gray-400">Ref. BCR + Spread</span>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        <span className="text-xs text-gray-500 font-bold uppercase block mb-1">Tasa Bonos</span>
                                        <input type="number" step="0.1" value={tasaBonos} onChange={(e)=>setTasaBonos(Number(e.target.value))} className="w-full bg-transparent text-lg font-black text-gray-800 outline-none" />
                                        <span className="text-[10px] text-gray-400">Yield Corporativo</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tarjeta de Recomendación Ganadora */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        {recomendacion && (
                            <div className="bg-gradient-to-br from-exalmar-blue to-blue-900 rounded-3xl shadow-2xl p-8 relative overflow-hidden transform transition-all hover:scale-[1.01]">
                                <div className="absolute -right-10 -top-10 opacity-10">
                                    <i className="ph ph-trophy text-9xl text-white"></i>
                                </div>
                                
                                <div className="bg-yellow-400 text-yellow-900 text-xs font-black uppercase px-3 py-1 rounded-full inline-flex items-center gap-2 mb-4 shadow-sm">
                                    <i className="ph ph-medal text-lg"></i> Recomendación del Motor
                                </div>
                                
                                <h2 className="text-4xl font-black text-white mb-2">{recomendacion.nombre}</h2>
                                <p className="text-blue-200 mb-8 font-medium">Es la mejor alternativa estratégica para levantar US$ {montoRequerido}M bajo un perfil de riesgo {toleranciaRiesgo.toUpperCase()}.</p>

                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                                        <div className="text-blue-200 text-xs uppercase font-bold mb-1">Score</div>
                                        <div className="text-3xl font-black text-white">{recomendacion.score.toFixed(0)} <span className="text-lg opacity-50">/100</span></div>
                                    </div>
                                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                                        <div className="text-blue-200 text-xs uppercase font-bold mb-1">Nuevo WACC</div>
                                        <div className="text-3xl font-black text-white">{formatPercent(recomendacion.wacc)}</div>
                                    </div>
                                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                                        <div className="text-blue-200 text-xs uppercase font-bold mb-1">Nuevo ROE</div>
                                        <div className="text-3xl font-black text-white">{formatPercent(recomendacion.roe)}</div>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="text-white font-bold mb-3 flex items-center gap-2">
                                        <i className="ph ph-check-circle text-green-400"></i> Justificación Académica
                                    </h5>
                                    <ul className="space-y-2">
                                        {getJustificaciones(recomendacion.nombre).map((just, idx) => (
                                            <li key={idx} className="text-blue-100 text-sm flex items-start gap-2">
                                                <i className="ph ph-caret-right text-blue-400 mt-1"></i>
                                                {just}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'ranking' && (
                <div className="bg-white rounded-2xl shadow-lg border-t-4 border-gray-400 overflow-hidden animate-fade-in-up">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-widest border-b border-gray-200">
                                <th className="p-4 font-bold">Estrategia</th>
                                <th className="p-4 font-bold text-center">Score DSS</th>
                                <th className="p-4 font-bold text-right">WACC</th>
                                <th className="p-4 font-bold text-right">Riesgo (D/E)</th>
                                <th className="p-4 font-bold text-right">ROE</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {escenarios.map((esc, idx) => (
                                <tr key={esc.id} className={`border-b border-gray-100 transition-colors hover:bg-gray-50 ${idx === 0 ? 'bg-yellow-50/50' : ''}`}>
                                    <td className="p-4 font-bold text-gray-800 flex items-center gap-3">
                                        {idx === 0 ? <i className="ph ph-medal text-xl text-yellow-500"></i> : <span className="w-5 text-center text-gray-400">{idx + 1}</span>}
                                        {esc.nombre}
                                    </td>
                                    <td className="p-4 text-center">
                                        <div className="inline-flex items-center justify-center w-12 h-8 rounded bg-gray-800 text-white font-black text-xs shadow-sm">
                                            {esc.score.toFixed(0)}
                                        </div>
                                    </td>
                                    <td className="p-4 text-right font-black text-exalmar-blue">{formatPercent(esc.wacc)}</td>
                                    <td className="p-4 text-right font-bold text-red-500">{formatNumber(esc.riesgo)}x</td>
                                    <td className="p-4 text-right font-black text-green-600">{formatPercent(esc.roe)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="p-4 bg-gray-50 text-xs text-gray-500 text-center border-t border-gray-200">
                        * El Score se calcula ponderando el WACC, el Riesgo y el ROE en base a tu perfil de tolerancia seleccionado ({toleranciaRiesgo.toUpperCase()}).
                    </div>
                </div>
            )}

            {activeTab === 'matriz' && (
                <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-gray-400 h-[600px] flex flex-col animate-fade-in-up">
                    <h4 className="text-gray-700 font-bold uppercase tracking-widest text-sm mb-2 text-center">
                        Matriz de Decisión: Riesgo vs Rentabilidad
                    </h4>
                    <p className="text-center text-xs text-gray-500 mb-8">El cuadrante óptimo se encuentra hacia arriba (Alto ROE) y a la izquierda (Bajo Riesgo).</p>
                    
                    <div className="flex-grow relative border-l-2 border-b-2 border-gray-800 ml-10 mb-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2YwZjBmMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]">
                        
                        {/* Ejes Labels */}
                        <div className="absolute -left-12 top-1/2 -rotate-90 text-xs font-black text-gray-600 tracking-widest uppercase origin-center">
                            Rentabilidad Esperada (ROE)
                        </div>
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs font-black text-gray-600 tracking-widest uppercase">
                            Riesgo Financiero (Ratio D/E)
                        </div>

                        {/* Puntos (Scatter) */}
                        {escenarios.map((esc, idx) => {
                            // Normalización min-max para la posición en el cuadrante (con un poco de padding)
                            const roes = escenarios.map(e => e.roe);
                            const riesgos = escenarios.map(e => e.riesgo);
                            
                            const minR = Math.min(...riesgos) * 0.9;
                            const maxR = Math.max(...riesgos) * 1.1;
                            const minRoe = Math.min(...roes) * 0.9;
                            const maxRoe = Math.max(...roes) * 1.1;

                            // X = Riesgo (De izquierda a derecha)
                            const xPos = ((esc.riesgo - minR) / (maxR - minR)) * 100;
                            // Y = Rentabilidad (De abajo hacia arriba -> top es inverso)
                            const yPos = 100 - (((esc.roe - minRoe) / (maxRoe - minRoe)) * 100);

                            const isWinner = idx === 0;

                            return (
                                <div 
                                    key={esc.id}
                                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10"
                                    style={{ left: `${xPos}%`, top: `${yPos}%` }}
                                >
                                    <div className={`w-6 h-6 rounded-full shadow-md border-2 border-white cursor-pointer transition-transform group-hover:scale-150 ${isWinner ? 'bg-yellow-500 animate-pulse w-8 h-8' : 'bg-exalmar-blue'}`}>
                                        {isWinner && <i className="ph ph-star text-white text-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></i>}
                                    </div>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                                        <div className="font-bold text-yellow-400 mb-1">{esc.nombre}</div>
                                        <div>Riesgo: {formatNumber(esc.riesgo)}x</div>
                                        <div>ROE: {formatPercent(esc.roe)}</div>
                                    </div>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-[10px] font-bold text-gray-600 whitespace-nowrap">
                                        {esc.nombre}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
