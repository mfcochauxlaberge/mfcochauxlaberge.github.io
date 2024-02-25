
# Notes on my Linux system

I am a Linux user currently using Arch Linux full time.

These notes explain my setup and how I use it. They are publicly available for anyone to read, but the main reason they are there is help me remember how my setup works. Feel free to copy anything you like.

Most of the notes are still useful for other Linux distributions.

<!-- My configuration can be found in my [dotfiles]("https://github.com/mfcochauxlaberge/dotfiles"). -->

## CLI Tools

Here is a list of tools I like to have installed on my system.

### bat

This is cat with syntax highlighting and other useful features.

[bat's homepage](https://github.com/sharkdp/bat)

```
sudo pacman -S bat
```
### fd

This is an alternative to find.

[fd's homepage](https://github.com/sharkdp/fd)

```
sudo pacman -S fd
```

#### Usage

```
# Search something within the current directory.
fd something

# Search something in /my/dir.
fd something /my/dir

# Include hidden directories and files.
fd -H something
```

## AUR packages


```
# Install a package
git clone https://aur.archlinux.org/my-package.git
makepkg -si

# Update packages
# yay is a helper that can be used
# to update all AUR packages at once.
yay

# Remove a package
# yay can also be used to delete a
# package from the AUR.
yay -S my-package
```
