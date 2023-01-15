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
                        ${item.volumeInfo.categories === undefined ? "-" : item.volumeInfo.categories}
                        </span>
                        <span class="badge badge-warning">Pages : 
                        ${item.volumeInfo.pageCount === undefined ? "-" : item.volumeInfo.pageCount}
                        </span>
                        <br><br>
                        <ul class="list-group">
                        <li class="list-group-item" id="description">${item.volumeInfo.description === undefined ? 'No Description.': item.volumeInfo.description}</li>
                        <li class="list-group-item"><span style="font-weight:bold">Authors :</span> ${item.volumeInfo.authors === undefined ? "Author unavailable" : item.volumeInfo.authors}</li>
                        <li class="list-group-item"><span style="font-weight:bold">Published by :</span> ${item.volumeInfo.publisher === undefined ? "No publisher info." : item.volumeInfo.publisher} ${item.volumeInfo.publishedDate === undefined ? "No Published Date." :  `Published on ${item.volumeInfo.publishedDate}.`}</li>
                        <li class="list-group-item"><span style="font-weight:bold">ISBN :</span> ${item.volumeInfo.industryIdentifiers[0].identifier}</li>
                        <li class="list-group-item"><span style="font-weight:bold">Rating :</span> ${this.getStars(item.volumeInfo.averageRating)} (${item.volumeInfo.ratingsCount === undefined ? "-" : item.volumeInfo.ratingsCount })</li>
                        
                        

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
    addReadMoreButton(charLimit) {
        //Get all the description elements
        const descriptionElements = document.querySelectorAll('#description');


        //Iterate throught every element
        descriptionElements.forEach((element) => {
                        
            //Get text from element
            const text = element.textContent;

            //Checks if text length is bigger than charLimit parameter
            if(text.length>charLimit){ //if yes
                //Create a show more button
                const readMoreBtn = document.createElement('a');
                readMoreBtn.href="#";
                readMoreBtn.classList.add('read-more-btn');
                readMoreBtn.innerHTML="Read More";

                //Create show less Button
                const showLessBtn = document.createElement('a');
                showLessBtn.href="#";
                showLessBtn.classList.add('show-less-btn');
                showLessBtn.innerHTML="Show Less";

                //Truncate Text
                const truncateText=text.substring(0,charLimit)+"...";
                
                //Replace the full text with truncuate text
                element.textContent=truncateText;
                
                //Append read more button to element
                element.appendChild(readMoreBtn);

                //Add event listener to Button
                readMoreBtn.addEventListener("click",function(e){

                    //On click it will show the full text
                    element.textContent=text;
                    //The Read More Button wont be displayed
                    readMoreBtn.style.display='none';
                    //Append show less button to element 
                    element.appendChild(showLessBtn);
                    //Show less element will be displayed
                    showLessBtn.style.display = "inline-block";
                    //Prevent Default behavior
                    e.preventDefault();

                    
                })
                showLessBtn.addEventListener('click',function(e){
                    //On click, replace full text with truncated text
                    element.textContent=truncateText;
                    //Append read more button to element
                    element.appendChild(readMoreBtn);
                    //Hide show less button
                    showLessBtn.style.display='none';
                    //Read more btn will be displayed
                    readMoreBtn.style.display='inline-block'
                    //Prevent default behavior
                    e.preventDefault();
                })


            }
        })
      }
      
}
