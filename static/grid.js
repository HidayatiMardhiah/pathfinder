let start = null
let end = null
const message = document.getElementById('message')

function dynamic_grid() {

    //Create a container to put all of my grid elements in
    const container = document.createElement('div')
    container.id = "main"
    container.className = "container"

    for (let i=0; i<16; i++) {
        //Create a row to put the boxes in
        const row = document.createElement('div')
        row.className = "row"
        for (let j=0; j<35; j++) {
            const box = document.createElement('div')
            box.className = "box"
            box.id = `box-${i}-${j}`
            row.appendChild(box)
        }
        container.appendChild(row)
    }
    
    return container
}

// Append the function grid to html body
document.body.appendChild(dynamic_grid())

function change_color() {
    const boxes = document.querySelectorAll('.box')
    boxes.forEach(box => {
        box.addEventListener('click', () =>{
            if (start === null) {
                box.classList.add('start')
                start = box
                message.textContent = "Start point is set. Please select the end point."
            }
            else if (end === null) {
                box.classList.add('end')
                end = box // assign each start and end box to remember its color and avoid override
            }
            else if (box !== start && box !== end){ 
                 box.classList.add('wall')
            }
        })
    })
}

change_color()

function findPath() {

    let startPos = null
    let endPos = null
    const grid = []

    for (let i=0; i<16; i++) {
        grid.push(new Array(35).fill(0))
        for (let j=0; j<35; j++) {
            const box = document.getElementById(`box-${i}-${j}`)
            if (box.classList.contains('wall')) {
                 grid[i][j] = 1
            }
            if (box.classList.contains('start')) {
                startPos = [i, j]
            }
            if (box.classList.contains('end')) {
                endPos = [i, j]
            }
    }}

    fetch('/findpath', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({grid: grid, start: startPos, end: endPos})
    })
    .then(response => response.json())
    .then(data => {
        data.path.forEach(([row, col]) => {
            const cell = document.getElementById(`box-${row}-${col}`)
            if (!cell.classList.contains('start') && 
                !cell.classList.contains('end')) {
                cell.style.backgroundColor = 'blue'
            }

        })
    })
}

