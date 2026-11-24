---
translationKey: offline-notes
slug: offline-notes-backup
lang: en
title: "How to Take and Back Up Notes Without the Cloud on Windows"
description: "Choose a local folder, reopen a note offline and verify a backup on an external drive."
category: offline-privacy
published: 2026-11-24
minutes: 4
image: offline
imageAlt: "A portable drive and red cable on paper notes"
showApp: true
---

To keep notes off cloud storage, **save them outside synced folders** and **make a copy on a separate drive**. Start with one sample note so that you can check both the saved file and your backup.

## Choose a folder you can find again

1. Open `%USERPROFILE%` in File Explorer and create a folder such as `Notes-Local`.
2. Use your editor’s **Save As** command to put a sample note in that folder. Check the full path. A Documents shortcut can point to a OneDrive folder, and other sync utilities can watch folders with ordinary names.
3. If your editor stores everything in a database, use its supported backup or export feature. Export one note with an image or recording to see what the export includes.

## Reopen and edit a note offline

Save the test file and quit the installed editor. Disconnect Wi-Fi or Ethernet briefly, then open the file from File Explorer. Add a line of text, save it, close the app, and reopen the file to check that the change is present. If your notes depend on pictures or recordings, check those too. Installation, license checks and updates can have their own connectivity requirements.

## Copy the notes and test a restore

1. Save your changes and connect a USB drive or external SSD.
2. Copy the notes folder into a dated backup folder. Keep a previous dated copy for recovering an older version after an accidental edit.
3. Copy a file back from the drive into a temporary folder and open it there. Check the text and any attachments, then eject the drive.

If you prefer scheduled backups, set up Windows **File History** with an external drive and verify that it includes your notes folder. [Microsoft’s File History instructions](https://support.microsoft.com/en-au/windows/experience/backup-recovery/backup-and-restore-with-file-history).

## Save a local file in ZinniaShark Note

Press **Ctrl+S**, choose your local folder and save the note as an `.adq` file. Inserted media is part of that file. For a simple restore test, copy the `.adq` to a second folder and reopen the copy in the app. [Official guide to saving and reopening](https://dpnzdy.github.io/ZinniaSharkNote/en/guide.html#save).
