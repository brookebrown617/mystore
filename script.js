const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTbA6wuM_a7PuS4N-LC1gxCJ3RKbmSj11QnWbLq_Qll6xpVaGYQtBNp91RyocYFsZ77UE8JCO703IdS/pub?output=csv"

let allItems = []

fetch(sheetURL)
.then(res => res.text())
.then(data => {

let rows = data.split("\n").slice(1)

rows.forEach(row => {

let cols = row.split(",")

let item = {
id: cols[0],
name: cols[1],
category: cols[2],
image: cols[3],
status: cols[4]
}

allItems.push(item)

})

render()

})

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
<p>${item.category}</p>
<button ${item.status==="claimed"?"disabled":""}
onclick="claim('${item.id}')">
${item.status==="claimed"?"Claimed":"Claim"}
</button>
`

container.appendChild(div)

})

}

function filterItems(category){
render(category)
}

function claim(id){

alert("Message Brooke to confirm claiming this item.")

}
