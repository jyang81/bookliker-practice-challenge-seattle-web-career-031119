document.addEventListener("DOMContentLoaded", function() {

  const BOOKS_URL = "http://localhost:3000/books"
  // const USERS_URL = "http://localhost:3000/users"

  function getBooks() {
    fetch(BOOKS_URL)
      .then(res => res.json())
      .then(books => {
        console.log('books:', books)
        displayBooks(books)
      })
  }
  //
  // function getUsers(){
  //   fetch(USERS_URL)
  //   .then(res => res.json())
  //   .then(user => () => {
  //     let name = user.username
  //     let id = user.id
  //   })
  // }


  function displayBooks(books) {
    books.forEach((book) => {
      console.log('book:', book.title)
      listBook(book)
    })
  }

  function listBook(book) {
    let list = document.getElementById('list')
    let li = document.createElement('li');
    li.textContent = book.title
    li.addEventListener('click', () => {
      showBook(book)
    })
    list.appendChild(li)

  }

  function clearBook() {
    let show = document.getElementById('show-panel')
    while (show.firstChild) {
      show.firstChild.remove()
    }
  }

  function showBook(book) {
    clearBook()
    let show = document.getElementById('show-panel')
    let h3 = document.createElement('h3')
    // console.log('book:', book.title)
    let title = book.title
    h3.textContent = title
    show.appendChild(h3)

    let img = document.createElement('img')
    img.src = book.img_url
    show.appendChild(img)

    let desc = document.createElement('p')
    desc.textContent = book.description
    show.appendChild(desc)

    listUsers(book)

    let button = document.createElement('button')
    // if (book.users.includes(user1)){
      // button.textContent = "Unlick book"
    // } else {
      button.textContent = "Lick book"
    // }
    show.appendChild(button)
    button.addEventListener('click', () => {
      likeBook(book)
    })
  }

  function listUsers(book) {
    let show = document.getElementById('show-panel')
    let userList = document.createElement('ul')
    userList.id = 'userList'
    show.appendChild(userList)
    reloadUsers(book)
  }


  function reloadUsers(book) {
    let userList = document.getElementById('userList')
    while (userList.firstChild) {
      userList.firstChild.remove()
    }
    book.users.forEach(user => {
      let li = document.createElement('li')
      li.textContent = user.username
      userList.appendChild(li)
    })
  }

  const user1 = {
    "id": 1,
    "username": "pouros"
  }

  function myUser(user) {
    return user === user1
  }

  function likeBook(book) {
    const bookUsers = book.users
    const index = bookUsers.findIndex(myUser)
    if (index < 0) {
      bookUsers.push(user1)
    } else {
      bookUsers.splice(index, 1)
    }
    fetch(BOOKS_URL + '/' + book.id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          users: bookUsers
        })
      })
      .then(res => res.json())
      .then(json => {
        reloadUsers(json)
      })
  }

  // function unlikeBook(book) {
    // const bookUsers = book.users
    // const index = bookUsers.findIndex(myUser)
    // bookUsers[index].remove()

  // }


  getBooks();


});
