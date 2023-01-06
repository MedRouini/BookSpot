class GoogleApi{
    constructor(){
        this.API_KEY='AIzaSyCF9-KfXWiLmxjOorynI7lLJJ6lsd9JHQQ';

    }
    async getBook(bookName){
        const bookResponse = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookName}&key=${this.API_KEY}`)
        
        const book = await bookResponse.json();

        return {
            book
        }       
    }
}

