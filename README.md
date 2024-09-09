# Angular CSS to SCSS Converter

This utility script renames all `.css` files to `.scss` in an Angular project and updates component `.ts` files to use `.scss` instead of `.css`.

## Features
- Renames `.css` files to `.scss`.
- Updates Angular component `styleUrls` to point to `.scss` files.
- Can be run from w/o copying script to the Angular project via command line args

## Requirements

- Node.js
- `glob` and `fs-extra` modules

## Installation

1. Clone this repository:

   ```
   git clone https://github.com/ro-k/angular-scss-converter.git
   cd angular-scss-converter
   ```

   2. Install the dependencies:

    ```
    npm install
    ```

## Usage

Run from `angular-scss-converter` directory, targeting your project via path to its `src` folder.

### Example Command

   ```
   node convert-css-to-scss.js /projects/my-angular-app/src
   ```
