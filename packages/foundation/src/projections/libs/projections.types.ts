import {
  Checkbox as _Checkbox,
  Difference as _Difference,
  FlipSchema as _FlipSchema,
  Immutable as _Immutable,
  Intersection as _Intersection,
  Merge as _Merge,
  ObjectKeys as _ObjectKeys,
  Projection as _Projection,
  SwitchSchema as _SwitchSchema,
} from '@ts-blueprints/bp'

namespace NS {

  export type Difference<
    T1 extends object,
    T2 extends object
  > = _Projection<_Difference<T1, T2>>

  export type Intersection<
    T1 extends object,
    T2 extends object
  > = _Projection<_Intersection<T1, T2>>

  export type Merge<
    T1 extends object,
    T2 extends object
  > = _Projection<_Merge<T1, T2>>

  export type SwitchSchema<
    TIn extends object,
    TSchema extends { [K in keyof TIn]: string }
  > = _Projection<_SwitchSchema<TIn, TSchema>>

  export type FlipSchema<
    T extends Record<string, string>
  > = _Projection<_FlipSchema<T>>

  export type Projection<T extends object> = _Projection<T>

  export type Immutable<T extends object> = _Immutable<T>

  export type Lens<T extends object> = _Projection<
    Record<_ObjectKeys<T>, undefined | true>
  >

  export type Checkbox<T extends object = object> = _Projection<_Checkbox<T>>

  export type LensProjection<
    TLens extends Lens<object>,
    TData extends { [K in keyof TLens]: any }
  > = _Projection<_Intersection<TLens, TData>>

}

export default NS
