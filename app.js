const upBtn = document.getElementById('photo-scroll__up');
const downBtn = document.getElementById('photo-scroll__down');
const photoArr = document.querySelectorAll('#photo-display img');
const popUp = document.getElementById('pop-up');
const popUpArr = document.querySelectorAll('#pop-up .pop-up__item');
const backdrop = document.getElementById('backdrop');
const enlargedBack = document.querySelector('.enlarged-img');
const enlargedImg = document.querySelector('.enlarged-img__item');

let n = photoArr.length;
let count = 0;
let done = false;
let isReady = false;

photoArr[0].classList.add('fade-in');

upBtn.addEventListener('click', (e) => {
    photoFwd();
    e.preventDefault();
});

window.addEventListener('keydown', (e) => {
    if (e.keyCode === 39 && !(backdrop.classList.contains('backdrop-open')) && popUpArr[count].style.display !== 'flex') {
        setTimeout(() => {
            photoFwd();
        }, 10)
    }
})

downBtn.addEventListener('click', (e) => {
    photoBack();
    e.preventDefault();
})

window.addEventListener('keydown', (e) => {
    if (e.keyCode === 37 && !(backdrop.classList.contains('backdrop-open')) && popUpArr[count].style.display !== 'flex') {
        setTimeout(() => {
            photoBack();
        }, 10)
    }
})

let popUpImgs;
for (let i = 0; i < photoArr.length; i++) {
    photoArr[i].addEventListener('click', () => {
        popUpArr[count].style.display = 'flex';
        popUp.classList.add('open');
        backdrop.style.display = 'block';
        setTimeout(() => {
            backdrop.classList.add('backdrop-open');
            done = true;
        }, 0)

        popUpImgs = document.querySelectorAll('.open img');
        
        for (let j = 0; j < popUpImgs.length; j++) {
            popUpImgs[j].addEventListener('click', () => {
                enlargedBack.style.display = 'flex';
                enlargedImg.setAttribute('src', popUpImgs[j].getAttribute('src'));
                setTimeout(() => {
                    enlargedImg.classList.add('open-enlarged');
                }, 10)
            })
        }
    })   
}

enlargedBack.addEventListener('click', () => {
    enlargedImg.classList.remove('open-enlarged');
    setTimeout(() => {
        enlargedBack.style.display = 'none';
    }, 300)
})

backdrop.addEventListener('click', () => {
    if (done) {
        backdrop.classList.remove('backdrop-open');
        popUp.classList.remove('open');
        // isReady = true;
        setTimeout(() => {
            popUpArr[count].style.display = 'none';
            backdrop.style.display = 'none';
            done = false;
        }, 300)
    }
});

const photoFwd = () => {
    if (count === n-1) {
        count = 0;
        photoArr[n - 1].classList.remove('fade-in');
    } else {
        photoArr[count].classList.remove('fade-in');
        count++;
    }
    photoArr[count].classList.add('fade-in');
}

const photoBack = () => {
    if (count === 0) {
        photoArr[count].classList.remove('fade-in');
        count = n - 1;
    } else {
        photoArr[count].classList.remove('fade-in');
        count--;
    }
    photoArr[count].classList.add('fade-in');
}