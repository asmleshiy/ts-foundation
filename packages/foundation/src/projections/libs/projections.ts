import { default as NS } from './projections.types'

const _immutable = <
  TData extends object
> (data: TData): NS.Immutable<TData> => {

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
  ) as NS.Immutable<TData>
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
    TIn extends object,
    TSchema extends { [K in keyof TIn]: string }
  > (args: TIn, schema: TSchema): NS.SwitchSchema<TIn, TSchema> => {

    const entries = Object.entries(args)
      .filter(([key, value]) =>
        key in schema
        && typeof value !== 'function',
      )
      .map(([key, value]) => [
        schema[key as keyof TIn],
        value,
      ])

    return Object.fromEntries(entries) as NS.SwitchSchema<TIn, TSchema>
  },

  flipSchema: <
    TSchema extends Record<string, string>
  > (schema: TSchema): NS.FlipSchema<TSchema> => {

    const entries = Object
      .entries(schema)
      .map(([key, value]) => [value, key])

    return Object.fromEntries(entries) as NS.FlipSchema<TSchema>
  },

  immutable: <
    TData extends object
  > (data: TData): NS.Immutable<TData> => _immutable(data),

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

  projection: <
    TData extends object
  > (data: TData): NS.Projection<TData> => {

    const entries = Object.entries(data)
      .filter(([, value]) => typeof value !== 'function')
      .sort(([a], [b]) => a.localeCompare(b))

    return Object.fromEntries(entries) as NS.Projection<TData>
  },

}
