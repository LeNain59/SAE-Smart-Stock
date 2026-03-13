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
.order("Num_Comp", { ascending: true })

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
.order("Num_Comp", { ascending: true })

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

<td>
<button onclick="envoyerCommande('${c.commande_id}','${c.Nom_Comp}')">
Prendre
</button>
</td>

</tr>
`

})

}


// envoyer commande
async function envoyerCommande(idCommande, nom){

const confirmation = confirm("Commander le composant : " + nom + " ?")

if(!confirmation){
return
}

const { error } = await supabase
.from("COMMANDE")
.insert([
{
commande_id: idCommande
}
])

if(error){
console.error("Erreur commande :", error)
return
}

alert("Commande envoyée")

}


// charger liste composants pour sélection
async function chargerListeComposants() {
    const select = document.getElementById("selectComposant");
    if (!select) {
        console.error("Le select #selectComposant n'existe pas dans le DOM");
        return;
    }

    const { data, error } = await supabase
        .from("COMPOSANT")
        .select("Nom_Comp")
        .order("Nom_Comp");

    if (error) {
        console.error(error);
        return;
    }

    select.innerHTML = "";

    data.forEach(c => {
        select.innerHTML += `<option value="${c.Nom_Comp}">${c.Nom_Comp}</option>`;
    });
}


// ajouter boite
async function ajouterBoite(){

const selectComp = document.getElementById("selectComposant")
const composantChoisi = selectComp.value

const selectEmp = document.getElementById("selectEmplacement")
const emplacementChoisi = parseInt(selectEmp.value)


// vérifier si emplacement déjà utilisé
const { data: boitesExistantes } = await supabase
.from("BOITES")
.select("*")
.eq("Emplacement_Boite", emplacementChoisi)

if(boitesExistantes.length > 0){
alert("Cet emplacement est déjà occupé")
return
}


// vérifier limite 8 boites
const { data } = await supabase
.from("BOITES")
.select("*")

if(data.length >= 8){
alert("Maximum 8 boîtes atteint")
return
}


// insertion
const { error } = await supabase
.from("BOITES")
  
.insert([
{
Nom_Comp: composantChoisi,
  RFID_Boite: "    ",
Emplacement_Boite: emplacementChoisi,
Masse_Boite: 0
}
])

if(error){
console.error(error)
return
}

loadBoites()

}


// supprimer boite
async function supprimerBoite(id){

const { error } = await supabase
.from("BOITES")
.delete()
.eq("Num_Boite", id)

if(error){
console.error(error)
return
}

loadBoites()

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

let masseStock = "N/A"

if(b.Masse_Actuel != null && b.Masse_min != null){
masseStock = b.Masse_Actuel - b.Masse_min
}

table.innerHTML += `
<tr>
<td>${b.Num_Boite}</td>
<td>${b.Nom_Comp}</td>
<td>${b.RFID_Boite}</td>
<td>${b.Emplacement_Boite}</td>
<td>${masseStock}</td>

<td>
<button onclick="supprimerBoite(${b.Num_Boite})">
Supprimer
</button>
</td>

</tr>
`

})

}


// rendre les fonctions accessibles au HTML
window.loadBoites = loadBoites
window.loadComposants = loadComposants
window.searchComposants = searchComposants
window.envoyerCommande = envoyerCommande
window.ajouterBoite = ajouterBoite
window.supprimerBoite = supprimerBoite


// chargement automatique
loadBoites()
loadComposants()
chargerListeComposants()






