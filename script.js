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
async function envoyerOrdre() {
    try {
        // Lire l'ordre actuel
        const { data: ordreData, error: ordreError } = await supabase
            .from('Ordre')
            .select('ordre_mouv')
            .filter('id', 1)
            .maybeSingle();

        if (ordreError) {
            console.error("Erreur récupération Ordre :", ordreError);
            return;
        }

        if (!ordreData) {
            console.error("Aucun ordre trouvé avec id=1");
            return;
        }

        let ordre = ordreData.ordre_mouv;

        if (ordre === 0) {
            // Lancer l'ordre
            const { error: updateError } = await supabase
                .from('Ordre')
                .update({ ordre_mouv: 1 })
                .filter('id', 1);

            if (updateError) {
                console.error("Erreur mise à jour Ordre :", updateError);
                return;
            }

            console.log("Ordre lancé");
            document.getElementById("etatOrdre").innerText = "Etat : lancé";

        } else {
            // Ajouter en mémoire
            const { data: memData, error: memError } = await supabase
                .from('memoire')
                .select('MEMOIRE')
                .filter('id', 1)
                .maybeSingle();

            if (memError) {
                console.error("Erreur récupération memoire :", memError);
                return;
            }

            if (!memData) {
                console.error("Aucune mémoire trouvée avec id=1");
                return;
            }

            let mem = memData.MEMOIRE;

            const { error: memUpdateError } = await supabase
                .from("memoire")
                .update({ MEMOIRE: mem + 1 })
                .filter("id", 1);

            if (memUpdateError) {
                console.error("Erreur mise à jour memoire :", memUpdateError);
                return;
            }

            console.log("Ordre ajouté en mémoire");
            document.getElementById("etatOrdre").innerText = "Etat : ajouté en mémoire";
        }

    } catch (err) {
        console.error("Erreur inattendue :", err);
    }
}

// rendre les fonctions accessibles au HTML
window.loadBoites = loadBoites
window.loadComposants = loadComposants
window.searchComposants = searchComposants
window.envoyerOrdre = envoyerOrdre

// chargement automatique
loadBoites()
loadComposants()









