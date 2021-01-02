const acceptReject = document.querySelectorAll('.buttons');

const accept = async(userId) =>{
    try{
    const res = await axios({
      method:'PUT',
      url:`/posts/acceptReq/${userId}`,
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


const reject = async(userId) =>{
    try{
    const res = await axios({
      method:'PUT',
      url:`/posts/rejectReq/${userId}`,
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


if(acceptReject)
{
    acceptReject.forEach(element => {
        element.childNodes[0].addEventListener('click', function (e) {
            e.preventDefault();
            accept(element.dataset.id);
        }); 

        element.childNodes[1].addEventListener('click', function (e) {
            e.preventDefault();
            reject(element.dataset.id);
        }); 
    });
}
