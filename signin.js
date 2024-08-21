// Obfuscated Credentials using a Caesar cipher-like approach (Shift by 3)
const obfuscatedUsers = {
    'DOSQLDQDQHQ': 'DOSQLDQDQHQ#12', // ALBANIAN : ALBANIAN@59
    'ERVRQLDQ': 'ERVRQLDQ@13'  // BOSNIAN : BOSNIAN@10
};

function obfuscate(str) {
    return str.split('').map(char => String.fromCharCode(char.charCodeAt(0) + 3)).join(''); 
}

function deobfuscate(str) {
    return str.split('').map(char => String.fromCharCode(char.charCodeAt(0) - 3)).join(''); 
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("signin-form").addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const obfuscatedUsername = obfuscate(username);
        const obfuscatedPassword = obfuscate(password);

        if (obfuscatedUsers[obfuscatedUsername] === obfuscatedPassword) {
            localStorage.setItem("user", obfuscatedUsername);
            alert("Sign in successful!");

            if (e.submitter.id === "sign-in-index") {
                window.location.href = "index.html";
            } else if (e.submitter.id === "sign-in-createpost") {
                window.location.href = "createpost.html";
            }
        } else {
            alert("Invalid username or password.");
        }
    });
});
