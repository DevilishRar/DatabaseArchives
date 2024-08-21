
document.addEventListener('DOMContentLoaded', () => {
    const gitrows = new Gitrows();

    // GitRows configuration
    const options = {
        user: "DevilishRar",
        token: "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",
        owner: "DevilishRar",
        repo: "DatabaseArchives",
        branch: "main"
    };

    gitrows.options(options);

    document.getElementById("create-post-form").addEventListener("submit", function (e) {
        e.preventDefault();

        const title = document.getElementById("post-title").value;
        const content = document.getElementById("post-content").value;

        const postPath = '@github/DevilishRar/DatabaseArchives:main/data/posts.json';

        gitrows.get(postPath).then(posts => {
            posts.push({ title: title, content: content, date: new Date().toISOString() });
            return gitrows.put(postPath, posts);
        }).then(() => {
            alert("Post created successfully!");
            window.location.href = "index.html";
        }).catch(error => {
            console.error("Failed to create post:", error);
            alert("Failed to create post due to an error.");
        });
    });
});
