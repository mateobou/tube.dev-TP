document.addEventListener("DOMContentLoaded", function() {
    function createTodo() {
      let todo = document.createElement('li');
      todo.textContent = 'Vous avez cliqué sur le bouton!';
      document.body.appendChild(todo);
    }
    const buttons = document.querySelectorAll('button');
    const button = buttons[0];
  
    button.addEventListener('click', createTodo);
    
  });