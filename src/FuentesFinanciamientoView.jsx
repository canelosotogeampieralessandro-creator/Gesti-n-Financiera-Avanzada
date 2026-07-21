import React, { useState } from 'react';

export const FuentesFinanciamientoView = () => {
  const [activeTab, setActiveTab] = useState('instrumentos');
  const [hoveredInstrument, setHoveredInstrument] = useState(null);

  const formatMoney = (val) => new Intl.NumberFormat('en-US').format(val);

  const instrumentos = [
    {
      id: 'ct',
      fuente: 'Línea de capital de trabajo / papeles comerciales',
      mercado: 'Monetario',
      destino: 'Capital de trabajo',
      monto: 3500,
      pct: 8.8,
      plazo: '1 año (revolvente)',
      tasa: '9.5%',
      costo: '6.7%',
      icon: 'ph-bank',
      color: 'blue'
    },
    {
      id: 'bonos',
      fuente: 'Bonos corporativos',
      mercado: 'Capitales',
      destino: 'Activo fijo (planta y equip.)',
      monto: 22000,
      pct: 55.2,
      plazo: '7 años',
      tasa: '9.0%',
      costo: '6.3%',
      icon: 'ph-scroll',
      color: 'emerald'
    },
    {
      id: 'leasing',
      fuente: 'Arrendamiento financiero (leasing)',
      mercado: 'Capitales',
      destino: 'Maquinaria y equipo',
      monto: 8000,
      pct: 20.1,
      plazo: '5 años',
      tasa: '9.5%',
      costo: '6.7%',
      icon: 'ph-car',
      color: 'amber'
    },
    {
      id: 'patrimonio',
      fuente: 'Aporte de capital / utilidades retenidas',
      mercado: 'Capitales',
      destino: 'Activo fijo',
      monto: 6330,
      pct: 15.9,
      plazo: 'Permanente',
      tasa: '12.1%',
      costo: '12.1%',
      icon: 'ph-chart-pie-slice',
      color: 'purple'
    }
  ];

  const renderInstrumentos = () => (
    <div className="animate-fade-in-up">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {instrumentos.map((inst) => (
          <div 
            key={inst.id}
            onMouseEnter={() => setHoveredInstrument(inst.id)}
            onMouseLeave={() => setHoveredInstrument(null)}
            className={`
              relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 overflow-hidden transition-all duration-500
              ${hoveredInstrument === inst.id ? 'scale-105 shadow-2xl z-10' : 'hover:shadow-xl'}
            `}
          >
            {/* Color Accent */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-${inst.color}-500`}></div>
            
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-${inst.color}-50 text-${inst.color}-600`}>
                <i className={`${inst.icon} text-2xl`}></i>
              </div>
              <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                {inst.mercado}
              </span>
            </div>

            <h3 className="font-bold text-gray-900 text-lg mb-1 leading-tight h-14">{inst.fuente}</h3>
            <p className="text-gray-500 text-sm mb-4"><i className="ph-target mr-1"></i> {inst.destino}</p>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Monto (Miles S/)</span>
                  <span className="font-bold text-gray-900">{formatMoney(inst.monto)}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className={`bg-${inst.color}-500 h-1.5 rounded-full`} style={{ width: `${inst.pct}%` }}></div>
                </div>
                <div className="text-right text-xs text-gray-400 mt-1">{inst.pct}% del total</div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100">
                <div>
                  <span className="block text-xs text-gray-400">Plazo</span>
                  <span className="font-semibold text-gray-800 text-sm">{inst.plazo}</span>
                </div>
                <div>
                  <span className="block text-xs text-gray-400">Tasa (TEA)</span>
                  <span className="font-semibold text-gray-800 text-sm">{inst.tasa}</span>
                </div>
              </div>
            </div>

            {/* Hover Reveal: Costo */}
            <div className={`
              absolute bottom-0 left-0 w-full bg-${inst.color}-600 p-4 text-white transition-transform duration-300
              ${hoveredInstrument === inst.id ? 'translate-y-0' : 'translate-y-full'}
            `}>
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">Costo desp. imp.</span>
                <span className="font-black text-xl">{inst.costo}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen Row */}
      <div className="bg-gradient-to-r from-[#0B1B3D] to-blue-900 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h4 className="text-blue-300 font-bold uppercase tracking-widest text-xs mb-1">Total Financiamiento</h4>
          <span className="text-4xl font-black">39,830 <span className="text-lg font-medium text-blue-200">Miles S/</span></span>
        </div>
        <div className="h-12 w-px bg-white/20 hidden md:block"></div>
        <div>
          <h4 className="text-blue-300 font-bold uppercase tracking-widest text-xs mb-1">Tasa Promedio</h4>
          <span className="text-3xl font-black">9.6%</span>
        </div>
        <div className="h-12 w-px bg-white/20 hidden md:block"></div>
        <div>
          <h4 className="text-emerald-300 font-bold uppercase tracking-widest text-xs mb-1">Costo Promedio (Desp. Imp.)</h4>
          <span className="text-3xl font-black text-emerald-400">7.4%</span>
        </div>
      </div>
    </div>
  );

  const renderEstructura = () => (
    <div className="animate-fade-in-up grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Estructura Deuda vs Patrimonio */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <i className="ph-scales text-9xl"></i>
        </div>
        <h3 className="text-2xl font-black text-[#0B1B3D] mb-8 relative z-10">Estructura Resultante</h3>
        
        <div className="space-y-6 relative z-10">
          <div className="group">
            <div className="flex justify-between items-end mb-2">
              <div>
                <span className="text-sm font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded mb-1 inline-block">84.1%</span>
                <h4 className="text-lg font-bold text-gray-900">Deuda Total</h4>
                <p className="text-xs text-gray-500">Corto + largo plazo</p>
              </div>
              <span className="text-2xl font-black text-gray-800">S/ 33,500</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full transition-all duration-1000" style={{ width: '84.1%' }}></div>
            </div>
          </div>

          <div className="group">
            <div className="flex justify-between items-end mb-2">
              <div>
                <span className="text-sm font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded mb-1 inline-block">15.9%</span>
                <h4 className="text-lg font-bold text-gray-900">Patrimonio</h4>
                <p className="text-xs text-gray-500">Aporte propio / utilidades</p>
              </div>
              <span className="text-2xl font-black text-gray-800">S/ 6,330</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-400 to-purple-500 h-full rounded-full transition-all duration-1000" style={{ width: '15.9%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparativa de Tasas */}
      <div className="bg-[#0B1B3D] rounded-3xl p-8 shadow-xl relative overflow-hidden flex flex-col justify-center">
        <div className="absolute bottom-0 right-0 p-8 opacity-10">
          <i className="ph-trend-up text-9xl text-white"></i>
        </div>
        <h3 className="text-2xl font-black text-white mb-8 relative z-10">Creación de Valor</h3>

        <div className="space-y-8 relative z-10">
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 flex-shrink-0">
              <span className="text-xl font-black text-emerald-400">7.4%</span>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg">Costo Promedio (WACC Real)</h4>
              <p className="text-blue-200 text-sm">Costo ponderado de la estrategia mixta (desp. impuestos)</p>
            </div>
          </div>

          <div className="flex items-center gap-4 opacity-75">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 flex-shrink-0">
              <span className="text-xl font-black text-white">8.7%</span>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg">WACC de Referencia</h4>
              <p className="text-blue-200 text-sm">Costo de capital teórico del proyecto</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-white/10">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30 flex-shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <span className="text-xl font-black text-blue-400">18.9%</span>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg">TIR del Proyecto</h4>
              <p className="text-blue-200 text-sm">Rentabilidad esperada de la inversión</p>
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
        <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Fuentes de Financiamiento</h1>
        <p className="text-gray-500 mt-2 font-medium">Análisis detallado de la estrategia mixta (monetario + capitales) seleccionada.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 w-max max-w-full overflow-x-auto">
        {[
          { id: 'instrumentos', label: 'Estrategia Propuesta', icon: 'ph-bank' },
          { id: 'estructura', label: 'Estructura Resultante y Conclusión', icon: 'ph-chart-pie-slice' }
        ].map(tab => (
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

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === 'instrumentos' && renderInstrumentos()}
        {activeTab === 'estructura' && renderEstructura()}
      </div>

    </div>
  );
};
