const callToAction = document.querySelector('#page-home main a')
const modal = document.getElementById('modal')
const closeButton = modal.querySelector('.header a')

callToAction.addEventListener('click', () => modal.classList.toggle('hidden'))

closeButton.addEventListener('click', () => modal.classList.toggle('hidden'))
