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
  }

  switch (inputEl.dataset.cardInfo) {
    case 'number':
      isInputValid = /^[\s\d]+$/.test(inputEl.value)
      errorMsg = 'Wrong format, numbers only'
      break

    case 'month':
      const inputNum = parseInt(inputEl.value)

      if (Number.isInteger(inputNum) && inputNum > 0 && inputNum <= 12) {
        isInputValid = true
      } else {
        isInputValid = false
        errorMsg = 'Wrong number format'
      }
      break

    default:
      isInputValid = true
  }

  if (
    inputEl.dataset.cardInfo === 'month' &&
    isNumberValid(parseInt(inputEl.value), [1, 12])
  ) {
    isInputValid = false
    errorMsg = 'Wrong number format'
  }

  if (inputEl.dataset.cardInfo == 'day' && parseInt(inputEl.value) > 31) {
    isInputValid = false
    errorMsg = 'Wrong number format'
  }

  if (inputEl.dataset.cardInfo == 'cvc' && parseInt(inputEl.value) > 999) {
    isInputValid = false
    errorMsg = 'Wrong number format'
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

function isNumberValid(num, range) {
  // &&
  // !(/^[0-9]+$/.test(inputEl.value) && parseInt(inputEl.value) <= 12)
}
