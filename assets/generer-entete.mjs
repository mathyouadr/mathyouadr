// Génère l'en-tête du README en clair et en sombre, avec la direction
// artistique du portfolio (mathyouandre.fr) : la baie de brassage.
// Usage : node assets/generer-entete.mjs
import { writeFileSync } from "node:fs";

const themes = {
  clair: {
    bg: "#edefec", surface: "#fafbf9", surface2: "#f1f3f0", text: "#14171a",
    soft: "#363c42", muted: "#555d65", border: "#d4d8d3", borderStrong: "#b6bcb6",
    accent: "#2450d8", grid: "rgb(20 23 26 / 0.07)", ok: "#1f7a4a",
    paires: ["#dd5f17", "#1f8f55", "#2450d8", "#8b5a36"],
  },
  sombre: {
    bg: "#0d1012", surface: "#161b1f", surface2: "#1c2227", text: "#e8ecea",
    soft: "#c3cac7", muted: "#929c97", border: "#242b30", borderStrong: "#36424a",
    accent: "#7196ff", grid: "rgb(200 220 210 / 0.07)", ok: "#3fcb82",
    paires: ["#ff8a45", "#3fcb82", "#7196ff", "#c08a5e"],
  },
};

const domaines = [
  ["Systèmes", "Windows Server, Linux"],
  ["Réseaux", "Switchs, brassage, DHCP"],
  ["Électronique", "ESP32, RP2040"],
  ["Hack The Box", "34 machines"],
];

const SANS = "'Bricolage Grotesque','Segoe UI',system-ui,-apple-system,sans-serif";
const MONO = "'JetBrains Mono',ui-monospace,'Cascadia Code',Consolas,monospace";

const entete = (t) => {
  // Même géométrie que le hero du portfolio, décalée vers la droite.
  const dx = 400;
  const cables = domaines.map(([nom, detail], i) => {
    const yPort = 196 + i * 22;
    const yCible = 58 + i * 116;
    return { nom, detail, yPort, yCible, couleur: t.paires[i],
      trace: `M${232 + dx} ${yPort} C ${320 + dx} ${yPort}, ${300 + dx} ${yCible}, ${384 + dx} ${yCible}` };
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 480" role="img" aria-label="Mathyou ANDRE, technicien systèmes et réseaux">
<style>
  .cable-gaine { stroke-dasharray: 1; stroke-dashoffset: 1; animation: trace .9s calc(.5s + var(--i) * .15s) cubic-bezier(.6,0,.2,1) forwards; }
  .cable-rayure, .paquet { opacity: 0; animation: apparait .3s calc(1.4s + var(--i) * .15s) forwards; }
  .led { animation: clignote 1.4s steps(2, jump-none) infinite; }
  .statut-onde { transform-box: fill-box; transform-origin: center; animation: onde 2s ease-out infinite; }
  @keyframes trace { to { stroke-dashoffset: 0; } }
  @keyframes apparait { to { opacity: 1; } }
  @keyframes clignote { 50% { opacity: .25; } }
  @keyframes onde { from { transform: scale(1); opacity: .6; } to { transform: scale(3); opacity: 0; } }
  @media (prefers-reduced-motion: reduce) {
    .cable-gaine { stroke-dashoffset: 0; animation: none; }
    .cable-rayure { opacity: 1; animation: none; }
    .paquet { display: none; }
    .led, .statut-onde { animation: none; }
  }
</style>
<defs>
  <pattern id="trame" width="32" height="32" patternUnits="userSpaceOnUse">
    <path d="M32 0H0V32" fill="none" stroke="${t.grid}" stroke-width="1"/>
  </pattern>
  ${cables.map((c, i) => `<path id="cable-${i}" d="${c.trace}"/>`).join("\n  ")}
</defs>
<rect width="1000" height="480" rx="20" fill="${t.bg}"/>
<rect width="1000" height="480" rx="20" fill="url(#trame)"/>

<g transform="translate(48 0)">
  <rect x="0" y="92" width="268" height="32" rx="16" fill="${t.surface}" stroke="${t.border}"/>
  <circle cx="20" cy="108" r="4.5" fill="${t.ok}" class="statut-onde"/>
  <circle cx="20" cy="108" r="4.5" fill="${t.ok}"/>
  <text x="34" y="113" font-family="${SANS}" font-size="14" font-weight="500" fill="${t.soft}">À la recherche d'une alternance</text>

  <text font-family="${SANS}" font-weight="800" font-size="84" letter-spacing="-2.5" fill="${t.text}">
    <tspan x="-4" y="212">Mathyou</tspan><tspan x="-4" y="288">ANDRE</tspan>
  </text>
  <text x="0" y="338" font-family="${SANS}" font-size="24" font-weight="600" fill="${t.text}">Technicien systèmes &amp; réseaux</text>
  <text x="0" y="366" font-family="${MONO}" font-size="15" fill="${t.accent}">Étudiant en BTS SIO option SISR</text>
  <text x="0" y="404" font-family="${MONO}" font-size="13" fill="${t.muted}">Saint-Étienne · mathyouandre.fr</text>
</g>

<g>
  <rect x="${24 + dx}" y="168" width="208" height="112" rx="14" fill="${t.surface}" stroke="${t.borderStrong}" stroke-width="1.5"/>
  <text x="${44 + dx}" y="200" font-family="${MONO}" font-size="15" font-weight="600" fill="${t.muted}">SW-01</text>
  <circle cx="${44 + dx}" cy="252" r="4" fill="${t.ok}" class="led"/>
  <circle cx="${58 + dx}" cy="252" r="4" fill="${t.ok}" class="led" style="animation-duration:.9s"/>
  <circle cx="${72 + dx}" cy="252" r="4" fill="${t.paires[0]}" class="led" style="animation-duration:2.1s"/>
  ${cables.map((c) => `<rect x="${212 + dx}" y="${c.yPort - 7}" width="20" height="14" rx="3" fill="${t.surface2}" stroke="${t.borderStrong}"/>`).join("\n  ")}
</g>

${cables.map((c, i) => `<g style="--i:${i}">
  <path d="${c.trace}" pathLength="1" class="cable-gaine" fill="none" stroke="${c.couleur}" stroke-width="7" stroke-linecap="round"/>
  <path d="${c.trace}" class="cable-rayure" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="2.5" stroke-dasharray="6 9"/>
  <circle r="5" class="paquet" fill="${t.surface}" stroke="${c.couleur}" stroke-width="3">
    <animateMotion dur="${(2.4 + i * 0.35).toFixed(2)}s" begin="${(1.6 + i * 0.3).toFixed(1)}s" repeatCount="indefinite"><mpath href="#cable-${i}"/></animateMotion>
  </circle>
</g>
<g>
  <rect x="${384 + dx}" y="${c.yCible - 30}" width="198" height="60" rx="12" fill="${t.surface}" stroke="${t.border}" stroke-width="1.5"/>
  <rect x="${384 + dx}" y="${c.yCible - 30}" width="6" height="60" rx="3" fill="${c.couleur}"/>
  <text x="${402 + dx}" y="${c.yCible - 4}" font-family="${SANS}" font-size="17" font-weight="700" fill="${t.text}">${c.nom}</text>
  <text x="${402 + dx}" y="${c.yCible + 16}" font-family="${MONO}" font-size="11.5" fill="${t.muted}">${c.detail}</text>
</g>`).join("\n")}
</svg>
`;
};

for (const [nom, t] of Object.entries(themes)) {
  writeFileSync(new URL(`entete-${nom}.svg`, import.meta.url), entete(t));
}
