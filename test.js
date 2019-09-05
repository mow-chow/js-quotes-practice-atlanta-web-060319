// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading. 
const quotes = "http://localhost:3000/quotes?"
const likes = "http://localhost:3000/quotes?_embed=likes"

document.addEventListener("DOMContentLoaded", setUpPage)

function setUpPage(){
    let form = document.getElementById("new-quote-form")
    form.addEventListener("submit", newquote)
    getQuotes()
}

function newquote(e){

    e.preventDefault()
    console.log(e.target['new-quote'].value)
     
    let newQuote = {
        quote: e.target['new-quote'].value,
        author: e.target.author.value,
        likes: 0
        }
        console.log("yep", newQuote)
        return addNewQuote(newQuote)
     
}

function addNewQuote(quote){
    console.log(quote)
    fetch('http://localhost:3000/quotes',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(quote)
    })
        .then(res => res.json())
        .then(data => createQuoteCard(data))
        .catch(res => console.log("Error", res))
 }

function getQuotes(){
    fetch(likes)
    .then(response => response.json())
    //.then(data => console.log(data))
    .then(data => createQuoteList(data))
}

function createQuoteList(quotes){
    quotes.forEach(createQuoteCard)
}

function createQuoteCard(quote){
    const ul = document.getElementById('quote-list')

    let li = document.createElement('li')
    li.classname = 'quote-card'

    let blockQuote = document.createElement('blockquote')
    blockQuote.className = 'blockquote'

    let p = document.createElement('p')
    p.innerText = quote.quote

    let footer = document.createElement('footer')
    footer.className = 'blockquote-footer'
    footer.innerText = quote.author

   

    let likeBtn = document.createElement("button")
   likeBtn.className = "btn-success"
   likeBtn.innerText = "Likes: "
   likeBtn.setAttribute("data-id", quote.id)
   likeBtn.addEventListener("click", handleLikeBtn)

    let deleteBtn = document.createElement("button")
   deleteBtn.className = "btn-danger"
   deleteBtn.innerText = "delete"
   deleteBtn.setAttribute("data-id", quote.id)
   deleteBtn.addEventListener("click", handleDelete)
   



    ul.appendChild(li)
    li.appendChild(blockQuote)
    blockQuote.appendChild(p)
    blockQuote.appendChild(footer)
    blockQuote.appendChild(likeBtn)
    blockQuote.appendChild(deleteBtn)

}


function handleLikeBtn(e){
    let moreLikes = parseInt(e.target.querySelector("span").innerText) +1
    let span = e.target.querySelector("span")
    span.innerText = moreLikes
    e.preventDefault
 
    return fetch('http://localhost:3000/likes',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            quoteId: parseInt(e.target.dataset.id)
        })
    })
    .then(response => response.json())
 }
function handleDelete(e){
    console.log("id", e)
    let qId = parseInt(e.target.dataset.id)
    console.log("e", qId)
     e.target.parentElement.remove()
 
    fetch(`http://localhost:3000/quotes/${qId}`,{
        method: "DELETE",
    })
    .then(res => console.log(res))
 }

