

window.addEventListener("load", async () => {
  const model = new Model();
  const view = new View();
  const controller = new Controller(model, view);
  await controller.run();
})  

