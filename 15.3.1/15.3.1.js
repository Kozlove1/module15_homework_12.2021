const btn = document.querySelector('#btn')
const icon1 = document.querySelector('.btn-icon1')
const icon2 = document.querySelector('.btn-icon2')
btn.addEventListener('click', () => {
        if (icon1.classList.contains('hide')) {
            icon1.classList.remove('hide')
            icon2.classList.add('hide')
        } else if (icon2.classList.contains('hide')) {
            icon2.classList.remove('hide')
            icon1.classList.add('hide')
        }
    }
)
