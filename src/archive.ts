import fs from "node:fs";
import archiver from "archiver";

const output = fs.createWriteStream("./dist.zip");
const archive = archiver("zip", { zlib: { level: 9 } });

output.on("close", () => {
  console.log(
    `Zip created successfully! Total size: ${archive.pointer()} bytes.`
  );
});

archive.pipe(output);
archive.directory("./dist/", false);
archive.finalize();
