const title = document.getElementById("title");
const text = document.getElementById("text");
const currentTitle = document.getElementById("current_title");
const currentText = document.getElementById("current_text");

const button = document.getElementById("newEntry");

const listTodo = document.getElementById("list_todo");
let todoArray = [];

button.addEventListener("click", async () => {
  const dataToSend = {
    Title: title.value,
    Text: text.value,
    Importance: 0,
  };

  const result = await fetch(`/database`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataToSend),
  });
  const data = await result.json();

  console.log("Database Post Result");
  console.log(data);
  if (data.ok == true) {
    title.value = "";
    text.value = "";
    //Refresh the data
    database_load();
  }

  return false;
});

//Init
database_load();

//Load and render the Table Content of "todo"
async function database_load() {
  const result = await fetch("/database");
  const data = await result.json();

  console.log("Database Load Result:");
  console.log(data);

  //Flush current list
  listTodo.innerHTML = "";

  //Reset todayArray
  todoArray = data.result;
  console.log(todoArray);

  //Create Elements
  for (let i = 0; i < data.result.length; i++) {
    let newListItem = listTodo.appendChild(document.createElement("li"));
    newListItem.textContent = data.result[i].Title;
    newListItem.setAttribute("data-id", data.result[i].Id);
    newListItem.onclick = function () {
      list_item_load(this);
    };
  }

  return false;
}

// item = clicked List Item
function list_item_load(item) {
  for (let i = 0; i < todoArray.length; i++) {
    if (todoArray[i].Id == item.dataset.id) {
      currentTitle.value = todoArray[i].Title;
      currentTitle.setAttribute("data-id", todoArray[i].Id);
      currentText.value = todoArray[i].Text;
    }
  }
}

async function database_delete() {
  //No button was clicked yet = undefined
  if (currentTitle.dataset.id == undefined) {
    return;
  }

  const dataToSend = {
    Id: currentTitle.dataset.id,
  };

  const result = await fetch(`/database`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataToSend),
  });
  const data = await result.json();

  if (data.ok == true) {
    currentTitle.value = "";
    currentTitle.removeAttribute("data-id");
    currentText.value = "";
    //Refresh the data
    database_load();
  } else {
    console.log(data);
  }
}

async function database_update() {
  //No button was clicked yet = undefined
  if (currentTitle.dataset.id == undefined) {
    return;
  }

  const dataToSend = {
    Id: currentTitle.dataset.id,
    Title: currentTitle.value,
    Text: currentText.value,
  };

  const result = await fetch(`/database`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataToSend),
  });
  const data = await result.json();

  if (data.ok == true) {
    database_load();
  } else {
    console.log(data);
  }
}
