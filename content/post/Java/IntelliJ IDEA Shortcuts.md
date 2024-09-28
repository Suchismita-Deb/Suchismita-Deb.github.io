+++
title = 'IntelliJ IDEA Shortcuts'
date = 2023-11-29T02:06:48+05:30
tags=['java']
+++


### Format the code.
**`Ctrl + Alt + Shift + L`**  - A Reformater box will appear then select the option like remove line break, smart import format the code and then apply.
![img.png](/images/intellije/refactorImage.png)

Format only lines of code.
**`Ctrl+Alt+L`** - Only line format.

### Creating new package or class.
![img.png](/images/img9.png)

**`Alt + Insert`** will give this box then we can select and name the file.
![img.png](/images/img10.png)
**`Ctrl + Alt + V`** will make the value extract in a variable.

---

### Create the Getter Setter, Constructor, Test shortcut.
![img_1.png](/images/img11.png)
Inside the class click **`Alt + Insert`**.

If the box is not coming then right-click on the file and click on `Generate`.
![img_1.png](/images/img23.png)

---

### Intellij does not works properly.

Click on File -> Invalidate Cache and restart.
![img_1.png](/images/img13.png)

---

### Show all the open tabs in the top in multiline.

In settings click on the multiline.
![img_1.png](/images/img24.png)

The opened tab will be showing in one place and I do not have to scroll.
![img_1.png](/images/img25.png)

---

### Command is too big to run.

* When the file is run it will show the error in the bottom then click on the link from there.
* Other way of doing it is in the top where the file name is showing. Click on the dropdown and click on the `Edit Configuraton` then choose file from the left side or click on the application.

![img_1.png](/images/img26.png)
* From the `More option` click on the `Shorten the command line` then from the bx for the `Shorten Command Line` choose the `@argfile`


### Click on multiple places in the editor.
**`Ctrl + Alt + Shift`** then click on multiple places the cursor will show.



# Chrome Shortcuts.
**`Ctrl + Shift + T`** opens the recent closed tabs.

* **`Ctrl + Number Key`** opens the numbered tab you select.
* **`Ctrl + Tab`** open the next tabs.
* **`Ctrl + Shift + Tab`** open the previous tab.
* **`Ctrl + T`** Open new tab.

# Method Separator.
A line after the method to demarcated it with other method.
![img_1.png](/images/intellije/image1.png)

# Adding more projects in the same project.
![img_1.png](/images/img30.png)
With the `+` icon we can add more projects and here the endUser and the location are the two projects added.
- This will open two project in same window and we can run both and will get the terminal output for both.

### Run button not showing in the code.s

Right-click on the src folder and then Mark directory as - Source root.

### Running the Java program in Sublime.

![img.png](/images/sublimeBuild.png) 

Select the Java C and the Build from the Tool. This will build the project in java. To run we need to change the build system.

Tool - Build System - New Build System.
```shell
{
"path":"C:\\Program Files\\Java\\jdk-20\\bin",	
"shell_cmd": "javac $file_name && java $file_base_name"
}
```

Save as JavaBuildRun.sublime-build In the tool will get the javaBuildRun option. It will run the program in the Sublime.

New Build to get the user input in cmd.
```shell
{
// "cmd": ["javac", "$file_name","&&","start","cmd","/k","java", "$file_base_name"],
"path":"C:\\Program Files\\Java\\jdk-20\\bin",
// "shell": true,
"shell_cmd": "javac $file_name && start cmd /k java $file_base_name"
}
```
### Format the code in Sublime.

Step 1. Go to preferences at top menu of sublime
Step 2. Click on Key Bindings
Step 3. in Key Binding right side window Past following Code.
[ {"keys": ["ctrl+alt+shift+l"], "command": "reindent", "args": {"single_line": false}} ]
Step 4. Now press ctrl+alt+shift+l in your keyboard.


