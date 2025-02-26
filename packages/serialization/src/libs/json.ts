
function _fromJson <T extends object> (value: string, factory?: (args: any) => T): T | undefined {
  try {
    const entry = JSON.parse(value)

    return factory?.(entry) ?? entry
  }
  catch {}
}

function _toJson <T extends object> (value: T): string | undefined {
  try {
    return JSON.stringify(value)
  }
  catch {}
}

export default {

  fromJson: <T extends object> (
    value: string,
    factory?: (args: any) => T,
  ): T | undefined => _fromJson<T>(value, factory),

  toJson: <T extends object> (value: T): string | undefined => _toJson(value),

  deepCopy: <T extends object> (data: T): T | undefined => {
    if (typeof data === 'object') {
      const json = _toJson(data)

      if (json) {
        return _fromJson<T>(json)
      }
    }
  },

}
