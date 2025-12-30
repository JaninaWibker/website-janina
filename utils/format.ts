// the superior date format
const dateFormatter = new Intl.DateTimeFormat('de-DE', {
  month: '2-digit',
  day: '2-digit',
  year: 'numeric'
})

export const formatDate = (date: Date) => dateFormatter.format(date)
