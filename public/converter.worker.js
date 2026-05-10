/**
 * Image conversion worker using OffscreenCanvas.
 * Receives: { id, buffer, mimeType, quality, targetWidth, targetHeight, keepAspectRatio }
 * Sends:    { id, success, buffer, size } | { id, success: false, error }
 */
self.onmessage = async function (e) {
  var id = e.data.id;
  var buffer = e.data.buffer;
  var mimeType = e.data.mimeType;
  var quality = e.data.quality;
  var targetWidth = e.data.targetWidth || 0;
  var targetHeight = e.data.targetHeight || 0;
  var keepAspect = e.data.keepAspectRatio !== false;

  try {
    var blob = new Blob([buffer]);
    var bitmap = await createImageBitmap(blob);
    var origW = bitmap.width;
    var origH = bitmap.height;

    var finalW = origW, finalH = origH;
    if (targetWidth || targetHeight) {
      if (keepAspect) {
        if (targetWidth && !targetHeight) {
          finalW = targetWidth;
          finalH = Math.round(origH * targetWidth / origW);
        } else if (targetHeight && !targetWidth) {
          finalH = targetHeight;
          finalW = Math.round(origW * targetHeight / origH);
        } else {
          var scale = Math.min(targetWidth / origW, targetHeight / origH);
          finalW = Math.round(origW * scale);
          finalH = Math.round(origH * scale);
        }
      } else {
        finalW = targetWidth || origW;
        finalH = targetHeight || origH;
      }
    }

    var canvas = new OffscreenCanvas(finalW, finalH);
    var ctx = canvas.getContext('2d');
    ctx.drawImage(bitmap, 0, 0, finalW, finalH);
    bitmap.close();

    var resultBlob = await canvas.convertToBlob({
      type: mimeType,
      quality: quality,
    });

    var resultBuffer = await resultBlob.arrayBuffer();
    self.postMessage(
      { id: id, success: true, buffer: resultBuffer, size: resultBlob.size },
      [resultBuffer]
    );
  } catch (err) {
    self.postMessage({ id: id, success: false, error: String(err) });
  }
};
