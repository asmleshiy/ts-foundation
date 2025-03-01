import * as Core from '@ts-foundation/core'

export type Undefinable<T extends object> = {
  [K in keyof T]: T[K] extends undefined
    ? T[K]
    : T[K] | undefined
}

export type Projection<
  T extends object
> = Core.Combine<{
  [K in (keyof T & (string | number)) as T[K] extends Function ? never : K]: T[K]
}>

export type Select<
  TSelect extends object,
  TFrom extends { [k in keyof TSelect]: any }
> = Projection<
  Core.Select<TSelect, TFrom>
>

export type Subtract<
  TSubtract extends object,
  TFrom extends { [k in keyof TSubtract]: any }
> = Projection<
  Core.Subtract<TSubtract, TFrom>
>

export type Difference<
  T1 extends object,
  T2 extends object
> = Projection<
  Core.Difference<T1, T2>
>

export type Intersection<
  T1 extends object,
  T2 extends object
> = Projection<
  Core.Intersection<T1, T2>
>

export type Merge<
  T1 extends object,
  T2 extends object
> = Projection<
  Core.Merge<T1, T2>
>

export type Override<
  TFields extends object,
  TFrom extends { [K in keyof TFields]: unknown }
> = Projection<
  Core.Override<TFields, TFrom>
>

export type Extend<
  TFields extends object,
  TFrom extends object
> = Projection<
  Core.Extend<TFields, TFrom>
>

export type DeepProjection<T extends object> = Core.Combine<{
  [K in (keyof T & (string | number)) as T[K] extends Function ? never : K]: T[K] extends object
    ? T[K] extends Array<infer U>
      ? U extends object
        ? DeepProjection<U>[]
        : U[]
      : DeepProjection<T[K]>
    : T[K]
}>

export type Immutable<T extends object> = Core.Combine<
  Readonly<{
    [K in (keyof T & (string | number)) as T[K] extends Function ? never : K]: T[K]
  }>
>

export type DeepImmutable<T extends object> = Core.Combine<
  Readonly<{
    [K in (keyof T & (string | number)) as T[K] extends Function ? never : K]: T[K] extends object
      ? T[K] extends Array<infer U>
        ? U extends object
          ? DeepImmutable<U>[]
          : U[]
        : DeepImmutable<T[K]>
      : T[K]
  }>
>

export type SwitchSchema<
  T extends object,
  TSchema extends Record<(keyof T | string), string>
> = Projection<{
  -readonly [K in keyof TSchema as TSchema[K]]: K extends keyof T ? T[K] : never
}>

export type FlipSchema<
  T extends Record<string, string>
> = Readonly<
  Projection<{
    [K in keyof T as T[K]]: K
  }>
>

export type Lens<
  T extends object
> = Projection<
  Record<Core.ObjectKeys<T>, undefined>
>

export type LensProjection<
  TData extends object,
  TLens extends Record<string, undefined>
> = Undefinable<
  Projection<{
    [K in keyof TLens]: K extends keyof TData
      ? TData[K]
      : never
  }>
>

export type GroupBy<
  T extends object,
  K extends string = string
> = Record<K, T[]>
