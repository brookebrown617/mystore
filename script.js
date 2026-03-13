const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTbA6wuM_a7PuS4N-LC1gxCJ3RKbmSj11QnWbLq_Qll6xpVaGYQtBNp91RyocYFsZ77UE8JCO703IdS/pub?output=csv"
const apiURL = "https://script.google.com/macros/s/AKfycbyoNYdvapYQ-pCqV7uu7Y1Dj7B-sod5Q-OqhqI34HzuO1AUvD1xJ2nY0jEhyc2LkY3ZeA/exec"

let allItems = []

async function loadItems(){

allItems = []

const res = await fetch(sheetURL)
const text = await res.text()

let rows = text.split("\n").slice(1)

rows.forEach(row => {

let cols = row.split(",")

allItems.push({
id: cols[0],
name: cols[1],
category: cols[2],
image: cols[3],
status: cols[4],
claimedBy: cols[5],
description: cols[6]
})

})

render()

}

function render(filter="all"){

let container = document.getElementById("items")
container.innerHTML=""

allItems
.filter(i => filter==="all" || i.category===filter)
.forEach(item => {

let div = document.createElement("div")
div.className="item"

if(item.status==="claimed"){
div.classList.add("claimed")
}

div.innerHTML = `
<img src="images/${item.image}">
<h3>${item.name}</h3>
<p class="category">${item.category}</p>
<p class="description">${item.description}</p>
${item.status==="claimed"
? `<p>Claimed by ${item.claimedBy}</p>`
: `<button onclick="claim('${item.id}')">Claim</button>`}
`

container.appendChild(div)

})

}

async function claim(id){

const name = prompt("Enter your name to claim this item")

if(!name) return

await fetch(apiURL,{
method:"POST",
body: JSON.stringify({
id:id,
name:name
})
})

loadItems()

}

function filterItems(cat){
render(cat)
}

loadItems()

setInterval(loadItems,10000)
