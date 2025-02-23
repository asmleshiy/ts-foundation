
function _fromJson <T extends object> (value: string, factory?: (args: any) => T): T | undefined {
  try {
    const entry = JSON.parse(value)

    return factory?.(entry) ?? entry
  }
  catch {}
}

export default {

  fromJson <T extends object> (value: string, factory?: (args: any) => T): T | undefined {
    return _fromJson<T>(value, factory)
  },

  toJson <T extends object> (value: T): string | undefined {
    try {
      return JSON.stringify(value)
    }
    catch {}
  },

  deepCopy <T extends object> (data: T): T | undefined {
    if (typeof data === 'object') {
      const json = this.toJson(data)

      if (json) {
        return _fromJson<T>(json)
      }
    }
  },

  isNil: (value: unknown): value is (null | undefined) => value === null || value === undefined,

  exact: <T extends object> (arg: T): T => arg,

}
