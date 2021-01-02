const deletePost = document.querySelectorAll('.removePost');

const removePost = async(postId) =>{
    try{
    const res = await axios({
      method:'DELETE',
      url:`/posts/removePost/${postId}`,
      data:{
         postId
      }
  });
  if(res.data.status === 'success')
  {
      location.reload();
  }
    }catch(err)
    {
        console.log(err);
    } 
};

if(deletePost)
{
    deletePost.forEach(element => {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            removePost(element.dataset.id);
        }); 
    });
}
