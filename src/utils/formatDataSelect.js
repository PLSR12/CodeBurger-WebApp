export function formatDataSelect(data) {
  const dataFormat = data.map((rows) => {
    const formatCategories = {
      id: rows.id,
      label: rows.name,
    }

    return formatCategories
  })

  return dataFormat
}
