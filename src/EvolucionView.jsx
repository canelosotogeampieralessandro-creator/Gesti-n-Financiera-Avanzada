import React from "react";

export const EvolucionView = () => {
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
        } catch (err) {
            console.error("Error in renderLineChart:", err);
            return <div>Error in chart</div>;
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
    } catch (err) {
        console.error("Error in EvolucionView:", err);
        return <div>Error in EvolucionView</div>;
    }
};
