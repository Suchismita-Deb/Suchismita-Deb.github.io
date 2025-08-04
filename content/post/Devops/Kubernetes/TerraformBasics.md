+++
title = 'Terraform Basics'
date = 2025-08-03T21:52:53+05:30

url= "/post/Devops/Terraform/Basics"
tags=["devops", "kubernetes", "Terraform"]
+++
IAC is a human readable code that deploy the infrastructure resources on various platforms instead of managing them manually using user interface. **Provisioning infrastructure through software to achieve consistent and predictable environment.**

Terraform declarative infrastructure and mention the things that are needed like VM, Compute Instance and can be managed in source code version.

{{<figure src="/images/Devops/Kubernetes/IACTools.png" alt="Kubernetes Architecture" caption="Types of IAC Tools.">}}

Working with Terraform - First see if Terraform installed in the device - In cmd `terraform --version` 

**HCL Basics.**

Hashicorp build Terraform. In Terraform we build configuration file `.tf` extension.

`resource name` - the name terraform finds the resource. Inside we provide the details that used to create the resource.

{{<figure src="/images/Devops/Kubernetes/HclBasics.png" alt="Kubernetes Architecture" caption="HclBasics">}}
Create an AWS_EC2 instance then the code
```hcl
resource AWS_EC2 ec2Instance
// Vm in Azure
resource Azure_VirtualMachine vmInstance
// Virtual network
resource AWS_Network networkIntance
// AWS is the provider and Network is the resource.
```
Details of all the providers - https://registry.terraform.io/providers/hashicorp/local/latest/docs
```bash
ls 
// linux to see the folders and files in the directory.
pwd
// path directory
dir
// window to see the folder and files.
```
Make a folder and create a main file.

```bash
ls 
// linux to see the folders and files in the directory.
pwd
// path directory
dir
// window to see the folder and files.
```
Make a folder and create a main file.
```bash
mkdir terraform-labs
cd terraform-labs/
vi main.tf 
```
The main.tf contains the configuration detail.
```bash
resource "local_file" "terraform-files"{
filename = '/home/coder/gcp-terraform.txt'
content "Text file"
}
```

vi to create a file and open the editor.

vi or the vim editor and `i` to get to Insert Mode then `:wq` to save and quit and `:w` to save `:q!` forcefully quit no saving.

Terraform Execution.

Init - Plan - Execute.

```bash
terraform init
terraform plan
terraform apply
```

Modifying main.tf then terraform init it will show that the file is already in backup. 

Terraform will destroy the existing one and then create a new one.

```bash
ls -lrt
ls -lrta
# Show all the files. The backup file store the value of the files. 
ll -rt
```

Terraform resources are idempotent and it maintain a state file to maintain the data of the resource. `cat terraform.tfstate` will show the detail of the resource. Don’t edit the state file.

`terraform state list` - list of the resource. `local_file.terraform-file`

`terraform state show local_file.terraform-file`

{{<figure src="/images/Devops/Kubernetes/VariableDataType.png" alt="Kubernetes Architecture" caption="Variable Data Type.">}}

### **Passing values to a variable.**

Pass the values via interactive CLI.  
Pass the values via CLI arguments.  
Pass the values as env variable.  
Define the variables in terraform.tfvars or terraform.tfvars.json file.  
Define the variables in any file and pass teh reference of the variables file in terraform apply command.

We create a [variable.tf](http://variable.tf) file to store the details of the variables.

```bash
cat variable.tf
variable "file_name" {
	default = "/home/coder/test.txt
	type = string
}

variable "content" {
	type = string
}
```

Now we can modify the [main.tf](http://main.tf) file using the variable.

```bash
resource "local_file" "terraform-file" {
	filename = var.filename
	content = var.content
}
```

When terraform apply then in the main file it will see the variable and ask for the input of the variable with default value. There you need to add the value of the content variable.

There are various way to modify the value.

```bash
terraform apply -var "content=This is a text." -var "filename=/home/coder/terraform-file"
```

Another way to define the variable as an env variable.

```bash
export TF_VAR_filename='home/coder/test.txt'
export TF_VAR_content="This is a text file."
```

Then using the terraform apply it will not ask for any input and directly apply.

Passing variable in terraform.tfvars file in the path where there [main.tf](http://main.tf) exists. Pass the value in key value pair or json file.

```bash
vi terraform.tfvars
```

Inside the file add the value.

```bash
filename='home/coder/test.txt'
content='Text added.'
```

Then terraform apply and it will not ask for any value. Remove the terraform.tfvars file.

```bash
rm terraform.tfvars
vi terraform.tfvars.json
```

Add the file data.

```bash
{
	"filename"='home/coder/test.txt',
	"content"='Text added.'
}
```

We can make additional file and name it as terraform variable.

```bash
vi terraform-var.tfvars
# Add the variable in the file
terraform apply -var-file=terraform.var.tfvars
```

When the terraform apply then mention the var file name.















