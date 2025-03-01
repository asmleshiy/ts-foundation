import * as Core from '@ts-foundation/core'

import * as NS from './projections.types'

export const difference = <
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
}

export const intersection = <
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
}

export const merge = <
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
}

export const switchSchema = <
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
}

export const flipSchema = <
  TSchema extends Record<string, string>
> (schema: TSchema): NS.FlipSchema<TSchema> => {

  const entries = Object
    .entries(schema)
    .map(([key, value]) => [value, key])

  return Object.fromEntries(entries) as NS.FlipSchema<TSchema>
}

export const immutable = <
  TData extends object
> (data: TData): NS.DeepImmutable<TData> => {

  const entries = Object.entries(data)
    .filter(([, value]) => typeof value !== 'function')
    .map(([key, value]) => [
      key,
      value && typeof value === 'object'
        ? immutable(value)
        : value,
    ])

  return Object.freeze(
    Object.fromEntries(entries),
  ) as NS.DeepImmutable<TData>
}

export const projection = <
  TData extends object
> (data: TData): NS.DeepProjection<TData> => {

  const entries = Object.entries(data)
    .filter(([, value]) => typeof value !== 'function')
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => [
      key,
      value && typeof value === 'object'
        ? Array.isArray(value)
          ? value
          : projection(value)
        : value,
    ])

  return Object.fromEntries(entries) as NS.DeepProjection<TData>
}

export const lens = <
  TIn extends object,
  TLens extends NS.Lens<Core.Checkbox<TIn>> = NS.Lens<Core.Checkbox<TIn>>,
  TData extends Partial<TIn> = Partial<TIn>
> (
  data: TData,
  from: TLens,
): NS.LensProjection<TData, TLens> => {

  const entries = Object.entries(from)
    .filter(([key]) =>
      key in data
      && typeof data[key as keyof object] !== 'function',
    )
    .map(([key]) => [key, data[key as keyof object]])

  return Object.fromEntries(entries) as NS.LensProjection<TData, TLens>
}

export const groupBy = <
  T extends object,
  K extends string = string
> (
  entries: T[],
  by: (entry: T) => K,
): NS.GroupBy<T, K> => {

  const result: Record<string, T[]> = {}

  for (const entry of entries) {
    const key = by(entry)

    if (!result[key]) {
      result[key] = []
    }

    result[key].push(entry)
  }

  return result as NS.GroupBy<T, K>
}

// TODO: flat
