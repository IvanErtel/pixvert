/**
 * Image conversion worker using OffscreenCanvas.
 * Receives: { id, buffer, mimeType, quality }
 * Sends:    { id, success, buffer, size } | { id, success: false, error }
 */
self.onmessage = async function (e) {
  var id = e.data.id;
  var buffer = e.data.buffer;
  var mimeType = e.data.mimeType;
  var quality = e.data.quality;

  try {
    var blob = new Blob([buffer]);
    var bitmap = await createImageBitmap(blob);

    var canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    var ctx = canvas.getContext('2d');
    ctx.drawImage(bitmap, 0, 0);
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
