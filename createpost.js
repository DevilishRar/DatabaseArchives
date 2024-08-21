document.addEventListener('DOMContentLoaded', () => {
    const gitrows = new Gitrows();

    // GitRows configuration
    const options = {
        user: "DevilishRar",  // Your GitHub username
        token: "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",  // Your personal access token
        owner: "DevilishRar",  // Your GitHub username (also the repo owner)
        repo: "DatabaseArchives",  // Your repository name
        branch: "main"  // The branch where data is stored
    };

    gitrows.options(options);

    document.getElementById("createpost-form").addEventListener("submit", async function (e) {
        e.preventDefault();

        const title = document.getElementById("post-title").value;
        const description = document.getElementById("post-description").value;

        if (sessionStorage.getItem("user")) {
            try {
                const postsPath = '@github/DevilishRar/DatabaseArchives:main/data/posts.json';
                let posts = await gitrows.get(postsPath);
                posts.push({ title, description });
                await gitrows.put(postsPath, posts);

                alert("Post created successfully!");
                window.location.href = "index.html";
            } catch (error) {
                console.error("Failed to create post:", error);
                alert("Post creation failed due to an error.");
            }
        } else {
            alert("You must be logged in to create a post.");
        }
    });
});
