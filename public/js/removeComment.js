const deleteComment = document.querySelectorAll('.del-btn');

const hideAlert = () => {
    const el = document.querySelector('.alert');
    if(el)
    {
        el.parentElement.removeChild(el);
    }
};

//show success or failure
const showAlert = (type,msg,time=3) => {
    hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin',markup);
    window.setTimeout(hideAlert,time*1000);
};


const removeComment = async(postId,commentId) =>{
    try{
    const res = await axios({
      method:'PUT',
      url:`/posts/removeComment/${commentId}`,
      data:{
          postId,
          commentId
      }
  });
  if(res.data.status === 'success')
  {
    //showAlert('success','Comment removed successfully');
    window.setTimeout(()=>{
        location.assign(`/posts/showComments/${postId}`);
    },1000);
  }
    }catch(err)
    {
        console.log(err);
        //showAlert('error','Try again later');
    } 
};

if(deleteComment)
{
    deleteComment.forEach(element => {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            const postId = element.dataset.id.split('-')[0];
            const commentId = element.dataset.id.split('-')[1];
            removeComment(postId,commentId);
        }); 
    });
}
