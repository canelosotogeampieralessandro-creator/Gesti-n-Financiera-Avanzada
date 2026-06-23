import React, { useState } from 'react';

export const MercadoCapitalesView = () => {
    const [activeModal, setActiveModal] = useState(null);

    const modalContent = {
        acciones: {
            title: "Acciones Comunes",
            color: "purple",
            icon: "ph-chart-line-up",
            ventajas: [
                <><strong>Levantamiento masivo de capital sin costo financiero fijo:</strong> Permitió a la empresa fondearse estructuralmente acudiendo al mercado local e internacional. Por ejemplo, en 2010 la colocación de 57.5 millones de acciones le generó un importante respaldo patrimonial, reconociendo una prima de capital de <span className="inline-block bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-bold text-xs mt-1 shadow-sm">US$ 69.7 millones</span> (neto de costos vinculados).</>
            ],
            desventajas: [
                <><strong>Fuerte salida de efectivo por dividendos:</strong> Al cotizar sus acciones, la empresa asume el compromiso continuo de remunerar a sus accionistas locales y extranjeros. Esto obliga a la Compañía a destinar gran parte de su caja a la distribución de dividendos, lo cual representó salidas millonarias a lo largo del periodo: <br/><div className="mt-2 flex flex-wrap gap-2"><span className="bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold text-xs shadow-sm">US$ 30M (2021-2022)</span> <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold text-xs shadow-sm">US$ 9.6M (2023)</span> <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold text-xs shadow-sm">US$ 17M (2024)</span> <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold text-xs shadow-sm">US$ 20M (2025)</span></div></>
            ]
        },
        sindicados: {
            title: "Préstamos Sindicados",
            color: "orange",
            icon: "ph-handshake",
            ventajas: [
                <><strong>Flexibilidad estratégica para crecer y refinanciar:</strong> Es un instrumento versátil que se adapta a las necesidades de la empresa. En 2023 se pactó un tramo de US$ 50M como línea de capital de trabajo revolvente por tres años. Además, permitió financiar el crecimiento inorgánico en 2025 al adquirir Pesquera Centinela S.A.C., utilizando un tramo adicional de <span className="inline-block bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-bold text-xs mt-1 shadow-sm">US$ 100 millones a 5 años</span> con una conveniente "cuota balloon" (50% al vencimiento final).</>
            ],
            desventajas: [
                <><strong>Sujeción a estrictos resguardos financieros (Covenants):</strong> Este instrumento limita el margen de maniobra de la Gerencia, obligándola contractualmente a cumplir de forma semestral índices estrictos (ej. ratio de apalancamiento no mayor a 1.50 y ratio Deuda Financiera / EBITDA no mayor a 3.75).</>,
                <><strong>Compromiso de los activos principales:</strong> Para acceder y mantener estos megacréditos, la empresa debe entregar en garantía (hipotecas) casi toda su matriz productiva. Al cierre de 2025, las plantas y embarcaciones entregadas en garantía ascendían a <span className="inline-block bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold text-xs mt-1 shadow-sm">US$ 259.2 millones</span>.</>,
                <><strong>Exposición a tasas variables:</strong> Los intereses están atados a tasas internacionales fluctuantes (como Libor), obligando a la empresa a gestionar activamente el riesgo.</>
            ]
        },
        swaps: {
            title: "Swaps de Tasas de Interés",
            color: "teal",
            icon: "ph-arrows-left-right",
            ventajas: [
                <><strong>Mitigación de la incertidumbre internacional:</strong> Al intercambiar la tasa variable de su Préstamo Sindicado por una tasa fija pactada, la empresa estabiliza y blinda la proyección de sus flujos de efectivo.</>,
                <><strong>Generación de ingresos financieros:</strong> Cuando las tasas variables del mercado suben por encima de la tasa fija pactada, el derivado juega a su favor, reconociendo importantes ganancias netas. Generaron ganancia de <span className="inline-block bg-teal-100 text-teal-700 px-2 py-0.5 rounded font-bold text-xs mt-1 shadow-sm">US$ 11.8 millones en 2023</span> y <span className="inline-block bg-teal-100 text-teal-700 px-2 py-0.5 rounded font-bold text-xs mt-1 shadow-sm">US$ 864 mil en 2025</span>.</>
            ],
            desventajas: [
                <><strong>Riesgo de pérdidas por movimientos a la baja:</strong> Si las tasas de mercado internacional caen y resultan más baratas que la tasa fija pactada, la empresa asume un sobrecosto (gasto financiero directo). Ocurrió cuando reconocieron pérdidas de <span className="inline-block bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold text-xs mt-1 shadow-sm">US$ 3.1 millones en 2021</span> y <span className="inline-block bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold text-xs mt-1 shadow-sm">US$ 505 mil en 2022</span>.</>
            ]
        },
        bonos: {
            title: "Bonos Corporativos",
            color: "gray",
            icon: "ph-certificate",
            ventajas: [
                <><strong>Gran volumen de liquidez a largo plazo:</strong> En su momento (2013), permitió a Exalmar captar de una sola vez <span className="inline-block bg-gray-200 text-gray-700 px-2 py-0.5 rounded font-bold text-xs mt-1 shadow-sm">US$ 200 millones</span> en el mercado internacional a un plazo de 7 años, proporcionando los fondos necesarios para apalancar sus operaciones y reestructurar deudas.</>
            ],
            desventajas: [
                <><strong>Alta y rígida carga financiera:</strong> La principal desventaja fue su elevado costo. Los bonos devengaban una alta tasa de interés fija anual (inicialmente de 7.375%, incrementada al 8% en 2018). Este costoso pasivo forzó a la empresa a adquirir nuevos préstamos exclusivamente para recomprar y liquidar anticipadamente estos bonos para abaratar su deuda.</>
            ]
        }
    };
    return (
        <div className="flex flex-col h-full w-full bg-exalmar-light rounded-2xl p-6 shadow-inner overflow-y-auto animate-fade-in-up">
            <div className="mb-8">
                <h3 className="text-3xl font-black text-exalmar-blue tracking-tight uppercase">Mercado de Capitales</h3>
                <p className="text-gray-500 mt-1 font-medium">Instrumentos de renta variable, financiamiento estructurado y derivados de cobertura</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                
                {/* 1. Acciones Comunes */}
                <div className="bg-white rounded-2xl shadow-lg border-t-4 border-purple-500 overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="bg-purple-100 text-purple-700 text-xs font-black uppercase px-3 py-1 rounded-full tracking-wider">
                                Renta Variable
                            </span>
                            <button 
                                onClick={() => setActiveModal('acciones')}
                                className="bg-purple-50 p-3 rounded-full text-purple-500 hover:bg-purple-500 hover:text-white transition-all hover:scale-110 shadow-sm cursor-pointer animate-pulse"
                                title="Ver Ventajas y Desventajas"
                            >
                                <i className="ph ph-chart-line-up text-3xl"></i>
                            </button>
                        </div>
                        <h4 className="text-2xl font-black text-exalmar-dark mb-2">Acciones Comunes</h4>
                        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                            Al ser una Sociedad Anónima Abierta (S.A.A.), Exalmar participa activamente en el mercado de valores ofreciendo participaciones de su capital.
                        </p>
                        
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                                <i className="ph ph-files text-purple-500 text-xl mt-0.5"></i>
                                <div>
                                    <h5 className="font-bold text-gray-800 text-sm">Capital Emitido</h5>
                                    <p className="text-sm text-gray-600">Representado por <strong className="text-exalmar-blue">295,536,144</strong> acciones comunes con un valor nominal de S/ 1.00 cada una.</p>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                                <i className="ph ph-calendar-star text-purple-500 text-xl mt-0.5"></i>
                                <div>
                                    <h5 className="font-bold text-gray-800 text-sm">Hito Histórico (Octubre 2010)</h5>
                                    <p className="text-sm text-gray-600">Aumento de capital mediante oferta y colocación local e internacional de <strong>57.5 millones</strong> de acciones a S/ 4.75 cada una.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Préstamos Sindicados */}
                <div className="bg-white rounded-2xl shadow-lg border-t-4 border-orange-500 overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="bg-orange-100 text-orange-700 text-xs font-black uppercase px-3 py-1 rounded-full tracking-wider">
                                Deuda Estructurada L.P.
                            </span>
                            <button 
                                onClick={() => setActiveModal('sindicados')}
                                className="bg-orange-50 p-3 rounded-full text-orange-500 hover:bg-orange-500 hover:text-white transition-all hover:scale-110 shadow-sm cursor-pointer animate-pulse"
                                title="Ver Ventajas y Desventajas"
                            >
                                <i className="ph ph-handshake text-3xl"></i>
                            </button>
                        </div>
                        <h4 className="text-2xl font-black text-exalmar-dark mb-2">Préstamos Sindicados</h4>
                        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                            Principal instrumento actual de deuda a largo plazo, gestionado mediante consorcios con bancos de primer nivel (Rabobank, DNB Bank ASA, Santander, BCP, entre otros).
                        </p>
                        
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                                <i className="ph ph-bank text-orange-500 text-xl mt-0.5"></i>
                                <div>
                                    <h5 className="font-bold text-gray-800 text-sm">Estructuración Base (2023)</h5>
                                    <p className="text-sm text-gray-600">Préstamo sindicado estructurado originalmente por <strong className="text-exalmar-blue">US$ 150 millones</strong>.</p>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                                <i className="ph ph-trend-up text-orange-500 text-xl mt-0.5"></i>
                                <div>
                                    <h5 className="font-bold text-gray-800 text-sm">Modificación Reciente (Abril 2025)</h5>
                                    <p className="text-sm text-gray-600">
                                        Tramo adicional de US$ 100M con cuota "balloon" del 50%. 
                                        <span className="block mt-2 font-bold text-orange-600 bg-orange-100 p-2 rounded-lg text-center">
                                            Saldo total cierre 2025: US$ 178.3 Millones
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Swaps de Tasas de Interés */}
                <div className="bg-white rounded-2xl shadow-lg border-t-4 border-teal-500 overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="bg-teal-100 text-teal-700 text-xs font-black uppercase px-3 py-1 rounded-full tracking-wider">
                                Instrumento Financiero Derivado
                            </span>
                            <button 
                                onClick={() => setActiveModal('swaps')}
                                className="bg-teal-50 p-3 rounded-full text-teal-500 hover:bg-teal-500 hover:text-white transition-all hover:scale-110 shadow-sm cursor-pointer animate-pulse"
                                title="Ver Ventajas y Desventajas"
                            >
                                <i className="ph ph-arrows-left-right text-3xl"></i>
                            </button>
                        </div>
                        <h4 className="text-2xl font-black text-exalmar-dark mb-2">Swaps de Tasas de Interés</h4>
                        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                            Contratos de permuta financiera que le permiten a la compañía proteger sus operaciones de las fluctuaciones macroeconómicas y el riesgo de mercado internacional.
                        </p>
                        
                        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                            <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
                                <div className="text-center sm:text-left flex-1">
                                    <h5 className="font-bold text-red-500 text-sm mb-1"><i className="ph ph-warning-circle mr-1"></i>Tasa Variable</h5>
                                    <p className="text-xs text-gray-500">Préstamos sujetos a tasas volátiles (Ej. Libor)</p>
                                </div>
                                <div className="text-teal-500 animate-pulse hidden sm:block">
                                    <i className="ph ph-arrow-right text-2xl"></i>
                                </div>
                                <div className="text-teal-500 animate-pulse block sm:hidden">
                                    <i className="ph ph-arrow-down text-2xl"></i>
                                </div>
                                <div className="text-center sm:text-right flex-1">
                                    <h5 className="font-bold text-teal-600 text-sm mb-1">Tasa Fija <i className="ph ph-shield-check ml-1"></i></h5>
                                    <p className="text-xs text-gray-500">Protección y certeza en los pagos pactados</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Bonos Corporativos Internacionales */}
                <div className="bg-white rounded-2xl shadow-lg border-t-4 border-gray-400 overflow-hidden opacity-90 group hover:opacity-100 hover:shadow-xl transition-all duration-300">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="bg-gray-100 text-gray-600 text-xs font-black uppercase px-3 py-1 rounded-full tracking-wider">
                                Instrumento de Deuda Histórico
                            </span>
                            <button 
                                onClick={() => setActiveModal('bonos')}
                                className="bg-gray-200 p-3 rounded-full text-gray-600 hover:bg-gray-600 hover:text-white transition-all hover:scale-110 shadow-sm cursor-pointer animate-pulse"
                                title="Ver Ventajas y Desventajas"
                            >
                                <i className="ph ph-certificate text-3xl"></i>
                            </button>
                        </div>
                        <h4 className="text-2xl font-black text-gray-800 mb-2">Bonos Corporativos (144A REGS)</h4>
                        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                            Instrumento utilizado activamente en el pasado. Su colocación principal fue en enero de 2013 por un valor principal de US$ 200 millones a 7 años.
                        </p>
                        
                        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 flex items-start gap-4">
                            <i className="ph ph-check-circle text-gray-400 text-3xl"></i>
                            <div>
                                <h5 className="font-bold text-gray-700 text-sm">Obligación 100% Liquidada</h5>
                                <p className="text-sm text-gray-500 mt-1">
                                    Mediante una estrategia de sucesivas recompras a lo largo de los años, el <strong>25 de enero de 2022</strong> la empresa canceló el saldo restante de US$ 1.81M, liquidando por completo esta obligación.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Modal de Ventajas y Desventajas */}
            {activeModal && modalContent[activeModal] && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col max-h-[90vh]">
                        
                        {/* Cabecera del Modal */}
                        <div className={`p-6 bg-${modalContent[activeModal].color}-50 border-b border-${modalContent[activeModal].color}-100 flex justify-between items-center`}>
                            <div className="flex items-center gap-4">
                                <div className={`bg-${modalContent[activeModal].color}-500 text-white p-3 rounded-xl shadow-md`}>
                                    <i className={`ph ${modalContent[activeModal].icon} text-3xl`}></i>
                                </div>
                                <div>
                                    <h3 className={`text-2xl font-black text-${modalContent[activeModal].color}-800 uppercase`}>
                                        {modalContent[activeModal].title}
                                    </h3>
                                    <p className={`text-sm text-${modalContent[activeModal].color}-600 font-medium`}>
                                        Análisis de Ventajas y Riesgos
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setActiveModal(null)}
                                className={`text-${modalContent[activeModal].color}-400 hover:text-${modalContent[activeModal].color}-700 transition-colors bg-white rounded-full p-2 hover:bg-${modalContent[activeModal].color}-100`}
                            >
                                <i className="ph ph-x text-2xl"></i>
                            </button>
                        </div>

                        {/* Contenido del Modal */}
                        <div className="p-8 overflow-y-auto bg-gray-50/50">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                
                                {/* Ventajas */}
                                <div className="flex flex-col gap-4">
                                    <div className={`flex items-center gap-2 text-${modalContent[activeModal].color}-600 border-b pb-2`}>
                                        <i className="ph ph-thumbs-up text-2xl"></i>
                                        <h4 className="font-bold text-lg">Principales Ventajas</h4>
                                    </div>
                                    <ul className="space-y-4">
                                        {modalContent[activeModal].ventajas.map((v, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <i className={`ph ph-check-circle text-${modalContent[activeModal].color}-500 text-xl mt-0.5`}></i>
                                                <div className="text-sm text-gray-700 leading-relaxed">{v}</div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Desventajas */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-2 text-gray-600 border-b pb-2">
                                        <i className="ph ph-warning text-2xl"></i>
                                        <h4 className="font-bold text-lg">Desventajas / Riesgos</h4>
                                    </div>
                                    <ul className="space-y-4">
                                        {modalContent[activeModal].desventajas.map((d, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <i className="ph ph-warning-circle text-gray-400 text-xl mt-0.5"></i>
                                                <div className="text-sm text-gray-600 leading-relaxed">{d}</div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            </div>
                        </div>

                        {/* Footer del Modal */}
                        <div className="p-4 border-t border-gray-100 bg-white flex justify-end">
                            <button 
                                onClick={() => setActiveModal(null)}
                                className={`px-6 py-2.5 bg-${modalContent[activeModal].color}-500 hover:bg-${modalContent[activeModal].color}-600 text-white font-bold rounded-xl transition-all hover:shadow-lg`}
                            >
                                Entendido
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
