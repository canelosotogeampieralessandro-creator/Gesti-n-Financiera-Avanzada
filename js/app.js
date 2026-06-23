const { useState } = React;

const menuData = [
    { 
        id: 'info', 
        title: 'Información general', 
        type: 'expandable',
        subItems: [
            { id: 'info-datos', title: 'Datos de la Empresa' },
            { id: 'info-mision', title: 'Misión y Visión' },
            { id: 'liquidez-estado-resultado', title: 'Estado de Resultado Integral' },
            { id: 'liquidez-estado-situacion', title: 'Estado de Situación Financiera' },
            { id: 'liquidez-estado-flujo', title: 'Estado de Flujos de Efectivo' },
            { id: 'liquidez-evolucion', title: 'Evolución' }
        ]
    },
    { 
        id: 'liquidez', 
        title: 'Análisis de la fuente de financiamiento', 
        type: 'expandable',
        subItems: [
            { id: 'liquidez-mercado-monetario', title: 'Mercado Monetario' },
            { id: 'liquidez-simulador-tasas', title: 'Simulador de Tasas' },
            { id: 'liquidez-mercado-capitales', title: 'Mercado de Capitales' }
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
    },

    { id: 'conclusiones', title: 'Conclusiones', type: 'simple' },
    { id: 'recomendaciones', title: 'Recomendaciones', type: 'simple' }
];

const CoverPage = ({ onEnter }) => (
    <div className="w-screen h-screen relative flex flex-col items-center justify-center overflow-hidden bg-exalmar-blue">
        <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1582231633534-118c728eeb29?auto=format&fit=crop&q=80&w=1920" alt="Fondo Exalmar" className="w-full h-full object-cover opacity-30 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-exalmar-dark via-exalmar-blue/80 to-transparent"></div>
        </div>
        
        <div className="z-10 text-center flex flex-col items-center animate-fade-in-up w-full px-6">
            <div className="bg-white/10 p-6 rounded-[2rem] backdrop-blur-md border border-white/20 mb-8 shadow-2xl">
                <i className="ph ph-boat text-white text-7xl"></i>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 tracking-tighter drop-shadow-2xl" style={{ fontFamily: 'Georgia, serif' }}>
                PESQUERA EXALMAR<br/>S.A.A.
            </h1>
            
            <div className="h-1 w-32 bg-exalmar-accent mb-6 rounded-full"></div>
            
            <h2 className="text-xl md:text-2xl font-bold text-exalmar-light tracking-[0.3em] mb-12 drop-shadow-md">
                GESTIÓN FINANCIERA AVANZADA
            </h2>
            
            <button 
                onClick={onEnter}
                className="group relative px-8 py-4 bg-white text-exalmar-blue font-black text-xl rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
                <span className="relative z-10 flex items-center gap-3">
                    Ingresar al Panel de Riesgos
                    <i className="ph ph-arrow-right-bold text-2xl group-hover:translate-x-2 transition-transform"></i>
                </span>
                <div className="absolute inset-0 bg-gray-100 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out"></div>
            </button>
        </div>
    </div>
);

const DatosEmpresaView = () => (
    <div className="w-full h-full bg-white rounded-2xl p-8 md:p-12 relative overflow-y-auto shadow-xl">
        <div className="flex gap-2 mb-6">
            <div className="w-3 h-3 bg-exalmar-blue rounded-full"></div>
            <div className="w-3 h-3 bg-exalmar-blue rounded-full"></div>
            <div className="w-3 h-3 bg-exalmar-blue rounded-full"></div>
        </div>
        <div className="w-48 h-[2px] bg-exalmar-blue mb-10"></div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="w-full lg:w-1/3 flex flex-col relative">
                <img src="https://i.ytimg.com/vi/pRxHrVIIGgw/maxresdefault.jpg" alt="Trabajadora Exalmar" className="w-full rounded-2xl object-cover h-80 shadow-lg z-10" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-exalmar-blue rounded-xl flex items-center justify-center shadow-xl z-20">
                    <i className="ph ph-handshake text-white text-6xl"></i>
                </div>
            </div>

            <div className="w-full lg:w-2/3 flex flex-col pt-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-outline tracking-tighter mb-12">
                    INFORMACIÓN<br/>GENERAL
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
                    <div>
                        <h3 className="text-exalmar-blue font-black text-xl mb-2 uppercase tracking-wide">Nombre</h3>
                        <p className="text-gray-800 text-lg">Pesquera Exalmar S.A.A.</p>
                    </div>
                    <div>
                        <h3 className="text-exalmar-blue font-black text-xl mb-2 uppercase tracking-wide">RUC</h3>
                        <p className="text-gray-800 text-lg">20380336384</p>
                    </div>
                    <div>
                        <h3 className="text-exalmar-blue font-black text-xl mb-2 uppercase tracking-wide">Dirección</h3>
                        <p className="text-gray-800 text-lg leading-relaxed">Av. Víctor Andrés Belaúnde 214,<br/>Piso 6, San Isidro, Lima, Perú.</p>
                    </div>
                    <div>
                        <h3 className="text-exalmar-blue font-black text-xl mb-2 uppercase tracking-wide">Tipo de Empresa</h3>
                        <p className="text-gray-800 text-lg leading-relaxed">Industria pesquera de consumo humano indirecto (CHI) y directo (CHD).</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const MisionVisionView = () => (
    <div className="w-full h-full bg-white rounded-2xl p-8 md:p-12 relative overflow-y-auto shadow-xl flex flex-col">
        <div className="w-full h-40 bg-gray-50 rounded-2xl overflow-hidden shadow flex mb-12 flex-shrink-0">
            <div className="w-1/2 h-full hidden md:block relative">
                <img src="https://www.exalmar.com.pe/wp-content/uploads/2016/04/39-3-1024x508.jpg" alt="Barco" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-exalmar-blue/20"></div>
            </div>
            <div className="w-full md:w-1/2 h-full bg-exalmar-accent flex items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute -left-10 top-0 bottom-0 w-20 bg-exalmar-accent transform skew-x-12 z-10 hidden md:block"></div>
                <div className="text-center text-white z-20 flex flex-col items-center">
                    <p className="font-bold text-lg tracking-widest">TRABAJANDO</p>
                    <div className="bg-exalmar-green px-4 py-1 rounded my-1 font-black text-2xl shadow-sm text-white">
                        JUNTOS POR UN
                    </div>
                    <p className="font-bold text-lg tracking-widest">FUTURO SOSTENIBLE</p>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-3 bg-exalmar-green"></div>
            </div>
        </div>

        <div className="flex items-center gap-6 mb-12">
            <div className="bg-exalmar-blue p-4 rounded-xl shadow-lg flex-shrink-0">
                <i className="ph ph-target text-white text-4xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">PESQUERA EXALMAR</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative flex-grow">
            <div className="flex flex-col">
                <h2 className="text-3xl font-black mb-6 text-gray-900">MISIÓN</h2>
                <div className="border-l-[3px] border-exalmar-blue pl-6">
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Desarrollamos de forma sostenible productos hidrobiológicos de calidad, mejorando y transformando las condiciones de vida de las personas.
                    </p>
                </div>
            </div>
            
            <div className="flex flex-col relative">
                <h2 className="text-3xl font-black mb-6 text-gray-900">VISIÓN</h2>
                <div className="border-l-[3px] border-exalmar-blue pl-6 pr-8">
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Ser reconocida por nuestros grupos de interés como una empresa sostenible, proveedora de los mejores productos de alto valor proteico.
                    </p>
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-2 hidden md:flex">
                    <div className="w-4 h-4 bg-exalmar-blue rounded-full"></div>
                    <div className="w-4 h-4 bg-exalmar-blue rounded-full"></div>
                    <div className="w-4 h-4 bg-exalmar-blue rounded-full"></div>
                </div>
            </div>
        </div>
    </div>
);

const FinancialStatementsView = () => {
    const incomeData = [
        { concepto: "Ventas Netas", anio2025: "531,479", anio2024: "456,503", var: "+16.4%" },
        { concepto: "Costo de Ventas", anio2025: "(404,104)", anio2024: "(340,490)", var: "+18.7%" },
        { concepto: "Utilidad Bruta", anio2025: "98,873", anio2024: "88,997", var: "+11.1%" },
        { concepto: "Gastos Operacionales Netos", anio2025: "(22,484)", anio2024: "(16,114)", var: "+39.5%" },
        { concepto: "Utilidad Operativa", anio2025: "76,389", anio2024: "72,883", var: "+4.8%" },
        { concepto: "Gastos Financieros", anio2025: "(27,807)", anio2024: "(27,438)", var: "+1.3%" },
        { concepto: "Utilidad antes de IR", anio2025: "52,387", anio2024: "47,847", var: "+9.5%" },
        { concepto: "Utilidad Neta", anio2025: "38,693", anio2024: "30,042", var: "+28.8%" }
    ];

    const balanceData = [
        { concepto: "Activos Corrientes", anio2025: "293,110", anio2024: "270,062", var: "+8.5%" },
        { concepto: "Activos No Corrientes", anio2025: "600,509", anio2024: "467,268", var: "+28.5%" },
        { concepto: "Total Activos", anio2025: "893,619", anio2024: "737,330", var: "+21.2%" },
        { concepto: "Pasivos Corrientes", anio2025: "357,417", anio2024: "273,604", var: "+30.6%" },
        { concepto: "Pasivos No Corrientes", anio2025: "219,113", anio2024: "163,951", var: "+33.6%" },
        { concepto: "Total Pasivos", anio2025: "576,530", anio2024: "437,555", var: "+31.8%" },
        { concepto: "Total Patrimonio", anio2025: "317,089", anio2024: "299,775", var: "+5.8%" }
    ];

    return (
        <div className="flex flex-col h-full w-full bg-exalmar-light rounded-2xl p-6 shadow-inner overflow-y-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-6 gap-4">
                <div>
                    <h3 className="text-3xl font-black text-exalmar-blue tracking-tight uppercase">Estados Financieros</h3>
                    <p className="text-gray-500 mt-1 font-medium">Comparativo Anual Consolidado (2025 vs 2024)</p>
                </div>
                <div className="bg-white text-exalmar-blue text-sm font-bold px-4 py-2 rounded-lg shadow border border-gray-200 self-start md:self-auto flex items-center gap-2">
                    <i className="ph ph-info text-lg"></i>
                    Expresado en miles de US$
                </div>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
                    <div className="bg-exalmar-accent p-4 flex items-center justify-between">
                        <h4 className="text-white font-bold text-lg flex items-center gap-2">
                            <i className="ph ph-chart-line-up text-xl"></i> Estado de Resultados Integral
                        </h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-5 py-3">Concepto</th>
                                    <th className="px-5 py-3 text-right">2025</th>
                                    <th className="px-5 py-3 text-right">2024</th>
                                    <th className="px-5 py-3 text-right">Var. (%)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {incomeData.map((row, idx) => {
                                    const isTotal = row.concepto.includes("Utilidad");
                                    return (
                                        <tr key={idx} className={`hover:bg-blue-50/50 transition-colors ${isTotal ? 'bg-gray-50/50' : ''}`}>
                                            <td className={`px-5 py-3 text-exalmar-dark ${isTotal ? 'font-black' : 'font-medium'}`}>{row.concepto}</td>
                                            <td className="px-5 py-3 text-right font-medium text-gray-700">{row.anio2025}</td>
                                            <td className="px-5 py-3 text-right font-medium text-gray-700">{row.anio2024}</td>
                                            <td className={`px-5 py-3 text-right font-black ${row.var.startsWith('+') && !row.concepto.includes('Gastos') && !row.concepto.includes('Costo') ? 'text-exalmar-green' : (row.var.startsWith('+') ? 'text-red-500' : 'text-gray-500')}`}>
                                                {row.var}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
                    <div className="bg-exalmar-blue p-4 flex items-center justify-between">
                        <h4 className="text-white font-bold text-lg flex items-center gap-2">
                            <i className="ph ph-scales text-xl"></i> Estado de Situación Financiera
                        </h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-5 py-3">Concepto</th>
                                    <th className="px-5 py-3 text-right">2025</th>
                                    <th className="px-5 py-3 text-right">2024</th>
                                    <th className="px-5 py-3 text-right">Var. (%)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {balanceData.map((row, idx) => (
                                    <tr key={idx} className={`hover:bg-blue-50/50 transition-colors ${row.concepto.startsWith('Total') ? 'bg-gray-50/50' : ''}`}>
                                        <td className={`px-5 py-3 text-exalmar-dark ${row.concepto.startsWith('Total') ? 'font-black' : 'font-medium'}`}>
                                            {row.concepto}
                                        </td>
                                        <td className="px-5 py-3 text-right font-medium text-gray-700">{row.anio2025}</td>
                                        <td className="px-5 py-3 text-right font-medium text-gray-700">{row.anio2024}</td>
                                        <td className={`px-5 py-3 text-right font-black ${row.var.startsWith('+') && !row.concepto.includes('Pasivos') ? 'text-exalmar-green' : (row.var.startsWith('+') ? 'text-red-500' : 'text-gray-500')}`}>
                                            {row.var}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden flex-shrink-0">
                 <div className="p-4 flex items-center gap-4 bg-gray-50 border-b border-gray-200">
                     <div className="bg-exalmar-green text-white p-2 rounded-lg shadow-sm">
                         <i className="ph ph-money text-2xl"></i>
                     </div>
                     <div>
                         <h4 className="text-exalmar-dark font-bold text-lg uppercase">Flujos de Efectivo Destacados (2025)</h4>
                     </div>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                     <div className="p-5 flex flex-col">
                         <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-bold">Actividades de Operación</p>
                         <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-black text-exalmar-green">56,047</p>
                         </div>
                     </div>
                     <div className="p-5 flex flex-col">
                         <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-bold">Aplicado en Inversión</p>
                         <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-black text-red-500">(51,061)</p>
                         </div>
                     </div>
                     <div className="p-5 flex flex-col">
                         <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-bold">Efectivo al Final del Año</p>
                         <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-black text-exalmar-blue">5,553</p>
                         </div>
                     </div>
                 </div>
            </div>
        </div>
    );
};

// Continuar en la siguiente sección...
window.menuData = menuData;
window.CoverPage = CoverPage;
window.DatosEmpresaView = DatosEmpresaView;
window.MisionVisionView = MisionVisionView;
window.FinancialStatementsView = FinancialStatementsView;
