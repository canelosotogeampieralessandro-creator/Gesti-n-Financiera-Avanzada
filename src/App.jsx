import React, { useState } from "react";
import "./index.css";
import { MercadoMonetarioView } from "./MercadoMonetarioView";
import { SimuladorTasasView } from "./SimuladorTasasView";
import { MercadoCapitalesView } from "./MercadoCapitalesView";
import { SimuladorBonosView } from "./SimuladorBonosView";
import { SimuladorAccionesView } from "./SimuladorAccionesView";
import { EscenariosView } from "./EscenariosView";
import { EstrategiaFinanciamientoView } from "./EstrategiaFinanciamientoView";
import { WaccView } from "./WaccView";
import { ProyectoInversionView } from "./ProyectoInversionView";
import { SimulationProvider } from "./context/SimulationContext";


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
                    { id: 'liquidez-mercado-capitales', title: 'Mercado de Capitales' },
                    { id: 'liquidez-simulador-bonos', title: 'Simulador de Emisión de Bonos' },
                    { id: 'liquidez-simulador-acciones', title: 'Simulador de Emisión de Acciones' },
                    { id: 'liquidez-escenarios', title: 'Stress Test: Escenarios Múltiples' },
                    { id: 'liquidez-wacc', title: 'Dashboard WACC Interactivo' }
                ]
            },
            { 
                id: 'crediticio', 
                title: 'Estrategia de Financiamiento', 
                type: 'expandable',
                subItems: [
                    { id: 'liquidez-estrategia', title: 'Motor de Decisión Financiera' }
                ]
            },
            {
                id: 'proyecto',
                title: 'Proyecto Estratégico',
                type: 'expandable',
                subItems: [
                    { id: 'proyecto-steam', title: 'Modernización Steam Dried' }
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
                            Ingresar
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

                        <div className="mt-10">
                            <h3 className="text-exalmar-blue font-black text-xl mb-2 uppercase tracking-wide">Breve reseña histórica</h3>
                            <p className="text-gray-800 text-lg leading-relaxed">
                                Empresa peruana del sector pesquero fundada en 1992. Se especializa en la captura y procesamiento de recursos hidrobiológicos, principalmente anchoveta, destinada a la producción de harina y aceite de pescado.
                                <br/><br/>
                                A lo largo de los años, la empresa ha consolidado su presencia en la industria pesquera nacional mediante la modernización de su flota y plantas de procesamiento, así como la adopción de prácticas sostenibles. Actualmente, es una de las principales compañías pesqueras del Perú, con participación en mercados internacionales y un enfoque en la eficiencia y responsabilidad ambiental.
                            </p>
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
            // Data extraída del PDF proporcionado por el usuario
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
                        {/* Estado de Resultados */}
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

                        {/* Balance General */}
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

                    {/* Resumen Flujo Efectivo */}
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

        const liquidezMatrixData = [
            {
                riesgo: "1. Déficit de caja por anomalías climáticas",
                causas: "Fenómeno de El Niño (FEN) u ondas cálidas que alejan la anchoveta, resultando en suspensión de temporadas de pesca o cuotas muy reducidas.",
                probabilidad: "Media / Alta",
                impacto: "Muy Alto",
                nivel: "Crítico",
                mitigacion: "Mantener líneas de crédito comprometidas (stand-by) pre-aprobadas. Acumulación de reservas de caja en años de alta cuota (política de dividendos conservadora)."
            },
            {
                riesgo: "2. Descalce de plazos (Activos vs. Pasivos)",
                causas: "Obligaciones de deuda a corto plazo y costos fijos de \"veda\" que superan los activos líquidos disponibles antes del inicio de la siguiente temporada.",
                probabilidad: "Media",
                impacto: "Alto",
                nivel: "Alto",
                mitigacion: "Perfilamiento de deuda a largo plazo (ej. bonos corporativos internacionales o créditos sindicados). Monitoreo estricto del ratio de liquidez corriente."
            },
            {
                riesgo: "3. Restricción de acceso a fondeo bancario",
                causas: "Bancos endurecen políticas de crédito hacia el sector pesquero por percepción de riesgo climático o criterios ESG.",
                probabilidad: "Baja / Media",
                impacto: "Alto",
                nivel: "Medio - Alto",
                mitigacion: "Diversificación de fuentes de financiamiento (mercado de capitales, banca local e internacional). Mantener sólidos ratings crediticios."
            },
            {
                riesgo: "4. Retraso en el ciclo de conversión de efectivo",
                causas: "Demoras logísticas en envíos internacionales (ej. a China) o retrasos en pagos de clientes, alargando los días de cuentas por cobrar.",
                probabilidad: "Media",
                impacto: "Medio",
                nivel: "Medio",
                mitigacion: "Uso de instrumentos de factoring o descuento de letras. Negociación de cartas de crédito irrevocables con compradores internacionales."
            },
            {
                riesgo: "5. Sobrecostos imprevistos de capital de trabajo",
                causas: "Necesidad de mantenimientos correctivos urgentes en embarcaciones o plantas procesadoras que consumen la caja operativa.",
                probabilidad: "Alta",
                impacto: "Bajo / Medio",
                nivel: "Medio",
                mitigacion: "Presupuestación estricta de CapEx de mantenimiento preventivo durante las vedas. Fondos de contingencia operativos."
            }
        ];

        const crediticioMatrixData = [
            {
                riesgo: "1. Incumplimiento de pago de clientes internacionales",
                causas: "Quiebra, iliquidez o disputas comerciales con importadores (ej. en China o Europa) tras el envío de la mercancía.",
                probabilidad: "Baja",
                impacto: "Muy Alto",
                nivel: "Alto",
                mitigacion: "Exigir Cartas de Crédito (L/C) irrevocables y confirmadas por bancos de primera línea. Uso de seguros de crédito a la exportación."
            },
            {
                riesgo: "2. Incobrabilidad de adelantos a armadores de terceros",
                causas: "Préstamos o adelantos de capital de trabajo a pescadores independientes que no logran la pesca esperada o desvían su cuota a la competencia.",
                probabilidad: "Alta",
                impacto: "Medio",
                nivel: "Alto",
                mitigacion: "Garantías prendarias sobre las embarcaciones. Descuento automático de la deuda al momento de la descarga en planta."
            },
            {
                riesgo: "3. Concentración de la cartera de clientes",
                causas: "Alta dependencia de un grupo reducido de grandes compradores (traders) en el mercado asiático.",
                probabilidad: "Media",
                impacto: "Alto",
                nivel: "Alto",
                mitigacion: "Diversificación geográfica de las exportaciones y de la unidad de Consumo Humano Directo (CHD). Establecimiento de límites de crédito por cliente."
            },
            {
                riesgo: "4. Riesgo de contraparte en instrumentos financieros",
                causas: "Incumplimiento por parte de instituciones financieras en operaciones de cobertura (derivados) o retención de liquidez.",
                probabilidad: "Muy Baja",
                impacto: "Muy Alto",
                nivel: "Medio",
                mitigacion: "Operar únicamente con entidades financieras con clasificación de riesgo corporativo de grado de inversión (Investment Grade)."
            },
            {
                riesgo: "5. Deterioro de cuentas por cobrar locales (CHD)",
                causas: "Retrasos o impagos en las ventas de pescado congelado a distribuidores o supermercados en el mercado nacional.",
                probabilidad: "Media",
                impacto: "Bajo",
                nivel: "Bajo - Medio",
                mitigacion: "Evaluación crediticia estricta, monitoreo de días de mora y registro oportuno de la provisión por deterioro de cartera (NIIF 9)."
            }
        ];

        const mercadoMatrixData = [
            {
                riesgo: "1. Caída del precio internacional de la harina/aceite de pescado",
                causas: "Sobreoferta global, o caída en el precio de bienes sustitutos (como la harina de soya) que reduce la demanda de la industria acuícola o porcina.",
                probabilidad: "Alta",
                impacto: "Muy Alto",
                nivel: "Crítico",
                mitigacion: "Enfoque en producción de harina \"Super Prime\" o \"Prime\" (menor elasticidad de precio). Contratos de venta a futuro (forward contracts) para asegurar precios."
            },
            {
                riesgo: "2. Volatilidad del precio del combustible (Diésel/Búnker)",
                causas: "Conflictos geopolíticos o recortes de producción de la OPEP que disparan el costo operativo de la flota pesquera.",
                probabilidad: "Alta",
                impacto: "Medio",
                nivel: "Alto",
                mitigacion: "Uso de instrumentos financieros derivados (opciones o swaps petroleros) para cobertura. Renovación de flota hacia motores más eficientes."
            },
            {
                riesgo: "3. Depreciación de monedas en mercados de destino (ej. Yuan chino)",
                causas: "Debilitamiento de la moneda local en China frente al USD, encareciendo la importación de harina de pescado para los compradores asiáticos y frenando la demanda.",
                probabilidad: "Media",
                impacto: "Alto",
                nivel: "Alto",
                mitigacion: "Monitoreo macroeconómico de los principales mercados de exportación. Diversificación hacia mercados europeos y norteamericanos."
            },
            {
                riesgo: "4. Riesgo de Tipo de Cambio (Apreciación del Sol peruano)",
                causas: "Como la empresa factura en USD pero tiene gastos operativos, impuestos y planillas en Soles (PEN), un Sol fuerte incrementa sus costos expresados en dólares.",
                probabilidad: "Media",
                impacto: "Medio",
                nivel: "Medio",
                mitigacion: "Cobertura natural (manteniendo pasivos en PEN proporcionales a los gastos). Uso de Forwards de divisas (PEN/USD) según la NIIF 9."
            },
            {
                riesgo: "5. Incremento de tasas de interés internacionales (SOFR)",
                causas: "Políticas monetarias restrictivas de la Reserva Federal (FED) que encarecen el costo del servicio de la deuda a tasa variable (créditos sindicados).",
                probabilidad: "Media",
                impacto: "Medio",
                nivel: "Medio",
                mitigacion: "Contratación de Interest Rate Swaps (IRS) para fijar la tasa de los préstamos variables. Emisión de bonos a tasa fija a largo plazo."
            }
        ];

        const operacionalMatrixData = [
            {
                riesgo: "1. Parada imprevista de planta o flota",
                causas: "Fallas mecánicas críticas en embarcaciones o en maquinaria de procesamiento (calderos, secadores) por mantenimiento deficiente.",
                probabilidad: "Media",
                impacto: "Alto",
                nivel: "Alto",
                mitigacion: "Plan riguroso de Mantenimiento Preventivo (TPM) durante las épocas de veda. Stock de seguridad de repuestos críticos."
            },
            {
                riesgo: "2. Sanciones regulatorias y ambientales",
                causas: "Multas de PRODUCE o OEFA por pesca de juveniles, exceso de cuota, o vertimiento de efluentes fuera de los Límites Máximos Permisibles (LMP).",
                probabilidad: "Alta",
                impacto: "Medio",
                nivel: "Alto",
                mitigacion: "Sistemas de telemetría y control de biomasa en tiempo real. Plantas de tratamiento de aguas residuales (PTAR) operativas al 100%."
            },
            {
                riesgo: "3. Accidentes laborales graves (SST)",
                causas: "Maniobras peligrosas en altamar, atrapamientos o exposición a gases tóxicos en las plantas de procesamiento.",
                probabilidad: "Baja",
                impacto: "Alto",
                nivel: "Medio - Alto",
                mitigacion: "Cumplimiento estricto de normativas SUNAFIL y Ley 29783. Capacitación continua y uso obligatorio de EPP. Seguros SCTR actualizados."
            },
            {
                riesgo: "4. Conflictos socioambientales o sindicales",
                causas: "Reclamos de comunidades locales por olores, o huelgas de los sindicatos de pescadores exigiendo mejoras en la participación de pesca.",
                probabilidad: "Media",
                impacto: "Medio",
                nivel: "Medio",
                mitigacion: "Programas sólidos de Responsabilidad Social Empresarial (RSE) con las comunidades costeras. Negociación colectiva anticipada."
            },
            {
                riesgo: "5. Interrupción de sistemas de información (TI)",
                causas: "Caída del sistema ERP, ciberataques (Ransomware) que paralizan la trazabilidad, pesaje, facturación y control de inventarios.",
                probabilidad: "Baja",
                impacto: "Medio",
                nivel: "Bajo - Medio",
                mitigacion: "Respaldos de información diarios (Backups en la nube), firewalls de grado empresarial y planes de recuperación ante desastres (DRP)."
            }
        ];

        const getRiskBadgeStyle = (nivel) => {
            if (nivel === 'Crítico' || nivel.includes('Crítico')) return 'bg-red-100 text-red-800 border border-red-200';
            if (nivel === 'Alto') return 'bg-orange-100 text-orange-800 border border-orange-200';
            if (nivel === 'Medio - Alto') return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
            if (nivel === 'Medio') return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
            if (nivel === 'Bajo - Medio') return 'bg-green-50 text-green-700 border border-green-200';
            return 'bg-green-100 text-green-800 border border-green-200';
        };

        const SituacionInicialView = ({ activeSubMenu }) => {
            const formatVar = (val25, val24) => {
                if (!val24 || val24 === "-") return "-";
                const v25 = parseFloat(val25.replace(/,/g, '').replace('(', '-').replace(')', ''));
                const v24 = parseFloat(val24.replace(/,/g, '').replace('(', '-').replace(')', ''));
                if (isNaN(v25) || isNaN(v24)) return "-";
                const calc = ((v25 / v24) - 1) * 100;
                const sign = calc > 0 ? '+' : '';
                return `${sign}${calc.toFixed(1)}%`;
            };

            const getColorClass = (valStr) => {
                if (!valStr || valStr === "-") return "text-gray-500";
                return valStr.startsWith('+') ? "text-exalmar-green" : "text-red-500";
            };

            // Balance General
            const balanceActivoCorriente = [
                { concepto: "Efectivo y equivalentes de efectivo", notas: "6", anio2025: "5,553", anio2024: "21,548" },
                { concepto: "Cuentas por cobrar comerciales, neto", notas: "7", anio2025: "45,519", anio2024: "23,181" },
                { concepto: "Otras cuentas por cobrar", notas: "8", anio2025: "77,517", anio2024: "76,954" },
                { concepto: "Existencias, neto", notas: "9", anio2025: "107,302", anio2024: "127,557" },
                { concepto: "Cuentas por cobrar a relacionadas", notas: "28", anio2025: "35,580", anio2024: "4,923" },
                { concepto: "Crédito fiscal por Impuesto General a las ventas (IGV)", notas: "33 (h)", anio2025: "21,195", anio2024: "15,762" },
                { concepto: "Gastos pagados por adelantado", notas: "", anio2025: "444", anio2024: "137" },
                { concepto: "Total activo corriente", notas: "", anio2025: "293,110", anio2024: "270,062", isTotal: true },
            ];

            const balanceActivoNoCorriente = [
                { concepto: "Otras cuentas por cobrar", notas: "8", anio2025: "16,654", anio2024: "16,654" },
                { concepto: "Inversión en subsidiaria", notas: "10", anio2025: "133,822", anio2024: "-" },
                { concepto: "Inmuebles, embarcaciones, maquinaria y equipo, neto", notas: "11", anio2025: "209,501", anio2024: "207,242" },
                { concepto: "Intangibles, neto", notas: "12", anio2025: "119,981", anio2024: "119,994" },
                { concepto: "Crédito mercantil", notas: "12 (b)", anio2025: "113,342", anio2024: "113,342" },
                { concepto: "Activos por derecho de uso", notas: "13", anio2025: "6,322", anio2024: "7,308" },
                { concepto: "Otros activos", notas: "", anio2025: "887", anio2024: "2,728" },
                { concepto: "Total activo no corriente", notas: "", anio2025: "600,509", anio2024: "467,268", isTotal: true },
                { concepto: "Total activo", notas: "", anio2025: "893,619", anio2024: "737,330", isTotal: true, isSuperTotal: true },
            ];

            const balancePasivoCorriente = [
                { concepto: "Préstamos bancarios", notas: "14", anio2025: "168,460", anio2024: "136,782" },
                { concepto: "Obligaciones financieras", notas: "15", anio2025: "43,357", anio2024: "33,933" },
                { concepto: "Cuentas por pagar comerciales", notas: "16", anio2025: "62,847", anio2024: "55,280" },
                { concepto: "Tributos, remuneraciones y otras cuentas por pagar", notas: "17", anio2025: "82,662", anio2024: "47,591" },
                { concepto: "Cuentas por pagar a relacionadas", notas: "28", anio2025: "91", anio2024: "18" },
                { concepto: "Total pasivo corriente", notas: "", anio2025: "357,417", anio2024: "273,604", isTotal: true },
            ];

            const balancePasivoNoCorriente = [
                { concepto: "Obligaciones financieras", notas: "15", anio2025: "171,630", anio2024: "108,015" },
                { concepto: "Tributos, remuneraciones y otras cuentas por pagar", notas: "17", anio2025: "337", anio2024: "991" },
                { concepto: "Provisiones para contingencias", notas: "18", anio2025: "3,379", anio2024: "1,957" },
                { concepto: "Pasivo por impuesto a la renta diferido", notas: "19", anio2025: "43,767", anio2024: "52,988" },
                { concepto: "Total pasivo no corriente", notas: "", anio2025: "219,113", anio2024: "163,951", isTotal: true },
                { concepto: "Total pasivo", notas: "", anio2025: "576,530", anio2024: "437,555", isTotal: true, isSuperTotal: true },
            ];

            const balancePatrimonio = [
                { concepto: "Capital emitido", notas: "20", anio2025: "89,772", anio2024: "89,772" },
                { concepto: "Prima por emisión de acciones", notas: "", anio2025: "69,721", anio2024: "69,721" },
                { concepto: "Reserva legal", notas: "", anio2025: "3,609", anio2024: "3,609" },
                { concepto: "Excedente de revaluación", notas: "", anio2025: "41,032", anio2024: "41,075" },
                { concepto: "Resultados netos no realizados de instrumentos financieros derivados de cobertura", notas: "15 (e)", anio2025: "(38)", anio2024: "1,298" },
                { concepto: "Resultados acumulados", notas: "", anio2025: "112,993", anio2024: "94,300" },
                { concepto: "Total patrimonio", notas: "", anio2025: "317,089", anio2024: "299,775", isTotal: true },
                { concepto: "Total pasivo y patrimonio", notas: "", anio2025: "893,619", anio2024: "737,330", isTotal: true, isSuperTotal: true },
            ];

            // Estado de Resultados
            const resultadosData = [
                { concepto: "VENTAS", notas: "21", anio2025: "531,479", anio2024: "456,503" },
                { concepto: "COSTO DE VENTAS", notas: "22", anio2025: "(404,104)", anio2024: "(340,490)" },
                { concepto: "COSTO DE DISTRIBUCIÓN", notas: "23", anio2025: "(28,502)", anio2024: "(27,016)" },
                { concepto: "Utilidad bruta", notas: "", anio2025: "98,873", anio2024: "88,997", isTotal: true },
                { isSpacer: true, concepto: "INGRESOS (GASTOS) OPERACIONALES" },
                { concepto: "Gastos administrativos", notas: "24", anio2025: "(14,968)", anio2024: "(13,312)" },
                { concepto: "Otros ingresos", notas: "26", anio2025: "2,521", anio2024: "6,332" },
                { concepto: "Otros gastos", notas: "26", anio2025: "(10,037)", anio2024: "(9,134)" },
                { concepto: "Utilidad operativa", notas: "", anio2025: "76,389", anio2024: "72,883", isTotal: true },
                { isSpacer: true, concepto: "OTROS INGRESOS (GASTOS)" },
                { concepto: "Ingresos financieros", notas: "27", anio2025: "2,639", anio2024: "2,526" },
                { concepto: "Gastos financieros", notas: "27", anio2025: "(27,807)", anio2024: "(27,438)" },
                { concepto: "Ganancia (pérdida) neta por diferencia de cambio", notas: "", anio2025: "1,166", anio2024: "(124)" },
                { concepto: "Utilidad antes del impuesto a la renta", notas: "", anio2025: "52,387", anio2024: "47,847", isTotal: true },
                { concepto: "Impuesto a la renta", notas: "33 (c)", anio2025: "(13,694)", anio2024: "(17,805)" },
                { concepto: "Utilidad neta", notas: "", anio2025: "38,693", anio2024: "30,042", isTotal: true, isSuperTotal: true },
            ];

            // Flujos de Efectivo
            const flujoOperacion = [
                { isSpacer: true, concepto: "FLUJOS DE EFECTIVO DE LAS ACTIVIDADES DE OPERACIÓN" },
                { concepto: "Cobranza por ventas a clientes", notas: "", anio2025: "509,141", anio2024: "461,907" },
                { concepto: "Otros cobros relativos a la actividad", notas: "", anio2025: "5,315", anio2024: "8,566" },
                { isSpacer: true, concepto: "Menos:" },
                { concepto: "Pago a proveedores", notas: "", anio2025: "(324,367)", anio2024: "(334,009)" },
                { concepto: "Pago al personal", notas: "", anio2025: "(44,036)", anio2024: "(42,967)" },
                { concepto: "Pago de otros impuestos", notas: "", anio2025: "(24,356)", anio2024: "(19,692)" },
                { concepto: "Pago de intereses y comisiones bancarias", notas: "", anio2025: "(27,807)", anio2024: "(27,438)" },
                { concepto: "Recupero de Impuesto General a las Ventas (IGV)", notas: "", anio2025: "26,950", anio2024: "41,514" },
                { concepto: "Otros pagos relativos a la actividad", notas: "", anio2025: "(64,793)", anio2024: "(48,375)" },
                { concepto: "EFECTIVO NETO PROVENIENTE DE LAS ACTIVIDADES DE OPERACIÓN", notas: "", anio2025: "56,047", anio2024: "39,506", isTotal: true },
            ];

            const flujoInversion = [
                { isSpacer: true, concepto: "FLUJOS DE EFECTIVO DE LAS ACTIVIDADES DE INVERSIÓN" },
                { concepto: "Compra de inversiones", notas: "5 y 10", anio2025: "(33,822)", anio2024: "-" },
                { concepto: "Compra de inmuebles, embarcaciones, maquinaria y equipo", notas: "5 y 11", anio2025: "(16,897)", anio2024: "(15,403)" },
                { concepto: "Compra de activos intangibles", notas: "12", anio2025: "(342)", anio2024: "(168)" },
                { concepto: "EFECTIVO NETO APLICADO A LAS ACTIVIDADES DE INVERSIÓN", notas: "", anio2025: "(51,061)", anio2024: "(15,571)", isTotal: true },
            ];

            const flujoFinanciamiento = [
                { isSpacer: true, concepto: "FLUJOS DE EFECTIVO DE LAS ACTIVIDADES DE FINANCIAMIENTO" },
                { concepto: "Obtención de préstamos bancarios y obligaciones financieras", notas: "3", anio2025: "434,506", anio2024: "393,609" },
                { concepto: "Pago de préstamos bancarios y obligaciones financieras", notas: "", anio2025: "(434,591)", anio2024: "(397,218)" },
                { concepto: "Pago de pasivos por arrendamientos", notas: "13 (a)", anio2025: "(880)", anio2024: "(2,468)" },
                { concepto: "Pago de préstamos de relacionadas", notas: "", anio2025: "(16)", anio2024: "-" },
                { concepto: "Pago de dividendos", notas: "20 (e)", anio2025: "(20,000)", anio2024: "-" },
                { concepto: "EFECTIVO NETO APLICADO A LAS ACTIVIDADES DE FINANCIAMIENTO", notas: "", anio2025: "(20,981)", anio2024: "(6,077)", isTotal: true },
                { concepto: "(DISMINUCIÓN NETA) AUMENTO NETO DE EFECTIVO Y EQUIVALENTES DE EFECTIVO", notas: "", anio2025: "(15,995)", anio2024: "17,858", isTotal: true },
                { concepto: "EFECTIVO Y EQUIVALENTES DE EFECTIVO AL INICIO DEL AÑO", notas: "", anio2025: "21,548", anio2024: "3,690" },
                { concepto: "EFECTIVO Y EQUIVALENTES DE EFECTIVO AL FINAL DEL AÑO", notas: "6", anio2025: "5,553", anio2024: "21,548", isTotal: true, isSuperTotal: true },
            ];

            const renderTable = (dataRows, title, iconClass, headerColorClass) => (
                <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col mb-8">
                    <div className={`${headerColorClass} p-4 flex items-center justify-between`}>
                        <h4 className="text-white font-bold text-lg flex items-center gap-2 uppercase tracking-wide">
                            <i className={iconClass}></i> {title}
                        </h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-5 py-3 w-1/2">Concepto</th>
                                    <th className="px-3 py-3 text-center">Notas</th>
                                    <th className="px-5 py-3 text-right">2025</th>
                                    <th className="px-5 py-3 text-right">2024</th>
                                    <th className="px-5 py-3 text-right">Var. (%)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {dataRows.map((row, idx) => {
                                    if (row.isSpacer) {
                                        return (
                                            <tr key={idx} className="bg-gray-50">
                                                <td colSpan="5" className="px-5 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                    {row.concepto}
                                                </td>
                                            </tr>
                                        );
                                    }
                                    const varStr = formatVar(row.anio2025, row.anio2024);
                                    const varColor = getColorClass(varStr);
                                    return (
                                        <tr key={idx} className={`hover:bg-blue-50/50 transition-colors ${row.isTotal ? (row.isSuperTotal ? 'bg-blue-50' : 'bg-gray-50/50') : ''}`}>
                                            <td className={`px-5 py-3 text-exalmar-dark ${row.isTotal ? 'font-black uppercase text-xs' : 'font-medium'}`}>{row.concepto}</td>
                                            <td className="px-3 py-3 text-center font-medium text-gray-500 text-xs">{row.notas}</td>
                                            <td className="px-5 py-3 text-right font-medium text-gray-700">{row.anio2025}</td>
                                            <td className="px-5 py-3 text-right font-medium text-gray-700">{row.anio2024}</td>
                                            <td className={`px-5 py-3 text-right font-black ${varColor}`}>
                                                {varStr}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            );

            let tablesToRender = null;
            if (activeSubMenu === 'liquidez-estado-resultado') {
                tablesToRender = renderTable(resultadosData, "Estado de Resultado Integral", "ph ph-chart-line-up text-xl", "bg-exalmar-accent");
            } else if (activeSubMenu === 'liquidez-estado-situacion') {
                tablesToRender = (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
                        <div>
                            {renderTable([...balanceActivoCorriente, ...balanceActivoNoCorriente], "Activo", "ph ph-scales text-xl", "bg-exalmar-blue")}
                        </div>
                        <div>
                            {renderTable([...balancePasivoCorriente, ...balancePasivoNoCorriente, ...balancePatrimonio], "Pasivo y Patrimonio", "ph ph-scales text-xl", "bg-exalmar-blue")}
                        </div>
                    </div>
                );
            } else if (activeSubMenu === 'liquidez-estado-flujo') {
                tablesToRender = renderTable([...flujoOperacion, ...flujoInversion, ...flujoFinanciamiento], "Estado de Flujos de Efectivo", "ph ph-money text-xl", "bg-exalmar-green");
            }

            return (
                <div className="flex flex-col h-full w-full bg-exalmar-light rounded-2xl p-6 shadow-inner overflow-y-auto">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-4">
                        <div>
                            <h3 className="text-3xl font-black text-exalmar-blue tracking-tight uppercase">Situación Inicial de la Empresa</h3>
                            <p className="text-gray-500 mt-1 font-medium">Estados Financieros Completos (Separados) - Expresado en miles de dólares estadounidenses</p>
                        </div>
                    </div>

                    {tablesToRender}
                    
                </div>
            );
        };

        const EvolucionView = () => {
            const ventasData = [
                { year: '2021', value: 397042, label: '397.0M' },
                { year: '2022', value: 441766, label: '441.8M' },
                { year: '2023', value: 254351, label: '254.4M' },
                { year: '2024', value: 456503, label: '456.5M' },
                { year: '2025', value: 531479, label: '531.5M' },
            ];
            
            const utilidadData = [
                { year: '2021', value: 43136, label: '43.1M' },
                { year: '2022', value: 49347, label: '49.3M' },
                { year: '2023', value: -11509, label: '-11.5M' },
                { year: '2024', value: 30042, label: '30.0M' },
                { year: '2025', value: 38693, label: '38.7M' },
            ];

            const deudaData = [
                { year: '2021', value: 1.49, label: '1.49x' },
                { year: '2022', value: 1.35, label: '1.35x' },
                { year: '2023', value: 1.53, label: '1.53x' },
                { year: '2024', value: 1.46, label: '1.46x' },
                { year: '2025', value: 1.82, label: '1.82x' },
            ];

            const renderLineChart = (title, data, strokeColorClass) => {
                try {
                    const minVal = Math.min(0, ...data.map(d => d.value));
                    const maxVal = Math.max(0, ...data.map(d => d.value));
                    
                    // Add 10% padding top and bottom
                    const valueRange = maxVal - minVal || 1;
                    const paddedMax = maxVal + (valueRange * 0.1);
                    const paddedMin = minVal < 0 ? minVal - (valueRange * 0.1) : 0;
                    const range = paddedMax - paddedMin;
                    const zeroLinePct = ((paddedMax - 0) / range) * 100;
                    
                    let strokeColor = "#1e3a8a"; // default exalmar-blue
                    if (strokeColorClass.includes("green")) strokeColor = "#84cc16"; // exalmar-green
                    if (strokeColorClass.includes("orange")) strokeColor = "#f97316"; // orange-500
                    
                    return (
                        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col h-[400px]">
                            <h4 className="text-xl font-bold text-exalmar-blue mb-4 uppercase tracking-wide text-center">{title}</h4>
                            <div className="relative flex-grow w-full mt-4 pb-8">
                                {/* SVG Container */}
                                <div className="absolute inset-0 pb-8">
                                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        {/* Area under the line */}
                                        <polygon 
                                            points={`0,${zeroLinePct} ` + data.map((item, idx) => {
                                                const x = (idx / (data.length - 1)) * 100;
                                                const y = ((paddedMax - item.value) / range) * 100;
                                                return `${x},${y}`;
                                            }).join(" ") + ` 100,${zeroLinePct}`}
                                            fill={strokeColor}
                                            opacity="0.1"
                                        />

                                        {/* Zero Line */}
                                        <line x1="0" y1={zeroLinePct} x2="100" y2={zeroLinePct} stroke="#d1d5db" strokeWidth="2" strokeDasharray="2,2" vectorEffect="non-scaling-stroke" />
                                        
                                        {/* The Line */}
                                        <polyline 
                                            points={data.map((item, idx) => {
                                                const x = (idx / (data.length - 1)) * 100;
                                                const y = ((paddedMax - item.value) / range) * 100;
                                                return `${x},${y}`;
                                            }).join(" ")}
                                            fill="none" 
                                            stroke={strokeColor} 
                                            strokeWidth="4" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            vectorEffect="non-scaling-stroke"
                                        />
                                    </svg>
                                </div>

                                {/* Labels & Points Layer */}
                                <div className="absolute inset-0 pb-8 pointer-events-none">
                                    {data.map((item, idx) => {
                                        const x = (idx / (data.length - 1)) * 100;
                                        const y = ((paddedMax - item.value) / range) * 100;
                                        const isBottomHalf = y > 50;
                                        return (
                                            <div key={idx} className="absolute flex flex-col items-center pointer-events-auto group"
                                                 style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}>
                                                
                                                <div className="w-4 h-4 bg-white border-[3px] rounded-full transition-transform duration-300 group-hover:scale-150 shadow-sm" style={{ borderColor: strokeColor }}></div>
                                                
                                                <div className={`absolute ${isBottomHalf ? 'bottom-full mb-3' : 'top-full mt-3'} text-sm font-black text-gray-700 whitespace-nowrap bg-white border px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-20`}>
                                                    {item.label}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* X-axis Years */}
                                <div className="absolute bottom-0 w-full h-6">
                                    {data.map((item, idx) => {
                                        const x = (idx / (data.length - 1)) * 100;
                                        return (
                                            <div key={idx} className="absolute text-sm font-bold text-gray-500 transform -translate-x-1/2" style={{ left: `${x}%` }}>
                                                {item.year}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                } catch (e) {
                    return <div>Error en chart: {e.message}</div>;
                }
            };

            try {
                return (
                    <div className="flex flex-col h-full w-full bg-exalmar-light rounded-2xl p-6 shadow-inner overflow-y-auto">
                        <div className="mb-8">
                            <h3 className="text-3xl font-black text-exalmar-blue tracking-tight uppercase">Evolución Histórica</h3>
                            <p className="text-gray-500 mt-1 font-medium">Análisis de los últimos 5 periodos (2021 - 2025)</p>
                        </div>
                        
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                            {renderLineChart("Evolución de Ventas", ventasData, "bg-exalmar-blue")}
                            {renderLineChart("Evolución de Utilidad", utilidadData, "bg-exalmar-green")}
                            {renderLineChart("Evolución de Deuda (Apalancamiento)", deudaData, "bg-orange-500")}
                        </div>
                    </div>
                );
            } catch (e) {
                return <div>Error en Evolucion: {e.message}</div>;
            }
        };

        const HeatmapView = ({ activeMenu }) => {
            let title = "";
            let gridData = null;

            if (activeMenu === 'liquidez') {
                title = "Mapa de Calor: Análisis de la fuente de financiamiento";
                gridData = [
                    // Fila 5: Probabilidad Muy Alta
                    [{ l: 'Medio', c: 'bg-yellow-100 text-yellow-800 border-yellow-200' }, { l: 'Medio', c: 'bg-yellow-100 text-yellow-800 border-yellow-200' }, { l: 'Alto', c: 'bg-orange-100 text-orange-800 border-orange-200' }, { l: 'Crítico', c: 'bg-red-100 text-red-800 border-red-200' }, { l: 'Crítico', c: 'bg-red-100 text-red-800 border-red-200' }],
                    // Fila 4: Probabilidad Alta
                    [{ l: 'Bajo', c: 'bg-green-100 text-green-800 border-green-200' }, { l: 'Medio', r: 'R5', c: 'bg-yellow-100 text-yellow-800 border-yellow-200 shadow-md transform scale-[1.02] font-bold ring-2 ring-yellow-400' }, { l: 'Alto', c: 'bg-orange-100 text-orange-800 border-orange-200' }, { l: 'Alto', c: 'bg-orange-100 text-orange-800 border-orange-200' }, { l: 'Crítico', r: 'R1', c: 'bg-red-100 text-red-800 border-red-200 shadow-md transform scale-[1.02] font-bold ring-2 ring-red-400' }],
                    // Fila 3: Probabilidad Media
                    [{ l: 'Bajo', c: 'bg-green-100 text-green-800 border-green-200' }, { l: 'Medio', c: 'bg-yellow-100 text-yellow-800 border-yellow-200' }, { l: 'Medio', r: 'R4', c: 'bg-yellow-100 text-yellow-800 border-yellow-200 shadow-md transform scale-[1.02] font-bold ring-2 ring-yellow-400' }, { l: 'Alto', r: 'R2', c: 'bg-orange-100 text-orange-800 border-orange-200 shadow-md transform scale-[1.02] font-bold ring-2 ring-orange-400' }, { l: 'Crítico', c: 'bg-red-100 text-red-800 border-red-200' }],
                    // Fila 2: Probabilidad Baja
                    [{ l: 'Bajo', c: 'bg-green-100 text-green-800 border-green-200' }, { l: 'Bajo', c: 'bg-green-100 text-green-800 border-green-200' }, { l: 'Medio', c: 'bg-yellow-100 text-yellow-800 border-yellow-200' }, { l: 'Medio', r: 'R3', c: 'bg-yellow-100 text-yellow-800 border-yellow-200 shadow-md transform scale-[1.02] font-bold ring-2 ring-yellow-400' }, { l: 'Alto', c: 'bg-orange-100 text-orange-800 border-orange-200' }],
                    // Fila 1: Probabilidad Muy Baja
                    [{ l: 'Bajo', c: 'bg-green-100 text-green-800 border-green-200' }, { l: 'Bajo', c: 'bg-green-100 text-green-800 border-green-200' }, { l: 'Bajo', c: 'bg-green-100 text-green-800 border-green-200' }, { l: 'Medio', c: 'bg-yellow-100 text-yellow-800 border-yellow-200' }, { l: 'Medio', c: 'bg-yellow-100 text-yellow-800 border-yellow-200' }]
                ];
            } else if (activeMenu === 'crediticio') {
                title = "Mapa de Calor: Estrategia de Financiamiento";
                gridData = [
                    // Fila 5: Probabilidad Muy Alta
                    [{ l: 'Bajo', c: 'bg-green-100 text-green-800 border-green-200' }, { l: 'Bajo', c: 'bg-green-100 text-green-800 border-green-200' }, { l: 'Medio', c: 'bg-yellow-100 text-yellow-800 border-yellow-200' }, { l: 'Alto', c: 'bg-orange-100 text-orange-800 border-orange-200' }, { l: 'Crítico', c: 'bg-red-100 text-red-800 border-red-200' }],
                    // Fila 4: Probabilidad Alta
                    [{ l: 'Bajo', c: 'bg-green-100 text-green-800 border-green-200' }, { l: 'Bajo', c: 'bg-green-100 text-green-800 border-green-200' }, { l: 'Alto', r: 'R2', c: 'bg-orange-100 text-orange-800 border-orange-200 shadow-md transform scale-[1.02] font-bold ring-2 ring-orange-400' }, { l: 'Alto', c: 'bg-orange-100 text-orange-800 border-orange-200' }, { l: 'Crítico', c: 'bg-red-100 text-red-800 border-red-200' }],
                    // Fila 3: Probabilidad Media
                    [{ l: 'Bajo', c: 'bg-green-100 text-green-800 border-green-200' }, { l: 'Bajo', r: 'R5', c: 'bg-green-100 text-green-800 border-green-200 shadow-md transform scale-[1.02] font-bold ring-2 ring-green-400' }, { l: 'Medio', c: 'bg-yellow-100 text-yellow-800 border-yellow-200' }, { l: 'Alto', r: 'R3', c: 'bg-orange-100 text-orange-800 border-orange-200 shadow-md transform scale-[1.02] font-bold ring-2 ring-orange-400' }, { l: 'Alto', c: 'bg-orange-100 text-orange-800 border-orange-200' }],
                    // Fila 2: Probabilidad Baja
                    [{ l: 'Bajo', c: 'bg-green-100 text-green-800 border-green-200' }, { l: 'Bajo', c: 'bg-green-100 text-green-800 border-green-200' }, { l: 'Bajo', c: 'bg-green-100 text-green-800 border-green-200' }, { l: 'Medio', c: 'bg-yellow-100 text-yellow-800 border-yellow-200' }, { l: 'Alto', r: 'R1', c: 'bg-orange-100 text-orange-800 border-orange-200 shadow-md transform scale-[1.02] font-bold ring-2 ring-orange-400' }],
                    // Fila 1: Probabilidad Muy Baja
                    [{ l: 'Bajo', c: 'bg-green-100 text-green-800 border-green-200' }, { l: 'Bajo', c: 'bg-green-100 text-green-800 border-green-200' }, { l: 'Bajo', c: 'bg-green-100 text-green-800 border-green-200' }, { l: 'Bajo', c: 'bg-green-100 text-green-800 border-green-200' }, { l: 'Medio', r: 'R4', c: 'bg-yellow-100 text-yellow-800 border-yellow-200 shadow-md transform scale-[1.02] font-bold ring-2 ring-yellow-400' }]
                ];
            }

            if (gridData) {
                const yLabels = ['Muy alta', 'Alta', 'Media', 'Baja', 'Muy baja'];
                const xLabels = ['Muy bajo', 'Bajo', 'Medio', 'Alto', 'Muy alto'];

                return (
                    <div className="flex flex-col h-full w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="bg-exalmar-light p-6 border-b border-gray-200 flex items-center gap-4 flex-shrink-0">
                            <div className="bg-exalmar-blue p-3 rounded-xl shadow-md">
                                <i className="ph ph-grid-four text-white text-2xl"></i>
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-exalmar-dark uppercase tracking-tight">{title}</h2>
                            </div>
                        </div>
                        
                        <div className="flex-grow flex items-center justify-center p-8 bg-gray-50 overflow-auto">
                            <div className="flex flex-col items-center w-full max-w-4xl bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                                <div className="flex w-full">
                                    {/* Contenedor Izquierdo (Eje Y) */}
                                    <div className="flex mr-4 shrink-0">
                                        <div className="bg-gray-800 text-white rounded-full flex items-center justify-center w-10 mr-4 py-8 shadow-md">
                                            <span className="transform -rotate-90 whitespace-nowrap font-black tracking-widest text-lg">Probabilidad</span>
                                        </div>
                                        <div className="flex flex-col justify-around text-right text-gray-800 font-bold italic mr-4 w-28">
                                            {yLabels.map((lbl, idx) => (
                                                <div key={idx} className="flex-1 flex items-center justify-end">{lbl}</div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Contenedor Derecho (Celdas y Eje X) */}
                                    <div className="flex flex-col flex-grow">
                                        {/* Celdas del Mapa de Calor */}
                                        <div className="grid grid-cols-5 grid-rows-5 gap-1 w-full flex-grow">
                                            {gridData.map((row, rowIdx) => (
                                                <React.Fragment key={rowIdx}>
                                                    {row.map((cell, cellIdx) => (
                                                        <div key={cellIdx} className={`relative flex flex-col items-center justify-center p-4 min-h-[80px] rounded-sm transition-all ${cell.c}`}>
                                                            <span className={`text-sm ${cell.r ? 'font-black' : 'font-medium'}`}>{cell.l}</span>
                                                            {cell.r && (
                                                                <span className="mt-2 bg-gray-800 text-white rounded-full w-7 h-7 flex items-center justify-center font-black shadow-md text-sm">
                                                                    {cell.r.replace('R', '')}
                                                                </span>
                                                            )}
                                                        </div>
                                                    ))}
                                                </React.Fragment>
                                            ))}
                                        </div>

                                        {/* Cabeceras Eje X (Impacto) */}
                                        <div className="grid grid-cols-5 gap-1 w-full mt-4">
                                            {xLabels.map((lbl, idx) => (
                                                <div key={idx} className="text-center font-bold italic text-gray-800 flex items-center justify-center text-sm">
                                                    {lbl}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Cápsula Impacto */}
                                        <div className="bg-gray-800 text-white rounded-full flex items-center justify-center py-2 mt-4 font-black tracking-widest text-lg shadow-md">
                                            Impacto
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }

            return (
                <div className="flex flex-col items-center justify-center h-full w-full bg-white rounded-2xl shadow-xl p-8">
                    <div className="bg-exalmar-light p-6 rounded-full mb-6">
                        <i className="ph ph-grid-four text-exalmar-blue text-6xl"></i>
                    </div>
                    <h2 className="text-3xl font-black text-exalmar-dark mb-4">Mapa de Calor</h2>
                    <p className="text-gray-500 text-lg max-w-md text-center">Datos del mapa pendientes de actualización para este factor de riesgo.</p>
                </div>
            );
        };

        const MatrixView = ({ activeMenu }) => {
            let matrixData = null;
            let title = "";

            if (activeMenu === 'liquidez') {
                matrixData = liquidezMatrixData;
                title = "Matriz de Análisis de la fuente de financiamiento";
            } else if (activeMenu === 'crediticio') {
                matrixData = crediticioMatrixData;
                title = "Matriz de Estrategia de Financiamiento";
            }

            if (matrixData) {
                return (
                    <div className="flex flex-col h-full w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="bg-exalmar-light p-6 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="bg-exalmar-blue p-3 rounded-xl shadow-md">
                                    <i className="ph ph-table text-white text-2xl"></i>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-exalmar-dark uppercase tracking-tight">{title}</h2>
                                    <p className="text-gray-500 text-sm mt-1">Análisis detallado de eventos, impactos y controles.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex-grow overflow-auto p-6 bg-gray-50">
                            <div className="min-w-[1000px] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <table className="w-full text-left text-sm text-gray-700">
                                    <thead className="bg-exalmar-blue text-white uppercase text-xs font-bold tracking-wider sticky top-0 shadow-sm">
                                        <tr>
                                            <th className="px-6 py-4 w-[18%]">Riesgo Específico</th>
                                            <th className="px-6 py-4 w-[22%]">Causas Principales</th>
                                            <th className="px-6 py-4 w-[10%] text-center">Probabilidad</th>
                                            <th className="px-6 py-4 w-[10%] text-center">Impacto (Financiero)</th>
                                            <th className="px-6 py-4 w-[12%] text-center">Nivel de Riesgo</th>
                                            <th className="px-6 py-4 w-[28%]">Acciones de Mitigación (Controles)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {matrixData.map((item, index) => (
                                            <tr key={index} className="hover:bg-blue-50/50 transition-colors">
                                                <td className="px-6 py-4 font-bold text-exalmar-dark align-top">{item.riesgo}</td>
                                                <td className="px-6 py-4 align-top leading-relaxed">{item.causas}</td>
                                                <td className="px-6 py-4 text-center align-top font-medium">{item.probabilidad}</td>
                                                <td className="px-6 py-4 text-center align-top font-medium">{item.impacto}</td>
                                                <td className="px-6 py-4 text-center align-top">
                                                    <span className={`px-3 py-1.5 rounded-md text-xs font-bold shadow-sm ${getRiskBadgeStyle(item.nivel)}`}>
                                                        {item.nivel}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 align-top leading-relaxed text-gray-600">{item.mitigacion}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );
            }

            return (
                <div className="flex flex-col items-center justify-center h-full w-full bg-white rounded-2xl shadow-xl p-8">
                    <div className="bg-exalmar-light p-6 rounded-full mb-6">
                        <i className="ph ph-table text-exalmar-blue text-6xl"></i>
                    </div>
                    <h2 className="text-3xl font-black text-exalmar-dark mb-4">Matriz de Riesgo</h2>
                    <p className="text-gray-500 text-lg max-w-md text-center">Datos de la matriz pendientes de actualización para este factor de riesgo.</p>
                </div>
            );
        };

        const ConclusionesView = () => {
            const conclusiones = [
                {
                    icon: "ph-chart-line-down",
                    title: "Rentabilidad Positiva pero con Márgenes en Compresión",
                    text: "En 2025 Exalmar obtuvo ingresos por S/ 531.5 MM y utilidad neta de S/ 38.7 MM (ROE 12.2%). No obstante, el margen bruto se redujo de 30.5% (2021) a 24.0% (2025), reflejando la presión de costos y la volatilidad de precios y biomasa.",
                    color: "border-blue-500",
                    iconColor: "text-blue-600",
                    bgIcon: "bg-blue-100"
                },
                {
                    icon: "ph-drop",
                    title: "Posición de Liquidez Ajustada",
                    text: "La liquidez corriente es 0.82 (menor a 1) y el capital de trabajo es NEGATIVO (S/ -64.3 MM) en 2025, lo que indica que la operación se financia con pasivos de corto plazo y enfrenta riesgo de calce.",
                    color: "border-orange-500",
                    iconColor: "text-orange-600",
                    bgIcon: "bg-orange-100"
                },
                {
                    icon: "ph-warning-octagon",
                    title: "Alto Apalancamiento Financiero",
                    text: "El ratio de apalancamiento alcanzó 1.82x; la deuda financiera (~S/ 383 MM) supera al patrimonio (S/ 317 MM) y los gastos financieros (S/ 27.8 MM) absorben ~36% de la utilidad operativa, limitando la flexibilidad financiera.",
                    color: "border-red-500",
                    iconColor: "text-red-600",
                    bgIcon: "bg-red-100"
                },
                {
                    icon: "ph-rocket-launch",
                    title: "El Proyecto de Modernización Crea Valor",
                    text: "Con una inversión de S/ 39.8 MM arroja un VAN de +S/ 12.2 MM, una TIR de 18.9% (muy superior al WACC de 8.7%) y recupera la inversión en 3.4 años; la sensibilidad muestra VAN positivo en todo el rango de WACC evaluado.",
                    color: "border-green-500",
                    iconColor: "text-green-600",
                    bgIcon: "bg-green-100"
                },
                {
                    icon: "ph-puzzle-piece",
                    title: "Estructura de Financiamiento Mixta Eficiente",
                    text: "Combinar el mercado monetario (capital de trabajo) con el mercado de capitales (bonos + leasing + aporte) logra un costo promedio ponderado después de impuestos de 7.4%, por debajo del WACC del proyecto y respetando el calce de plazos.",
                    color: "border-purple-500",
                    iconColor: "text-purple-600",
                    bgIcon: "bg-purple-100"
                }
            ];

            return (
                <div className="w-full h-full bg-white rounded-2xl p-8 md:p-12 relative overflow-y-auto shadow-xl">
                    <div className="flex items-center gap-5 mb-10">
                        <div className="bg-exalmar-blue p-4 rounded-2xl shadow-lg">
                            <i className="ph ph-flag-checkered text-white text-3xl"></i>
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black text-exalmar-dark tracking-tight">Conclusiones Clave</h1>
                            <p className="text-gray-500 mt-2 text-lg">Resumen estratégico del perfil de riesgos de Pesquera Exalmar</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {conclusiones.map((item, index) => (
                            <div key={index} className={`bg-gray-50/50 rounded-2xl p-8 border-l-[6px] ${item.color} shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group`}>
                                {/* Marca de agua de fondo */}
                                <div className="absolute -right-8 -top-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110">
                                    <i className={`ph ${item.icon} text-[12rem]`}></i>
                                </div>
                                
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex items-center gap-4 mb-5">
                                        <div className={`p-3 rounded-xl flex-shrink-0 ${item.bgIcon} ${item.iconColor} shadow-sm`}>
                                            <i className={`ph ${item.icon} text-3xl`}></i>
                                        </div>
                                        <h3 className="text-xl font-bold text-exalmar-dark leading-tight">
                                            <span className={`text-sm font-black mr-2 px-2 py-1 rounded bg-white shadow-sm ${item.iconColor}`}>0{index + 1}</span>
                                            <br className="md:hidden" />
                                            {item.title}
                                        </h3>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed flex-grow text-justify">
                                        {item.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        };

        const RecomendacionesView = () => {
            const recomendaciones = [
                {
                    icon: "ph-wallet",
                    title: "Fortalecer el Capital de Trabajo y Liquidez",
                    text: "Financiar el capital de trabajo del proyecto con el mercado monetario (línea revolvente / papeles comerciales) y optimizar el ciclo de conversión de efectivo —reducir los ~105 días de inventario y renegociar plazos con clientes y proveedores— para llevar la liquidez corriente por encima de 1.0.",
                    color: "border-orange-500",
                    iconColor: "text-orange-600",
                    bgIcon: "bg-orange-100"
                },
                {
                    icon: "ph-bank",
                    title: "Reperfilar y Ordenar la Deuda",
                    text: "Migrar deuda de corto a largo plazo mediante la emisión de bonos corporativos, reduciendo la presión de refinanciación y el gasto financiero; fijar un apalancamiento objetivo y cuidar los covenants para preservar la solvencia.",
                    color: "border-red-500",
                    iconColor: "text-red-600",
                    bgIcon: "bg-red-100"
                },
                {
                    icon: "ph-factory",
                    title: "Ejecutar la Modernización a Harina Prime (Steam Dried)",
                    text: "Elevar el mix hacia harina de mayor precio de exportación, mejorar el rendimiento de aceite y reducir el costo energético, para revertir la compresión de márgenes y aumentar el margen bruto.",
                    color: "border-blue-500",
                    iconColor: "text-blue-600",
                    bgIcon: "bg-blue-100"
                },
                {
                    icon: "ph-chart-line-up",
                    title: "Aprobar la Inversión y Gestionar sus Riesgos",
                    text: "Dado que VAN>0 y TIR>WACC, ejecutar el proyecto de S/ 39.8 MM; monitorear los supuestos críticos (premium de precio prime, volumen y tipo de cambio) mediante análisis de sensibilidad y escenarios.",
                    color: "border-green-500",
                    iconColor: "text-green-600",
                    bgIcon: "bg-green-100"
                },
                {
                    icon: "ph-scales",
                    title: "Adoptar la Estructura Mixta y Buscar Mejores Tasas",
                    text: "Implementar el esquema monetario + capitales (capital de trabajo, bonos, leasing y aporte propio) y gestionar una clasificación de riesgo que permita acceder a menores tasas de emisión, optimizando el costo de capital.",
                    color: "border-purple-500",
                    iconColor: "text-purple-600",
                    bgIcon: "bg-purple-100"
                }
            ];

            return (
                <div className="w-full h-full bg-white rounded-2xl p-8 md:p-12 relative overflow-y-auto shadow-xl">
                    <div className="flex items-center gap-5 mb-10">
                        <div className="bg-exalmar-blue p-4 rounded-2xl shadow-lg">
                            <i className="ph ph-lightbulb text-white text-3xl"></i>
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black text-exalmar-dark tracking-tight">Recomendaciones Estratégicas</h1>
                            <p className="text-gray-500 mt-2 text-lg">Planes de acción sugeridos para la mitigación integral de riesgos</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {recomendaciones.map((item, index) => (
                            <div key={index} className={`bg-gray-50/50 rounded-2xl p-8 border-l-[6px] ${item.color} shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group`}>
                                <div className="absolute -right-8 -top-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110">
                                    <i className={`ph ${item.icon} text-[12rem]`}></i>
                                </div>
                                
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex items-center gap-4 mb-5">
                                        <div className={`p-3 rounded-xl flex-shrink-0 ${item.bgIcon} ${item.iconColor} shadow-sm`}>
                                            <i className={`ph ${item.icon} text-3xl`}></i>
                                        </div>
                                        <h3 className="text-xl font-bold text-exalmar-dark leading-tight">
                                            <span className={`text-sm font-black mr-2 px-2 py-1 rounded bg-white shadow-sm ${item.iconColor}`}>0{index + 1}</span>
                                            <br className="md:hidden" />
                                            {item.title}
                                        </h3>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed flex-grow text-justify">
                                        {item.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        };

        const App = () => {
            const [showDashboard, setShowDashboard] = useState(false);
            const [activeMenu, setActiveMenu] = useState('info'); 
            const [activeSubMenu, setActiveSubMenu] = useState('info-datos'); 
            const [expandedMenu, setExpandedMenu] = useState('info'); 

            const handleMenuClick = (item) => {
                if (item.type === 'expandable') {
                    setExpandedMenu(expandedMenu === item.id ? null : item.id);
                } else {
                    setActiveMenu(item.id);
                    setActiveSubMenu(null);
                    setExpandedMenu(null);
                }
            };

            const handleSubMenuClick = (subId, parentId) => {
                setActiveSubMenu(subId);
                setActiveMenu(parentId);
            };




            const renderContent = () => {
                // Navegación de Información General
                if (activeSubMenu === 'info-datos') return <DatosEmpresaView />;
                if (activeSubMenu === 'info-mision') return <MisionVisionView />;
                if (activeSubMenu === 'info-financieros') return <FinancialStatementsView />;
                if (activeSubMenu && activeSubMenu.startsWith('liquidez-estado-')) return <SituacionInicialView activeSubMenu={activeSubMenu} />;
                if (activeSubMenu === 'liquidez-evolucion') return <EvolucionView />;
                if (activeSubMenu === 'liquidez-mercado-monetario') return <MercadoMonetarioView onNavigate={handleSubMenuClick} />;
                if (activeSubMenu === 'liquidez-simulador-tasas') return <SimuladorTasasView />;
                if (activeSubMenu === 'liquidez-mercado-capitales') return <MercadoCapitalesView />;
                if (activeSubMenu === 'liquidez-simulador-bonos') return <SimuladorBonosView />;
                if (activeSubMenu === 'liquidez-simulador-acciones') return <SimuladorAccionesView />;
                if (activeSubMenu === 'liquidez-escenarios') return <EscenariosView />;
                if (activeSubMenu === 'liquidez-estrategia') return <EstrategiaFinanciamientoView />;
                if (activeSubMenu === 'liquidez-wacc') return <WaccView />;
                if (activeSubMenu === 'proyecto-steam') return <ProyectoInversionView />;

                // Matrices y Mapas dinámicos
                if (activeSubMenu && activeSubMenu.includes('matriz')) return <MatrixView activeMenu={activeMenu} />;
                if (activeSubMenu && activeSubMenu.includes('mapa')) return <HeatmapView activeMenu={activeMenu} />;

                // Conclusiones y Recomendaciones
                if (activeMenu === 'conclusiones') return <ConclusionesView />;
                if (activeMenu === 'recomendaciones') return <RecomendacionesView />;

                // Vistas generales
                if (expandedMenu && !activeSubMenu) {
                    const item = menuData.find(m => m.id === expandedMenu);
                    return (
                        <div className="flex flex-col items-center justify-center h-full text-center bg-white rounded-2xl shadow-xl p-8">
                            <h2 className="text-3xl font-bold text-exalmar-dark mb-4">Sección: {item.title}</h2>
                            <p className="text-lg text-gray-500 max-w-lg">
                                Por favor, seleccione una opción del submenú lateral para visualizar el detalle (Matriz o Mapa de calor).
                            </p>
                        </div>
                    );
                }

                // Vistas simples (Conclusiones, Recomendaciones)
                const currentItem = menuData.find(m => m.id === activeMenu);
                return (
                    <div className="flex items-center justify-center h-full bg-white rounded-2xl shadow-xl p-8">
                        <h2 className="text-4xl font-black text-exalmar-blue">{currentItem ? currentItem.title : 'Seleccione una opción'}</h2>
                    </div>
                );
            };

            if (!showDashboard) {
                return <CoverPage onEnter={() => setShowDashboard(true)} />;
            }

            return (
                <SimulationProvider>
                    <div className="flex w-full h-screen bg-gray-100 p-4 md:p-6 overflow-hidden animate-fade-in-up">
                        
                        {/* Sidebar */}
                    <div className="w-80 flex flex-col gap-3 mr-6 flex-shrink-0 bg-exalmar-blue rounded-2xl shadow-xl overflow-hidden flex flex-col">
                        <div className="p-6 bg-exalmar-dark border-b border-white/10 flex items-center justify-center">
                            <i className="ph ph-boat text-white text-3xl mr-3"></i>
                            <h2 className="text-white text-xl font-black tracking-widest">EXALMAR</h2>
                        </div>

                        <div className="overflow-y-auto flex-grow p-4 space-y-2">
                            {menuData.map((item) => (
                                <div key={item.id} className="flex flex-col">
                                    <button 
                                        onClick={() => handleMenuClick(item)}
                                        className={`
                                            w-full text-left px-5 py-4 rounded-xl font-bold text-sm uppercase tracking-wide transition-all flex items-center justify-between
                                            ${(expandedMenu === item.id || (!expandedMenu && activeMenu === item.id)) 
                                                ? 'bg-white text-exalmar-blue shadow-md' 
                                                : 'text-white/80 hover:bg-white/10 hover:text-white'}
                                        `}
                                    >
                                        <span>{item.title}</span>
                                        {item.type === 'expandable' && (
                                            <i className={`ph ph-caret-down transition-transform duration-300 ${expandedMenu === item.id ? 'rotate-180' : ''}`}></i>
                                        )}
                                    </button>
                                    
                                    {/* Submenú */}
                                    {item.type === 'expandable' && expandedMenu === item.id && (
                                        <div className="flex flex-col gap-1 pl-4 mt-2 mb-2 relative">
                                            <div className="absolute left-[26px] top-0 bottom-4 w-[2px] bg-white/20 rounded-full"></div>
                                            {item.subItems.map(sub => (
                                                <button 
                                                    key={sub.id}
                                                    onClick={() => handleSubMenuClick(sub.id, item.id)}
                                                    className={`
                                                        w-full text-left pl-10 pr-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-3 relative
                                                        ${activeSubMenu === sub.id 
                                                            ? 'bg-exalmar-accent text-white shadow' 
                                                            : 'text-white/70 hover:text-white hover:bg-white/5'}
                                                    `}
                                                >
                                                    {activeSubMenu === sub.id && (
                                                        <div className="absolute left-[8px] w-2 h-2 bg-white rounded-full shadow-[0_0_8px_white]"></div>
                                                    )}
                                                    
                                                    {sub.id.includes('datos') ? <i className="ph ph-buildings text-lg"></i>
                                                    : sub.id.includes('mision') ? <i className="ph ph-target text-lg"></i>
                                                    : sub.id.includes('financieros') ? <i className="ph ph-chart-line-up text-lg"></i>
                                                    : sub.id.includes('matriz') ? <i className="ph ph-table text-lg"></i> 
                                                    : sub.id.includes('mapa') ? <i className="ph ph-grid-four text-lg"></i>
                                                    : <i className="ph ph-file-text text-lg"></i>}
                                                    {sub.title}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-grow h-full relative">
                        {renderContent()}
                    </div>
                </div>
                </SimulationProvider>
            );
        };


export default App;
