/**
 * {success:true,id:1143}
 * https://fewd-todolist-api.onrender.com/
 * 
**/

$(".demo.index").ready(function(){
  let currentFilter = 'all'; // Default filter state

  function getAndDisplayAllTasks () {
    $.ajax({
      type: 'GET',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1143',
      dataType: 'json',
      success: function (response, textStatus) {
        $('#todo-list').empty();
        response.tasks.forEach(function (task) {
          if ((currentFilter === 'all') ||
              (currentFilter === 'complete' && task.completed) ||
              (currentFilter === 'active' && !task.completed)) {
              const taskItem = $(`<div class="row">
              <p class="lead col-sm-8 ${task.completed ? 'completed' : ''}">${task.content}</p>
              <button class="mb-2 btn btn-info btn-outline-light delete" data-id="${task.id}">Delete</button>
              <input type="checkbox" class="mark-complete" data-id="${task.id}"` + (task.completed ? 'checked' : '') + '></div>');
              $('#todo-list').append(taskItem);
              }
            });
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }
  
  function createTask () {
    $.ajax({
      type: 'POST',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1143',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: $('#new-task-content').val()
        }
      }),
      success: function (response, textStatus) {
        $('#new-task-content').val('');
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });  
  }
  
  $('#create-task').on('submit', function (e) {
    e.preventDefault();
    createTask();
  });
  
  function deleteTask (id) {
    $.ajax({
      type: 'DELETE',
         url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=1143',
         success: function (response, textStatus) {
           getAndDisplayAllTasks();
         },
         error: function (request, textStatus, errorMessage) {
           console.log(errorMessage);
         }
       });
   }

   $(document).on('click', '.delete', function () {
    console.log($(this).data('id'));
    deleteTask($(this).data('id'));
  });

   function markTaskComplete (id) {
    $.ajax({
   type: 'PUT',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=1143',
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  $(document).on('change', '.mark-complete', function () {
    if (this.checked) {
      markTaskComplete($(this).data('id'));
    } else {
      markTaskActive($(this).data('id'));
    }
  });

  function markTaskActive (id) {
    $.ajax({
   type: 'PUT',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=1143',
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }
    // Event handler for toggle buttons
    $('#toggle-buttons').on('click', '.toggle-btn', function () {
      currentFilter = $(this).data('filter');
      getAndDisplayAllTasks();
    });
  
    // Initial fetch and render when the page loads
    getAndDisplayAllTasks();
});