/**
 * @format
 * @description 图片压缩
 * @param url 图片URL
 * @param size 图片尺寸 [width,height]
 * @param multiple 倍数
 * @returns
 */

export function compressImg(
  url: string,
  size: [number, number] | false = false,
  multiple: number = 2
) {
  if (typeof size === "boolean") {
    return url
  }
  const [width, height] = size

  return `${url}?param=${parseInt(String(width * multiple))}y${parseInt(String(height * multiple))}`
}
