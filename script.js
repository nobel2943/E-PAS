};

// ===============================
// Highlight Menu Aktif Otomatis
// ===============================

const menu = document.querySelectorAll("nav a");

menu.forEach(function(item){

    if(item.href === window.location.href){

        item.classList.add("active");

    }

});
