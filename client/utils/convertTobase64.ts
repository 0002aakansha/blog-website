// export function convertToBase64(data: Buffer) {
//     const base64String = btoa(String.fromCharCode(...new Uint8Array(data.data)));
//     return `data:image/png;base64,${base64String}`
// }

export function convertToBase64(data: Buffer) {
  if (data) {
    const base64String = Buffer.from(data).toString('base64');
    return `data:image/png;base64,${base64String}`;
  }
  return undefined
}