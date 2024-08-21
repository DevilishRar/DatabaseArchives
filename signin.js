
// Plain text credentials in JavaScript (not visible in HTML)
const users = {
    'ALBANIAN': 'ALBANIAN@59',
    'BOSNIAN': 'BOSNIAN@10'
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("signin-form").addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (users[username] === password) {
            const gitrows = new Gitrows();
            const options = {
                user: "DevilishRar",
                token: "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",
                owner: "DevilishRar",
                repo: "DatabaseArchives",
                branch: "main"
            };
            gitrows.options(options);

            const sessionPath = '@github/DevilishRar/DatabaseArchives:main/data/sessions.json';

            gitrows.get(sessionPath).then(sessions => {
                sessions.push({ username: username, loginTime: new Date().toISOString() });
                return gitrows.put(sessionPath, sessions);
            }).then(() => {
                sessionStorage.setItem("user", username);
                alert("Sign in successful!");

                if (e.submitter.id === "sign-in-index") {
                    window.location.href = "index.html";
                } else if (e.submitter.id === "sign-in-createpost") {
                    window.location.href = "createpost.html";
                }
            }).catch(error => {
                console.error("Failed to update session:", error);
                alert("Sign-in failed due to an error.");
            });
        } else {
            alert("Invalid username or password.");
        }
    });
});
