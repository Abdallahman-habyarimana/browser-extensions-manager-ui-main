const gridContainer = document.querySelector('.grid')
const filterLists = document.querySelectorAll('.filterList')
const theme = document.getElementById("theme")

function lightMode() {
    theme.removeAttribute('src')
    theme.setAttribute('src', "assets/images/icon-moon.svg");
}

function darkMode() {
    theme.removeAttribute('src')
    theme.setAttribute('src', "assets/images/icon-sun.svg");
}

function switchTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if(!currentTheme || currentTheme === "light") {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem('theme', 'dark');
        darkMode()
    } else {
         document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem('theme', 'dark');
        lightMode()
    }
}

theme.addEventListener('click', switchTheme)

//Check Local Storage For Theme
const currentThemeFromLocalStorage = localStorage.getItem('theme');
if(currentThemeFromLocalStorage) {
    document.documentElement.setAttribute('data-theme', currentThemeFromLocalStorage);
    if(currentThemeFromLocalStorage === 'dark') {
        darkMode();
    } else {
        lightMode()
    }
}

let extensions = []

console.log(filterLists)

function filterList(name) {
    filterLists.forEach(list => {
        if(list.classList.contains("active"))
            list.classList.remove("active")
    })
    name.classList.add("active");
    loadExtensions(name.innerText)
}

function getExtension(extension) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = 
    `<div class="card">
        <div class="card__body">
            <img src=${extension.logo} alt="">
            <div class="card__details">
                <h2>${extension.name}</h2>
                <p>${extension.description}</p>
            </div>
        </div>
        <div class="card__footer">
            <button class="btn">Remove</button>
        <label class="switch">
            <input type="checkbox" ${extension.isActive ? "checked" : ""} onChange="handleChange(this)">
            <span class="slider round"></span>
        </label>
        </div>
    </div>`.trim();

    return wrapper.firstChild
}



function loadExtensions(filter = "") {
    gridContainer.innerHTML = ""
    const filteredExtensions = 
    extensions.filter(extension =>
        filter === "Active" ? extension.isActive === true : filter === "Inactive" ? extension.isActive === false : extension)
    
    filteredExtensions.forEach(extension => {
        const card = getExtension(extension)
        gridContainer.appendChild(card)
    })

    console.log(filteredExtensions)

}

function getExtensions() {
    fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    extensions = data;
    loadExtensions("")
  }); 
}

getExtensions()