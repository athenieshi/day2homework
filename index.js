// const artistForm = document.querySelector('#artistForm')

// artistForm.addEventListener('submit', handleSubmit)

// const details = document.querySelector('#details')

// function handleSubmit(ev) {
//   ev.preventDefault()
//   const form = ev.target
//   const details = document.querySelector('#details')
//   const artist= {name: form.artistName.value, genre: form.artistGenre.value}
//   details.prepend(renderList(artist))
  
// }

// function renderListItem(label, value) {
//   const item = document.createElement('li')
//   item.innerHTML = `${label}: ${value}`

//   return item
// }

// function renderList(personData) {

//   const list = document.createElement('ul')
//   const deleteButton = document.createElement("button");

//   deleteButton.addEventListener('click', handleDelete)

//   Object.keys(personData).map(function(label) {
//     const item = renderListItem(label, personData[label])
//     list.appendChild(item)
//     list.appendChild(deleteButton)
//   })

//   return list
// }


// function handleDelete(ev) {
  
// }

const app = {
  init(selectors) {
    this.artist = []
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)
    this.template = document.querySelector(selectors.templateSelector)
    document
      .querySelector(selectors.formSelector)
      .addEventListener('submit', this.addArtistFromForm.bind(this))

    this.load()
  },

  load() {
    // load the JSON from localStorage
    const artistJSON = localStorage.getItem('artist')

    // convert the JSON back into an array
    const artistArray = JSON.parse(artistJSON)

    // set this.dinos with the dinos from that array
    if (artistArray) {
      artistArray
        .reverse()
        .map(this.addArtist.bind(this))
    }
  },

  addArtist(artist) {
    const listItem = this.renderListItem(artist)
    this.list.insertBefore(listItem, this.list.firstChild)

    this.artist.unshift(artist)
    this.save()

    ++ this.max
  },

  addArtistFromForm(ev) {
    ev.preventDefault()

    const artist = {
      id: this.max + 1,
      name: ev.target.artistName.value, genre: ev.target.artistGenre.value,
    }

    this.addArtist(artist)
    
    ev.target.reset()
  },


  save() {
  //   const listItems = this.list.children
  //   for (let i=0; i < listItems.length; i++) {
  //     const listItem = listItems[i]
  //     this.artist[i].id = i
  //     listItem.dataset.id = this.artist[i].id
  //     console.log(i)
  //   }
    localStorage
      .setItem('artist', JSON.stringify(this.artist))
    
  },

  renderListItem(artist) {
    const item = this.template.cloneNode(true)
    item.classList.remove('template')
    item.dataset.id = artist.id

    item
      .querySelector('.artist-name')
      .textContent = artist.name
    item
      .querySelector('.artist-genre')
      .textContent = artist.genre
    item
      .querySelector('button.remove')
      .addEventListener('click', this.removeArtist.bind(this))

    return item
  },

  removeArtist(ev) {
    const listItem = ev.target.closest('.artist')
    listItem.remove()

    for (let i = 0; i < this.artist.length; i++) {
      const currentId = this.artist[i].id.toString()
      if (listItem.dataset.id === currentId) {
        this.artist.splice(i, 1)
        break;
      }
    }

    this.save()
  },
}

app.init({
  formSelector: '#artist-form',
  listSelector: '#artist-list',
  templateSelector: '.artist.template',
})

