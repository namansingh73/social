const findUsers = document.querySelector('.search');

const searchUsers = async(name) =>{
    window.location.assign(`/showUsers/${name}`);
};

if(findUsers)
{
    findUsers.addEventListener('submit', e => {
        e.preventDefault();
        searchUsers(findUsers.childNodes[0].value);
    });
}
