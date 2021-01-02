const likeForm = document.querySelectorAll('.likeForm');

const likeUnlike = async(postId) =>{
    try{
    const res = await axios({
      method:'PUT',
      url:'/posts/likeUnlike',
      data:{
          postId
      }
  });
    }catch(err)
    {
        console.log(err);
    } 
};

if(likeForm)
{
    likeForm.forEach(element => {
        element.addEventListener('submit', function (e) {
            e.preventDefault();
            const icon = this.querySelector('.fa-heart');
            icon.classList.toggle('liked');
            likeUnlike(this.dataset.id);
        }); 
    });
}
