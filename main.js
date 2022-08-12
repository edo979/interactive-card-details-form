import './scss/style.scss'

const formEl = document.getElementById('form')

formEl.addEventListener('input', (e) => {
  const inputName = e.target.dataset.cardInfo,
    targetFieldEl = document.querySelector(`[data-card-preview='${inputName}']`)

  if (isUserInputValid(e.target)) {
    targetFieldEl.textContent = e.target.value
  } else {
    targetFieldEl.textContent = 'Input error!'
  }
})

function isUserInputValid(inputEl) {
  if (inputEl.value == '') {
    inputEl.parentElement.classList.add('error')
    return false
  } else {
    inputEl.parentElement.classList.remove('error')
    return true
  }
}
