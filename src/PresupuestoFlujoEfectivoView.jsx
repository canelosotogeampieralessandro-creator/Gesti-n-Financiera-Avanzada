import React, { useState } from 'react';

export const PresupuestoFlujoEfectivoView = ({ initialTab = 'resultados' }) => {
  const [activeView, setActiveView] = useState(initialTab);


  const formatNum = (val, isNegative = false) => {
    const formatted = new Intl.NumberFormat('en-US').format(Math.abs(val));
    return isNegative || val < 0 ? `(${formatted})` : formatted;
  };

  const renderResultados = () => (
    <div className="animate-fade-in-up">
      <div className="bg-[#0B1B3D] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <i className="ph-chart-line-down text-9xl text-white"></i>
        </div>
        
        <div className="flex justify-between items-center mb-8 relative z-10">
            <div>
                <h3 className="text-white font-black text-2xl flex items-center">
                    <span className="bg-blue-600 text-blue-100 px-2 py-1 rounded text-sm mr-3">PASO 10</span> 
                    Estado de Resultados Presupuestado 2026
                </h3>
                <p className="text-blue-200 mt-1 text-sm">Proyección de rentabilidad operativa y neta.</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                <i className="ph-calculator text-3xl text-blue-300"></i>
            </div>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden relative z-10 shadow-xl">
            <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-700">Ventas</td>
                        <td className="px-6 py-4 text-right font-bold text-gray-900">{formatNum(505203)}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-700">Costo de ventas</td>
                        <td className="px-6 py-4 text-right font-medium text-red-500">{formatNum(358318, true)}</td>
                    </tr>
                    <tr className="bg-blue-50/50">
                        <td className="px-6 py-4 font-black text-blue-900">UTILIDAD BRUTA</td>
                        <td className="px-6 py-4 text-right font-black text-blue-700 text-lg">{formatNum(146885)}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-700">Gastos de venta y administración</td>
                        <td className="px-6 py-4 text-right font-medium text-red-500">{formatNum(41427, true)}</td>
                    </tr>
                    <tr className="bg-blue-50/50">
                        <td className="px-6 py-4 font-black text-blue-900">UTILIDAD ANTES DE PARTICIPACIONES E IMPUESTOS</td>
                        <td className="px-6 py-4 text-right font-black text-blue-700 text-lg">{formatNum(105459)}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-700">Participación de los trabajadores en las utilidades (10%)</td>
                        <td className="px-6 py-4 text-right font-medium text-red-500">{formatNum(10546)}</td>
                    </tr>
                    <tr className="bg-blue-50/50">
                        <td className="px-6 py-4 font-black text-blue-900">UTILIDAD ANTES DE IMPUESTO A LA RENTA</td>
                        <td className="px-6 py-4 text-right font-black text-blue-700 text-lg">{formatNum(94913)}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-700">Impuesto a la Renta (29.5%)</td>
                        <td className="px-6 py-4 text-right font-medium text-red-500">{formatNum(27999)}</td>
                    </tr>
                    <tr className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white">
                        <td className="px-6 py-5 font-black text-lg">UTILIDAD NETA DEL EJERCICIO</td>
                        <td className="px-6 py-5 text-right font-black text-2xl">{formatNum(66913)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );

  const renderFlujo = () => (
    <div className="animate-fade-in-up space-y-6">
      
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-teal-600 to-emerald-500 p-4 px-6 flex justify-between items-center">
          <div>
              <h3 className="text-white font-bold text-lg flex items-center">
                <span className="bg-teal-800 text-teal-100 px-2 py-1 rounded text-xs mr-3">PASO 11</span>
                Presupuesto de Flujo de Efectivo 2026
              </h3>
              <p className="text-teal-100 text-sm mt-1">Método Indirecto - Reconciliación de utilidad a efectivo.</p>
          </div>
          <i className="ph-coins text-teal-200 text-3xl"></i>
        </div>

        <div className="p-0">
          
          {/* Actividades de Operación */}
          <div className="border-b border-gray-200">
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">1</div>
                <h4 className="font-bold text-gray-800">ACTIVIDADES DE OPERACIÓN</h4>
            </div>
            <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-50">
                    <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-3 text-gray-700">Utilidad neta del ejercicio</td>
                        <td className="px-6 py-3 text-right font-bold text-emerald-600">{formatNum(66913)}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-3 text-gray-700">(+) Depreciación de Activo Fijo</td>
                        <td className="px-6 py-3 text-right text-gray-900">{formatNum(12570)}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-3 text-gray-700">(+) Amortización de Intangibles</td>
                        <td className="px-6 py-3 text-right font-bold text-gray-900">{formatNum(9333)}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-3 text-gray-700">(+/-) Variación en Cuentas por Cobrar</td>
                        <td className="px-6 py-3 text-right text-gray-900">{formatNum(129735)}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-3 text-gray-700">(+/-) Variación en Materia Prima</td>
                        <td className="px-6 py-3 text-right text-gray-900">{formatNum(790)}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-3 text-gray-700">(+/-) Variación en Productos Terminados y en Proceso</td>
                        <td className="px-6 py-3 text-right text-gray-900">{formatNum(22898)}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-3 text-gray-700">(+/-) Variación en Cuentas por Pagar</td>
                        <td className="px-6 py-3 text-right text-red-500">{formatNum(-92448, true)}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-3 text-gray-700">(+/-) Variación en Impuesto a la Renta por pagar</td>
                        <td className="px-6 py-3 text-right text-gray-900">{formatNum(27999)}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-3 text-gray-700">(+/-) Variación en Participación de Utilidades por pagar</td>
                        <td className="px-6 py-3 text-right text-gray-900">{formatNum(10546)}</td>
                    </tr>
                    <tr className="bg-blue-50/50">
                        <td className="px-6 py-4 font-black text-blue-900">EFECTIVO NETO DE ACTIVIDADES DE OPERACIÓN</td>
                        <td className="px-6 py-4 text-right font-black text-blue-700 text-lg">{formatNum(188335)}</td>
                    </tr>
                </tbody>
            </table>
          </div>

          {/* Actividades de Inversión */}
          <div className="border-b border-gray-200">
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold">2</div>
                <h4 className="font-bold text-gray-800">ACTIVIDADES DE INVERSIÓN</h4>
            </div>
            <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-50">
                    <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-3 text-gray-700">(-) Adquisición de Activo Fijo — Proyecto de Modernización (Steam Dried)</td>
                        <td className="px-6 py-3 text-right text-red-500">{formatNum(-9688, true)}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-3 text-gray-700">(-) Capital de trabajo incremental del proyecto</td>
                        <td className="px-6 py-3 text-right text-red-500">{formatNum(-933, true)}</td>
                    </tr>
                    <tr className="bg-amber-50/50">
                        <td className="px-6 py-4 font-black text-amber-900">EFECTIVO NETO DE ACTIVIDADES DE INVERSIÓN</td>
                        <td className="px-6 py-4 text-right font-black text-amber-700 text-lg">{formatNum(-10621, true)}</td>
                    </tr>
                </tbody>
            </table>
          </div>

          {/* Actividades de Financiamiento */}
          <div className="border-b border-gray-200">
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">3</div>
                <h4 className="font-bold text-gray-800">ACTIVIDADES DE FINANCIAMIENTO</h4>
            </div>
            <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-50">
                    <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-3 text-gray-700">(+) Línea de capital de trabajo / papeles comerciales</td>
                        <td className="px-6 py-3 text-right text-gray-900">{formatNum(933)}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-3 text-gray-700">(+) Emisión de bonos corporativos</td>
                        <td className="px-6 py-3 text-right text-gray-900">{formatNum(5867)}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-3 text-gray-700">(+) Arrendamiento financiero (leasing)</td>
                        <td className="px-6 py-3 text-right text-gray-900">{formatNum(2133)}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-3 text-gray-700">(+) Aporte de capital</td>
                        <td className="px-6 py-3 text-right text-gray-900">{formatNum(1688)}</td>
                    </tr>
                    <tr className="bg-purple-50/50">
                        <td className="px-6 py-4 font-black text-purple-900">EFECTIVO NETO DE ACTIVIDADES DE FINANCIAMIENTO</td>
                        <td className="px-6 py-4 text-right font-black text-purple-700 text-lg">{formatNum(10621)}</td>
                    </tr>
                </tbody>
            </table>
          </div>

          {/* Resumen Final de Efectivo */}
          <div className="bg-[#0B1B3D] text-white p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm text-center">
                    <span className="text-blue-300 text-xs font-bold block mb-1 uppercase tracking-wider">Aumento Neto (1+2+3)</span>
                    <span className="text-2xl font-black text-emerald-400">{formatNum(188335)}</span>
                </div>
                <div className="flex items-center justify-center">
                    <i className="ph-plus text-2xl text-gray-500 hidden md:block"></i>
                </div>
                <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm text-center">
                    <span className="text-gray-400 text-xs font-bold block mb-1 uppercase tracking-wider">Saldo Inicial de Efectivo</span>
                    <span className="text-2xl font-black text-gray-300">{formatNum(5553)}</span>
                </div>
            </div>
            
            <div className="mt-6 flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-emerald-500 to-teal-400 rounded-xl p-6 shadow-inner">
                <div>
                    <h3 className="font-black text-2xl tracking-wide">SALDO FINAL DE EFECTIVO</h3>
                    <p className="text-emerald-100 text-sm">Disponible al cierre del periodo 2026</p>
                </div>
                <span className="text-4xl md:text-5xl font-black drop-shadow-lg mt-4 md:mt-0">{formatNum(193888)}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full w-full bg-gray-50/50 rounded-2xl p-4 md:p-8 overflow-y-auto">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Estado de Resultados y Flujo de Efectivo</h1>
        <p className="text-gray-500 mt-2 font-medium">Consolidación de la utilidad neta y proyección del efectivo final (Método indirecto).</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 w-max max-w-full overflow-x-auto">
        <button
          onClick={() => setActiveView('resultados')}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 whitespace-nowrap
            ${activeView === 'resultados' 
              ? 'bg-[#0B1B3D] text-white shadow-md scale-105' 
              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}
          `}
        >
          <i className="ph-chart-line-down text-lg"></i>
          Paso 10: Estado de Resultados
        </button>
        <button
          onClick={() => setActiveView('flujo')}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 whitespace-nowrap
            ${activeView === 'flujo' 
              ? 'bg-teal-600 text-white shadow-md scale-105' 
              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}
          `}
        >
          <i className="ph-coins text-lg"></i>
          Paso 11: Flujo de Efectivo
        </button>
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">
        {activeView === 'resultados' && renderResultados()}
        {activeView === 'flujo' && renderFlujo()}
      </div>

    </div>
  );
};
