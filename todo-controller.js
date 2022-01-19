class ViewModel {
  all; // array of Todos

  query; // string
  filtered; // array of Todos


  constructor(all, query = '') {
    this.all = all || [];
    this.query = query;
    this.filtered = this.all.filter(todo =>
      todo.title.includes(this.query));
  }
}

class Controller {
  model;
  view;
  viewModel;
  usingEntries = new Set();
  

  loadingContent = new Map();


  constructor(model, view) {
    this.view = view;
    this.setModel(model);
  }

  setModel = (model) => {
    this.model = model;
    this.viewModel = new ViewModel(this.model.todos, (this.viewModel || {}).query);
  }

  run = async () => {
    this.blockLoadExecute(["todos"], this.model.seedTodos, this.setModel);
    this.rerender();


    // this.usingEntries.add("todos");
    // this.load(() => {
    //   return this.model.seedTodos();
    // }, this.setModel, (_) => this.usingEntries.delete("todos"));
    // Загрузили данные с сервера
    // this.setModel(await this.model.seedTodos());
  }

  rerender = () => {
    this.view.render(this.viewModel, this);
  }
  
  // renderSearchResult = (model) => {
  //   this.view.renderSearchRequest(model, this);
  // }


  toogle = async (todo, e) => {
    this.blockLoadExecute([todo.id], () => this.model.toogle(todo), this.setModel);
    this.rerender();


    // this.load(() => {
    //   this.usingEntries.add(todo.id);
    //   return this.model.toogle(todo);
    // }, 
    // this.setModel, 
    // (_) => this.usingEntries.delete(todo.id));
    // this.execute();
    
    // this.setModel(await this.model.toogle(todo));
    // this.rerender();

  }

  search = e => {
    this.viewModel = new ViewModel(this.model.todos, e.target.value);
    this.rerender();
  }

  markAll = (todos, e) => {
    this.setModel(this.model.toogleMany(todos));
    this.rerender();
  }

  load = (func,...needToPut) => {
    this.loadingContent.set(func, Array.from(needToPut));
  }

  // loadExecute = (func, ...needToPut) => {
  //   this.load(func, needToPut);
  //   this.execute();
  // }

  blockLoadExecute = (block, func, ...needToPut) => {
    block.forEach(async item =>{
      this.usingEntries.add(item);
      this.load(func, ...needToPut,() => this.usingEntries.delete(item));
      this.execute();
    });
  }


  execute = async () => 
      await Array.from(this.loadingContent.entries()).map(async([key, value]) => {
      const result = await key();
      const r = value.map(func => func(result));
      this.loadingContent.delete(key);
      this.rerender();
      return r;
    });
    
    
    // Array.from(this.loadingContent.entries())
    // .map(async ([key, value]) => {
    //   const result = await key();
    //   return ([result, value, key]);
    // })
    // .map(async (promise) =>{
    //   const [result, values, key] = await promise;
    //   values.forEach(value => value(result));
    //   return key;
    // })
    // .forEach(async (promise) => {
    //   const key = await promise;
    //   this.loadingContent.delete(key);
    //   this.rerender();
    // });
  
}
