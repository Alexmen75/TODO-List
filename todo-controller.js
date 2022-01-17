const taskGenerator = function*(){
  for(let i = 1; i < 6; i++){
    yield new Todo(`Task ${i}`);
  }
}

const todoCreator = todo => {
  const checkBox = $("input",{
    checked: todo.checked,
    type: "checkbox",
    id: todo.id
  });
  const task = $("p",{innerText: todo.innerText,
                      id: todo.id}); 
  task.prepend(checkBox);
  return task;
}

const compleatedTasks = () => `${todos.filter(t => t.checked == true).length}/${todos.length}` ;

const getTodos = () => {
  Array.from(taskGenerator()).forEach(i => todos.push(i));
  return todos;
}

const tugle = e =>{
  const check = todos.find(x => x.id == e.target.id);
  check.checked = !check.checked;
  updatePage();
}