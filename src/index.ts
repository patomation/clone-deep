export type ComplexObject = {
  [key: string]: ComplexObject
}

export type CompatibleObjects = unknown | Array<unknown> | Date | Object
// Record<string, unknown>
export function cloneDeep<O extends CompatibleObjects>(item: O): O
export function cloneDeep<
  O extends CompatibleObjects,
  RO extends CompatibleObjects
>(item: O): O
export function cloneDeep<
  O extends CompatibleObjects,
  RO extends CompatibleObjects
>(item: O): RO {
  // Handle dates - prevents dates from getting converted into empty {}
  if (item instanceof Date) {
    return item as unknown as RO

    // Handle arrays and walk them
  } else if (Array.isArray(item)) {
    return item.map((arrItem: O) => {
      return cloneDeep<O, RO>(arrItem)
    }) as unknown as RO

    // Handle objects
  } else if (
    typeof item === 'object' &&
    item !== null &&
    item instanceof Object
  ) {
    // Walk over each entry in object
    const obj = Object.entries(item).reduce((acc, [key, value]) => {
      // handle each item recursively
      ;(acc as any)[key as any] = cloneDeep(value)
      // return mutated accumulator
      return acc
    }, {})
    return obj as O & RO

    // Handle all other types
  } else {
    return item as O & RO
  }
}
