+++
title = 'IntelliJ IDEA Shortcuts'
date = 2023-11-29T02:06:48+05:30
tags=['java']
+++


### Format the code.
**`Ctrl + Alt + Shift + L`**  - A Reformater box will appear then select the option like remove line break, smart import format the code and then apply.

{{<figure src="/images/intellije/refactorImage.png" alt="Intellije Refactor Code." caption="Intellije Refactor Code.">}}

Format only lines of code.
**`Ctrl+Alt+L`** - Only line format.

### Creating new package or class.


{{<figure src="/images/intellije/NewPackage.png" alt="UserRequest." caption="Creating New Package or Class.">}}

**`Alt + Insert`** will give this box then we can select and name the file.
{{<figure src="/images/intellije/ExtractVariable.png" alt="UserRequest." caption="Extract Variable.">}}
**`Ctrl + Alt + V`** will make the value extract in a variable.

**`Ctrl+F12`** will show all the method in that file.

![img.png](/images/intellije/allMethod.png)

{{<figure src="/images/intellije/allMethod.png" alt="All method in the file." caption="All method in the file.">}}
---

### Create the Getter Setter, Constructor, Test shortcut.
{{<figure src="/images/intellije/GetterSetterConstructor.png" alt="UserRequest." caption="Getter Setter Constructor.">}}
Inside the class click **`Alt + Insert`**.

If the box is not coming then right-click on the file and click on `Generate`.
{{<figure src="/images/intellije/GetterSetter.png" alt="UserRequest." caption="Getter Setter.">}}

---

### Intellij does not works properly.

Click on File -> Invalidate Cache and restart.
{{<figure src="/images/intellije/InvalidateCache.png" alt="UserRequest." caption="Invalidate Cache.">}}

---

### Show all the open tabs in the top in multiline.

In settings click on the multiline.
{{<figure src="/images/intellije/OpenTabInMultiLine.png" alt="UserRequest." caption="Open Tab In MultiLine.">}}

The opened tab will be showing in one place and I do not have to scroll.
{{<figure src="/images/intellije/OpenTabInOnePlace.png" alt="UserRequest." caption="Open Tab In One Place.">}}

---

### Command is too big to run.

* When the file is run it will show the error in the bottom then click on the link from there.
* Other way of doing it is in the top where the file name is showing. Click on the dropdown and click on the `Edit Configuraton` then choose file from the left side or click on the application.

{{<figure src="/images/intellije/DebugConfiguration.png" alt="UserRequest." caption="Debug Configuration.">}}
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
{{<figure src="/images/intellije/MethodSeparator.png" alt="UserRequest." caption="Method Separator in Appearance.">}}

# Adding more projects in the same project.
{{<figure src="/images/intellije/AddingProject.png" alt="UserRequest." caption="Adding Project.">}}
With the `+` icon we can add more projects and here the endUser and the location are the two projects added.
- This will open two project in same window and we can run both and will get the terminal output for both.

### Run button not showing in the code.s

Right-click on the src folder and then Mark directory as - Source root.

### Running the Java program in Sublime.

{{<figure src="/images/intellije/sublimeBuild.png" alt="UserRequest." caption="Sublime Build.">}}

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


### **Useful Gradle Command.**

```yaml
./gradlew clean build
# Gradle wrapper clean build.

./gradle build

./gradlew --version

./gradlew clean build --refresh-dependencies

gradle build
```
Lombok Builder did not get the get and set value.

In the entity class `@Data` and `@AllArgsConstructor` present but not taking the set value then in plugin we can install Lombok.
