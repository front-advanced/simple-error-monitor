import fs from 'fs';
import path from 'path';
import type { Plugin, ResolvedConfig } from 'vite';

interface SourcemapUploadOptions {
  projectId: string;
  uploadUrl: string;
}

export default function sourcemapUploadPlugin(options: SourcemapUploadOptions): Plugin {
  let config: ResolvedConfig;

  return {
    name: 'vite-plugin-sourcemap-upload',
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    async writeBundle(_outputOptions, bundle) {
      const sourcemapFiles = Object.keys(bundle).filter(fileName => fileName.endsWith('.map'));

      for (const fileName of sourcemapFiles) {
        const sourcemapPath = path.resolve(config.build.outDir, fileName);
        const formData = new FormData();
        formData.append('file', new Blob([fs.readFileSync(sourcemapPath)]), fileName);
        formData.append('version', process.env.GIT_COMMIT_HASH || '');
        formData.append('projectId', options.projectId);

        try {
          const response = await fetch(options.uploadUrl, {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          console.log(`Sourcemap ${fileName} uploaded successfully`);
        } catch (error) {
          console.error(`Failed to upload sourcemap ${fileName}:`, error);
        }
      }
    },
  };
}