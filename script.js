
const addBtn = document.querySelector(".addbtn");
const form = document.getElementById("callForm");
const cancelBtn = document.getElementById("cancelBtn");
const card = document.querySelector(".contact-card");

const createBtn = document.getElementById("createBtn");


const imageUrlInput = document.getElementById("imageUrl");
const fullNameInput = document.getElementById("fullName");
const hometownInput = document.getElementById("hometown");
const purposeInput = document.getElementById("purpose");

// color radios
const colorInputs = document.querySelectorAll('#callForm input[name="color"]');
// save to local storage function
function saveTOLocalStorage(obj){
 
    if(localStorage.getItem("tasks") === null){
        let oldtasks = [];
        oldtasks.push(obj);
        localStorage.setItem("tasks", JSON.stringify(oldtasks)); // whole array of objects will be stored in local storage 
    }else{
        let oldtasks = JSON.parse(localStorage.getItem("tasks"));
        oldtasks.push(obj);
        localStorage.setItem("tasks", JSON.stringify(oldtasks));
    }
}




     

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const imageUrl = imageUrlInput.value.trim();
    const fullName = fullNameInput.value.trim();
    const hometown = hometownInput.value.trim();
    const purpose = purposeInput.value.trim();


    if (imageUrl === "" ) {
        alert("Please enter the image url.");
        return;
    }
    if( fullName === "" ) {
        alert("Please enter the full name.");
        return;
    }
    if( hometown === "" ) {
        alert("Please enter the hometown.");
        return;
    }
    if( purpose === "" ) {
        alert("Please enter the purpose.");
        return;
    }
    saveTOLocalStorage({
        imageUrl: imageUrl,
        fullName: fullName,
        hometown: hometown,
        purpose: purpose,
        color: selectedColor
    })



  renderCards();

    form.reset();
    form.style.display = "none";
    addBtn.style.display = "block";
    card.style.display = "flex";
    cardsContainer.style.display = "flex";

});

let selectedColor = "";
colorInputs.forEach(radio => {
     radio.addEventListener("change", () => {
    selectedColor = radio.value;
  });
});


function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createCardHTML(call, index) {
  return `
    <div class="contact-card" style="
      z-index: ${10 - index};
      transform: translateY(${index * 12}px) scale(${1 - index * 0.04});
    ">
      <div class="contact-main">
        <img class="contact-avatar" src="${call.imageUrl}" />
        <div class="contact-info">
          <div class="contact-name">${call.fullName}</div>

          <div class="contact-details">
            <div>
              <div class="label">Home town</div>
              <div class="value">${call.hometown}</div>
            </div>
            <div>
              <div class="label">Purpose</div>
              <div class="value">${call.purpose}</div>
            </div>
          </div>

          <div class="contact-actions">
            <button class="butt">Call</button>
            <button class="butt">Message</button>
          </div>
        </div>
      </div>

      <div class="contact-palette">
        <span class="dot" style="background:${call.color}"></span>
      </div>
    </div>
  `;
}


const cardsContainer = document.getElementById("cardsContainer");
const upBtn = document.getElementById('upBtn');
const downBtn = document.getElementById('downBtn');

let startIndex = 0; // for scrolling through cards
const VISIBLE_COUNT = 3;

function renderCards() {
  const tasks = getTasks();
  // show newest first
  const ordered = tasks.slice().reverse();

  // clamp startIndex
  const maxStart = Math.max(0, ordered.length - VISIBLE_COUNT);
  if (startIndex > maxStart) startIndex = maxStart;
  if (startIndex < 0) startIndex = 0;

  const visibleTasks = ordered.slice(startIndex, startIndex + VISIBLE_COUNT);

  cardsContainer.innerHTML = visibleTasks
    .map((task, idx) => createCardHTML(task, idx))
    .join("");

  // update arrow button states
  upBtn.disabled = startIndex === 0;
  downBtn.disabled = startIndex >= maxStart;
}




addBtn.addEventListener("click", () => {
    form.style.display = "flex";
    addBtn.style.display = "none";
    cardsContainer.style.display = "none";

});

cancelBtn.addEventListener("click", () => {
    form.reset();
    form.style.display = "none";
    addBtn.style.display = "block";
    cardsContainer.style.display = "flex";
});
         

document.addEventListener("DOMContentLoaded", renderCards);

// arrow button handlers
upBtn.addEventListener('click', () => {
  startIndex = Math.max(0, startIndex - 1);
  renderCards();
});

downBtn.addEventListener('click', () => {
  const tasks = getTasks().slice().reverse();
  const maxStart = Math.max(0, tasks.length - VISIBLE_COUNT);
  startIndex = Math.min(maxStart, startIndex + 1);
  renderCards();
});








