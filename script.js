const config = {
  ateliers: [
    { id: 1, titre: "Créer une affiche avec Figma", places: 8 },
    { id: 2, titre: "Découvrir les raccourcis VS Code", places: 0 },
    { id: 3, titre: "Construire un quiz en JavaScript", places: 5 },
    { id: 4, titre: "Créer une page responsive avec Tailwind CSS", places: 12 },
    { id: 6, titre: "Animer une interface avec CSS", places: 0 },
  ],
  modes: {
    presentiel: "En présentiel",
    distance: "À distance",
  },
  campus: ["Youssoufia", "Asfi", "Nador"],
};

const selectedConfig = {
  atelierId: null,
  mode: "",
  campus: "",
  email: "",
};
const list = document.querySelector("#liste-ateliers")
const modes = document.querySelector("#liste-modes")
const campus = document.querySelector("#liste-campus")
const campusCont = document.querySelector("#champ-campus")

const email = document.querySelector("#champ-email")
const button = document.querySelector("button")
const recap = document.querySelector("#recapitulatif")
const contenu = document.querySelector("#recapitulatif-contenu")
const val = document.querySelector("#email")



let actHold = ""
let place = ""






const afichier = () => {
  list.innerHTML = ""
  modes.innerHTML = ""
  for (let i = 0; i < config.ateliers.length; i++) {
    if (config.ateliers[i].places == 0) { continue }
    const label = document.createElement("label")
    label.className = "carte-choix"
    const input = document.createElement("input")
    input.type = "radio"
    input.name = "atelier"
    input.value = ""
    input.setAttribute("aria-describedby", "erreur-atelier")
    input.required = true
    const span = document.createElement("span")
    const titre = document.createElement("strong")
    titre.className = "atelier-titre"
    const detail = document.createElement("span")
    detail.className = "atelier-places detail"

    span.append(titre, detail)
    label.append(input, span)
    list.append(label)
    titre.textContent = config.ateliers[i].titre
    detail.textContent = config.ateliers[i].places + " places disponible"
    input.addEventListener("change", () => {
      actHold = titre.textContent
    })
  }




  const label = document.createElement("label")
  label.className = "carte-choix"
  const input = document.createElement("input")
  input.type = "radio"
  input.name = "mode"
  input.value = ""
  input.setAttribute("aria-describedby", "erreur-mode")
  input.required = true
  const span = document.createElement("span")
  span.className = "mode-libelle"
  modes.append(label)
  label.append(input, span)
  span.textContent = config.modes.presentiel
  input.addEventListener("change", () => {
    campus.innerHTML = ""

    for (let j = 0; j < config.campus.length; j++) {
      const label = document.createElement("label")
      label.className = "carte-choix"
      const input = document.createElement("input")
      input.type = "radio"
      input.name = "campus"
      input.value = ""
      input.setAttribute("aria-describedby", "erreur-campus")
      input.required = true
      const span = document.createElement("span")
      span.className = "campus-libelle"
      campus.append(label)
      label.append(input, span)
      span.textContent = config.campus[j]
      input.addEventListener("change", () => {
        place = span.textContent
      })
    }
    campusCont.hidden = false
    email.hidden = true
    campusCont.disabled = false
  })

  const label2 = document.createElement("label")
  label2.className = "carte-choix"
  const input2 = document.createElement("input")
  input2.type = "radio"
  input2.name = "mode"
  input2.value = ""
  input2.setAttribute("aria-describedby", "erreur-mode")
  input2.required = true
  const span2 = document.createElement("span")
  span2.className = "mode-libelle"
  modes.append(label2)
  label2.append(input2, span2)
  span2.textContent = config.modes.distance
  input2.addEventListener("change", () => {
    email.hidden = false
    val.disabled = false
    campusCont.hidden = true
  })
}

afichier()

button.addEventListener("click", (e) => {
  e.preventDefault()
  recap.hidden = false
  contenu.innerHTML = ""
  const dl = document.createElement("dl")
  dl.className = "recap-liste"
  const div1 = document.createElement("div")
  const dt1 = document.createElement("dt")
  const dd1 = document.createElement("dd")
  dd1.className = "recap-atelier"
  dt1.textContent = "Atelier"
  dd1.textContent = actHold

  const div2 = document.createElement("div")
  const dt2 = document.createElement("dt")
  const dd2 = document.createElement("dd")
  dd2.className = "recap-mode"
  dt2.textContent = "Participation"



  const div3 = document.createElement("div")
  const dt3 = document.createElement("dt")
  const dd3 = document.createElement("dd")
  dt3.className = "recap-detail-libelle"
  dd3.className = "recap-detail-valeur"
  if (email.hidden == true) {
    dt3.textContent = "Campus"
    dd3.textContent = place
    dd2.textContent = "presentiel"
  }
  else {
    dt3.textContent = "adress e-mail"
    dd2.textContent = "a distance"
    const val = document.querySelector("#email")
    dd3.textContent = val.value

  }

  dl.append(div1, div2, div3)
  div1.append(dt1, dd1)
  div2.append(dt2, dd2)
  div3.append(dt3, dd3)
  contenu.append(dl)

})