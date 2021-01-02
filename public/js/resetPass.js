
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
const resetForgot = document.querySelector('.input');

const reset = async(password,passwordConfirm) =>{
    try{
    
    const ele = window.location.href.split('/');
    const token = ele[ele.length-1];
    const res = await axios({
      method:'PATCH',
      url:`/api/v1/users/resetpassword/${token}`,
      data:{
          password,
          passwordConfirm
      }
  });
  if(res.data.status === 'success')
  {
    //showAlert('success','Password reset done successfully!');
    window.setTimeout(()=>{
        location.assign('/mainpage');
    },1000);
  }
  console.log(res);
    }catch(err)
    {
        console.log(err);
        //showAlert('error','Password cannot be changed! Try again later');
    } 
};

if(resetForgot)
{
    resetForgot.addEventListener('submit', e => {
        e.preventDefault();
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;
        console.log(password,passwordConfirm);
        reset(password,passwordConfirm);
    });
}