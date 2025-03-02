
export const fromJson = <
  T extends object
> (
  value: string,
  factory?: (args: any) => T,
): T | undefined => {
  try {
    const entry = JSON.parse(value)

    return factory?.(entry) ?? entry
  }
  catch {}
}

export const toJson = <
  T extends object
> (value: T): string | undefined => {
  try {
    return JSON.stringify(value)
  }
  catch {}
}

export const deepCopy = <
  T extends object
> (value: T): T | undefined => {
  try {
    const json = JSON.stringify(value)

    if (json) {
      return JSON.parse(json)
    }
  }
  catch {}
}
