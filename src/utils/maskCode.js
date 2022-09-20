export default function maskCode(event) {
  let { value } = event.currentTarget;
  value = `${value.replace(/[^a-z0-9]gi/, ' ')}`.toUpperCase();
  event.currentTarget.value = value;
}
