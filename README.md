# edje-spinner
 
The concept is to have a series of spinners for Leading EDJE, built into one platform.

![Demo Image 1](./images/DEMO-01.png)

![Demo Image 2](./images/DEMO-02.png)

![Demo Image 3](./images/DEMO-03.png)

## Installation Notes

```script
> npm install
```

## Usage Notes

Optimize the images, then run the Minified file to serve the code correctly.

### Optimize Images

This script generates a `/optimized` and `/build` set of SVG and JavaScript code, based on `/source` SVG images.

```script
> gulp -f gulpsvg.js
```

### Build Minified File

```script
> gulp
```

## Attributes

| Attribute | Description | Values (DEFAULT) |
|-----------|-------------|------------------|
| active | Is active? | true, (false) |
| debug | console.log | true, (false) |
| type | Image Type | (eddie), eddie-guitar, eddie-silver, le |
| size | T-shirt Sizes | (normal) |
| display | Display Options | (normal), round |

## Task List

- [x] Web Component (JavaScript ONLY)
- [x] Accept Attribute Changes
- [x] Images to SVG and Import
- [x] Display Options, Horizontal Spin or Round Spinner
- [ ] T-shirt sizes
- [ ] Accept another image
- [ ] Allow change of "round" color
- [ ] Allow change of background
- [ ] Test and Angular Install
- [ ] Test and React Install
- [ ] Installation Notes
- [ ] Usage Notes
