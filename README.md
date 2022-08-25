# zip-action: A simple zipping Github Action

This action zips up a directory.

## Inputs

### `src-path`

**Required** The directory you'd like to zip

### `dest`

**Required** The output file

### 'compression-level'

The zlib compression level (0-9).

## Outputs

### `output`

The destination of the zipped file.

## Example usage
uses: actions/zip-action@v1
with:
  src-path: './out'
  dest: 'out.zip'
