import React, { useState } from 'react';

export const Proyeccion5AnosView = () => {
  const [activeTab, setActiveTab] = useState('supuestos'); // supuestos, er, ffe, es
  const [growthRate, setGrowthRate] = useState(6.0); // 6.0% default

  const formatNum = (val, isNegative = false) => {
    const rounded = Math.round(val);
    const formatted = new Intl.NumberFormat('en-US').format(Math.abs(rounded));
    return isNegative || rounded < 0 ? `(${formatted})` : formatted;
  };

  const years = [2026, 2027, 2028, 2029, 2030, 2031];

  // ==========================================
  // SUPUESTOS FIJOS
  // ==========================================
  const ratios = {
    costoVentas: 0.709,
    gastosOp: 0.082,
    otrosIngresos: -0.014,
    rendimientoEfectivo: 0.03,
    tasaPart: 0.10,
    tasaIR: 0.295,
    gastoFinanciero: -18824,
    depreciacionAmort: 21903,
    depreciacionProyecto: 969,
    
    // Ratios Balance
    cxC: 0.100,
    mp: 0.025,
    pt: 0.209,
    cxP: 0.148,
  };

  const efectoProyectoEBIT = {
    2026: 0, 2027: 2967, 2028: 3093, 2029: 3223, 2030: 3357, 2031: 3494
  };

  // Base 2026 for Balance calculations
  const balance2026 = {
    efectivo: 193888,
    cxc: 50520,
    mp: 8902,
    pt: 74713,
    ktProyecto: 933,
    intangibles: 223990, // Neto
    activoFijo: 206619, // Neto
    otrasInv: 157685,
    cxp: 53152,
    deudaBancaria: 212750,
    irPorPagar: 27999,
    partPorPagar: 10546,
    obligaciones: 227113,
    capital: 161181,
    reservas: 157596,
    utilidadesRetenidas: 0,
    utilidadEjercicio: 66913,
  };

  // ==========================================
  // MOTOR DE CÁLCULO
  // ==========================================
  const generateProjections = () => {
    let data = {};
    
    let lastEfectivo = balance2026.efectivo;
    let lastIntangibles = balance2026.intangibles; // simplificado: se resta amort? El caso lo une. 
    let lastActivoFijo = balance2026.activoFijo;
    let lastUtilidadRetenida = balance2026.utilidadesRetenidas + balance2026.utilidadEjercicio;
    
    // Para simplificar la depreciacion/amortización que disminuye los activos no circulantes:
    // La imagen de ES dice que el Activo Fijo baja e Intangibles bajan cada año. 
    // Intangibles baja ~9,333/año. Activo fijo baja ~(12,570 + 969) = 13,539/año.
    // Usaremos un aproximado basado en la tabla para cuadrar:
    let amortIntangiblesAnual = 9333;
    let depActivoFijoAnual = 12570 + 969; // 13539

    years.forEach((yr, idx) => {
        if (yr === 2026) {
            data[yr] = {
                ventas: 505203,
                costoVentas: -358318,
                utilidadBruta: 146885,
                gastosOp: -41427,
                efectoProyecto: 0,
                utilidadOperativa: 105459,
                ingresoFin: 0,
                gastoFin: 0,
                otrosIngresos: 0,
                uapi: 94173, // Aproximado para 2026 (usando base real)
                part: -9417,
                uai: 84756,
                ir: -25003,
                utilidadNeta: 66913,
                
                // Balance
                efectivo: balance2026.efectivo,
                cxc: balance2026.cxc,
                mp: balance2026.mp,
                pt: balance2026.pt,
                ktProyecto: balance2026.ktProyecto,
                intangibles: balance2026.intangibles,
                activoFijo: balance2026.activoFijo,
                otrasInv: balance2026.otrasInv,
                cxp: balance2026.cxp,
                deudaBancaria: balance2026.deudaBancaria,
                irPorPagar: balance2026.irPorPagar,
                partPorPagar: balance2026.partPorPagar,
                obligaciones: balance2026.obligaciones,
                capital: balance2026.capital,
                reservas: balance2026.reservas,
                utilidadesRetenidas: 0,
                
                // Flujo
                f_ope: 0, f_inv: 0, f_fin: 0, f_neto: 0
            };
            return;
        }

        const prev = data[years[idx-1]];

        // ER
        const ventas = prev.ventas * (1 + (growthRate / 100));
        const costoVentas = -ventas * ratios.costoVentas;
        const utilidadBruta = ventas + costoVentas;
        const gastosOp = -ventas * ratios.gastosOp;
        const efectoProyecto = efectoProyectoEBIT[yr];
        const utilidadOperativa = utilidadBruta + gastosOp + efectoProyecto;
        
        const ingresoFin = prev.efectivo * ratios.rendimientoEfectivo;
        const gastoFin = ratios.gastoFinanciero;
        const otrosIngresos = ventas * ratios.otrosIngresos;
        
        const uapi = utilidadOperativa + ingresoFin + gastoFin + otrosIngresos;
        const part = -uapi * ratios.tasaPart;
        const uai = uapi + part;
        const ir = -uai * ratios.tasaIR;
        const utilidadNeta = uai + ir;

        // Balance Circulante
        const cxc = ventas * ratios.cxC;
        const mp = Math.abs(costoVentas) * ratios.mp;
        const pt = Math.abs(costoVentas) * ratios.pt;
        const ktProyecto = 933; // Constante

        const cxp = Math.abs(costoVentas) * ratios.cxP;
        const irPorPagar = Math.abs(ir);
        const partPorPagar = Math.abs(part);

        // Balance No Circulante
        lastIntangibles = lastIntangibles - amortIntangiblesAnual;
        lastActivoFijo = lastActivoFijo - depActivoFijoAnual;

        // Patrimonio
        let utilidadesRetenidasYr = prev.utilidadesRetenidas + prev.utilidadNeta;

        // Flujo (Indirecto)
        const v_cxc = prev.cxc - cxc;
        const v_mp = prev.mp - mp;
        const v_pt = prev.pt - pt;
        const v_cxp = cxp - prev.cxp;
        const v_ir = irPorPagar - prev.irPorPagar;
        const v_part = partPorPagar - prev.partPorPagar;

        const f_ope = utilidadNeta + ratios.depreciacionAmort + ratios.depreciacionProyecto + v_cxc + v_mp + v_pt + v_cxp + v_ir + v_part;
        const f_inv = 0;
        const f_fin = 0;
        const f_neto = f_ope + f_inv + f_fin;
        
        lastEfectivo = prev.efectivo + f_neto;

        data[yr] = {
            ventas, costoVentas, utilidadBruta, gastosOp, efectoProyecto, utilidadOperativa,
            ingresoFin, gastoFin, otrosIngresos, uapi, part, uai, ir, utilidadNeta,
            
            cxc, mp, pt, ktProyecto, cxp, irPorPagar, partPorPagar,
            intangibles: lastIntangibles, activoFijo: lastActivoFijo, otrasInv: balance2026.otrasInv,
            deudaBancaria: balance2026.deudaBancaria, obligaciones: balance2026.obligaciones,
            capital: balance2026.capital, reservas: balance2026.reservas, utilidadesRetenidas: utilidadesRetenidasYr,
            efectivo: lastEfectivo,
            
            v_cxc, v_mp, v_pt, v_cxp, v_ir, v_part, f_ope, f_inv, f_fin, f_neto
        };
    });
    return data;
  };

  const projections = generateProjections();

  // ==========================================
  // RENDERERS
  // ==========================================
  const renderSupuestos = () => (
      <div className="animate-fade-in-up space-y-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-[#0B1B3D] p-4 px-6 flex justify-between items-center">
                <h3 className="text-white font-bold text-lg flex items-center">
                    <i className="ph-sliders text-blue-400 text-2xl mr-3"></i>
                    Supuestos del Modelo
                </h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                <div>
                    <h4 className="font-black text-gray-800 mb-4 border-b border-gray-100 pb-2">Ratios Operativos</h4>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between text-gray-600"><span className="font-bold text-gray-800">Crecimiento Ventas</span> <span className="text-blue-600 font-bold bg-blue-50 px-2 rounded">{growthRate.toFixed(1)}%</span></div>
                        <div className="flex justify-between text-gray-600"><span>Costo de Ventas / Ventas</span> <span>70.9%</span></div>
                        <div className="flex justify-between text-gray-600"><span>Gastos Op. / Ventas</span> <span>8.2%</span></div>
                        <div className="flex justify-between text-gray-600"><span>Otros Ingresos / Ventas</span> <span>-1.4%</span></div>
                        <div className="flex justify-between text-gray-600"><span>Rendimiento Efectivo</span> <span>3.0%</span></div>
                    </div>
                </div>
                <div>
                    <h4 className="font-black text-gray-800 mb-4 border-b border-gray-100 pb-2">Políticas de Capital de Trabajo</h4>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between text-gray-600"><span>Cuentas por Cobrar / Ventas</span> <span>10.0%</span></div>
                        <div className="flex justify-between text-gray-600"><span>Materia Prima / Costo Ventas</span> <span>2.5%</span></div>
                        <div className="flex justify-between text-gray-600"><span>Prod. Terminados / Costo Ventas</span> <span>20.9%</span></div>
                        <div className="flex justify-between text-gray-600"><span>Cuentas por Pagar / Costo Ventas</span> <span>14.8%</span></div>
                    </div>
                </div>
                <div className="md:col-span-2 bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <p className="text-xs text-gray-500 italic text-center">Toda la deuda bancaria, obligaciones financieras y estructura de capital social se mantienen constantes sin nuevas emisiones ni amortizaciones en el horizonte proyectado (2027-2031).</p>
                </div>
            </div>
        </div>
      </div>
  );

  const renderER = () => (
    <div className="animate-fade-in-up bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-[#0B1B3D] to-blue-900 p-4 px-6">
        <h3 className="text-white font-bold text-lg flex items-center">
            <i className="ph-chart-line-up text-blue-300 text-2xl mr-3"></i>
            Estado de Resultados 2026-2031
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Concepto (Miles US$)</th>
              {years.map(y => <th key={y} className={`px-4 py-3 ${y===2026?'bg-blue-50/50 text-blue-900':''}`}>{y}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr className="hover:bg-gray-50"><td className="px-4 py-3 text-left text-gray-700">Ventas</td>{years.map(y => <td key={y} className="px-4 py-3 font-bold">{formatNum(projections[y].ventas)}</td>)}</tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-3 text-left text-red-500">Costo de Ventas</td>{years.map(y => <td key={y} className="px-4 py-3 text-red-500">{formatNum(projections[y].costoVentas, true)}</td>)}</tr>
            <tr className="bg-blue-50/30"><td className="px-4 py-3 text-left font-black text-blue-900">Utilidad Bruta</td>{years.map(y => <td key={y} className="px-4 py-3 font-black text-blue-800">{formatNum(projections[y].utilidadBruta)}</td>)}</tr>
            
            <tr className="hover:bg-gray-50"><td className="px-4 py-3 text-left text-red-500">Gastos Op. y Admin.</td>{years.map(y => <td key={y} className="px-4 py-3 text-red-500">{formatNum(projections[y].gastosOp, true)}</td>)}</tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-3 text-left text-emerald-600 font-bold text-xs">Efecto Proyecto (EBIT)</td>{years.map(y => <td key={y} className="px-4 py-3 text-emerald-600 font-bold">{formatNum(projections[y].efectoProyecto)}</td>)}</tr>
            
            <tr className="bg-blue-50/30"><td className="px-4 py-3 text-left font-black text-blue-900">Utilidad Operativa</td>{years.map(y => <td key={y} className="px-4 py-3 font-black text-blue-800">{formatNum(projections[y].utilidadOperativa)}</td>)}</tr>
            
            <tr className="hover:bg-gray-50"><td className="px-4 py-3 text-left text-gray-600">Ingresos financieros</td>{years.map(y => <td key={y} className="px-4 py-3 text-gray-600">{y === 2026 ? '' : formatNum(projections[y].ingresoFin)}</td>)}</tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-3 text-left text-red-500">Gastos financieros</td>{years.map(y => <td key={y} className="px-4 py-3 text-red-500">{y === 2026 ? '' : formatNum(projections[y].gastoFin, true)}</td>)}</tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-3 text-left text-gray-600">Otros ingresos netos</td>{years.map(y => <td key={y} className="px-4 py-3 text-gray-600">{y === 2026 ? '' : formatNum(projections[y].otrosIngresos, true)}</td>)}</tr>
            
            <tr className="hover:bg-gray-50"><td className="px-4 py-3 text-left font-bold text-gray-800">UAPI</td>{years.map(y => <td key={y} className="px-4 py-3 font-bold">{formatNum(projections[y].uapi)}</td>)}</tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-3 text-left text-red-500">Part. Trabajadores</td>{years.map(y => <td key={y} className="px-4 py-3 text-red-500">{formatNum(projections[y].part, true)}</td>)}</tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-3 text-left font-bold text-gray-800">UAI</td>{years.map(y => <td key={y} className="px-4 py-3 font-bold">{formatNum(projections[y].uai)}</td>)}</tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-3 text-left text-red-500">Impuesto a la Renta</td>{years.map(y => <td key={y} className="px-4 py-3 text-red-500">{formatNum(projections[y].ir, true)}</td>)}</tr>
            
            <tr className="bg-emerald-500 text-white border-t-2 border-emerald-600">
                <td className="px-4 py-4 text-left font-black text-base uppercase">Utilidad Neta</td>
                {years.map(y => <td key={y} className="px-4 py-4 font-black text-lg">{formatNum(projections[y].utilidadNeta)}</td>)}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderFFE = () => (
    <div className="animate-fade-in-up bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-teal-700 to-teal-500 p-4 px-6">
        <h3 className="text-white font-bold text-lg flex items-center">
            <i className="ph-coins text-teal-100 text-2xl mr-3"></i>
            Flujo de Efectivo 2027-2031 (Indirecto)
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Concepto</th>
              {years.slice(1).map(y => <th key={y} className="px-4 py-3">{y}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr className="bg-gray-50 font-bold text-left"><td colSpan="6" className="px-4 py-2">ACTIVIDADES DE OPERACIÓN</td></tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-2 text-left font-bold text-emerald-600">Utilidad Neta</td>{years.slice(1).map(y => <td key={y} className="px-4 py-2 font-bold text-emerald-600">{formatNum(projections[y].utilidadNeta)}</td>)}</tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-2 text-left text-gray-600">(+) Deprec. y Amortización</td>{years.slice(1).map(y => <td key={y} className="px-4 py-2">{formatNum(ratios.depreciacionAmort)}</td>)}</tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-2 text-left text-gray-600">(+) Deprec. Proyecto</td>{years.slice(1).map(y => <td key={y} className="px-4 py-2">{formatNum(ratios.depreciacionProyecto)}</td>)}</tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-2 text-left text-gray-600">(+/-) Variación CxC</td>{years.slice(1).map(y => <td key={y} className={`px-4 py-2 ${projections[y].v_cxc<0?'text-red-500':''}`}>{formatNum(projections[y].v_cxc, projections[y].v_cxc<0)}</td>)}</tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-2 text-left text-gray-600">(+/-) Variación MP</td>{years.slice(1).map(y => <td key={y} className={`px-4 py-2 ${projections[y].v_mp<0?'text-red-500':''}`}>{formatNum(projections[y].v_mp, projections[y].v_mp<0)}</td>)}</tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-2 text-left text-gray-600">(+/-) Variación PT</td>{years.slice(1).map(y => <td key={y} className={`px-4 py-2 ${projections[y].v_pt<0?'text-red-500':''}`}>{formatNum(projections[y].v_pt, projections[y].v_pt<0)}</td>)}</tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-2 text-left text-gray-600">(+/-) Variación CxP</td>{years.slice(1).map(y => <td key={y} className={`px-4 py-2 ${projections[y].v_cxp<0?'text-red-500':''}`}>{formatNum(projections[y].v_cxp, projections[y].v_cxp<0)}</td>)}</tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-2 text-left text-gray-600">(+/-) Variación IR por Pagar</td>{years.slice(1).map(y => <td key={y} className={`px-4 py-2 ${projections[y].v_ir<0?'text-red-500':''}`}>{formatNum(projections[y].v_ir, projections[y].v_ir<0)}</td>)}</tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-2 text-left text-gray-600">(+/-) Variación Part. por Pagar</td>{years.slice(1).map(y => <td key={y} className={`px-4 py-2 ${projections[y].v_part<0?'text-red-500':''}`}>{formatNum(projections[y].v_part, projections[y].v_part<0)}</td>)}</tr>
            <tr className="bg-teal-50"><td className="px-4 py-3 text-left font-black text-teal-900">EFECTIVO NETO OPERACIÓN</td>{years.slice(1).map(y => <td key={y} className="px-4 py-3 font-black text-teal-800">{formatNum(projections[y].f_ope)}</td>)}</tr>
            
            <tr className="bg-gray-50 font-bold text-left"><td colSpan="6" className="px-4 py-2 border-t border-gray-200">INVERSIÓN Y FINANCIAMIENTO</td></tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-2 text-left text-gray-600">Flujo Inversión (0)</td>{years.slice(1).map(y => <td key={y} className="px-4 py-2">-</td>)}</tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-2 text-left text-gray-600">Flujo Financiamiento (0)</td>{years.slice(1).map(y => <td key={y} className="px-4 py-2">-</td>)}</tr>
            
            <tr className="bg-[#0B1B3D] text-white border-t-2 border-blue-900">
                <td className="px-4 py-3 text-left font-black text-base">Aumento Neto de Efectivo</td>
                {years.slice(1).map(y => <td key={y} className="px-4 py-3 font-bold text-teal-300">{formatNum(projections[y].f_neto)}</td>)}
            </tr>
            <tr className="bg-blue-900 text-blue-200">
                <td className="px-4 py-2 text-left">Saldo Inicial Efectivo</td>
                {years.slice(1).map(y => <td key={y} className="px-4 py-2">{formatNum(projections[y-1].efectivo)}</td>)}
            </tr>
            <tr className="bg-teal-500 text-white border-t-2 border-teal-600">
                <td className="px-4 py-4 text-left font-black text-lg">SALDO FINAL EFECTIVO</td>
                {years.slice(1).map(y => <td key={y} className="px-4 py-4 font-black text-xl drop-shadow-md">{formatNum(projections[y].efectivo)}</td>)}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderES = () => (
    <div className="animate-fade-in-up bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-500 p-4 px-6">
        <h3 className="text-white font-bold text-lg flex items-center">
            <i className="ph-buildings text-emerald-100 text-2xl mr-3"></i>
            Estado de Situación 2026-2031
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Concepto</th>
              {years.map(y => <th key={y} className={`px-4 py-3 ${y===2026?'bg-blue-50/50 text-blue-900':''}`}>{y}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr className="bg-gray-100 font-bold text-left"><td colSpan="7" className="px-4 py-2">ACTIVO CIRCULANTE</td></tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-2 text-left text-gray-700 font-bold text-emerald-600">Efectivo</td>{years.map(y => <td key={y} className="px-4 py-2 font-bold text-emerald-600">{formatNum(projections[y].efectivo)}</td>)}</tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-2 text-left text-gray-600">Cuentas por Cobrar</td>{years.map(y => <td key={y} className="px-4 py-2">{formatNum(projections[y].cxc)}</td>)}</tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-2 text-left text-gray-600">Materia Prima</td>{years.map(y => <td key={y} className="px-4 py-2">{formatNum(projections[y].mp)}</td>)}</tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-2 text-left text-gray-600">Prod. Terminados</td>{years.map(y => <td key={y} className="px-4 py-2">{formatNum(projections[y].pt)}</td>)}</tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-2 text-left text-gray-600 text-xs">KT Proyecto</td>{years.map(y => <td key={y} className="px-4 py-2 text-xs">{formatNum(projections[y].ktProyecto)}</td>)}</tr>
            <tr className="bg-emerald-50"><td className="px-4 py-3 text-left font-black text-emerald-900">TOTAL CIRCULANTE</td>{years.map(y => <td key={y} className="px-4 py-3 font-bold text-emerald-800">{formatNum(projections[y].efectivo + projections[y].cxc + projections[y].mp + projections[y].pt + projections[y].ktProyecto)}</td>)}</tr>
            
            <tr className="bg-gray-100 font-bold text-left"><td colSpan="7" className="px-4 py-2">ACTIVO NO CIRCULANTE</td></tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-2 text-left text-gray-600">Intangibles</td>{years.map(y => <td key={y} className="px-4 py-2">{formatNum(projections[y].intangibles)}</td>)}</tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-2 text-left text-gray-600">Activo Fijo</td>{years.map(y => <td key={y} className="px-4 py-2">{formatNum(projections[y].activoFijo)}</td>)}</tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-2 text-left text-gray-600">Otras Inv.</td>{years.map(y => <td key={y} className="px-4 py-2">{formatNum(projections[y].otrasInv)}</td>)}</tr>
            <tr className="bg-emerald-50"><td className="px-4 py-3 text-left font-black text-emerald-900">TOTAL NO CIRCULANTE</td>{years.map(y => <td key={y} className="px-4 py-3 font-bold text-emerald-800">{formatNum(projections[y].intangibles + projections[y].activoFijo + projections[y].otrasInv)}</td>)}</tr>
            
            <tr className="bg-emerald-600 text-white"><td className="px-4 py-4 text-left font-black text-lg">TOTAL ACTIVO</td>{years.map(y => {
                const total = projections[y].efectivo + projections[y].cxc + projections[y].mp + projections[y].pt + projections[y].ktProyecto + projections[y].intangibles + projections[y].activoFijo + projections[y].otrasInv;
                return <td key={y} className="px-4 py-4 font-black">{formatNum(total)}</td>
            })}</tr>

            {/* PASIVOS */}
            <tr className="bg-gray-100 font-bold text-left"><td colSpan="7" className="px-4 py-2 mt-4">PASIVO CIRCULANTE</td></tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-2 text-left text-gray-600">Cuentas por Pagar</td>{years.map(y => <td key={y} className="px-4 py-2">{formatNum(projections[y].cxp)}</td>)}</tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-2 text-left text-gray-600">Deuda Bancaria</td>{years.map(y => <td key={y} className="px-4 py-2">{formatNum(projections[y].deudaBancaria)}</td>)}</tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-2 text-left text-gray-600">IR por Pagar</td>{years.map(y => <td key={y} className="px-4 py-2">{formatNum(projections[y].irPorPagar)}</td>)}</tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-2 text-left text-gray-600">Part. por Pagar</td>{years.map(y => <td key={y} className="px-4 py-2">{formatNum(projections[y].partPorPagar)}</td>)}</tr>
            
            <tr className="bg-gray-100 font-bold text-left"><td colSpan="7" className="px-4 py-2">PASIVO NO CIRCULANTE</td></tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-2 text-left text-gray-600">Obligaciones</td>{years.map(y => <td key={y} className="px-4 py-2">{formatNum(projections[y].obligaciones)}</td>)}</tr>
            <tr className="bg-rose-50"><td className="px-4 py-3 text-left font-black text-rose-900">TOTAL PASIVO</td>{years.map(y => {
                const totalPas = projections[y].cxp + projections[y].deudaBancaria + projections[y].irPorPagar + projections[y].partPorPagar + projections[y].obligaciones;
                return <td key={y} className="px-4 py-3 font-bold text-rose-800">{formatNum(totalPas)}</td>
            })}</tr>

            <tr className="bg-gray-100 font-bold text-left"><td colSpan="7" className="px-4 py-2">PATRIMONIO</td></tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-2 text-left text-gray-600">Capital Social</td>{years.map(y => <td key={y} className="px-4 py-2">{formatNum(projections[y].capital)}</td>)}</tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-2 text-left text-gray-600">Reservas</td>{years.map(y => <td key={y} className="px-4 py-2">{formatNum(projections[y].reservas)}</td>)}</tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-2 text-left text-gray-600">Utilidades Retenidas</td>{years.map(y => <td key={y} className="px-4 py-2 font-bold text-blue-600">{formatNum(projections[y].utilidadesRetenidas)}</td>)}</tr>
            <tr className="hover:bg-gray-50"><td className="px-4 py-2 text-left text-gray-600">Utilidad Ejercicio</td>{years.map(y => <td key={y} className="px-4 py-2 font-bold text-blue-600">{formatNum(projections[y].utilidadNeta)}</td>)}</tr>

            <tr className="bg-[#0B1B3D] text-white border-t-2 border-blue-900"><td className="px-4 py-4 text-left font-black text-lg">TOTAL PASIVO Y PAT.</td>{years.map(y => {
                const totalPasPat = projections[y].cxp + projections[y].deudaBancaria + projections[y].irPorPagar + projections[y].partPorPagar + projections[y].obligaciones + projections[y].capital + projections[y].reservas + projections[y].utilidadesRetenidas + projections[y].utilidadNeta;
                return <td key={y} className="px-4 py-4 font-black">{formatNum(totalPasPat)}</td>
            })}</tr>
            
            {/* Control Cuadre */}
            <tr className="text-xs">
                <td className="px-4 py-1 text-left text-gray-400">Verificación (A - P - Pat)</td>
                {years.map(y => {
                    const act = projections[y].efectivo + projections[y].cxc + projections[y].mp + projections[y].pt + projections[y].ktProyecto + projections[y].intangibles + projections[y].activoFijo + projections[y].otrasInv;
                    const paspat = projections[y].cxp + projections[y].deudaBancaria + projections[y].irPorPagar + projections[y].partPorPagar + projections[y].obligaciones + projections[y].capital + projections[y].reservas + projections[y].utilidadesRetenidas + projections[y].utilidadNeta;
                    const diff = Math.round(act) - Math.round(paspat);
                    return <td key={y} className={`px-4 py-1 ${diff !== 0 ? 'text-red-500 font-bold' : 'text-gray-400'}`}>{diff === 0 ? '-' : diff}</td>
                })}
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full w-full bg-gray-50/50 rounded-2xl p-4 md:p-8">
      
      {/* HEADER FIJO */}
      <div className="mb-6 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 shrink-0">
        <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Modelo Financiero 5 Años</h1>
            <p className="text-gray-500 mt-1 font-medium">Proyección integral interactiva de ER, FFE y Balance (2026 - 2031).</p>
        </div>
        
        <div className="bg-white p-3 rounded-2xl shadow-md border border-gray-200 flex flex-col sm:flex-row items-center gap-4 animate-pulse-glow">
            <label className="text-sm font-black text-gray-800 flex items-center gap-2">
                <i className="ph-rocket-launch text-blue-500 text-xl"></i>
                Simular Crec. Anual:
            </label>
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-2 border border-gray-100">
                <input 
                    type="range" 
                    min="0" max="15" step="0.5" 
                    value={growthRate} 
                    onChange={(e) => setGrowthRate(parseFloat(e.target.value))}
                    className="w-32 lg:w-48 accent-blue-600"
                />
                <span className="font-black text-blue-900 min-w-[45px] text-lg bg-blue-100 px-2 py-0.5 rounded text-center">{growthRate.toFixed(1)}%</span>
            </div>
        </div>
      </div>

      {/* TABS FIJAS */}
      <div className="flex gap-2 mb-6 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 w-full overflow-x-auto shrink-0">
        <button onClick={() => setActiveTab('supuestos')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${activeTab === 'supuestos' ? 'bg-gray-900 text-white shadow-md scale-105' : 'text-gray-500 hover:bg-gray-100'}`}><i className="ph-sliders text-lg"></i> Supuestos</button>
        <button onClick={() => setActiveTab('er')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${activeTab === 'er' ? 'bg-blue-600 text-white shadow-md scale-105' : 'text-gray-500 hover:bg-gray-100'}`}><i className="ph-chart-line-up text-lg"></i> Estado Resultados</button>
        <button onClick={() => setActiveTab('ffe')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${activeTab === 'ffe' ? 'bg-teal-600 text-white shadow-md scale-105' : 'text-gray-500 hover:bg-gray-100'}`}><i className="ph-coins text-lg"></i> Flujo Efectivo</button>
        <button onClick={() => setActiveTab('es')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${activeTab === 'es' ? 'bg-emerald-600 text-white shadow-md scale-105' : 'text-gray-500 hover:bg-gray-100'}`}><i className="ph-buildings text-lg"></i> Balance General</button>
      </div>

      {/* CONTENIDO SCROLLABLE */}
      <div className="flex-1 overflow-y-auto pb-4 pr-2">
        {activeTab === 'supuestos' && renderSupuestos()}
        {activeTab === 'er' && renderER()}
        {activeTab === 'ffe' && renderFFE()}
        {activeTab === 'es' && renderES()}
      </div>

    </div>
  );
};
