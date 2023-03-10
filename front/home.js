const modal = document.querySelector('#modalExemplo')
const imgInsert = document.querySelector('#img-insert')
const imgDisplay = document.querySelector('#img-display')
const form = document.querySelector('#form-receita')
const cardModel = document.querySelector('.cards-container')
const urlBD = 'http://localhost:3000/receita'
let editable = false
let editing = false

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const modalBackdrop = document.querySelector('.modal-backdrop')
    modal.style.display = 'none'
    modalBackdrop.style.display = 'none'
    let inputs = new FormData(form)
    const data = Object.fromEntries(inputs)
    const { "img-display": { name: imgName }, ingredientes, nome, modo, tempo, porcoes } = data

    let dataJson = JSON.stringify({
        "img": imgName,
        "ingredientes": ingredientes,
        "nome": nome,
        "desc": modo,
        "tempoPreparo": tempo,
        "rendimento": porcoes
    })

    fetch(urlBD, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: dataJson
    }).then(response => response.json())
        .then(data => {
            console.log(data)
            renderReceitas()
        })
        .catch(err => {
            console.log(err)
        })
});

imgInsert.addEventListener('click', () => {
    imgDisplay.click()
});

imgDisplay.addEventListener('change', (e) => {
    if (e.target.files.length <= 0) return
    let file = e.target.files[0]
    let reader = new FileReader()
    reader.onload = (e) => {
        imgInsert.src = reader.result
    }
    reader.readAsDataURL(file)
});

const fetchReceitas = async () => {
    const response = await fetch(urlBD)
    const data = await response.json()
    return data
}

const renderReceitasDestaque = async () => {
    const carrouselInner = document.querySelector('.carousel-inner')
    const carouselIndicators = document.querySelector('.carousel-indicators')

    const receitas = await fetchReceitas()

    const ramdomReceitas = receitas.sort(() => Math.random() - 0.5)

    const receitasLimite = ramdomReceitas.slice(0, 4)

    receitasLimite.forEach((element, index) => {
        const carrouselIndicator = document.createElement('li')
        carrouselIndicator.setAttribute('data-slide-to', `${index + 1}`)
        carrouselIndicator.setAttribute('data-target', '#carouselExampleIndicators')

        carrouselIndicator.innerHTML = element.nome
        const carrouselItem = document.createElement('div')
        const imgCarrousel = document.createElement('img')
        carrouselItem.classList.add('carousel-item')

        imgCarrousel.classList.add('d-block', 'w-100', 'img-fluid', 'img-carrousel')
        imgCarrousel.src = "../assets/" + element.img
        carrouselItem.appendChild(imgCarrousel)
        carouselIndicators.appendChild(carrouselIndicator)
        carrouselInner.appendChild(carrouselItem)
    });
};
renderReceitasDestaque()

const renderReceitas = async () => {
    const receitas = await fetchReceitas()
    const container = document.querySelector('.cards')
    container.innerHTML = ''

    await receitas.forEach(element => {
        const cardsContainer = cardModel.cloneNode(true)
        const cardTitle = cardsContainer.querySelector('.card-title')
        const cardBody = cardsContainer.querySelector('.card-body')
        cardsContainer.classList.remove('model')

        const titleElement = document.createElement('h2')
        titleElement.innerHTML = element.nome
        const tempoElement = document.createElement('span')
        tempoElement.innerHTML = element.tempo_preparo
        const ingredientesElement = document.createElement('span')
        ingredientesElement.innerHTML = element.ingredientes
        const rendimentoElement = document.createElement('span')
        rendimentoElement.innerHTML = element.rendimento
        const descricaoElement = document.createElement('span')
        descricaoElement.innerHTML = element.descricao
        const iconRemove = document.createElement('i')
        iconRemove.classList.add('fas', 'fa-trash-alt', 'remove-icon')
        iconRemove.setAttribute('onclick', `removeCard(${element.id},this)`)
        const iconEdit = document.createElement('i')
        iconEdit.classList.add('fas', 'fa-edit')
        iconEdit.setAttribute('onclick', `controlEditCard(${element.id},this)`)
        cardTitle.appendChild(titleElement)

        if (editable) {
            cardTitle.appendChild(iconRemove)
            cardTitle.appendChild(iconEdit)
        }

        cardBody.appendChild(descricaoElement)
        cardBody.appendChild(tempoElement)
        cardBody.appendChild(ingredientesElement)
        cardBody.appendChild(rendimentoElement)
        container.appendChild(cardsContainer)
    });
}
renderReceitas()

const controlEditCard = (id, element) => {
    if (editing) {
        saveCard(id, element)
    }
    else {
        editCard(element)
    }
}

const saveCard = async (id, element) => {
    const cardTitle = element.parentNode.parentNode.parentNode.querySelector('.card-title h2')
    const cardBody = element.parentNode.parentNode.parentNode.querySelector('.card-body')
    const spans = cardBody.querySelectorAll('span')

    const response = await fetch(`${urlBD}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "nome": cardTitle.innerHTML,
            "desc": spans[0].innerHTML,
            "tempoPreparo": spans[1].innerHTML,
            "ingredientes": spans[2].innerHTML,
            "rendimento": spans[3].innerHTML
        })
    })
    const data = await response.json()
    console.log(data)
    element.classList.toggle('fa-save')
    element.classList.add('fa-edit')
    cardBody.querySelectorAll('span').forEach(span => {
        span.setAttribute('contenteditable', 'false')
        span.style.border = 'none'
        span.style.padding = '0'
        span.style.background = 'transparent'
    });
    editing = false
    renderReceitas()
}

const editCard = async (element) => {
    editing = true
    element.classList.toggle('fa-edit')
    element.classList.add('fa-save')
    const cardBody = element.parentNode.parentNode.parentNode.querySelector('.card-body')
    cardBody.querySelectorAll('span').forEach(span => {
        span.setAttribute('contenteditable', 'true')
        span.style.border = '1px solid #ccc'
        span.style.padding = '5px'
        span.style.background = '#fff'
    })
}

const removeCard = async (id, element) => {
    let flag = confirm('Tem certeza que deseja remover essa receita?')
    if (!flag) return
    const response = await fetch(`${urlBD}/${id}`, {
        method: 'DELETE'
    })
    const data = await response.json()
    console.log(data)
    element.parentNode.parentNode.parentNode.remove()
}

const controlEditable = () => {
    if (editable) {
        editable = false
        renderReceitas()
    }
    else {
        editable = true
        renderReceitas()
    }
}