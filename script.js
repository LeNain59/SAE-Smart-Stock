import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

// connexion Supabase
const supabaseUrl = "https://zlbidvslsnoqkpkjtyhq.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsYmlkdnNsc25vcWtwa2p0eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNjUxNzAsImV4cCI6MjA4NTk0MTE3MH0.4YomOs5WKljLyMssHrQUeLMDZJejl7A45jSifLV-vzM"

const supabase = createClient(supabaseUrl, supabaseKey)


// charger composants
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


// recherche composants
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


// afficher composants
function afficherComposants(composants){

const table = document.getElementById("tableComposants")
table.innerHTML=""

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


// charger boites
async function loadBoites(){

const { data, error } = await supabase
.from("BOITES")
.select("*")

if(error){
console.error(error)
return
}

const table = document.getElementById("tableBoites")
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


// rendre les fonctions accessibles au HTML
window.loadBoites = loadBoites
window.loadComposants = loadComposants
window.searchComposants = searchComposants


// chargement automatique
loadBoites()
loadComposants()
