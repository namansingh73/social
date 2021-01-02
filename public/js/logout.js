const logout = async () => {
    try{
        const res = await axios({
            method: 'GET',
            url:'/api/v1/users/logout',
        });
        if(res.data.status === 'success')
        {
            window.setTimeout(()=>{
                location.assign('/login');
            },1000);
        }
    }catch(err)
    {
        console.log(err);
    }
};
const logOutBtn = document.querySelector('.logout');

if(logOutBtn)
{
    logOutBtn.addEventListener('click',logout);
}