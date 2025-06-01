export default class CharCryptor {
    constructor(text) {
        this.encryptedText = text;
        this.encryptionKey = this.generateEncryptionKey(text.length);
    }

    // Generate a random encryption key for letters
    generateEncryptionKey(length) {
        const key = [];
        for (let i = 0; i < length; i++) {
            key.push(Math.floor(Math.random() * 26));  // Limiting the shift to 26 (number of letters in the alphabet)
        }
        return key;
    }

    // Encrypt the text
    encrypt() {
        let result = '';
        for (let i = 0; i < this.encryptionKey.length; i++) {
            result += this.shiftCharForward(this.encryptedText[i], this.encryptionKey[i]);
        }
        this.encryptedText = result;
    }

    // Decrypt the text
    decrypt() {
        let result = '';
        for (let i = 0; i < this.encryptionKey.length; i++) {
            result += this.shiftCharBackward(this.encryptedText[i], this.encryptionKey[i]);
        }
        this.encryptedText = result;
    }

    // Shift characters forward in the alphabet
    shiftCharForward(c, shift) {
        if (/[a-z]/.test(c)) {
            return String.fromCharCode(((c.charCodeAt(0) - 97 + shift) % 26) + 97);
        } else if (/[A-Z]/.test(c)) {
            return String.fromCharCode(((c.charCodeAt(0) - 65 + shift) % 26) + 65);
        } else {
            return c; // Leave non-alphabetic characters unchanged
        }
    }

    // Shift characters backward in the alphabet
    shiftCharBackward(c, shift) {
        if (/[a-z]/.test(c)) {
            return String.fromCharCode(((c.charCodeAt(0) - 97 - shift + 26) % 26) + 97);
        } else if (/[A-Z]/.test(c)) {
            return String.fromCharCode(((c.charCodeAt(0) - 65 - shift + 26) % 26) + 65);
        } else {
            return c; // Leave non-alphabetic characters unchanged
        }
    }

    // Return the encrypted text
    getEncryptedText() {
        return this.encryptedText;
    }

    // Return the encryption key
    getEncryptionKey() {
        return this.encryptionKey;
    }
}
