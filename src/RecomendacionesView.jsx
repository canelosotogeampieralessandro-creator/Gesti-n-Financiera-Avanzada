import React from 'react';

export const RecomendacionesView = () => {
  const recomendaciones = [
    {
      id: 1,
      title: 'Ejecutar la Modernización a Harina Prime',
      text: 'Llevar a cabo la modernización (Steam Dried) de forma expedita para elevar el mix hacia harina de mayor precio de exportación, mejorar el rendimiento de aceite y reducir el costo energético, revirtiendo la compresión histórica de márgenes.',
      icon: 'ph-factory',
      color: 'emerald'
    },
    {
      id: 2,
      title: 'Consolidar Políticas de Capital de Trabajo',
      text: 'Consolidar la mejora de liquidez alcanzada con el presupuesto 2026 formalizando las políticas de cobranza (90% de ventas al crédito) y pago a proveedores (80% de compras), para no retroceder a los frágiles niveles de liquidez del 2025.',
      icon: 'ph-handshake',
      color: 'blue'
    },
    {
      id: 3,
      title: 'Monitoreo Anual del Modelo Proyectado',
      text: 'Monitorear anualmente los supuestos clave de la proyección a largo plazo (crecimiento de ventas 6% anual, ratio de costo 70.9%) contra los resultados reales, ajustando el modelo si el mix de harina prime no alcanza el premium de precio esperado.',
      icon: 'ph-chart-polar',
      color: 'amber'
    },
    {
      id: 4,
      title: 'Reperfilar y Ordenar la Deuda',
      text: 'Migrar deuda de corto a largo plazo mediante la emisión de bonos corporativos, reduciendo la presión de refinanciación; fijar un apalancamiento objetivo y cuidar los covenants financieros para preservar la solvencia a largo plazo.',
      icon: 'ph-bank',
      color: 'rose'
    }
  ];

  const getColorClasses = (color) => {
    const classes = {
        emerald: { bg: 'bg-emerald-600', text: 'text-emerald-600', border: 'border-emerald-200', gradient: 'from-emerald-50 to-white', shadow: 'shadow-emerald-200' },
        blue: { bg: 'bg-blue-600', text: 'text-blue-600', border: 'border-blue-200', gradient: 'from-blue-50 to-white', shadow: 'shadow-blue-200' },
        amber: { bg: 'bg-amber-500', text: 'text-amber-600', border: 'border-amber-200', gradient: 'from-amber-50 to-white', shadow: 'shadow-amber-200' },
        rose: { bg: 'bg-rose-600', text: 'text-rose-600', border: 'border-rose-200', gradient: 'from-rose-50 to-white', shadow: 'shadow-rose-200' }
    };
    return classes[color];
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-50/50 rounded-2xl p-4 md:p-8 overflow-y-auto">
      
      <div className="mb-10 text-center animate-fade-in-up">
        <h1 className="text-4xl font-black text-[#0B1B3D] tracking-tight uppercase mb-4">Recomendaciones Estratégicas</h1>
        <p className="text-gray-500 text-lg max-w-3xl mx-auto">
          Basado en el análisis financiero y la simulación presupuestaria, se proponen las siguientes directrices operativas y directivas para asegurar la sostenibilidad del negocio.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
        {recomendaciones.map((rec, index) => {
            const colors = getColorClasses(rec.color);
            return (
                <div 
                    key={rec.id} 
                    className={`flex flex-col h-full bg-gradient-to-b ${colors.gradient} border ${colors.border} rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in-up hover:-translate-y-1 group`}
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    <div className="flex items-start gap-4 mb-4">
                        <div className={`flex-shrink-0 w-16 h-16 rounded-2xl ${colors.bg} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                            <i className={`${rec.icon} text-3xl`}></i>
                        </div>
                        <h2 className="text-xl font-black text-gray-900 leading-tight pt-2">{rec.title}</h2>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed text-justify mt-2 flex-grow">
                        {rec.text}
                    </p>
                    
                    <div className="mt-6 flex items-center gap-2 text-sm font-bold text-gray-400">
                        <div className={`w-6 h-1 rounded-full ${colors.bg}`}></div>
                        Recomendación 0{index + 1}
                    </div>
                </div>
            )
        })}
      </div>

    </div>
  );
};
