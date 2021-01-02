const commentForm = document.querySelectorAll('.commentForm');

const comment = async(text,postId) =>{
    try{
    const res = await axios({
      method:'PUT',
      url:'/posts/addComment',
      data:{
          text,
          postId
      }
  });
  if(res.data.status === 'success')
  {
    window.setTimeout(()=>{
        location.assign('/mainpage');
    },1000);
  }
    }catch(err)
    {
        console.log(err);
    } 
};

if(commentForm)
{
    commentForm.forEach(element => {
        element.addEventListener('submit', function (e) {
            const ele = this.querySelector('.addComment');
            e.preventDefault();
            if(ele.value !== '')
            {
                comment(ele.value,this.dataset.id);
            }
        }); 
    });
}
