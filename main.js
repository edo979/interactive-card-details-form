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
  // prettier-ignore
  const reg = /^[\s\d]+$/
  let isInputValid = true,
    errorMsg = "Can't be blank"

  if (inputEl.value == '') {
    isInputValid = false
  } else if (
    // skip validate cardholder name
    inputEl.dataset.cardInfo != 'cardholder' &&
    !reg.test(inputEl.value)
  ) {
    isInputValid = false
    errorMsg = 'Wrong format, numbers only'
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
