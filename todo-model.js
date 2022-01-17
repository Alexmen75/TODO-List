function Todo(str){
  this.id = str;
  this.innerText = str;
  this.checked = false;
  this.onclick = tugle;// этого быть не должно
}

const todos = [];