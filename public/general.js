function logoFlash()
{
    const logoNode = document.getElementsByClassName("logo")[0];
    let text = logoNode.innerText;
    const pos = Math.floor(Math.random()*(text.length-1));
    text=text.slice(0,pos)+'<span class="flash">'+text[pos]+"</span>"+text.slice(pos+1);
    logoNode.innerHTML = text;

}

setInterval(logoFlash,1000);

