export default function maskContactInput(event) {
  const value = event.target.value
  const ddd = value.slice(0, 2)
  const numberReal = value.substring(2)

  let telefoneFormated
  function maskContact() {
    if (value.length === 11) {
      return (
        `(${ddd})` +
        numberReal.substring(0, 5) +
        '-' +
        numberReal.substring(5, 9)
      )
    } else {
      return `${ddd + numberReal}`
    }
  }
  event.target.value = maskContact(telefoneFormated)
}
