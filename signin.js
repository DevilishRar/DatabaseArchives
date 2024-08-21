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

    // Base64 encoded usernames and passwords
    const obfuscatedUsers = {
        'Qk9TTklBTh==': 'Qk9TTklBThNAMTA=',  // BOSNIAN : BOSNIAN@10
        'QUxCQU5JQU4=': 'QUxCQU5JQU4=QDU5'   // ALBANIAN : ALBANIAN@59
    };

    function obfuscate(str) {
        return btoa(str); // Encode to Base64
    }

    function deobfuscate(str) {
        return atob(str); // Decode from Base64
    }

    document.getElementById("signin-form").addEventListener("submit", async function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const obfuscatedUsername = obfuscate(username);
        const obfuscatedPassword = obfuscate(password);

        // Check if the obfuscated username and password match the stored credentials
        if (obfuscatedUsers[obfuscatedUsername] && obfuscatedUsers[obfuscatedUsername] === obfuscatedPassword) {
            try {
                const sessionPath = '@github/DevilishRar/DatabaseArchives:main/data/sessions.json';
                let sessions = await gitrows.get(sessionPath);
                sessions.push({ username: obfuscatedUsername });
                await gitrows.put(sessionPath, sessions);

                sessionStorage.setItem("user", obfuscatedUsername);
                alert("Sign in successful!");

                if (e.submitter.id === "sign-in-index") {
                    window.location.href = "index.html";
                } else if (e.submitter.id === "sign-in-createpost") {
                    window.location.href = "createpost.html";
                }
            } catch (error) {
                console.error("Failed to update session:", error);
                alert("Sign-in failed due to an error.");
            }
        } else {
            alert("Invalid username or password.");
        }
    });
});
