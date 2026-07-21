import React, { useState } from 'react';

export const PresupuestoCapitalView = () => {
  const [activeTab, setActiveTab] = useState('inversion');
  const [hoveredCard, setHoveredCard] = useState(null);

  const formatMoney = (val) => new Intl.NumberFormat('en-US').format(val);

  const tabs = [
    { id: 'inversion', label: 'Inversión Inicial', icon: 'ph-money' },
    { id: 'supuestos', label: 'Supuestos Operativos', icon: 'ph-lightning' },
    { id: 'wacc', label: 'Costo de Capital (WACC)', icon: 'ph-percent' }
  ];

  const renderInversion = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in-up">
      {/* CAPEX Card */}
      <div 
        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group"
        onMouseEnter={() => setHoveredCard('capex')}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-6 flex items-center justify-between">
          <div className="flex items-center text-white">
            <div className="p-3 bg-white/20 rounded-xl mr-4 backdrop-blur-sm">
              <i className="ph-briefcase text-2xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold">Inversión Fija (CAPEX)</h2>
              <p className="text-blue-100 text-sm">Miles de S/</p>
            </div>
          </div>
          <div className="text-right text-white">
            <span className="text-3xl font-black">33,800</span>
          </div>
        </div>
        <div className={`p-0 transition-all duration-500 overflow-hidden ${hoveredCard === 'capex' ? 'max-h-[500px]' : 'max-h-[300px]'}`}>
          <table className="w-full text-sm text-left">
            <tbody className="divide-y divide-gray-100">
              {[
                { label: 'Máquinas y equipos (Steam Dried)', value: 25000 },
                { label: 'Instalación y montaje', value: 5000 },
                { label: 'Infraestructura y adecuación civil', value: 3000 },
                { label: 'Gastos preoperativos y licencias', value: 800 },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                  <td className="px-6 py-4 text-gray-600 font-medium">{item.label}</td>
                  <td className="px-6 py-4 text-right text-blue-900 font-bold">{formatMoney(item.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* KT Card */}
      <div 
        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group"
        onMouseEnter={() => setHoveredCard('kt')}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-6 flex items-center justify-between">
          <div className="flex items-center text-white">
            <div className="p-3 bg-white/20 rounded-xl mr-4 backdrop-blur-sm">
              <i className="ph-trend-up text-2xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold">Capital de Trabajo (KT)</h2>
              <p className="text-emerald-50 text-sm">Incremento en días</p>
            </div>
          </div>
          <div className="text-right text-white">
            <span className="text-3xl font-black">2,500</span>
          </div>
        </div>
        <div className={`p-0 transition-all duration-500 overflow-hidden ${hoveredCard === 'kt' ? 'max-h-[500px]' : 'max-h-[300px]'}`}>
          <table className="w-full text-sm text-left">
            <tbody className="divide-y divide-gray-100">
              {[
                { label: 'Días de cuentas por cobrar', value: 30, suffix: 'días' },
                { label: 'Días de inventario', value: 45, suffix: 'días' },
                { label: 'Días de cuentas por pagar', value: 30, suffix: 'días' },
                { label: 'Inversión en KT (año 0)', value: '2,500', suffix: 'k S/', bold: true },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-emerald-50/50 transition-colors">
                  <td className="px-6 py-4 text-gray-600 font-medium">{item.label}</td>
                  <td className={`px-6 py-4 text-right ${item.bold ? 'text-emerald-700 font-bold text-lg' : 'text-gray-900 font-semibold'}`}>
                    {item.value} <span className="text-xs text-gray-400 font-normal">{item.suffix}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Total Bubble */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <span className="text-gray-500 font-bold uppercase tracking-wider text-sm">Inversión Inicial Total</span>
            <span className="text-2xl font-black text-gray-800">36,300 <span className="text-sm font-medium text-gray-400">Miles S/</span></span>
        </div>
      </div>
    </div>
  );

  const renderSupuestos = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
      {[
        { label: 'Volumen Harina PRIME', value: '30,000', unit: 't/año', icon: 'ph-package', color: 'from-blue-500 to-blue-400' },
        { label: 'Crecimiento Anual', value: '3.0%', unit: 'anual', icon: 'ph-chart-line-up', color: 'from-emerald-500 to-emerald-400' },
        { label: 'Premium Harina', value: '140', unit: 'US$/t', icon: 'ph-star', color: 'from-amber-500 to-amber-400' },
        { label: 'Tipo de Cambio', value: '3.75', unit: 'S/ por US$', icon: 'ph-currency-dollar', color: 'from-gray-600 to-gray-500' },
        { label: 'Mejora Recup. Aceite', value: '1,500', unit: 'k S/ año', icon: 'ph-drop', color: 'from-yellow-500 to-yellow-400' },
        { label: 'Ahorro Energía', value: '1,800', unit: 'k S/ año', icon: 'ph-lightning', color: 'from-purple-500 to-purple-400' },
      ].map((metric, i) => (
        <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
          <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${metric.color}`}></div>
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl bg-gray-50 group-hover:scale-110 transition-transform duration-300`}>
              <i className={`${metric.icon} text-2xl text-gray-700`}></i>
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">{metric.label}</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-gray-900">{metric.value}</span>
            <span className="text-sm font-medium text-gray-400">{metric.unit}</span>
          </div>
        </div>
      ))}
      
      <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mt-2">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <i className="ph-gear-six text-xl mr-2 text-blue-900"></i>
            Parámetros Adicionales
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 font-semibold mb-1">Costos Incrementales</p>
                <p className="text-lg font-bold text-gray-900">3,200 <span className="text-xs font-normal">k S/año</span></p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 font-semibold mb-1">Mantenimiento Anual</p>
                <p className="text-lg font-bold text-gray-900">3.0% <span className="text-xs font-normal">del CAPEX</span></p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 font-semibold mb-1">Vida Útil</p>
                <p className="text-lg font-bold text-gray-900">10 <span className="text-xs font-normal">años</span></p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 font-semibold mb-1">Impuesto a la Renta</p>
                <p className="text-lg font-bold text-gray-900">29.5%</p>
            </div>
        </div>
      </div>
    </div>
  );

  const renderWacc = () => (
    <div className="animate-fade-in-up">
      <div className="bg-gradient-to-br from-[#0B1B3D] to-blue-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-72 h-72 bg-emerald-500 rounded-full blur-3xl opacity-20"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex-1 w-full">
                <h2 className="text-sm font-bold tracking-widest text-blue-300 uppercase mb-2">Costo Promedio Ponderado</h2>
                <h1 className="text-4xl md:text-5xl font-black mb-6">WACC <span className="text-emerald-400">8.7%</span></h1>
                
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <p className="text-lg font-mono mb-4 text-center">WACC = We·Ke + Wd·Kd·(1-t)</p>
                    
                    {/* Structure Bar */}
                    <div className="h-4 w-full bg-white/20 rounded-full overflow-hidden flex mb-2">
                        <div className="h-full bg-emerald-400" style={{ width: '45.3%' }} title="Patrimonio: 45.3%"></div>
                        <div className="h-full bg-amber-400" style={{ width: '54.7%' }} title="Deuda: 54.7%"></div>
                    </div>
                    <div className="flex justify-between text-xs font-bold px-1">
                        <span className="text-emerald-400">Patrimonio (We): 45.3%</span>
                        <span className="text-amber-400">Deuda (Wd): 54.7%</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                {/* Ke */}
                <div className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
                    <div className="flex justify-between items-center mb-3">
                        <span className="font-bold text-blue-200">Costo Patrimonio (Ke)</span>
                        <span className="text-2xl font-black text-white">12.1%</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-center text-xs">
                        <div className="bg-black/20 rounded p-2"><div className="text-white/50 mb-1">Rf</div>4.5%</div>
                        <div className="bg-black/20 rounded p-2"><div className="text-white/50 mb-1">Beta</div>1.10</div>
                        <div className="bg-black/20 rounded p-2"><div className="text-white/50 mb-1">ERP</div>5.5%</div>
                        <div className="bg-black/20 rounded p-2"><div className="text-white/50 mb-1">RP</div>1.5%</div>
                    </div>
                </div>
                
                {/* Kd */}
                <div className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center hover:bg-white/10 transition-colors">
                    <div>
                        <span className="font-bold text-blue-200 block">Costo Deuda (Kd)</span>
                        <span className="text-xs text-white/50">Antes de impuestos</span>
                    </div>
                    <span className="text-2xl font-black text-white">8.5%</span>
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
        <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Presupuesto de Capital</h1>
        <p className="text-gray-500 mt-2 font-medium">Modelación interactiva de inversión y supuestos operativos del proyecto estratégico.</p>
      </div>

      {/* Interactive Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 w-max max-w-full overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 whitespace-nowrap
              ${activeTab === tab.id 
                ? 'bg-[#0B1B3D] text-white shadow-md scale-105' 
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}
            `}
          >
            <i className={`${tab.icon} text-lg`}></i>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        {activeTab === 'inversion' && renderInversion()}
        {activeTab === 'supuestos' && renderSupuestos()}
        {activeTab === 'wacc' && renderWacc()}
      </div>

    </div>
  );
};
