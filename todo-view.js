const updatePage = () => {
  document.documentElement.innerHTML = "";
  renderTodo();
  renderCompleated();
}


const renderTodo = () =>{
  const div = $("div", {id: "todos", onclick: tugle}, 
  ...(todos.length == 0 ? getTodos() : todos).map(todo => todoCreator(todo)));
  document.body.append(div);
}



const renderCompleated = () => {
  const compleated = $('p', {innerText: compleatedTasks()});
  const div = $("div", {id: "compleated"}, compleated);
  document.body.prepend(div);
}


