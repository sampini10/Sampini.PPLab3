///Clases y constructores 
class Persona {
    constructor(id,nombre,apellido,edad)
    {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
}
class Heroe extends Persona{
    constructor(id,nombre,apellido,edad,alterEgo,ciudad,publicado)
    {
        super(id,nombre,apellido,edad);
        this.alterEgo = alterEgo;
        this.ciudad = ciudad;
        this.publicado = publicado;
    }
}
class Villano extends Persona{
    constructor(id,nombre,apellido,edad,enemigo,robos,asesinatos)
    {
        super(id,nombre,apellido,edad);
        this.enemigo = enemigo;
        this.robos = robos;
        this.asesinatos = asesinatos;
    }
}

//Carga del Array
let personasJSON = '[{"id":1, "nombre":"Clark", "apellido":"Kent", "edad":45, "alterego":"Superman", "ciudad":"Metropolis", "publicado":2002},{"id":2, "nombre":"Bruce", "apellido":"Wayne", "edad":35, "alterego":"Batman", "ciudad":"Gotica", "publicado":20012},{"id":3, "nombre":"Bart", "apellido":"Alen", "edad":30, "alterego":"Flash", "ciudad":"Central", "publicado":2017},{"id":4, "nombre":"Lex", "apellido":"Luthor", "edad":18, "enemigo":"Superman", "robos":500, "asesinatos":7},{"id":5, "nombre":"Harvey", "apellido":"Dent", "edad":20, "enemigo":"Batman", "robos":750, "asesinatos":2},{"id":666, "nombre":"Celina", "apellido":"kyle", "edad":23, "enemigo":"Batman", "robos":25, "asesinatos":1}]';
let persona = JSON.parse(personasJSON);

let listaPersonaObj = [];

function cargarDatos(){
    persona.forEach((persona) => {
      if (persona.alterego) {
        let heroe = new Heroe(persona.id, persona.nombre, persona.apellido, persona.edad, persona.alterego, persona.ciudad, persona.publicado);
        listaPersonaObj.push(heroe);
      } else if (persona.enemigo) {
        let villano = new Villano(persona.id, persona.nombre, persona.apellido, persona.edad, persona.enemigo, persona.robos, persona.asesinatos);
        listaPersonaObj.push(villano);
      } else {
        let personaNormal = new Persona(persona.id, persona.nombre, persona.apellido, persona.edad);
        listaPersonaObj.push(personaNormal);
      }
    });
    console.log(listaPersonaObj);
    cargarTabla(listaPersonaObj);
    DeshabilitarABM();
}


//Cargar tabla datos 
function cargarTabla(listaPersonas)
{ 
  let tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  listaPersonas.forEach(persona => {
  let tr = document.createElement("tr");
  
  let idTd = document.createElement("td");
  idTd.textContent = persona.id;
  tr.appendChild(idTd);
  
  let nombreTd = document.createElement("td");
  nombreTd.textContent = persona.nombre;
  tr.appendChild(nombreTd);
  
  let apellidoTd = document.createElement("td");
  apellidoTd.textContent = persona.apellido;
  tr.appendChild(apellidoTd);
  
  let edadTd = document.createElement("td");
  edadTd.textContent = persona.edad;
  tr.appendChild(edadTd);
  
  let alterEgoTd = document.createElement("td");
  alterEgoTd.textContent = persona.alterEgo;
  tr.appendChild(alterEgoTd);

  let ciudadTD = document.createElement("td");
  ciudadTD.textContent = persona.ciudad;
  tr.appendChild(ciudadTD);

  let publicadoTD = document.createElement("td");
  publicadoTD.textContent = persona.publicado;
  tr.appendChild(publicadoTD);

  let enemigoTD = document.createElement("td");
  enemigoTD.textContent = persona.enemigo;
  tr.appendChild(enemigoTD);

  let robosTD = document.createElement("td");
  robosTD.textContent = persona.robos;
  tr.appendChild(robosTD);

  let asesinatosTD = document.createElement("td");
  asesinatosTD.textContent = persona.asesinatos;
  tr.appendChild(asesinatosTD);

  tbody.appendChild(tr);
});
}

//Filtrar por Tipo
let selectFiltro = document.getElementById("FiltroTipo");

selectFiltro.addEventListener("change", function() {
    let valorFiltro = selectFiltro.value;
    let listaFiltrada = listaPersonaObj.filter(persona => {
        if (valorFiltro == 1) {
          return true; 
        } else if (valorFiltro == 2) {
          return persona instanceof Heroe;
        } else if (valorFiltro == 3) {
            return persona instanceof Villano;
        }
      });
    cargarTabla(listaFiltrada);
});

//Alta Persona 
function AltaPersona(){
    let id = ObtenerId();
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let edad = document.getElementById("edad").value;
    
    let persona = {
        id: id,
        nombre: nombre,
        apellido: apellido,
        edad: edad
    }
    listaPersonaObj.push(persona);
    cargarTabla(listaPersonaObj);
    LimpiarForm();
}

function ObtenerId(){
    let id = 1;
    while (listaPersonaObj.some(persona => persona.id === id)) {
      id++;
    }
    return id;
}

function LimpiarForm(){
  document.getElementById("id").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("edad").value = "";
  document.getElementById("tipo").value = "1";
  document.getElementById("alterEgo").value = "";
  document.getElementById("ciudad").value = "";
  document.getElementById("publicado").value = "";
  document.getElementById("enemigo").value = "";
  document.getElementById("robos").value = "";
  document.getElementById("asesinatos").value = "";
}

//Filtro ABM carga

let filtroABM = document.getElementById("tipo");

filtroABM.addEventListener("change", function() {
    let valorFiltro = filtroABM.value;
    if(valorFiltro == 1)
    {
        document.getElementById("enemigo").style.display = "none";
        document.getElementById("robos").style.display = "none";
        document.getElementById("asesinatos").style.display = "none";
        document.getElementById("alterEgo").style.display = "block";
        document.getElementById("ciudad").style.display = "block";
        document.getElementById("publicado").style.display = "block";
    }
    else
    {
        document.getElementById("alterEgo").style.display = "none";
        document.getElementById("ciudad").style.display = "none";
        document.getElementById("publicado").style.display = "none";
        document.getElementById("enemigo").style.display = "block";
        document.getElementById("robos").style.display = "block";
        document.getElementById("asesinatos").style.display = "block";
    }
});

function HabilitarABM(){
    document.getElementById("FormABM").style.display = "block";
}

function DeshabilitarABM(){
    document.getElementById("FormABM").style.display = "none";
}