window.addEventListener('scroll',function(){
    const navmenu = document.getElementById('navmenu');
    if(this.window.scrollY > 50)
        {
            navmenu.style.backgroundColor= 'rosybrown';
        }
    else{
        navmenu.style.backgroundColor= 'teal';
    }
});