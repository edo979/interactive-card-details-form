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

  let result = []
  switch (inputEl.dataset.cardInfo) {
    case 'number':
      isInputValid = /^[\s\d]+$/.test(inputEl.value)
      errorMsg = 'Wrong format, numbers only'
      break

    case 'month':
      // prettier-ignore
      result = isNumberValid(inputEl.value, [0, 12])
      // prettier-ignore
      [isInputValid, errorMsg] = result
      console.log(result)
      break

    case 'day':
      if (Number.isInteger(inputNum) && inputNum > 0 && inputNum <= 31) {
        isInputValid = true
      } else {
        isInputValid = false
        errorMsg = 'Wrong number format'
      }
      break

    case 'cvc':
      if (Number.isInteger(inputNum) && inputNum > 0 && inputNum <= 999) {
        isInputValid = true
      } else {
        isInputValid = false
        errorMsg = 'Wrong number format'
      }
      break

    default:
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

function isNumberValid(input, range) {
  if (/^\d+$/.test(input)) {
    const number = parseInt(input)

    if (number > range[0] && number <= range[1]) {
      return [true, '']
    }
  }

  return [false, 'Wrong format']
}
