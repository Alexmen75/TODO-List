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
  
  loadingContent = {
    usingEntries: new Set(),
    insertByResult: new Map(),
  } 
  


  constructor(model, view) {
    this.view = view;
    this.setModel(model);
  }

  setModel = (model) => {
    this.model = model;
    this.viewModel = new ViewModel(this.model.todos, (this.viewModel || {}).query);
  }

  switchChange = (model, contextModel) => {
    const aggregateModel = model;
    aggregateModel.todos = model.todos.map(todo => {
      const contextValue = contextModel.todos.find(x => x.id == todo.id);
      return contextValue.isDone == todo.isDone ?
              this.model.todos.find(x => x.id == contextValue.id) :
              todo;
    }) 
    this.setModel(aggregateModel);
  }
     // if(contextValue.isDone == todo.isDone){
      //   return this.model.todos.find(x => x.id == contextValue.id);
      // }
      // return todo;

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
    console.log('страница обновлена')
    this.view.render(this.viewModel, this);
  }
  
  // renderSearchResult = (model) => {  
  //   this.view.renderSearchRequest(model, this);
  // }


  toogle = async (todo, e) => {
    // this.rerender();
    // const contextModel = this.model
    // this.setModel(await contextModel.toogle(todo), contextModel);
    // this.rerender();
    
    const contextModel = this.model;
    this.blockLoadExecute([todo.id], () => this.model.toogle(todo), result => this.switchChange(result, contextModel));
    this.rerender();
    // this.load(() => {
    //   this.usingEntries.add(todo.id);
    //   return this.model.toogle(todo);
    // }, 
    // this.setModel, 
    // (_) => this.usingEntries.delete(todo.id));
    // this.execute();
    

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
    this.loadingContent.insertByResult.set(func, Array.from(needToPut));
  }

  // loadExecute = (func, ...needToPut) => {
  //   this.load(func, needToPut);
  //   this.execute();
  // }

  block = (...block) => this.loadingContent.usingEntries.add(...block);

  blockLoadExecute = (block, func, ...needToPut) => {
      this.block(...block);
      this.load(func, ...needToPut);
      this.execute();
  }


  execute = async () => 

    this.loadingContent.insertByResult.forEach(async (value, key) => {
      const result = await key();
      value.forEach(func => func(result));
      this.loadingContent.insertByResult.delete(key);
      this.loadingContent.usingEntries.clear();
      this.rerender();
    })




    //   await Array.from(this.loadingContent.insertByResult.entries()).map(async([key, value]) => {
    //   const result = await key();
    //   const r = value.map(func => func(result));
    //   this.loadingContent.insertByResult.delete(key);
    //   this.loadingContent.usingEntries.clear();
    //   this.rerender();
    //   return r;
    // });
    

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
