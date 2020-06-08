/**
 * Populate any given select by fetching any given url
 * @param {object} select the DOM element of the select tag
 * @param {string} url the url literal string
 */
function populateSelect(select, url) {
  select.disabled = true

  console.log(select)

  fetch(url)
  .then(res => res.json())
  .then(elements => {
    select.innerHTML = ''

    elements.forEach(element => {
      const { id, nome } = element
      select.innerHTML += `
        <option value="${select.name === 'uf'? id : nome}">
          ${nome}
        </option>`
    })

    select.disabled = false
  })
}

/**
 * IIFE to populate the UFs select
 */
(function populateUFs() {
  const ufSelect = document.querySelector('select[name=uf]')
  const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'

  populateSelect(ufSelect, url)
}())

/**
 * Getter to all cities
 * Activated by the UF select change
 * @param {object} event the change event
 */
function getCities(event) {
  const stateInput = document.querySelector('input[name=state]')
  const citySelect = document.querySelector('select[name=city]')
  const { value: stateID, options, selectedIndex } = event.target

  stateInput.value = options[selectedIndex].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateID}/municipios?orderBy=nome`

  populateSelect(citySelect, url)
}

/**
 * Adds the change event listener on UF select
 */
document
  .querySelector('select[name=uf]')
  .addEventListener('change', getCities)

// Array of selected items in the list
const collectedItems = document.querySelector('input[name="items"]')

let selectedItems = []

/**
 * Handles the selected item on the list
 * @param {object} event 
 */
function handleSelectedItem(event) {
  const { target: itemLi } = event

  itemLi.classList.toggle('selected')

  const { id: itemId } = itemLi.dataset
  const alreadySelected = selectedItems.findIndex(item => item == itemId)
  
  if (~alreadySelected) {
    selectedItems = selectedItems.filter(item => item != itemId)
  } else {
    selectedItems.push(itemId)
  }

  collectedItems.value = selectedItems
}

// Select the whole list of items to collect
const itemsToCollect = document.querySelectorAll('.items-grid li')

/**
 * Collect items event listener
 */
for (const item of itemsToCollect) {
  item.addEventListener('click', handleSelectedItem)
}
