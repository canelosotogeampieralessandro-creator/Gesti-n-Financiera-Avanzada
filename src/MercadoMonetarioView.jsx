import React, { useState } from 'react';

export const MercadoMonetarioView = ({ onNavigate }) => {
    const [activeModal, setActiveModal] = useState(null);
    const depositosData = [
        { year: '2021', value: 26.85 },
        { year: '2022', value: 7.00 },
        { year: '2024', value: 17.00 }
    ];

    return (
        <div className="flex flex-col h-full w-full bg-exalmar-light rounded-2xl p-6 shadow-inner overflow-y-auto animate-fade-in-up">
            <div className="mb-8">
                <h3 className="text-3xl font-black text-exalmar-blue tracking-tight uppercase">Mercado Monetario</h3>
                <p className="text-gray-500 mt-1 font-medium">Instrumentos de gestión de liquidez y capital de trabajo a corto plazo</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* 1. Inversión */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-exalmar-green flex flex-col group hover:-translate-y-1 transition-all duration-300">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-exalmar-green/10 to-transparent">
                        <div>
                            <span className="text-exalmar-green font-bold text-sm tracking-widest uppercase mb-1 block">Instrumento de Inversión</span>
                            <h4 className="text-2xl font-black text-exalmar-dark">Depósitos a Plazo</h4>
                        </div>
                        <button 
                            onClick={() => setActiveModal('inversion')}
                            className="w-14 h-14 rounded-xl bg-white shadow-md flex items-center justify-center text-exalmar-green hover:rotate-12 hover:scale-110 transition-all cursor-pointer focus:outline-none focus:ring-4 ring-exalmar-green/30"
                            title="Ver ventajas y desventajas"
                        >
                            <i className="ph ph-piggy-bank text-3xl"></i>
                        </button>
                    </div>
                    
                    <div className="p-6 flex-grow flex flex-col">
                        <p className="text-gray-600 mb-6 text-sm leading-relaxed text-justify">
                            Constituidos cuando la Compañía cuenta con excedentes de liquidez. Se invierte en el mercado monetario mediante depósitos altamente líquidos mantenidos en instituciones de prestigio.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-gray-50 p-4 rounded-xl flex flex-col border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <i className="ph ph-clock-countdown text-exalmar-green text-2xl mb-2"></i>
                                <h5 className="font-bold text-gray-800 text-sm">Corto Plazo</h5>
                                <p className="text-xs text-gray-500 mt-1 leading-relaxed">Vencimientos originales menores a 3 meses, renovables.</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl flex flex-col border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <i className="ph ph-currency-dollar text-exalmar-green text-2xl mb-2"></i>
                                <h5 className="font-bold text-gray-800 text-sm">Rendimiento USD</h5>
                                <p className="text-xs text-gray-500 mt-1 leading-relaxed">Denominados en dólares, generan ingresos financieros a tasas de mercado.</p>
                            </div>
                        </div>

                        <div className="mt-auto bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                            <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Evolución de Saldos (Millones US$)</h5>
                            <div className="flex items-end h-32 gap-6 justify-center">
                                {depositosData.map((d, i) => (
                                    <div key={i} className="flex flex-col justify-end items-center group/bar w-16 h-full">
                                        <div className="w-full bg-exalmar-green/20 rounded-t-md relative group-hover/bar:bg-exalmar-green transition-colors duration-300" style={{ height: `${(d.value / 30) * 100}%` }}>
                                            <span className="absolute -top-7 left-1/2 transform -translate-x-1/2 text-sm font-bold text-exalmar-green opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap bg-white px-2 py-0.5 rounded shadow-sm">
                                                ${d.value}M
                                            </span>
                                        </div>
                                        <div className="mt-3 text-xs font-bold text-gray-500 border-t border-gray-200 w-full text-center pt-2">{d.year}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Financiamiento */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-orange-500 flex flex-col group hover:-translate-y-1 transition-all duration-300">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-orange-500/10 to-transparent">
                        <div>
                            <span className="text-orange-500 font-bold text-sm tracking-widest uppercase mb-1 block">Instrumento de Financiamiento</span>
                            <h4 className="text-2xl font-black text-exalmar-dark">Préstamos a Corto Plazo</h4>
                        </div>
                        <button 
                            onClick={() => setActiveModal('financiamiento')}
                            className="w-14 h-14 rounded-xl bg-white shadow-md flex items-center justify-center text-orange-500 hover:rotate-12 hover:scale-110 transition-all cursor-pointer focus:outline-none focus:ring-4 ring-orange-500/30"
                            title="Ver ventajas y desventajas"
                        >
                            <i className="ph ph-hand-coins text-3xl"></i>
                        </button>
                    </div>
                    
                    <div className="p-6 flex-grow flex flex-col">
                        <p className="text-gray-600 mb-6 text-sm leading-relaxed text-justify">
                            Adquiridos en el mercado monetario para cubrir requerimientos de capital de trabajo operativo mediante diversas líneas de crédito bancarias.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-gray-50 p-4 rounded-xl flex flex-col border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <i className="ph ph-bank text-orange-500 text-2xl mb-2"></i>
                                <h5 className="font-bold text-gray-800 text-sm">Banca Diversificada</h5>
                                <p className="text-xs text-gray-500 mt-1">Líneas de crédito con BCP, Interbank, BanBif, Santander y otros.</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl flex flex-col border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <i className="ph ph-shield-check text-orange-500 text-2xl mb-2"></i>
                                <h5 className="font-bold text-gray-800 text-sm">Respaldo / Garantía</h5>
                                <p className="text-xs text-gray-500 mt-1">Préstamos garantizados con Warrants constituidos sobre inventarios propios.</p>
                            </div>
                        </div>

                        <div className="mt-auto bg-gradient-to-br from-orange-50 to-white rounded-xl p-5 border border-orange-100 shadow-sm relative overflow-hidden">
                            <i className="ph ph-receipt absolute -right-4 -bottom-4 text-7xl text-orange-500/10 transform rotate-12"></i>
                            <h5 className="text-sm font-bold text-orange-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <i className="ph ph-info text-lg"></i> Condiciones Financieras
                            </h5>
                            <ul className="space-y-3 relative z-10">
                                <li className="flex items-start gap-3 text-sm text-gray-700">
                                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shadow-sm"></div>
                                    <span>Obligaciones a corto plazo denominadas íntegramente en <b>dólares estadounidenses</b>.</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-gray-700">
                                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shadow-sm"></div>
                                    <span>Generan un gasto por intereses sujetos a <b>tasas anuales vigentes de mercado</b>.</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-gray-700">
                                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shadow-sm"></div>
                                    <span>La estructura garantizada con warrants de harina de pescado permite un <b>acceso rápido a financiamiento</b> mitigando el riesgo.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

            {/* CTA Button to Simulador */}
            <div className="mt-8 flex justify-end">
                <button 
                    onClick={() => onNavigate && onNavigate('liquidez-simulador-tasas', 'liquidez')}
                    className="group bg-exalmar-blue text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-exalmar-dark hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-3"
                >
                    <span>Ir al Simulador de Tasas</span>
                    <i className="ph ph-arrow-right font-bold group-hover:translate-x-1 transition-transform"></i>
                </button>
            </div>

            {/* Modal */}
            {activeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-slide-up relative">
                        <button 
                            onClick={() => setActiveModal(null)}
                            className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full flex items-center justify-center transition-colors z-10"
                        >
                            <i className="ph ph-x text-xl"></i>
                        </button>
                        
                        {activeModal === 'inversion' ? (
                            <div className="flex flex-col h-full">
                                <div className="bg-exalmar-green p-8 text-white text-center relative overflow-hidden">
                                    <i className="ph ph-piggy-bank absolute -right-6 -bottom-6 text-9xl text-white/10 transform -rotate-12"></i>
                                    <h3 className="text-3xl font-black mb-2 relative z-10">Depósitos a Plazo</h3>
                                    <p className="text-exalmar-green-100 relative z-10">Instrumento de Inversión</p>
                                </div>
                                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-2 text-exalmar-green border-b pb-2">
                                            <i className="ph ph-thumbs-up text-2xl"></i>
                                            <h4 className="font-bold text-lg">Ventajas</h4>
                                        </div>
                                        <ul className="space-y-4">
                                            <li className="flex items-start gap-3">
                                                <i className="ph ph-trend-up text-exalmar-green text-xl mt-0.5"></i>
                                                <div className="text-sm text-gray-700 leading-relaxed">
                                                    <strong className="text-exalmar-dark block mb-1">Generación de rentabilidad</strong>
                                                    Permiten rentabilizar excedentes temporales de caja.
                                                    <span className="block mt-1 text-xs font-bold text-exalmar-green bg-exalmar-green/10 p-1.5 rounded-lg border border-exalmar-green/20">
                                                        Ej: Ingresos de US$ 2.52M (2024) y US$ 1.77M (2025).
                                                    </span>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <i className="ph ph-arrows-out text-exalmar-green text-xl mt-0.5"></i>
                                                <div className="text-sm text-gray-700 leading-relaxed">
                                                    <strong className="text-exalmar-dark block mb-1">Alta liquidez y flexibilidad</strong>
                                                    Vencimiento menor a 3 meses, renovables o cancelables rápidamente para usar en operaciones.
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <i className="ph ph-shield-check text-exalmar-green text-xl mt-0.5"></i>
                                                <div className="text-sm text-gray-700 leading-relaxed">
                                                    <strong className="text-exalmar-dark block mb-1">Doble protección de riesgo</strong>
                                                    Denominados en dólares (moneda funcional) y colocados en bancos A+ (Interbank, Santander, BCP), minimizando el riesgo crediticio.
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-2 text-red-500 border-b pb-2">
                                            <i className="ph ph-thumbs-down text-2xl"></i>
                                            <h4 className="font-bold text-lg">Desventajas</h4>
                                        </div>
                                        <ul className="space-y-4">
                                            <li className="flex items-start gap-3">
                                                <i className="ph ph-chart-line-down text-red-500 text-xl mt-0.5"></i>
                                                <div className="text-sm text-gray-700 leading-relaxed">
                                                    <strong className="text-gray-900 block mb-1">Rendimiento limitado</strong>
                                                    Al priorizar liquidez y seguridad, ofrecen menores retornos frente al costo de oportunidad operativo.
                                                    <span className="block mt-1 text-xs font-medium text-red-600 bg-red-50 p-1.5 rounded-lg border border-red-100">
                                                        Ej: Tasa fija anual de 4.2% en 2024.
                                                    </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col h-full">
                                <div className="bg-orange-500 p-8 text-white text-center relative overflow-hidden">
                                    <i className="ph ph-hand-coins absolute -right-6 -bottom-6 text-9xl text-white/10 transform rotate-12"></i>
                                    <h3 className="text-3xl font-black mb-2 relative z-10">Préstamos a Corto Plazo</h3>
                                    <p className="text-orange-100 relative z-10">Instrumento de Financiamiento</p>
                                </div>
                                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-2 text-exalmar-green border-b pb-2">
                                            <i className="ph ph-thumbs-up text-2xl"></i>
                                            <h4 className="font-bold text-lg">Ventajas</h4>
                                        </div>
                                        <ul className="space-y-4">
                                            <li className="flex items-start gap-3">
                                                <i className="ph ph-lightning text-exalmar-green text-xl mt-0.5"></i>
                                                <div className="text-sm text-gray-700 leading-relaxed">
                                                    <strong className="text-exalmar-dark block mb-1">Acceso inmediato a capital de trabajo</strong>
                                                    Vitales durante meses de veda sin producción pero con altos costos fijos.
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <i className="ph ph-package text-exalmar-green text-xl mt-0.5"></i>
                                                <div className="text-sm text-gray-700 leading-relaxed">
                                                    <strong className="text-exalmar-dark block mb-1">Apalancamiento sobre inventarios</strong>
                                                    Uso de Warrants de harina de pescado para convertir activos físicos en dinero líquido.
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <i className="ph ph-bank text-exalmar-green text-xl mt-0.5"></i>
                                                <div className="text-sm text-gray-700 leading-relaxed">
                                                    <strong className="text-exalmar-dark block mb-1">Diversificación de fuentes</strong>
                                                    Múltiples bancos simultáneos (BCP, Interbank, Scotiabank, Itaú, etc.) evita depender de uno solo.
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-2 text-red-500 border-b pb-2">
                                            <i className="ph ph-thumbs-down text-2xl"></i>
                                            <h4 className="font-bold text-lg">Desventajas</h4>
                                        </div>
                                        <ul className="space-y-4">
                                            <li className="flex items-start gap-3">
                                                <i className="ph ph-money text-red-500 text-xl mt-0.5"></i>
                                                <div className="text-sm text-gray-700 leading-relaxed">
                                                    <strong className="text-gray-900 block mb-1">Alta carga de intereses</strong>
                                                    Salida de efectivo significativa que reduce la utilidad neta.
                                                    <span className="block mt-1 text-xs font-medium text-red-600 bg-red-50 p-1.5 rounded-lg border border-red-100">
                                                        Ej: Gastos de US$ 11.53M (2024) y US$ 10.94M (2025).
                                                    </span>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <i className="ph ph-warning-circle text-red-500 text-xl mt-0.5"></i>
                                                <div className="text-sm text-gray-700 leading-relaxed">
                                                    <strong className="text-gray-900 block mb-1">Riesgo de liquidez y refinanciamiento</strong>
                                                    Líneas de crédito cancelables unilateralmente, obligando a un riguroso manejo de caja.
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <i className="ph ph-lock-key text-red-500 text-xl mt-0.5"></i>
                                                <div className="text-sm text-gray-700 leading-relaxed">
                                                    <strong className="text-gray-900 block mb-1">Bloqueo de activos comerciales</strong>
                                                    Exige pignorar el producto, restringiendo su venta libre.
                                                    <span className="block mt-1 text-xs font-medium text-red-600 bg-red-50 p-1.5 rounded-lg border border-red-100">
                                                        Ej: 47,368 TM (2024) y 28,160 TM (2025) inmovilizadas.
                                                    </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="bg-gray-50 p-4 text-center border-t">
                            <button onClick={() => setActiveModal(null)} className="px-6 py-2 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-700 transition-colors">
                                Entendido
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
