export function maskCurrencyInput(event) {
  const onlyDigits = event.target.value
    .split('')
    .filter((s) => /\d/.test(s))
    .join('')
    .padStart(3, '0')
  const digitsFloat = `${onlyDigits.slice(0, -2)}.${onlyDigits.slice(-2)}`

  function maskCurrency(valor, locale = 'pt-BR', currency = 'BRL') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(valor)
  }

  event.target.value = maskCurrency(digitsFloat)
}
