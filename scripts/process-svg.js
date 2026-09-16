const fs = require('fs');

let svg = fs.readFileSync('assets/logo_texto_hero.svg', 'utf8');

// Reemplazar clases CSS con atributos SVG directos
svg = svg.replace(/class="st0"/g, 'fill="#166193"');
svg = svg.replace(/class="st1"/g, 'fill="#FFFFFF"');
svg = svg.replace(/class="st2"/g, 'fill="#FFFFFF" clip-path="url(#SVGID_2_)"');
svg = svg.replace(/class="st3"/g, 'fill="#1D1E1C" clip-path="url(#SVGID_2_)"');
svg = svg.replace(/class="st4"/g, 'fill="#37A6DE" clip-path="url(#SVGID_2_)"');
svg = svg.replace(/class="st5"/g, 'fill="#FDEA14" clip-path="url(#SVGID_2_)"');
svg = svg.replace(/class="st6"/g, 'fill="#166193" clip-path="url(#SVGID_2_)"');
svg = svg.replace(/class="st7"/g, 'fill="#585856"');
svg = svg.replace(/class="st8"/g, 'fill="#37A6DE"');
svg = svg.replace(/class="st9"/g, 'fill="none" stroke="#1D1E1C" stroke-miterlimit="10"');

// Eliminar el bloque <style>...</style> para compatibilidad total
svg = svg.replace(/<style[\s\S]*?<\/style>/gi, '');

// Guardar
fs.writeFileSync('components/CflLogoHeroSvg.ts', 'export const CFL_LOGO_HERO_SVG = ' + JSON.stringify(svg) + ';\n');
console.log('SVG processed successfully without CSS classes!');
