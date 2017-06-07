const artistForm = document.querySelector('#artistForm')

artistForm.addEventListener('submit', handleSubmit)

const details = document.querySelector('#details')

function handleSubmit(ev) {
  ev.preventDefault()
  const form = ev.target
  const details = document.querySelector('#details')
  const artist= {name: form.artistName.value, genre: form.artistGenre.value}
  details.prepend(renderList(artist))

}

function renderListItem(label, value) {
  const item = document.createElement('li')
  item.innerHTML = `${label}: ${value}`

  return item
}

function renderList(personData) {
  const list = document.createElement('ul')
  
  Object.keys(personData).map(function(label) {
    const item = renderListItem(label, personData[label])
    list.appendChild(item)
  })

  return list
}


