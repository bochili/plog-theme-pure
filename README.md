# plog-theme-pure

A simple and clean default theme for Plog.

- [Demo](http://plogdemo.bochi.ink/)

![localhost_3000_](https://cdn.jsdelivr.net/gh/bochili/cdn3/photos/202410032001786.png)

# Installation

**Tips**: If you just want to use plog, or have already installed the [plog-generator](https://github.com/bochili/plog-generator), you don't need to download this theme again. The generator has a built-in plog-theme-pure.

## For user

You can download the pre-compiled site files from [releases](https://github.com/bochili/plog-theme-pure/releases) and place the "static" directory in the root directory of your site. The directory structure can be referenced as [plog-demo](https://github.com/bochili/plog-demo), so you can use it directly (local preview requires starting an HTTP server).

## For developer

1. Clone this repository to your local machine.
2. Run `pnpm i` on the terminal to install dependencies.
3. Edit everything whatever you want.
4. Run `pnpm run dev` to start the preview server.
5. Run `pnpm run build` to build the template files.

**Notice**: I put a "static" folder in the `public/` directory and write some example data in it, before you put the build files into the `templates` directory of you local plog-generator, you should delete the "static" folder in `dist` folder.

# Features

- Simple and clean design
- Responsive layout
