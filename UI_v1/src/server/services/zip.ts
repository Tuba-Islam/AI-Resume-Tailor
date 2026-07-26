import JSZip from "jszip";

export async function createZipBundle(files: Record<string, Buffer>): Promise<Buffer> {
  const zip = new JSZip();
  for (const [name, content] of Object.entries(files)) {
    zip.file(name, content);
  }
  return zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
}
