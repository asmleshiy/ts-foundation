import * as NS from './projections.types'

const _immutable = <
  TData extends object
> (data: TData): NS.DeepImmutable<TData> => {

  const entries = Object.entries(data)
    .filter(([, value]) => typeof value !== 'function')
    .map(([key, value]) => [
      key,
      value && typeof value === 'object'
        ? _immutable(value)
        : value,
    ])

  return Object.freeze(
    Object.fromEntries(entries),
  ) as NS.DeepImmutable<TData>
}

const _projection = <TData extends object>(data: TData): NS.DeepProjection<TData> => {
  const entries = Object.entries(data)
    .filter(([, value]) =>
      typeof value !== 'function'
        && typeof value !== 'symbol',
    )
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => [
      key,
      value && typeof value === 'object'
        ? _projection(value)
        : value,
    ])

  return Object.fromEntries(entries) as NS.DeepProjection<TData>
}

export default {

  difference: <
    T1 extends object,
    T2 extends object
  > (a: T1, b: T2): NS.Difference<T1, T2> => {

    const uniqueKeys = new Set([
      ...Object.keys(a).filter(k =>
        !(k in b) && typeof a[k as keyof T1] !== 'function',
      ),
      ...Object.keys(b).filter(k =>
        !(k in a) && typeof b[k as keyof T2] !== 'function',
      ),
    ])

    const entries = Array.from(uniqueKeys)
      .sort()
      .map(key => [
        key,
        key in a ? a[key as keyof T1] : b[key as keyof T2],
      ])

    return Object.fromEntries(entries) as NS.Difference<T1, T2>
  },

  intersection: <
    T1 extends object,
    T2 extends object
  > (a: T1, b: T2): NS.Intersection<T1, T2> => {

    const entries = Object.keys(a)
      .filter(k =>
        k in b
        && typeof a[k as keyof T1] !== 'function'
        && typeof b[k as keyof T2] !== 'function',
      )
      .sort()
      .map(key => [key, b[key as keyof T2]])

    return Object.fromEntries(entries) as NS.Intersection<T1, T2>
  },

  merge: <
    T1 extends object,
    T2 extends object
  > (a: T1, b: T2): NS.Merge<T1, T2> => {

    const uniqueKeys = new Set([
      ...Object.keys(a).filter(k =>
        typeof a[k as keyof T1] !== 'function',
      ),
      ...Object.keys(b).filter(k =>
        typeof b[k as keyof T2] !== 'function',
      ),
    ])

    const entries = Array.from(uniqueKeys)
      .sort()
      .map(key => [
        key,
        key in b ? b[key as keyof T2] : a[key as keyof T1],
      ])

    return Object.fromEntries(entries) as NS.Merge<T1, T2>
  },

  switchSchema: <
    T extends object,
    TSchema extends Record<(keyof T | string), string>
  > (args: T, schema: TSchema): NS.SwitchSchema<T, TSchema> => {

    const entries = Object.entries(args)
      .filter(([key, value]) =>
        key in schema
        && typeof value !== 'function',
      )
      .map(([key, value]) => [
        schema[key as keyof T],
        value,
      ])

    return Object.fromEntries(entries) as NS.SwitchSchema<T, TSchema>
  },

  flipSchema: <
    TSchema extends Record<string, string>
  > (schema: TSchema): NS.FlipSchema<TSchema> => {

    const entries = Object
      .entries(schema)
      .map(([key, value]) => [value, key])

    return Object.fromEntries(entries) as NS.FlipSchema<TSchema>
  },

  lens: <
    TLens extends NS.Lens<object>,
    TData extends { [K in keyof TLens]: any }
  > (
    from: TLens,
    data: TData,
  ): NS.LensProjection<TLens, TData> => {

    const entries = Object.entries(from)
      .filter(([key]) =>
        key in data
        && typeof data[key as keyof TData] !== 'function',
      )
      .map(([key]) => [key, data[key as keyof TData]])

    return Object.fromEntries(entries) as NS.LensProjection<TLens, TData>
  },

  immutable: <
    TData extends object
  > (data: TData): NS.DeepImmutable<TData> => _immutable(data),

  projection: <
    TData extends object
  > (data: TData): NS.DeepProjection<TData> => _projection(data),

  groupBy: <
    T extends object,
    K extends string = string
  > (
    entries: T[],
    by: (entry: T) => K,
  ): Record<K, T[]> => {

    const result: Record<string, T[]> = {}

    for (const entry of entries) {

      const key = by(entry)

      if (!result[key]) {
        result[key] = []
      }

      result[key].push(entry)
    }

    return result
  },
}
