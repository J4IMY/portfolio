# Python Virtual Environment Guide

## Why Use Virtual Environments?

Virtual environments allow you to create isolated spaces for your Python projects, each with its own dependencies and packages. This helps avoid conflicts between project requirements and keeps your global Python installation clean.

## Creating and Using Virtual Environments

### Creating a Virtual Environment

```
python -m venv project_env
```

This creates a new virtual environment named `project_env` in the current directory.

### Activating the Virtual Environment

**On Windows:**
```
project_env\Scripts\activate
```

**On macOS and Linux:**
```
source project_env/bin/activate
```

When activated, your command prompt will be prefixed with the name of the virtual environment.

### Deactivating the Virtual Environment

```
deactivate
```

## Managing Packages in Virtual Environments

### Installing Packages

After activating your virtual environment, install packages as usual:

```
pip install package_name
```

These packages will only be available within this virtual environment.

### Creating a Requirements File

To save the current state of your virtual environment:

```
pip freeze > requirements.txt
```

### Setting Up a Project from Requirements

```
python -m venv new_project_env
new_project_env\Scripts\activate  # On Windows
pip install -r requirements.txt
```

## Best Practices

1. **Create a new virtual environment for each project**
2. **Include your requirements.txt in version control, but not the virtual environment folder**
3. **Name your virtual environments consistently** (e.g., venv, .venv, or project_name_env)
4. **Document any special setup steps in your project README**

## Advanced: Using virtualenvwrapper

For easier management of multiple virtual environments, you can use virtualenvwrapper:

```
pip install virtualenvwrapper-win  # On Windows
pip install virtualenvwrapper      # On macOS/Linux
```

This provides commands like:
- `mkvirtualenv` - Create and activate a virtual environment
- `workon` - List or change working virtual environments
- `rmvirtualenv` - Remove a virtual environment