class UI {
    constructor(){
        this.book=document.getElementById('book');
    }


    showBooks(books)
    {
        this.clearSearchResult();
        books.forEach((item)=>{
            this.book.innerHTML+=`
            <div class="card card-body mb-3">
                <div class="row">
                    <div class="col-md-3">
                        <img class="img-fluid mb-2" src=" ${item.volumeInfo.imageLinks.thumbnail}" style="width:100%;height:auto"></img>
                        <br>
                        <a href="${item.volumeInfo.previewLink}" target="_blank" 
                        class="btn btn-primary btn-block mb-4">View Preview</a>
                    </div>
                    <div class="col-md-9">
                        <div style="font-weight:bold"><h4>${item.volumeInfo.title}</h4></div>
                        <span class="badge badge-primary">Language : 
                        ${item.volumeInfo.language}
                        </span>
                        <span class="badge badge-success">Categories : 
                        ${item.volumeInfo.categories}
                        </span>
                        <span class="badge badge-warning">Pages : 
                        ${item.volumeInfo.pageCount}
                        </span>
                        <br><br>
                        <ul class="list-group">
                        <li class="list-group-item">${item.volumeInfo.description}</li>
                        <li class="list-group-item"><span style="font-weight:bold">Authors :</span> ${item.volumeInfo.authors}</li>
                        <li class="list-group-item"><span style="font-weight:bold">Published by :</span> ${item.volumeInfo.publisher} on ${item.volumeInfo.publishedDate}</li>
                        <li class="list-group-item"><span style="font-weight:bold">ISBN :</span> ${item.volumeInfo.industryIdentifiers[0].identifier}</li>
                        <li class="list-group-item"><span style="font-weight:bold">Rating :</span> ${this.getStars(item.volumeInfo.averageRating)} (${item.volumeInfo.ratingsCount})</li>
                        
                        

                        </ul>
                    
                    </div>

                </div>
            </div>
            `
        })
    }

    //A function that converts average to fontawesone stars
    getStars(rating){
        //Round rating to nearest half
        Math.round(rating*2)/2;

        let output='';

        //Appending Filled stars
        for(var i=rating ; i>=1;i--){
            output+=`<i class="fa-solid fa-star" style="color:gold;"></i>`
            
            }
        //Appending half Stars
        if (i===.5){
            output+=`<i class="fa-solid fa-star-half-stroke" style="color:gold"></i>`
        }

        //Appending White stars
        for(let i=(5-rating);i>=1;i--){
            output+=`<i class="fa fa-star-o" style="color:gold"></i>`

        }
        return output;

    }
    showAlert(message,className){
        //Clear Search Results
        this.clearSearchResult();
        //Clear any remaining alert
        this.clearAlert();
        
        //Append alert before search form
        document.getElementById('search-form').insertAdjacentHTML('beforebegin',
        `<div class="${className}">${message}</div>`);

        //SetTimeout before it disseapears
        setTimeout(()=>{
            this.clearAlert()
        },2000)

        
    }
    clearAlert(){
        const alert=document.querySelector('.alert')
        if(alert){
            alert.remove();

        }

    }
    clearSearchResult(){
        this.book.innerHTML='';
    }
}
