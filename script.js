import { supabase } from "./client.js"



async function loadComposants(){

const { data, error } = await supabase
.from("COMPOSANT")
.select("*")

if(error){
console.error(error)
return
}

afficherComposants(data)

}

window.loadComposants = loadComposants



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

afficherComposants(data)

}

window.searchComposants = searchComposants



function afficherComposants(composants){

const table = document.getElementById("tableComposants")

table.innerHTML = ""

composants.forEach(c => {

table.innerHTML += `
<tr>
<td>${c.Num_Comp}</td>
<td>${c.Nom_Comp}</td>
<td>${c.Ref_Comp}</td>
<td>${c.Masse_Comp}</td>
<td>${c.Nb_Comp}</td>
</tr>
`

})

}



async function loadBoites(){

const { data, error } = await supabase
.from("BOITES")
.select("*")

if(error){
console.error(error)
return
}

const table = document.getElementById("tableBoites")
table.innerHTML = ""

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
