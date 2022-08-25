# zip-action: A simple zipping Github Action

This action zips up a directory.

## Inputs

### `src-path`

**Required** The directory you'd like to zip

### `dest`

**Required** The output file

## Outputs

### `output`

The destination of the zipped file.

## Example usage
uses: actions/zip-action@v1
with:
  src-path: './out'
  dest: 'out.zip'
