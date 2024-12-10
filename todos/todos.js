document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.querySelector('#todoForm');
    const todoList = document.querySelector('#todoList');

    let todos = [];

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            
            const todoContent = document.createElement('span');
            todoContent.style.cursor = 'pointer';
            todoContent.textContent = `${todo.content} - ${todo.createdAt.toLocaleString()}`;
            
            if (todo.state === 'fait') {
                todoContent.style.textDecoration = 'line-through';
                todoContent.style.color = '#6c757d';
            }

            todoContent.onclick = () => toggleTodoState(todo.id);

            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger btn-sm ml-2';
            deleteButton.textContent = 'Supprimer';
            deleteButton.onclick = () => deleteTodo(todo.id);

            li.appendChild(todoContent);
            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });
    }

    function addTodo() {
        const todoContent = todoForm.elements.todoInput.value.trim();
        if (todoContent !== '') {
            const newTodo = {
                id: crypto.randomUUID(),
                content: todoContent,
                createdAt: new Date(),
                state: 'à faire'
            };
            todos.push(newTodo);
            todoForm.reset();
            renderTodos();
            logTodos();
        }
    }

    function deleteTodo(todoId) {
        todos = todos.filter(todo => todo.id !== todoId);
        renderTodos();
        logTodos();
    }

    function toggleTodoState(todoId) {
        const todo = todos.find(todo => todo.id === todoId);
        if (todo) {
            todo.state = todo.state === 'à faire' ? 'fait' : 'à faire';
            renderTodos();
            logTodos();
        }
    }

    function logTodos() {
        console.log(todos);
    }

    todoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addTodo();
    });
}); 