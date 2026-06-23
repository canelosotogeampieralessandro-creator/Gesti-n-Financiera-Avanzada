import React, { createContext, useState, useContext, useEffect } from 'react';

// Valores base iniciales (Miles de US$)
const INITIAL_STATE = {
    deuda: 300000,
    patrimonio: 317089,
    ebitda: 100000,
    gastosFinancieros: 27807,
    tasaImpuesto: 0.295, // 29.5%
    kd: 0.0926, // 9.26%
    ke: 0.124,  // 12.4%
};

const SimulationContext = createContext();

export const useSimulation = () => useContext(SimulationContext);

export const SimulationProvider = ({ children }) => {
    const [financialData, setFinancialData] = useState(INITIAL_STATE);
    const [metrics, setMetrics] = useState({
        wacc: 0,
        ratioDeudaPatrimonio: 0,
        coberturaIntereses: 0,
        pesoDeuda: 0,
        pesoPatrimonio: 0
    });

    // Función para recalcular todas las métricas derivadas
    const calculateMetrics = (data) => {
        const { deuda, patrimonio, ebitda, gastosFinancieros, tasaImpuesto, kd, ke } = data;
        
        const valorTotal = deuda + patrimonio;
        const pesoDeuda = deuda / valorTotal;
        const pesoPatrimonio = patrimonio / valorTotal;
        
        // WACC = Wd * Kd * (1-T) + We * Ke
        const costoDeudaDespuesImpuestos = kd * (1 - tasaImpuesto);
        const wacc = (pesoDeuda * costoDeudaDespuesImpuestos) + (pesoPatrimonio * ke);
        
        // Ratios
        const ratioDeudaPatrimonio = deuda / patrimonio;
        const coberturaIntereses = gastosFinancieros > 0 ? (ebitda / gastosFinancieros) : 0;

        setMetrics({
            wacc,
            ratioDeudaPatrimonio,
            coberturaIntereses,
            pesoDeuda,
            pesoPatrimonio,
            costoDeudaDespuesImpuestos
        });
    };

    // Recalcular inicialmente y cada vez que cambie financialData
    useEffect(() => {
        calculateMetrics(financialData);
    }, [financialData]);

    // Métodos para actualizar el estado (serán usados por los simuladores)
    const updateSimulation = (updates) => {
        setFinancialData(prev => ({ ...prev, ...updates }));
    };

    const resetSimulation = () => {
        setFinancialData(INITIAL_STATE);
    };

    return (
        <SimulationContext.Provider value={{ financialData, metrics, updateSimulation, resetSimulation }}>
            {children}
        </SimulationContext.Provider>
    );
};
