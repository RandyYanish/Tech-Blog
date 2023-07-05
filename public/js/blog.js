// Select elements
const commentButton = document.getElementById('comment-button');
const commentForm = document.getElementById('comment-form');
const commentText = document.getElementById('comment-text');
const editButton = document.getElementById('edit-post');

// Event listener for comment button click
commentButton.addEventListener('click', () => {
    // Display the comment form
    commentForm.style.display = 'block';
});

// Event listener for comment form submission
commentForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Get the blog id from the data attribute
    const blogId = commentButton.dataset.blogId;

    // Get the comment text
    const comment = commentText.value;

    try {
        // Send the comment to the server using an AJAX request
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment, blogId }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // Reload the page to display the newly added comment
            location.reload();
        } else {
            // Handle the error if the comment couldn't be saved
            // Display an error message or take appropriate action
            console.error('Failed to save comment');
        }
    } catch (err) {
        console.error(err);
    }
});

// Event listener for edit button click
editButton.addEventListener('click', async () => {
    try {
        const blogId = editButton.dataset.blogId;

        // Redirect to the edit page for the specific blog post
        window.location.href = `/blog/edit/${blogId}`;
    } catch (err) {
        console.error(err);
    }
});
