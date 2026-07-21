import React, { useState } from 'react';

export const PresupuestoEstadoSituacionView = () => {
  const [viewMode, setViewMode] = useState('comparative'); // '2025', '2026', 'comparative'
  const [highlightProject, setHighlightProject] = useState(false);

  const formatNum = (val) => new Intl.NumberFormat('en-US').format(val);

  const data2025 = {
    activoCirculante: [
      { name: 'Efectivo', val: 5553 },
      { name: 'Cuentas por cobrar', val: 180255 },
      { name: 'Materia prima', val: 9691 },
      { name: 'Productos terminados', val: 92145 },
      { name: 'Productos en proceso (costos diferidos)', val: 5466 },
    ],
    totalActivoCirculante: 293110,
    activoNoCirculante: [
      { name: 'Intangibles y crédito mercantil', val: 233323 },
      { name: 'Activo fijo (embarcaciones, plantas y equipo)', val: 209501 },
      { name: 'Otras inversiones no corrientes', val: 157685 },
    ],
    totalActivoNoCirculante: 600509,
    totalActivo: 893619,
    
    pasivoCirculante: [
      { name: 'Cuentas por pagar', val: 145600 },
      { name: 'Deuda bancaria corriente', val: 211817 },
    ],
    totalPasivoCirculante: 357417,
    pasivoNoCirculante: [
      { name: 'Obligaciones no corrientes', val: 219113 },
    ],
    totalPasivoNoCirculante: 219113,
    totalPasivo: 576530,
    
    patrimonio: [
      { name: 'Capital social y prima de emisión', val: 159493 },
      { name: 'Reservas y resultados acumulados', val: 157596 },
    ],
    totalPatrimonio: 317089,
    totalPasivoPatrimonio: 893619,
  };

  const data2026 = {
    activoCirculante: [
      { name: 'Efectivo', val: 193888 },
      { name: 'Cuentas por cobrar', val: 50520 },
      { name: 'Materia prima', val: 8902 },
      { name: 'Productos terminados', val: 74713 },
      { name: 'Capital de trabajo del Proyecto de Modernización', val: 933, isProject: true, projectDetail: '+933 Línea de Capital' },
    ],
    totalActivoCirculante: 328957,
    activoNoCirculante: [
      { name: 'Intangibles y crédito mercantil, neto', val: 223990 },
      { name: 'Activo fijo, neto (incluye Proyecto de Modernización)', val: 206619, isProject: true, projectDetail: '+9,688 Inversión AF' },
      { name: 'Otras inversiones no corrientes', val: 157685 },
    ],
    totalActivoNoCirculante: 588294,
    totalActivo: 917251,
    
    pasivoCirculante: [
      { name: 'Cuentas por pagar', val: 53152 },
      { name: 'Deuda bancaria corriente', val: 212750, isProject: true, projectDetail: '+933 Papeles Comerciales' },
      { name: 'Impuesto a la Renta por pagar', val: 27999 },
      { name: 'Participación de utilidades por pagar', val: 10546 },
    ],
    totalPasivoCirculante: 304447,
    pasivoNoCirculante: [
      { name: 'Obligaciones no corrientes', val: 227113, isProject: true, projectDetail: '+5,867 Bonos | +2,133 Leasing' },
    ],
    totalPasivoNoCirculante: 227113,
    totalPasivo: 531560,
    
    patrimonio: [
      { name: 'Capital social y prima de emisión', val: 161181, isProject: true, projectDetail: '+1,688 Aporte de Capital' },
      { name: 'Reservas y resultados acumulados', val: 157596 },
      { name: 'Utilidad del ejercicio', val: 66913 },
    ],
    totalPatrimonio: 385690,
    totalPasivoPatrimonio: 917251,
  };

  const renderTableSection = (title, items2025, items2026, total2025, total2026, bgClass) => {
    // Para alinear las filas si estamos en vista comparativa
    // Asumimos que los nombres clave dictan el match, o simplemente mostramos ambos.
    // Para simplificar, si no es comparativo, mapeamos simple. Si es comparativo, mostramos columnas adyacentes.

    return (
      <div className={`mb-6 rounded-2xl overflow-hidden border border-gray-200 shadow-sm ${bgClass}`}>
        <div className="bg-gray-900 text-white p-3 px-5 font-bold uppercase tracking-wider text-sm flex justify-between items-center">
            <span>{title}</span>
            {viewMode === 'comparative' && (
                <div className="flex gap-12 mr-10 text-xs text-gray-400">
                    <span className="w-24 text-right">2025</span>
                    <span className="w-24 text-right text-blue-300">2026</span>
                </div>
            )}
        </div>
        <div className="p-0 bg-white">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-gray-100">
                {/* Lógica para vista comparativa (mostrando 2026 con sus campos extra) */}
                {viewMode === 'comparative' ? (
                    <>
                        {items2026.map((item26, i) => {
                            // Find match in 2025 by loosely checking name prefix
                            const item25 = items2025.find(it => it.name.substring(0, 5) === item26.name.substring(0, 5)) || { val: 0 };
                            const isProjHighlight = highlightProject && item26.isProject;

                            return (
                                <tr key={i} className={`transition-all duration-300 ${isProjHighlight ? 'bg-amber-50' : 'hover:bg-gray-50'}`}>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-2">
                                            <span className={`font-medium ${isProjHighlight ? 'text-amber-800' : 'text-gray-700'}`}>
                                                {item26.name}
                                            </span>
                                            {item26.isProject && (
                                                <i className={`ph-star-fill text-xs ${isProjHighlight ? 'text-amber-500 animate-pulse' : 'text-gray-300'}`}></i>
                                            )}
                                        </div>
                                        {isProjHighlight && item26.projectDetail && (
                                            <div className="text-xs text-amber-600 font-bold mt-1 bg-amber-100/50 inline-block px-2 py-0.5 rounded">
                                                {item26.projectDetail}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-5 py-3 text-right text-gray-400 w-32 border-l border-gray-100">
                                        {item25.val !== 0 ? formatNum(item25.val) : '-'}
                                    </td>
                                    <td className={`px-5 py-3 text-right w-32 font-bold ${isProjHighlight ? 'text-amber-700' : 'text-gray-900'} border-l border-blue-50 bg-blue-50/20`}>
                                        {formatNum(item26.val)}
                                    </td>
                                </tr>
                            );
                        })}
                        {/* Mostrar items de 2025 que no están en 2026 (ej. productos en proceso) */}
                        {items2025.filter(item25 => !items2026.some(item26 => item26.name.substring(0, 5) === item25.name.substring(0, 5))).map((item25, i) => (
                             <tr key={`extra-${i}`} className="hover:bg-gray-50">
                                <td className="px-5 py-3 text-gray-500">{item25.name}</td>
                                <td className="px-5 py-3 text-right text-gray-400 w-32 border-l border-gray-100">{formatNum(item25.val)}</td>
                                <td className="px-5 py-3 text-right text-gray-300 w-32 border-l border-blue-50 bg-blue-50/20">-</td>
                             </tr>
                        ))}
                    </>
                ) : (
                    (viewMode === '2026' ? items2026 : items2025).map((item, i) => {
                        const isProjHighlight = viewMode === '2026' && highlightProject && item.isProject;
                        return (
                            <tr key={i} className={`transition-all duration-300 ${isProjHighlight ? 'bg-amber-50' : 'hover:bg-gray-50'}`}>
                                <td className="px-5 py-3">
                                    <span className={`font-medium ${isProjHighlight ? 'text-amber-800' : 'text-gray-700'}`}>{item.name}</span>
                                    {isProjHighlight && item.projectDetail && (
                                        <div className="text-xs text-amber-600 font-bold mt-1 bg-amber-100 inline-block px-2 py-0.5 rounded">
                                            {item.projectDetail}
                                        </div>
                                    )}
                                </td>
                                <td className={`px-5 py-3 text-right font-bold ${isProjHighlight ? 'text-amber-700' : 'text-gray-900'}`}>
                                    {formatNum(item.val)}
                                </td>
                            </tr>
                        );
                    })
                )}
                
                {/* TOTAIS */}
                <tr className="bg-gray-100/80 font-black border-t-2 border-gray-200">
                    <td className="px-5 py-4 text-gray-800 uppercase tracking-wide text-xs">TOTAL {title}</td>
                    {viewMode === 'comparative' ? (
                        <>
                            <td className="px-5 py-4 text-right text-gray-500 border-l border-gray-200">{formatNum(total2025)}</td>
                            <td className="px-5 py-4 text-right text-blue-900 border-l border-blue-200 bg-blue-100/50 text-base">{formatNum(total2026)}</td>
                        </>
                    ) : (
                        <td className="px-5 py-4 text-right text-gray-900 text-base">{formatNum(viewMode === '2026' ? total2026 : total2025)}</td>
                    )}
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-50/50 rounded-2xl p-4 md:p-8 overflow-y-auto">
      
      {/* Header & Controls */}
      <div className="mb-8 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Estado de Situación Financiera</h1>
            <p className="text-gray-500 mt-2 font-medium">Comparativo 2025 (Base) vs 2026 (Presupuestado con Proyecto)</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                    onClick={() => setViewMode('2025')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === '2025' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    2025 Base
                </button>
                <button
                    onClick={() => setViewMode('2026')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === '2026' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    2026 Ppto
                </button>
                <button
                    onClick={() => setViewMode('comparative')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'comparative' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Comparativo
                </button>
            </div>
            
            <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

            <button
                onClick={() => setHighlightProject(!highlightProject)}
                className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all border
                    ${highlightProject 
                        ? 'bg-amber-100 border-amber-300 text-amber-800 shadow-inner' 
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}
                `}
            >
                <i className={`ph-magic-wand text-lg ${highlightProject ? 'text-amber-600' : 'text-gray-400'}`}></i>
                Resaltar Impacto del Proyecto
            </button>
        </div>
      </div>

      {/* Main Board */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
        
        {/* Left Column: Activos */}
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2 px-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <i className="ph-buildings text-xl font-bold"></i>
                </div>
                <h2 className="text-xl font-black text-emerald-900">ACTIVOS</h2>
            </div>
            
            {renderTableSection(
                'Activo Circulante', 
                data2025.activoCirculante, data2026.activoCirculante, 
                data2025.totalActivoCirculante, data2026.totalActivoCirculante, 
                'border-t-4 border-t-emerald-500'
            )}
            
            {renderTableSection(
                'Activo No Circulante', 
                data2025.activoNoCirculante, data2026.activoNoCirculante, 
                data2025.totalActivoNoCirculante, data2026.totalActivoNoCirculante, 
                'border-t-4 border-t-emerald-600'
            )}

            <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-2xl p-6 shadow-xl flex justify-between items-center border border-emerald-400">
                <span className="font-black text-xl uppercase tracking-widest">Total Activo</span>
                {viewMode === 'comparative' ? (
                    <div className="flex gap-8 items-end">
                        <div className="text-right">
                            <span className="block text-emerald-200 text-xs font-bold mb-1">2025</span>
                            <span className="text-2xl font-bold text-emerald-100 opacity-80">{formatNum(data2025.totalActivo)}</span>
                        </div>
                        <div className="text-right">
                            <span className="block text-white text-xs font-bold mb-1">2026</span>
                            <span className="text-4xl font-black">{formatNum(data2026.totalActivo)}</span>
                        </div>
                    </div>
                ) : (
                    <span className="text-4xl font-black">{formatNum(viewMode === '2026' ? data2026.totalActivo : data2025.totalActivo)}</span>
                )}
            </div>
        </div>

        {/* Right Column: Pasivos y Patrimonio */}
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2 px-2">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                    <i className="ph-scales text-xl font-bold"></i>
                </div>
                <h2 className="text-xl font-black text-rose-900">PASIVO Y PATRIMONIO</h2>
            </div>
            
            {renderTableSection(
                'Pasivo Circulante', 
                data2025.pasivoCirculante, data2026.pasivoCirculante, 
                data2025.totalPasivoCirculante, data2026.totalPasivoCirculante, 
                'border-t-4 border-t-rose-400'
            )}
            
            {renderTableSection(
                'Pasivo No Circulante', 
                data2025.pasivoNoCirculante, data2026.pasivoNoCirculante, 
                data2025.totalPasivoNoCirculante, data2026.totalPasivoNoCirculante, 
                'border-t-4 border-t-rose-500'
            )}
            
            <div className="bg-rose-50 text-rose-900 rounded-2xl p-4 px-6 flex justify-between items-center border border-rose-200 shadow-sm">
                <span className="font-bold uppercase tracking-widest text-sm">Total Pasivo</span>
                {viewMode === 'comparative' ? (
                    <div className="flex gap-8 text-right">
                        <span className="text-gray-500 w-20">{formatNum(data2025.totalPasivo)}</span>
                        <span className="font-black text-rose-700 w-20 text-lg">{formatNum(data2026.totalPasivo)}</span>
                    </div>
                ) : (
                    <span className="font-black text-lg">{formatNum(viewMode === '2026' ? data2026.totalPasivo : data2025.totalPasivo)}</span>
                )}
            </div>

            {renderTableSection(
                'Patrimonio', 
                data2025.patrimonio, data2026.patrimonio, 
                data2025.totalPatrimonio, data2026.totalPatrimonio, 
                'border-t-4 border-t-purple-500 mt-6'
            )}

            <div className="bg-[#0B1B3D] text-white rounded-2xl p-6 shadow-xl flex justify-between items-center border border-blue-900 mt-6">
                <span className="font-black text-xl uppercase tracking-widest">Total Pasivo y Patrimonio</span>
                {viewMode === 'comparative' ? (
                    <div className="flex gap-8 items-end">
                        <div className="text-right">
                            <span className="block text-gray-400 text-xs font-bold mb-1">2025</span>
                            <span className="text-2xl font-bold text-gray-300 opacity-80">{formatNum(data2025.totalPasivoPatrimonio)}</span>
                        </div>
                        <div className="text-right">
                            <span className="block text-blue-300 text-xs font-bold mb-1">2026</span>
                            <span className="text-4xl font-black text-white">{formatNum(data2026.totalPasivoPatrimonio)}</span>
                        </div>
                    </div>
                ) : (
                    <span className="text-4xl font-black">{formatNum(viewMode === '2026' ? data2026.totalPasivoPatrimonio : data2025.totalPasivoPatrimonio)}</span>
                )}
            </div>
        </div>

      </div>

    </div>
  );
};
