import React from 'react';

export const ConclusionesView = () => {
  const conclusiones = [
    {
      id: 1,
      title: 'Reversión Histórica de la Liquidez (Corto Plazo)',
      text: 'El presupuesto operativo 2026 revierte la posición de liquidez: la liquidez corriente pasa de 0.82 (2025 real) a 1.08 y el capital de trabajo pasa de negativo (US$ -64.3 MM) a positivo (US$ +24.5 MM), impulsado por el crecimiento de ventas (Harina, Aceite, Pota) y la política de cobros/pagos definida.',
      highlight: '1.08',
      highlightLabel: 'Liquidez Corriente 2026',
      icon: 'ph-drop',
      color: 'blue'
    },
    {
      id: 2,
      title: 'Crecimiento Sostenido a Largo Plazo (2027-2031)',
      text: 'La proyección a largo plazo (2027-2031) muestra crecimiento sostenido de la utilidad neta, de US$ 59.8 MM (2027) a US$ 84.1 MM (2031), impulsada por el crecimiento de ventas (6% anual) y el efecto incremental del Proyecto de Modernización (harina prime).',
      highlight: '+40.6%',
      highlightLabel: 'Crecimiento Utilidad Neta (27-31)',
      icon: 'ph-trend-up',
      color: 'emerald'
    },
    {
      id: 3,
      title: 'Optimización Estructural del Financiamiento',
      text: 'La estrategia de financiamiento elegida para el Proyecto de Modernización demostró ser óptima. Al combinar un aporte de capital equilibrado con instrumentos de deuda de largo plazo (Bonos Corporativos y Leasing), Exalmar logra fondear el proyecto sin asfixiar el apalancamiento a corto plazo, protegiendo sus márgenes operativos.',
      highlight: 'Óptima',
      highlightLabel: 'Estructura de Capital',
      icon: 'ph-scales',
      color: 'rose'
    },
    {
      id: 4,
      title: 'Blindaje Financiero frente a Volatilidad',
      text: 'La eficiente gestión del ciclo de capital de trabajo y la agresiva generación de flujo de efectivo operativo proyectada a 5 años, crean un escudo o "blindaje financiero". Esto le otorga a la empresa una enorme capacidad de maniobra frente a factores externos (como el Fenómeno de El Niño) sin depender de nuevo endeudamiento de emergencia.',
      highlight: 'Fuerte',
      highlightLabel: 'Resiliencia Operativa',
      icon: 'ph-shield-check',
      color: 'amber'
    }
  ];

  const getColorClasses = (color) => {
    const classes = {
        blue: { bg: 'bg-blue-600', text: 'text-blue-600', border: 'border-blue-200', lightBg: 'bg-blue-50', gradient: 'from-blue-50 to-white' },
        emerald: { bg: 'bg-emerald-600', text: 'text-emerald-600', border: 'border-emerald-200', lightBg: 'bg-emerald-50', gradient: 'from-emerald-50 to-white' },
        rose: { bg: 'bg-rose-600', text: 'text-rose-600', border: 'border-rose-200', lightBg: 'bg-rose-50', gradient: 'from-rose-50 to-white' },
        amber: { bg: 'bg-amber-500', text: 'text-amber-600', border: 'border-amber-200', lightBg: 'bg-amber-50', gradient: 'from-amber-50 to-white' }
    };
    return classes[color];
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-50/50 rounded-2xl p-4 md:p-8 overflow-y-auto">
      
      <div className="mb-10 text-center animate-fade-in-up">
        <h1 className="text-4xl font-black text-[#0B1B3D] tracking-tight uppercase mb-4">Conclusiones Finales</h1>
        <p className="text-gray-500 text-lg max-w-3xl mx-auto">
          Tras la evaluación exhaustiva del presupuesto y la modelación a 5 años, estas son las conclusiones más destacadas sobre el impacto del Proyecto de Modernización y la salud financiera de la compañía.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
        {conclusiones.map((c, index) => {
            const colors = getColorClasses(c.color);
            return (
                <div 
                    key={c.id} 
                    className={`relative rounded-3xl p-8 bg-gradient-to-br ${colors.gradient} border ${colors.border} shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up`}
                    style={{ animationDelay: `${index * 150}ms` }}
                >
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                        <i className={`${c.icon} text-8xl ${colors.text}`}></i>
                    </div>
                    
                    <div className={`w-14 h-14 rounded-2xl ${colors.bg} text-white flex items-center justify-center shadow-md mb-6`}>
                        <i className={`${c.icon} text-3xl`}></i>
                    </div>
                    
                    <h2 className="text-xl font-black text-gray-900 mb-4 pr-10">{c.title}</h2>
                    
                    <p className="text-gray-600 leading-relaxed mb-8 relative z-10">
                        {c.text}
                    </p>
                    
                    <div className={`mt-auto inline-flex flex-col border-l-4 ${colors.border} pl-4`}>
                        <span className={`text-3xl font-black ${colors.text}`}>{c.highlight}</span>
                        <span className="text-sm font-bold text-gray-500 uppercase tracking-wider mt-1">{c.highlightLabel}</span>
                    </div>
                </div>
            )
        })}
      </div>

    </div>
  );
};
