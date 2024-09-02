document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', event => {
            const title = form.querySelector('input[name="title"]').value.trim();
            const content = form.querySelector('textarea[name="content"]').value.trim();
            
            if (!title || !content) {
                alert('Title and content cannot be empty.');
                event.preventDefault();
            }
        });
    });
});
