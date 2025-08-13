// Datos totalmente ficticios (no reales). Inspiración de formato, NO oficial.
const datos = [
  { caso: 240018, nombre: "Juan Pérez",       fecha: "2025-08-10", delito: "Robo menor",            centro: "EPMSC Bogotá",     estado: "En juicio" },
  { caso: 240019, nombre: "María Londoño",    fecha: "2025-08-09", delito: "Fraude",                 centro: "COG Quibdó",       estado: "Condenado" },
  { caso: 240020, nombre: "Carlos Martínez",  fecha: "2025-08-08", delito: "Tráfico de estupefacientes", centro: "EPMSC Medellín", estado: "En juicio" },
  { caso: 240021, nombre: "Ana López",        fecha: "2025-08-07", delito: "Estafa",                 centro: "COIBA Ibagué",     estado: "Libre" },
  { caso: 240022, nombre: "Ricardo Silva",    fecha: "2025-08-06", delito: "Daño a la propiedad",    centro: "EPMSC Cali",       estado: "Condenado" },
  { caso: 240023, nombre: "Lucía Méndez",     fecha: "2025-08-05", delito: "Lesiones personales",    centro: "EPMSC Cali",       estado: "En juicio" },
  { caso: 240024, nombre: "Jorge Ramírez",    fecha: "2025-08-04", delito: "Concierto para delinquir", centro:"EPMSC Bogotá",     estado: "En juicio" },
];

// Estado de filtros/orden
let sortKey = "fecha";
let sortDir = "desc";

const els = {
  q: document.getElementById("q"),
  estado: document.getElementById("estado"),
  centro: document.getElementById("centro"),
  orden: document.getElementById("orden"),
  reset: document.getElementById("reset"),
  tbody: document.querySelector("#tabla tbody"),
  contador: document.getElementById("contador"),
  theadCells: document.querySelectorAll("#tabla thead th")
};

// Poblar select de centros dinámicamente
(function initCentros(){
  const centros = Array.from(new Set(datos.map(d => d.centro))).sort((a,b)=> a.localeCompare(b));
  const sel = els.centro;
  centros.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    sel.appendChild(opt);
  });
})();

function formatearFecha(iso){
  const d = new Date(iso + "T00:00:00");
  const dia = String(d.getDate()).padStart(2,'0');
  const mes = String(d.getMonth()+1).padStart(2,'0');
  const anio = d.getFullYear();
  return `${dia}/${mes}/${anio}`;
}

function compare(a,b,key){
  if(key === "fecha"){
    // ISO YYYY-MM-DD: comparar string es suficiente para orden desc/asc
    return a.fecha.localeCompare(b.fecha);
  }
  if(key === "caso"){
    return a.caso - b.caso;
  }
  // strings
  return String(a[key]).localeCompare(String(b[key]), undefined, {sensitivity:"base"});
}

function aplicarOrden(lista){
  const arr = [...lista];
  const dir = sortDir === "asc" ? 1 : -1;
  arr.sort((a,b)=> compare(a,b,sortKey) * dir);
  return arr;
}

function render(lista){
  els.tbody.innerHTML = "";
  lista.forEach(it => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${it.caso}</td>
      <td>${it.nombre}</td>
      <td>${formatearFecha(it.fecha)}</td>
      <td>${it.delito}</td>
      <td>${it.centro}</td>
      <td><span class="state ${it.estado.toLowerCase().replaceAll(' ','-')}">${it.estado}</span></td>
    `;
    els.tbody.appendChild(tr);
  });
  els.contador.textContent = `${lista.length} resultado(s)`;
}

function filtrar(){
  const q = els.q.value.trim().toLowerCase();
  const est = els.estado.value;
  const cen = els.centro.value;

  let out = datos.filter(d => {
    const matchQ = !q || (
      d.nombre.toLowerCase().includes(q) ||
      d.delito.toLowerCase().includes(q) ||
      String(d.caso).includes(q) ||
      d.centro.toLowerCase().includes(q)
    );
    const matchE = !est || d.estado === est;
    const matchC = !cen || d.centro === cen;
    return matchQ && matchE && matchC;
  });

  // Ordenar según controles
  const [k,dir] = els.orden.value.split(":");
  sortKey = k; sortDir = dir;
  out = aplicarOrden(out);

  render(out);
}

els.q.addEventListener("input", filtrar);
els.estado.addEventListener("change", filtrar);
els.centro.addEventListener("change", filtrar);
els.orden.addEventListener("change", filtrar);
els.reset.addEventListener("click", () => {
  els.q.value = "";
  els.estado.value = "";
  els.centro.value = "";
  els.orden.value = "fecha:desc";
  sortKey = "fecha"; sortDir = "desc";
  filtrar();
});

// Click en encabezados para ordenar rápidamente
document.querySelectorAll("#tabla thead th").forEach(th => {
  th.classList.add("sortable");
  th.addEventListener("click", () => {
    const key = th.getAttribute("data-key");
    if(!key) return;
    if(sortKey === key){
      sortDir = (sortDir === "asc") ? "desc" : "asc";
    } else {
      sortKey = key;
      sortDir = (key === "fecha" || key === "caso") ? "desc" : "asc";
    }
    // refleja en select de orden
    const value = `${sortKey}:${sortDir}`;
    els.orden.value = value;
    filtrar();
  });
});

// Inicial
filtrar();
