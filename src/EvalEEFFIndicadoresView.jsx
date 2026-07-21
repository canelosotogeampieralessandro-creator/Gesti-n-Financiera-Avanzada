import React, { useState } from 'react';

export const EvalEEFFIndicadoresView = () => {
  const [activeCategory, setActiveCategory] = useState('liquidez');

  const categories = [
    { id: 'liquidez', name: 'Liquidez', icon: 'ph-drop', color: 'blue' },
    { id: 'solvencia', name: 'Solvencia', icon: 'ph-scales', color: 'rose' },
    { id: 'gestion', name: 'Gestión', icon: 'ph-gear', color: 'emerald' },
    { id: 'rentabilidad', name: 'Rentabilidad', icon: 'ph-trend-up', color: 'amber' },
  ];

  const data = {
    liquidez: [
      { name: 'Liquidez Corriente', format: 'number', values: { 2026: 1.08, 2027: 1.35, 2028: 1.63, 2029: 1.91, 2030: 2.20, 2031: 2.49 } },
      { name: 'Prueba Ácida', format: 'number', values: { 2026: 0.81, 2027: 1.06, 2028: 1.33, 2029: 1.60, 2030: 1.88, 2031: 2.16 } },
      { name: 'Liquidez Absoluta', format: 'number', values: { 2026: 0.64, 2027: 0.88, 2028: 1.14, 2029: 1.41, 2030: 1.68, 2031: 1.95 } },
      { name: 'Capital de Trabajo', format: 'currency', values: { 2026: 24509, 2027: 107134, 2028: 195208, 2029: 289208, 2030: 389500, 2031: 496473 } },
    ],
    solvencia: [
      { name: 'Apalancamiento Financiero', format: 'number', values: { 2026: 1.38, 2027: 1.19, 2028: 1.05, 2029: 0.94, 2030: 0.84, 2031: 0.75 } },
      { name: 'Solvencia Patrimonial I', format: 'number', values: { 2026: 0.59, 2027: 0.51, 2028: 0.44, 2029: 0.39, 2030: 0.34, 2031: 0.31 } },
      { name: 'Solvencia Patrimonial II', format: 'number', values: { 2026: 0.79, 2027: 0.68, 2028: 0.61, 2029: 0.54, 2030: 0.49, 2031: 0.45 } },
    ],
    gestion: [
      { name: 'Stock Medio de Inventarios', format: 'currency', values: { 2026: 92725, 2027: 86123, 2028: 91290, 2029: 96768, 2030: 102574, 2031: 108728 } },
      { name: 'Rotación de Inventarios (veces)', format: 'number', values: { 2026: 3.86, 2027: 4.41, 2028: 4.41, 2029: 4.41, 2030: 4.41, 2031: 4.41 } },
      { name: 'Rotación de Inventarios (días)', format: 'number', values: { 2026: 93.2, 2027: 81.6, 2028: 81.6, 2029: 81.6, 2030: 81.6, 2031: 81.6 } },
      { name: 'Rotación de Cuentas por Cobrar (veces)', format: 'number', values: { 2026: 10.00, 2027: 10.00, 2028: 10.00, 2029: 10.00, 2030: 10.00, 2031: 10.00 } },
      { name: 'Rotación de Cuentas por Cobrar (días)', format: 'number', values: { 2026: 36.0, 2027: 36.0, 2028: 36.0, 2029: 36.0, 2030: 36.0, 2031: 36.0 } },
      { name: 'Rotación de Cuentas por Pagar (veces)', format: 'number', values: { 2026: 6.74, 2027: 6.74, 2028: 6.74, 2029: 6.74, 2030: 6.74, 2031: 6.74 } },
      { name: 'Rotación de Cuentas por Pagar (días)', format: 'number', values: { 2026: 53.4, 2027: 53.4, 2028: 53.4, 2029: 53.4, 2030: 53.4, 2031: 53.4 } },
      { name: 'Rotación de Capital de Trabajo (veces)', format: 'number', values: { 2026: 20.61, 2027: 5.00, 2028: 2.91, 2029: 2.08, 2030: 1.64, 2031: 1.36 } },
      { name: 'Rotación de Capital de Trabajo (días)', format: 'number', values: { 2026: 17.5, 2027: 72.0, 2028: 123.8, 2029: 173.0, 2030: 219.8, 2031: 264.4 } },
      { name: 'Rotación de Activos (veces)', format: 'number', values: { 2026: 0.55, 2027: 0.55, 2028: 0.54, 2029: 0.53, 2030: 0.53, 2031: 0.52 } },
      { name: 'Rotación de Activos (días)', format: 'number', values: { 2026: 653.6, 2027: 656.2, 2028: 664.5, 2029: 673.6, 2030: 683.4, 2031: 693.7 } },
      { name: 'Rotación de Patrimonio', format: 'number', values: { 2026: 1.31, 2027: 1.20, 2028: 1.11, 2029: 1.03, 2030: 0.97, 2031: 0.91 } },
    ],
    rentabilidad: [
      { name: 'Margen de Utilidad Bruta', format: 'percentage', values: { 2026: 0.291, 2027: 0.291, 2028: 0.291, 2029: 0.291, 2030: 0.291, 2031: 0.291 } },
      { name: 'Margen de Utilidad Neta', format: 'percentage', values: { 2026: 0.132, 2027: 0.112, 2028: 0.115, 2029: 0.118, 2030: 0.121, 2031: 0.124 } },
      { name: 'Rentabilidad Patrimonial (ROE)', format: 'percentage', values: { 2026: 0.173, 2027: 0.134, 2028: 0.128, 2029: 0.122, 2030: 0.117, 2031: 0.113 } },
      { name: 'Rentabilidad del Activo (ROA)', format: 'percentage', values: { 2026: 0.073, 2027: 0.061, 2028: 0.062, 2029: 0.063, 2030: 0.064, 2031: 0.065 } },
    ]
  };

  const formatValue = (val, format) => {
    if (format === 'percentage') return (val * 100).toFixed(1) + '%';
    if (format === 'currency') return new Intl.NumberFormat('en-US').format(val);
    return val.toFixed(2);
  };

  const getColorClasses = (color) => {
    const classes = {
        blue: { bg: 'bg-blue-600', text: 'text-blue-600', border: 'border-blue-200', lightBg: 'bg-blue-50', hover: 'hover:bg-blue-50' },
        rose: { bg: 'bg-rose-600', text: 'text-rose-600', border: 'border-rose-200', lightBg: 'bg-rose-50', hover: 'hover:bg-rose-50' },
        emerald: { bg: 'bg-emerald-600', text: 'text-emerald-600', border: 'border-emerald-200', lightBg: 'bg-emerald-50', hover: 'hover:bg-emerald-50' },
        amber: { bg: 'bg-amber-500', text: 'text-amber-600', border: 'border-amber-200', lightBg: 'bg-amber-50', hover: 'hover:bg-amber-50' }
    };
    return classes[color];
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-50/50 rounded-2xl p-4 md:p-8">
      
      {/* HEADER FIJO */}
      <div className="mb-6 flex flex-col justify-between items-start gap-2 shrink-0">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Evaluación de EEFF e Indicadores</h1>
        <p className="text-gray-500 font-medium">Análisis de Ratios Financieros a Corto Plazo (2026) y Largo Plazo (2027-2031).</p>
      </div>

      {/* TABS FIJAS */}
      <div className="flex gap-3 mb-6 w-full overflow-x-auto shrink-0 pb-2">
        {categories.map(cat => {
            const isActive = activeCategory === cat.id;
            const colorCls = getColorClasses(cat.color);
            return (
                <button 
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`
                        flex flex-col items-center justify-center p-4 rounded-2xl min-w-[140px] flex-1 transition-all border-2
                        ${isActive ? `${colorCls.bg} text-white border-transparent shadow-lg scale-105` : `bg-white ${colorCls.border} text-gray-500 hover:bg-gray-50`}
                    `}
                >
                    <i className={`${cat.icon} text-3xl mb-2`}></i>
                    <span className="font-bold text-sm tracking-wide">{cat.name}</span>
                </button>
            )
        })}
      </div>

      {/* CONTENIDO SCROLLABLE */}
      <div className="flex-1 overflow-y-auto pb-4 pr-2 space-y-6">
        
        {categories.map(cat => {
            if (activeCategory !== cat.id) return null;
            const colorCls = getColorClasses(cat.color);
            const items = data[cat.id];
            const years = [2026, 2027, 2028, 2029, 2030, 2031];

            return (
                <div key={cat.id} className="animate-fade-in-up bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className={`${colorCls.bg} p-4 px-6`}>
                        <h3 className="text-white font-bold text-lg flex items-center uppercase tracking-wider">
                            <i className={`${cat.icon} text-2xl mr-3 opacity-80`}></i>
                            Indicadores de {cat.name}
                        </h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-right">
                        <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                            <tr>
                                <th className="px-5 py-4 text-left uppercase tracking-wider text-xs">Concepto</th>
                                {years.map(y => <th key={y} className={`px-5 py-4 font-black ${y===2026?colorCls.text:''}`}>{y}</th>)}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {items.map((item, idx) => (
                                <tr key={idx} className={`transition-colors ${colorCls.hover}`}>
                                    <td className="px-5 py-4 text-left font-medium text-gray-800">{item.name}</td>
                                    {years.map(y => (
                                        <td key={y} className={`px-5 py-4 font-bold ${y===2026 ? `${colorCls.lightBg} ${colorCls.text}` : 'text-gray-600'}`}>
                                            {formatValue(item.values[y], item.format)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                </div>
            )
        })}

        {/* Resumen Analítico Generado */}
        <div className="bg-gradient-to-br from-[#0B1B3D] to-blue-900 rounded-2xl p-8 shadow-xl mt-8 animate-fade-in-up text-white border border-blue-800">
            <h3 className="text-xl font-black mb-4 flex items-center">
                <i className="ph-brain text-blue-300 mr-2 text-2xl"></i> 
                Insights del Análisis {activeCategory === 'liquidez' && 'de Liquidez'}{activeCategory === 'solvencia' && 'de Solvencia'}{activeCategory === 'gestion' && 'de Gestión'}{activeCategory === 'rentabilidad' && 'de Rentabilidad'}
            </h3>
            
            {activeCategory === 'liquidez' && (
                <p className="text-blue-100 leading-relaxed">
                    La empresa muestra una <strong className="text-white">mejora continua en su liquidez corriente</strong>, pasando de 1.08 en 2026 a un muy saludable 2.49 en 2031. El <strong>Capital de Trabajo</strong> experimenta un crecimiento explosivo, multiplicándose casi por 20 a lo largo del horizonte proyectado, lo que garantiza una holgada capacidad para cubrir obligaciones de corto plazo sin depender de nuevo financiamiento externo.
                </p>
            )}
            {activeCategory === 'solvencia' && (
                <p className="text-blue-100 leading-relaxed">
                    Se observa un claro proceso de <strong className="text-white">desapalancamiento sostenido</strong>. El apalancamiento financiero se reduce progresivamente desde 1.38 (2026) hasta 0.75 (2031), reflejando una estructura de capital cada vez más sólida y menos dependiente de terceros, en línea con la estrategia de mantener la deuda bancaria constante mientras el patrimonio crece por retención de utilidades.
                </p>
            )}
            {activeCategory === 'gestion' && (
                <p className="text-blue-100 leading-relaxed">
                    Los indicadores de gestión muestran <strong className="text-white">gran estabilidad operativa</strong>. Las rotaciones de Cuentas por Cobrar (36 días) y Cuentas por Pagar (53.4 días) se mantienen constantes gracias a las políticas conservadoras asumidas. Llama la atención la rápida mejora en la rotación de capital de trabajo, impulsada por el crecimiento proyectado de las ventas base (6% anual) y la optimización post-proyecto de modernización.
                </p>
            )}
            {activeCategory === 'rentabilidad' && (
                <p className="text-blue-100 leading-relaxed">
                    El Margen Bruto se mantiene en un sólido <strong className="text-white">29.1%</strong> durante todo el período. Aunque la rentabilidad patrimonial (ROE) muestra un ligero descenso a largo plazo (de 17.3% a 11.3%), esto es un efecto matemático directo del enorme crecimiento del patrimonio por utilidades retenidas, mientras que el Margen Neto en realidad mejora del 11.2% (2027) al 12.4% (2031).
                </p>
            )}
        </div>

      </div>
    </div>
  );
};
