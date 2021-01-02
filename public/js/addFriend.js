const reqSent = document.querySelectorAll('.addFriend');

const sendReq = async(currUser,user) =>{
    try{
    const res = await axios({
      method:'PUT',
      url:`/posts/addFriend/${user}`,
      data:{
         currUser,
         user
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

if(reqSent)
{
    reqSent.forEach(element => {
        element.addEventListener('submit', function (e) {
            e.preventDefault();
            const currUser = this.dataset.id.split('-')[0];
            const user = this.dataset.id.split('-')[1];
            sendReq(currUser,user);
        }); 
    });
}
