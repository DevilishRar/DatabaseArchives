document.addEventListener('DOMContentLoaded', () => {
    const forumCardsContainer = document.getElementById('forum-cards-container');
    const postsPath = 'data/posts.json';

    const loadPosts = () => {
        fetch(postsPath)
            .then(response => response.json())
            .then(posts => {
                forumCardsContainer.innerHTML = '';

                if (posts.length === 0) {
                    forumCardsContainer.innerHTML = '<p class="text-center text-gray-400">No posts available.</p>';
                } else {
                    posts.forEach(post => {
                        const postCard = document.createElement('div');
                        postCard.className = 'forum-card';

                        const postTitle = document.createElement('h2');
                        postTitle.className = 'text-2xl font-bold mb-2';
                        postTitle.innerText = post.title;

                        const postDescription = document.createElement('p');
                        postDescription.className = 'forum-card-description';
                        postDescription.innerText = post.content.slice(0, 100) + '...';

                        postCard.appendChild(postTitle);
                        postCard.appendChild(postDescription);

                        postCard.onclick = () => openModal(post.title, post.content);

                        forumCardsContainer.appendChild(postCard);
                    });
                }
            })
            .catch(error => {
                console.error('Error loading posts:', error);
                forumCardsContainer.innerHTML = '<p class="text-center text-red-400">Failed to load posts.</p>';
            });
    };

    const openModal = (title, content) => {
        const modal = document.getElementById('modal');
        const overlay = document.getElementById('modal-overlay');

        document.getElementById('modal-header').innerText = title;
        document.getElementById('modal-content').innerText = content;

        overlay.classList.add('visible');
        modal.classList.add('visible');
    };

    const closeModal = () => {
        const modal = document.getElementById('modal');
        const overlay = document.getElementById('modal-overlay');

        overlay.classList.remove('visible');
        modal.classList.remove('visible');
    };

    loadPosts();

    document.getElementById('modal-overlay').onclick = closeModal;
});
