/**
 * @description 解析xml中的经纬度并返回数组
 */
export function parseLngLat(data: string): LngLat[] {
  const result = [];
  const regex = /lat="([\d\.]+)" lon="([\d\.]+)"/g;
  let match;
  while ((match = regex.exec(data)) !== null) {
    const [_, lat, lon] = match;
    result.push([Number(lon), Number(lat)]);
  }
  return result;
}
