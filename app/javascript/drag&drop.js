console.log("drag&drop.js loaded");

document.addEventListener('DOMContentLoaded', function() {
    const editor = document.getElementById('editor');

    if (!editor) {
      console.error("L'élément avec l'ID 'editor' n'a pas été trouvé.");
      return;
    }
    
    editor.addEventListener('dragover', function(event) {
      event.preventDefault();
      event.stopPropagation();
      editor.classList.add('dragging');
    });
  
    editor.addEventListener('dragleave', function(event) {
      event.preventDefault();
      event.stopPropagation();
      editor.classList.remove('dragging');
    });
  
    editor.addEventListener('drop', function(event) {
      event.preventDefault();
      event.stopPropagation();
      editor.classList.remove('dragging');
      
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        handleFileUpload(files[0]);
      }
    });
  
    function handleFileUpload(file) {
      const formData = new FormData();
      formData.append('image', file);
  
      fetch(`/articles/${id}/upload_image`, {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        if (data.image_url) {
          insertImage(data.image_url);
        }
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
    }
  
    function insertImage(imageUrl) {
      const img = document.createElement('img');
      img.src = imageUrl;
      img.style.maxWidth = '100%'; // Ajustez la taille selon vos besoins
      editor.appendChild(img);
    }
  });


