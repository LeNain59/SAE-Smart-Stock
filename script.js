import { supabase } from "./client.js"


// charger les boites
async function loadBoites(){

const { data, error } = await supabase
.from("BOITES")
.select("*")

if(error){
console.error(error)
return
}

const table = document.getElementById("boites")
table.innerHTML=""

data.forEach(b => {

table.innerHTML += `
<tr>
<td>${b.Num_Boite}</td>
<td>${b.RFID_Boite}</td>
<td>${b.Emplacement_Boite}</td>
<td>${b.Masse_Boite}</td>
</tr>
`

})

}

window.loadBoites = loadBoites



// rechercher composants
async function searchComposants(){

const search = document.getElementById("search").value

const { data, error } = await supabase
.from("COMPOSANT")
.select("*")
.or(`Nom_Comp.ilike.%${search}%,Ref_Comp.ilike.%${search}%`)

if(error){
console.error(error)
return
}

const resultats = document.getElementById("resultats")
resultats.innerHTML=""

if(data.length === 0){
resultats.innerHTML = "Aucun composant trouvé"
return
}

data.forEach(c => {

resultats.innerHTML += `
<div class="result">
<b>${c.Nom_Comp}</b><br>
Référence : ${c.Ref_Comp}<br>
Quantité : ${c.Nb_Comp}
</div>
`

})

}

window.searchComposants = searchComposants
