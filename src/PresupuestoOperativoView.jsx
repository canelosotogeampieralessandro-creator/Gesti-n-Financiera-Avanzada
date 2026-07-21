import React, { useState } from 'react';

export const PresupuestoOperativoView = () => {
  const [activeStage, setActiveStage] = useState(1);

  const formatNum = (val) => new Intl.NumberFormat('en-US').format(val);
  const formatDec = (val, decimals = 3) => new Intl.NumberFormat('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(val);

  const stages = [
    { id: 1, label: 'Ingresos y Producción', desc: 'Pasos 1-2', icon: 'ph-trend-up' },
    { id: 2, label: 'Materiales e Insumos', desc: 'Pasos 3-4', icon: 'ph-package' },
    { id: 3, label: 'Costos Operativos', desc: 'Pasos 5-7', icon: 'ph-users-three' },
    { id: 4, label: 'Inventarios y Costo Final', desc: 'Pasos 8-9', icon: 'ph-calculator' }
  ];

  const renderStage1 = () => (
    <div className="animate-fade-in-up space-y-6">
      {/* Paso 1 */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-4 px-6 flex justify-between items-center">
          <h3 className="text-white font-bold text-lg flex items-center">
            <span className="bg-blue-700 text-blue-100 px-2 py-1 rounded text-xs mr-3">PASO 1</span>
            Presupuesto de Ventas (2026)
          </h3>
          <i className="ph-chart-line-up text-blue-300 text-2xl"></i>
        </div>
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-blue-50 text-blue-900 font-bold">
              <tr>
                <th className="px-6 py-3">Concepto</th>
                <th className="px-6 py-3 text-right">Precio/Venta</th>
                <th className="px-6 py-3 text-right">Unidades (TM)</th>
                <th className="px-6 py-3 text-right text-lg">Total (Miles)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-700">Harina de Pescado (A)</td>
                <td className="px-6 py-4 text-right text-gray-500">1.64169</td>
                <td className="px-6 py-4 text-right text-gray-700">244,358</td>
                <td className="px-6 py-4 text-right font-bold text-blue-700">401,159</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-700">Aceite de Pescado (B)</td>
                <td className="px-6 py-4 text-right text-gray-500">3.11291</td>
                <td className="px-6 py-4 text-right text-gray-700">30,752</td>
                <td className="px-6 py-4 text-right font-bold text-blue-700">95,728</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-700">Pota Congelada (C)</td>
                <td className="px-6 py-4 text-right text-gray-500">2.20000</td>
                <td className="px-6 py-4 text-right text-gray-700">3,780</td>
                <td className="px-6 py-4 text-right font-bold text-blue-700">8,316</td>
              </tr>
              <tr className="bg-gray-100 font-black">
                <td colSpan="3" className="px-6 py-4 text-right text-gray-900">TOTAL INGRESOS</td>
                <td className="px-6 py-4 text-right text-2xl text-blue-900">505,203</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Paso 2 */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 p-4 px-6 flex justify-between items-center">
          <h3 className="text-white font-bold text-lg flex items-center">
            <span className="bg-emerald-800 text-emerald-100 px-2 py-1 rounded text-xs mr-3">PASO 2</span>
            Unidades a Producir
          </h3>
          <i className="ph-factory text-emerald-200 text-2xl"></i>
        </div>
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-sm text-center">
            <thead className="bg-emerald-50 text-emerald-900 font-bold">
              <tr>
                <th className="px-6 py-3 text-left">Concepto</th>
                <th className="px-6 py-3">Harina (A)</th>
                <th className="px-6 py-3">Aceite (B)</th>
                <th className="px-6 py-3">Pota (C)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50 text-gray-600">
                <td className="px-6 py-3 text-left font-medium">Ventas Proyectadas</td>
                <td className="px-6 py-3">{formatNum(244358)}</td>
                <td className="px-6 py-3">{formatNum(30752)}</td>
                <td className="px-6 py-3">{formatNum(3780)}</td>
              </tr>
              <tr className="hover:bg-gray-50 text-emerald-600">
                <td className="px-6 py-3 text-left font-medium">(+) Inventario Final</td>
                <td className="px-6 py-3">{formatNum(42000)}</td>
                <td className="px-6 py-3">{formatNum(10000)}</td>
                <td className="px-6 py-3">{formatNum(4500)}</td>
              </tr>
              <tr className="hover:bg-gray-50 text-red-500">
                <td className="px-6 py-3 text-left font-medium">(-) Inventario Inicial</td>
                <td className="px-6 py-3">{formatNum(38000)}</td>
                <td className="px-6 py-3">{formatNum(9000)}</td>
                <td className="px-6 py-3">{formatNum(4000)}</td>
              </tr>
              <tr className="bg-emerald-100/50 font-black text-emerald-900 text-lg border-t-2 border-emerald-200">
                <td className="px-6 py-4 text-left">UNIDADES A PRODUCIR</td>
                <td className="px-6 py-4">{formatNum(248358)}</td>
                <td className="px-6 py-4">{formatNum(31752)}</td>
                <td className="px-6 py-4">{formatNum(4280)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderStage2 = () => (
    <div className="animate-fade-in-up grid grid-cols-1 gap-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-amber-600 to-amber-500 p-4 px-6 flex justify-between items-center">
          <h3 className="text-white font-bold text-lg flex items-center">
            <span className="bg-amber-800 text-amber-100 px-2 py-1 rounded text-xs mr-3">PASOS 3 y 4</span>
            Materia Prima e Insumos (Requerimiento y Compras)
          </h3>
          <i className="ph-fish-simple text-amber-100 text-2xl"></i>
        </div>
        
        <div className="p-6 bg-amber-50/30 border-b border-gray-100">
          <h4 className="text-sm font-bold text-gray-500 mb-4">REQUERIMIENTO TOTAL (PASO 3)</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <span className="block text-xs text-gray-400 font-bold mb-1">ANCHOVETA (X)</span>
              <span className="block text-xl font-black text-gray-800">{formatNum(1752647)} <span className="text-xs font-normal">Uds</span></span>
              <span className="block text-sm text-amber-600 font-bold mt-2">Costo: {formatNum(254134)} <span className="text-[10px] text-gray-400">k$</span></span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <span className="block text-xs text-gray-400 font-bold mb-1">ENVASES (Y)</span>
              <span className="block text-xl font-black text-gray-800">{formatNum(5233)} <span className="text-xs font-normal">Uds</span></span>
              <span className="block text-sm text-amber-600 font-bold mt-2">Costo: {formatNum(5233)} <span className="text-[10px] text-gray-400">k$</span></span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <span className="block text-xs text-gray-400 font-bold mb-1">SUMINISTROS (Z)</span>
              <span className="block text-xl font-black text-gray-800">{formatNum(7181)} <span className="text-xs font-normal">Uds</span></span>
              <span className="block text-sm text-amber-600 font-bold mt-2">Costo: {formatNum(7181)} <span className="text-[10px] text-gray-400">k$</span></span>
            </div>
          </div>
          <div className="mt-4 text-right">
            <span className="text-gray-500 font-bold text-sm">COSTO TOTAL REQUERIMIENTO: </span>
            <span className="text-2xl font-black text-amber-700 ml-2">{formatNum(266547)}</span>
          </div>
        </div>

        <div className="p-0 overflow-x-auto">
          <h4 className="text-sm font-bold text-gray-500 m-6 mb-2">AJUSTE DE COMPRAS POR INVENTARIOS (PASO 4)</h4>
          <table className="w-full text-sm text-center">
            <thead className="bg-gray-50 text-gray-600 font-bold">
              <tr>
                <th className="px-6 py-3 text-left">Concepto</th>
                <th className="px-6 py-3">Anchoveta (X)</th>
                <th className="px-6 py-3">Envases (Y)</th>
                <th className="px-6 py-3">Suministros (Z)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50 text-emerald-600">
                <td className="px-6 py-3 text-left font-medium">(+) Inventario Final</td>
                <td className="px-6 py-3">700</td>
                <td className="px-6 py-3">{formatNum(2300)}</td>
                <td className="px-6 py-3">{formatNum(6500)}</td>
              </tr>
              <tr className="hover:bg-gray-50 text-red-500">
                <td className="px-6 py-3 text-left font-medium">(-) Inventario Inicial</td>
                <td className="px-6 py-3">{formatNum(1000)}</td>
                <td className="px-6 py-3">{formatNum(2557)}</td>
                <td className="px-6 py-3">{formatNum(6989)}</td>
              </tr>
              <tr className="bg-amber-50 font-bold text-gray-800">
                <td className="px-6 py-3 text-left">(=) COMPRAS (Unidades)</td>
                <td className="px-6 py-3">{formatNum(1752347)}</td>
                <td className="px-6 py-3">{formatNum(4976)}</td>
                <td className="px-6 py-3">{formatNum(6692)}</td>
              </tr>
              <tr className="bg-amber-100/50 font-black text-amber-900 border-t-2 border-amber-200">
                <td className="px-6 py-4 text-left text-lg">COSTO DE COMPRAS</td>
                <td className="px-6 py-4 text-lg">{formatNum(254090)}</td>
                <td className="px-6 py-4 text-lg">{formatNum(4976)}</td>
                <td className="px-6 py-4 text-lg">{formatNum(6692)}</td>
              </tr>
            </tbody>
          </table>
          <div className="p-4 bg-gray-900 text-white flex justify-between items-center px-6">
             <span className="font-bold tracking-widest text-sm uppercase">Costo Total Compras MP</span>
             <span className="text-3xl font-black text-amber-400">{formatNum(265758)}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStage3 = () => (
    <div className="animate-fade-in-up grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Paso 5 MOD */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 lg:col-span-2">
        <div className="bg-gradient-to-r from-purple-700 to-purple-600 p-4 px-6 flex justify-between items-center">
          <h3 className="text-white font-bold text-lg flex items-center">
            <span className="bg-purple-800 text-purple-100 px-2 py-1 rounded text-xs mr-3">PASO 5</span>
            Mano de Obra Directa (MOD)
          </h3>
          <i className="ph-users text-purple-200 text-2xl"></i>
        </div>
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-sm text-center">
            <thead className="bg-purple-50 text-purple-900 font-bold">
              <tr>
                <th className="px-4 py-3 text-left">Artículo</th>
                <th className="px-4 py-3">Unid. Prod.</th>
                <th className="px-4 py-3">Hrs/TM</th>
                <th className="px-4 py-3">Total Hrs</th>
                <th className="px-4 py-3">Costo/Hr</th>
                <th className="px-4 py-3 text-right text-lg">Consumo (k$)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-left font-medium">Harina (A)</td>
                <td className="px-4 py-3">{formatNum(248358)}</td>
                <td className="px-4 py-3">6.0</td>
                <td className="px-4 py-3 text-gray-500">{formatNum(1490145)}</td>
                <td className="px-4 py-3 text-gray-500">0.01308</td>
                <td className="px-4 py-3 text-right font-bold text-purple-700">{formatNum(19491)}</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-left font-medium">Aceite (B)</td>
                <td className="px-4 py-3">{formatNum(31752)}</td>
                <td className="px-4 py-3">10.0</td>
                <td className="px-4 py-3 text-gray-500">{formatNum(317519)}</td>
                <td className="px-4 py-3 text-gray-500">0.01308</td>
                <td className="px-4 py-3 text-right font-bold text-purple-700">{formatNum(4153)}</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-left font-medium">Pota (C)</td>
                <td className="px-4 py-3">{formatNum(4280)}</td>
                <td className="px-4 py-3">5.0</td>
                <td className="px-4 py-3 text-gray-500">{formatNum(21400)}</td>
                <td className="px-4 py-3 text-gray-500">0.01308</td>
                <td className="px-4 py-3 text-right font-bold text-purple-700">280</td>
              </tr>
              <tr className="bg-gray-900 text-white font-black">
                <td colSpan="3" className="px-4 py-4 text-right">TOTAL MOD</td>
                <td className="px-4 py-4">{formatNum(1829065)} hrs</td>
                <td></td>
                <td className="px-4 py-4 text-right text-2xl text-purple-300">{formatNum(23924)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Paso 6 GIF */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gray-800 p-4 px-6 flex justify-between items-center">
          <h3 className="text-white font-bold text-lg flex items-center">
            <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs mr-3">PASO 6</span>
            Gastos Indirectos (GIF)
          </h3>
          <i className="ph-wrench text-gray-400 text-2xl"></i>
        </div>
        <div className="p-5 space-y-4">
            {[
                { label: 'Mantenimiento (8%)', val: 16760 },
                { label: 'Depreciación AF (6%)', val: 12570 },
                { label: 'Amortización Int. (4%)', val: 9333 },
                { label: 'Seguros (2%)', val: 4190 },
                { label: 'Gastos Varios (1%)', val: 2095 },
            ].map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600 text-sm">{item.label}</span>
                    <span className="font-bold text-gray-900">{formatNum(item.val)}</span>
                </div>
            ))}
            <div className="pt-2 flex flex-col items-end">
                <div className="flex justify-between w-full mb-1">
                    <span className="text-gray-500 font-bold">TOTAL GIF:</span>
                    <span className="text-xl font-black text-gray-800">{formatNum(44948)}</span>
                </div>
                <div className="text-xs text-gray-400">Base: 1,829,065 hrs | Tasa: 0.02457</div>
            </div>
        </div>
      </div>

      {/* Paso 7 Gastos Venta */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gray-800 p-4 px-6 flex justify-between items-center">
          <h3 className="text-white font-bold text-lg flex items-center">
            <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs mr-3">PASO 7</span>
            Gastos Venta y Admin
          </h3>
          <i className="ph-briefcase text-gray-400 text-2xl"></i>
        </div>
        <div className="p-5 space-y-4">
            {[
                { label: 'Sueldos y salarios (1.5%)', val: 7578 },
                { label: 'Comisiones de venta (2.5%)', val: 12630 },
                { label: 'Flete y distribución (3.5%)', val: 17682 },
                { label: 'Gastos varios (0.7%)', val: 3536 },
            ].map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600 text-sm">{item.label}</span>
                    <span className="font-bold text-gray-900">{formatNum(item.val)}</span>
                </div>
            ))}
            <div className="pt-2 flex flex-col items-end">
                <div className="flex justify-between w-full mb-1">
                    <span className="text-gray-500 font-bold">TOTAL GASTOS:</span>
                    <span className="text-xl font-black text-gray-800">{formatNum(41427)}</span>
                </div>
                <div className="text-xs text-gray-400">Sobre ventas totales de 505,203</div>
            </div>
        </div>
      </div>

    </div>
  );

  const renderStage4 = () => (
    <div className="animate-fade-in-up space-y-6">
      
      {/* Paso 9 Costo Ventas (Visualizado como un Flujo/Dashboard) */}
      <div className="bg-[#0B1B3D] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <i className="ph-coins text-9xl text-white"></i>
        </div>
        
        <h3 className="text-white font-black text-2xl mb-8 flex items-center">
            <span className="bg-blue-600 text-blue-100 px-2 py-1 rounded text-sm mr-3">PASO 9</span> 
            Estructura del Costo de Ventas
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/10 rounded-2xl p-5 border border-white/10 backdrop-blur-sm">
                <span className="text-blue-200 text-xs font-bold block mb-1">Materia Prima Requerida</span>
                <span className="text-2xl font-black text-white">{formatNum(266547)}</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-5 border border-white/10 backdrop-blur-sm">
                <span className="text-blue-200 text-xs font-bold block mb-1">Mano de Obra (MOD)</span>
                <span className="text-2xl font-black text-white">{formatNum(23924)}</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-5 border border-white/10 backdrop-blur-sm">
                <span className="text-blue-200 text-xs font-bold block mb-1">Costos Indirectos (GIF)</span>
                <span className="text-2xl font-black text-white">{formatNum(44948)}</span>
            </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white rounded-2xl p-6 relative z-10">
            <div className="text-center md:text-left">
                <span className="text-gray-500 font-bold block text-sm mb-1">COSTO DE PRODUCCIÓN</span>
                <span className="text-3xl font-black text-gray-900">{formatNum(335420)}</span>
            </div>
            
            <div className="flex gap-4 items-center">
                <div className="text-center">
                    <span className="text-emerald-500 font-bold text-xs block mb-1">(+) Inv. Iniciales</span>
                    <span className="font-bold text-gray-700">{formatNum(5466 + 92145)}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-400">-</div>
                <div className="text-center">
                    <span className="text-red-500 font-bold text-xs block mb-1">(-) Inv. Final PT</span>
                    <span className="font-bold text-gray-700">{formatNum(74713)}</span>
                </div>
            </div>

            <div className="h-12 w-px bg-gray-200 hidden md:block"></div>

            <div className="text-center md:text-right">
                <span className="text-blue-600 font-bold block text-sm uppercase tracking-wider mb-1">Costo de Ventas Final</span>
                <span className="text-4xl font-black text-blue-900">{formatNum(358318)}</span>
            </div>
        </div>
      </div>

      {/* Paso 8 Inventarios */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gray-100 p-4 px-6 flex justify-between items-center border-b border-gray-200">
          <h3 className="text-gray-800 font-bold text-lg flex items-center">
            <span className="bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs mr-3">PASO 8</span>
            Valorización de Inventario Final (PT)
          </h3>
          <i className="ph-stack text-gray-500 text-2xl"></i>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-center">
                <p className="text-xs text-gray-500 font-bold mb-1">Harina (A)</p>
                <p className="text-lg font-black text-gray-800">{formatNum(38742)}</p>
                <p className="text-[10px] text-gray-400 mt-1">Costo Unit: {formatDec(0.92243, 5)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-center">
                <p className="text-xs text-gray-500 font-bold mb-1">Aceite (B)</p>
                <p className="text-lg font-black text-gray-800">{formatNum(33175)}</p>
                <p className="text-[10px] text-gray-400 mt-1">Costo Unit: {formatDec(3.31754, 5)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-center">
                <p className="text-xs text-gray-500 font-bold mb-1">Pota (C) + Otros</p>
                <p className="text-lg font-black text-gray-800">{formatNum(1041 + 1755)}</p>
                <p className="text-[10px] text-gray-400 mt-1">Costo Unit C: {formatDec(0.23127, 5)}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center flex flex-col justify-center">
                <p className="text-xs text-blue-600 font-bold mb-1 uppercase tracking-wider">Total Inventario PT</p>
                <p className="text-3xl font-black text-blue-900">{formatNum(74713)}</p>
            </div>
        </div>
      </div>

    </div>
  );

  return (
    <div className="flex flex-col h-full w-full bg-gray-50/50 rounded-2xl p-4 md:p-8 overflow-y-auto">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Presupuesto Operativo</h1>
        <p className="text-gray-500 mt-2 font-medium">Desglose integral de ventas, producción, costos e inventarios (Proyección 2026).</p>
      </div>

      {/* Stepper / Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stages.map((stage, idx) => (
          <button
            key={stage.id}
            onClick={() => setActiveStage(stage.id)}
            className={`
              relative flex flex-col items-start p-4 rounded-2xl transition-all duration-300 text-left border
              ${activeStage === stage.id 
                ? 'bg-white border-blue-500 shadow-lg shadow-blue-100 ring-2 ring-blue-500/20 translate-y-[-4px]' 
                : 'bg-white border-gray-100 shadow-sm hover:border-blue-300 hover:bg-blue-50/50'}
            `}
          >
            {activeStage === stage.id && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                    {idx + 1}
                </div>
            )}
            <div className={`p-2 rounded-xl mb-3 ${activeStage === stage.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                <i className={`${stage.icon} text-xl`}></i>
            </div>
            <h4 className={`font-bold text-sm ${activeStage === stage.id ? 'text-gray-900' : 'text-gray-600'}`}>{stage.label}</h4>
            <span className="text-xs text-gray-400 font-medium mt-1">{stage.desc}</span>
            
            {/* Progress bar logic (visual connecting line effect) */}
            {idx < stages.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-4 h-0.5 bg-gray-200"></div>
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">
        {activeStage === 1 && renderStage1()}
        {activeStage === 2 && renderStage2()}
        {activeStage === 3 && renderStage3()}
        {activeStage === 4 && renderStage4()}
      </div>

    </div>
  );
};
