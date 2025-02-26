import {
  Checkbox as _Checkbox,
  Combine as _Combine,
  Difference as _Difference,
  Intersection as _Intersection,
  Merge as _Merge,
  ObjectKeys as _ObjectKeys,
} from '@ts-foundation/utilities'

export type Projection<T extends object> = _Combine<{
  [K in (keyof T & (string | number)) as T[K] extends Function ? never : K]: T[K]
}>

export type DeepProjection<T extends object> = _Combine<{
  [K in (keyof T & (string | number)) as T[K] extends Function ? never : K]: T[K] extends object
    ? T[K] extends Array<infer U>
      ? U extends object ? DeepProjection<U>[] : U[]
      : DeepProjection<T[K]>
    : T[K]
}>

export type Immutable<T extends object> = _Combine<
  Readonly<{
    [K in (keyof T & (string | number)) as T[K] extends Function ? never : K]: T[K]
  }>
>

export type DeepImmutable<T extends object> = _Combine<
  Readonly<{
    [K in (keyof T & (string | number)) as T[K] extends Function ? never : K]: T[K] extends object
      ? T[K] extends Array<infer U>
        ? U extends object ? DeepImmutable<U>[] : U[]
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

export type Difference<
  T1 extends object,
  T2 extends object
> = Projection<_Difference<T1, T2>>

export type Intersection<
  T1 extends object,
  T2 extends object
> = Projection<_Intersection<T1, T2>>

export type Merge<
  T1 extends object,
  T2 extends object
> = Projection<_Merge<T1, T2>>

export type Lens<T extends object> = Projection<
  Record<_ObjectKeys<T>, undefined | true>
>

export type Checkbox<T extends object = object> = Projection<_Checkbox<T>>

export type LensProjection<
  TLens extends Lens<object>,
  TData extends { [K in keyof TLens]: any }
> = Projection<_Intersection<TLens, TData>>
