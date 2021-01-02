const updateProfile = document.querySelector('.updatePhoto');

const updateProfilePhoto = async(photo) =>{
    try{
    const res = await axios({
      method:'PUT',
      url:`/api/v1/users/updateProfileImage`,
      data:{
         photo
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

if(updateProfile)
{
    updateProfile.addEventListener('click',function(e){
        e.preventDefault();
        const addFile = document.querySelector('.imageInput');
        if(addFile)
        {
            addFile.click();
            addFile.addEventListener('change',function(ele){
                const imageUrl = document.getElementById('my_file').files[0];
                console.log(imageUrl);
                const data = new FormData();
                data.append("file",imageUrl);
                data.append("upload_preset","socialMedia");
                data.append("cloud_name","dnzuzshzs");
                fetch("https://api.cloudinary.com/v1_1/dnzuzshzs/image/upload",{
                    method:"post",
                    body:data
                })
                .then(res=>res.json())
                .then(data=>{
                    updateProfilePhoto(data.url);
                })
                .catch(err=>{
                    console.log(err);
                });
            });
        }
    });
}
