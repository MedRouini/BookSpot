//Initializing the GoogleBook class
const googleApi=new GoogleApi

const ui=new UI

//Get value from search
document.getElementById('search-form').addEventListener('submit',(e)=>
{
    const input = document.getElementById('searchBook');
    if(input.value=='')
    {
        ui.showAlert('Please type a book name','alert alert-danger')
    }
    else{
    googleApi.getBook(input.value)
    .then((data)=>{
    if(data.book.totalItems===0){
        ui.showAlert('No book found','alert alert-danger')
        

    }else{
    ui.showBooks(data.book.items)}});
    

    }
    e.preventDefault();

})