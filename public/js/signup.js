const signupForm = document.querySelector('.newuser');

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


const signup = async(name,username,email,password,passwordConfirm) =>{
    console.log(name,email,username,password);
    try{
    const res = await axios({
      method:'POST',
      url:'/api/v1/users/signup',
      data:{
          name,
          username,
          email,
          password,
          passwordConfirm
      }
  });
  if(res.data.status === 'success')
  {
    //showAlert('success','Signed up successfully!');
    window.setTimeout(()=>{
        location.assign('/mainpage');
    },1000);
  }
  console.log(res); 
    }catch(err)
    {
        console.log(err);
    } 
};

if(signupForm)
{
    signupForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const name = document.getElementById('name').value;
        const username = document.getElementById('username').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        signup(name,username,email,password,confirmPassword);
    });
}
