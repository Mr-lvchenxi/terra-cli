import { render, FileManager } from 'less';
import { readFileSync } from 'fs-extra';

// less plugin to resolve tilde
class TildeResolver extends FileManager {
  loadFile(filename, ...args) {
    filename = filename.replace('~', '');
    return FileManager.prototype.loadFile.apply(this, [filename, ...args]);
  }
}

const TildeResolverPlugin = {
  install(lessInstance, pluginManager) {
    pluginManager.addFileManager(new TildeResolver());
  },
};

export async function compileLess(filePath) {
  const source = readFileSync(filePath, 'utf-8');
  const { css } = await render(source, {
    filename: filePath,
    plugins: [TildeResolverPlugin],
  });

  return css;
}
