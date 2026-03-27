import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function walk(dir, filelist = []) {
  if (!fs.existsSync(dir)) return filelist;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      if (!filepath.includes('node_modules') && !filepath.includes('.git')) {
        filelist = walk(filepath, filelist);
      }
    } else {
      if (filepath.endsWith('.tsx') || filepath.endsWith('.jsx') || filepath.endsWith('.ts')) {
        filelist.push(filepath);
      }
    }
  }
  return filelist;
}

const dirs = [
  path.join(process.cwd(), 'app'),
  path.join(process.cwd(), 'components')
];

let allFiles = [];
dirs.forEach(d => allFiles = allFiles.concat(walk(d)));

const colors = 'slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white|black';
const colorPattern = `(?:${colors})(?:-\\d{2,3}(?:\\/\\d{1,2})?)?`;

let modifiedCount = 0;

for (const file of allFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // 1. Remove all dark mode color classes
  const darkRegex = new RegExp(`dark:(?:hover:)?(?:bg|text|border|ring|divide|shadow)-${colorPattern}`, 'g');
  content = content.replace(darkRegex, '');

  // 2. Remove shadow colors completely
  const shadowRegex = new RegExp(`shadow-${colorPattern}`, 'g');
  content = content.replace(shadowRegex, '');

  // 3. Map Hover text
  const hoverTextRegex = new RegExp(`hover:text-${colorPattern}`, 'g');
  content = content.replace(hoverTextRegex, 'hover:text-[var(--secondary-foreground)]');

  // 4. Map Hover bg
  const hoverBgRegex = new RegExp(`hover:bg-${colorPattern}`, 'g');
  content = content.replace(hoverBgRegex, 'hover:bg-[var(--secondary)]');

  // 5. Map BGs
  const bgRegexStr = `bg-(${colors})(?:-(\\d{2,3})(?:\\/\\d{1,2})?)?`;
  content = content.replace(new RegExp(bgRegexStr, 'g'), (match, colorName, shadeStr) => {
    const shade = parseInt(shadeStr) || 0;
    if (colorName === 'white' || colorName === 'transparent' || shade < 400) {
      if (colorName !== 'transparent') return 'bg-[var(--background)]';
      return match; // preserve clear bg
    } else {
      return 'bg-[var(--secondary)]';
    }
  });

  // 6. Map Text
  const textRegexStr = `text-(${colors})(?:-(\\d{2,3})(?:\\/\\d{1,2})?)?`;
  content = content.replace(new RegExp(textRegexStr, 'g'), (match, colorName, shadeStr) => {
      const shade = parseInt(shadeStr) || 0;
      if (colorName === 'white' || (shade > 0 && shade < 400 && colorName !== 'slate' && colorName !== 'gray' && colorName !== 'zinc')) {
          return 'text-[var(--secondary-foreground)]';
      } else {
          return 'text-[var(--foreground)]';
      }
  });

  // 7. Map borders and rings
  const borderRegex = new RegExp(`border-${colorPattern}`, 'g');
  content = content.replace(borderRegex, 'border-[var(--border)]');

  const ringRegex = new RegExp(`ring-${colorPattern}`, 'g');
  content = content.replace(ringRegex, 'ring-2 ring-[var(--border)]');

  // 8. Cleanup multiple spaces inside className strings
  content = content.replace(/className=(["'])(.*?)\1/g, (match, quote, classes) => {
    const cleaned = classes.replace(/\s+/g, ' ').trim();
    return `className=${quote}${cleaned}${quote}`;
  });

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
}

console.log(`Refactored colors in ${modifiedCount} files.`);
