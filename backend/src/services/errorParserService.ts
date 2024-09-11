import { SourceMapConsumer, RawSourceMap } from 'source-map';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ErrorParserService {
  private parseLine(stackLine: string, sourceMapConsumer: SourceMapConsumer): string {
    const regex = /at\s+(.+?)\s+\((.+):(\d+):(\d+)\)/;
    const match = stackLine.match(regex);

    if (!match) {
      return stackLine; // If the line doesn't match the regex, return the original line
    }

    const [, functionName, , lineNumber, columnNumber] = match;

    const originalPosition = sourceMapConsumer.originalPositionFor({
      line: parseInt(lineNumber, 10),
      column: parseInt(columnNumber, 10)
    });

    if (!originalPosition.source) {
      return stackLine; // If the original position is not found, return the original line
    }

    const { source, line: originalLine, column: originalColumn } = originalPosition;
    const originalName = originalPosition.name || functionName;

    return `at ${originalName} (${source}:${originalLine}:${originalColumn})`;
  }

  async parseError(stackTrace: string, projectId: string, version: string): Promise<string> {
    const sourcemapPath = path.join(__dirname, '..', '..', 'sourcemaps', projectId, `${version}.js.map`);
    
    try {
      await fs.access(sourcemapPath);
    } catch (error) {
      return stackTrace; // If the sourcemap doesn't exist, return the original stack trace
    }

    const sourceMapContent = await fs.readFile(sourcemapPath, 'utf8');
    const consumer = await new SourceMapConsumer(JSON.parse(sourceMapContent) as RawSourceMap);

    try {
      const lines = stackTrace.split('\n');
      const parsedLines = lines.map(line => this.parseLine(line, consumer));
      return parsedLines.join('\n');
    } finally {
      consumer.destroy();
    }
  }
}

export const errorParserService = new ErrorParserService();