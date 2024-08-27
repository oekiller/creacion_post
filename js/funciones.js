// Este código maneja la visibilidad del pie de página en un cuadro de tweet.
// Oculta el pie de página al cargar la página y lo muestra cuando el usuario hace clic en el campo de entrada.
// Además, evita que el pie de página se oculte al hacer clic en el botón de publicar.
document.addEventListener("DOMContentLoaded", () => {
  const tweetboxFooter = document.querySelector(".tweetbox__footer");
  const inputPost = document.querySelector(".input-post");
  const tweetButton = document.querySelector(".tweetBox__tweetButton");
  // Oculta el footer cuando la página se carga
  tweetboxFooter.classList.add("hidden");
  // Muestra el footer cuando se hace clic en el input
  inputPost.addEventListener("focus", () => {
    tweetboxFooter.classList.remove("hidden");
  });
  // Asegúrate de que el footer no se oculte al hacer clic en el botón "Post"
  tweetButton.addEventListener("click", (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario si es necesario
    // Aquí puedes añadir código adicional si deseas manejar el envío del formulario
  });
});

// Este código agrega interactividad a los elementos con la clase "tooltip".
// Cuando el mouse pasa sobre el elemento, se hace visible el texto del tooltip
// y se establece su opacidad a 1. Cuando el mouse sale, el texto del tooltip se oculta y su opacidad se establece en 0.
document.querySelectorAll(".tooltip").forEach((item) => {
  item.addEventListener("mouseover", (event) => {
    item.querySelector(".tooltiptext").style.visibility = "visible";
    item.querySelector(".tooltiptext").style.opacity = "1";
  });
  item.addEventListener("mouseout", (event) => {
    item.querySelector(".tooltiptext").style.visibility = "hidden";
    item.querySelector(".tooltiptext").style.opacity = "0";
  });
});


// Este script maneja la funcionalidad de un cuadro de texto para publicar tweets. Al hacer clic en el área de texto, 
//se expande y se muestra el pie de página. Al hacer clic en el botón de publicar, 
//se verifica que el texto no esté vacío, se muestra el contenido del post y se maneja la carga de imágenes. 
//También se oculta el cuadro de texto y se restablecen los campos después de publicar.
document.addEventListener("DOMContentLoaded", () => {
  const tweetboxFooter = document.querySelector(".tweetbox__footer");
  const inputPost = document.getElementById("input-post");
  const tweetButton = document.querySelector(".tweetBox__tweetButton");
  const postContainer = document.getElementById("post-container");
  const imageUpload = document.getElementById("image-upload");
  const postContent = document.getElementById("post-content");
  
  // Inicialmente ocultar el contenedor de post
  postContainer.classList.add("hidden");
  
  // Expande el textarea al hacer clic en él
  inputPost.addEventListener("focus", () => {
    inputPost.classList.add("expanded");
    tweetboxFooter.classList.remove("hidden");
  });
  
  // Restaurar el tamaño del textarea cuando se haga clic en el botón "Post"
  tweetButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    
    // Verificar si hay texto en el input
    if (inputPost.value.trim() === "") {
      alert("No puedes publicar un POST vacío. Por favor, escribe algo.");
      return; // No hacer nada si el input está vacío
    }
    
    // Mostrar el contenedor del post
    postContainer.classList.remove("hidden");
    
    // Establecer el contenido del post
    postContent.textContent = inputPost.value;
    
    // Verificar si se ha seleccionado una imagen
    if (imageUpload.files.length > 0) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const postImage = document.createElement("img");
        postImage.src = e.target.result;
        postImage.style.width = "450px";
        postImage.style.objectFit = "contain";
        postImage.style.borderRadius = "20px";
        const postBody = postContainer.querySelector(".post__body");
        const postFooter = postContainer.querySelector(".post__footer");
        if (postFooter) {
          postFooter.parentNode.insertBefore(postImage, postFooter);
        } else {
          postBody.appendChild(postImage);
        }
      };
      reader.readAsDataURL(imageUpload.files[0]);
    } else {
      const existingImage = postContainer.querySelector(".post__body img:not(.post__avatar img)");
      if (existingImage) {
        existingImage.remove();
      }
    }
    
    // Limpiar el campo de entrada y restablecer el tamaño del textarea
    inputPost.value = "";
    imageUpload.value = "";
    inputPost.classList.remove("expanded");
  });
  
  // Detecta clics fuera del formulario para mantener el tamaño del textarea
  document.addEventListener("click", (event) => {
    if (!tweetboxFooter.contains(event.target) && !inputPost.contains(event.target)) {
      inputPost.classList.remove("expanded");
      tweetboxFooter.classList.add("hidden");
    }
  });
});
