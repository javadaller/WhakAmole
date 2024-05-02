// CREATE DIV
function createDiv(type,parent,content,className) {
  const newDiv=document.createElement(type);
  if (type!=null) {
    newDiv.innerHTML=content;
  }
  if (className!=null) {
    newDiv.classList.add(className);
  }
  parent.appendChild(newDiv);
  return newDiv;
}

//------------------------------------------------------------------------------------------
// SLEEP FUNCTION
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
