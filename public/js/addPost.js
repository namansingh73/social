const postInput = document.querySelector('.input');
const updateProfile = document.querySelector('.updatePhoto');

const addPost = async (title,caption,photo) => {
    try{
    const res = await axios({
      method:'POST',
      url:'/posts/addpost',
      data:{
          title,
          caption,
          photo
      }
  });
  if(res.data.status === 'success')
  {
    //showAlert('success','Post added successfully!');
    window.setTimeout(()=>{
        location.assign('/mainpage');
    },1000);
  }
  console.log(res); 
    }catch(err)
    {
        console.log(err);
        //showAlert('error','Try again later!');
    } 
};



if(updateProfile)
{
    updateProfile.addEventListener('click',function(e){
        e.preventDefault();
        const addFile = document.querySelector('.image');
        if(addFile)
        {
            addFile.click();
            addFile.addEventListener('change',function(ele){
                const imageUrl = document.getElementById('my_file').files[0];
                console.log(imageUrl);
                if(postInput)
                {
                    postInput.addEventListener('submit', e => {
                        e.preventDefault();
                        const title = document.getElementById('input_text').value;
                        const caption = document.getElementById('textarea2').value;
                        // const imageUrl = document.getElementById('fileInput').files[0];
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
                                addPost(title,caption,data.url);
                            })
                            .catch(err=>{
                                console.log(err);
                        });
                    });
                }
            });
        }
    });
}
