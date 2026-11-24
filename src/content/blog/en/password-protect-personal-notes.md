---
translationKey: password-protect-personal-notes
slug: password-protect-personal-notes
lang: en
title: "How to Password Protect Your Personal Notes"
description: "Encrypt a personal note, reopen it to confirm the password works, and check which copies still need protection."
category: offline-privacy
published: 2026-11-25
minutes: 4
image: password
imageAlt: "A brass padlock resting on a stack of paper"
showApp: true
---

To password protect a personal note, use an editor that **encrypts the saved file**. After saving, close the note and reopen it from File Explorer. You should be asked for the password before you can read the contents. That simple test tells you whether protection travels with the file when you make a copy.

## Choose the protection that matches the risk

- **Lock the Windows session** when you step away from a shared computer. This protects the open session.
- **Use device encryption** on a supported PC to protect data on its drive, especially if the computer is lost or stolen. Keep the recovery key somewhere you can access separately. [Microsoft’s guide to Windows device encryption](https://support.microsoft.com/en-us/windows/security/encryption/device-encryption-in-windows)
- **Encrypt the note itself** if the file may be copied to a backup drive or moved to another computer. The recipient needs compatible software and the password to open the encrypted file.

Use a unique password or long passphrase and keep it somewhere you can recover it, such as a password manager. Try the steps below on a note with disposable text before protecting your only copy of an important document.

## Set a document password in ZinniaShark Note

1. Open the `.adq` note you want to protect. If it is a new note, save the practice document locally first so you know which file you are changing.
2. Choose **File → Set or Change Document Password…**. Enter the password and confirm it, then choose **Apply and Save**. On a saved document, the command writes to the same file and includes any pending edits.
3. Look for the lock indicator, close the document, and open the same file again. Enter the password and check that the text and any embedded media are present.

ZinniaShark Note encrypts the saved document contents and embedded media together. To change the password on an already encrypted note, enter the current password first. Keep the password accessible to you because a forgotten password prevents decryption. [ZinniaShark Note’s document password guide](https://dpnzdy.github.io/ZinniaSharkNote/en/guide.html#password)

## Check the copies you already made

Setting a password today leaves older unencrypted copies as they were, including backups and copies already shared with someone else. Exports are separate files too. For example, a PDF exported from a protected note does not inherit the original’s password. Check the destination and contents before exporting or sharing.

For a backup test, copy the **encrypted** `.adq` to a separate drive, restore the copy to a different local folder, and reopen it there. Use a neutral filename for sensitive notes because the filename remains visible in File Explorer even when opening the file requires a password. [How to back up Windows notes without the cloud](/en/blog/offline-notes-backup/)
