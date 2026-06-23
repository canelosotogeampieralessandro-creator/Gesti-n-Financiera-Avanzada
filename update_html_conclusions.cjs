const fs = require('fs');
let content = fs.readFileSync('panel_de_riesgos_exalmar.html', 'utf8');

// The arrays in the HTML file match the ones I just replaced in App.jsx.
// I will just read them from App.jsx and inject them into panel_de_riesgos_exalmar.html

const appContent = fs.readFileSync('src/App.jsx', 'utf8');

const extractBlock = (str, startStr, endStr) => {
    const startIndex = str.indexOf(startStr);
    const endIndex = str.indexOf(endStr, startIndex) + endStr.length;
    return str.substring(startIndex, endIndex);
};

const nuevasConclusiones = extractBlock(appContent, 'const conclusiones = [', '];');
const nuevasRecomendaciones = extractBlock(appContent, 'const recomendaciones = [', '];');

const viejasConclusiones = extractBlock(content, 'const conclusiones = [', '];');
let oldRecIndex = content.indexOf('const recomendaciones = [');
let endOldRecIndex = content.indexOf('];', oldRecIndex) + 2;
const viejasRecomendaciones = content.substring(oldRecIndex, endOldRecIndex);


if (viejasConclusiones && nuevasConclusiones && viejasConclusiones !== nuevasConclusiones) {
    content = content.replace(viejasConclusiones, nuevasConclusiones);
    console.log("Conclusiones replaced");
}

if (viejasRecomendaciones && nuevasRecomendaciones && viejasRecomendaciones !== nuevasRecomendaciones) {
    content = content.replace(viejasRecomendaciones, nuevasRecomendaciones);
    console.log("Recomendaciones replaced");
}

fs.writeFileSync('panel_de_riesgos_exalmar.html', content);
console.log('Finished updating html');
