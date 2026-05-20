import { useState } from "react";
const DATA = {
  precursores: {
    label: "Precursores",
    color: { fill: "#FEF3C7", stroke: "#D97706", text: "#92400E", light: "#FFFBEB", tag: "#FDE68A" },
    connLabel: "incluye",
    items: [
      { name: "Eratóstenes", sub: "~276 a.C.", desc: "Primer geógrafo en calcular la circunferencia terrestre y acuñar el término 'Geografía'. Creó el primer mapa del mundo conocido.", tip: "↳ TI: Geodesia → fundamento matemático del GPS y los satélites modernos." },
      { name: "A. von Humboldt", sub: "1769–1859", desc: "Padre de la geografía física moderna. Su obra Cosmos integró las ciencias naturales en una visión holística del planeta.", tip: "↳ TI: Métodos empíricos → base de los sistemas IoT de monitoreo ambiental." },
      { name: "Carl Ritter", sub: "1779–1859", desc: "Fundador de la geografía comparada y humana. Analizó la relación entre el medio físico y las civilizaciones humanas.", tip: "↳ TI: Modelos relacionales → bases de datos geoespaciales y PostGIS." },
    ],
  },
  fisica: {
    label: "Geografía Física",
    color: { fill: "#DBEAFE", stroke: "#2563EB", text: "#1E3A8A", light: "#EFF6FF", tag: "#BFDBFE" },
    connLabel: "comprende",
    items: [
      { name: "Climatología", sub: "Estudio del clima", desc: "Analiza patrones climáticos, temperatura, precipitación y cambios a largo plazo en la atmósfera.", tip: "↳ TI: APIs NASA/NOAA → modelos predictivos con Python y Machine Learning." },
      { name: "Geomorfología", sub: "Relieve terrestre", desc: "Estudia las formas del relieve y los procesos geológicos que las modelan a lo largo del tiempo.", tip: "↳ TI: Modelos DEM → software de topografía, SIG y planificación urbana." },
      { name: "Hidrología", sub: "Recursos hídricos", desc: "Analiza el ciclo del agua: ríos, lagos, acuíferos y gestión de recursos hídricos.", tip: "↳ TI: Sensores IoT → monitoreo de cuencas hidrográficas en tiempo real." },
      { name: "Biogeografía", sub: "Distribución biológica", desc: "Estudia la distribución geográfica de especies y ecosistemas en el espacio y el tiempo.", tip: "↳ TI: Big Data → análisis de biodiversidad y mapas ecológicos con ML." },
    ],
  },
  humana: {
    label: "Geografía Humana",
    color: { fill: "#EDE9FE", stroke: "#7C3AED", text: "#4C1D95", light: "#F5F3FF", tag: "#DDD6FE" },
    connLabel: "comprende",
    items: [
      { name: "Geo. Urbana", sub: "Ciudades y espacios", desc: "Estudia la estructura, morfología y dinámica de las ciudades y áreas metropolitanas.", tip: "↳ TI: IoT + datos → Smart Cities, semáforos inteligentes y tráfico en tiempo real." },
      { name: "Geo. Económica", sub: "Actividades productivas", desc: "Analiza la distribución espacial de la producción, el comercio y los flujos económicos.", tip: "↳ TI: Geo-marketing y dashboards de ventas por región geográfica." },
      { name: "Geo. de Población", sub: "Demografía espacial", desc: "Examina patrones demográficos, flujos migratorios, densidad y distribución poblacional.", tip: "↳ TI: Mapas de calor poblacional, cobertura de servicios y análisis de mercado." },
      { name: "Geo. Cultural", sub: "Identidades y territorio", desc: "Estudia la distribución de lenguas, religiones e identidades étnicas en el espacio.", tip: "↳ TI: Localización de apps, UX adaptada por región y análisis de redes sociales." },
    ],
  },
  auxiliares: {
    label: "Ciencias Auxiliares",
    color: { fill: "#FFEDD5", stroke: "#EA580C", text: "#7C2D12", light: "#FFF7ED", tag: "#FED7AA" },
    connLabel: "requiere",
    items: [
      { name: "Cartografía", sub: "Diseño de mapas", desc: "Ciencia y arte de crear representaciones gráficas del territorio. Base visual de toda análisis geográfico.", tip: "↳ TI: Leaflet, Mapbox GL JS, Google Maps API → interfaces de navegación." },
      { name: "SIG / GIS", sub: "Información geoespacial", desc: "Captura, almacena, analiza y visualiza datos georreferenciados digitalmente.", tip: "↳ TI: PostGIS, QGIS, ArcGIS → bases de datos espaciales y análisis territorial." },
      { name: "Estadística", sub: "Análisis cuantitativo", desc: "Modelos estadísticos para analizar distribuciones, correlaciones y patrones espaciales.", tip: "↳ TI: Algoritmos ML geoespacial, regresión espacial y clustering de datos." },
      { name: "Geología", sub: "Estructura terrestre", desc: "Composición y procesos internos de la Tierra. Base conceptual para la geomorfología.", tip: "↳ TI: Software de topografía 3D, minería de datos y análisis de suelos." },
      { name: "Sociología", sub: "Dinámica social", desc: "Analiza grupos sociales, comportamiento colectivo y sus estructuras en el espacio territorial.", tip: "↳ TI: Redes sociales geo-referenciadas, geo-marketing y análisis de movilidad." },
    ],
  },
};
const NEXO_CASES = [
  { title: "GPS y Back-end Espacial", icon: "🗺️", desc: "PostGIS en PostgreSQL para queries con polígonos y algoritmos de ruta (Dijkstra). Clave en Uber Eats, PedidosYa y logística nacional.", tags: ["PostGIS", "Dijkstra", "REST APIs"], bg: "#DCFCE7", border: "#16A34A", text: "#14532D" },
  { title: "Big Data Climático", icon: "🌦️", desc: "Ingesta de Climatología e Hidrología desde APIs NASA/NOAA. Algoritmos Python predicen inundaciones y apoyan agricultura de precisión.", tags: ["Python", "NASA API", "ML"], bg: "#DBEAFE", border: "#2563EB", text: "#1E3A8A" },
  { title: "Smart Cities e IoT", icon: "🏙️", desc: "Software embebido para semáforos inteligentes y sensores de tráfico. Analiza congestión urbana para optimizar rutas en tiempo real.", tags: ["IoT", "MQTT", "Node.js"], bg: "#EDE9FE", border: "#7C3AED", text: "#4C1D95" },
  { title: "SIG y Mapeo Web", icon: "📡", desc: "React Leaflet, Mapbox GL JS y Google Maps API para dashboards interactivos: mapas de calor, rutas, cobertura de red móvil.", tags: ["React", "Leaflet", "Mapbox"], bg: "#FFEDD5", border: "#EA580C", text: "#7C2D12" },
];
const VW = 1080;
const COLS = [
  { key: "precursores", cx: 159 },
  { key: "fisica", cx: 413 },
  { key: "humana", cx: 667 },
  { key: "auxiliares", cx: 921 },
];
const SUB_Y0 = 208, STEP = 68, SUB_H = 54, SUB_W = 170;
function subBottom(key) { return SUB_Y0 + (DATA[key].items.length - 1) * STEP + SUB_H; }
export default function App() {
  const [active, setActive] = useState("fisica");
  const ad = DATA[active];
  return (
    <div style={{ fontFamily: "'Georgia','Times New Roman',serif", background: "#F0F4F8", minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(135deg,#001d4a 0%,#003580 60%,#004fa3 100%)", color: "white", padding: "26px 36px", borderBottom: "5px solid #F59E0B" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 54, height: 54, borderRadius: 10, flexShrink: 0, background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(245,158,11,0.6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 900, color: "#FCD34D", letterSpacing: 1 }}>UIP</div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "#93C5FD", fontWeight: 700, marginBottom: 1 }}>Universidad Interamericana de Panamá · Fac. de Ingeniería en Informática</div>
            <div style={{ fontSize: 10.5, color: "#BAE6FD", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 8, fontFamily: "'Segoe UI',sans-serif" }}>Geografía General · Actividad Colaborativa · Estudiante: Alejandro Valencia</div>
            <h1 style={{ fontSize: 20, fontWeight: 900, margin: 0, lineHeight: 1.3 }}>Mapa Conceptual — Geografía y su Nexo con la Ingeniería Informática</h1>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "28px 16px 52px" }}>
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".13em", color: "#64748B", fontWeight: 700, fontFamily: "'Segoe UI',sans-serif" }}>Diagrama relacional interactivo</span>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginTop: 3 }}>Mapa Conceptual Relacional</h2>
        </div>
        <div style={{ background: "white", borderRadius: 14, border: "1px solid #CBD5E1", padding: "22px 14px 14px", overflowX: "auto", marginBottom: 6, boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
          <svg viewBox={`0 0 ${VW} 706`} style={{ width: "100%", minWidth: 920 }}>
            <defs>
              <marker id="mArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M1.5 1.5L8.5 5L1.5 8.5" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></marker>
              <marker id="mGreen" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M1.5 1.5L8.5 5L1.5 8.5" fill="none" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></marker>
            </defs>
            {COLS.map(({ cx }) => (<path key={cx} d={`M540,68 L540,96 L${cx},96 L${cx},120`} fill="none" stroke="#CBD5E1" strokeWidth="1.3" markerEnd="url(#mArr)"/>))}
            <text x="350" y="90" textAnchor="middle" fill="#94A3B8" fontSize="9.5" fontStyle="italic" fontFamily="'Segoe UI',sans-serif">tiene</text>
            <text x="540" y="90" textAnchor="middle" fill="#94A3B8" fontSize="9.5" fontStyle="italic" fontFamily="'Segoe UI',sans-serif">se divide en</text>
            <text x="795" y="90" textAnchor="middle" fill="#94A3B8" fontSize="9.5" fontStyle="italic" fontFamily="'Segoe UI',sans-serif">se apoya en</text>
            <rect x="385" y="14" width="310" height="54" rx="14" fill="#001d4a" stroke="#F59E0B" strokeWidth="2"/>
            <text x="540" y="36" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="21" fontWeight="900" letterSpacing="3" fontFamily="'Georgia',serif">GEOGRAFÍA</text>
            <text x="540" y="57" textAnchor="middle" dominantBaseline="central" fill="#93C5FD" fontSize="9.5" fontFamily="'Segoe UI',sans-serif">Ciencia que estudia la Tierra y la relación con el ser humano</text>
            {COLS.map(({ key, cx }) => { const d = DATA[key]; const isA = active === key; return (<g key={key} onClick={() => setActive(key)} style={{ cursor: "pointer" }}><rect x={cx-95} y={120} width={190} height={44} rx={10} fill={d.color.fill} stroke={d.color.stroke} strokeWidth={isA ? 2.5 : 1.2}/>{isA && <rect x={cx-95} y={120} width={190} height={44} rx={10} fill={d.color.stroke} opacity="0.06"/>}<text x={cx} y={142} textAnchor="middle" dominantBaseline="central" fill={d.color.text} fontSize="13" fontWeight="700" fontFamily="'Segoe UI',sans-serif">{d.label}</text></g>); })}
            {COLS.map(({ cx, key }) => (<line key={key} x1={cx} y1={164} x2={cx} y2={SUB_Y0} stroke="#CBD5E1" strokeWidth="1" markerEnd="url(#mArr)"/>))}
            {COLS.map(({ cx, key }) => (<text key={key} x={cx+5} y={184} fill="#94A3B8" fontSize="9.5" fontStyle="italic" fontFamily="'Segoe UI',sans-serif">{DATA[key].connLabel}</text>))}
            {COLS.map(({ key, cx }) => { const d = DATA[key]; const x = cx - SUB_W/2; return d.items.map((item, i) => { const y = SUB_Y0 + i*STEP; return (<g key={`${key}-${i}`}>{i < d.items.length-1 && (<line x1={cx} y1={y+SUB_H} x2={cx} y2={y+STEP} stroke={d.color.stroke} strokeWidth="0.6" opacity="0.45"/>)}<rect x={x} y={y} width={SUB_W} height={SUB_H} rx={8} fill={d.color.fill} stroke={d.color.stroke} strokeWidth="0.75"/><text x={cx} y={y+19} textAnchor="middle" dominantBaseline="central" fill={d.color.text} fontSize="12.5" fontWeight="700" fontFamily="'Segoe UI',sans-serif">{item.name}</text><text x={cx} y={y+38} textAnchor="middle" dominantBaseline="central" fill={d.color.stroke} fontSize="10.5" fontFamily="'Segoe UI',sans-serif">{item.sub}</text></g>); }); })}
            {COLS.map(({ key, cx }) => (<line key={key} x1={cx} y1={subBottom(key)} x2={cx} y2={578} stroke="#15803D" strokeWidth="0.9" strokeDasharray="5 4" markerEnd="url(#mGreen)"/>))}
            <text x="167" y={subBottom("precursores")+22} fill="#15803D" fontSize="9.5" fontStyle="italic" fontFamily="'Segoe UI',sans-serif">aplica en</text>
            <line x1="18" y1="570" x2="1062" y2="570" stroke="#CBD5E1" strokeWidth="0.7" strokeDasharray="12 6"/>
            <rect x="18" y="578" width="1044" height="36" rx="10" fill="#001d4a" stroke="#F59E0B" strokeWidth="1.5"/>
            <text x="540" y="596" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="12.5" fontWeight="900" letterSpacing="0.8" fontFamily="'Segoe UI',sans-serif">NEXO: GEOGRAFÍA ↔ INGENIERÍA INFORMÁTICA</text>
            {(() => { const bw=240,gap=14,total=4*bw+3*gap,sx=(VW-total)/2; return NEXO_CASES.map((c,i) => { const x=sx+i*(bw+gap); return (<g key={i}><rect x={x} y={622} width={bw} height={42} rx={8} fill={c.bg} stroke={c.border} strokeWidth="0.8"/><text x={x+bw/2} y={636} textAnchor="middle" dominantBaseline="central" fill={c.text} fontSize="11" fontWeight="700" fontFamily="'Segoe UI',sans-serif">{c.icon} {c.title}</text><text x={x+bw/2} y={653} textAnchor="middle" dominantBaseline="central" fill={c.text} fontSize="9.5" opacity="0.82" fontFamily="'Segoe UI',sans-serif">{c.tags.join(" · ")}</text></g>); }); })()}
            {[{fill:"#001d4a",stroke:"#F59E0B",label:"Núcleo / Nexo"},{fill:"#FEF3C7",stroke:"#D97706",label:"Precursores"},{fill:"#DBEAFE",stroke:"#2563EB",label:"Geo. Física"},{fill:"#EDE9FE",stroke:"#7C3AED",label:"Geo. Humana"},{fill:"#FFEDD5",stroke:"#EA580C",label:"Ciencias Aux."},{fill:"#DCFCE7",stroke:"#16A34A",label:"Ing. Informática"}].map((l,i) => (<g key={i}><rect x={22+i*172} y={678} width={11} height={11} rx={3} fill={l.fill} stroke={l.stroke} strokeWidth="0.5"/><text x={39+i*172} y={688} dominantBaseline="central" fill="#64748B" fontSize="10.5" fontFamily="'Segoe UI',sans-serif">{l.label}</text></g>))}
          </svg>
        </div>
        <p style={{ textAlign:"center", fontSize:12.5, color:"#94A3B8", marginBottom:22, fontStyle:"italic", fontFamily:"'Segoe UI',sans-serif" }}>Selecciona una rama en el mapa o los botones para explorar el contenido detallado de cada nodo</p>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:0 }}>
          {COLS.map(({ key }) => { const d=DATA[key]; const isA=active===key; return (<button key={key} onClick={() => setActive(key)} style={{ padding:"9px 22px", borderRadius:"9px 9px 0 0", fontSize:13, fontWeight:700, cursor:"pointer", border:`1.5px solid ${isA ? d.color.stroke : "#E2E8F0"}`, borderBottom: isA ? "1.5px solid white" : `1.5px solid ${d.color.stroke}`, background: isA ? "white" : "#F8FAFC", color: isA ? d.color.text : "#64748B", fontFamily:"'Segoe UI',sans-serif", transition:"all .13s", marginBottom: isA ? -1 : 0 }}>{d.label}</button>); })}
        </div>
        <div style={{ background:"white", borderRadius:"0 12px 12px 12px", border:`1.5px solid ${ad.color.stroke}`, padding:"24px 28px", marginBottom:36, boxShadow:"0 2px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
            <h2 style={{ fontSize:19, fontWeight:900, color:ad.color.text, margin:0 }}>{ad.label}</h2>
            <span style={{ background:ad.color.tag, color:ad.color.text, fontSize:11, padding:"2px 10px", borderRadius:20, fontWeight:700, fontFamily:"'Segoe UI',sans-serif" }}>{ad.items.length} elementos</span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(215px, 1fr))", gap:14 }}>
            {ad.items.map((item,i) => (<div key={i} style={{ background:ad.color.light, border:`1px solid ${ad.color.stroke}`, borderRadius:10, padding:"16px 18px" }}><div style={{ fontSize:14, fontWeight:700, color:ad.color.text, marginBottom:3, fontFamily:"'Segoe UI',sans-serif" }}>{item.name}</div><div style={{ fontSize:10.5, color:ad.color.stroke, fontWeight:700, marginBottom:9, textTransform:"uppercase", letterSpacing:".06em", fontFamily:"'Segoe UI',sans-serif" }}>{item.sub}</div><p style={{ fontSize:13, color:"#374151", lineHeight:1.65, marginBottom:10, fontFamily:"'Segoe UI',sans-serif" }}>{item.desc}</p><div style={{ fontSize:12, color:"#1D4ED8", fontStyle:"italic", fontFamily:"'Segoe UI',sans-serif", borderTop:`1px dashed ${ad.color.stroke}`, paddingTop:8 }}>{item.tip}</div></div>))}
          </div>
        </div>
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".13em", color:"#64748B", fontWeight:700, fontFamily:"'Segoe UI',sans-serif", marginBottom:3 }}>Aplicación profesional</div>
          <h2 style={{ fontSize:19, fontWeight:700, color:"#0F172A" }}>El Nexo: Geografía ↔ Ingeniería Informática</h2>
        </div>
        <div style={{ background:"linear-gradient(135deg,#001d4a 0%,#003580 60%,#004fa3 100%)", borderRadius:14, padding:"28px 32px", marginBottom:4, boxShadow:"0 4px 20px rgba(0,29,74,0.22)" }}>
          <p style={{ fontSize:14, color:"#BAE6FD", marginBottom:24, lineHeight:1.7, fontFamily:"'Segoe UI',sans-serif" }}>En Ingeniería Informática, la geografía es un tipo de dato estructural — los <strong style={{ color:"#FCD34D" }}>geodatos</strong>. Su integración con el software genera soluciones globales: optimización de rutas, predicción de desastres, ciudades inteligentes y visualización territorial interactiva.</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:14 }}>
            {NEXO_CASES.map((c,i) => (<div key={i} style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.16)", borderRadius:10, padding:"18px 20px" }}><div style={{ fontSize:24, marginBottom:6 }}>{c.icon}</div><div style={{ fontSize:14, fontWeight:700, color:"#7DD3FC", marginBottom:8, fontFamily:"'Segoe UI',sans-serif" }}>{c.title}</div><p style={{ fontSize:13, color:"#E0F2FE", lineHeight:1.65, marginBottom:12, fontFamily:"'Segoe UI',sans-serif" }}>{c.desc}</p><div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>{c.tags.map(t => (<span key={t} style={{ background:"rgba(255,255,255,0.14)", color:"#BAE6FD", fontSize:11, padding:"2px 9px", borderRadius:4, fontFamily:"monospace" }}>{t}</span>))}</div></div>))}
          </div>
        </div>
      </div>
      <div style={{ background:"#0F172A", color:"#64748B", textAlign:"center", padding:"20px", fontSize:13, fontFamily:"'Segoe UI',sans-serif" }}>
        <strong style={{ color:"#CBD5E1" }}>Universidad Interamericana de Panamá</strong> — Fac. de Ingeniería en Informática<br/>
        <span style={{ fontSize:12 }}>Mapa Conceptual · Geografía General · Alejandro Valencia</span>
      </div>
    </div>
  );
}
