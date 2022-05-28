const loginBtn = document.getElementById("login");
const registerBtn = document.getElementById("register");
const logoutBtn = document.getElementById("logout");
const errText = document.getElementById("error-text");
const welcome = document.getElementById("welcome-msg");
const begone = document.getElementsByClassName("begone");

const welcomeMsg ="</br>You are now logged in and as such, you can do..... Nothing";

const userRegex = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
const pswrdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const inputs = document.getElementsByTagName("input");


registerBtn.addEventListener("click",()=>
{
    const username = inputs[0].value;
    const password = inputs[1].value;
    if(userRegex.test(username))
    {
        if(pswrdRegex.test(password))
        {
            localStorage.setItem(username,password);
            alert("Register Succesful");
            inputs[0].value ="";
            inputs[1].value ="";
            errText.style.display="none";
            return;
        }
        else
        {
            errText.innerHTML = "Password Invalid";
        }
    }
    else
    {
        errText.innerHTML = "Username Invalid!";
    }
    errText.style.display = "block";
    inputs[0].value ="";
    inputs[1].value ="";
})

loginBtn.addEventListener("click",()=>
{
    const username = inputs[0].value;
    const password = inputs[1].value;

    if(userRegex.test(username))
    {
        if(pswrdRegex.test(password))
        {
            if(localStorage.getItem(username))
            {
                if(localStorage.getItem(username) == password)
                {
                    
                    logoutBtn.style.display="block";
                    errText.style.display="none";
                    welcome.innerHTML = "Welcome: " + username +welcomeMsg;
                    welcome.style.display="block";
                    inputs[0].value ="";
                    inputs[1].value ="";
                    for(elem of begone)
                    {
                        elem.style.display="none";
                    }
                    return;
                }
                else
                {
                    errText.innerHTML = "Password is incorrect";
                }
            }
            else
            {
                errText.innerHTML = "Username not found";
            }
            
        }
        else
        {
            errText.innerHTML = "Password Invalid";
        }
    }
    else
    {
       errText.innerHTML = "Username Invalid!";
    }
    errText.style.display = "block";
    inputs[0].value ="";
    inputs[1].value ="";
})

logoutBtn.addEventListener("click",()=>
{
    logoutBtn.style.display="none";
    for(elem of begone)
    {
        elem.style.display="block";
    }
    welcome.style.display="none";
})
