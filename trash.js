asyncAction = (func, ...blockList) => async () => {
task
    try {
      this.block(...blockList);
      task.pending
      this.rerender();

      const contextModel = this.model;
      const result = await func(contextModel);
      this.applyChange(result, contextModel);

      this.unblock(...blockList);
    }
    catch (error) {
      console.log(error);
    }
    finally {
      this.loadingContent.usingEntries.delete(...block);
      this.rerender();
    }
  }






  // this.loadingContent.insertByResult.forEach(async (value, key) => {
  //   const result = await key();
  //   value.forEach(func => func(result));
  //   this.loadingContent.insertByResult.delete(key);
  //   this.loadingContent.usingEntries.clear();
  //   this.rerender();
  // })

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


    // this.loadingContent.insertByResult.set(func, Array.from(needToPut));



  // loadExecute = (func, ...needToPut) => {
  //   this.load(func, needToPut);
  //   this.execute();
  // }








    // this.rerender();
  // const contextModel = this.model
  // this.setModel(await contextModel.toogle(todo), contextModel);
  // this.rerender();

  // const contextModel = this.model;
  // this.blockLoadExecute([todo.id], () => this.model.toogle(todo), result => this.applyChange(result, contextModel));
  // this.rerender();


  // this.load(() => {
  //   this.usingEntries.add(todo.id);
  //   return this.model.toogle(todo);
  // }, 
  // this.setModel, 
  // (_) => this.usingEntries.delete(todo.id));
  // this.execute();






    // renderSearchResult = (model) => {  
  //   this.view.renderSearchRequest(model, this);
  // }







    // {
  // this.blockLoadExecute(["todos"], this.model.seedTodos, this.setModel);
  // this.rerender();


  // this.usingEntries.add("todos");
  // this.load(() => {
  //   return this.model.seedTodos();
  // }, this.setModel, (_) => this.usingEntries.delete("todos"));
  // Загрузили данные с сервера
  // this.setModel(await this.model.seedTodos());
  // }









    // if(contextValue.isDone == todo.isDone){
  //   return this.model.todos.find(x => x.id == contextValue.id);
  // }
  // return todo;









    // loadingContent = {
  //   usingEntries: new Set(),
  //   insertByResult: new Map(),
  // } 