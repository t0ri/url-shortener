const createUrl = async (callback=null) => {
  // Prevent Event from Refreshing Site
  // this.preventDefault()

  // Create New URL from Backend
  let response = await fetch('/url/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(
      {
        url: this.url.value,
        slug: this.slug.value,
      })
  })

  // Convert `result` to JSON
  let result = await response.json()

  // Evoke `callback`, if not `null`
  if (callback) {
    callback('response', result)
  }
}

const displayResponse = (elementKey, data) => {
  // Destructure `message` and `body` from `data`
  const { message, body } = data

  // Find & Reset `#elementKey`
  const parentElement = document.getElementById(elementKey)
  parentElement.innerHTML = ""

  // Create `<div>`
  let divElement = document.createElement('div')

  // Create `<p>{message}</p>`
  let pElement = document.createElement('p')
  pElement.appendChild(document.createTextNode(message))

  // Create `<a href=".../:slug">.../:slug</a>
  // OR `<a href=""></a>` if no `slug` exists
  let aElement = document.createElement('a')
  if (body.slug) {
    aElement.appendChild(document.createTextNode(`${window.location.href}url/${body.slug}`))
    aElement.href = `${window.location.href}url/${body.slug}`
  } else {
    aElement.appendChild(document.createTextNode(""))
  }

  // Add Elements to DOM
  divElement.appendChild(pElement)
  divElement.appendChild(aElement)
  parentElement.appendChild(divElement)
}