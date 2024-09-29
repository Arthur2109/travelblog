console.log("save_content.js loaded");

document.addEventListener('DOMContentLoaded', function() {    
    
    const editor = document.getElementById('editor');

    editor.addEventListener('blur', function() {

      const content = document.getElementById('editor').innerHTML;
      const id = editor.dataset.articleId;
  
      fetch(`/articles/${id}/save_content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({contenu: contenu })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log(data.contenu);
          
        } else {
          alert('Failed to save content.');
        }
      })
      .catch(error => {
        console.error('Error saving content:', error);
      });
    });
  });


