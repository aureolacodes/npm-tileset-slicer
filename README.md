# Tileset Slicer

Tileset slicer provides a method to slice a tileset into single tiles utilizing
the <a href="https://www.npmjs.com/package/lwip">lwip</a> package. Developers
can change several options for their tileset.

## Usage

Use the slice method to create an array of tiles (lwip images). Check below
for more options.

```javascript
let slicer = new Slicer();
slicer.slice(filepath, options, (error, tiles) => {
  if (error) {
    throw error;
  }

  // do something with the array of tiles
});
```

## Options

| Option | Description |
| --- | --- |
| tileWidth | Tile width (default: 32). |
| tileHeight | Tile height (default: 32). |
| startX | Start x-position for slicer (default: 0). |
| startY | Start y-position for slicer (default: 0). |
| paddingX | Padding between tiles (default: 0). |
| paddingY | Padding between tiles (default: 0). |

## CLI

The command line tool will slice a given file into tiles and store them
in the directory you define. Check below for more options.

```
  Usage: tileset-slicer [options] <filename>

  Helper tool to slice a tileset into single files.

  Options:

    -h, --help                output usage information
    -V, --version             output the version number
    -o, --output <directory>  Output directory (default: /var/www/htdocs/tileset-slicer).
    -f, --format <format>     Output format (default: png).
    -w, --tileWidth <n>       Tile width (default: 32).
    -h, --tileHeight <n>      Tile height (default: 32).
    -x, --startX <n>          Start x-position for slicer (default: 0).
    -y, --startY <n>          Start y-position for slicer (default: 0).
    --paddingX <n>            Padding between tiles (default: 0).
    --paddingY <n>            Padding between tiles (default: 0).
```

## Development

* Please create issues for any bugs you encounter.
* If you would like to contribute use `simply test` to test your changes
  before committing them
  (<a href="https://www.npmjs.com/package/simply-build">simply build</a>).
