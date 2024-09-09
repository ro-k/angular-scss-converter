const fs = require('fs-extra');
const path = require('path');
const {
  glob,
} = require('glob');

// Get target directory from command-line (defaults to 'src')
const targetPath = process.argv[2] || 'src';

// Async function to handle both tasks
async function convertCssToScss() {
  try {
    // update .ts files to change `.css` to `.scss`
    const tsFiles = await glob(`${targetPath}/**/*.component.ts`);

    tsFiles.forEach(file => {
      let content = fs.readFileSync(file, 'utf8');
      let hasCss = false;

      // Look for `.css` extension in styleUrls
      content = content.replace(/\.css/g, () => {
        hasCss = true;
        return '.scss';
      });

      // write the updated .ts file
      if (hasCss) {
        console.log(`Updating ${file}`);
        fs.writeFileSync(file, content, 'utf8');
      }
    });

    // rename `.css` files to `.scss`
    const cssFiles = await glob(`${targetPath}/**/*.css`);

    console.log(`Found ${cssFiles.length} project .css files`);

    cssFiles.forEach(file => {
      const scssFile = file.replace('.css', '.scss');

      // rename `.css` file to `.scss`
      fs.move(file, scssFile, err => {
        if (err) {
          console.error(`Error renaming file ${file}`, err);
          return;
        }
        console.log(`Renamed ${file} to ${scssFile}`);
      });
    });

    // update angular.json file
    const angularJsonPath = path.join(targetPath, '../angular.json');
    if (fs.existsSync(angularJsonPath)) {
      let angularJsonContent = fs.readFileSync(angularJsonPath, 'utf8');
      let hasCssInAngularJson = false;

      // replace .css references to files in the src folder only
      angularJsonContent = angularJsonContent.replace(/"src\/[^"]*\.css"/g, (match) => {
        hasCssInAngularJson = true;
        return match.replace('.css', '.scss');
      });

      if (hasCssInAngularJson) {
        console.log(`Updating angular.json`);
        fs.writeFileSync(angularJsonPath, angularJsonContent, 'utf8');
      } else {
        console.log('No .css references found in angular.json for src folder');
      }
    } else {
      console.log('angular.json file not found');
    }

  } catch (err) {
    console.error('Error:', err);
  }
}

convertCssToScss();
