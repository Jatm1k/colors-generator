const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', (e) => {
    if(e.code.toLowerCase() === 'space') {
        setRandomColor()
    }
})

document.addEventListener('click', e => {
    let type = e.target.dataset.type
    if(type === 'lock') {
        e.target.classList.toggle('fa-lock-open')
        e.target.classList.toggle('fa-lock')
    } else if(type === 'copy') {
        copyText(e.target.textContent)
    }
})

function setRandomColor(isInitial) {
    let colors = isInitial ? getColorsHash() : []
    cols.forEach((col, index)=>{
        let color = isInitial ? colors[index] ? colors[index] : chroma.random() : chroma.random()
        let text = col.querySelector('h2')
        let button = col.querySelector('.button')
        if(col.children[1].classList.contains('fa-lock')) {
            colors.push(text.textContent)
            return
        }

        if(!isInitial) {
            colors.push(color)
        }

        text.textContent = color
        col.style.background = color
        setTextColor(text, color)
        setTextColor(button, color)
    })
    updateHash(colors)
}

function copyText(text) {
    return navigator.clipboard.writeText(text)
}

function setTextColor(text, color) {
    let luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function updateHash(colors) {
    document.location.hash = colors.map(col=>col.toString().substring(1)).join('-')
}

function getColorsHash() {
    if(document.location.hash.length > 1) {
        return document.location.hash.substring(1).split('-').map(color => '#'+color)
    } else return []
}

setRandomColor(true)