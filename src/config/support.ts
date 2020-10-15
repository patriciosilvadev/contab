export function isEmpty(object: any): boolean {
  return !object || Object.entries(object).length === 0
}
