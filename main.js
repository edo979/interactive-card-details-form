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

/** @param {Node} inputEl */
function isUserInputValid(inputEl) {
  let isInputValid = true,
    errorMsg = "Can't be blank"

  if (inputEl.value == '') {
    isInputValid = false
  } else if (
    inputEl.dataset.cardInfo == 'number' &&
    !/^[\s\d]+$/.test(inputEl.value)
  ) {
    isInputValid = false
    errorMsg = 'Wrong format, numbers only'
  } else if (
    inputEl.dataset.cardInfo === 'month' ||
    (!/^[0-9]+$/.test(inputEl.value) && parseInt(inputEl.value) > 12)
  ) {
    isInputValid = false
    errorMsg = 'Wrong number format'
  } else if (
    inputEl.dataset.cardInfo == 'day' &&
    parseInt(inputEl.value) > 31
  ) {
    isInputValid = false
    errorMsg = 'Wrong number format'
  } else if (
    inputEl.dataset.cardInfo == 'cvc' &&
    parseInt(inputEl.value) > 999
  ) {
    isInputValid = false
    errorMsg = 'Wrong number format'
  } else {
    isInputValid = true
  }

  if (!isInputValid) {
    inputEl.parentElement.classList.add('error')
    showErrorMessage(inputEl, errorMsg)
  } else {
    inputEl.parentElement.classList.remove('error')
  }

  return isInputValid
}

/**
 * @param {Node} inputEl
 * @param {String} errorMsg
 */
function showErrorMessage(inputEl, errorMsg) {
  inputEl.parentElement.querySelector('.error-msg').textContent = errorMsg
}
