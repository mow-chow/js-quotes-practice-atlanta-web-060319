document.addEventListener('DOMContentLoaded', setUpPage)


function setUpPage(){
    let form = document.getElementById("new-quote-form")
    form.addEventListener("submit", newquote)
    renderQuoteCard()
}

function newquote(e){
    e.preventDefault()
    // console.log(e.target['new-quote'].value)
     
    let newQuote = {
        quote: e.target['new-quote'].value,
        author: e.target.author.value,
        likes: 0
        }
        // console.log("yep", newQuote)
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
            .then(data => renderQuoteCard(data))    
}

// fetch("/echo/json/",
// {
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     method: "POST",
//     body: JSON.stringify({a: 1, b: 2})
// })
// .then(function(res){ console.log(res) })
// .catch(function(res){ console.log(res) })


function renderQuoteCard(){
    fetch(`http://localhost:3000/quotes/`)
    .then(response => response.json())
    // .then(quotes => buildQuoteCard(quotes))
    .then(quotes => quotes.forEach(quote => buildQuoteCard(quote)))
}

function buildQuoteCard(quote){
    
    const quoteUl = document.querySelector('#quote-list')
    const quoteLi = document.createElement('li')
    quoteLi.className = 'quote-card'

    const blockquote = document.createElement('blockquote')
    blockquote.className = 'blockquote'

    const quoteText = document.createElement('p')
    quoteText.innerText = quote.quote
    

    const footer = document.createElement('footer')
    footer.innerText = quote.author
    
    const lineBreak = document.createElement('br')

    const likeCount = document.createElement('span')


    const likeBtn = document.createElement('button')
    likeBtn.innerText = 'like'
    // likeBtn.addEventListener('click', handleLikeBtn)

    const deleteBtn = document.createElement('button')
    deleteBtn.innerText = 'delete'
    deleteBtn.addEventListener('click', handleDeleteBtn)

quoteUl.appendChild(quoteLi)
quoteLi.appendChild(blockquote)
blockquote.append(quoteText, footer, lineBreak, likeBtn, likeCount, deleteBtn)

}

// function handleDeleteBtn(id, quotesUrl) {
//      fetch(url + '/' + item, {
//       method: 'delete'
//     })
//     .then(response => response.json());
//   }

