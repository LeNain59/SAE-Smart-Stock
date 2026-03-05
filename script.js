import { supabase } from "./client.js"

async function loadBoites() {

  const { data, error } = await supabase
    .from("BOITES")
    .select("*")

  if (error) {
    console.error(error)
    return
  }

  const container = document.getElementById("boites")
  container.innerHTML = ""

  data.forEach(b => {
    container.innerHTML += `
      <div>
        Boite #${b.Num_Boite} | RFID: ${b.RFID_Boite} | Emplacement: ${b.Emplacement_Boite}
      </div>
    `
  })
}

window.loadBoites = loadBoites


async function searchComposant() {

  const search = document.getElementById("search").value

  const { data, error } = await supabase
    .from("COMPOSANT")
    .select("*")
    .or(`Nom_Comp.ilike.%${search}%,Ref_Comp.ilike.%${search}%`)

  if (error) {
    console.error(error)
    return
  }

  const container = document.getElementById("composants")
  container.innerHTML = ""

  data.forEach(c => {
    container.innerHTML += `
      <div>
        ${c.Nom_Comp} | Ref: ${c.Ref_Comp} | Quantité: ${c.Nb_Comp}
      </div>
    `
  })
}

window.searchComposant = searchComposant
