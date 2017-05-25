import {observable, action, useStrict, extendObservable} from 'mobx'
import axios from 'axios'
import Auth from './Auth'
var url = "http://localhost:8000"

useStrict(true)
class BookStore {


  constructor() {
    extendObservable(this,{
      _books :[]
    })
   this._books = this.fetchBooks()
  }


  getAllBooks() {
    return this._books
  }

  getSingleBook = action((id) =>{
    if(this._books == null){
      return null
    } 
    var returnBook;
    this._books.forEach((book,index) =>{
      if(book.id == id){
        returnBook = this._books[index]
      } 
    })
    return returnBook;
  })

  changeBooks = action((books) =>{
    this._books = books
  })

  addBook = action((book) =>{

    var config = {
      headers: {'Authorization' : "JWT " + Auth.getToken()}
    }

    axios.post(`${url}/api/books`,{book}, config)
      .then((response) =>{
        console.log(response)
        this.fetchBooks()
      })
      .catch((error) =>{
        console.log(error)
      })
    
  })

  editBook = (book) => {
     var config = {
      headers: {'Authorization' : "JWT " + Auth.getToken()}
    }

    if(book.id == null) throw Error("no Id!")
    axios.put(`${url}/api/books`,{book}, config)
    .then((response) =>{
      console.log(response)
      this.fetchBooks()
    })
    .catch((error) =>{
      console.log(error)
    })
  }

  deleteBook = action((bookId) =>{
     var config = {
      headers: {'Authorization' : "JWT " + Auth.getToken()}
    }
    
    axios.delete(`${url}/api/books/${bookId}`, config)
      .then((response) =>{
        console.log(response)
        this.fetchBooks()
      })
      .catch((error) =>{
        console.log(error)
      })
  })

  fetchBooks = () =>{
    fetch(`${url}/api/books `).then((response) =>{
      return response.json()
    }).then((response) =>{
      this.changeBooks(response)
    }).catch((err) =>{
      console.log(err)
    })
  }
}


let store = new BookStore()
window.store = store

export default store