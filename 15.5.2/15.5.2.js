function pageLoad(){

    const btn = document.querySelector('#btn')

    const height = window.screen.height
    const width = window.screen.width

    btn.addEventListener('click', () => {
        alert(`Ширина ${width}, Высота ${height}`)
    })
}

document.addEventListener("DOMContentLoaded", pageLoad);