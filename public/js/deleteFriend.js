const deleteFriend = document.querySelectorAll('.del-btn');

const removeFriend = async(userId) =>{
    try{
    const res = await axios({
      method:'PUT',
      url:`/posts/removeFriend/${userId}`,
      data:{
         userId
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

if(deleteFriend)
{
    deleteFriend.forEach(element => {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            removeFriend(element.dataset.id);
        }); 
    });
}
