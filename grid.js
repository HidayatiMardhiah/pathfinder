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
                box.style.backgroundColor = 'green'
                start = box
                message.textContent = "Start point is set. Please select the end point."
            }
            else if (end === null) {
                box.style.backgroundColor = 'red'
                end = box // assign each start and end box to remember its color and avoid override
            }
            else if (box !== start && box !== end){ 
                 box.style.backgroundColor = 'darkgrey'
            }
        })
    })
}

change_color()