const loginForm = document.querySelector('.input');

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


const login = async(email,password) =>{
    console.log(email,password);
    try{
    const res = await axios({
      method:'POST',
      url:'/api/v1/users/login',
      data:{
          email,
          password
      }
  });
  if(res.data.status === 'success')
  {
    //showAlert('success','Logged in successfully!');
    window.setTimeout(()=>{
        location.assign('/mainpage');
    },1000);
  }
  console.log(res); 
    }catch(err)
    {
        console.log(err);
        //showAlert('error','Incorrect email or password!');
    } 
};

if(loginForm)
{
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        console.log(email,password);
        login(email,password);
    });
}
