import './scss/style.scss'

const formEl = document.getElementById('form'),
  btnEl = document.querySelector('.btn')

// event listeners
formEl.addEventListener('input', (e) => {
  const inputName = e.target.dataset.cardInfo,
    targetFieldEl = document.querySelector(`[data-card-preview='${inputName}']`)

  const [isValid, errorMsg] = isUserInputValid(e.target)

  if (isValid) {
    targetFieldEl.textContent = e.target.value
    e.target.parentElement.classList.remove('error')
  } else {
    targetFieldEl.textContent = 'Input error!'
    showErrorMessage(e.target, errorMsg)
  }
})

btnEl.addEventListener('click', (e) => {
  const inputEls = document.querySelectorAll('[data-card-info]')
  let isFormDataValid = true

  inputEls.forEach((inputEl) => {
    const [isValid, errorMsg] = isUserInputValid(inputEl)

    if (!isValid) {
      isFormDataValid = false
      showErrorMessage(inputEl, errorMsg)
    }
  })

  if (isFormDataValid) {
    document.querySelector('.grid_form').classList.add('hidde-form')
  }
})

/** @param {Node} inputEl */
function isUserInputValid(inputEl) {
  let isInputValid = true,
    errorMsg = "Can't be blank"

  if (inputEl.value == '') {
    isInputValid = false
  } else {
    switch (inputEl.dataset.cardInfo) {
      case 'number':
        isInputValid = /^[\s\d]+$/.test(inputEl.value)
        errorMsg = 'Wrong format, numbers only'
        break

      case 'month':
        // prettier-ignore
        [isInputValid, errorMsg] = isNumberValid(inputEl.value, [1, 12])

        break

      case 'day':
        // prettier-ignore
        [isInputValid, errorMsg] = isNumberValid(inputEl.value, [1, 31])
        break

      case 'cvc':
        // prettier-ignore
        [isInputValid, errorMsg] = isNumberValid(inputEl.value, [0, 999])
        break

      default:
        isInputValid = true
    }
  }

  return [isInputValid, errorMsg]
}

/**
 * @param {Node} inputEl
 * @param {String} errorMsg
 */
function showErrorMessage(inputEl, errorMsg) {
  inputEl.parentElement.classList.add('error')

  // error msg element is in diferent position
  // for month and day, this  selector catch them all
  inputEl.closest('.input-group').querySelector('.error-msg').textContent =
    errorMsg
}

/**
 *
 * @param {String} input
 * @param {Array} range
 */
function isNumberValid(input, range) {
  if (/^\d+$/.test(input)) {
    const number = parseInt(input)

    if (number >= range[0] && number <= range[1]) {
      return [true, '']
    }
  }

  return [false, 'Wrong format']
}
