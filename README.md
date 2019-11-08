## About Project
Only for Linux based OS.

In this project I used `ElectronJS`, `ExpressJS` and `ShellScript` (sh) to improve myself.


> do not forget to run `npm install` inside gui folder.

## With Gui
 
 1. Clone the repository.

 2. Run ` ./run.sh ` on terminal.

 2. Add and Remove full paths of the folders that needs to be backed up.

 3. Change the backup destination directory.

 4. Press Run Backup

## Simple Backup

1. Clone the repository.

2. Open a terminal in repository.

3. Edit the settings file.

>  - folder-list.settings takes a list of folders that should be backed up. Different folders needs to be seperate by comma `(,)` and must be a full path.
>  - backup-destination.settings needs to be a single path.

4. Run the command below.

```
$ ./run.sh
```

---

## Cron 

1. Create cronjobs with 

```
$ crontab -e
```

2. Set it to -> `“At 22:00 on every 5th day-of-month."`

```sh
0 22 */5 * * /path/to/backupmanager/run.sh
```

- Other commands

----
```
        -e      (edit user's crontab)
        -l      (list user's crontab)
        -r      (delete user's crontab)
        -i      (prompt before deleting user's crontab)
```