export const firebaseAuthException = (code) => {
    const messages = {
        "auth/email-already-in-use": "This email is already registered.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/user-not-found": "No account found with this email.",
        "auth/wrong-password": "Incorrect password.",
        "auth/weak-password": "Use at least 6 characters for your password.",
        "auth/missing-password": "Enter your password.",
        "auth/network-request-failed": "Check your internet connection.",
    };
    return messages[code] || "Unexpected error occurred. Please try again.";
}