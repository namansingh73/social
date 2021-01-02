
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
const passForgot = document.querySelector('.input');

const forgot = async(email) =>{
    console.log(email);
    try{
    const res = await axios({
      method:'POST',
      url:'/api/v1/users/forgotpassword',
      data:{
          email
      }
  });
  if(res.data.status === 'success')
  {
    console.log(res); 
    //showAlert('success','Password reset mail sent successfully!');
  }    }catch(err)
    {
        console.log(err);
        //showAlert('error','Incorrect email !');
    } 
};

if(passForgot)
{
    passForgot.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        console.log(email);
        forgot(email);
    });
}