console.time("build");

import markdown from "@wcj/markdown-to-html";
import { readFile, readdir, existsSync, promises as fsPromises } from "fs";
import * as fsExtra from "fs-extra";

const buildPath = "./build";

const copyDirectory = async (srcDir: string, dstDir: string) => {
  try {
    await fsExtra.copy(srcDir, dstDir, {
      overwrite: true,
    });
    console.log(`Directory copied from ${srcDir} to ${dstDir}`);
  } catch (error) {
    console.error("Error copying directory:", error);
  }
};

// Reset build path
try {
  if (existsSync(buildPath)) {
    await fsPromises.rm(buildPath, { recursive: true, force: true });
  }
  await fsPromises.mkdir(buildPath);
} catch (err) {
  console.error(err);
}

// Move index.html
try {
  await fsPromises.copyFile("./index.html", `${buildPath}/index.html`);
} catch (err) {
  console.error(err);
}

// Copy statis assets
copyDirectory("./static", `${buildPath}/static`);

// Build notes
const notesOutDir = `${buildPath}/notes`;

fsPromises.mkdir(notesOutDir);

const notesInDir = "./notes";
readdir(notesInDir, (err, file) => {
  const path = `${notesInDir}/${file}`;

  if (!file.endsWith(".md")) {
    return;
  }

  const outPath = `${notesOutDir}/${file.replace(".md", ".html")}`;

  readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    let out = markdown(data);

    fsPromises.writeFile(outPath, out.toString());
  });

  console.log(path);
  console.log(outPath);
});

// readFile(path, "utf8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   let out = markdown(data);

//   console.log(out);
// });

// let out = markdown("# Markdown String");

// console.log(out);

console.timeEnd("build");
