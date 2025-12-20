
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Admin
 * 
 */
export type Admin = $Result.DefaultSelection<Prisma.$AdminPayload>
/**
 * Model Approver
 * 
 */
export type Approver = $Result.DefaultSelection<Prisma.$ApproverPayload>
/**
 * Model Pengawas
 * 
 */
export type Pengawas = $Result.DefaultSelection<Prisma.$PengawasPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Penanggung_Jawab
 * 
 */
export type Penanggung_Jawab = $Result.DefaultSelection<Prisma.$Penanggung_JawabPayload>
/**
 * Model Jenazah
 * 
 */
export type Jenazah = $Result.DefaultSelection<Prisma.$JenazahPayload>
/**
 * Model Blok
 * 
 */
export type Blok = $Result.DefaultSelection<Prisma.$BlokPayload>
/**
 * Model makam
 * 
 */
export type makam = $Result.DefaultSelection<Prisma.$makamPayload>
/**
 * Model makamStatus
 * 
 */
export type makamStatus = $Result.DefaultSelection<Prisma.$makamStatusPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Admins
 * const admins = await prisma.admin.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Admins
   * const admins = await prisma.admin.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.admin`: Exposes CRUD operations for the **Admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): Prisma.AdminDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.approver`: Exposes CRUD operations for the **Approver** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Approvers
    * const approvers = await prisma.approver.findMany()
    * ```
    */
  get approver(): Prisma.ApproverDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pengawas`: Exposes CRUD operations for the **Pengawas** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pengawas
    * const pengawas = await prisma.pengawas.findMany()
    * ```
    */
  get pengawas(): Prisma.PengawasDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.penanggung_Jawab`: Exposes CRUD operations for the **Penanggung_Jawab** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Penanggung_Jawabs
    * const penanggung_Jawabs = await prisma.penanggung_Jawab.findMany()
    * ```
    */
  get penanggung_Jawab(): Prisma.Penanggung_JawabDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.jenazah`: Exposes CRUD operations for the **Jenazah** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Jenazahs
    * const jenazahs = await prisma.jenazah.findMany()
    * ```
    */
  get jenazah(): Prisma.JenazahDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.blok`: Exposes CRUD operations for the **Blok** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bloks
    * const bloks = await prisma.blok.findMany()
    * ```
    */
  get blok(): Prisma.BlokDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.makam`: Exposes CRUD operations for the **makam** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Makams
    * const makams = await prisma.makam.findMany()
    * ```
    */
  get makam(): Prisma.makamDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.makamStatus`: Exposes CRUD operations for the **makamStatus** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MakamStatuses
    * const makamStatuses = await prisma.makamStatus.findMany()
    * ```
    */
  get makamStatus(): Prisma.makamStatusDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Admin: 'Admin',
    Approver: 'Approver',
    Pengawas: 'Pengawas',
    User: 'User',
    Penanggung_Jawab: 'Penanggung_Jawab',
    Jenazah: 'Jenazah',
    Blok: 'Blok',
    makam: 'makam',
    makamStatus: 'makamStatus'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "admin" | "approver" | "pengawas" | "user" | "penanggung_Jawab" | "jenazah" | "blok" | "makam" | "makamStatus"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Admin: {
        payload: Prisma.$AdminPayload<ExtArgs>
        fields: Prisma.AdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findFirst: {
            args: Prisma.AdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findMany: {
            args: Prisma.AdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          create: {
            args: Prisma.AdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          createMany: {
            args: Prisma.AdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          delete: {
            args: Prisma.AdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          update: {
            args: Prisma.AdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          deleteMany: {
            args: Prisma.AdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          upsert: {
            args: Prisma.AdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          aggregate: {
            args: Prisma.AdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmin>
          }
          groupBy: {
            args: Prisma.AdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminCountArgs<ExtArgs>
            result: $Utils.Optional<AdminCountAggregateOutputType> | number
          }
        }
      }
      Approver: {
        payload: Prisma.$ApproverPayload<ExtArgs>
        fields: Prisma.ApproverFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApproverFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApproverPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApproverFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApproverPayload>
          }
          findFirst: {
            args: Prisma.ApproverFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApproverPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApproverFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApproverPayload>
          }
          findMany: {
            args: Prisma.ApproverFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApproverPayload>[]
          }
          create: {
            args: Prisma.ApproverCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApproverPayload>
          }
          createMany: {
            args: Prisma.ApproverCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApproverCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApproverPayload>[]
          }
          delete: {
            args: Prisma.ApproverDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApproverPayload>
          }
          update: {
            args: Prisma.ApproverUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApproverPayload>
          }
          deleteMany: {
            args: Prisma.ApproverDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApproverUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ApproverUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApproverPayload>[]
          }
          upsert: {
            args: Prisma.ApproverUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApproverPayload>
          }
          aggregate: {
            args: Prisma.ApproverAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApprover>
          }
          groupBy: {
            args: Prisma.ApproverGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApproverGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApproverCountArgs<ExtArgs>
            result: $Utils.Optional<ApproverCountAggregateOutputType> | number
          }
        }
      }
      Pengawas: {
        payload: Prisma.$PengawasPayload<ExtArgs>
        fields: Prisma.PengawasFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PengawasFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengawasPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PengawasFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengawasPayload>
          }
          findFirst: {
            args: Prisma.PengawasFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengawasPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PengawasFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengawasPayload>
          }
          findMany: {
            args: Prisma.PengawasFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengawasPayload>[]
          }
          create: {
            args: Prisma.PengawasCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengawasPayload>
          }
          createMany: {
            args: Prisma.PengawasCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PengawasCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengawasPayload>[]
          }
          delete: {
            args: Prisma.PengawasDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengawasPayload>
          }
          update: {
            args: Prisma.PengawasUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengawasPayload>
          }
          deleteMany: {
            args: Prisma.PengawasDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PengawasUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PengawasUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengawasPayload>[]
          }
          upsert: {
            args: Prisma.PengawasUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengawasPayload>
          }
          aggregate: {
            args: Prisma.PengawasAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePengawas>
          }
          groupBy: {
            args: Prisma.PengawasGroupByArgs<ExtArgs>
            result: $Utils.Optional<PengawasGroupByOutputType>[]
          }
          count: {
            args: Prisma.PengawasCountArgs<ExtArgs>
            result: $Utils.Optional<PengawasCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Penanggung_Jawab: {
        payload: Prisma.$Penanggung_JawabPayload<ExtArgs>
        fields: Prisma.Penanggung_JawabFieldRefs
        operations: {
          findUnique: {
            args: Prisma.Penanggung_JawabFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Penanggung_JawabPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Penanggung_JawabFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Penanggung_JawabPayload>
          }
          findFirst: {
            args: Prisma.Penanggung_JawabFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Penanggung_JawabPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Penanggung_JawabFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Penanggung_JawabPayload>
          }
          findMany: {
            args: Prisma.Penanggung_JawabFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Penanggung_JawabPayload>[]
          }
          create: {
            args: Prisma.Penanggung_JawabCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Penanggung_JawabPayload>
          }
          createMany: {
            args: Prisma.Penanggung_JawabCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.Penanggung_JawabCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Penanggung_JawabPayload>[]
          }
          delete: {
            args: Prisma.Penanggung_JawabDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Penanggung_JawabPayload>
          }
          update: {
            args: Prisma.Penanggung_JawabUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Penanggung_JawabPayload>
          }
          deleteMany: {
            args: Prisma.Penanggung_JawabDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.Penanggung_JawabUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.Penanggung_JawabUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Penanggung_JawabPayload>[]
          }
          upsert: {
            args: Prisma.Penanggung_JawabUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Penanggung_JawabPayload>
          }
          aggregate: {
            args: Prisma.Penanggung_JawabAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePenanggung_Jawab>
          }
          groupBy: {
            args: Prisma.Penanggung_JawabGroupByArgs<ExtArgs>
            result: $Utils.Optional<Penanggung_JawabGroupByOutputType>[]
          }
          count: {
            args: Prisma.Penanggung_JawabCountArgs<ExtArgs>
            result: $Utils.Optional<Penanggung_JawabCountAggregateOutputType> | number
          }
        }
      }
      Jenazah: {
        payload: Prisma.$JenazahPayload<ExtArgs>
        fields: Prisma.JenazahFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JenazahFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenazahPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JenazahFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenazahPayload>
          }
          findFirst: {
            args: Prisma.JenazahFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenazahPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JenazahFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenazahPayload>
          }
          findMany: {
            args: Prisma.JenazahFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenazahPayload>[]
          }
          create: {
            args: Prisma.JenazahCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenazahPayload>
          }
          createMany: {
            args: Prisma.JenazahCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JenazahCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenazahPayload>[]
          }
          delete: {
            args: Prisma.JenazahDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenazahPayload>
          }
          update: {
            args: Prisma.JenazahUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenazahPayload>
          }
          deleteMany: {
            args: Prisma.JenazahDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JenazahUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JenazahUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenazahPayload>[]
          }
          upsert: {
            args: Prisma.JenazahUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenazahPayload>
          }
          aggregate: {
            args: Prisma.JenazahAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJenazah>
          }
          groupBy: {
            args: Prisma.JenazahGroupByArgs<ExtArgs>
            result: $Utils.Optional<JenazahGroupByOutputType>[]
          }
          count: {
            args: Prisma.JenazahCountArgs<ExtArgs>
            result: $Utils.Optional<JenazahCountAggregateOutputType> | number
          }
        }
      }
      Blok: {
        payload: Prisma.$BlokPayload<ExtArgs>
        fields: Prisma.BlokFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BlokFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlokPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BlokFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlokPayload>
          }
          findFirst: {
            args: Prisma.BlokFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlokPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BlokFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlokPayload>
          }
          findMany: {
            args: Prisma.BlokFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlokPayload>[]
          }
          create: {
            args: Prisma.BlokCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlokPayload>
          }
          createMany: {
            args: Prisma.BlokCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BlokCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlokPayload>[]
          }
          delete: {
            args: Prisma.BlokDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlokPayload>
          }
          update: {
            args: Prisma.BlokUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlokPayload>
          }
          deleteMany: {
            args: Prisma.BlokDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BlokUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BlokUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlokPayload>[]
          }
          upsert: {
            args: Prisma.BlokUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlokPayload>
          }
          aggregate: {
            args: Prisma.BlokAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBlok>
          }
          groupBy: {
            args: Prisma.BlokGroupByArgs<ExtArgs>
            result: $Utils.Optional<BlokGroupByOutputType>[]
          }
          count: {
            args: Prisma.BlokCountArgs<ExtArgs>
            result: $Utils.Optional<BlokCountAggregateOutputType> | number
          }
        }
      }
      makam: {
        payload: Prisma.$makamPayload<ExtArgs>
        fields: Prisma.makamFieldRefs
        operations: {
          findUnique: {
            args: Prisma.makamFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$makamPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.makamFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$makamPayload>
          }
          findFirst: {
            args: Prisma.makamFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$makamPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.makamFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$makamPayload>
          }
          findMany: {
            args: Prisma.makamFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$makamPayload>[]
          }
          create: {
            args: Prisma.makamCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$makamPayload>
          }
          createMany: {
            args: Prisma.makamCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.makamCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$makamPayload>[]
          }
          delete: {
            args: Prisma.makamDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$makamPayload>
          }
          update: {
            args: Prisma.makamUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$makamPayload>
          }
          deleteMany: {
            args: Prisma.makamDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.makamUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.makamUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$makamPayload>[]
          }
          upsert: {
            args: Prisma.makamUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$makamPayload>
          }
          aggregate: {
            args: Prisma.MakamAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMakam>
          }
          groupBy: {
            args: Prisma.makamGroupByArgs<ExtArgs>
            result: $Utils.Optional<MakamGroupByOutputType>[]
          }
          count: {
            args: Prisma.makamCountArgs<ExtArgs>
            result: $Utils.Optional<MakamCountAggregateOutputType> | number
          }
        }
      }
      makamStatus: {
        payload: Prisma.$makamStatusPayload<ExtArgs>
        fields: Prisma.makamStatusFieldRefs
        operations: {
          findUnique: {
            args: Prisma.makamStatusFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$makamStatusPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.makamStatusFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$makamStatusPayload>
          }
          findFirst: {
            args: Prisma.makamStatusFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$makamStatusPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.makamStatusFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$makamStatusPayload>
          }
          findMany: {
            args: Prisma.makamStatusFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$makamStatusPayload>[]
          }
          create: {
            args: Prisma.makamStatusCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$makamStatusPayload>
          }
          createMany: {
            args: Prisma.makamStatusCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.makamStatusCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$makamStatusPayload>[]
          }
          delete: {
            args: Prisma.makamStatusDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$makamStatusPayload>
          }
          update: {
            args: Prisma.makamStatusUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$makamStatusPayload>
          }
          deleteMany: {
            args: Prisma.makamStatusDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.makamStatusUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.makamStatusUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$makamStatusPayload>[]
          }
          upsert: {
            args: Prisma.makamStatusUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$makamStatusPayload>
          }
          aggregate: {
            args: Prisma.MakamStatusAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMakamStatus>
          }
          groupBy: {
            args: Prisma.makamStatusGroupByArgs<ExtArgs>
            result: $Utils.Optional<MakamStatusGroupByOutputType>[]
          }
          count: {
            args: Prisma.makamStatusCountArgs<ExtArgs>
            result: $Utils.Optional<MakamStatusCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    admin?: AdminOmit
    approver?: ApproverOmit
    pengawas?: PengawasOmit
    user?: UserOmit
    penanggung_Jawab?: Penanggung_JawabOmit
    jenazah?: JenazahOmit
    blok?: BlokOmit
    makam?: makamOmit
    makamStatus?: makamStatusOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    makams: number
    statuses: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    makams?: boolean | UserCountOutputTypeCountMakamsArgs
    statuses?: boolean | UserCountOutputTypeCountStatusesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMakamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: makamWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountStatusesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: makamStatusWhereInput
  }


  /**
   * Count Type Penanggung_JawabCountOutputType
   */

  export type Penanggung_JawabCountOutputType = {
    makams: number
    statuses: number
  }

  export type Penanggung_JawabCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    makams?: boolean | Penanggung_JawabCountOutputTypeCountMakamsArgs
    statuses?: boolean | Penanggung_JawabCountOutputTypeCountStatusesArgs
  }

  // Custom InputTypes
  /**
   * Penanggung_JawabCountOutputType without action
   */
  export type Penanggung_JawabCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penanggung_JawabCountOutputType
     */
    select?: Penanggung_JawabCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Penanggung_JawabCountOutputType without action
   */
  export type Penanggung_JawabCountOutputTypeCountMakamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: makamWhereInput
  }

  /**
   * Penanggung_JawabCountOutputType without action
   */
  export type Penanggung_JawabCountOutputTypeCountStatusesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: makamStatusWhereInput
  }


  /**
   * Count Type JenazahCountOutputType
   */

  export type JenazahCountOutputType = {
    makams: number
    statuses: number
  }

  export type JenazahCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    makams?: boolean | JenazahCountOutputTypeCountMakamsArgs
    statuses?: boolean | JenazahCountOutputTypeCountStatusesArgs
  }

  // Custom InputTypes
  /**
   * JenazahCountOutputType without action
   */
  export type JenazahCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenazahCountOutputType
     */
    select?: JenazahCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * JenazahCountOutputType without action
   */
  export type JenazahCountOutputTypeCountMakamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: makamWhereInput
  }

  /**
   * JenazahCountOutputType without action
   */
  export type JenazahCountOutputTypeCountStatusesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: makamStatusWhereInput
  }


  /**
   * Count Type BlokCountOutputType
   */

  export type BlokCountOutputType = {
    jenazah: number
    makam: number
    makamStatus: number
  }

  export type BlokCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jenazah?: boolean | BlokCountOutputTypeCountJenazahArgs
    makam?: boolean | BlokCountOutputTypeCountMakamArgs
    makamStatus?: boolean | BlokCountOutputTypeCountMakamStatusArgs
  }

  // Custom InputTypes
  /**
   * BlokCountOutputType without action
   */
  export type BlokCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlokCountOutputType
     */
    select?: BlokCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BlokCountOutputType without action
   */
  export type BlokCountOutputTypeCountJenazahArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JenazahWhereInput
  }

  /**
   * BlokCountOutputType without action
   */
  export type BlokCountOutputTypeCountMakamArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: makamWhereInput
  }

  /**
   * BlokCountOutputType without action
   */
  export type BlokCountOutputTypeCountMakamStatusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: makamStatusWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Admin
   */

  export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null
    _avg: AdminAvgAggregateOutputType | null
    _sum: AdminSumAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  export type AdminAvgAggregateOutputType = {
    id: number | null
  }

  export type AdminSumAggregateOutputType = {
    id: number | null
  }

  export type AdminMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    contact: string | null
  }

  export type AdminMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    contact: string | null
  }

  export type AdminCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    contact: number
    _all: number
  }


  export type AdminAvgAggregateInputType = {
    id?: true
  }

  export type AdminSumAggregateInputType = {
    id?: true
  }

  export type AdminMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    contact?: true
  }

  export type AdminMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    contact?: true
  }

  export type AdminCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    contact?: true
    _all?: true
  }

  export type AdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admin to aggregate.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Admins
    **/
    _count?: true | AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdminAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdminSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMaxAggregateInputType
  }

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>
  }




  export type AdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminWhereInput
    orderBy?: AdminOrderByWithAggregationInput | AdminOrderByWithAggregationInput[]
    by: AdminScalarFieldEnum[] | AdminScalarFieldEnum
    having?: AdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminCountAggregateInputType | true
    _avg?: AdminAvgAggregateInputType
    _sum?: AdminSumAggregateInputType
    _min?: AdminMinAggregateInputType
    _max?: AdminMaxAggregateInputType
  }

  export type AdminGroupByOutputType = {
    id: number
    name: string
    email: string
    password: string
    contact: string
    _count: AdminCountAggregateOutputType | null
    _avg: AdminAvgAggregateOutputType | null
    _sum: AdminSumAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  type GetAdminGroupByPayload<T extends AdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminGroupByOutputType[P]>
            : GetScalarType<T[P], AdminGroupByOutputType[P]>
        }
      >
    >


  export type AdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    contact?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    contact?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    contact?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    contact?: boolean
  }

  export type AdminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "contact", ExtArgs["result"]["admin"]>

  export type $AdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Admin"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      password: string
      contact: string
    }, ExtArgs["result"]["admin"]>
    composites: {}
  }

  type AdminGetPayload<S extends boolean | null | undefined | AdminDefaultArgs> = $Result.GetResult<Prisma.$AdminPayload, S>

  type AdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminCountAggregateInputType | true
    }

  export interface AdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Admin'], meta: { name: 'Admin' } }
    /**
     * Find zero or one Admin that matches the filter.
     * @param {AdminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminFindUniqueArgs>(args: SelectSubset<T, AdminFindUniqueArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Admin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminFindUniqueOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminFindFirstArgs>(args?: SelectSubset<T, AdminFindFirstArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminWithIdOnly = await prisma.admin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminFindManyArgs>(args?: SelectSubset<T, AdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Admin.
     * @param {AdminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     * 
     */
    create<T extends AdminCreateArgs>(args: SelectSubset<T, AdminCreateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Admins.
     * @param {AdminCreateManyArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminCreateManyArgs>(args?: SelectSubset<T, AdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Admins and returns the data saved in the database.
     * @param {AdminCreateManyAndReturnArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Admin.
     * @param {AdminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     * 
     */
    delete<T extends AdminDeleteArgs>(args: SelectSubset<T, AdminDeleteArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Admin.
     * @param {AdminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUpdateArgs>(args: SelectSubset<T, AdminUpdateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Admins.
     * @param {AdminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminDeleteManyArgs>(args?: SelectSubset<T, AdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUpdateManyArgs>(args: SelectSubset<T, AdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins and returns the data updated in the database.
     * @param {AdminUpdateManyAndReturnArgs} args - Arguments to update many Admins.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdminUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Admin.
     * @param {AdminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
     */
    upsert<T extends AdminUpsertArgs>(args: SelectSubset<T, AdminUpsertArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends AdminCountArgs>(
      args?: Subset<T, AdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminAggregateArgs>(args: Subset<T, AdminAggregateArgs>): Prisma.PrismaPromise<GetAdminAggregateType<T>>

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminGroupByArgs['orderBy'] }
        : { orderBy?: AdminGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Admin model
   */
  readonly fields: AdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Admin model
   */
  interface AdminFieldRefs {
    readonly id: FieldRef<"Admin", 'Int'>
    readonly name: FieldRef<"Admin", 'String'>
    readonly email: FieldRef<"Admin", 'String'>
    readonly password: FieldRef<"Admin", 'String'>
    readonly contact: FieldRef<"Admin", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Admin findUnique
   */
  export type AdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findUniqueOrThrow
   */
  export type AdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findFirst
   */
  export type AdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findFirstOrThrow
   */
  export type AdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findMany
   */
  export type AdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admins to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin create
   */
  export type AdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data needed to create a Admin.
     */
    data: XOR<AdminCreateInput, AdminUncheckedCreateInput>
  }

  /**
   * Admin createMany
   */
  export type AdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin createManyAndReturn
   */
  export type AdminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin update
   */
  export type AdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data needed to update a Admin.
     */
    data: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
    /**
     * Choose, which Admin to update.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin updateMany
   */
  export type AdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin updateManyAndReturn
   */
  export type AdminUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin upsert
   */
  export type AdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The filter to search for the Admin to update in case it exists.
     */
    where: AdminWhereUniqueInput
    /**
     * In case the Admin found by the `where` argument doesn't exist, create a new Admin with this data.
     */
    create: XOR<AdminCreateInput, AdminUncheckedCreateInput>
    /**
     * In case the Admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
  }

  /**
   * Admin delete
   */
  export type AdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter which Admin to delete.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin deleteMany
   */
  export type AdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admins to delete
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to delete.
     */
    limit?: number
  }

  /**
   * Admin without action
   */
  export type AdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
  }


  /**
   * Model Approver
   */

  export type AggregateApprover = {
    _count: ApproverCountAggregateOutputType | null
    _avg: ApproverAvgAggregateOutputType | null
    _sum: ApproverSumAggregateOutputType | null
    _min: ApproverMinAggregateOutputType | null
    _max: ApproverMaxAggregateOutputType | null
  }

  export type ApproverAvgAggregateOutputType = {
    id: number | null
  }

  export type ApproverSumAggregateOutputType = {
    id: number | null
  }

  export type ApproverMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
  }

  export type ApproverMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
  }

  export type ApproverCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    _all: number
  }


  export type ApproverAvgAggregateInputType = {
    id?: true
  }

  export type ApproverSumAggregateInputType = {
    id?: true
  }

  export type ApproverMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
  }

  export type ApproverMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
  }

  export type ApproverCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    _all?: true
  }

  export type ApproverAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Approver to aggregate.
     */
    where?: ApproverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Approvers to fetch.
     */
    orderBy?: ApproverOrderByWithRelationInput | ApproverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApproverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Approvers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Approvers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Approvers
    **/
    _count?: true | ApproverCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ApproverAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ApproverSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApproverMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApproverMaxAggregateInputType
  }

  export type GetApproverAggregateType<T extends ApproverAggregateArgs> = {
        [P in keyof T & keyof AggregateApprover]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApprover[P]>
      : GetScalarType<T[P], AggregateApprover[P]>
  }




  export type ApproverGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApproverWhereInput
    orderBy?: ApproverOrderByWithAggregationInput | ApproverOrderByWithAggregationInput[]
    by: ApproverScalarFieldEnum[] | ApproverScalarFieldEnum
    having?: ApproverScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApproverCountAggregateInputType | true
    _avg?: ApproverAvgAggregateInputType
    _sum?: ApproverSumAggregateInputType
    _min?: ApproverMinAggregateInputType
    _max?: ApproverMaxAggregateInputType
  }

  export type ApproverGroupByOutputType = {
    id: number
    name: string
    email: string
    password: string
    _count: ApproverCountAggregateOutputType | null
    _avg: ApproverAvgAggregateOutputType | null
    _sum: ApproverSumAggregateOutputType | null
    _min: ApproverMinAggregateOutputType | null
    _max: ApproverMaxAggregateOutputType | null
  }

  type GetApproverGroupByPayload<T extends ApproverGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApproverGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApproverGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApproverGroupByOutputType[P]>
            : GetScalarType<T[P], ApproverGroupByOutputType[P]>
        }
      >
    >


  export type ApproverSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
  }, ExtArgs["result"]["approver"]>

  export type ApproverSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
  }, ExtArgs["result"]["approver"]>

  export type ApproverSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
  }, ExtArgs["result"]["approver"]>

  export type ApproverSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
  }

  export type ApproverOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password", ExtArgs["result"]["approver"]>

  export type $ApproverPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Approver"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      password: string
    }, ExtArgs["result"]["approver"]>
    composites: {}
  }

  type ApproverGetPayload<S extends boolean | null | undefined | ApproverDefaultArgs> = $Result.GetResult<Prisma.$ApproverPayload, S>

  type ApproverCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApproverFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApproverCountAggregateInputType | true
    }

  export interface ApproverDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Approver'], meta: { name: 'Approver' } }
    /**
     * Find zero or one Approver that matches the filter.
     * @param {ApproverFindUniqueArgs} args - Arguments to find a Approver
     * @example
     * // Get one Approver
     * const approver = await prisma.approver.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApproverFindUniqueArgs>(args: SelectSubset<T, ApproverFindUniqueArgs<ExtArgs>>): Prisma__ApproverClient<$Result.GetResult<Prisma.$ApproverPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Approver that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApproverFindUniqueOrThrowArgs} args - Arguments to find a Approver
     * @example
     * // Get one Approver
     * const approver = await prisma.approver.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApproverFindUniqueOrThrowArgs>(args: SelectSubset<T, ApproverFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApproverClient<$Result.GetResult<Prisma.$ApproverPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Approver that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApproverFindFirstArgs} args - Arguments to find a Approver
     * @example
     * // Get one Approver
     * const approver = await prisma.approver.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApproverFindFirstArgs>(args?: SelectSubset<T, ApproverFindFirstArgs<ExtArgs>>): Prisma__ApproverClient<$Result.GetResult<Prisma.$ApproverPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Approver that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApproverFindFirstOrThrowArgs} args - Arguments to find a Approver
     * @example
     * // Get one Approver
     * const approver = await prisma.approver.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApproverFindFirstOrThrowArgs>(args?: SelectSubset<T, ApproverFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApproverClient<$Result.GetResult<Prisma.$ApproverPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Approvers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApproverFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Approvers
     * const approvers = await prisma.approver.findMany()
     * 
     * // Get first 10 Approvers
     * const approvers = await prisma.approver.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const approverWithIdOnly = await prisma.approver.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApproverFindManyArgs>(args?: SelectSubset<T, ApproverFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApproverPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Approver.
     * @param {ApproverCreateArgs} args - Arguments to create a Approver.
     * @example
     * // Create one Approver
     * const Approver = await prisma.approver.create({
     *   data: {
     *     // ... data to create a Approver
     *   }
     * })
     * 
     */
    create<T extends ApproverCreateArgs>(args: SelectSubset<T, ApproverCreateArgs<ExtArgs>>): Prisma__ApproverClient<$Result.GetResult<Prisma.$ApproverPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Approvers.
     * @param {ApproverCreateManyArgs} args - Arguments to create many Approvers.
     * @example
     * // Create many Approvers
     * const approver = await prisma.approver.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApproverCreateManyArgs>(args?: SelectSubset<T, ApproverCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Approvers and returns the data saved in the database.
     * @param {ApproverCreateManyAndReturnArgs} args - Arguments to create many Approvers.
     * @example
     * // Create many Approvers
     * const approver = await prisma.approver.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Approvers and only return the `id`
     * const approverWithIdOnly = await prisma.approver.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApproverCreateManyAndReturnArgs>(args?: SelectSubset<T, ApproverCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApproverPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Approver.
     * @param {ApproverDeleteArgs} args - Arguments to delete one Approver.
     * @example
     * // Delete one Approver
     * const Approver = await prisma.approver.delete({
     *   where: {
     *     // ... filter to delete one Approver
     *   }
     * })
     * 
     */
    delete<T extends ApproverDeleteArgs>(args: SelectSubset<T, ApproverDeleteArgs<ExtArgs>>): Prisma__ApproverClient<$Result.GetResult<Prisma.$ApproverPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Approver.
     * @param {ApproverUpdateArgs} args - Arguments to update one Approver.
     * @example
     * // Update one Approver
     * const approver = await prisma.approver.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApproverUpdateArgs>(args: SelectSubset<T, ApproverUpdateArgs<ExtArgs>>): Prisma__ApproverClient<$Result.GetResult<Prisma.$ApproverPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Approvers.
     * @param {ApproverDeleteManyArgs} args - Arguments to filter Approvers to delete.
     * @example
     * // Delete a few Approvers
     * const { count } = await prisma.approver.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApproverDeleteManyArgs>(args?: SelectSubset<T, ApproverDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Approvers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApproverUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Approvers
     * const approver = await prisma.approver.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApproverUpdateManyArgs>(args: SelectSubset<T, ApproverUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Approvers and returns the data updated in the database.
     * @param {ApproverUpdateManyAndReturnArgs} args - Arguments to update many Approvers.
     * @example
     * // Update many Approvers
     * const approver = await prisma.approver.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Approvers and only return the `id`
     * const approverWithIdOnly = await prisma.approver.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ApproverUpdateManyAndReturnArgs>(args: SelectSubset<T, ApproverUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApproverPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Approver.
     * @param {ApproverUpsertArgs} args - Arguments to update or create a Approver.
     * @example
     * // Update or create a Approver
     * const approver = await prisma.approver.upsert({
     *   create: {
     *     // ... data to create a Approver
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Approver we want to update
     *   }
     * })
     */
    upsert<T extends ApproverUpsertArgs>(args: SelectSubset<T, ApproverUpsertArgs<ExtArgs>>): Prisma__ApproverClient<$Result.GetResult<Prisma.$ApproverPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Approvers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApproverCountArgs} args - Arguments to filter Approvers to count.
     * @example
     * // Count the number of Approvers
     * const count = await prisma.approver.count({
     *   where: {
     *     // ... the filter for the Approvers we want to count
     *   }
     * })
    **/
    count<T extends ApproverCountArgs>(
      args?: Subset<T, ApproverCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApproverCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Approver.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApproverAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ApproverAggregateArgs>(args: Subset<T, ApproverAggregateArgs>): Prisma.PrismaPromise<GetApproverAggregateType<T>>

    /**
     * Group by Approver.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApproverGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ApproverGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApproverGroupByArgs['orderBy'] }
        : { orderBy?: ApproverGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ApproverGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApproverGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Approver model
   */
  readonly fields: ApproverFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Approver.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApproverClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Approver model
   */
  interface ApproverFieldRefs {
    readonly id: FieldRef<"Approver", 'Int'>
    readonly name: FieldRef<"Approver", 'String'>
    readonly email: FieldRef<"Approver", 'String'>
    readonly password: FieldRef<"Approver", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Approver findUnique
   */
  export type ApproverFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approver
     */
    select?: ApproverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approver
     */
    omit?: ApproverOmit<ExtArgs> | null
    /**
     * Filter, which Approver to fetch.
     */
    where: ApproverWhereUniqueInput
  }

  /**
   * Approver findUniqueOrThrow
   */
  export type ApproverFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approver
     */
    select?: ApproverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approver
     */
    omit?: ApproverOmit<ExtArgs> | null
    /**
     * Filter, which Approver to fetch.
     */
    where: ApproverWhereUniqueInput
  }

  /**
   * Approver findFirst
   */
  export type ApproverFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approver
     */
    select?: ApproverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approver
     */
    omit?: ApproverOmit<ExtArgs> | null
    /**
     * Filter, which Approver to fetch.
     */
    where?: ApproverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Approvers to fetch.
     */
    orderBy?: ApproverOrderByWithRelationInput | ApproverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Approvers.
     */
    cursor?: ApproverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Approvers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Approvers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Approvers.
     */
    distinct?: ApproverScalarFieldEnum | ApproverScalarFieldEnum[]
  }

  /**
   * Approver findFirstOrThrow
   */
  export type ApproverFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approver
     */
    select?: ApproverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approver
     */
    omit?: ApproverOmit<ExtArgs> | null
    /**
     * Filter, which Approver to fetch.
     */
    where?: ApproverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Approvers to fetch.
     */
    orderBy?: ApproverOrderByWithRelationInput | ApproverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Approvers.
     */
    cursor?: ApproverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Approvers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Approvers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Approvers.
     */
    distinct?: ApproverScalarFieldEnum | ApproverScalarFieldEnum[]
  }

  /**
   * Approver findMany
   */
  export type ApproverFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approver
     */
    select?: ApproverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approver
     */
    omit?: ApproverOmit<ExtArgs> | null
    /**
     * Filter, which Approvers to fetch.
     */
    where?: ApproverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Approvers to fetch.
     */
    orderBy?: ApproverOrderByWithRelationInput | ApproverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Approvers.
     */
    cursor?: ApproverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Approvers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Approvers.
     */
    skip?: number
    distinct?: ApproverScalarFieldEnum | ApproverScalarFieldEnum[]
  }

  /**
   * Approver create
   */
  export type ApproverCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approver
     */
    select?: ApproverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approver
     */
    omit?: ApproverOmit<ExtArgs> | null
    /**
     * The data needed to create a Approver.
     */
    data: XOR<ApproverCreateInput, ApproverUncheckedCreateInput>
  }

  /**
   * Approver createMany
   */
  export type ApproverCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Approvers.
     */
    data: ApproverCreateManyInput | ApproverCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Approver createManyAndReturn
   */
  export type ApproverCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approver
     */
    select?: ApproverSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Approver
     */
    omit?: ApproverOmit<ExtArgs> | null
    /**
     * The data used to create many Approvers.
     */
    data: ApproverCreateManyInput | ApproverCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Approver update
   */
  export type ApproverUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approver
     */
    select?: ApproverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approver
     */
    omit?: ApproverOmit<ExtArgs> | null
    /**
     * The data needed to update a Approver.
     */
    data: XOR<ApproverUpdateInput, ApproverUncheckedUpdateInput>
    /**
     * Choose, which Approver to update.
     */
    where: ApproverWhereUniqueInput
  }

  /**
   * Approver updateMany
   */
  export type ApproverUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Approvers.
     */
    data: XOR<ApproverUpdateManyMutationInput, ApproverUncheckedUpdateManyInput>
    /**
     * Filter which Approvers to update
     */
    where?: ApproverWhereInput
    /**
     * Limit how many Approvers to update.
     */
    limit?: number
  }

  /**
   * Approver updateManyAndReturn
   */
  export type ApproverUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approver
     */
    select?: ApproverSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Approver
     */
    omit?: ApproverOmit<ExtArgs> | null
    /**
     * The data used to update Approvers.
     */
    data: XOR<ApproverUpdateManyMutationInput, ApproverUncheckedUpdateManyInput>
    /**
     * Filter which Approvers to update
     */
    where?: ApproverWhereInput
    /**
     * Limit how many Approvers to update.
     */
    limit?: number
  }

  /**
   * Approver upsert
   */
  export type ApproverUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approver
     */
    select?: ApproverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approver
     */
    omit?: ApproverOmit<ExtArgs> | null
    /**
     * The filter to search for the Approver to update in case it exists.
     */
    where: ApproverWhereUniqueInput
    /**
     * In case the Approver found by the `where` argument doesn't exist, create a new Approver with this data.
     */
    create: XOR<ApproverCreateInput, ApproverUncheckedCreateInput>
    /**
     * In case the Approver was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApproverUpdateInput, ApproverUncheckedUpdateInput>
  }

  /**
   * Approver delete
   */
  export type ApproverDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approver
     */
    select?: ApproverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approver
     */
    omit?: ApproverOmit<ExtArgs> | null
    /**
     * Filter which Approver to delete.
     */
    where: ApproverWhereUniqueInput
  }

  /**
   * Approver deleteMany
   */
  export type ApproverDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Approvers to delete
     */
    where?: ApproverWhereInput
    /**
     * Limit how many Approvers to delete.
     */
    limit?: number
  }

  /**
   * Approver without action
   */
  export type ApproverDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approver
     */
    select?: ApproverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approver
     */
    omit?: ApproverOmit<ExtArgs> | null
  }


  /**
   * Model Pengawas
   */

  export type AggregatePengawas = {
    _count: PengawasCountAggregateOutputType | null
    _avg: PengawasAvgAggregateOutputType | null
    _sum: PengawasSumAggregateOutputType | null
    _min: PengawasMinAggregateOutputType | null
    _max: PengawasMaxAggregateOutputType | null
  }

  export type PengawasAvgAggregateOutputType = {
    id: number | null
  }

  export type PengawasSumAggregateOutputType = {
    id: number | null
  }

  export type PengawasMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
  }

  export type PengawasMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
  }

  export type PengawasCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    _all: number
  }


  export type PengawasAvgAggregateInputType = {
    id?: true
  }

  export type PengawasSumAggregateInputType = {
    id?: true
  }

  export type PengawasMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
  }

  export type PengawasMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
  }

  export type PengawasCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    _all?: true
  }

  export type PengawasAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pengawas to aggregate.
     */
    where?: PengawasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pengawas to fetch.
     */
    orderBy?: PengawasOrderByWithRelationInput | PengawasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PengawasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pengawas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pengawas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pengawas
    **/
    _count?: true | PengawasCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PengawasAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PengawasSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PengawasMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PengawasMaxAggregateInputType
  }

  export type GetPengawasAggregateType<T extends PengawasAggregateArgs> = {
        [P in keyof T & keyof AggregatePengawas]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePengawas[P]>
      : GetScalarType<T[P], AggregatePengawas[P]>
  }




  export type PengawasGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PengawasWhereInput
    orderBy?: PengawasOrderByWithAggregationInput | PengawasOrderByWithAggregationInput[]
    by: PengawasScalarFieldEnum[] | PengawasScalarFieldEnum
    having?: PengawasScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PengawasCountAggregateInputType | true
    _avg?: PengawasAvgAggregateInputType
    _sum?: PengawasSumAggregateInputType
    _min?: PengawasMinAggregateInputType
    _max?: PengawasMaxAggregateInputType
  }

  export type PengawasGroupByOutputType = {
    id: number
    name: string
    email: string
    password: string
    _count: PengawasCountAggregateOutputType | null
    _avg: PengawasAvgAggregateOutputType | null
    _sum: PengawasSumAggregateOutputType | null
    _min: PengawasMinAggregateOutputType | null
    _max: PengawasMaxAggregateOutputType | null
  }

  type GetPengawasGroupByPayload<T extends PengawasGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PengawasGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PengawasGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PengawasGroupByOutputType[P]>
            : GetScalarType<T[P], PengawasGroupByOutputType[P]>
        }
      >
    >


  export type PengawasSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
  }, ExtArgs["result"]["pengawas"]>

  export type PengawasSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
  }, ExtArgs["result"]["pengawas"]>

  export type PengawasSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
  }, ExtArgs["result"]["pengawas"]>

  export type PengawasSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
  }

  export type PengawasOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password", ExtArgs["result"]["pengawas"]>

  export type $PengawasPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pengawas"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      password: string
    }, ExtArgs["result"]["pengawas"]>
    composites: {}
  }

  type PengawasGetPayload<S extends boolean | null | undefined | PengawasDefaultArgs> = $Result.GetResult<Prisma.$PengawasPayload, S>

  type PengawasCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PengawasFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PengawasCountAggregateInputType | true
    }

  export interface PengawasDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pengawas'], meta: { name: 'Pengawas' } }
    /**
     * Find zero or one Pengawas that matches the filter.
     * @param {PengawasFindUniqueArgs} args - Arguments to find a Pengawas
     * @example
     * // Get one Pengawas
     * const pengawas = await prisma.pengawas.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PengawasFindUniqueArgs>(args: SelectSubset<T, PengawasFindUniqueArgs<ExtArgs>>): Prisma__PengawasClient<$Result.GetResult<Prisma.$PengawasPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pengawas that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PengawasFindUniqueOrThrowArgs} args - Arguments to find a Pengawas
     * @example
     * // Get one Pengawas
     * const pengawas = await prisma.pengawas.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PengawasFindUniqueOrThrowArgs>(args: SelectSubset<T, PengawasFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PengawasClient<$Result.GetResult<Prisma.$PengawasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pengawas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PengawasFindFirstArgs} args - Arguments to find a Pengawas
     * @example
     * // Get one Pengawas
     * const pengawas = await prisma.pengawas.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PengawasFindFirstArgs>(args?: SelectSubset<T, PengawasFindFirstArgs<ExtArgs>>): Prisma__PengawasClient<$Result.GetResult<Prisma.$PengawasPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pengawas that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PengawasFindFirstOrThrowArgs} args - Arguments to find a Pengawas
     * @example
     * // Get one Pengawas
     * const pengawas = await prisma.pengawas.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PengawasFindFirstOrThrowArgs>(args?: SelectSubset<T, PengawasFindFirstOrThrowArgs<ExtArgs>>): Prisma__PengawasClient<$Result.GetResult<Prisma.$PengawasPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pengawas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PengawasFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pengawas
     * const pengawas = await prisma.pengawas.findMany()
     * 
     * // Get first 10 Pengawas
     * const pengawas = await prisma.pengawas.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pengawasWithIdOnly = await prisma.pengawas.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PengawasFindManyArgs>(args?: SelectSubset<T, PengawasFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PengawasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pengawas.
     * @param {PengawasCreateArgs} args - Arguments to create a Pengawas.
     * @example
     * // Create one Pengawas
     * const Pengawas = await prisma.pengawas.create({
     *   data: {
     *     // ... data to create a Pengawas
     *   }
     * })
     * 
     */
    create<T extends PengawasCreateArgs>(args: SelectSubset<T, PengawasCreateArgs<ExtArgs>>): Prisma__PengawasClient<$Result.GetResult<Prisma.$PengawasPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pengawas.
     * @param {PengawasCreateManyArgs} args - Arguments to create many Pengawas.
     * @example
     * // Create many Pengawas
     * const pengawas = await prisma.pengawas.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PengawasCreateManyArgs>(args?: SelectSubset<T, PengawasCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pengawas and returns the data saved in the database.
     * @param {PengawasCreateManyAndReturnArgs} args - Arguments to create many Pengawas.
     * @example
     * // Create many Pengawas
     * const pengawas = await prisma.pengawas.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pengawas and only return the `id`
     * const pengawasWithIdOnly = await prisma.pengawas.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PengawasCreateManyAndReturnArgs>(args?: SelectSubset<T, PengawasCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PengawasPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pengawas.
     * @param {PengawasDeleteArgs} args - Arguments to delete one Pengawas.
     * @example
     * // Delete one Pengawas
     * const Pengawas = await prisma.pengawas.delete({
     *   where: {
     *     // ... filter to delete one Pengawas
     *   }
     * })
     * 
     */
    delete<T extends PengawasDeleteArgs>(args: SelectSubset<T, PengawasDeleteArgs<ExtArgs>>): Prisma__PengawasClient<$Result.GetResult<Prisma.$PengawasPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pengawas.
     * @param {PengawasUpdateArgs} args - Arguments to update one Pengawas.
     * @example
     * // Update one Pengawas
     * const pengawas = await prisma.pengawas.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PengawasUpdateArgs>(args: SelectSubset<T, PengawasUpdateArgs<ExtArgs>>): Prisma__PengawasClient<$Result.GetResult<Prisma.$PengawasPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pengawas.
     * @param {PengawasDeleteManyArgs} args - Arguments to filter Pengawas to delete.
     * @example
     * // Delete a few Pengawas
     * const { count } = await prisma.pengawas.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PengawasDeleteManyArgs>(args?: SelectSubset<T, PengawasDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pengawas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PengawasUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pengawas
     * const pengawas = await prisma.pengawas.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PengawasUpdateManyArgs>(args: SelectSubset<T, PengawasUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pengawas and returns the data updated in the database.
     * @param {PengawasUpdateManyAndReturnArgs} args - Arguments to update many Pengawas.
     * @example
     * // Update many Pengawas
     * const pengawas = await prisma.pengawas.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pengawas and only return the `id`
     * const pengawasWithIdOnly = await prisma.pengawas.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PengawasUpdateManyAndReturnArgs>(args: SelectSubset<T, PengawasUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PengawasPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pengawas.
     * @param {PengawasUpsertArgs} args - Arguments to update or create a Pengawas.
     * @example
     * // Update or create a Pengawas
     * const pengawas = await prisma.pengawas.upsert({
     *   create: {
     *     // ... data to create a Pengawas
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pengawas we want to update
     *   }
     * })
     */
    upsert<T extends PengawasUpsertArgs>(args: SelectSubset<T, PengawasUpsertArgs<ExtArgs>>): Prisma__PengawasClient<$Result.GetResult<Prisma.$PengawasPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pengawas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PengawasCountArgs} args - Arguments to filter Pengawas to count.
     * @example
     * // Count the number of Pengawas
     * const count = await prisma.pengawas.count({
     *   where: {
     *     // ... the filter for the Pengawas we want to count
     *   }
     * })
    **/
    count<T extends PengawasCountArgs>(
      args?: Subset<T, PengawasCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PengawasCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pengawas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PengawasAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PengawasAggregateArgs>(args: Subset<T, PengawasAggregateArgs>): Prisma.PrismaPromise<GetPengawasAggregateType<T>>

    /**
     * Group by Pengawas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PengawasGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PengawasGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PengawasGroupByArgs['orderBy'] }
        : { orderBy?: PengawasGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PengawasGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPengawasGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pengawas model
   */
  readonly fields: PengawasFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pengawas.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PengawasClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pengawas model
   */
  interface PengawasFieldRefs {
    readonly id: FieldRef<"Pengawas", 'Int'>
    readonly name: FieldRef<"Pengawas", 'String'>
    readonly email: FieldRef<"Pengawas", 'String'>
    readonly password: FieldRef<"Pengawas", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Pengawas findUnique
   */
  export type PengawasFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pengawas
     */
    select?: PengawasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pengawas
     */
    omit?: PengawasOmit<ExtArgs> | null
    /**
     * Filter, which Pengawas to fetch.
     */
    where: PengawasWhereUniqueInput
  }

  /**
   * Pengawas findUniqueOrThrow
   */
  export type PengawasFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pengawas
     */
    select?: PengawasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pengawas
     */
    omit?: PengawasOmit<ExtArgs> | null
    /**
     * Filter, which Pengawas to fetch.
     */
    where: PengawasWhereUniqueInput
  }

  /**
   * Pengawas findFirst
   */
  export type PengawasFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pengawas
     */
    select?: PengawasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pengawas
     */
    omit?: PengawasOmit<ExtArgs> | null
    /**
     * Filter, which Pengawas to fetch.
     */
    where?: PengawasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pengawas to fetch.
     */
    orderBy?: PengawasOrderByWithRelationInput | PengawasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pengawas.
     */
    cursor?: PengawasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pengawas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pengawas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pengawas.
     */
    distinct?: PengawasScalarFieldEnum | PengawasScalarFieldEnum[]
  }

  /**
   * Pengawas findFirstOrThrow
   */
  export type PengawasFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pengawas
     */
    select?: PengawasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pengawas
     */
    omit?: PengawasOmit<ExtArgs> | null
    /**
     * Filter, which Pengawas to fetch.
     */
    where?: PengawasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pengawas to fetch.
     */
    orderBy?: PengawasOrderByWithRelationInput | PengawasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pengawas.
     */
    cursor?: PengawasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pengawas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pengawas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pengawas.
     */
    distinct?: PengawasScalarFieldEnum | PengawasScalarFieldEnum[]
  }

  /**
   * Pengawas findMany
   */
  export type PengawasFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pengawas
     */
    select?: PengawasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pengawas
     */
    omit?: PengawasOmit<ExtArgs> | null
    /**
     * Filter, which Pengawas to fetch.
     */
    where?: PengawasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pengawas to fetch.
     */
    orderBy?: PengawasOrderByWithRelationInput | PengawasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pengawas.
     */
    cursor?: PengawasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pengawas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pengawas.
     */
    skip?: number
    distinct?: PengawasScalarFieldEnum | PengawasScalarFieldEnum[]
  }

  /**
   * Pengawas create
   */
  export type PengawasCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pengawas
     */
    select?: PengawasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pengawas
     */
    omit?: PengawasOmit<ExtArgs> | null
    /**
     * The data needed to create a Pengawas.
     */
    data: XOR<PengawasCreateInput, PengawasUncheckedCreateInput>
  }

  /**
   * Pengawas createMany
   */
  export type PengawasCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pengawas.
     */
    data: PengawasCreateManyInput | PengawasCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pengawas createManyAndReturn
   */
  export type PengawasCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pengawas
     */
    select?: PengawasSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pengawas
     */
    omit?: PengawasOmit<ExtArgs> | null
    /**
     * The data used to create many Pengawas.
     */
    data: PengawasCreateManyInput | PengawasCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pengawas update
   */
  export type PengawasUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pengawas
     */
    select?: PengawasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pengawas
     */
    omit?: PengawasOmit<ExtArgs> | null
    /**
     * The data needed to update a Pengawas.
     */
    data: XOR<PengawasUpdateInput, PengawasUncheckedUpdateInput>
    /**
     * Choose, which Pengawas to update.
     */
    where: PengawasWhereUniqueInput
  }

  /**
   * Pengawas updateMany
   */
  export type PengawasUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pengawas.
     */
    data: XOR<PengawasUpdateManyMutationInput, PengawasUncheckedUpdateManyInput>
    /**
     * Filter which Pengawas to update
     */
    where?: PengawasWhereInput
    /**
     * Limit how many Pengawas to update.
     */
    limit?: number
  }

  /**
   * Pengawas updateManyAndReturn
   */
  export type PengawasUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pengawas
     */
    select?: PengawasSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pengawas
     */
    omit?: PengawasOmit<ExtArgs> | null
    /**
     * The data used to update Pengawas.
     */
    data: XOR<PengawasUpdateManyMutationInput, PengawasUncheckedUpdateManyInput>
    /**
     * Filter which Pengawas to update
     */
    where?: PengawasWhereInput
    /**
     * Limit how many Pengawas to update.
     */
    limit?: number
  }

  /**
   * Pengawas upsert
   */
  export type PengawasUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pengawas
     */
    select?: PengawasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pengawas
     */
    omit?: PengawasOmit<ExtArgs> | null
    /**
     * The filter to search for the Pengawas to update in case it exists.
     */
    where: PengawasWhereUniqueInput
    /**
     * In case the Pengawas found by the `where` argument doesn't exist, create a new Pengawas with this data.
     */
    create: XOR<PengawasCreateInput, PengawasUncheckedCreateInput>
    /**
     * In case the Pengawas was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PengawasUpdateInput, PengawasUncheckedUpdateInput>
  }

  /**
   * Pengawas delete
   */
  export type PengawasDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pengawas
     */
    select?: PengawasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pengawas
     */
    omit?: PengawasOmit<ExtArgs> | null
    /**
     * Filter which Pengawas to delete.
     */
    where: PengawasWhereUniqueInput
  }

  /**
   * Pengawas deleteMany
   */
  export type PengawasDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pengawas to delete
     */
    where?: PengawasWhereInput
    /**
     * Limit how many Pengawas to delete.
     */
    limit?: number
  }

  /**
   * Pengawas without action
   */
  export type PengawasDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pengawas
     */
    select?: PengawasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pengawas
     */
    omit?: PengawasOmit<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    contact: string | null
    email: string | null
    status: string | null
    ktp_num: string | null
    emergency_name: string | null
    emergency_contact: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    contact: string | null
    email: string | null
    status: string | null
    ktp_num: string | null
    emergency_name: string | null
    emergency_contact: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    contact: number
    email: number
    status: number
    ktp_num: number
    emergency_name: number
    emergency_contact: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    contact?: true
    email?: true
    status?: true
    ktp_num?: true
    emergency_name?: true
    emergency_contact?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    contact?: true
    email?: true
    status?: true
    ktp_num?: true
    emergency_name?: true
    emergency_contact?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    contact?: true
    email?: true
    status?: true
    ktp_num?: true
    emergency_name?: true
    emergency_contact?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    contact: string | null
    email: string | null
    status: string | null
    ktp_num: string | null
    emergency_name: string | null
    emergency_contact: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    contact?: boolean
    email?: boolean
    status?: boolean
    ktp_num?: boolean
    emergency_name?: boolean
    emergency_contact?: boolean
    makams?: boolean | User$makamsArgs<ExtArgs>
    statuses?: boolean | User$statusesArgs<ExtArgs>
    jenazah?: boolean | User$jenazahArgs<ExtArgs>
    penanggung_jawab?: boolean | User$penanggung_jawabArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    contact?: boolean
    email?: boolean
    status?: boolean
    ktp_num?: boolean
    emergency_name?: boolean
    emergency_contact?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    contact?: boolean
    email?: boolean
    status?: boolean
    ktp_num?: boolean
    emergency_name?: boolean
    emergency_contact?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    contact?: boolean
    email?: boolean
    status?: boolean
    ktp_num?: boolean
    emergency_name?: boolean
    emergency_contact?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "contact" | "email" | "status" | "ktp_num" | "emergency_name" | "emergency_contact", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    makams?: boolean | User$makamsArgs<ExtArgs>
    statuses?: boolean | User$statusesArgs<ExtArgs>
    jenazah?: boolean | User$jenazahArgs<ExtArgs>
    penanggung_jawab?: boolean | User$penanggung_jawabArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      makams: Prisma.$makamPayload<ExtArgs>[]
      statuses: Prisma.$makamStatusPayload<ExtArgs>[]
      jenazah: Prisma.$JenazahPayload<ExtArgs> | null
      penanggung_jawab: Prisma.$Penanggung_JawabPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      contact: string | null
      email: string | null
      status: string | null
      ktp_num: string | null
      emergency_name: string | null
      emergency_contact: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    makams<T extends User$makamsArgs<ExtArgs> = {}>(args?: Subset<T, User$makamsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$makamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    statuses<T extends User$statusesArgs<ExtArgs> = {}>(args?: Subset<T, User$statusesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$makamStatusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    jenazah<T extends User$jenazahArgs<ExtArgs> = {}>(args?: Subset<T, User$jenazahArgs<ExtArgs>>): Prisma__JenazahClient<$Result.GetResult<Prisma.$JenazahPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    penanggung_jawab<T extends User$penanggung_jawabArgs<ExtArgs> = {}>(args?: Subset<T, User$penanggung_jawabArgs<ExtArgs>>): Prisma__Penanggung_JawabClient<$Result.GetResult<Prisma.$Penanggung_JawabPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly contact: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly status: FieldRef<"User", 'String'>
    readonly ktp_num: FieldRef<"User", 'String'>
    readonly emergency_name: FieldRef<"User", 'String'>
    readonly emergency_contact: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.makams
   */
  export type User$makamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makam
     */
    select?: makamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the makam
     */
    omit?: makamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamInclude<ExtArgs> | null
    where?: makamWhereInput
    orderBy?: makamOrderByWithRelationInput | makamOrderByWithRelationInput[]
    cursor?: makamWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MakamScalarFieldEnum | MakamScalarFieldEnum[]
  }

  /**
   * User.statuses
   */
  export type User$statusesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makamStatus
     */
    select?: makamStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the makamStatus
     */
    omit?: makamStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamStatusInclude<ExtArgs> | null
    where?: makamStatusWhereInput
    orderBy?: makamStatusOrderByWithRelationInput | makamStatusOrderByWithRelationInput[]
    cursor?: makamStatusWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MakamStatusScalarFieldEnum | MakamStatusScalarFieldEnum[]
  }

  /**
   * User.jenazah
   */
  export type User$jenazahArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jenazah
     */
    select?: JenazahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jenazah
     */
    omit?: JenazahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenazahInclude<ExtArgs> | null
    where?: JenazahWhereInput
  }

  /**
   * User.penanggung_jawab
   */
  export type User$penanggung_jawabArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penanggung_Jawab
     */
    select?: Penanggung_JawabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penanggung_Jawab
     */
    omit?: Penanggung_JawabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Penanggung_JawabInclude<ExtArgs> | null
    where?: Penanggung_JawabWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Penanggung_Jawab
   */

  export type AggregatePenanggung_Jawab = {
    _count: Penanggung_JawabCountAggregateOutputType | null
    _min: Penanggung_JawabMinAggregateOutputType | null
    _max: Penanggung_JawabMaxAggregateOutputType | null
  }

  export type Penanggung_JawabMinAggregateOutputType = {
    id_penanggung_jawab: string | null
    id_user: string | null
  }

  export type Penanggung_JawabMaxAggregateOutputType = {
    id_penanggung_jawab: string | null
    id_user: string | null
  }

  export type Penanggung_JawabCountAggregateOutputType = {
    id_penanggung_jawab: number
    id_user: number
    _all: number
  }


  export type Penanggung_JawabMinAggregateInputType = {
    id_penanggung_jawab?: true
    id_user?: true
  }

  export type Penanggung_JawabMaxAggregateInputType = {
    id_penanggung_jawab?: true
    id_user?: true
  }

  export type Penanggung_JawabCountAggregateInputType = {
    id_penanggung_jawab?: true
    id_user?: true
    _all?: true
  }

  export type Penanggung_JawabAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Penanggung_Jawab to aggregate.
     */
    where?: Penanggung_JawabWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Penanggung_Jawabs to fetch.
     */
    orderBy?: Penanggung_JawabOrderByWithRelationInput | Penanggung_JawabOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Penanggung_JawabWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Penanggung_Jawabs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Penanggung_Jawabs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Penanggung_Jawabs
    **/
    _count?: true | Penanggung_JawabCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Penanggung_JawabMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Penanggung_JawabMaxAggregateInputType
  }

  export type GetPenanggung_JawabAggregateType<T extends Penanggung_JawabAggregateArgs> = {
        [P in keyof T & keyof AggregatePenanggung_Jawab]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePenanggung_Jawab[P]>
      : GetScalarType<T[P], AggregatePenanggung_Jawab[P]>
  }




  export type Penanggung_JawabGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Penanggung_JawabWhereInput
    orderBy?: Penanggung_JawabOrderByWithAggregationInput | Penanggung_JawabOrderByWithAggregationInput[]
    by: Penanggung_JawabScalarFieldEnum[] | Penanggung_JawabScalarFieldEnum
    having?: Penanggung_JawabScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Penanggung_JawabCountAggregateInputType | true
    _min?: Penanggung_JawabMinAggregateInputType
    _max?: Penanggung_JawabMaxAggregateInputType
  }

  export type Penanggung_JawabGroupByOutputType = {
    id_penanggung_jawab: string
    id_user: string | null
    _count: Penanggung_JawabCountAggregateOutputType | null
    _min: Penanggung_JawabMinAggregateOutputType | null
    _max: Penanggung_JawabMaxAggregateOutputType | null
  }

  type GetPenanggung_JawabGroupByPayload<T extends Penanggung_JawabGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Penanggung_JawabGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Penanggung_JawabGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Penanggung_JawabGroupByOutputType[P]>
            : GetScalarType<T[P], Penanggung_JawabGroupByOutputType[P]>
        }
      >
    >


  export type Penanggung_JawabSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_penanggung_jawab?: boolean
    id_user?: boolean
    user?: boolean | Penanggung_Jawab$userArgs<ExtArgs>
    makams?: boolean | Penanggung_Jawab$makamsArgs<ExtArgs>
    statuses?: boolean | Penanggung_Jawab$statusesArgs<ExtArgs>
    _count?: boolean | Penanggung_JawabCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["penanggung_Jawab"]>

  export type Penanggung_JawabSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_penanggung_jawab?: boolean
    id_user?: boolean
    user?: boolean | Penanggung_Jawab$userArgs<ExtArgs>
  }, ExtArgs["result"]["penanggung_Jawab"]>

  export type Penanggung_JawabSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_penanggung_jawab?: boolean
    id_user?: boolean
    user?: boolean | Penanggung_Jawab$userArgs<ExtArgs>
  }, ExtArgs["result"]["penanggung_Jawab"]>

  export type Penanggung_JawabSelectScalar = {
    id_penanggung_jawab?: boolean
    id_user?: boolean
  }

  export type Penanggung_JawabOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_penanggung_jawab" | "id_user", ExtArgs["result"]["penanggung_Jawab"]>
  export type Penanggung_JawabInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Penanggung_Jawab$userArgs<ExtArgs>
    makams?: boolean | Penanggung_Jawab$makamsArgs<ExtArgs>
    statuses?: boolean | Penanggung_Jawab$statusesArgs<ExtArgs>
    _count?: boolean | Penanggung_JawabCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type Penanggung_JawabIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Penanggung_Jawab$userArgs<ExtArgs>
  }
  export type Penanggung_JawabIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Penanggung_Jawab$userArgs<ExtArgs>
  }

  export type $Penanggung_JawabPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Penanggung_Jawab"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      makams: Prisma.$makamPayload<ExtArgs>[]
      statuses: Prisma.$makamStatusPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_penanggung_jawab: string
      id_user: string | null
    }, ExtArgs["result"]["penanggung_Jawab"]>
    composites: {}
  }

  type Penanggung_JawabGetPayload<S extends boolean | null | undefined | Penanggung_JawabDefaultArgs> = $Result.GetResult<Prisma.$Penanggung_JawabPayload, S>

  type Penanggung_JawabCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<Penanggung_JawabFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Penanggung_JawabCountAggregateInputType | true
    }

  export interface Penanggung_JawabDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Penanggung_Jawab'], meta: { name: 'Penanggung_Jawab' } }
    /**
     * Find zero or one Penanggung_Jawab that matches the filter.
     * @param {Penanggung_JawabFindUniqueArgs} args - Arguments to find a Penanggung_Jawab
     * @example
     * // Get one Penanggung_Jawab
     * const penanggung_Jawab = await prisma.penanggung_Jawab.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends Penanggung_JawabFindUniqueArgs>(args: SelectSubset<T, Penanggung_JawabFindUniqueArgs<ExtArgs>>): Prisma__Penanggung_JawabClient<$Result.GetResult<Prisma.$Penanggung_JawabPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Penanggung_Jawab that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {Penanggung_JawabFindUniqueOrThrowArgs} args - Arguments to find a Penanggung_Jawab
     * @example
     * // Get one Penanggung_Jawab
     * const penanggung_Jawab = await prisma.penanggung_Jawab.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends Penanggung_JawabFindUniqueOrThrowArgs>(args: SelectSubset<T, Penanggung_JawabFindUniqueOrThrowArgs<ExtArgs>>): Prisma__Penanggung_JawabClient<$Result.GetResult<Prisma.$Penanggung_JawabPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Penanggung_Jawab that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Penanggung_JawabFindFirstArgs} args - Arguments to find a Penanggung_Jawab
     * @example
     * // Get one Penanggung_Jawab
     * const penanggung_Jawab = await prisma.penanggung_Jawab.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends Penanggung_JawabFindFirstArgs>(args?: SelectSubset<T, Penanggung_JawabFindFirstArgs<ExtArgs>>): Prisma__Penanggung_JawabClient<$Result.GetResult<Prisma.$Penanggung_JawabPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Penanggung_Jawab that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Penanggung_JawabFindFirstOrThrowArgs} args - Arguments to find a Penanggung_Jawab
     * @example
     * // Get one Penanggung_Jawab
     * const penanggung_Jawab = await prisma.penanggung_Jawab.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends Penanggung_JawabFindFirstOrThrowArgs>(args?: SelectSubset<T, Penanggung_JawabFindFirstOrThrowArgs<ExtArgs>>): Prisma__Penanggung_JawabClient<$Result.GetResult<Prisma.$Penanggung_JawabPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Penanggung_Jawabs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Penanggung_JawabFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Penanggung_Jawabs
     * const penanggung_Jawabs = await prisma.penanggung_Jawab.findMany()
     * 
     * // Get first 10 Penanggung_Jawabs
     * const penanggung_Jawabs = await prisma.penanggung_Jawab.findMany({ take: 10 })
     * 
     * // Only select the `id_penanggung_jawab`
     * const penanggung_JawabWithId_penanggung_jawabOnly = await prisma.penanggung_Jawab.findMany({ select: { id_penanggung_jawab: true } })
     * 
     */
    findMany<T extends Penanggung_JawabFindManyArgs>(args?: SelectSubset<T, Penanggung_JawabFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Penanggung_JawabPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Penanggung_Jawab.
     * @param {Penanggung_JawabCreateArgs} args - Arguments to create a Penanggung_Jawab.
     * @example
     * // Create one Penanggung_Jawab
     * const Penanggung_Jawab = await prisma.penanggung_Jawab.create({
     *   data: {
     *     // ... data to create a Penanggung_Jawab
     *   }
     * })
     * 
     */
    create<T extends Penanggung_JawabCreateArgs>(args: SelectSubset<T, Penanggung_JawabCreateArgs<ExtArgs>>): Prisma__Penanggung_JawabClient<$Result.GetResult<Prisma.$Penanggung_JawabPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Penanggung_Jawabs.
     * @param {Penanggung_JawabCreateManyArgs} args - Arguments to create many Penanggung_Jawabs.
     * @example
     * // Create many Penanggung_Jawabs
     * const penanggung_Jawab = await prisma.penanggung_Jawab.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends Penanggung_JawabCreateManyArgs>(args?: SelectSubset<T, Penanggung_JawabCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Penanggung_Jawabs and returns the data saved in the database.
     * @param {Penanggung_JawabCreateManyAndReturnArgs} args - Arguments to create many Penanggung_Jawabs.
     * @example
     * // Create many Penanggung_Jawabs
     * const penanggung_Jawab = await prisma.penanggung_Jawab.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Penanggung_Jawabs and only return the `id_penanggung_jawab`
     * const penanggung_JawabWithId_penanggung_jawabOnly = await prisma.penanggung_Jawab.createManyAndReturn({
     *   select: { id_penanggung_jawab: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends Penanggung_JawabCreateManyAndReturnArgs>(args?: SelectSubset<T, Penanggung_JawabCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Penanggung_JawabPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Penanggung_Jawab.
     * @param {Penanggung_JawabDeleteArgs} args - Arguments to delete one Penanggung_Jawab.
     * @example
     * // Delete one Penanggung_Jawab
     * const Penanggung_Jawab = await prisma.penanggung_Jawab.delete({
     *   where: {
     *     // ... filter to delete one Penanggung_Jawab
     *   }
     * })
     * 
     */
    delete<T extends Penanggung_JawabDeleteArgs>(args: SelectSubset<T, Penanggung_JawabDeleteArgs<ExtArgs>>): Prisma__Penanggung_JawabClient<$Result.GetResult<Prisma.$Penanggung_JawabPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Penanggung_Jawab.
     * @param {Penanggung_JawabUpdateArgs} args - Arguments to update one Penanggung_Jawab.
     * @example
     * // Update one Penanggung_Jawab
     * const penanggung_Jawab = await prisma.penanggung_Jawab.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends Penanggung_JawabUpdateArgs>(args: SelectSubset<T, Penanggung_JawabUpdateArgs<ExtArgs>>): Prisma__Penanggung_JawabClient<$Result.GetResult<Prisma.$Penanggung_JawabPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Penanggung_Jawabs.
     * @param {Penanggung_JawabDeleteManyArgs} args - Arguments to filter Penanggung_Jawabs to delete.
     * @example
     * // Delete a few Penanggung_Jawabs
     * const { count } = await prisma.penanggung_Jawab.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends Penanggung_JawabDeleteManyArgs>(args?: SelectSubset<T, Penanggung_JawabDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Penanggung_Jawabs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Penanggung_JawabUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Penanggung_Jawabs
     * const penanggung_Jawab = await prisma.penanggung_Jawab.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends Penanggung_JawabUpdateManyArgs>(args: SelectSubset<T, Penanggung_JawabUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Penanggung_Jawabs and returns the data updated in the database.
     * @param {Penanggung_JawabUpdateManyAndReturnArgs} args - Arguments to update many Penanggung_Jawabs.
     * @example
     * // Update many Penanggung_Jawabs
     * const penanggung_Jawab = await prisma.penanggung_Jawab.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Penanggung_Jawabs and only return the `id_penanggung_jawab`
     * const penanggung_JawabWithId_penanggung_jawabOnly = await prisma.penanggung_Jawab.updateManyAndReturn({
     *   select: { id_penanggung_jawab: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends Penanggung_JawabUpdateManyAndReturnArgs>(args: SelectSubset<T, Penanggung_JawabUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Penanggung_JawabPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Penanggung_Jawab.
     * @param {Penanggung_JawabUpsertArgs} args - Arguments to update or create a Penanggung_Jawab.
     * @example
     * // Update or create a Penanggung_Jawab
     * const penanggung_Jawab = await prisma.penanggung_Jawab.upsert({
     *   create: {
     *     // ... data to create a Penanggung_Jawab
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Penanggung_Jawab we want to update
     *   }
     * })
     */
    upsert<T extends Penanggung_JawabUpsertArgs>(args: SelectSubset<T, Penanggung_JawabUpsertArgs<ExtArgs>>): Prisma__Penanggung_JawabClient<$Result.GetResult<Prisma.$Penanggung_JawabPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Penanggung_Jawabs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Penanggung_JawabCountArgs} args - Arguments to filter Penanggung_Jawabs to count.
     * @example
     * // Count the number of Penanggung_Jawabs
     * const count = await prisma.penanggung_Jawab.count({
     *   where: {
     *     // ... the filter for the Penanggung_Jawabs we want to count
     *   }
     * })
    **/
    count<T extends Penanggung_JawabCountArgs>(
      args?: Subset<T, Penanggung_JawabCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Penanggung_JawabCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Penanggung_Jawab.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Penanggung_JawabAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Penanggung_JawabAggregateArgs>(args: Subset<T, Penanggung_JawabAggregateArgs>): Prisma.PrismaPromise<GetPenanggung_JawabAggregateType<T>>

    /**
     * Group by Penanggung_Jawab.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Penanggung_JawabGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Penanggung_JawabGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Penanggung_JawabGroupByArgs['orderBy'] }
        : { orderBy?: Penanggung_JawabGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Penanggung_JawabGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPenanggung_JawabGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Penanggung_Jawab model
   */
  readonly fields: Penanggung_JawabFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Penanggung_Jawab.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Penanggung_JawabClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Penanggung_Jawab$userArgs<ExtArgs> = {}>(args?: Subset<T, Penanggung_Jawab$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    makams<T extends Penanggung_Jawab$makamsArgs<ExtArgs> = {}>(args?: Subset<T, Penanggung_Jawab$makamsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$makamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    statuses<T extends Penanggung_Jawab$statusesArgs<ExtArgs> = {}>(args?: Subset<T, Penanggung_Jawab$statusesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$makamStatusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Penanggung_Jawab model
   */
  interface Penanggung_JawabFieldRefs {
    readonly id_penanggung_jawab: FieldRef<"Penanggung_Jawab", 'String'>
    readonly id_user: FieldRef<"Penanggung_Jawab", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Penanggung_Jawab findUnique
   */
  export type Penanggung_JawabFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penanggung_Jawab
     */
    select?: Penanggung_JawabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penanggung_Jawab
     */
    omit?: Penanggung_JawabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Penanggung_JawabInclude<ExtArgs> | null
    /**
     * Filter, which Penanggung_Jawab to fetch.
     */
    where: Penanggung_JawabWhereUniqueInput
  }

  /**
   * Penanggung_Jawab findUniqueOrThrow
   */
  export type Penanggung_JawabFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penanggung_Jawab
     */
    select?: Penanggung_JawabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penanggung_Jawab
     */
    omit?: Penanggung_JawabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Penanggung_JawabInclude<ExtArgs> | null
    /**
     * Filter, which Penanggung_Jawab to fetch.
     */
    where: Penanggung_JawabWhereUniqueInput
  }

  /**
   * Penanggung_Jawab findFirst
   */
  export type Penanggung_JawabFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penanggung_Jawab
     */
    select?: Penanggung_JawabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penanggung_Jawab
     */
    omit?: Penanggung_JawabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Penanggung_JawabInclude<ExtArgs> | null
    /**
     * Filter, which Penanggung_Jawab to fetch.
     */
    where?: Penanggung_JawabWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Penanggung_Jawabs to fetch.
     */
    orderBy?: Penanggung_JawabOrderByWithRelationInput | Penanggung_JawabOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Penanggung_Jawabs.
     */
    cursor?: Penanggung_JawabWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Penanggung_Jawabs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Penanggung_Jawabs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Penanggung_Jawabs.
     */
    distinct?: Penanggung_JawabScalarFieldEnum | Penanggung_JawabScalarFieldEnum[]
  }

  /**
   * Penanggung_Jawab findFirstOrThrow
   */
  export type Penanggung_JawabFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penanggung_Jawab
     */
    select?: Penanggung_JawabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penanggung_Jawab
     */
    omit?: Penanggung_JawabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Penanggung_JawabInclude<ExtArgs> | null
    /**
     * Filter, which Penanggung_Jawab to fetch.
     */
    where?: Penanggung_JawabWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Penanggung_Jawabs to fetch.
     */
    orderBy?: Penanggung_JawabOrderByWithRelationInput | Penanggung_JawabOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Penanggung_Jawabs.
     */
    cursor?: Penanggung_JawabWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Penanggung_Jawabs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Penanggung_Jawabs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Penanggung_Jawabs.
     */
    distinct?: Penanggung_JawabScalarFieldEnum | Penanggung_JawabScalarFieldEnum[]
  }

  /**
   * Penanggung_Jawab findMany
   */
  export type Penanggung_JawabFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penanggung_Jawab
     */
    select?: Penanggung_JawabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penanggung_Jawab
     */
    omit?: Penanggung_JawabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Penanggung_JawabInclude<ExtArgs> | null
    /**
     * Filter, which Penanggung_Jawabs to fetch.
     */
    where?: Penanggung_JawabWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Penanggung_Jawabs to fetch.
     */
    orderBy?: Penanggung_JawabOrderByWithRelationInput | Penanggung_JawabOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Penanggung_Jawabs.
     */
    cursor?: Penanggung_JawabWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Penanggung_Jawabs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Penanggung_Jawabs.
     */
    skip?: number
    distinct?: Penanggung_JawabScalarFieldEnum | Penanggung_JawabScalarFieldEnum[]
  }

  /**
   * Penanggung_Jawab create
   */
  export type Penanggung_JawabCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penanggung_Jawab
     */
    select?: Penanggung_JawabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penanggung_Jawab
     */
    omit?: Penanggung_JawabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Penanggung_JawabInclude<ExtArgs> | null
    /**
     * The data needed to create a Penanggung_Jawab.
     */
    data?: XOR<Penanggung_JawabCreateInput, Penanggung_JawabUncheckedCreateInput>
  }

  /**
   * Penanggung_Jawab createMany
   */
  export type Penanggung_JawabCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Penanggung_Jawabs.
     */
    data: Penanggung_JawabCreateManyInput | Penanggung_JawabCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Penanggung_Jawab createManyAndReturn
   */
  export type Penanggung_JawabCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penanggung_Jawab
     */
    select?: Penanggung_JawabSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Penanggung_Jawab
     */
    omit?: Penanggung_JawabOmit<ExtArgs> | null
    /**
     * The data used to create many Penanggung_Jawabs.
     */
    data: Penanggung_JawabCreateManyInput | Penanggung_JawabCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Penanggung_JawabIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Penanggung_Jawab update
   */
  export type Penanggung_JawabUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penanggung_Jawab
     */
    select?: Penanggung_JawabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penanggung_Jawab
     */
    omit?: Penanggung_JawabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Penanggung_JawabInclude<ExtArgs> | null
    /**
     * The data needed to update a Penanggung_Jawab.
     */
    data: XOR<Penanggung_JawabUpdateInput, Penanggung_JawabUncheckedUpdateInput>
    /**
     * Choose, which Penanggung_Jawab to update.
     */
    where: Penanggung_JawabWhereUniqueInput
  }

  /**
   * Penanggung_Jawab updateMany
   */
  export type Penanggung_JawabUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Penanggung_Jawabs.
     */
    data: XOR<Penanggung_JawabUpdateManyMutationInput, Penanggung_JawabUncheckedUpdateManyInput>
    /**
     * Filter which Penanggung_Jawabs to update
     */
    where?: Penanggung_JawabWhereInput
    /**
     * Limit how many Penanggung_Jawabs to update.
     */
    limit?: number
  }

  /**
   * Penanggung_Jawab updateManyAndReturn
   */
  export type Penanggung_JawabUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penanggung_Jawab
     */
    select?: Penanggung_JawabSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Penanggung_Jawab
     */
    omit?: Penanggung_JawabOmit<ExtArgs> | null
    /**
     * The data used to update Penanggung_Jawabs.
     */
    data: XOR<Penanggung_JawabUpdateManyMutationInput, Penanggung_JawabUncheckedUpdateManyInput>
    /**
     * Filter which Penanggung_Jawabs to update
     */
    where?: Penanggung_JawabWhereInput
    /**
     * Limit how many Penanggung_Jawabs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Penanggung_JawabIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Penanggung_Jawab upsert
   */
  export type Penanggung_JawabUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penanggung_Jawab
     */
    select?: Penanggung_JawabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penanggung_Jawab
     */
    omit?: Penanggung_JawabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Penanggung_JawabInclude<ExtArgs> | null
    /**
     * The filter to search for the Penanggung_Jawab to update in case it exists.
     */
    where: Penanggung_JawabWhereUniqueInput
    /**
     * In case the Penanggung_Jawab found by the `where` argument doesn't exist, create a new Penanggung_Jawab with this data.
     */
    create: XOR<Penanggung_JawabCreateInput, Penanggung_JawabUncheckedCreateInput>
    /**
     * In case the Penanggung_Jawab was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Penanggung_JawabUpdateInput, Penanggung_JawabUncheckedUpdateInput>
  }

  /**
   * Penanggung_Jawab delete
   */
  export type Penanggung_JawabDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penanggung_Jawab
     */
    select?: Penanggung_JawabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penanggung_Jawab
     */
    omit?: Penanggung_JawabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Penanggung_JawabInclude<ExtArgs> | null
    /**
     * Filter which Penanggung_Jawab to delete.
     */
    where: Penanggung_JawabWhereUniqueInput
  }

  /**
   * Penanggung_Jawab deleteMany
   */
  export type Penanggung_JawabDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Penanggung_Jawabs to delete
     */
    where?: Penanggung_JawabWhereInput
    /**
     * Limit how many Penanggung_Jawabs to delete.
     */
    limit?: number
  }

  /**
   * Penanggung_Jawab.user
   */
  export type Penanggung_Jawab$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Penanggung_Jawab.makams
   */
  export type Penanggung_Jawab$makamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makam
     */
    select?: makamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the makam
     */
    omit?: makamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamInclude<ExtArgs> | null
    where?: makamWhereInput
    orderBy?: makamOrderByWithRelationInput | makamOrderByWithRelationInput[]
    cursor?: makamWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MakamScalarFieldEnum | MakamScalarFieldEnum[]
  }

  /**
   * Penanggung_Jawab.statuses
   */
  export type Penanggung_Jawab$statusesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makamStatus
     */
    select?: makamStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the makamStatus
     */
    omit?: makamStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamStatusInclude<ExtArgs> | null
    where?: makamStatusWhereInput
    orderBy?: makamStatusOrderByWithRelationInput | makamStatusOrderByWithRelationInput[]
    cursor?: makamStatusWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MakamStatusScalarFieldEnum | MakamStatusScalarFieldEnum[]
  }

  /**
   * Penanggung_Jawab without action
   */
  export type Penanggung_JawabDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penanggung_Jawab
     */
    select?: Penanggung_JawabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penanggung_Jawab
     */
    omit?: Penanggung_JawabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Penanggung_JawabInclude<ExtArgs> | null
  }


  /**
   * Model Jenazah
   */

  export type AggregateJenazah = {
    _count: JenazahCountAggregateOutputType | null
    _avg: JenazahAvgAggregateOutputType | null
    _sum: JenazahSumAggregateOutputType | null
    _min: JenazahMinAggregateOutputType | null
    _max: JenazahMaxAggregateOutputType | null
  }

  export type JenazahAvgAggregateOutputType = {
    masa_aktif: number | null
  }

  export type JenazahSumAggregateOutputType = {
    masa_aktif: number | null
  }

  export type JenazahMinAggregateOutputType = {
    id_jenazah: string | null
    tanggal_pemakaman: Date | null
    status_jenazah: string | null
    masa_aktif: number | null
    status_pembayaran_pesanan: string | null
    status_pembayaran_iuran_tahunan: string | null
    id_user: string | null
    id_blok: string | null
  }

  export type JenazahMaxAggregateOutputType = {
    id_jenazah: string | null
    tanggal_pemakaman: Date | null
    status_jenazah: string | null
    masa_aktif: number | null
    status_pembayaran_pesanan: string | null
    status_pembayaran_iuran_tahunan: string | null
    id_user: string | null
    id_blok: string | null
  }

  export type JenazahCountAggregateOutputType = {
    id_jenazah: number
    tanggal_pemakaman: number
    status_jenazah: number
    masa_aktif: number
    status_pembayaran_pesanan: number
    status_pembayaran_iuran_tahunan: number
    id_user: number
    id_blok: number
    _all: number
  }


  export type JenazahAvgAggregateInputType = {
    masa_aktif?: true
  }

  export type JenazahSumAggregateInputType = {
    masa_aktif?: true
  }

  export type JenazahMinAggregateInputType = {
    id_jenazah?: true
    tanggal_pemakaman?: true
    status_jenazah?: true
    masa_aktif?: true
    status_pembayaran_pesanan?: true
    status_pembayaran_iuran_tahunan?: true
    id_user?: true
    id_blok?: true
  }

  export type JenazahMaxAggregateInputType = {
    id_jenazah?: true
    tanggal_pemakaman?: true
    status_jenazah?: true
    masa_aktif?: true
    status_pembayaran_pesanan?: true
    status_pembayaran_iuran_tahunan?: true
    id_user?: true
    id_blok?: true
  }

  export type JenazahCountAggregateInputType = {
    id_jenazah?: true
    tanggal_pemakaman?: true
    status_jenazah?: true
    masa_aktif?: true
    status_pembayaran_pesanan?: true
    status_pembayaran_iuran_tahunan?: true
    id_user?: true
    id_blok?: true
    _all?: true
  }

  export type JenazahAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Jenazah to aggregate.
     */
    where?: JenazahWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jenazahs to fetch.
     */
    orderBy?: JenazahOrderByWithRelationInput | JenazahOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JenazahWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jenazahs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jenazahs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Jenazahs
    **/
    _count?: true | JenazahCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JenazahAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JenazahSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JenazahMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JenazahMaxAggregateInputType
  }

  export type GetJenazahAggregateType<T extends JenazahAggregateArgs> = {
        [P in keyof T & keyof AggregateJenazah]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJenazah[P]>
      : GetScalarType<T[P], AggregateJenazah[P]>
  }




  export type JenazahGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JenazahWhereInput
    orderBy?: JenazahOrderByWithAggregationInput | JenazahOrderByWithAggregationInput[]
    by: JenazahScalarFieldEnum[] | JenazahScalarFieldEnum
    having?: JenazahScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JenazahCountAggregateInputType | true
    _avg?: JenazahAvgAggregateInputType
    _sum?: JenazahSumAggregateInputType
    _min?: JenazahMinAggregateInputType
    _max?: JenazahMaxAggregateInputType
  }

  export type JenazahGroupByOutputType = {
    id_jenazah: string
    tanggal_pemakaman: Date | null
    status_jenazah: string | null
    masa_aktif: number | null
    status_pembayaran_pesanan: string | null
    status_pembayaran_iuran_tahunan: string | null
    id_user: string | null
    id_blok: string | null
    _count: JenazahCountAggregateOutputType | null
    _avg: JenazahAvgAggregateOutputType | null
    _sum: JenazahSumAggregateOutputType | null
    _min: JenazahMinAggregateOutputType | null
    _max: JenazahMaxAggregateOutputType | null
  }

  type GetJenazahGroupByPayload<T extends JenazahGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JenazahGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JenazahGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JenazahGroupByOutputType[P]>
            : GetScalarType<T[P], JenazahGroupByOutputType[P]>
        }
      >
    >


  export type JenazahSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_jenazah?: boolean
    tanggal_pemakaman?: boolean
    status_jenazah?: boolean
    masa_aktif?: boolean
    status_pembayaran_pesanan?: boolean
    status_pembayaran_iuran_tahunan?: boolean
    id_user?: boolean
    id_blok?: boolean
    user?: boolean | Jenazah$userArgs<ExtArgs>
    blok?: boolean | Jenazah$blokArgs<ExtArgs>
    makams?: boolean | Jenazah$makamsArgs<ExtArgs>
    statuses?: boolean | Jenazah$statusesArgs<ExtArgs>
    _count?: boolean | JenazahCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jenazah"]>

  export type JenazahSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_jenazah?: boolean
    tanggal_pemakaman?: boolean
    status_jenazah?: boolean
    masa_aktif?: boolean
    status_pembayaran_pesanan?: boolean
    status_pembayaran_iuran_tahunan?: boolean
    id_user?: boolean
    id_blok?: boolean
    user?: boolean | Jenazah$userArgs<ExtArgs>
    blok?: boolean | Jenazah$blokArgs<ExtArgs>
  }, ExtArgs["result"]["jenazah"]>

  export type JenazahSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_jenazah?: boolean
    tanggal_pemakaman?: boolean
    status_jenazah?: boolean
    masa_aktif?: boolean
    status_pembayaran_pesanan?: boolean
    status_pembayaran_iuran_tahunan?: boolean
    id_user?: boolean
    id_blok?: boolean
    user?: boolean | Jenazah$userArgs<ExtArgs>
    blok?: boolean | Jenazah$blokArgs<ExtArgs>
  }, ExtArgs["result"]["jenazah"]>

  export type JenazahSelectScalar = {
    id_jenazah?: boolean
    tanggal_pemakaman?: boolean
    status_jenazah?: boolean
    masa_aktif?: boolean
    status_pembayaran_pesanan?: boolean
    status_pembayaran_iuran_tahunan?: boolean
    id_user?: boolean
    id_blok?: boolean
  }

  export type JenazahOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_jenazah" | "tanggal_pemakaman" | "status_jenazah" | "masa_aktif" | "status_pembayaran_pesanan" | "status_pembayaran_iuran_tahunan" | "id_user" | "id_blok", ExtArgs["result"]["jenazah"]>
  export type JenazahInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Jenazah$userArgs<ExtArgs>
    blok?: boolean | Jenazah$blokArgs<ExtArgs>
    makams?: boolean | Jenazah$makamsArgs<ExtArgs>
    statuses?: boolean | Jenazah$statusesArgs<ExtArgs>
    _count?: boolean | JenazahCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type JenazahIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Jenazah$userArgs<ExtArgs>
    blok?: boolean | Jenazah$blokArgs<ExtArgs>
  }
  export type JenazahIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Jenazah$userArgs<ExtArgs>
    blok?: boolean | Jenazah$blokArgs<ExtArgs>
  }

  export type $JenazahPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Jenazah"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      blok: Prisma.$BlokPayload<ExtArgs> | null
      makams: Prisma.$makamPayload<ExtArgs>[]
      statuses: Prisma.$makamStatusPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_jenazah: string
      tanggal_pemakaman: Date | null
      status_jenazah: string | null
      masa_aktif: number | null
      status_pembayaran_pesanan: string | null
      status_pembayaran_iuran_tahunan: string | null
      id_user: string | null
      id_blok: string | null
    }, ExtArgs["result"]["jenazah"]>
    composites: {}
  }

  type JenazahGetPayload<S extends boolean | null | undefined | JenazahDefaultArgs> = $Result.GetResult<Prisma.$JenazahPayload, S>

  type JenazahCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JenazahFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JenazahCountAggregateInputType | true
    }

  export interface JenazahDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Jenazah'], meta: { name: 'Jenazah' } }
    /**
     * Find zero or one Jenazah that matches the filter.
     * @param {JenazahFindUniqueArgs} args - Arguments to find a Jenazah
     * @example
     * // Get one Jenazah
     * const jenazah = await prisma.jenazah.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JenazahFindUniqueArgs>(args: SelectSubset<T, JenazahFindUniqueArgs<ExtArgs>>): Prisma__JenazahClient<$Result.GetResult<Prisma.$JenazahPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Jenazah that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JenazahFindUniqueOrThrowArgs} args - Arguments to find a Jenazah
     * @example
     * // Get one Jenazah
     * const jenazah = await prisma.jenazah.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JenazahFindUniqueOrThrowArgs>(args: SelectSubset<T, JenazahFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JenazahClient<$Result.GetResult<Prisma.$JenazahPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Jenazah that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JenazahFindFirstArgs} args - Arguments to find a Jenazah
     * @example
     * // Get one Jenazah
     * const jenazah = await prisma.jenazah.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JenazahFindFirstArgs>(args?: SelectSubset<T, JenazahFindFirstArgs<ExtArgs>>): Prisma__JenazahClient<$Result.GetResult<Prisma.$JenazahPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Jenazah that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JenazahFindFirstOrThrowArgs} args - Arguments to find a Jenazah
     * @example
     * // Get one Jenazah
     * const jenazah = await prisma.jenazah.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JenazahFindFirstOrThrowArgs>(args?: SelectSubset<T, JenazahFindFirstOrThrowArgs<ExtArgs>>): Prisma__JenazahClient<$Result.GetResult<Prisma.$JenazahPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Jenazahs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JenazahFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Jenazahs
     * const jenazahs = await prisma.jenazah.findMany()
     * 
     * // Get first 10 Jenazahs
     * const jenazahs = await prisma.jenazah.findMany({ take: 10 })
     * 
     * // Only select the `id_jenazah`
     * const jenazahWithId_jenazahOnly = await prisma.jenazah.findMany({ select: { id_jenazah: true } })
     * 
     */
    findMany<T extends JenazahFindManyArgs>(args?: SelectSubset<T, JenazahFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JenazahPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Jenazah.
     * @param {JenazahCreateArgs} args - Arguments to create a Jenazah.
     * @example
     * // Create one Jenazah
     * const Jenazah = await prisma.jenazah.create({
     *   data: {
     *     // ... data to create a Jenazah
     *   }
     * })
     * 
     */
    create<T extends JenazahCreateArgs>(args: SelectSubset<T, JenazahCreateArgs<ExtArgs>>): Prisma__JenazahClient<$Result.GetResult<Prisma.$JenazahPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Jenazahs.
     * @param {JenazahCreateManyArgs} args - Arguments to create many Jenazahs.
     * @example
     * // Create many Jenazahs
     * const jenazah = await prisma.jenazah.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JenazahCreateManyArgs>(args?: SelectSubset<T, JenazahCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Jenazahs and returns the data saved in the database.
     * @param {JenazahCreateManyAndReturnArgs} args - Arguments to create many Jenazahs.
     * @example
     * // Create many Jenazahs
     * const jenazah = await prisma.jenazah.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Jenazahs and only return the `id_jenazah`
     * const jenazahWithId_jenazahOnly = await prisma.jenazah.createManyAndReturn({
     *   select: { id_jenazah: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JenazahCreateManyAndReturnArgs>(args?: SelectSubset<T, JenazahCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JenazahPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Jenazah.
     * @param {JenazahDeleteArgs} args - Arguments to delete one Jenazah.
     * @example
     * // Delete one Jenazah
     * const Jenazah = await prisma.jenazah.delete({
     *   where: {
     *     // ... filter to delete one Jenazah
     *   }
     * })
     * 
     */
    delete<T extends JenazahDeleteArgs>(args: SelectSubset<T, JenazahDeleteArgs<ExtArgs>>): Prisma__JenazahClient<$Result.GetResult<Prisma.$JenazahPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Jenazah.
     * @param {JenazahUpdateArgs} args - Arguments to update one Jenazah.
     * @example
     * // Update one Jenazah
     * const jenazah = await prisma.jenazah.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JenazahUpdateArgs>(args: SelectSubset<T, JenazahUpdateArgs<ExtArgs>>): Prisma__JenazahClient<$Result.GetResult<Prisma.$JenazahPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Jenazahs.
     * @param {JenazahDeleteManyArgs} args - Arguments to filter Jenazahs to delete.
     * @example
     * // Delete a few Jenazahs
     * const { count } = await prisma.jenazah.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JenazahDeleteManyArgs>(args?: SelectSubset<T, JenazahDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jenazahs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JenazahUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Jenazahs
     * const jenazah = await prisma.jenazah.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JenazahUpdateManyArgs>(args: SelectSubset<T, JenazahUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jenazahs and returns the data updated in the database.
     * @param {JenazahUpdateManyAndReturnArgs} args - Arguments to update many Jenazahs.
     * @example
     * // Update many Jenazahs
     * const jenazah = await prisma.jenazah.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Jenazahs and only return the `id_jenazah`
     * const jenazahWithId_jenazahOnly = await prisma.jenazah.updateManyAndReturn({
     *   select: { id_jenazah: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends JenazahUpdateManyAndReturnArgs>(args: SelectSubset<T, JenazahUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JenazahPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Jenazah.
     * @param {JenazahUpsertArgs} args - Arguments to update or create a Jenazah.
     * @example
     * // Update or create a Jenazah
     * const jenazah = await prisma.jenazah.upsert({
     *   create: {
     *     // ... data to create a Jenazah
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Jenazah we want to update
     *   }
     * })
     */
    upsert<T extends JenazahUpsertArgs>(args: SelectSubset<T, JenazahUpsertArgs<ExtArgs>>): Prisma__JenazahClient<$Result.GetResult<Prisma.$JenazahPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Jenazahs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JenazahCountArgs} args - Arguments to filter Jenazahs to count.
     * @example
     * // Count the number of Jenazahs
     * const count = await prisma.jenazah.count({
     *   where: {
     *     // ... the filter for the Jenazahs we want to count
     *   }
     * })
    **/
    count<T extends JenazahCountArgs>(
      args?: Subset<T, JenazahCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JenazahCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Jenazah.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JenazahAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JenazahAggregateArgs>(args: Subset<T, JenazahAggregateArgs>): Prisma.PrismaPromise<GetJenazahAggregateType<T>>

    /**
     * Group by Jenazah.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JenazahGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JenazahGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JenazahGroupByArgs['orderBy'] }
        : { orderBy?: JenazahGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JenazahGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJenazahGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Jenazah model
   */
  readonly fields: JenazahFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Jenazah.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JenazahClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Jenazah$userArgs<ExtArgs> = {}>(args?: Subset<T, Jenazah$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    blok<T extends Jenazah$blokArgs<ExtArgs> = {}>(args?: Subset<T, Jenazah$blokArgs<ExtArgs>>): Prisma__BlokClient<$Result.GetResult<Prisma.$BlokPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    makams<T extends Jenazah$makamsArgs<ExtArgs> = {}>(args?: Subset<T, Jenazah$makamsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$makamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    statuses<T extends Jenazah$statusesArgs<ExtArgs> = {}>(args?: Subset<T, Jenazah$statusesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$makamStatusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Jenazah model
   */
  interface JenazahFieldRefs {
    readonly id_jenazah: FieldRef<"Jenazah", 'String'>
    readonly tanggal_pemakaman: FieldRef<"Jenazah", 'DateTime'>
    readonly status_jenazah: FieldRef<"Jenazah", 'String'>
    readonly masa_aktif: FieldRef<"Jenazah", 'Int'>
    readonly status_pembayaran_pesanan: FieldRef<"Jenazah", 'String'>
    readonly status_pembayaran_iuran_tahunan: FieldRef<"Jenazah", 'String'>
    readonly id_user: FieldRef<"Jenazah", 'String'>
    readonly id_blok: FieldRef<"Jenazah", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Jenazah findUnique
   */
  export type JenazahFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jenazah
     */
    select?: JenazahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jenazah
     */
    omit?: JenazahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenazahInclude<ExtArgs> | null
    /**
     * Filter, which Jenazah to fetch.
     */
    where: JenazahWhereUniqueInput
  }

  /**
   * Jenazah findUniqueOrThrow
   */
  export type JenazahFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jenazah
     */
    select?: JenazahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jenazah
     */
    omit?: JenazahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenazahInclude<ExtArgs> | null
    /**
     * Filter, which Jenazah to fetch.
     */
    where: JenazahWhereUniqueInput
  }

  /**
   * Jenazah findFirst
   */
  export type JenazahFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jenazah
     */
    select?: JenazahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jenazah
     */
    omit?: JenazahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenazahInclude<ExtArgs> | null
    /**
     * Filter, which Jenazah to fetch.
     */
    where?: JenazahWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jenazahs to fetch.
     */
    orderBy?: JenazahOrderByWithRelationInput | JenazahOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jenazahs.
     */
    cursor?: JenazahWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jenazahs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jenazahs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jenazahs.
     */
    distinct?: JenazahScalarFieldEnum | JenazahScalarFieldEnum[]
  }

  /**
   * Jenazah findFirstOrThrow
   */
  export type JenazahFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jenazah
     */
    select?: JenazahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jenazah
     */
    omit?: JenazahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenazahInclude<ExtArgs> | null
    /**
     * Filter, which Jenazah to fetch.
     */
    where?: JenazahWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jenazahs to fetch.
     */
    orderBy?: JenazahOrderByWithRelationInput | JenazahOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jenazahs.
     */
    cursor?: JenazahWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jenazahs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jenazahs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jenazahs.
     */
    distinct?: JenazahScalarFieldEnum | JenazahScalarFieldEnum[]
  }

  /**
   * Jenazah findMany
   */
  export type JenazahFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jenazah
     */
    select?: JenazahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jenazah
     */
    omit?: JenazahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenazahInclude<ExtArgs> | null
    /**
     * Filter, which Jenazahs to fetch.
     */
    where?: JenazahWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jenazahs to fetch.
     */
    orderBy?: JenazahOrderByWithRelationInput | JenazahOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Jenazahs.
     */
    cursor?: JenazahWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jenazahs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jenazahs.
     */
    skip?: number
    distinct?: JenazahScalarFieldEnum | JenazahScalarFieldEnum[]
  }

  /**
   * Jenazah create
   */
  export type JenazahCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jenazah
     */
    select?: JenazahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jenazah
     */
    omit?: JenazahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenazahInclude<ExtArgs> | null
    /**
     * The data needed to create a Jenazah.
     */
    data?: XOR<JenazahCreateInput, JenazahUncheckedCreateInput>
  }

  /**
   * Jenazah createMany
   */
  export type JenazahCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Jenazahs.
     */
    data: JenazahCreateManyInput | JenazahCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Jenazah createManyAndReturn
   */
  export type JenazahCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jenazah
     */
    select?: JenazahSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Jenazah
     */
    omit?: JenazahOmit<ExtArgs> | null
    /**
     * The data used to create many Jenazahs.
     */
    data: JenazahCreateManyInput | JenazahCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenazahIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Jenazah update
   */
  export type JenazahUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jenazah
     */
    select?: JenazahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jenazah
     */
    omit?: JenazahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenazahInclude<ExtArgs> | null
    /**
     * The data needed to update a Jenazah.
     */
    data: XOR<JenazahUpdateInput, JenazahUncheckedUpdateInput>
    /**
     * Choose, which Jenazah to update.
     */
    where: JenazahWhereUniqueInput
  }

  /**
   * Jenazah updateMany
   */
  export type JenazahUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Jenazahs.
     */
    data: XOR<JenazahUpdateManyMutationInput, JenazahUncheckedUpdateManyInput>
    /**
     * Filter which Jenazahs to update
     */
    where?: JenazahWhereInput
    /**
     * Limit how many Jenazahs to update.
     */
    limit?: number
  }

  /**
   * Jenazah updateManyAndReturn
   */
  export type JenazahUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jenazah
     */
    select?: JenazahSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Jenazah
     */
    omit?: JenazahOmit<ExtArgs> | null
    /**
     * The data used to update Jenazahs.
     */
    data: XOR<JenazahUpdateManyMutationInput, JenazahUncheckedUpdateManyInput>
    /**
     * Filter which Jenazahs to update
     */
    where?: JenazahWhereInput
    /**
     * Limit how many Jenazahs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenazahIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Jenazah upsert
   */
  export type JenazahUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jenazah
     */
    select?: JenazahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jenazah
     */
    omit?: JenazahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenazahInclude<ExtArgs> | null
    /**
     * The filter to search for the Jenazah to update in case it exists.
     */
    where: JenazahWhereUniqueInput
    /**
     * In case the Jenazah found by the `where` argument doesn't exist, create a new Jenazah with this data.
     */
    create: XOR<JenazahCreateInput, JenazahUncheckedCreateInput>
    /**
     * In case the Jenazah was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JenazahUpdateInput, JenazahUncheckedUpdateInput>
  }

  /**
   * Jenazah delete
   */
  export type JenazahDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jenazah
     */
    select?: JenazahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jenazah
     */
    omit?: JenazahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenazahInclude<ExtArgs> | null
    /**
     * Filter which Jenazah to delete.
     */
    where: JenazahWhereUniqueInput
  }

  /**
   * Jenazah deleteMany
   */
  export type JenazahDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Jenazahs to delete
     */
    where?: JenazahWhereInput
    /**
     * Limit how many Jenazahs to delete.
     */
    limit?: number
  }

  /**
   * Jenazah.user
   */
  export type Jenazah$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Jenazah.blok
   */
  export type Jenazah$blokArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blok
     */
    select?: BlokSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blok
     */
    omit?: BlokOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlokInclude<ExtArgs> | null
    where?: BlokWhereInput
  }

  /**
   * Jenazah.makams
   */
  export type Jenazah$makamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makam
     */
    select?: makamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the makam
     */
    omit?: makamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamInclude<ExtArgs> | null
    where?: makamWhereInput
    orderBy?: makamOrderByWithRelationInput | makamOrderByWithRelationInput[]
    cursor?: makamWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MakamScalarFieldEnum | MakamScalarFieldEnum[]
  }

  /**
   * Jenazah.statuses
   */
  export type Jenazah$statusesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makamStatus
     */
    select?: makamStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the makamStatus
     */
    omit?: makamStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamStatusInclude<ExtArgs> | null
    where?: makamStatusWhereInput
    orderBy?: makamStatusOrderByWithRelationInput | makamStatusOrderByWithRelationInput[]
    cursor?: makamStatusWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MakamStatusScalarFieldEnum | MakamStatusScalarFieldEnum[]
  }

  /**
   * Jenazah without action
   */
  export type JenazahDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jenazah
     */
    select?: JenazahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jenazah
     */
    omit?: JenazahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenazahInclude<ExtArgs> | null
  }


  /**
   * Model Blok
   */

  export type AggregateBlok = {
    _count: BlokCountAggregateOutputType | null
    _min: BlokMinAggregateOutputType | null
    _max: BlokMaxAggregateOutputType | null
  }

  export type BlokMinAggregateOutputType = {
    id_blok: string | null
    lokasi: string | null
    tanggal_pemakaman_terakhir: Date | null
    status_blok: string | null
    status_pesanan: string | null
    availability: string | null
    status_pembayaran: string | null
  }

  export type BlokMaxAggregateOutputType = {
    id_blok: string | null
    lokasi: string | null
    tanggal_pemakaman_terakhir: Date | null
    status_blok: string | null
    status_pesanan: string | null
    availability: string | null
    status_pembayaran: string | null
  }

  export type BlokCountAggregateOutputType = {
    id_blok: number
    lokasi: number
    tanggal_pemakaman_terakhir: number
    status_blok: number
    status_pesanan: number
    availability: number
    status_pembayaran: number
    _all: number
  }


  export type BlokMinAggregateInputType = {
    id_blok?: true
    lokasi?: true
    tanggal_pemakaman_terakhir?: true
    status_blok?: true
    status_pesanan?: true
    availability?: true
    status_pembayaran?: true
  }

  export type BlokMaxAggregateInputType = {
    id_blok?: true
    lokasi?: true
    tanggal_pemakaman_terakhir?: true
    status_blok?: true
    status_pesanan?: true
    availability?: true
    status_pembayaran?: true
  }

  export type BlokCountAggregateInputType = {
    id_blok?: true
    lokasi?: true
    tanggal_pemakaman_terakhir?: true
    status_blok?: true
    status_pesanan?: true
    availability?: true
    status_pembayaran?: true
    _all?: true
  }

  export type BlokAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Blok to aggregate.
     */
    where?: BlokWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bloks to fetch.
     */
    orderBy?: BlokOrderByWithRelationInput | BlokOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BlokWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bloks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bloks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bloks
    **/
    _count?: true | BlokCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BlokMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BlokMaxAggregateInputType
  }

  export type GetBlokAggregateType<T extends BlokAggregateArgs> = {
        [P in keyof T & keyof AggregateBlok]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBlok[P]>
      : GetScalarType<T[P], AggregateBlok[P]>
  }




  export type BlokGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlokWhereInput
    orderBy?: BlokOrderByWithAggregationInput | BlokOrderByWithAggregationInput[]
    by: BlokScalarFieldEnum[] | BlokScalarFieldEnum
    having?: BlokScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BlokCountAggregateInputType | true
    _min?: BlokMinAggregateInputType
    _max?: BlokMaxAggregateInputType
  }

  export type BlokGroupByOutputType = {
    id_blok: string
    lokasi: string | null
    tanggal_pemakaman_terakhir: Date | null
    status_blok: string | null
    status_pesanan: string | null
    availability: string | null
    status_pembayaran: string | null
    _count: BlokCountAggregateOutputType | null
    _min: BlokMinAggregateOutputType | null
    _max: BlokMaxAggregateOutputType | null
  }

  type GetBlokGroupByPayload<T extends BlokGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BlokGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BlokGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BlokGroupByOutputType[P]>
            : GetScalarType<T[P], BlokGroupByOutputType[P]>
        }
      >
    >


  export type BlokSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_blok?: boolean
    lokasi?: boolean
    tanggal_pemakaman_terakhir?: boolean
    status_blok?: boolean
    status_pesanan?: boolean
    availability?: boolean
    status_pembayaran?: boolean
    jenazah?: boolean | Blok$jenazahArgs<ExtArgs>
    makam?: boolean | Blok$makamArgs<ExtArgs>
    makamStatus?: boolean | Blok$makamStatusArgs<ExtArgs>
    _count?: boolean | BlokCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["blok"]>

  export type BlokSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_blok?: boolean
    lokasi?: boolean
    tanggal_pemakaman_terakhir?: boolean
    status_blok?: boolean
    status_pesanan?: boolean
    availability?: boolean
    status_pembayaran?: boolean
  }, ExtArgs["result"]["blok"]>

  export type BlokSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_blok?: boolean
    lokasi?: boolean
    tanggal_pemakaman_terakhir?: boolean
    status_blok?: boolean
    status_pesanan?: boolean
    availability?: boolean
    status_pembayaran?: boolean
  }, ExtArgs["result"]["blok"]>

  export type BlokSelectScalar = {
    id_blok?: boolean
    lokasi?: boolean
    tanggal_pemakaman_terakhir?: boolean
    status_blok?: boolean
    status_pesanan?: boolean
    availability?: boolean
    status_pembayaran?: boolean
  }

  export type BlokOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_blok" | "lokasi" | "tanggal_pemakaman_terakhir" | "status_blok" | "status_pesanan" | "availability" | "status_pembayaran", ExtArgs["result"]["blok"]>
  export type BlokInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jenazah?: boolean | Blok$jenazahArgs<ExtArgs>
    makam?: boolean | Blok$makamArgs<ExtArgs>
    makamStatus?: boolean | Blok$makamStatusArgs<ExtArgs>
    _count?: boolean | BlokCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BlokIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BlokIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BlokPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Blok"
    objects: {
      jenazah: Prisma.$JenazahPayload<ExtArgs>[]
      makam: Prisma.$makamPayload<ExtArgs>[]
      makamStatus: Prisma.$makamStatusPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_blok: string
      lokasi: string | null
      tanggal_pemakaman_terakhir: Date | null
      status_blok: string | null
      status_pesanan: string | null
      availability: string | null
      status_pembayaran: string | null
    }, ExtArgs["result"]["blok"]>
    composites: {}
  }

  type BlokGetPayload<S extends boolean | null | undefined | BlokDefaultArgs> = $Result.GetResult<Prisma.$BlokPayload, S>

  type BlokCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BlokFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BlokCountAggregateInputType | true
    }

  export interface BlokDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Blok'], meta: { name: 'Blok' } }
    /**
     * Find zero or one Blok that matches the filter.
     * @param {BlokFindUniqueArgs} args - Arguments to find a Blok
     * @example
     * // Get one Blok
     * const blok = await prisma.blok.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BlokFindUniqueArgs>(args: SelectSubset<T, BlokFindUniqueArgs<ExtArgs>>): Prisma__BlokClient<$Result.GetResult<Prisma.$BlokPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Blok that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BlokFindUniqueOrThrowArgs} args - Arguments to find a Blok
     * @example
     * // Get one Blok
     * const blok = await prisma.blok.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BlokFindUniqueOrThrowArgs>(args: SelectSubset<T, BlokFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BlokClient<$Result.GetResult<Prisma.$BlokPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Blok that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlokFindFirstArgs} args - Arguments to find a Blok
     * @example
     * // Get one Blok
     * const blok = await prisma.blok.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BlokFindFirstArgs>(args?: SelectSubset<T, BlokFindFirstArgs<ExtArgs>>): Prisma__BlokClient<$Result.GetResult<Prisma.$BlokPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Blok that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlokFindFirstOrThrowArgs} args - Arguments to find a Blok
     * @example
     * // Get one Blok
     * const blok = await prisma.blok.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BlokFindFirstOrThrowArgs>(args?: SelectSubset<T, BlokFindFirstOrThrowArgs<ExtArgs>>): Prisma__BlokClient<$Result.GetResult<Prisma.$BlokPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bloks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlokFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bloks
     * const bloks = await prisma.blok.findMany()
     * 
     * // Get first 10 Bloks
     * const bloks = await prisma.blok.findMany({ take: 10 })
     * 
     * // Only select the `id_blok`
     * const blokWithId_blokOnly = await prisma.blok.findMany({ select: { id_blok: true } })
     * 
     */
    findMany<T extends BlokFindManyArgs>(args?: SelectSubset<T, BlokFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlokPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Blok.
     * @param {BlokCreateArgs} args - Arguments to create a Blok.
     * @example
     * // Create one Blok
     * const Blok = await prisma.blok.create({
     *   data: {
     *     // ... data to create a Blok
     *   }
     * })
     * 
     */
    create<T extends BlokCreateArgs>(args: SelectSubset<T, BlokCreateArgs<ExtArgs>>): Prisma__BlokClient<$Result.GetResult<Prisma.$BlokPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bloks.
     * @param {BlokCreateManyArgs} args - Arguments to create many Bloks.
     * @example
     * // Create many Bloks
     * const blok = await prisma.blok.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BlokCreateManyArgs>(args?: SelectSubset<T, BlokCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bloks and returns the data saved in the database.
     * @param {BlokCreateManyAndReturnArgs} args - Arguments to create many Bloks.
     * @example
     * // Create many Bloks
     * const blok = await prisma.blok.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bloks and only return the `id_blok`
     * const blokWithId_blokOnly = await prisma.blok.createManyAndReturn({
     *   select: { id_blok: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BlokCreateManyAndReturnArgs>(args?: SelectSubset<T, BlokCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlokPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Blok.
     * @param {BlokDeleteArgs} args - Arguments to delete one Blok.
     * @example
     * // Delete one Blok
     * const Blok = await prisma.blok.delete({
     *   where: {
     *     // ... filter to delete one Blok
     *   }
     * })
     * 
     */
    delete<T extends BlokDeleteArgs>(args: SelectSubset<T, BlokDeleteArgs<ExtArgs>>): Prisma__BlokClient<$Result.GetResult<Prisma.$BlokPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Blok.
     * @param {BlokUpdateArgs} args - Arguments to update one Blok.
     * @example
     * // Update one Blok
     * const blok = await prisma.blok.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BlokUpdateArgs>(args: SelectSubset<T, BlokUpdateArgs<ExtArgs>>): Prisma__BlokClient<$Result.GetResult<Prisma.$BlokPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bloks.
     * @param {BlokDeleteManyArgs} args - Arguments to filter Bloks to delete.
     * @example
     * // Delete a few Bloks
     * const { count } = await prisma.blok.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BlokDeleteManyArgs>(args?: SelectSubset<T, BlokDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bloks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlokUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bloks
     * const blok = await prisma.blok.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BlokUpdateManyArgs>(args: SelectSubset<T, BlokUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bloks and returns the data updated in the database.
     * @param {BlokUpdateManyAndReturnArgs} args - Arguments to update many Bloks.
     * @example
     * // Update many Bloks
     * const blok = await prisma.blok.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bloks and only return the `id_blok`
     * const blokWithId_blokOnly = await prisma.blok.updateManyAndReturn({
     *   select: { id_blok: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BlokUpdateManyAndReturnArgs>(args: SelectSubset<T, BlokUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlokPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Blok.
     * @param {BlokUpsertArgs} args - Arguments to update or create a Blok.
     * @example
     * // Update or create a Blok
     * const blok = await prisma.blok.upsert({
     *   create: {
     *     // ... data to create a Blok
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Blok we want to update
     *   }
     * })
     */
    upsert<T extends BlokUpsertArgs>(args: SelectSubset<T, BlokUpsertArgs<ExtArgs>>): Prisma__BlokClient<$Result.GetResult<Prisma.$BlokPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bloks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlokCountArgs} args - Arguments to filter Bloks to count.
     * @example
     * // Count the number of Bloks
     * const count = await prisma.blok.count({
     *   where: {
     *     // ... the filter for the Bloks we want to count
     *   }
     * })
    **/
    count<T extends BlokCountArgs>(
      args?: Subset<T, BlokCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BlokCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Blok.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlokAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BlokAggregateArgs>(args: Subset<T, BlokAggregateArgs>): Prisma.PrismaPromise<GetBlokAggregateType<T>>

    /**
     * Group by Blok.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlokGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BlokGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BlokGroupByArgs['orderBy'] }
        : { orderBy?: BlokGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BlokGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlokGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Blok model
   */
  readonly fields: BlokFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Blok.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BlokClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    jenazah<T extends Blok$jenazahArgs<ExtArgs> = {}>(args?: Subset<T, Blok$jenazahArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JenazahPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    makam<T extends Blok$makamArgs<ExtArgs> = {}>(args?: Subset<T, Blok$makamArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$makamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    makamStatus<T extends Blok$makamStatusArgs<ExtArgs> = {}>(args?: Subset<T, Blok$makamStatusArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$makamStatusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Blok model
   */
  interface BlokFieldRefs {
    readonly id_blok: FieldRef<"Blok", 'String'>
    readonly lokasi: FieldRef<"Blok", 'String'>
    readonly tanggal_pemakaman_terakhir: FieldRef<"Blok", 'DateTime'>
    readonly status_blok: FieldRef<"Blok", 'String'>
    readonly status_pesanan: FieldRef<"Blok", 'String'>
    readonly availability: FieldRef<"Blok", 'String'>
    readonly status_pembayaran: FieldRef<"Blok", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Blok findUnique
   */
  export type BlokFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blok
     */
    select?: BlokSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blok
     */
    omit?: BlokOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlokInclude<ExtArgs> | null
    /**
     * Filter, which Blok to fetch.
     */
    where: BlokWhereUniqueInput
  }

  /**
   * Blok findUniqueOrThrow
   */
  export type BlokFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blok
     */
    select?: BlokSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blok
     */
    omit?: BlokOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlokInclude<ExtArgs> | null
    /**
     * Filter, which Blok to fetch.
     */
    where: BlokWhereUniqueInput
  }

  /**
   * Blok findFirst
   */
  export type BlokFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blok
     */
    select?: BlokSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blok
     */
    omit?: BlokOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlokInclude<ExtArgs> | null
    /**
     * Filter, which Blok to fetch.
     */
    where?: BlokWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bloks to fetch.
     */
    orderBy?: BlokOrderByWithRelationInput | BlokOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bloks.
     */
    cursor?: BlokWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bloks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bloks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bloks.
     */
    distinct?: BlokScalarFieldEnum | BlokScalarFieldEnum[]
  }

  /**
   * Blok findFirstOrThrow
   */
  export type BlokFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blok
     */
    select?: BlokSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blok
     */
    omit?: BlokOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlokInclude<ExtArgs> | null
    /**
     * Filter, which Blok to fetch.
     */
    where?: BlokWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bloks to fetch.
     */
    orderBy?: BlokOrderByWithRelationInput | BlokOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bloks.
     */
    cursor?: BlokWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bloks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bloks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bloks.
     */
    distinct?: BlokScalarFieldEnum | BlokScalarFieldEnum[]
  }

  /**
   * Blok findMany
   */
  export type BlokFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blok
     */
    select?: BlokSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blok
     */
    omit?: BlokOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlokInclude<ExtArgs> | null
    /**
     * Filter, which Bloks to fetch.
     */
    where?: BlokWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bloks to fetch.
     */
    orderBy?: BlokOrderByWithRelationInput | BlokOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bloks.
     */
    cursor?: BlokWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bloks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bloks.
     */
    skip?: number
    distinct?: BlokScalarFieldEnum | BlokScalarFieldEnum[]
  }

  /**
   * Blok create
   */
  export type BlokCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blok
     */
    select?: BlokSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blok
     */
    omit?: BlokOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlokInclude<ExtArgs> | null
    /**
     * The data needed to create a Blok.
     */
    data?: XOR<BlokCreateInput, BlokUncheckedCreateInput>
  }

  /**
   * Blok createMany
   */
  export type BlokCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bloks.
     */
    data: BlokCreateManyInput | BlokCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Blok createManyAndReturn
   */
  export type BlokCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blok
     */
    select?: BlokSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Blok
     */
    omit?: BlokOmit<ExtArgs> | null
    /**
     * The data used to create many Bloks.
     */
    data: BlokCreateManyInput | BlokCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Blok update
   */
  export type BlokUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blok
     */
    select?: BlokSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blok
     */
    omit?: BlokOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlokInclude<ExtArgs> | null
    /**
     * The data needed to update a Blok.
     */
    data: XOR<BlokUpdateInput, BlokUncheckedUpdateInput>
    /**
     * Choose, which Blok to update.
     */
    where: BlokWhereUniqueInput
  }

  /**
   * Blok updateMany
   */
  export type BlokUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bloks.
     */
    data: XOR<BlokUpdateManyMutationInput, BlokUncheckedUpdateManyInput>
    /**
     * Filter which Bloks to update
     */
    where?: BlokWhereInput
    /**
     * Limit how many Bloks to update.
     */
    limit?: number
  }

  /**
   * Blok updateManyAndReturn
   */
  export type BlokUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blok
     */
    select?: BlokSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Blok
     */
    omit?: BlokOmit<ExtArgs> | null
    /**
     * The data used to update Bloks.
     */
    data: XOR<BlokUpdateManyMutationInput, BlokUncheckedUpdateManyInput>
    /**
     * Filter which Bloks to update
     */
    where?: BlokWhereInput
    /**
     * Limit how many Bloks to update.
     */
    limit?: number
  }

  /**
   * Blok upsert
   */
  export type BlokUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blok
     */
    select?: BlokSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blok
     */
    omit?: BlokOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlokInclude<ExtArgs> | null
    /**
     * The filter to search for the Blok to update in case it exists.
     */
    where: BlokWhereUniqueInput
    /**
     * In case the Blok found by the `where` argument doesn't exist, create a new Blok with this data.
     */
    create: XOR<BlokCreateInput, BlokUncheckedCreateInput>
    /**
     * In case the Blok was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BlokUpdateInput, BlokUncheckedUpdateInput>
  }

  /**
   * Blok delete
   */
  export type BlokDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blok
     */
    select?: BlokSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blok
     */
    omit?: BlokOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlokInclude<ExtArgs> | null
    /**
     * Filter which Blok to delete.
     */
    where: BlokWhereUniqueInput
  }

  /**
   * Blok deleteMany
   */
  export type BlokDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bloks to delete
     */
    where?: BlokWhereInput
    /**
     * Limit how many Bloks to delete.
     */
    limit?: number
  }

  /**
   * Blok.jenazah
   */
  export type Blok$jenazahArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jenazah
     */
    select?: JenazahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jenazah
     */
    omit?: JenazahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenazahInclude<ExtArgs> | null
    where?: JenazahWhereInput
    orderBy?: JenazahOrderByWithRelationInput | JenazahOrderByWithRelationInput[]
    cursor?: JenazahWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JenazahScalarFieldEnum | JenazahScalarFieldEnum[]
  }

  /**
   * Blok.makam
   */
  export type Blok$makamArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makam
     */
    select?: makamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the makam
     */
    omit?: makamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamInclude<ExtArgs> | null
    where?: makamWhereInput
    orderBy?: makamOrderByWithRelationInput | makamOrderByWithRelationInput[]
    cursor?: makamWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MakamScalarFieldEnum | MakamScalarFieldEnum[]
  }

  /**
   * Blok.makamStatus
   */
  export type Blok$makamStatusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makamStatus
     */
    select?: makamStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the makamStatus
     */
    omit?: makamStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamStatusInclude<ExtArgs> | null
    where?: makamStatusWhereInput
    orderBy?: makamStatusOrderByWithRelationInput | makamStatusOrderByWithRelationInput[]
    cursor?: makamStatusWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MakamStatusScalarFieldEnum | MakamStatusScalarFieldEnum[]
  }

  /**
   * Blok without action
   */
  export type BlokDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blok
     */
    select?: BlokSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blok
     */
    omit?: BlokOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlokInclude<ExtArgs> | null
  }


  /**
   * Model makam
   */

  export type AggregateMakam = {
    _count: MakamCountAggregateOutputType | null
    _avg: MakamAvgAggregateOutputType | null
    _sum: MakamSumAggregateOutputType | null
    _min: MakamMinAggregateOutputType | null
    _max: MakamMaxAggregateOutputType | null
  }

  export type MakamAvgAggregateOutputType = {
    id: number | null
  }

  export type MakamSumAggregateOutputType = {
    id: number | null
  }

  export type MakamMinAggregateOutputType = {
    id: number | null
    nama: string | null
    lokasi: string | null
    silsilah: string | null
    ext: string | null
    masa_aktif: Date | null
    nama_penanggung_jawab: string | null
    kontak_penanggung_jawab: string | null
    description: string | null
    payment: string | null
    approved: string | null
    created_at: Date | null
    updated_at: Date | null
    tanggal_pemesanan: Date | null
    userId: string | null
    pjId: string | null
    jenazahId: string | null
    blokId: string | null
  }

  export type MakamMaxAggregateOutputType = {
    id: number | null
    nama: string | null
    lokasi: string | null
    silsilah: string | null
    ext: string | null
    masa_aktif: Date | null
    nama_penanggung_jawab: string | null
    kontak_penanggung_jawab: string | null
    description: string | null
    payment: string | null
    approved: string | null
    created_at: Date | null
    updated_at: Date | null
    tanggal_pemesanan: Date | null
    userId: string | null
    pjId: string | null
    jenazahId: string | null
    blokId: string | null
  }

  export type MakamCountAggregateOutputType = {
    id: number
    nama: number
    lokasi: number
    silsilah: number
    ext: number
    masa_aktif: number
    nama_penanggung_jawab: number
    kontak_penanggung_jawab: number
    description: number
    payment: number
    approved: number
    created_at: number
    updated_at: number
    tanggal_pemesanan: number
    userId: number
    pjId: number
    jenazahId: number
    blokId: number
    _all: number
  }


  export type MakamAvgAggregateInputType = {
    id?: true
  }

  export type MakamSumAggregateInputType = {
    id?: true
  }

  export type MakamMinAggregateInputType = {
    id?: true
    nama?: true
    lokasi?: true
    silsilah?: true
    ext?: true
    masa_aktif?: true
    nama_penanggung_jawab?: true
    kontak_penanggung_jawab?: true
    description?: true
    payment?: true
    approved?: true
    created_at?: true
    updated_at?: true
    tanggal_pemesanan?: true
    userId?: true
    pjId?: true
    jenazahId?: true
    blokId?: true
  }

  export type MakamMaxAggregateInputType = {
    id?: true
    nama?: true
    lokasi?: true
    silsilah?: true
    ext?: true
    masa_aktif?: true
    nama_penanggung_jawab?: true
    kontak_penanggung_jawab?: true
    description?: true
    payment?: true
    approved?: true
    created_at?: true
    updated_at?: true
    tanggal_pemesanan?: true
    userId?: true
    pjId?: true
    jenazahId?: true
    blokId?: true
  }

  export type MakamCountAggregateInputType = {
    id?: true
    nama?: true
    lokasi?: true
    silsilah?: true
    ext?: true
    masa_aktif?: true
    nama_penanggung_jawab?: true
    kontak_penanggung_jawab?: true
    description?: true
    payment?: true
    approved?: true
    created_at?: true
    updated_at?: true
    tanggal_pemesanan?: true
    userId?: true
    pjId?: true
    jenazahId?: true
    blokId?: true
    _all?: true
  }

  export type MakamAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which makam to aggregate.
     */
    where?: makamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of makams to fetch.
     */
    orderBy?: makamOrderByWithRelationInput | makamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: makamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` makams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` makams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned makams
    **/
    _count?: true | MakamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MakamAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MakamSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MakamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MakamMaxAggregateInputType
  }

  export type GetMakamAggregateType<T extends MakamAggregateArgs> = {
        [P in keyof T & keyof AggregateMakam]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMakam[P]>
      : GetScalarType<T[P], AggregateMakam[P]>
  }




  export type makamGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: makamWhereInput
    orderBy?: makamOrderByWithAggregationInput | makamOrderByWithAggregationInput[]
    by: MakamScalarFieldEnum[] | MakamScalarFieldEnum
    having?: makamScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MakamCountAggregateInputType | true
    _avg?: MakamAvgAggregateInputType
    _sum?: MakamSumAggregateInputType
    _min?: MakamMinAggregateInputType
    _max?: MakamMaxAggregateInputType
  }

  export type MakamGroupByOutputType = {
    id: number
    nama: string
    lokasi: string
    silsilah: string
    ext: string | null
    masa_aktif: Date | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at: Date
    updated_at: Date
    tanggal_pemesanan: Date | null
    userId: string | null
    pjId: string | null
    jenazahId: string | null
    blokId: string | null
    _count: MakamCountAggregateOutputType | null
    _avg: MakamAvgAggregateOutputType | null
    _sum: MakamSumAggregateOutputType | null
    _min: MakamMinAggregateOutputType | null
    _max: MakamMaxAggregateOutputType | null
  }

  type GetMakamGroupByPayload<T extends makamGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MakamGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MakamGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MakamGroupByOutputType[P]>
            : GetScalarType<T[P], MakamGroupByOutputType[P]>
        }
      >
    >


  export type makamSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama?: boolean
    lokasi?: boolean
    silsilah?: boolean
    ext?: boolean
    masa_aktif?: boolean
    nama_penanggung_jawab?: boolean
    kontak_penanggung_jawab?: boolean
    description?: boolean
    payment?: boolean
    approved?: boolean
    created_at?: boolean
    updated_at?: boolean
    tanggal_pemesanan?: boolean
    userId?: boolean
    pjId?: boolean
    jenazahId?: boolean
    blokId?: boolean
    user?: boolean | makam$userArgs<ExtArgs>
    pj?: boolean | makam$pjArgs<ExtArgs>
    jenazah?: boolean | makam$jenazahArgs<ExtArgs>
    blok?: boolean | makam$blokArgs<ExtArgs>
  }, ExtArgs["result"]["makam"]>

  export type makamSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama?: boolean
    lokasi?: boolean
    silsilah?: boolean
    ext?: boolean
    masa_aktif?: boolean
    nama_penanggung_jawab?: boolean
    kontak_penanggung_jawab?: boolean
    description?: boolean
    payment?: boolean
    approved?: boolean
    created_at?: boolean
    updated_at?: boolean
    tanggal_pemesanan?: boolean
    userId?: boolean
    pjId?: boolean
    jenazahId?: boolean
    blokId?: boolean
    user?: boolean | makam$userArgs<ExtArgs>
    pj?: boolean | makam$pjArgs<ExtArgs>
    jenazah?: boolean | makam$jenazahArgs<ExtArgs>
    blok?: boolean | makam$blokArgs<ExtArgs>
  }, ExtArgs["result"]["makam"]>

  export type makamSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama?: boolean
    lokasi?: boolean
    silsilah?: boolean
    ext?: boolean
    masa_aktif?: boolean
    nama_penanggung_jawab?: boolean
    kontak_penanggung_jawab?: boolean
    description?: boolean
    payment?: boolean
    approved?: boolean
    created_at?: boolean
    updated_at?: boolean
    tanggal_pemesanan?: boolean
    userId?: boolean
    pjId?: boolean
    jenazahId?: boolean
    blokId?: boolean
    user?: boolean | makam$userArgs<ExtArgs>
    pj?: boolean | makam$pjArgs<ExtArgs>
    jenazah?: boolean | makam$jenazahArgs<ExtArgs>
    blok?: boolean | makam$blokArgs<ExtArgs>
  }, ExtArgs["result"]["makam"]>

  export type makamSelectScalar = {
    id?: boolean
    nama?: boolean
    lokasi?: boolean
    silsilah?: boolean
    ext?: boolean
    masa_aktif?: boolean
    nama_penanggung_jawab?: boolean
    kontak_penanggung_jawab?: boolean
    description?: boolean
    payment?: boolean
    approved?: boolean
    created_at?: boolean
    updated_at?: boolean
    tanggal_pemesanan?: boolean
    userId?: boolean
    pjId?: boolean
    jenazahId?: boolean
    blokId?: boolean
  }

  export type makamOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nama" | "lokasi" | "silsilah" | "ext" | "masa_aktif" | "nama_penanggung_jawab" | "kontak_penanggung_jawab" | "description" | "payment" | "approved" | "created_at" | "updated_at" | "tanggal_pemesanan" | "userId" | "pjId" | "jenazahId" | "blokId", ExtArgs["result"]["makam"]>
  export type makamInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | makam$userArgs<ExtArgs>
    pj?: boolean | makam$pjArgs<ExtArgs>
    jenazah?: boolean | makam$jenazahArgs<ExtArgs>
    blok?: boolean | makam$blokArgs<ExtArgs>
  }
  export type makamIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | makam$userArgs<ExtArgs>
    pj?: boolean | makam$pjArgs<ExtArgs>
    jenazah?: boolean | makam$jenazahArgs<ExtArgs>
    blok?: boolean | makam$blokArgs<ExtArgs>
  }
  export type makamIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | makam$userArgs<ExtArgs>
    pj?: boolean | makam$pjArgs<ExtArgs>
    jenazah?: boolean | makam$jenazahArgs<ExtArgs>
    blok?: boolean | makam$blokArgs<ExtArgs>
  }

  export type $makamPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "makam"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      pj: Prisma.$Penanggung_JawabPayload<ExtArgs> | null
      jenazah: Prisma.$JenazahPayload<ExtArgs> | null
      blok: Prisma.$BlokPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nama: string
      lokasi: string
      silsilah: string
      ext: string | null
      masa_aktif: Date | null
      nama_penanggung_jawab: string
      kontak_penanggung_jawab: string
      description: string
      payment: string
      approved: string
      created_at: Date
      updated_at: Date
      tanggal_pemesanan: Date | null
      userId: string | null
      pjId: string | null
      jenazahId: string | null
      blokId: string | null
    }, ExtArgs["result"]["makam"]>
    composites: {}
  }

  type makamGetPayload<S extends boolean | null | undefined | makamDefaultArgs> = $Result.GetResult<Prisma.$makamPayload, S>

  type makamCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<makamFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MakamCountAggregateInputType | true
    }

  export interface makamDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['makam'], meta: { name: 'makam' } }
    /**
     * Find zero or one Makam that matches the filter.
     * @param {makamFindUniqueArgs} args - Arguments to find a Makam
     * @example
     * // Get one Makam
     * const makam = await prisma.makam.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends makamFindUniqueArgs>(args: SelectSubset<T, makamFindUniqueArgs<ExtArgs>>): Prisma__makamClient<$Result.GetResult<Prisma.$makamPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Makam that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {makamFindUniqueOrThrowArgs} args - Arguments to find a Makam
     * @example
     * // Get one Makam
     * const makam = await prisma.makam.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends makamFindUniqueOrThrowArgs>(args: SelectSubset<T, makamFindUniqueOrThrowArgs<ExtArgs>>): Prisma__makamClient<$Result.GetResult<Prisma.$makamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Makam that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {makamFindFirstArgs} args - Arguments to find a Makam
     * @example
     * // Get one Makam
     * const makam = await prisma.makam.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends makamFindFirstArgs>(args?: SelectSubset<T, makamFindFirstArgs<ExtArgs>>): Prisma__makamClient<$Result.GetResult<Prisma.$makamPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Makam that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {makamFindFirstOrThrowArgs} args - Arguments to find a Makam
     * @example
     * // Get one Makam
     * const makam = await prisma.makam.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends makamFindFirstOrThrowArgs>(args?: SelectSubset<T, makamFindFirstOrThrowArgs<ExtArgs>>): Prisma__makamClient<$Result.GetResult<Prisma.$makamPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Makams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {makamFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Makams
     * const makams = await prisma.makam.findMany()
     * 
     * // Get first 10 Makams
     * const makams = await prisma.makam.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const makamWithIdOnly = await prisma.makam.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends makamFindManyArgs>(args?: SelectSubset<T, makamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$makamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Makam.
     * @param {makamCreateArgs} args - Arguments to create a Makam.
     * @example
     * // Create one Makam
     * const Makam = await prisma.makam.create({
     *   data: {
     *     // ... data to create a Makam
     *   }
     * })
     * 
     */
    create<T extends makamCreateArgs>(args: SelectSubset<T, makamCreateArgs<ExtArgs>>): Prisma__makamClient<$Result.GetResult<Prisma.$makamPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Makams.
     * @param {makamCreateManyArgs} args - Arguments to create many Makams.
     * @example
     * // Create many Makams
     * const makam = await prisma.makam.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends makamCreateManyArgs>(args?: SelectSubset<T, makamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Makams and returns the data saved in the database.
     * @param {makamCreateManyAndReturnArgs} args - Arguments to create many Makams.
     * @example
     * // Create many Makams
     * const makam = await prisma.makam.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Makams and only return the `id`
     * const makamWithIdOnly = await prisma.makam.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends makamCreateManyAndReturnArgs>(args?: SelectSubset<T, makamCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$makamPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Makam.
     * @param {makamDeleteArgs} args - Arguments to delete one Makam.
     * @example
     * // Delete one Makam
     * const Makam = await prisma.makam.delete({
     *   where: {
     *     // ... filter to delete one Makam
     *   }
     * })
     * 
     */
    delete<T extends makamDeleteArgs>(args: SelectSubset<T, makamDeleteArgs<ExtArgs>>): Prisma__makamClient<$Result.GetResult<Prisma.$makamPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Makam.
     * @param {makamUpdateArgs} args - Arguments to update one Makam.
     * @example
     * // Update one Makam
     * const makam = await prisma.makam.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends makamUpdateArgs>(args: SelectSubset<T, makamUpdateArgs<ExtArgs>>): Prisma__makamClient<$Result.GetResult<Prisma.$makamPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Makams.
     * @param {makamDeleteManyArgs} args - Arguments to filter Makams to delete.
     * @example
     * // Delete a few Makams
     * const { count } = await prisma.makam.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends makamDeleteManyArgs>(args?: SelectSubset<T, makamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Makams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {makamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Makams
     * const makam = await prisma.makam.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends makamUpdateManyArgs>(args: SelectSubset<T, makamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Makams and returns the data updated in the database.
     * @param {makamUpdateManyAndReturnArgs} args - Arguments to update many Makams.
     * @example
     * // Update many Makams
     * const makam = await prisma.makam.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Makams and only return the `id`
     * const makamWithIdOnly = await prisma.makam.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends makamUpdateManyAndReturnArgs>(args: SelectSubset<T, makamUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$makamPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Makam.
     * @param {makamUpsertArgs} args - Arguments to update or create a Makam.
     * @example
     * // Update or create a Makam
     * const makam = await prisma.makam.upsert({
     *   create: {
     *     // ... data to create a Makam
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Makam we want to update
     *   }
     * })
     */
    upsert<T extends makamUpsertArgs>(args: SelectSubset<T, makamUpsertArgs<ExtArgs>>): Prisma__makamClient<$Result.GetResult<Prisma.$makamPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Makams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {makamCountArgs} args - Arguments to filter Makams to count.
     * @example
     * // Count the number of Makams
     * const count = await prisma.makam.count({
     *   where: {
     *     // ... the filter for the Makams we want to count
     *   }
     * })
    **/
    count<T extends makamCountArgs>(
      args?: Subset<T, makamCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MakamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Makam.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MakamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MakamAggregateArgs>(args: Subset<T, MakamAggregateArgs>): Prisma.PrismaPromise<GetMakamAggregateType<T>>

    /**
     * Group by Makam.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {makamGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends makamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: makamGroupByArgs['orderBy'] }
        : { orderBy?: makamGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, makamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMakamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the makam model
   */
  readonly fields: makamFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for makam.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__makamClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends makam$userArgs<ExtArgs> = {}>(args?: Subset<T, makam$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    pj<T extends makam$pjArgs<ExtArgs> = {}>(args?: Subset<T, makam$pjArgs<ExtArgs>>): Prisma__Penanggung_JawabClient<$Result.GetResult<Prisma.$Penanggung_JawabPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    jenazah<T extends makam$jenazahArgs<ExtArgs> = {}>(args?: Subset<T, makam$jenazahArgs<ExtArgs>>): Prisma__JenazahClient<$Result.GetResult<Prisma.$JenazahPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    blok<T extends makam$blokArgs<ExtArgs> = {}>(args?: Subset<T, makam$blokArgs<ExtArgs>>): Prisma__BlokClient<$Result.GetResult<Prisma.$BlokPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the makam model
   */
  interface makamFieldRefs {
    readonly id: FieldRef<"makam", 'Int'>
    readonly nama: FieldRef<"makam", 'String'>
    readonly lokasi: FieldRef<"makam", 'String'>
    readonly silsilah: FieldRef<"makam", 'String'>
    readonly ext: FieldRef<"makam", 'String'>
    readonly masa_aktif: FieldRef<"makam", 'DateTime'>
    readonly nama_penanggung_jawab: FieldRef<"makam", 'String'>
    readonly kontak_penanggung_jawab: FieldRef<"makam", 'String'>
    readonly description: FieldRef<"makam", 'String'>
    readonly payment: FieldRef<"makam", 'String'>
    readonly approved: FieldRef<"makam", 'String'>
    readonly created_at: FieldRef<"makam", 'DateTime'>
    readonly updated_at: FieldRef<"makam", 'DateTime'>
    readonly tanggal_pemesanan: FieldRef<"makam", 'DateTime'>
    readonly userId: FieldRef<"makam", 'String'>
    readonly pjId: FieldRef<"makam", 'String'>
    readonly jenazahId: FieldRef<"makam", 'String'>
    readonly blokId: FieldRef<"makam", 'String'>
  }
    

  // Custom InputTypes
  /**
   * makam findUnique
   */
  export type makamFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makam
     */
    select?: makamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the makam
     */
    omit?: makamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamInclude<ExtArgs> | null
    /**
     * Filter, which makam to fetch.
     */
    where: makamWhereUniqueInput
  }

  /**
   * makam findUniqueOrThrow
   */
  export type makamFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makam
     */
    select?: makamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the makam
     */
    omit?: makamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamInclude<ExtArgs> | null
    /**
     * Filter, which makam to fetch.
     */
    where: makamWhereUniqueInput
  }

  /**
   * makam findFirst
   */
  export type makamFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makam
     */
    select?: makamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the makam
     */
    omit?: makamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamInclude<ExtArgs> | null
    /**
     * Filter, which makam to fetch.
     */
    where?: makamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of makams to fetch.
     */
    orderBy?: makamOrderByWithRelationInput | makamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for makams.
     */
    cursor?: makamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` makams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` makams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of makams.
     */
    distinct?: MakamScalarFieldEnum | MakamScalarFieldEnum[]
  }

  /**
   * makam findFirstOrThrow
   */
  export type makamFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makam
     */
    select?: makamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the makam
     */
    omit?: makamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamInclude<ExtArgs> | null
    /**
     * Filter, which makam to fetch.
     */
    where?: makamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of makams to fetch.
     */
    orderBy?: makamOrderByWithRelationInput | makamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for makams.
     */
    cursor?: makamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` makams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` makams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of makams.
     */
    distinct?: MakamScalarFieldEnum | MakamScalarFieldEnum[]
  }

  /**
   * makam findMany
   */
  export type makamFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makam
     */
    select?: makamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the makam
     */
    omit?: makamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamInclude<ExtArgs> | null
    /**
     * Filter, which makams to fetch.
     */
    where?: makamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of makams to fetch.
     */
    orderBy?: makamOrderByWithRelationInput | makamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing makams.
     */
    cursor?: makamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` makams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` makams.
     */
    skip?: number
    distinct?: MakamScalarFieldEnum | MakamScalarFieldEnum[]
  }

  /**
   * makam create
   */
  export type makamCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makam
     */
    select?: makamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the makam
     */
    omit?: makamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamInclude<ExtArgs> | null
    /**
     * The data needed to create a makam.
     */
    data: XOR<makamCreateInput, makamUncheckedCreateInput>
  }

  /**
   * makam createMany
   */
  export type makamCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many makams.
     */
    data: makamCreateManyInput | makamCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * makam createManyAndReturn
   */
  export type makamCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makam
     */
    select?: makamSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the makam
     */
    omit?: makamOmit<ExtArgs> | null
    /**
     * The data used to create many makams.
     */
    data: makamCreateManyInput | makamCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * makam update
   */
  export type makamUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makam
     */
    select?: makamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the makam
     */
    omit?: makamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamInclude<ExtArgs> | null
    /**
     * The data needed to update a makam.
     */
    data: XOR<makamUpdateInput, makamUncheckedUpdateInput>
    /**
     * Choose, which makam to update.
     */
    where: makamWhereUniqueInput
  }

  /**
   * makam updateMany
   */
  export type makamUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update makams.
     */
    data: XOR<makamUpdateManyMutationInput, makamUncheckedUpdateManyInput>
    /**
     * Filter which makams to update
     */
    where?: makamWhereInput
    /**
     * Limit how many makams to update.
     */
    limit?: number
  }

  /**
   * makam updateManyAndReturn
   */
  export type makamUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makam
     */
    select?: makamSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the makam
     */
    omit?: makamOmit<ExtArgs> | null
    /**
     * The data used to update makams.
     */
    data: XOR<makamUpdateManyMutationInput, makamUncheckedUpdateManyInput>
    /**
     * Filter which makams to update
     */
    where?: makamWhereInput
    /**
     * Limit how many makams to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * makam upsert
   */
  export type makamUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makam
     */
    select?: makamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the makam
     */
    omit?: makamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamInclude<ExtArgs> | null
    /**
     * The filter to search for the makam to update in case it exists.
     */
    where: makamWhereUniqueInput
    /**
     * In case the makam found by the `where` argument doesn't exist, create a new makam with this data.
     */
    create: XOR<makamCreateInput, makamUncheckedCreateInput>
    /**
     * In case the makam was found with the provided `where` argument, update it with this data.
     */
    update: XOR<makamUpdateInput, makamUncheckedUpdateInput>
  }

  /**
   * makam delete
   */
  export type makamDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makam
     */
    select?: makamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the makam
     */
    omit?: makamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamInclude<ExtArgs> | null
    /**
     * Filter which makam to delete.
     */
    where: makamWhereUniqueInput
  }

  /**
   * makam deleteMany
   */
  export type makamDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which makams to delete
     */
    where?: makamWhereInput
    /**
     * Limit how many makams to delete.
     */
    limit?: number
  }

  /**
   * makam.user
   */
  export type makam$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * makam.pj
   */
  export type makam$pjArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penanggung_Jawab
     */
    select?: Penanggung_JawabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penanggung_Jawab
     */
    omit?: Penanggung_JawabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Penanggung_JawabInclude<ExtArgs> | null
    where?: Penanggung_JawabWhereInput
  }

  /**
   * makam.jenazah
   */
  export type makam$jenazahArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jenazah
     */
    select?: JenazahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jenazah
     */
    omit?: JenazahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenazahInclude<ExtArgs> | null
    where?: JenazahWhereInput
  }

  /**
   * makam.blok
   */
  export type makam$blokArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blok
     */
    select?: BlokSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blok
     */
    omit?: BlokOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlokInclude<ExtArgs> | null
    where?: BlokWhereInput
  }

  /**
   * makam without action
   */
  export type makamDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makam
     */
    select?: makamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the makam
     */
    omit?: makamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamInclude<ExtArgs> | null
  }


  /**
   * Model makamStatus
   */

  export type AggregateMakamStatus = {
    _count: MakamStatusCountAggregateOutputType | null
    _avg: MakamStatusAvgAggregateOutputType | null
    _sum: MakamStatusSumAggregateOutputType | null
    _min: MakamStatusMinAggregateOutputType | null
    _max: MakamStatusMaxAggregateOutputType | null
  }

  export type MakamStatusAvgAggregateOutputType = {
    id: number | null
  }

  export type MakamStatusSumAggregateOutputType = {
    id: number | null
  }

  export type MakamStatusMinAggregateOutputType = {
    id: number | null
    nama: string | null
    lokasi: string | null
    silsilah: string | null
    ext: string | null
    masa_aktif: Date | null
    nama_penanggung_jawab: string | null
    kontak_penanggung_jawab: string | null
    description: string | null
    payment: string | null
    approved: string | null
    created_at: Date | null
    updated_at: Date | null
    tanggal_pemesanan: Date | null
    userId: string | null
    pjId: string | null
    jenazahId: string | null
    blokId: string | null
  }

  export type MakamStatusMaxAggregateOutputType = {
    id: number | null
    nama: string | null
    lokasi: string | null
    silsilah: string | null
    ext: string | null
    masa_aktif: Date | null
    nama_penanggung_jawab: string | null
    kontak_penanggung_jawab: string | null
    description: string | null
    payment: string | null
    approved: string | null
    created_at: Date | null
    updated_at: Date | null
    tanggal_pemesanan: Date | null
    userId: string | null
    pjId: string | null
    jenazahId: string | null
    blokId: string | null
  }

  export type MakamStatusCountAggregateOutputType = {
    id: number
    nama: number
    lokasi: number
    silsilah: number
    ext: number
    masa_aktif: number
    nama_penanggung_jawab: number
    kontak_penanggung_jawab: number
    description: number
    payment: number
    approved: number
    created_at: number
    updated_at: number
    tanggal_pemesanan: number
    userId: number
    pjId: number
    jenazahId: number
    blokId: number
    _all: number
  }


  export type MakamStatusAvgAggregateInputType = {
    id?: true
  }

  export type MakamStatusSumAggregateInputType = {
    id?: true
  }

  export type MakamStatusMinAggregateInputType = {
    id?: true
    nama?: true
    lokasi?: true
    silsilah?: true
    ext?: true
    masa_aktif?: true
    nama_penanggung_jawab?: true
    kontak_penanggung_jawab?: true
    description?: true
    payment?: true
    approved?: true
    created_at?: true
    updated_at?: true
    tanggal_pemesanan?: true
    userId?: true
    pjId?: true
    jenazahId?: true
    blokId?: true
  }

  export type MakamStatusMaxAggregateInputType = {
    id?: true
    nama?: true
    lokasi?: true
    silsilah?: true
    ext?: true
    masa_aktif?: true
    nama_penanggung_jawab?: true
    kontak_penanggung_jawab?: true
    description?: true
    payment?: true
    approved?: true
    created_at?: true
    updated_at?: true
    tanggal_pemesanan?: true
    userId?: true
    pjId?: true
    jenazahId?: true
    blokId?: true
  }

  export type MakamStatusCountAggregateInputType = {
    id?: true
    nama?: true
    lokasi?: true
    silsilah?: true
    ext?: true
    masa_aktif?: true
    nama_penanggung_jawab?: true
    kontak_penanggung_jawab?: true
    description?: true
    payment?: true
    approved?: true
    created_at?: true
    updated_at?: true
    tanggal_pemesanan?: true
    userId?: true
    pjId?: true
    jenazahId?: true
    blokId?: true
    _all?: true
  }

  export type MakamStatusAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which makamStatus to aggregate.
     */
    where?: makamStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of makamStatuses to fetch.
     */
    orderBy?: makamStatusOrderByWithRelationInput | makamStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: makamStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` makamStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` makamStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned makamStatuses
    **/
    _count?: true | MakamStatusCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MakamStatusAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MakamStatusSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MakamStatusMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MakamStatusMaxAggregateInputType
  }

  export type GetMakamStatusAggregateType<T extends MakamStatusAggregateArgs> = {
        [P in keyof T & keyof AggregateMakamStatus]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMakamStatus[P]>
      : GetScalarType<T[P], AggregateMakamStatus[P]>
  }




  export type makamStatusGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: makamStatusWhereInput
    orderBy?: makamStatusOrderByWithAggregationInput | makamStatusOrderByWithAggregationInput[]
    by: MakamStatusScalarFieldEnum[] | MakamStatusScalarFieldEnum
    having?: makamStatusScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MakamStatusCountAggregateInputType | true
    _avg?: MakamStatusAvgAggregateInputType
    _sum?: MakamStatusSumAggregateInputType
    _min?: MakamStatusMinAggregateInputType
    _max?: MakamStatusMaxAggregateInputType
  }

  export type MakamStatusGroupByOutputType = {
    id: number
    nama: string
    lokasi: string
    silsilah: string
    ext: string | null
    masa_aktif: Date | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at: Date
    updated_at: Date
    tanggal_pemesanan: Date | null
    userId: string | null
    pjId: string | null
    jenazahId: string | null
    blokId: string | null
    _count: MakamStatusCountAggregateOutputType | null
    _avg: MakamStatusAvgAggregateOutputType | null
    _sum: MakamStatusSumAggregateOutputType | null
    _min: MakamStatusMinAggregateOutputType | null
    _max: MakamStatusMaxAggregateOutputType | null
  }

  type GetMakamStatusGroupByPayload<T extends makamStatusGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MakamStatusGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MakamStatusGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MakamStatusGroupByOutputType[P]>
            : GetScalarType<T[P], MakamStatusGroupByOutputType[P]>
        }
      >
    >


  export type makamStatusSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama?: boolean
    lokasi?: boolean
    silsilah?: boolean
    ext?: boolean
    masa_aktif?: boolean
    nama_penanggung_jawab?: boolean
    kontak_penanggung_jawab?: boolean
    description?: boolean
    payment?: boolean
    approved?: boolean
    created_at?: boolean
    updated_at?: boolean
    tanggal_pemesanan?: boolean
    userId?: boolean
    pjId?: boolean
    jenazahId?: boolean
    blokId?: boolean
    user?: boolean | makamStatus$userArgs<ExtArgs>
    pj?: boolean | makamStatus$pjArgs<ExtArgs>
    jenazah?: boolean | makamStatus$jenazahArgs<ExtArgs>
    blok?: boolean | makamStatus$blokArgs<ExtArgs>
  }, ExtArgs["result"]["makamStatus"]>

  export type makamStatusSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama?: boolean
    lokasi?: boolean
    silsilah?: boolean
    ext?: boolean
    masa_aktif?: boolean
    nama_penanggung_jawab?: boolean
    kontak_penanggung_jawab?: boolean
    description?: boolean
    payment?: boolean
    approved?: boolean
    created_at?: boolean
    updated_at?: boolean
    tanggal_pemesanan?: boolean
    userId?: boolean
    pjId?: boolean
    jenazahId?: boolean
    blokId?: boolean
    user?: boolean | makamStatus$userArgs<ExtArgs>
    pj?: boolean | makamStatus$pjArgs<ExtArgs>
    jenazah?: boolean | makamStatus$jenazahArgs<ExtArgs>
    blok?: boolean | makamStatus$blokArgs<ExtArgs>
  }, ExtArgs["result"]["makamStatus"]>

  export type makamStatusSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama?: boolean
    lokasi?: boolean
    silsilah?: boolean
    ext?: boolean
    masa_aktif?: boolean
    nama_penanggung_jawab?: boolean
    kontak_penanggung_jawab?: boolean
    description?: boolean
    payment?: boolean
    approved?: boolean
    created_at?: boolean
    updated_at?: boolean
    tanggal_pemesanan?: boolean
    userId?: boolean
    pjId?: boolean
    jenazahId?: boolean
    blokId?: boolean
    user?: boolean | makamStatus$userArgs<ExtArgs>
    pj?: boolean | makamStatus$pjArgs<ExtArgs>
    jenazah?: boolean | makamStatus$jenazahArgs<ExtArgs>
    blok?: boolean | makamStatus$blokArgs<ExtArgs>
  }, ExtArgs["result"]["makamStatus"]>

  export type makamStatusSelectScalar = {
    id?: boolean
    nama?: boolean
    lokasi?: boolean
    silsilah?: boolean
    ext?: boolean
    masa_aktif?: boolean
    nama_penanggung_jawab?: boolean
    kontak_penanggung_jawab?: boolean
    description?: boolean
    payment?: boolean
    approved?: boolean
    created_at?: boolean
    updated_at?: boolean
    tanggal_pemesanan?: boolean
    userId?: boolean
    pjId?: boolean
    jenazahId?: boolean
    blokId?: boolean
  }

  export type makamStatusOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nama" | "lokasi" | "silsilah" | "ext" | "masa_aktif" | "nama_penanggung_jawab" | "kontak_penanggung_jawab" | "description" | "payment" | "approved" | "created_at" | "updated_at" | "tanggal_pemesanan" | "userId" | "pjId" | "jenazahId" | "blokId", ExtArgs["result"]["makamStatus"]>
  export type makamStatusInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | makamStatus$userArgs<ExtArgs>
    pj?: boolean | makamStatus$pjArgs<ExtArgs>
    jenazah?: boolean | makamStatus$jenazahArgs<ExtArgs>
    blok?: boolean | makamStatus$blokArgs<ExtArgs>
  }
  export type makamStatusIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | makamStatus$userArgs<ExtArgs>
    pj?: boolean | makamStatus$pjArgs<ExtArgs>
    jenazah?: boolean | makamStatus$jenazahArgs<ExtArgs>
    blok?: boolean | makamStatus$blokArgs<ExtArgs>
  }
  export type makamStatusIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | makamStatus$userArgs<ExtArgs>
    pj?: boolean | makamStatus$pjArgs<ExtArgs>
    jenazah?: boolean | makamStatus$jenazahArgs<ExtArgs>
    blok?: boolean | makamStatus$blokArgs<ExtArgs>
  }

  export type $makamStatusPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "makamStatus"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      pj: Prisma.$Penanggung_JawabPayload<ExtArgs> | null
      jenazah: Prisma.$JenazahPayload<ExtArgs> | null
      blok: Prisma.$BlokPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nama: string
      lokasi: string
      silsilah: string
      ext: string | null
      masa_aktif: Date | null
      nama_penanggung_jawab: string
      kontak_penanggung_jawab: string
      description: string
      payment: string
      approved: string
      created_at: Date
      updated_at: Date
      tanggal_pemesanan: Date | null
      userId: string | null
      pjId: string | null
      jenazahId: string | null
      blokId: string | null
    }, ExtArgs["result"]["makamStatus"]>
    composites: {}
  }

  type makamStatusGetPayload<S extends boolean | null | undefined | makamStatusDefaultArgs> = $Result.GetResult<Prisma.$makamStatusPayload, S>

  type makamStatusCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<makamStatusFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MakamStatusCountAggregateInputType | true
    }

  export interface makamStatusDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['makamStatus'], meta: { name: 'makamStatus' } }
    /**
     * Find zero or one MakamStatus that matches the filter.
     * @param {makamStatusFindUniqueArgs} args - Arguments to find a MakamStatus
     * @example
     * // Get one MakamStatus
     * const makamStatus = await prisma.makamStatus.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends makamStatusFindUniqueArgs>(args: SelectSubset<T, makamStatusFindUniqueArgs<ExtArgs>>): Prisma__makamStatusClient<$Result.GetResult<Prisma.$makamStatusPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MakamStatus that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {makamStatusFindUniqueOrThrowArgs} args - Arguments to find a MakamStatus
     * @example
     * // Get one MakamStatus
     * const makamStatus = await prisma.makamStatus.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends makamStatusFindUniqueOrThrowArgs>(args: SelectSubset<T, makamStatusFindUniqueOrThrowArgs<ExtArgs>>): Prisma__makamStatusClient<$Result.GetResult<Prisma.$makamStatusPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MakamStatus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {makamStatusFindFirstArgs} args - Arguments to find a MakamStatus
     * @example
     * // Get one MakamStatus
     * const makamStatus = await prisma.makamStatus.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends makamStatusFindFirstArgs>(args?: SelectSubset<T, makamStatusFindFirstArgs<ExtArgs>>): Prisma__makamStatusClient<$Result.GetResult<Prisma.$makamStatusPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MakamStatus that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {makamStatusFindFirstOrThrowArgs} args - Arguments to find a MakamStatus
     * @example
     * // Get one MakamStatus
     * const makamStatus = await prisma.makamStatus.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends makamStatusFindFirstOrThrowArgs>(args?: SelectSubset<T, makamStatusFindFirstOrThrowArgs<ExtArgs>>): Prisma__makamStatusClient<$Result.GetResult<Prisma.$makamStatusPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MakamStatuses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {makamStatusFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MakamStatuses
     * const makamStatuses = await prisma.makamStatus.findMany()
     * 
     * // Get first 10 MakamStatuses
     * const makamStatuses = await prisma.makamStatus.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const makamStatusWithIdOnly = await prisma.makamStatus.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends makamStatusFindManyArgs>(args?: SelectSubset<T, makamStatusFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$makamStatusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MakamStatus.
     * @param {makamStatusCreateArgs} args - Arguments to create a MakamStatus.
     * @example
     * // Create one MakamStatus
     * const MakamStatus = await prisma.makamStatus.create({
     *   data: {
     *     // ... data to create a MakamStatus
     *   }
     * })
     * 
     */
    create<T extends makamStatusCreateArgs>(args: SelectSubset<T, makamStatusCreateArgs<ExtArgs>>): Prisma__makamStatusClient<$Result.GetResult<Prisma.$makamStatusPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MakamStatuses.
     * @param {makamStatusCreateManyArgs} args - Arguments to create many MakamStatuses.
     * @example
     * // Create many MakamStatuses
     * const makamStatus = await prisma.makamStatus.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends makamStatusCreateManyArgs>(args?: SelectSubset<T, makamStatusCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MakamStatuses and returns the data saved in the database.
     * @param {makamStatusCreateManyAndReturnArgs} args - Arguments to create many MakamStatuses.
     * @example
     * // Create many MakamStatuses
     * const makamStatus = await prisma.makamStatus.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MakamStatuses and only return the `id`
     * const makamStatusWithIdOnly = await prisma.makamStatus.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends makamStatusCreateManyAndReturnArgs>(args?: SelectSubset<T, makamStatusCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$makamStatusPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MakamStatus.
     * @param {makamStatusDeleteArgs} args - Arguments to delete one MakamStatus.
     * @example
     * // Delete one MakamStatus
     * const MakamStatus = await prisma.makamStatus.delete({
     *   where: {
     *     // ... filter to delete one MakamStatus
     *   }
     * })
     * 
     */
    delete<T extends makamStatusDeleteArgs>(args: SelectSubset<T, makamStatusDeleteArgs<ExtArgs>>): Prisma__makamStatusClient<$Result.GetResult<Prisma.$makamStatusPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MakamStatus.
     * @param {makamStatusUpdateArgs} args - Arguments to update one MakamStatus.
     * @example
     * // Update one MakamStatus
     * const makamStatus = await prisma.makamStatus.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends makamStatusUpdateArgs>(args: SelectSubset<T, makamStatusUpdateArgs<ExtArgs>>): Prisma__makamStatusClient<$Result.GetResult<Prisma.$makamStatusPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MakamStatuses.
     * @param {makamStatusDeleteManyArgs} args - Arguments to filter MakamStatuses to delete.
     * @example
     * // Delete a few MakamStatuses
     * const { count } = await prisma.makamStatus.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends makamStatusDeleteManyArgs>(args?: SelectSubset<T, makamStatusDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MakamStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {makamStatusUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MakamStatuses
     * const makamStatus = await prisma.makamStatus.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends makamStatusUpdateManyArgs>(args: SelectSubset<T, makamStatusUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MakamStatuses and returns the data updated in the database.
     * @param {makamStatusUpdateManyAndReturnArgs} args - Arguments to update many MakamStatuses.
     * @example
     * // Update many MakamStatuses
     * const makamStatus = await prisma.makamStatus.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MakamStatuses and only return the `id`
     * const makamStatusWithIdOnly = await prisma.makamStatus.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends makamStatusUpdateManyAndReturnArgs>(args: SelectSubset<T, makamStatusUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$makamStatusPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MakamStatus.
     * @param {makamStatusUpsertArgs} args - Arguments to update or create a MakamStatus.
     * @example
     * // Update or create a MakamStatus
     * const makamStatus = await prisma.makamStatus.upsert({
     *   create: {
     *     // ... data to create a MakamStatus
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MakamStatus we want to update
     *   }
     * })
     */
    upsert<T extends makamStatusUpsertArgs>(args: SelectSubset<T, makamStatusUpsertArgs<ExtArgs>>): Prisma__makamStatusClient<$Result.GetResult<Prisma.$makamStatusPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MakamStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {makamStatusCountArgs} args - Arguments to filter MakamStatuses to count.
     * @example
     * // Count the number of MakamStatuses
     * const count = await prisma.makamStatus.count({
     *   where: {
     *     // ... the filter for the MakamStatuses we want to count
     *   }
     * })
    **/
    count<T extends makamStatusCountArgs>(
      args?: Subset<T, makamStatusCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MakamStatusCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MakamStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MakamStatusAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MakamStatusAggregateArgs>(args: Subset<T, MakamStatusAggregateArgs>): Prisma.PrismaPromise<GetMakamStatusAggregateType<T>>

    /**
     * Group by MakamStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {makamStatusGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends makamStatusGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: makamStatusGroupByArgs['orderBy'] }
        : { orderBy?: makamStatusGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, makamStatusGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMakamStatusGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the makamStatus model
   */
  readonly fields: makamStatusFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for makamStatus.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__makamStatusClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends makamStatus$userArgs<ExtArgs> = {}>(args?: Subset<T, makamStatus$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    pj<T extends makamStatus$pjArgs<ExtArgs> = {}>(args?: Subset<T, makamStatus$pjArgs<ExtArgs>>): Prisma__Penanggung_JawabClient<$Result.GetResult<Prisma.$Penanggung_JawabPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    jenazah<T extends makamStatus$jenazahArgs<ExtArgs> = {}>(args?: Subset<T, makamStatus$jenazahArgs<ExtArgs>>): Prisma__JenazahClient<$Result.GetResult<Prisma.$JenazahPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    blok<T extends makamStatus$blokArgs<ExtArgs> = {}>(args?: Subset<T, makamStatus$blokArgs<ExtArgs>>): Prisma__BlokClient<$Result.GetResult<Prisma.$BlokPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the makamStatus model
   */
  interface makamStatusFieldRefs {
    readonly id: FieldRef<"makamStatus", 'Int'>
    readonly nama: FieldRef<"makamStatus", 'String'>
    readonly lokasi: FieldRef<"makamStatus", 'String'>
    readonly silsilah: FieldRef<"makamStatus", 'String'>
    readonly ext: FieldRef<"makamStatus", 'String'>
    readonly masa_aktif: FieldRef<"makamStatus", 'DateTime'>
    readonly nama_penanggung_jawab: FieldRef<"makamStatus", 'String'>
    readonly kontak_penanggung_jawab: FieldRef<"makamStatus", 'String'>
    readonly description: FieldRef<"makamStatus", 'String'>
    readonly payment: FieldRef<"makamStatus", 'String'>
    readonly approved: FieldRef<"makamStatus", 'String'>
    readonly created_at: FieldRef<"makamStatus", 'DateTime'>
    readonly updated_at: FieldRef<"makamStatus", 'DateTime'>
    readonly tanggal_pemesanan: FieldRef<"makamStatus", 'DateTime'>
    readonly userId: FieldRef<"makamStatus", 'String'>
    readonly pjId: FieldRef<"makamStatus", 'String'>
    readonly jenazahId: FieldRef<"makamStatus", 'String'>
    readonly blokId: FieldRef<"makamStatus", 'String'>
  }
    

  // Custom InputTypes
  /**
   * makamStatus findUnique
   */
  export type makamStatusFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makamStatus
     */
    select?: makamStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the makamStatus
     */
    omit?: makamStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamStatusInclude<ExtArgs> | null
    /**
     * Filter, which makamStatus to fetch.
     */
    where: makamStatusWhereUniqueInput
  }

  /**
   * makamStatus findUniqueOrThrow
   */
  export type makamStatusFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makamStatus
     */
    select?: makamStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the makamStatus
     */
    omit?: makamStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamStatusInclude<ExtArgs> | null
    /**
     * Filter, which makamStatus to fetch.
     */
    where: makamStatusWhereUniqueInput
  }

  /**
   * makamStatus findFirst
   */
  export type makamStatusFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makamStatus
     */
    select?: makamStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the makamStatus
     */
    omit?: makamStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamStatusInclude<ExtArgs> | null
    /**
     * Filter, which makamStatus to fetch.
     */
    where?: makamStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of makamStatuses to fetch.
     */
    orderBy?: makamStatusOrderByWithRelationInput | makamStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for makamStatuses.
     */
    cursor?: makamStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` makamStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` makamStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of makamStatuses.
     */
    distinct?: MakamStatusScalarFieldEnum | MakamStatusScalarFieldEnum[]
  }

  /**
   * makamStatus findFirstOrThrow
   */
  export type makamStatusFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makamStatus
     */
    select?: makamStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the makamStatus
     */
    omit?: makamStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamStatusInclude<ExtArgs> | null
    /**
     * Filter, which makamStatus to fetch.
     */
    where?: makamStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of makamStatuses to fetch.
     */
    orderBy?: makamStatusOrderByWithRelationInput | makamStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for makamStatuses.
     */
    cursor?: makamStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` makamStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` makamStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of makamStatuses.
     */
    distinct?: MakamStatusScalarFieldEnum | MakamStatusScalarFieldEnum[]
  }

  /**
   * makamStatus findMany
   */
  export type makamStatusFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makamStatus
     */
    select?: makamStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the makamStatus
     */
    omit?: makamStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamStatusInclude<ExtArgs> | null
    /**
     * Filter, which makamStatuses to fetch.
     */
    where?: makamStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of makamStatuses to fetch.
     */
    orderBy?: makamStatusOrderByWithRelationInput | makamStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing makamStatuses.
     */
    cursor?: makamStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` makamStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` makamStatuses.
     */
    skip?: number
    distinct?: MakamStatusScalarFieldEnum | MakamStatusScalarFieldEnum[]
  }

  /**
   * makamStatus create
   */
  export type makamStatusCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makamStatus
     */
    select?: makamStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the makamStatus
     */
    omit?: makamStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamStatusInclude<ExtArgs> | null
    /**
     * The data needed to create a makamStatus.
     */
    data: XOR<makamStatusCreateInput, makamStatusUncheckedCreateInput>
  }

  /**
   * makamStatus createMany
   */
  export type makamStatusCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many makamStatuses.
     */
    data: makamStatusCreateManyInput | makamStatusCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * makamStatus createManyAndReturn
   */
  export type makamStatusCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makamStatus
     */
    select?: makamStatusSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the makamStatus
     */
    omit?: makamStatusOmit<ExtArgs> | null
    /**
     * The data used to create many makamStatuses.
     */
    data: makamStatusCreateManyInput | makamStatusCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamStatusIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * makamStatus update
   */
  export type makamStatusUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makamStatus
     */
    select?: makamStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the makamStatus
     */
    omit?: makamStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamStatusInclude<ExtArgs> | null
    /**
     * The data needed to update a makamStatus.
     */
    data: XOR<makamStatusUpdateInput, makamStatusUncheckedUpdateInput>
    /**
     * Choose, which makamStatus to update.
     */
    where: makamStatusWhereUniqueInput
  }

  /**
   * makamStatus updateMany
   */
  export type makamStatusUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update makamStatuses.
     */
    data: XOR<makamStatusUpdateManyMutationInput, makamStatusUncheckedUpdateManyInput>
    /**
     * Filter which makamStatuses to update
     */
    where?: makamStatusWhereInput
    /**
     * Limit how many makamStatuses to update.
     */
    limit?: number
  }

  /**
   * makamStatus updateManyAndReturn
   */
  export type makamStatusUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makamStatus
     */
    select?: makamStatusSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the makamStatus
     */
    omit?: makamStatusOmit<ExtArgs> | null
    /**
     * The data used to update makamStatuses.
     */
    data: XOR<makamStatusUpdateManyMutationInput, makamStatusUncheckedUpdateManyInput>
    /**
     * Filter which makamStatuses to update
     */
    where?: makamStatusWhereInput
    /**
     * Limit how many makamStatuses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamStatusIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * makamStatus upsert
   */
  export type makamStatusUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makamStatus
     */
    select?: makamStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the makamStatus
     */
    omit?: makamStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamStatusInclude<ExtArgs> | null
    /**
     * The filter to search for the makamStatus to update in case it exists.
     */
    where: makamStatusWhereUniqueInput
    /**
     * In case the makamStatus found by the `where` argument doesn't exist, create a new makamStatus with this data.
     */
    create: XOR<makamStatusCreateInput, makamStatusUncheckedCreateInput>
    /**
     * In case the makamStatus was found with the provided `where` argument, update it with this data.
     */
    update: XOR<makamStatusUpdateInput, makamStatusUncheckedUpdateInput>
  }

  /**
   * makamStatus delete
   */
  export type makamStatusDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makamStatus
     */
    select?: makamStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the makamStatus
     */
    omit?: makamStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamStatusInclude<ExtArgs> | null
    /**
     * Filter which makamStatus to delete.
     */
    where: makamStatusWhereUniqueInput
  }

  /**
   * makamStatus deleteMany
   */
  export type makamStatusDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which makamStatuses to delete
     */
    where?: makamStatusWhereInput
    /**
     * Limit how many makamStatuses to delete.
     */
    limit?: number
  }

  /**
   * makamStatus.user
   */
  export type makamStatus$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * makamStatus.pj
   */
  export type makamStatus$pjArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penanggung_Jawab
     */
    select?: Penanggung_JawabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penanggung_Jawab
     */
    omit?: Penanggung_JawabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Penanggung_JawabInclude<ExtArgs> | null
    where?: Penanggung_JawabWhereInput
  }

  /**
   * makamStatus.jenazah
   */
  export type makamStatus$jenazahArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jenazah
     */
    select?: JenazahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jenazah
     */
    omit?: JenazahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenazahInclude<ExtArgs> | null
    where?: JenazahWhereInput
  }

  /**
   * makamStatus.blok
   */
  export type makamStatus$blokArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blok
     */
    select?: BlokSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blok
     */
    omit?: BlokOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlokInclude<ExtArgs> | null
    where?: BlokWhereInput
  }

  /**
   * makamStatus without action
   */
  export type makamStatusDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the makamStatus
     */
    select?: makamStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the makamStatus
     */
    omit?: makamStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: makamStatusInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AdminScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    contact: 'contact'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const ApproverScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password'
  };

  export type ApproverScalarFieldEnum = (typeof ApproverScalarFieldEnum)[keyof typeof ApproverScalarFieldEnum]


  export const PengawasScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password'
  };

  export type PengawasScalarFieldEnum = (typeof PengawasScalarFieldEnum)[keyof typeof PengawasScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    contact: 'contact',
    email: 'email',
    status: 'status',
    ktp_num: 'ktp_num',
    emergency_name: 'emergency_name',
    emergency_contact: 'emergency_contact'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const Penanggung_JawabScalarFieldEnum: {
    id_penanggung_jawab: 'id_penanggung_jawab',
    id_user: 'id_user'
  };

  export type Penanggung_JawabScalarFieldEnum = (typeof Penanggung_JawabScalarFieldEnum)[keyof typeof Penanggung_JawabScalarFieldEnum]


  export const JenazahScalarFieldEnum: {
    id_jenazah: 'id_jenazah',
    tanggal_pemakaman: 'tanggal_pemakaman',
    status_jenazah: 'status_jenazah',
    masa_aktif: 'masa_aktif',
    status_pembayaran_pesanan: 'status_pembayaran_pesanan',
    status_pembayaran_iuran_tahunan: 'status_pembayaran_iuran_tahunan',
    id_user: 'id_user',
    id_blok: 'id_blok'
  };

  export type JenazahScalarFieldEnum = (typeof JenazahScalarFieldEnum)[keyof typeof JenazahScalarFieldEnum]


  export const BlokScalarFieldEnum: {
    id_blok: 'id_blok',
    lokasi: 'lokasi',
    tanggal_pemakaman_terakhir: 'tanggal_pemakaman_terakhir',
    status_blok: 'status_blok',
    status_pesanan: 'status_pesanan',
    availability: 'availability',
    status_pembayaran: 'status_pembayaran'
  };

  export type BlokScalarFieldEnum = (typeof BlokScalarFieldEnum)[keyof typeof BlokScalarFieldEnum]


  export const MakamScalarFieldEnum: {
    id: 'id',
    nama: 'nama',
    lokasi: 'lokasi',
    silsilah: 'silsilah',
    ext: 'ext',
    masa_aktif: 'masa_aktif',
    nama_penanggung_jawab: 'nama_penanggung_jawab',
    kontak_penanggung_jawab: 'kontak_penanggung_jawab',
    description: 'description',
    payment: 'payment',
    approved: 'approved',
    created_at: 'created_at',
    updated_at: 'updated_at',
    tanggal_pemesanan: 'tanggal_pemesanan',
    userId: 'userId',
    pjId: 'pjId',
    jenazahId: 'jenazahId',
    blokId: 'blokId'
  };

  export type MakamScalarFieldEnum = (typeof MakamScalarFieldEnum)[keyof typeof MakamScalarFieldEnum]


  export const MakamStatusScalarFieldEnum: {
    id: 'id',
    nama: 'nama',
    lokasi: 'lokasi',
    silsilah: 'silsilah',
    ext: 'ext',
    masa_aktif: 'masa_aktif',
    nama_penanggung_jawab: 'nama_penanggung_jawab',
    kontak_penanggung_jawab: 'kontak_penanggung_jawab',
    description: 'description',
    payment: 'payment',
    approved: 'approved',
    created_at: 'created_at',
    updated_at: 'updated_at',
    tanggal_pemesanan: 'tanggal_pemesanan',
    userId: 'userId',
    pjId: 'pjId',
    jenazahId: 'jenazahId',
    blokId: 'blokId'
  };

  export type MakamStatusScalarFieldEnum = (typeof MakamStatusScalarFieldEnum)[keyof typeof MakamStatusScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type AdminWhereInput = {
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    id?: IntFilter<"Admin"> | number
    name?: StringFilter<"Admin"> | string
    email?: StringFilter<"Admin"> | string
    password?: StringFilter<"Admin"> | string
    contact?: StringFilter<"Admin"> | string
  }

  export type AdminOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    contact?: SortOrder
  }

  export type AdminWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    name?: StringFilter<"Admin"> | string
    password?: StringFilter<"Admin"> | string
    contact?: StringFilter<"Admin"> | string
  }, "id" | "email">

  export type AdminOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    contact?: SortOrder
    _count?: AdminCountOrderByAggregateInput
    _avg?: AdminAvgOrderByAggregateInput
    _max?: AdminMaxOrderByAggregateInput
    _min?: AdminMinOrderByAggregateInput
    _sum?: AdminSumOrderByAggregateInput
  }

  export type AdminScalarWhereWithAggregatesInput = {
    AND?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    OR?: AdminScalarWhereWithAggregatesInput[]
    NOT?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Admin"> | number
    name?: StringWithAggregatesFilter<"Admin"> | string
    email?: StringWithAggregatesFilter<"Admin"> | string
    password?: StringWithAggregatesFilter<"Admin"> | string
    contact?: StringWithAggregatesFilter<"Admin"> | string
  }

  export type ApproverWhereInput = {
    AND?: ApproverWhereInput | ApproverWhereInput[]
    OR?: ApproverWhereInput[]
    NOT?: ApproverWhereInput | ApproverWhereInput[]
    id?: IntFilter<"Approver"> | number
    name?: StringFilter<"Approver"> | string
    email?: StringFilter<"Approver"> | string
    password?: StringFilter<"Approver"> | string
  }

  export type ApproverOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type ApproverWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: ApproverWhereInput | ApproverWhereInput[]
    OR?: ApproverWhereInput[]
    NOT?: ApproverWhereInput | ApproverWhereInput[]
    name?: StringFilter<"Approver"> | string
    password?: StringFilter<"Approver"> | string
  }, "id" | "email">

  export type ApproverOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    _count?: ApproverCountOrderByAggregateInput
    _avg?: ApproverAvgOrderByAggregateInput
    _max?: ApproverMaxOrderByAggregateInput
    _min?: ApproverMinOrderByAggregateInput
    _sum?: ApproverSumOrderByAggregateInput
  }

  export type ApproverScalarWhereWithAggregatesInput = {
    AND?: ApproverScalarWhereWithAggregatesInput | ApproverScalarWhereWithAggregatesInput[]
    OR?: ApproverScalarWhereWithAggregatesInput[]
    NOT?: ApproverScalarWhereWithAggregatesInput | ApproverScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Approver"> | number
    name?: StringWithAggregatesFilter<"Approver"> | string
    email?: StringWithAggregatesFilter<"Approver"> | string
    password?: StringWithAggregatesFilter<"Approver"> | string
  }

  export type PengawasWhereInput = {
    AND?: PengawasWhereInput | PengawasWhereInput[]
    OR?: PengawasWhereInput[]
    NOT?: PengawasWhereInput | PengawasWhereInput[]
    id?: IntFilter<"Pengawas"> | number
    name?: StringFilter<"Pengawas"> | string
    email?: StringFilter<"Pengawas"> | string
    password?: StringFilter<"Pengawas"> | string
  }

  export type PengawasOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type PengawasWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: PengawasWhereInput | PengawasWhereInput[]
    OR?: PengawasWhereInput[]
    NOT?: PengawasWhereInput | PengawasWhereInput[]
    name?: StringFilter<"Pengawas"> | string
    password?: StringFilter<"Pengawas"> | string
  }, "id" | "email">

  export type PengawasOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    _count?: PengawasCountOrderByAggregateInput
    _avg?: PengawasAvgOrderByAggregateInput
    _max?: PengawasMaxOrderByAggregateInput
    _min?: PengawasMinOrderByAggregateInput
    _sum?: PengawasSumOrderByAggregateInput
  }

  export type PengawasScalarWhereWithAggregatesInput = {
    AND?: PengawasScalarWhereWithAggregatesInput | PengawasScalarWhereWithAggregatesInput[]
    OR?: PengawasScalarWhereWithAggregatesInput[]
    NOT?: PengawasScalarWhereWithAggregatesInput | PengawasScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Pengawas"> | number
    name?: StringWithAggregatesFilter<"Pengawas"> | string
    email?: StringWithAggregatesFilter<"Pengawas"> | string
    password?: StringWithAggregatesFilter<"Pengawas"> | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    contact?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    status?: StringNullableFilter<"User"> | string | null
    ktp_num?: StringNullableFilter<"User"> | string | null
    emergency_name?: StringNullableFilter<"User"> | string | null
    emergency_contact?: StringNullableFilter<"User"> | string | null
    makams?: MakamListRelationFilter
    statuses?: MakamStatusListRelationFilter
    jenazah?: XOR<JenazahNullableScalarRelationFilter, JenazahWhereInput> | null
    penanggung_jawab?: XOR<Penanggung_JawabNullableScalarRelationFilter, Penanggung_JawabWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    contact?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    ktp_num?: SortOrderInput | SortOrder
    emergency_name?: SortOrderInput | SortOrder
    emergency_contact?: SortOrderInput | SortOrder
    makams?: makamOrderByRelationAggregateInput
    statuses?: makamStatusOrderByRelationAggregateInput
    jenazah?: JenazahOrderByWithRelationInput
    penanggung_jawab?: Penanggung_JawabOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    ktp_num?: string
    emergency_contact?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    contact?: StringNullableFilter<"User"> | string | null
    status?: StringNullableFilter<"User"> | string | null
    emergency_name?: StringNullableFilter<"User"> | string | null
    makams?: MakamListRelationFilter
    statuses?: MakamStatusListRelationFilter
    jenazah?: XOR<JenazahNullableScalarRelationFilter, JenazahWhereInput> | null
    penanggung_jawab?: XOR<Penanggung_JawabNullableScalarRelationFilter, Penanggung_JawabWhereInput> | null
  }, "id" | "email" | "ktp_num" | "emergency_contact">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    contact?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    ktp_num?: SortOrderInput | SortOrder
    emergency_name?: SortOrderInput | SortOrder
    emergency_contact?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    contact?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    status?: StringNullableWithAggregatesFilter<"User"> | string | null
    ktp_num?: StringNullableWithAggregatesFilter<"User"> | string | null
    emergency_name?: StringNullableWithAggregatesFilter<"User"> | string | null
    emergency_contact?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type Penanggung_JawabWhereInput = {
    AND?: Penanggung_JawabWhereInput | Penanggung_JawabWhereInput[]
    OR?: Penanggung_JawabWhereInput[]
    NOT?: Penanggung_JawabWhereInput | Penanggung_JawabWhereInput[]
    id_penanggung_jawab?: StringFilter<"Penanggung_Jawab"> | string
    id_user?: StringNullableFilter<"Penanggung_Jawab"> | string | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    makams?: MakamListRelationFilter
    statuses?: MakamStatusListRelationFilter
  }

  export type Penanggung_JawabOrderByWithRelationInput = {
    id_penanggung_jawab?: SortOrder
    id_user?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    makams?: makamOrderByRelationAggregateInput
    statuses?: makamStatusOrderByRelationAggregateInput
  }

  export type Penanggung_JawabWhereUniqueInput = Prisma.AtLeast<{
    id_penanggung_jawab?: string
    id_user?: string
    AND?: Penanggung_JawabWhereInput | Penanggung_JawabWhereInput[]
    OR?: Penanggung_JawabWhereInput[]
    NOT?: Penanggung_JawabWhereInput | Penanggung_JawabWhereInput[]
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    makams?: MakamListRelationFilter
    statuses?: MakamStatusListRelationFilter
  }, "id_penanggung_jawab" | "id_user">

  export type Penanggung_JawabOrderByWithAggregationInput = {
    id_penanggung_jawab?: SortOrder
    id_user?: SortOrderInput | SortOrder
    _count?: Penanggung_JawabCountOrderByAggregateInput
    _max?: Penanggung_JawabMaxOrderByAggregateInput
    _min?: Penanggung_JawabMinOrderByAggregateInput
  }

  export type Penanggung_JawabScalarWhereWithAggregatesInput = {
    AND?: Penanggung_JawabScalarWhereWithAggregatesInput | Penanggung_JawabScalarWhereWithAggregatesInput[]
    OR?: Penanggung_JawabScalarWhereWithAggregatesInput[]
    NOT?: Penanggung_JawabScalarWhereWithAggregatesInput | Penanggung_JawabScalarWhereWithAggregatesInput[]
    id_penanggung_jawab?: StringWithAggregatesFilter<"Penanggung_Jawab"> | string
    id_user?: StringNullableWithAggregatesFilter<"Penanggung_Jawab"> | string | null
  }

  export type JenazahWhereInput = {
    AND?: JenazahWhereInput | JenazahWhereInput[]
    OR?: JenazahWhereInput[]
    NOT?: JenazahWhereInput | JenazahWhereInput[]
    id_jenazah?: StringFilter<"Jenazah"> | string
    tanggal_pemakaman?: DateTimeNullableFilter<"Jenazah"> | Date | string | null
    status_jenazah?: StringNullableFilter<"Jenazah"> | string | null
    masa_aktif?: IntNullableFilter<"Jenazah"> | number | null
    status_pembayaran_pesanan?: StringNullableFilter<"Jenazah"> | string | null
    status_pembayaran_iuran_tahunan?: StringNullableFilter<"Jenazah"> | string | null
    id_user?: StringNullableFilter<"Jenazah"> | string | null
    id_blok?: StringNullableFilter<"Jenazah"> | string | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    blok?: XOR<BlokNullableScalarRelationFilter, BlokWhereInput> | null
    makams?: MakamListRelationFilter
    statuses?: MakamStatusListRelationFilter
  }

  export type JenazahOrderByWithRelationInput = {
    id_jenazah?: SortOrder
    tanggal_pemakaman?: SortOrderInput | SortOrder
    status_jenazah?: SortOrderInput | SortOrder
    masa_aktif?: SortOrderInput | SortOrder
    status_pembayaran_pesanan?: SortOrderInput | SortOrder
    status_pembayaran_iuran_tahunan?: SortOrderInput | SortOrder
    id_user?: SortOrderInput | SortOrder
    id_blok?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    blok?: BlokOrderByWithRelationInput
    makams?: makamOrderByRelationAggregateInput
    statuses?: makamStatusOrderByRelationAggregateInput
  }

  export type JenazahWhereUniqueInput = Prisma.AtLeast<{
    id_jenazah?: string
    id_user?: string
    AND?: JenazahWhereInput | JenazahWhereInput[]
    OR?: JenazahWhereInput[]
    NOT?: JenazahWhereInput | JenazahWhereInput[]
    tanggal_pemakaman?: DateTimeNullableFilter<"Jenazah"> | Date | string | null
    status_jenazah?: StringNullableFilter<"Jenazah"> | string | null
    masa_aktif?: IntNullableFilter<"Jenazah"> | number | null
    status_pembayaran_pesanan?: StringNullableFilter<"Jenazah"> | string | null
    status_pembayaran_iuran_tahunan?: StringNullableFilter<"Jenazah"> | string | null
    id_blok?: StringNullableFilter<"Jenazah"> | string | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    blok?: XOR<BlokNullableScalarRelationFilter, BlokWhereInput> | null
    makams?: MakamListRelationFilter
    statuses?: MakamStatusListRelationFilter
  }, "id_jenazah" | "id_user">

  export type JenazahOrderByWithAggregationInput = {
    id_jenazah?: SortOrder
    tanggal_pemakaman?: SortOrderInput | SortOrder
    status_jenazah?: SortOrderInput | SortOrder
    masa_aktif?: SortOrderInput | SortOrder
    status_pembayaran_pesanan?: SortOrderInput | SortOrder
    status_pembayaran_iuran_tahunan?: SortOrderInput | SortOrder
    id_user?: SortOrderInput | SortOrder
    id_blok?: SortOrderInput | SortOrder
    _count?: JenazahCountOrderByAggregateInput
    _avg?: JenazahAvgOrderByAggregateInput
    _max?: JenazahMaxOrderByAggregateInput
    _min?: JenazahMinOrderByAggregateInput
    _sum?: JenazahSumOrderByAggregateInput
  }

  export type JenazahScalarWhereWithAggregatesInput = {
    AND?: JenazahScalarWhereWithAggregatesInput | JenazahScalarWhereWithAggregatesInput[]
    OR?: JenazahScalarWhereWithAggregatesInput[]
    NOT?: JenazahScalarWhereWithAggregatesInput | JenazahScalarWhereWithAggregatesInput[]
    id_jenazah?: StringWithAggregatesFilter<"Jenazah"> | string
    tanggal_pemakaman?: DateTimeNullableWithAggregatesFilter<"Jenazah"> | Date | string | null
    status_jenazah?: StringNullableWithAggregatesFilter<"Jenazah"> | string | null
    masa_aktif?: IntNullableWithAggregatesFilter<"Jenazah"> | number | null
    status_pembayaran_pesanan?: StringNullableWithAggregatesFilter<"Jenazah"> | string | null
    status_pembayaran_iuran_tahunan?: StringNullableWithAggregatesFilter<"Jenazah"> | string | null
    id_user?: StringNullableWithAggregatesFilter<"Jenazah"> | string | null
    id_blok?: StringNullableWithAggregatesFilter<"Jenazah"> | string | null
  }

  export type BlokWhereInput = {
    AND?: BlokWhereInput | BlokWhereInput[]
    OR?: BlokWhereInput[]
    NOT?: BlokWhereInput | BlokWhereInput[]
    id_blok?: StringFilter<"Blok"> | string
    lokasi?: StringNullableFilter<"Blok"> | string | null
    tanggal_pemakaman_terakhir?: DateTimeNullableFilter<"Blok"> | Date | string | null
    status_blok?: StringNullableFilter<"Blok"> | string | null
    status_pesanan?: StringNullableFilter<"Blok"> | string | null
    availability?: StringNullableFilter<"Blok"> | string | null
    status_pembayaran?: StringNullableFilter<"Blok"> | string | null
    jenazah?: JenazahListRelationFilter
    makam?: MakamListRelationFilter
    makamStatus?: MakamStatusListRelationFilter
  }

  export type BlokOrderByWithRelationInput = {
    id_blok?: SortOrder
    lokasi?: SortOrderInput | SortOrder
    tanggal_pemakaman_terakhir?: SortOrderInput | SortOrder
    status_blok?: SortOrderInput | SortOrder
    status_pesanan?: SortOrderInput | SortOrder
    availability?: SortOrderInput | SortOrder
    status_pembayaran?: SortOrderInput | SortOrder
    jenazah?: JenazahOrderByRelationAggregateInput
    makam?: makamOrderByRelationAggregateInput
    makamStatus?: makamStatusOrderByRelationAggregateInput
  }

  export type BlokWhereUniqueInput = Prisma.AtLeast<{
    id_blok?: string
    AND?: BlokWhereInput | BlokWhereInput[]
    OR?: BlokWhereInput[]
    NOT?: BlokWhereInput | BlokWhereInput[]
    lokasi?: StringNullableFilter<"Blok"> | string | null
    tanggal_pemakaman_terakhir?: DateTimeNullableFilter<"Blok"> | Date | string | null
    status_blok?: StringNullableFilter<"Blok"> | string | null
    status_pesanan?: StringNullableFilter<"Blok"> | string | null
    availability?: StringNullableFilter<"Blok"> | string | null
    status_pembayaran?: StringNullableFilter<"Blok"> | string | null
    jenazah?: JenazahListRelationFilter
    makam?: MakamListRelationFilter
    makamStatus?: MakamStatusListRelationFilter
  }, "id_blok">

  export type BlokOrderByWithAggregationInput = {
    id_blok?: SortOrder
    lokasi?: SortOrderInput | SortOrder
    tanggal_pemakaman_terakhir?: SortOrderInput | SortOrder
    status_blok?: SortOrderInput | SortOrder
    status_pesanan?: SortOrderInput | SortOrder
    availability?: SortOrderInput | SortOrder
    status_pembayaran?: SortOrderInput | SortOrder
    _count?: BlokCountOrderByAggregateInput
    _max?: BlokMaxOrderByAggregateInput
    _min?: BlokMinOrderByAggregateInput
  }

  export type BlokScalarWhereWithAggregatesInput = {
    AND?: BlokScalarWhereWithAggregatesInput | BlokScalarWhereWithAggregatesInput[]
    OR?: BlokScalarWhereWithAggregatesInput[]
    NOT?: BlokScalarWhereWithAggregatesInput | BlokScalarWhereWithAggregatesInput[]
    id_blok?: StringWithAggregatesFilter<"Blok"> | string
    lokasi?: StringNullableWithAggregatesFilter<"Blok"> | string | null
    tanggal_pemakaman_terakhir?: DateTimeNullableWithAggregatesFilter<"Blok"> | Date | string | null
    status_blok?: StringNullableWithAggregatesFilter<"Blok"> | string | null
    status_pesanan?: StringNullableWithAggregatesFilter<"Blok"> | string | null
    availability?: StringNullableWithAggregatesFilter<"Blok"> | string | null
    status_pembayaran?: StringNullableWithAggregatesFilter<"Blok"> | string | null
  }

  export type makamWhereInput = {
    AND?: makamWhereInput | makamWhereInput[]
    OR?: makamWhereInput[]
    NOT?: makamWhereInput | makamWhereInput[]
    id?: IntFilter<"makam"> | number
    nama?: StringFilter<"makam"> | string
    lokasi?: StringFilter<"makam"> | string
    silsilah?: StringFilter<"makam"> | string
    ext?: StringNullableFilter<"makam"> | string | null
    masa_aktif?: DateTimeNullableFilter<"makam"> | Date | string | null
    nama_penanggung_jawab?: StringFilter<"makam"> | string
    kontak_penanggung_jawab?: StringFilter<"makam"> | string
    description?: StringFilter<"makam"> | string
    payment?: StringFilter<"makam"> | string
    approved?: StringFilter<"makam"> | string
    created_at?: DateTimeFilter<"makam"> | Date | string
    updated_at?: DateTimeFilter<"makam"> | Date | string
    tanggal_pemesanan?: DateTimeNullableFilter<"makam"> | Date | string | null
    userId?: StringNullableFilter<"makam"> | string | null
    pjId?: StringNullableFilter<"makam"> | string | null
    jenazahId?: StringNullableFilter<"makam"> | string | null
    blokId?: StringNullableFilter<"makam"> | string | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    pj?: XOR<Penanggung_JawabNullableScalarRelationFilter, Penanggung_JawabWhereInput> | null
    jenazah?: XOR<JenazahNullableScalarRelationFilter, JenazahWhereInput> | null
    blok?: XOR<BlokNullableScalarRelationFilter, BlokWhereInput> | null
  }

  export type makamOrderByWithRelationInput = {
    id?: SortOrder
    nama?: SortOrder
    lokasi?: SortOrder
    silsilah?: SortOrder
    ext?: SortOrderInput | SortOrder
    masa_aktif?: SortOrderInput | SortOrder
    nama_penanggung_jawab?: SortOrder
    kontak_penanggung_jawab?: SortOrder
    description?: SortOrder
    payment?: SortOrder
    approved?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    tanggal_pemesanan?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    pjId?: SortOrderInput | SortOrder
    jenazahId?: SortOrderInput | SortOrder
    blokId?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    pj?: Penanggung_JawabOrderByWithRelationInput
    jenazah?: JenazahOrderByWithRelationInput
    blok?: BlokOrderByWithRelationInput
  }

  export type makamWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: makamWhereInput | makamWhereInput[]
    OR?: makamWhereInput[]
    NOT?: makamWhereInput | makamWhereInput[]
    nama?: StringFilter<"makam"> | string
    lokasi?: StringFilter<"makam"> | string
    silsilah?: StringFilter<"makam"> | string
    ext?: StringNullableFilter<"makam"> | string | null
    masa_aktif?: DateTimeNullableFilter<"makam"> | Date | string | null
    nama_penanggung_jawab?: StringFilter<"makam"> | string
    kontak_penanggung_jawab?: StringFilter<"makam"> | string
    description?: StringFilter<"makam"> | string
    payment?: StringFilter<"makam"> | string
    approved?: StringFilter<"makam"> | string
    created_at?: DateTimeFilter<"makam"> | Date | string
    updated_at?: DateTimeFilter<"makam"> | Date | string
    tanggal_pemesanan?: DateTimeNullableFilter<"makam"> | Date | string | null
    userId?: StringNullableFilter<"makam"> | string | null
    pjId?: StringNullableFilter<"makam"> | string | null
    jenazahId?: StringNullableFilter<"makam"> | string | null
    blokId?: StringNullableFilter<"makam"> | string | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    pj?: XOR<Penanggung_JawabNullableScalarRelationFilter, Penanggung_JawabWhereInput> | null
    jenazah?: XOR<JenazahNullableScalarRelationFilter, JenazahWhereInput> | null
    blok?: XOR<BlokNullableScalarRelationFilter, BlokWhereInput> | null
  }, "id">

  export type makamOrderByWithAggregationInput = {
    id?: SortOrder
    nama?: SortOrder
    lokasi?: SortOrder
    silsilah?: SortOrder
    ext?: SortOrderInput | SortOrder
    masa_aktif?: SortOrderInput | SortOrder
    nama_penanggung_jawab?: SortOrder
    kontak_penanggung_jawab?: SortOrder
    description?: SortOrder
    payment?: SortOrder
    approved?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    tanggal_pemesanan?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    pjId?: SortOrderInput | SortOrder
    jenazahId?: SortOrderInput | SortOrder
    blokId?: SortOrderInput | SortOrder
    _count?: makamCountOrderByAggregateInput
    _avg?: makamAvgOrderByAggregateInput
    _max?: makamMaxOrderByAggregateInput
    _min?: makamMinOrderByAggregateInput
    _sum?: makamSumOrderByAggregateInput
  }

  export type makamScalarWhereWithAggregatesInput = {
    AND?: makamScalarWhereWithAggregatesInput | makamScalarWhereWithAggregatesInput[]
    OR?: makamScalarWhereWithAggregatesInput[]
    NOT?: makamScalarWhereWithAggregatesInput | makamScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"makam"> | number
    nama?: StringWithAggregatesFilter<"makam"> | string
    lokasi?: StringWithAggregatesFilter<"makam"> | string
    silsilah?: StringWithAggregatesFilter<"makam"> | string
    ext?: StringNullableWithAggregatesFilter<"makam"> | string | null
    masa_aktif?: DateTimeNullableWithAggregatesFilter<"makam"> | Date | string | null
    nama_penanggung_jawab?: StringWithAggregatesFilter<"makam"> | string
    kontak_penanggung_jawab?: StringWithAggregatesFilter<"makam"> | string
    description?: StringWithAggregatesFilter<"makam"> | string
    payment?: StringWithAggregatesFilter<"makam"> | string
    approved?: StringWithAggregatesFilter<"makam"> | string
    created_at?: DateTimeWithAggregatesFilter<"makam"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"makam"> | Date | string
    tanggal_pemesanan?: DateTimeNullableWithAggregatesFilter<"makam"> | Date | string | null
    userId?: StringNullableWithAggregatesFilter<"makam"> | string | null
    pjId?: StringNullableWithAggregatesFilter<"makam"> | string | null
    jenazahId?: StringNullableWithAggregatesFilter<"makam"> | string | null
    blokId?: StringNullableWithAggregatesFilter<"makam"> | string | null
  }

  export type makamStatusWhereInput = {
    AND?: makamStatusWhereInput | makamStatusWhereInput[]
    OR?: makamStatusWhereInput[]
    NOT?: makamStatusWhereInput | makamStatusWhereInput[]
    id?: IntFilter<"makamStatus"> | number
    nama?: StringFilter<"makamStatus"> | string
    lokasi?: StringFilter<"makamStatus"> | string
    silsilah?: StringFilter<"makamStatus"> | string
    ext?: StringNullableFilter<"makamStatus"> | string | null
    masa_aktif?: DateTimeNullableFilter<"makamStatus"> | Date | string | null
    nama_penanggung_jawab?: StringFilter<"makamStatus"> | string
    kontak_penanggung_jawab?: StringFilter<"makamStatus"> | string
    description?: StringFilter<"makamStatus"> | string
    payment?: StringFilter<"makamStatus"> | string
    approved?: StringFilter<"makamStatus"> | string
    created_at?: DateTimeFilter<"makamStatus"> | Date | string
    updated_at?: DateTimeFilter<"makamStatus"> | Date | string
    tanggal_pemesanan?: DateTimeNullableFilter<"makamStatus"> | Date | string | null
    userId?: StringNullableFilter<"makamStatus"> | string | null
    pjId?: StringNullableFilter<"makamStatus"> | string | null
    jenazahId?: StringNullableFilter<"makamStatus"> | string | null
    blokId?: StringNullableFilter<"makamStatus"> | string | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    pj?: XOR<Penanggung_JawabNullableScalarRelationFilter, Penanggung_JawabWhereInput> | null
    jenazah?: XOR<JenazahNullableScalarRelationFilter, JenazahWhereInput> | null
    blok?: XOR<BlokNullableScalarRelationFilter, BlokWhereInput> | null
  }

  export type makamStatusOrderByWithRelationInput = {
    id?: SortOrder
    nama?: SortOrder
    lokasi?: SortOrder
    silsilah?: SortOrder
    ext?: SortOrderInput | SortOrder
    masa_aktif?: SortOrderInput | SortOrder
    nama_penanggung_jawab?: SortOrder
    kontak_penanggung_jawab?: SortOrder
    description?: SortOrder
    payment?: SortOrder
    approved?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    tanggal_pemesanan?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    pjId?: SortOrderInput | SortOrder
    jenazahId?: SortOrderInput | SortOrder
    blokId?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    pj?: Penanggung_JawabOrderByWithRelationInput
    jenazah?: JenazahOrderByWithRelationInput
    blok?: BlokOrderByWithRelationInput
  }

  export type makamStatusWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: makamStatusWhereInput | makamStatusWhereInput[]
    OR?: makamStatusWhereInput[]
    NOT?: makamStatusWhereInput | makamStatusWhereInput[]
    nama?: StringFilter<"makamStatus"> | string
    lokasi?: StringFilter<"makamStatus"> | string
    silsilah?: StringFilter<"makamStatus"> | string
    ext?: StringNullableFilter<"makamStatus"> | string | null
    masa_aktif?: DateTimeNullableFilter<"makamStatus"> | Date | string | null
    nama_penanggung_jawab?: StringFilter<"makamStatus"> | string
    kontak_penanggung_jawab?: StringFilter<"makamStatus"> | string
    description?: StringFilter<"makamStatus"> | string
    payment?: StringFilter<"makamStatus"> | string
    approved?: StringFilter<"makamStatus"> | string
    created_at?: DateTimeFilter<"makamStatus"> | Date | string
    updated_at?: DateTimeFilter<"makamStatus"> | Date | string
    tanggal_pemesanan?: DateTimeNullableFilter<"makamStatus"> | Date | string | null
    userId?: StringNullableFilter<"makamStatus"> | string | null
    pjId?: StringNullableFilter<"makamStatus"> | string | null
    jenazahId?: StringNullableFilter<"makamStatus"> | string | null
    blokId?: StringNullableFilter<"makamStatus"> | string | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    pj?: XOR<Penanggung_JawabNullableScalarRelationFilter, Penanggung_JawabWhereInput> | null
    jenazah?: XOR<JenazahNullableScalarRelationFilter, JenazahWhereInput> | null
    blok?: XOR<BlokNullableScalarRelationFilter, BlokWhereInput> | null
  }, "id">

  export type makamStatusOrderByWithAggregationInput = {
    id?: SortOrder
    nama?: SortOrder
    lokasi?: SortOrder
    silsilah?: SortOrder
    ext?: SortOrderInput | SortOrder
    masa_aktif?: SortOrderInput | SortOrder
    nama_penanggung_jawab?: SortOrder
    kontak_penanggung_jawab?: SortOrder
    description?: SortOrder
    payment?: SortOrder
    approved?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    tanggal_pemesanan?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    pjId?: SortOrderInput | SortOrder
    jenazahId?: SortOrderInput | SortOrder
    blokId?: SortOrderInput | SortOrder
    _count?: makamStatusCountOrderByAggregateInput
    _avg?: makamStatusAvgOrderByAggregateInput
    _max?: makamStatusMaxOrderByAggregateInput
    _min?: makamStatusMinOrderByAggregateInput
    _sum?: makamStatusSumOrderByAggregateInput
  }

  export type makamStatusScalarWhereWithAggregatesInput = {
    AND?: makamStatusScalarWhereWithAggregatesInput | makamStatusScalarWhereWithAggregatesInput[]
    OR?: makamStatusScalarWhereWithAggregatesInput[]
    NOT?: makamStatusScalarWhereWithAggregatesInput | makamStatusScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"makamStatus"> | number
    nama?: StringWithAggregatesFilter<"makamStatus"> | string
    lokasi?: StringWithAggregatesFilter<"makamStatus"> | string
    silsilah?: StringWithAggregatesFilter<"makamStatus"> | string
    ext?: StringNullableWithAggregatesFilter<"makamStatus"> | string | null
    masa_aktif?: DateTimeNullableWithAggregatesFilter<"makamStatus"> | Date | string | null
    nama_penanggung_jawab?: StringWithAggregatesFilter<"makamStatus"> | string
    kontak_penanggung_jawab?: StringWithAggregatesFilter<"makamStatus"> | string
    description?: StringWithAggregatesFilter<"makamStatus"> | string
    payment?: StringWithAggregatesFilter<"makamStatus"> | string
    approved?: StringWithAggregatesFilter<"makamStatus"> | string
    created_at?: DateTimeWithAggregatesFilter<"makamStatus"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"makamStatus"> | Date | string
    tanggal_pemesanan?: DateTimeNullableWithAggregatesFilter<"makamStatus"> | Date | string | null
    userId?: StringNullableWithAggregatesFilter<"makamStatus"> | string | null
    pjId?: StringNullableWithAggregatesFilter<"makamStatus"> | string | null
    jenazahId?: StringNullableWithAggregatesFilter<"makamStatus"> | string | null
    blokId?: StringNullableWithAggregatesFilter<"makamStatus"> | string | null
  }

  export type AdminCreateInput = {
    name: string
    email: string
    password: string
    contact: string
  }

  export type AdminUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    password: string
    contact: string
  }

  export type AdminUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
  }

  export type AdminUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
  }

  export type AdminCreateManyInput = {
    id?: number
    name: string
    email: string
    password: string
    contact: string
  }

  export type AdminUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
  }

  export type AdminUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
  }

  export type ApproverCreateInput = {
    name: string
    email: string
    password: string
  }

  export type ApproverUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    password: string
  }

  export type ApproverUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type ApproverUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type ApproverCreateManyInput = {
    id?: number
    name: string
    email: string
    password: string
  }

  export type ApproverUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type ApproverUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type PengawasCreateInput = {
    name: string
    email: string
    password: string
  }

  export type PengawasUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    password: string
  }

  export type PengawasUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type PengawasUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type PengawasCreateManyInput = {
    id?: number
    name: string
    email: string
    password: string
  }

  export type PengawasUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type PengawasUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    contact?: string | null
    email?: string | null
    status?: string | null
    ktp_num?: string | null
    emergency_name?: string | null
    emergency_contact?: string | null
    makams?: makamCreateNestedManyWithoutUserInput
    statuses?: makamStatusCreateNestedManyWithoutUserInput
    jenazah?: JenazahCreateNestedOneWithoutUserInput
    penanggung_jawab?: Penanggung_JawabCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    contact?: string | null
    email?: string | null
    status?: string | null
    ktp_num?: string | null
    emergency_name?: string | null
    emergency_contact?: string | null
    makams?: makamUncheckedCreateNestedManyWithoutUserInput
    statuses?: makamStatusUncheckedCreateNestedManyWithoutUserInput
    jenazah?: JenazahUncheckedCreateNestedOneWithoutUserInput
    penanggung_jawab?: Penanggung_JawabUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    ktp_num?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_name?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_contact?: NullableStringFieldUpdateOperationsInput | string | null
    makams?: makamUpdateManyWithoutUserNestedInput
    statuses?: makamStatusUpdateManyWithoutUserNestedInput
    jenazah?: JenazahUpdateOneWithoutUserNestedInput
    penanggung_jawab?: Penanggung_JawabUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    ktp_num?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_name?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_contact?: NullableStringFieldUpdateOperationsInput | string | null
    makams?: makamUncheckedUpdateManyWithoutUserNestedInput
    statuses?: makamStatusUncheckedUpdateManyWithoutUserNestedInput
    jenazah?: JenazahUncheckedUpdateOneWithoutUserNestedInput
    penanggung_jawab?: Penanggung_JawabUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    contact?: string | null
    email?: string | null
    status?: string | null
    ktp_num?: string | null
    emergency_name?: string | null
    emergency_contact?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    ktp_num?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_name?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_contact?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    ktp_num?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_name?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_contact?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type Penanggung_JawabCreateInput = {
    id_penanggung_jawab?: string
    user?: UserCreateNestedOneWithoutPenanggung_jawabInput
    makams?: makamCreateNestedManyWithoutPjInput
    statuses?: makamStatusCreateNestedManyWithoutPjInput
  }

  export type Penanggung_JawabUncheckedCreateInput = {
    id_penanggung_jawab?: string
    id_user?: string | null
    makams?: makamUncheckedCreateNestedManyWithoutPjInput
    statuses?: makamStatusUncheckedCreateNestedManyWithoutPjInput
  }

  export type Penanggung_JawabUpdateInput = {
    id_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneWithoutPenanggung_jawabNestedInput
    makams?: makamUpdateManyWithoutPjNestedInput
    statuses?: makamStatusUpdateManyWithoutPjNestedInput
  }

  export type Penanggung_JawabUncheckedUpdateInput = {
    id_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    id_user?: NullableStringFieldUpdateOperationsInput | string | null
    makams?: makamUncheckedUpdateManyWithoutPjNestedInput
    statuses?: makamStatusUncheckedUpdateManyWithoutPjNestedInput
  }

  export type Penanggung_JawabCreateManyInput = {
    id_penanggung_jawab?: string
    id_user?: string | null
  }

  export type Penanggung_JawabUpdateManyMutationInput = {
    id_penanggung_jawab?: StringFieldUpdateOperationsInput | string
  }

  export type Penanggung_JawabUncheckedUpdateManyInput = {
    id_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    id_user?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type JenazahCreateInput = {
    id_jenazah?: string
    tanggal_pemakaman?: Date | string | null
    status_jenazah?: string | null
    masa_aktif?: number | null
    status_pembayaran_pesanan?: string | null
    status_pembayaran_iuran_tahunan?: string | null
    user?: UserCreateNestedOneWithoutJenazahInput
    blok?: BlokCreateNestedOneWithoutJenazahInput
    makams?: makamCreateNestedManyWithoutJenazahInput
    statuses?: makamStatusCreateNestedManyWithoutJenazahInput
  }

  export type JenazahUncheckedCreateInput = {
    id_jenazah?: string
    tanggal_pemakaman?: Date | string | null
    status_jenazah?: string | null
    masa_aktif?: number | null
    status_pembayaran_pesanan?: string | null
    status_pembayaran_iuran_tahunan?: string | null
    id_user?: string | null
    id_blok?: string | null
    makams?: makamUncheckedCreateNestedManyWithoutJenazahInput
    statuses?: makamStatusUncheckedCreateNestedManyWithoutJenazahInput
  }

  export type JenazahUpdateInput = {
    id_jenazah?: StringFieldUpdateOperationsInput | string
    tanggal_pemakaman?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_jenazah?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableIntFieldUpdateOperationsInput | number | null
    status_pembayaran_pesanan?: NullableStringFieldUpdateOperationsInput | string | null
    status_pembayaran_iuran_tahunan?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneWithoutJenazahNestedInput
    blok?: BlokUpdateOneWithoutJenazahNestedInput
    makams?: makamUpdateManyWithoutJenazahNestedInput
    statuses?: makamStatusUpdateManyWithoutJenazahNestedInput
  }

  export type JenazahUncheckedUpdateInput = {
    id_jenazah?: StringFieldUpdateOperationsInput | string
    tanggal_pemakaman?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_jenazah?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableIntFieldUpdateOperationsInput | number | null
    status_pembayaran_pesanan?: NullableStringFieldUpdateOperationsInput | string | null
    status_pembayaran_iuran_tahunan?: NullableStringFieldUpdateOperationsInput | string | null
    id_user?: NullableStringFieldUpdateOperationsInput | string | null
    id_blok?: NullableStringFieldUpdateOperationsInput | string | null
    makams?: makamUncheckedUpdateManyWithoutJenazahNestedInput
    statuses?: makamStatusUncheckedUpdateManyWithoutJenazahNestedInput
  }

  export type JenazahCreateManyInput = {
    id_jenazah?: string
    tanggal_pemakaman?: Date | string | null
    status_jenazah?: string | null
    masa_aktif?: number | null
    status_pembayaran_pesanan?: string | null
    status_pembayaran_iuran_tahunan?: string | null
    id_user?: string | null
    id_blok?: string | null
  }

  export type JenazahUpdateManyMutationInput = {
    id_jenazah?: StringFieldUpdateOperationsInput | string
    tanggal_pemakaman?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_jenazah?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableIntFieldUpdateOperationsInput | number | null
    status_pembayaran_pesanan?: NullableStringFieldUpdateOperationsInput | string | null
    status_pembayaran_iuran_tahunan?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type JenazahUncheckedUpdateManyInput = {
    id_jenazah?: StringFieldUpdateOperationsInput | string
    tanggal_pemakaman?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_jenazah?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableIntFieldUpdateOperationsInput | number | null
    status_pembayaran_pesanan?: NullableStringFieldUpdateOperationsInput | string | null
    status_pembayaran_iuran_tahunan?: NullableStringFieldUpdateOperationsInput | string | null
    id_user?: NullableStringFieldUpdateOperationsInput | string | null
    id_blok?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BlokCreateInput = {
    id_blok?: string
    lokasi?: string | null
    tanggal_pemakaman_terakhir?: Date | string | null
    status_blok?: string | null
    status_pesanan?: string | null
    availability?: string | null
    status_pembayaran?: string | null
    jenazah?: JenazahCreateNestedManyWithoutBlokInput
    makam?: makamCreateNestedManyWithoutBlokInput
    makamStatus?: makamStatusCreateNestedManyWithoutBlokInput
  }

  export type BlokUncheckedCreateInput = {
    id_blok?: string
    lokasi?: string | null
    tanggal_pemakaman_terakhir?: Date | string | null
    status_blok?: string | null
    status_pesanan?: string | null
    availability?: string | null
    status_pembayaran?: string | null
    jenazah?: JenazahUncheckedCreateNestedManyWithoutBlokInput
    makam?: makamUncheckedCreateNestedManyWithoutBlokInput
    makamStatus?: makamStatusUncheckedCreateNestedManyWithoutBlokInput
  }

  export type BlokUpdateInput = {
    id_blok?: StringFieldUpdateOperationsInput | string
    lokasi?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal_pemakaman_terakhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_blok?: NullableStringFieldUpdateOperationsInput | string | null
    status_pesanan?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    status_pembayaran?: NullableStringFieldUpdateOperationsInput | string | null
    jenazah?: JenazahUpdateManyWithoutBlokNestedInput
    makam?: makamUpdateManyWithoutBlokNestedInput
    makamStatus?: makamStatusUpdateManyWithoutBlokNestedInput
  }

  export type BlokUncheckedUpdateInput = {
    id_blok?: StringFieldUpdateOperationsInput | string
    lokasi?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal_pemakaman_terakhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_blok?: NullableStringFieldUpdateOperationsInput | string | null
    status_pesanan?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    status_pembayaran?: NullableStringFieldUpdateOperationsInput | string | null
    jenazah?: JenazahUncheckedUpdateManyWithoutBlokNestedInput
    makam?: makamUncheckedUpdateManyWithoutBlokNestedInput
    makamStatus?: makamStatusUncheckedUpdateManyWithoutBlokNestedInput
  }

  export type BlokCreateManyInput = {
    id_blok?: string
    lokasi?: string | null
    tanggal_pemakaman_terakhir?: Date | string | null
    status_blok?: string | null
    status_pesanan?: string | null
    availability?: string | null
    status_pembayaran?: string | null
  }

  export type BlokUpdateManyMutationInput = {
    id_blok?: StringFieldUpdateOperationsInput | string
    lokasi?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal_pemakaman_terakhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_blok?: NullableStringFieldUpdateOperationsInput | string | null
    status_pesanan?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    status_pembayaran?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BlokUncheckedUpdateManyInput = {
    id_blok?: StringFieldUpdateOperationsInput | string
    lokasi?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal_pemakaman_terakhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_blok?: NullableStringFieldUpdateOperationsInput | string | null
    status_pesanan?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    status_pembayaran?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type makamCreateInput = {
    nama: string
    lokasi: string
    silsilah: string
    ext?: string | null
    masa_aktif?: Date | string | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at?: Date | string
    updated_at?: Date | string
    tanggal_pemesanan?: Date | string | null
    user?: UserCreateNestedOneWithoutMakamsInput
    pj?: Penanggung_JawabCreateNestedOneWithoutMakamsInput
    jenazah?: JenazahCreateNestedOneWithoutMakamsInput
    blok?: BlokCreateNestedOneWithoutMakamInput
  }

  export type makamUncheckedCreateInput = {
    id?: number
    nama: string
    lokasi: string
    silsilah: string
    ext?: string | null
    masa_aktif?: Date | string | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at?: Date | string
    updated_at?: Date | string
    tanggal_pemesanan?: Date | string | null
    userId?: string | null
    pjId?: string | null
    jenazahId?: string | null
    blokId?: string | null
  }

  export type makamUpdateInput = {
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneWithoutMakamsNestedInput
    pj?: Penanggung_JawabUpdateOneWithoutMakamsNestedInput
    jenazah?: JenazahUpdateOneWithoutMakamsNestedInput
    blok?: BlokUpdateOneWithoutMakamNestedInput
  }

  export type makamUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    pjId?: NullableStringFieldUpdateOperationsInput | string | null
    jenazahId?: NullableStringFieldUpdateOperationsInput | string | null
    blokId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type makamCreateManyInput = {
    id?: number
    nama: string
    lokasi: string
    silsilah: string
    ext?: string | null
    masa_aktif?: Date | string | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at?: Date | string
    updated_at?: Date | string
    tanggal_pemesanan?: Date | string | null
    userId?: string | null
    pjId?: string | null
    jenazahId?: string | null
    blokId?: string | null
  }

  export type makamUpdateManyMutationInput = {
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type makamUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    pjId?: NullableStringFieldUpdateOperationsInput | string | null
    jenazahId?: NullableStringFieldUpdateOperationsInput | string | null
    blokId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type makamStatusCreateInput = {
    nama: string
    lokasi: string
    silsilah: string
    ext?: string | null
    masa_aktif?: Date | string | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at?: Date | string
    updated_at?: Date | string
    tanggal_pemesanan?: Date | string | null
    user?: UserCreateNestedOneWithoutStatusesInput
    pj?: Penanggung_JawabCreateNestedOneWithoutStatusesInput
    jenazah?: JenazahCreateNestedOneWithoutStatusesInput
    blok?: BlokCreateNestedOneWithoutMakamStatusInput
  }

  export type makamStatusUncheckedCreateInput = {
    id?: number
    nama: string
    lokasi: string
    silsilah: string
    ext?: string | null
    masa_aktif?: Date | string | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at?: Date | string
    updated_at?: Date | string
    tanggal_pemesanan?: Date | string | null
    userId?: string | null
    pjId?: string | null
    jenazahId?: string | null
    blokId?: string | null
  }

  export type makamStatusUpdateInput = {
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneWithoutStatusesNestedInput
    pj?: Penanggung_JawabUpdateOneWithoutStatusesNestedInput
    jenazah?: JenazahUpdateOneWithoutStatusesNestedInput
    blok?: BlokUpdateOneWithoutMakamStatusNestedInput
  }

  export type makamStatusUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    pjId?: NullableStringFieldUpdateOperationsInput | string | null
    jenazahId?: NullableStringFieldUpdateOperationsInput | string | null
    blokId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type makamStatusCreateManyInput = {
    id?: number
    nama: string
    lokasi: string
    silsilah: string
    ext?: string | null
    masa_aktif?: Date | string | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at?: Date | string
    updated_at?: Date | string
    tanggal_pemesanan?: Date | string | null
    userId?: string | null
    pjId?: string | null
    jenazahId?: string | null
    blokId?: string | null
  }

  export type makamStatusUpdateManyMutationInput = {
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type makamStatusUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    pjId?: NullableStringFieldUpdateOperationsInput | string | null
    jenazahId?: NullableStringFieldUpdateOperationsInput | string | null
    blokId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type AdminCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    contact?: SortOrder
  }

  export type AdminAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AdminMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    contact?: SortOrder
  }

  export type AdminMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    contact?: SortOrder
  }

  export type AdminSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type ApproverCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type ApproverAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ApproverMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type ApproverMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type ApproverSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PengawasCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type PengawasAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PengawasMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type PengawasMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type PengawasSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type MakamListRelationFilter = {
    every?: makamWhereInput
    some?: makamWhereInput
    none?: makamWhereInput
  }

  export type MakamStatusListRelationFilter = {
    every?: makamStatusWhereInput
    some?: makamStatusWhereInput
    none?: makamStatusWhereInput
  }

  export type JenazahNullableScalarRelationFilter = {
    is?: JenazahWhereInput | null
    isNot?: JenazahWhereInput | null
  }

  export type Penanggung_JawabNullableScalarRelationFilter = {
    is?: Penanggung_JawabWhereInput | null
    isNot?: Penanggung_JawabWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type makamOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type makamStatusOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    contact?: SortOrder
    email?: SortOrder
    status?: SortOrder
    ktp_num?: SortOrder
    emergency_name?: SortOrder
    emergency_contact?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    contact?: SortOrder
    email?: SortOrder
    status?: SortOrder
    ktp_num?: SortOrder
    emergency_name?: SortOrder
    emergency_contact?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    contact?: SortOrder
    email?: SortOrder
    status?: SortOrder
    ktp_num?: SortOrder
    emergency_name?: SortOrder
    emergency_contact?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type Penanggung_JawabCountOrderByAggregateInput = {
    id_penanggung_jawab?: SortOrder
    id_user?: SortOrder
  }

  export type Penanggung_JawabMaxOrderByAggregateInput = {
    id_penanggung_jawab?: SortOrder
    id_user?: SortOrder
  }

  export type Penanggung_JawabMinOrderByAggregateInput = {
    id_penanggung_jawab?: SortOrder
    id_user?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BlokNullableScalarRelationFilter = {
    is?: BlokWhereInput | null
    isNot?: BlokWhereInput | null
  }

  export type JenazahCountOrderByAggregateInput = {
    id_jenazah?: SortOrder
    tanggal_pemakaman?: SortOrder
    status_jenazah?: SortOrder
    masa_aktif?: SortOrder
    status_pembayaran_pesanan?: SortOrder
    status_pembayaran_iuran_tahunan?: SortOrder
    id_user?: SortOrder
    id_blok?: SortOrder
  }

  export type JenazahAvgOrderByAggregateInput = {
    masa_aktif?: SortOrder
  }

  export type JenazahMaxOrderByAggregateInput = {
    id_jenazah?: SortOrder
    tanggal_pemakaman?: SortOrder
    status_jenazah?: SortOrder
    masa_aktif?: SortOrder
    status_pembayaran_pesanan?: SortOrder
    status_pembayaran_iuran_tahunan?: SortOrder
    id_user?: SortOrder
    id_blok?: SortOrder
  }

  export type JenazahMinOrderByAggregateInput = {
    id_jenazah?: SortOrder
    tanggal_pemakaman?: SortOrder
    status_jenazah?: SortOrder
    masa_aktif?: SortOrder
    status_pembayaran_pesanan?: SortOrder
    status_pembayaran_iuran_tahunan?: SortOrder
    id_user?: SortOrder
    id_blok?: SortOrder
  }

  export type JenazahSumOrderByAggregateInput = {
    masa_aktif?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type JenazahListRelationFilter = {
    every?: JenazahWhereInput
    some?: JenazahWhereInput
    none?: JenazahWhereInput
  }

  export type JenazahOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BlokCountOrderByAggregateInput = {
    id_blok?: SortOrder
    lokasi?: SortOrder
    tanggal_pemakaman_terakhir?: SortOrder
    status_blok?: SortOrder
    status_pesanan?: SortOrder
    availability?: SortOrder
    status_pembayaran?: SortOrder
  }

  export type BlokMaxOrderByAggregateInput = {
    id_blok?: SortOrder
    lokasi?: SortOrder
    tanggal_pemakaman_terakhir?: SortOrder
    status_blok?: SortOrder
    status_pesanan?: SortOrder
    availability?: SortOrder
    status_pembayaran?: SortOrder
  }

  export type BlokMinOrderByAggregateInput = {
    id_blok?: SortOrder
    lokasi?: SortOrder
    tanggal_pemakaman_terakhir?: SortOrder
    status_blok?: SortOrder
    status_pesanan?: SortOrder
    availability?: SortOrder
    status_pembayaran?: SortOrder
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type makamCountOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    lokasi?: SortOrder
    silsilah?: SortOrder
    ext?: SortOrder
    masa_aktif?: SortOrder
    nama_penanggung_jawab?: SortOrder
    kontak_penanggung_jawab?: SortOrder
    description?: SortOrder
    payment?: SortOrder
    approved?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    tanggal_pemesanan?: SortOrder
    userId?: SortOrder
    pjId?: SortOrder
    jenazahId?: SortOrder
    blokId?: SortOrder
  }

  export type makamAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type makamMaxOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    lokasi?: SortOrder
    silsilah?: SortOrder
    ext?: SortOrder
    masa_aktif?: SortOrder
    nama_penanggung_jawab?: SortOrder
    kontak_penanggung_jawab?: SortOrder
    description?: SortOrder
    payment?: SortOrder
    approved?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    tanggal_pemesanan?: SortOrder
    userId?: SortOrder
    pjId?: SortOrder
    jenazahId?: SortOrder
    blokId?: SortOrder
  }

  export type makamMinOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    lokasi?: SortOrder
    silsilah?: SortOrder
    ext?: SortOrder
    masa_aktif?: SortOrder
    nama_penanggung_jawab?: SortOrder
    kontak_penanggung_jawab?: SortOrder
    description?: SortOrder
    payment?: SortOrder
    approved?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    tanggal_pemesanan?: SortOrder
    userId?: SortOrder
    pjId?: SortOrder
    jenazahId?: SortOrder
    blokId?: SortOrder
  }

  export type makamSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type makamStatusCountOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    lokasi?: SortOrder
    silsilah?: SortOrder
    ext?: SortOrder
    masa_aktif?: SortOrder
    nama_penanggung_jawab?: SortOrder
    kontak_penanggung_jawab?: SortOrder
    description?: SortOrder
    payment?: SortOrder
    approved?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    tanggal_pemesanan?: SortOrder
    userId?: SortOrder
    pjId?: SortOrder
    jenazahId?: SortOrder
    blokId?: SortOrder
  }

  export type makamStatusAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type makamStatusMaxOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    lokasi?: SortOrder
    silsilah?: SortOrder
    ext?: SortOrder
    masa_aktif?: SortOrder
    nama_penanggung_jawab?: SortOrder
    kontak_penanggung_jawab?: SortOrder
    description?: SortOrder
    payment?: SortOrder
    approved?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    tanggal_pemesanan?: SortOrder
    userId?: SortOrder
    pjId?: SortOrder
    jenazahId?: SortOrder
    blokId?: SortOrder
  }

  export type makamStatusMinOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    lokasi?: SortOrder
    silsilah?: SortOrder
    ext?: SortOrder
    masa_aktif?: SortOrder
    nama_penanggung_jawab?: SortOrder
    kontak_penanggung_jawab?: SortOrder
    description?: SortOrder
    payment?: SortOrder
    approved?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    tanggal_pemesanan?: SortOrder
    userId?: SortOrder
    pjId?: SortOrder
    jenazahId?: SortOrder
    blokId?: SortOrder
  }

  export type makamStatusSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type makamCreateNestedManyWithoutUserInput = {
    create?: XOR<makamCreateWithoutUserInput, makamUncheckedCreateWithoutUserInput> | makamCreateWithoutUserInput[] | makamUncheckedCreateWithoutUserInput[]
    connectOrCreate?: makamCreateOrConnectWithoutUserInput | makamCreateOrConnectWithoutUserInput[]
    createMany?: makamCreateManyUserInputEnvelope
    connect?: makamWhereUniqueInput | makamWhereUniqueInput[]
  }

  export type makamStatusCreateNestedManyWithoutUserInput = {
    create?: XOR<makamStatusCreateWithoutUserInput, makamStatusUncheckedCreateWithoutUserInput> | makamStatusCreateWithoutUserInput[] | makamStatusUncheckedCreateWithoutUserInput[]
    connectOrCreate?: makamStatusCreateOrConnectWithoutUserInput | makamStatusCreateOrConnectWithoutUserInput[]
    createMany?: makamStatusCreateManyUserInputEnvelope
    connect?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
  }

  export type JenazahCreateNestedOneWithoutUserInput = {
    create?: XOR<JenazahCreateWithoutUserInput, JenazahUncheckedCreateWithoutUserInput>
    connectOrCreate?: JenazahCreateOrConnectWithoutUserInput
    connect?: JenazahWhereUniqueInput
  }

  export type Penanggung_JawabCreateNestedOneWithoutUserInput = {
    create?: XOR<Penanggung_JawabCreateWithoutUserInput, Penanggung_JawabUncheckedCreateWithoutUserInput>
    connectOrCreate?: Penanggung_JawabCreateOrConnectWithoutUserInput
    connect?: Penanggung_JawabWhereUniqueInput
  }

  export type makamUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<makamCreateWithoutUserInput, makamUncheckedCreateWithoutUserInput> | makamCreateWithoutUserInput[] | makamUncheckedCreateWithoutUserInput[]
    connectOrCreate?: makamCreateOrConnectWithoutUserInput | makamCreateOrConnectWithoutUserInput[]
    createMany?: makamCreateManyUserInputEnvelope
    connect?: makamWhereUniqueInput | makamWhereUniqueInput[]
  }

  export type makamStatusUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<makamStatusCreateWithoutUserInput, makamStatusUncheckedCreateWithoutUserInput> | makamStatusCreateWithoutUserInput[] | makamStatusUncheckedCreateWithoutUserInput[]
    connectOrCreate?: makamStatusCreateOrConnectWithoutUserInput | makamStatusCreateOrConnectWithoutUserInput[]
    createMany?: makamStatusCreateManyUserInputEnvelope
    connect?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
  }

  export type JenazahUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<JenazahCreateWithoutUserInput, JenazahUncheckedCreateWithoutUserInput>
    connectOrCreate?: JenazahCreateOrConnectWithoutUserInput
    connect?: JenazahWhereUniqueInput
  }

  export type Penanggung_JawabUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<Penanggung_JawabCreateWithoutUserInput, Penanggung_JawabUncheckedCreateWithoutUserInput>
    connectOrCreate?: Penanggung_JawabCreateOrConnectWithoutUserInput
    connect?: Penanggung_JawabWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type makamUpdateManyWithoutUserNestedInput = {
    create?: XOR<makamCreateWithoutUserInput, makamUncheckedCreateWithoutUserInput> | makamCreateWithoutUserInput[] | makamUncheckedCreateWithoutUserInput[]
    connectOrCreate?: makamCreateOrConnectWithoutUserInput | makamCreateOrConnectWithoutUserInput[]
    upsert?: makamUpsertWithWhereUniqueWithoutUserInput | makamUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: makamCreateManyUserInputEnvelope
    set?: makamWhereUniqueInput | makamWhereUniqueInput[]
    disconnect?: makamWhereUniqueInput | makamWhereUniqueInput[]
    delete?: makamWhereUniqueInput | makamWhereUniqueInput[]
    connect?: makamWhereUniqueInput | makamWhereUniqueInput[]
    update?: makamUpdateWithWhereUniqueWithoutUserInput | makamUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: makamUpdateManyWithWhereWithoutUserInput | makamUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: makamScalarWhereInput | makamScalarWhereInput[]
  }

  export type makamStatusUpdateManyWithoutUserNestedInput = {
    create?: XOR<makamStatusCreateWithoutUserInput, makamStatusUncheckedCreateWithoutUserInput> | makamStatusCreateWithoutUserInput[] | makamStatusUncheckedCreateWithoutUserInput[]
    connectOrCreate?: makamStatusCreateOrConnectWithoutUserInput | makamStatusCreateOrConnectWithoutUserInput[]
    upsert?: makamStatusUpsertWithWhereUniqueWithoutUserInput | makamStatusUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: makamStatusCreateManyUserInputEnvelope
    set?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    disconnect?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    delete?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    connect?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    update?: makamStatusUpdateWithWhereUniqueWithoutUserInput | makamStatusUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: makamStatusUpdateManyWithWhereWithoutUserInput | makamStatusUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: makamStatusScalarWhereInput | makamStatusScalarWhereInput[]
  }

  export type JenazahUpdateOneWithoutUserNestedInput = {
    create?: XOR<JenazahCreateWithoutUserInput, JenazahUncheckedCreateWithoutUserInput>
    connectOrCreate?: JenazahCreateOrConnectWithoutUserInput
    upsert?: JenazahUpsertWithoutUserInput
    disconnect?: JenazahWhereInput | boolean
    delete?: JenazahWhereInput | boolean
    connect?: JenazahWhereUniqueInput
    update?: XOR<XOR<JenazahUpdateToOneWithWhereWithoutUserInput, JenazahUpdateWithoutUserInput>, JenazahUncheckedUpdateWithoutUserInput>
  }

  export type Penanggung_JawabUpdateOneWithoutUserNestedInput = {
    create?: XOR<Penanggung_JawabCreateWithoutUserInput, Penanggung_JawabUncheckedCreateWithoutUserInput>
    connectOrCreate?: Penanggung_JawabCreateOrConnectWithoutUserInput
    upsert?: Penanggung_JawabUpsertWithoutUserInput
    disconnect?: Penanggung_JawabWhereInput | boolean
    delete?: Penanggung_JawabWhereInput | boolean
    connect?: Penanggung_JawabWhereUniqueInput
    update?: XOR<XOR<Penanggung_JawabUpdateToOneWithWhereWithoutUserInput, Penanggung_JawabUpdateWithoutUserInput>, Penanggung_JawabUncheckedUpdateWithoutUserInput>
  }

  export type makamUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<makamCreateWithoutUserInput, makamUncheckedCreateWithoutUserInput> | makamCreateWithoutUserInput[] | makamUncheckedCreateWithoutUserInput[]
    connectOrCreate?: makamCreateOrConnectWithoutUserInput | makamCreateOrConnectWithoutUserInput[]
    upsert?: makamUpsertWithWhereUniqueWithoutUserInput | makamUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: makamCreateManyUserInputEnvelope
    set?: makamWhereUniqueInput | makamWhereUniqueInput[]
    disconnect?: makamWhereUniqueInput | makamWhereUniqueInput[]
    delete?: makamWhereUniqueInput | makamWhereUniqueInput[]
    connect?: makamWhereUniqueInput | makamWhereUniqueInput[]
    update?: makamUpdateWithWhereUniqueWithoutUserInput | makamUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: makamUpdateManyWithWhereWithoutUserInput | makamUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: makamScalarWhereInput | makamScalarWhereInput[]
  }

  export type makamStatusUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<makamStatusCreateWithoutUserInput, makamStatusUncheckedCreateWithoutUserInput> | makamStatusCreateWithoutUserInput[] | makamStatusUncheckedCreateWithoutUserInput[]
    connectOrCreate?: makamStatusCreateOrConnectWithoutUserInput | makamStatusCreateOrConnectWithoutUserInput[]
    upsert?: makamStatusUpsertWithWhereUniqueWithoutUserInput | makamStatusUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: makamStatusCreateManyUserInputEnvelope
    set?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    disconnect?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    delete?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    connect?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    update?: makamStatusUpdateWithWhereUniqueWithoutUserInput | makamStatusUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: makamStatusUpdateManyWithWhereWithoutUserInput | makamStatusUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: makamStatusScalarWhereInput | makamStatusScalarWhereInput[]
  }

  export type JenazahUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<JenazahCreateWithoutUserInput, JenazahUncheckedCreateWithoutUserInput>
    connectOrCreate?: JenazahCreateOrConnectWithoutUserInput
    upsert?: JenazahUpsertWithoutUserInput
    disconnect?: JenazahWhereInput | boolean
    delete?: JenazahWhereInput | boolean
    connect?: JenazahWhereUniqueInput
    update?: XOR<XOR<JenazahUpdateToOneWithWhereWithoutUserInput, JenazahUpdateWithoutUserInput>, JenazahUncheckedUpdateWithoutUserInput>
  }

  export type Penanggung_JawabUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<Penanggung_JawabCreateWithoutUserInput, Penanggung_JawabUncheckedCreateWithoutUserInput>
    connectOrCreate?: Penanggung_JawabCreateOrConnectWithoutUserInput
    upsert?: Penanggung_JawabUpsertWithoutUserInput
    disconnect?: Penanggung_JawabWhereInput | boolean
    delete?: Penanggung_JawabWhereInput | boolean
    connect?: Penanggung_JawabWhereUniqueInput
    update?: XOR<XOR<Penanggung_JawabUpdateToOneWithWhereWithoutUserInput, Penanggung_JawabUpdateWithoutUserInput>, Penanggung_JawabUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutPenanggung_jawabInput = {
    create?: XOR<UserCreateWithoutPenanggung_jawabInput, UserUncheckedCreateWithoutPenanggung_jawabInput>
    connectOrCreate?: UserCreateOrConnectWithoutPenanggung_jawabInput
    connect?: UserWhereUniqueInput
  }

  export type makamCreateNestedManyWithoutPjInput = {
    create?: XOR<makamCreateWithoutPjInput, makamUncheckedCreateWithoutPjInput> | makamCreateWithoutPjInput[] | makamUncheckedCreateWithoutPjInput[]
    connectOrCreate?: makamCreateOrConnectWithoutPjInput | makamCreateOrConnectWithoutPjInput[]
    createMany?: makamCreateManyPjInputEnvelope
    connect?: makamWhereUniqueInput | makamWhereUniqueInput[]
  }

  export type makamStatusCreateNestedManyWithoutPjInput = {
    create?: XOR<makamStatusCreateWithoutPjInput, makamStatusUncheckedCreateWithoutPjInput> | makamStatusCreateWithoutPjInput[] | makamStatusUncheckedCreateWithoutPjInput[]
    connectOrCreate?: makamStatusCreateOrConnectWithoutPjInput | makamStatusCreateOrConnectWithoutPjInput[]
    createMany?: makamStatusCreateManyPjInputEnvelope
    connect?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
  }

  export type makamUncheckedCreateNestedManyWithoutPjInput = {
    create?: XOR<makamCreateWithoutPjInput, makamUncheckedCreateWithoutPjInput> | makamCreateWithoutPjInput[] | makamUncheckedCreateWithoutPjInput[]
    connectOrCreate?: makamCreateOrConnectWithoutPjInput | makamCreateOrConnectWithoutPjInput[]
    createMany?: makamCreateManyPjInputEnvelope
    connect?: makamWhereUniqueInput | makamWhereUniqueInput[]
  }

  export type makamStatusUncheckedCreateNestedManyWithoutPjInput = {
    create?: XOR<makamStatusCreateWithoutPjInput, makamStatusUncheckedCreateWithoutPjInput> | makamStatusCreateWithoutPjInput[] | makamStatusUncheckedCreateWithoutPjInput[]
    connectOrCreate?: makamStatusCreateOrConnectWithoutPjInput | makamStatusCreateOrConnectWithoutPjInput[]
    createMany?: makamStatusCreateManyPjInputEnvelope
    connect?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
  }

  export type UserUpdateOneWithoutPenanggung_jawabNestedInput = {
    create?: XOR<UserCreateWithoutPenanggung_jawabInput, UserUncheckedCreateWithoutPenanggung_jawabInput>
    connectOrCreate?: UserCreateOrConnectWithoutPenanggung_jawabInput
    upsert?: UserUpsertWithoutPenanggung_jawabInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPenanggung_jawabInput, UserUpdateWithoutPenanggung_jawabInput>, UserUncheckedUpdateWithoutPenanggung_jawabInput>
  }

  export type makamUpdateManyWithoutPjNestedInput = {
    create?: XOR<makamCreateWithoutPjInput, makamUncheckedCreateWithoutPjInput> | makamCreateWithoutPjInput[] | makamUncheckedCreateWithoutPjInput[]
    connectOrCreate?: makamCreateOrConnectWithoutPjInput | makamCreateOrConnectWithoutPjInput[]
    upsert?: makamUpsertWithWhereUniqueWithoutPjInput | makamUpsertWithWhereUniqueWithoutPjInput[]
    createMany?: makamCreateManyPjInputEnvelope
    set?: makamWhereUniqueInput | makamWhereUniqueInput[]
    disconnect?: makamWhereUniqueInput | makamWhereUniqueInput[]
    delete?: makamWhereUniqueInput | makamWhereUniqueInput[]
    connect?: makamWhereUniqueInput | makamWhereUniqueInput[]
    update?: makamUpdateWithWhereUniqueWithoutPjInput | makamUpdateWithWhereUniqueWithoutPjInput[]
    updateMany?: makamUpdateManyWithWhereWithoutPjInput | makamUpdateManyWithWhereWithoutPjInput[]
    deleteMany?: makamScalarWhereInput | makamScalarWhereInput[]
  }

  export type makamStatusUpdateManyWithoutPjNestedInput = {
    create?: XOR<makamStatusCreateWithoutPjInput, makamStatusUncheckedCreateWithoutPjInput> | makamStatusCreateWithoutPjInput[] | makamStatusUncheckedCreateWithoutPjInput[]
    connectOrCreate?: makamStatusCreateOrConnectWithoutPjInput | makamStatusCreateOrConnectWithoutPjInput[]
    upsert?: makamStatusUpsertWithWhereUniqueWithoutPjInput | makamStatusUpsertWithWhereUniqueWithoutPjInput[]
    createMany?: makamStatusCreateManyPjInputEnvelope
    set?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    disconnect?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    delete?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    connect?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    update?: makamStatusUpdateWithWhereUniqueWithoutPjInput | makamStatusUpdateWithWhereUniqueWithoutPjInput[]
    updateMany?: makamStatusUpdateManyWithWhereWithoutPjInput | makamStatusUpdateManyWithWhereWithoutPjInput[]
    deleteMany?: makamStatusScalarWhereInput | makamStatusScalarWhereInput[]
  }

  export type makamUncheckedUpdateManyWithoutPjNestedInput = {
    create?: XOR<makamCreateWithoutPjInput, makamUncheckedCreateWithoutPjInput> | makamCreateWithoutPjInput[] | makamUncheckedCreateWithoutPjInput[]
    connectOrCreate?: makamCreateOrConnectWithoutPjInput | makamCreateOrConnectWithoutPjInput[]
    upsert?: makamUpsertWithWhereUniqueWithoutPjInput | makamUpsertWithWhereUniqueWithoutPjInput[]
    createMany?: makamCreateManyPjInputEnvelope
    set?: makamWhereUniqueInput | makamWhereUniqueInput[]
    disconnect?: makamWhereUniqueInput | makamWhereUniqueInput[]
    delete?: makamWhereUniqueInput | makamWhereUniqueInput[]
    connect?: makamWhereUniqueInput | makamWhereUniqueInput[]
    update?: makamUpdateWithWhereUniqueWithoutPjInput | makamUpdateWithWhereUniqueWithoutPjInput[]
    updateMany?: makamUpdateManyWithWhereWithoutPjInput | makamUpdateManyWithWhereWithoutPjInput[]
    deleteMany?: makamScalarWhereInput | makamScalarWhereInput[]
  }

  export type makamStatusUncheckedUpdateManyWithoutPjNestedInput = {
    create?: XOR<makamStatusCreateWithoutPjInput, makamStatusUncheckedCreateWithoutPjInput> | makamStatusCreateWithoutPjInput[] | makamStatusUncheckedCreateWithoutPjInput[]
    connectOrCreate?: makamStatusCreateOrConnectWithoutPjInput | makamStatusCreateOrConnectWithoutPjInput[]
    upsert?: makamStatusUpsertWithWhereUniqueWithoutPjInput | makamStatusUpsertWithWhereUniqueWithoutPjInput[]
    createMany?: makamStatusCreateManyPjInputEnvelope
    set?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    disconnect?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    delete?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    connect?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    update?: makamStatusUpdateWithWhereUniqueWithoutPjInput | makamStatusUpdateWithWhereUniqueWithoutPjInput[]
    updateMany?: makamStatusUpdateManyWithWhereWithoutPjInput | makamStatusUpdateManyWithWhereWithoutPjInput[]
    deleteMany?: makamStatusScalarWhereInput | makamStatusScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutJenazahInput = {
    create?: XOR<UserCreateWithoutJenazahInput, UserUncheckedCreateWithoutJenazahInput>
    connectOrCreate?: UserCreateOrConnectWithoutJenazahInput
    connect?: UserWhereUniqueInput
  }

  export type BlokCreateNestedOneWithoutJenazahInput = {
    create?: XOR<BlokCreateWithoutJenazahInput, BlokUncheckedCreateWithoutJenazahInput>
    connectOrCreate?: BlokCreateOrConnectWithoutJenazahInput
    connect?: BlokWhereUniqueInput
  }

  export type makamCreateNestedManyWithoutJenazahInput = {
    create?: XOR<makamCreateWithoutJenazahInput, makamUncheckedCreateWithoutJenazahInput> | makamCreateWithoutJenazahInput[] | makamUncheckedCreateWithoutJenazahInput[]
    connectOrCreate?: makamCreateOrConnectWithoutJenazahInput | makamCreateOrConnectWithoutJenazahInput[]
    createMany?: makamCreateManyJenazahInputEnvelope
    connect?: makamWhereUniqueInput | makamWhereUniqueInput[]
  }

  export type makamStatusCreateNestedManyWithoutJenazahInput = {
    create?: XOR<makamStatusCreateWithoutJenazahInput, makamStatusUncheckedCreateWithoutJenazahInput> | makamStatusCreateWithoutJenazahInput[] | makamStatusUncheckedCreateWithoutJenazahInput[]
    connectOrCreate?: makamStatusCreateOrConnectWithoutJenazahInput | makamStatusCreateOrConnectWithoutJenazahInput[]
    createMany?: makamStatusCreateManyJenazahInputEnvelope
    connect?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
  }

  export type makamUncheckedCreateNestedManyWithoutJenazahInput = {
    create?: XOR<makamCreateWithoutJenazahInput, makamUncheckedCreateWithoutJenazahInput> | makamCreateWithoutJenazahInput[] | makamUncheckedCreateWithoutJenazahInput[]
    connectOrCreate?: makamCreateOrConnectWithoutJenazahInput | makamCreateOrConnectWithoutJenazahInput[]
    createMany?: makamCreateManyJenazahInputEnvelope
    connect?: makamWhereUniqueInput | makamWhereUniqueInput[]
  }

  export type makamStatusUncheckedCreateNestedManyWithoutJenazahInput = {
    create?: XOR<makamStatusCreateWithoutJenazahInput, makamStatusUncheckedCreateWithoutJenazahInput> | makamStatusCreateWithoutJenazahInput[] | makamStatusUncheckedCreateWithoutJenazahInput[]
    connectOrCreate?: makamStatusCreateOrConnectWithoutJenazahInput | makamStatusCreateOrConnectWithoutJenazahInput[]
    createMany?: makamStatusCreateManyJenazahInputEnvelope
    connect?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneWithoutJenazahNestedInput = {
    create?: XOR<UserCreateWithoutJenazahInput, UserUncheckedCreateWithoutJenazahInput>
    connectOrCreate?: UserCreateOrConnectWithoutJenazahInput
    upsert?: UserUpsertWithoutJenazahInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutJenazahInput, UserUpdateWithoutJenazahInput>, UserUncheckedUpdateWithoutJenazahInput>
  }

  export type BlokUpdateOneWithoutJenazahNestedInput = {
    create?: XOR<BlokCreateWithoutJenazahInput, BlokUncheckedCreateWithoutJenazahInput>
    connectOrCreate?: BlokCreateOrConnectWithoutJenazahInput
    upsert?: BlokUpsertWithoutJenazahInput
    disconnect?: BlokWhereInput | boolean
    delete?: BlokWhereInput | boolean
    connect?: BlokWhereUniqueInput
    update?: XOR<XOR<BlokUpdateToOneWithWhereWithoutJenazahInput, BlokUpdateWithoutJenazahInput>, BlokUncheckedUpdateWithoutJenazahInput>
  }

  export type makamUpdateManyWithoutJenazahNestedInput = {
    create?: XOR<makamCreateWithoutJenazahInput, makamUncheckedCreateWithoutJenazahInput> | makamCreateWithoutJenazahInput[] | makamUncheckedCreateWithoutJenazahInput[]
    connectOrCreate?: makamCreateOrConnectWithoutJenazahInput | makamCreateOrConnectWithoutJenazahInput[]
    upsert?: makamUpsertWithWhereUniqueWithoutJenazahInput | makamUpsertWithWhereUniqueWithoutJenazahInput[]
    createMany?: makamCreateManyJenazahInputEnvelope
    set?: makamWhereUniqueInput | makamWhereUniqueInput[]
    disconnect?: makamWhereUniqueInput | makamWhereUniqueInput[]
    delete?: makamWhereUniqueInput | makamWhereUniqueInput[]
    connect?: makamWhereUniqueInput | makamWhereUniqueInput[]
    update?: makamUpdateWithWhereUniqueWithoutJenazahInput | makamUpdateWithWhereUniqueWithoutJenazahInput[]
    updateMany?: makamUpdateManyWithWhereWithoutJenazahInput | makamUpdateManyWithWhereWithoutJenazahInput[]
    deleteMany?: makamScalarWhereInput | makamScalarWhereInput[]
  }

  export type makamStatusUpdateManyWithoutJenazahNestedInput = {
    create?: XOR<makamStatusCreateWithoutJenazahInput, makamStatusUncheckedCreateWithoutJenazahInput> | makamStatusCreateWithoutJenazahInput[] | makamStatusUncheckedCreateWithoutJenazahInput[]
    connectOrCreate?: makamStatusCreateOrConnectWithoutJenazahInput | makamStatusCreateOrConnectWithoutJenazahInput[]
    upsert?: makamStatusUpsertWithWhereUniqueWithoutJenazahInput | makamStatusUpsertWithWhereUniqueWithoutJenazahInput[]
    createMany?: makamStatusCreateManyJenazahInputEnvelope
    set?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    disconnect?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    delete?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    connect?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    update?: makamStatusUpdateWithWhereUniqueWithoutJenazahInput | makamStatusUpdateWithWhereUniqueWithoutJenazahInput[]
    updateMany?: makamStatusUpdateManyWithWhereWithoutJenazahInput | makamStatusUpdateManyWithWhereWithoutJenazahInput[]
    deleteMany?: makamStatusScalarWhereInput | makamStatusScalarWhereInput[]
  }

  export type makamUncheckedUpdateManyWithoutJenazahNestedInput = {
    create?: XOR<makamCreateWithoutJenazahInput, makamUncheckedCreateWithoutJenazahInput> | makamCreateWithoutJenazahInput[] | makamUncheckedCreateWithoutJenazahInput[]
    connectOrCreate?: makamCreateOrConnectWithoutJenazahInput | makamCreateOrConnectWithoutJenazahInput[]
    upsert?: makamUpsertWithWhereUniqueWithoutJenazahInput | makamUpsertWithWhereUniqueWithoutJenazahInput[]
    createMany?: makamCreateManyJenazahInputEnvelope
    set?: makamWhereUniqueInput | makamWhereUniqueInput[]
    disconnect?: makamWhereUniqueInput | makamWhereUniqueInput[]
    delete?: makamWhereUniqueInput | makamWhereUniqueInput[]
    connect?: makamWhereUniqueInput | makamWhereUniqueInput[]
    update?: makamUpdateWithWhereUniqueWithoutJenazahInput | makamUpdateWithWhereUniqueWithoutJenazahInput[]
    updateMany?: makamUpdateManyWithWhereWithoutJenazahInput | makamUpdateManyWithWhereWithoutJenazahInput[]
    deleteMany?: makamScalarWhereInput | makamScalarWhereInput[]
  }

  export type makamStatusUncheckedUpdateManyWithoutJenazahNestedInput = {
    create?: XOR<makamStatusCreateWithoutJenazahInput, makamStatusUncheckedCreateWithoutJenazahInput> | makamStatusCreateWithoutJenazahInput[] | makamStatusUncheckedCreateWithoutJenazahInput[]
    connectOrCreate?: makamStatusCreateOrConnectWithoutJenazahInput | makamStatusCreateOrConnectWithoutJenazahInput[]
    upsert?: makamStatusUpsertWithWhereUniqueWithoutJenazahInput | makamStatusUpsertWithWhereUniqueWithoutJenazahInput[]
    createMany?: makamStatusCreateManyJenazahInputEnvelope
    set?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    disconnect?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    delete?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    connect?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    update?: makamStatusUpdateWithWhereUniqueWithoutJenazahInput | makamStatusUpdateWithWhereUniqueWithoutJenazahInput[]
    updateMany?: makamStatusUpdateManyWithWhereWithoutJenazahInput | makamStatusUpdateManyWithWhereWithoutJenazahInput[]
    deleteMany?: makamStatusScalarWhereInput | makamStatusScalarWhereInput[]
  }

  export type JenazahCreateNestedManyWithoutBlokInput = {
    create?: XOR<JenazahCreateWithoutBlokInput, JenazahUncheckedCreateWithoutBlokInput> | JenazahCreateWithoutBlokInput[] | JenazahUncheckedCreateWithoutBlokInput[]
    connectOrCreate?: JenazahCreateOrConnectWithoutBlokInput | JenazahCreateOrConnectWithoutBlokInput[]
    createMany?: JenazahCreateManyBlokInputEnvelope
    connect?: JenazahWhereUniqueInput | JenazahWhereUniqueInput[]
  }

  export type makamCreateNestedManyWithoutBlokInput = {
    create?: XOR<makamCreateWithoutBlokInput, makamUncheckedCreateWithoutBlokInput> | makamCreateWithoutBlokInput[] | makamUncheckedCreateWithoutBlokInput[]
    connectOrCreate?: makamCreateOrConnectWithoutBlokInput | makamCreateOrConnectWithoutBlokInput[]
    createMany?: makamCreateManyBlokInputEnvelope
    connect?: makamWhereUniqueInput | makamWhereUniqueInput[]
  }

  export type makamStatusCreateNestedManyWithoutBlokInput = {
    create?: XOR<makamStatusCreateWithoutBlokInput, makamStatusUncheckedCreateWithoutBlokInput> | makamStatusCreateWithoutBlokInput[] | makamStatusUncheckedCreateWithoutBlokInput[]
    connectOrCreate?: makamStatusCreateOrConnectWithoutBlokInput | makamStatusCreateOrConnectWithoutBlokInput[]
    createMany?: makamStatusCreateManyBlokInputEnvelope
    connect?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
  }

  export type JenazahUncheckedCreateNestedManyWithoutBlokInput = {
    create?: XOR<JenazahCreateWithoutBlokInput, JenazahUncheckedCreateWithoutBlokInput> | JenazahCreateWithoutBlokInput[] | JenazahUncheckedCreateWithoutBlokInput[]
    connectOrCreate?: JenazahCreateOrConnectWithoutBlokInput | JenazahCreateOrConnectWithoutBlokInput[]
    createMany?: JenazahCreateManyBlokInputEnvelope
    connect?: JenazahWhereUniqueInput | JenazahWhereUniqueInput[]
  }

  export type makamUncheckedCreateNestedManyWithoutBlokInput = {
    create?: XOR<makamCreateWithoutBlokInput, makamUncheckedCreateWithoutBlokInput> | makamCreateWithoutBlokInput[] | makamUncheckedCreateWithoutBlokInput[]
    connectOrCreate?: makamCreateOrConnectWithoutBlokInput | makamCreateOrConnectWithoutBlokInput[]
    createMany?: makamCreateManyBlokInputEnvelope
    connect?: makamWhereUniqueInput | makamWhereUniqueInput[]
  }

  export type makamStatusUncheckedCreateNestedManyWithoutBlokInput = {
    create?: XOR<makamStatusCreateWithoutBlokInput, makamStatusUncheckedCreateWithoutBlokInput> | makamStatusCreateWithoutBlokInput[] | makamStatusUncheckedCreateWithoutBlokInput[]
    connectOrCreate?: makamStatusCreateOrConnectWithoutBlokInput | makamStatusCreateOrConnectWithoutBlokInput[]
    createMany?: makamStatusCreateManyBlokInputEnvelope
    connect?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
  }

  export type JenazahUpdateManyWithoutBlokNestedInput = {
    create?: XOR<JenazahCreateWithoutBlokInput, JenazahUncheckedCreateWithoutBlokInput> | JenazahCreateWithoutBlokInput[] | JenazahUncheckedCreateWithoutBlokInput[]
    connectOrCreate?: JenazahCreateOrConnectWithoutBlokInput | JenazahCreateOrConnectWithoutBlokInput[]
    upsert?: JenazahUpsertWithWhereUniqueWithoutBlokInput | JenazahUpsertWithWhereUniqueWithoutBlokInput[]
    createMany?: JenazahCreateManyBlokInputEnvelope
    set?: JenazahWhereUniqueInput | JenazahWhereUniqueInput[]
    disconnect?: JenazahWhereUniqueInput | JenazahWhereUniqueInput[]
    delete?: JenazahWhereUniqueInput | JenazahWhereUniqueInput[]
    connect?: JenazahWhereUniqueInput | JenazahWhereUniqueInput[]
    update?: JenazahUpdateWithWhereUniqueWithoutBlokInput | JenazahUpdateWithWhereUniqueWithoutBlokInput[]
    updateMany?: JenazahUpdateManyWithWhereWithoutBlokInput | JenazahUpdateManyWithWhereWithoutBlokInput[]
    deleteMany?: JenazahScalarWhereInput | JenazahScalarWhereInput[]
  }

  export type makamUpdateManyWithoutBlokNestedInput = {
    create?: XOR<makamCreateWithoutBlokInput, makamUncheckedCreateWithoutBlokInput> | makamCreateWithoutBlokInput[] | makamUncheckedCreateWithoutBlokInput[]
    connectOrCreate?: makamCreateOrConnectWithoutBlokInput | makamCreateOrConnectWithoutBlokInput[]
    upsert?: makamUpsertWithWhereUniqueWithoutBlokInput | makamUpsertWithWhereUniqueWithoutBlokInput[]
    createMany?: makamCreateManyBlokInputEnvelope
    set?: makamWhereUniqueInput | makamWhereUniqueInput[]
    disconnect?: makamWhereUniqueInput | makamWhereUniqueInput[]
    delete?: makamWhereUniqueInput | makamWhereUniqueInput[]
    connect?: makamWhereUniqueInput | makamWhereUniqueInput[]
    update?: makamUpdateWithWhereUniqueWithoutBlokInput | makamUpdateWithWhereUniqueWithoutBlokInput[]
    updateMany?: makamUpdateManyWithWhereWithoutBlokInput | makamUpdateManyWithWhereWithoutBlokInput[]
    deleteMany?: makamScalarWhereInput | makamScalarWhereInput[]
  }

  export type makamStatusUpdateManyWithoutBlokNestedInput = {
    create?: XOR<makamStatusCreateWithoutBlokInput, makamStatusUncheckedCreateWithoutBlokInput> | makamStatusCreateWithoutBlokInput[] | makamStatusUncheckedCreateWithoutBlokInput[]
    connectOrCreate?: makamStatusCreateOrConnectWithoutBlokInput | makamStatusCreateOrConnectWithoutBlokInput[]
    upsert?: makamStatusUpsertWithWhereUniqueWithoutBlokInput | makamStatusUpsertWithWhereUniqueWithoutBlokInput[]
    createMany?: makamStatusCreateManyBlokInputEnvelope
    set?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    disconnect?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    delete?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    connect?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    update?: makamStatusUpdateWithWhereUniqueWithoutBlokInput | makamStatusUpdateWithWhereUniqueWithoutBlokInput[]
    updateMany?: makamStatusUpdateManyWithWhereWithoutBlokInput | makamStatusUpdateManyWithWhereWithoutBlokInput[]
    deleteMany?: makamStatusScalarWhereInput | makamStatusScalarWhereInput[]
  }

  export type JenazahUncheckedUpdateManyWithoutBlokNestedInput = {
    create?: XOR<JenazahCreateWithoutBlokInput, JenazahUncheckedCreateWithoutBlokInput> | JenazahCreateWithoutBlokInput[] | JenazahUncheckedCreateWithoutBlokInput[]
    connectOrCreate?: JenazahCreateOrConnectWithoutBlokInput | JenazahCreateOrConnectWithoutBlokInput[]
    upsert?: JenazahUpsertWithWhereUniqueWithoutBlokInput | JenazahUpsertWithWhereUniqueWithoutBlokInput[]
    createMany?: JenazahCreateManyBlokInputEnvelope
    set?: JenazahWhereUniqueInput | JenazahWhereUniqueInput[]
    disconnect?: JenazahWhereUniqueInput | JenazahWhereUniqueInput[]
    delete?: JenazahWhereUniqueInput | JenazahWhereUniqueInput[]
    connect?: JenazahWhereUniqueInput | JenazahWhereUniqueInput[]
    update?: JenazahUpdateWithWhereUniqueWithoutBlokInput | JenazahUpdateWithWhereUniqueWithoutBlokInput[]
    updateMany?: JenazahUpdateManyWithWhereWithoutBlokInput | JenazahUpdateManyWithWhereWithoutBlokInput[]
    deleteMany?: JenazahScalarWhereInput | JenazahScalarWhereInput[]
  }

  export type makamUncheckedUpdateManyWithoutBlokNestedInput = {
    create?: XOR<makamCreateWithoutBlokInput, makamUncheckedCreateWithoutBlokInput> | makamCreateWithoutBlokInput[] | makamUncheckedCreateWithoutBlokInput[]
    connectOrCreate?: makamCreateOrConnectWithoutBlokInput | makamCreateOrConnectWithoutBlokInput[]
    upsert?: makamUpsertWithWhereUniqueWithoutBlokInput | makamUpsertWithWhereUniqueWithoutBlokInput[]
    createMany?: makamCreateManyBlokInputEnvelope
    set?: makamWhereUniqueInput | makamWhereUniqueInput[]
    disconnect?: makamWhereUniqueInput | makamWhereUniqueInput[]
    delete?: makamWhereUniqueInput | makamWhereUniqueInput[]
    connect?: makamWhereUniqueInput | makamWhereUniqueInput[]
    update?: makamUpdateWithWhereUniqueWithoutBlokInput | makamUpdateWithWhereUniqueWithoutBlokInput[]
    updateMany?: makamUpdateManyWithWhereWithoutBlokInput | makamUpdateManyWithWhereWithoutBlokInput[]
    deleteMany?: makamScalarWhereInput | makamScalarWhereInput[]
  }

  export type makamStatusUncheckedUpdateManyWithoutBlokNestedInput = {
    create?: XOR<makamStatusCreateWithoutBlokInput, makamStatusUncheckedCreateWithoutBlokInput> | makamStatusCreateWithoutBlokInput[] | makamStatusUncheckedCreateWithoutBlokInput[]
    connectOrCreate?: makamStatusCreateOrConnectWithoutBlokInput | makamStatusCreateOrConnectWithoutBlokInput[]
    upsert?: makamStatusUpsertWithWhereUniqueWithoutBlokInput | makamStatusUpsertWithWhereUniqueWithoutBlokInput[]
    createMany?: makamStatusCreateManyBlokInputEnvelope
    set?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    disconnect?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    delete?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    connect?: makamStatusWhereUniqueInput | makamStatusWhereUniqueInput[]
    update?: makamStatusUpdateWithWhereUniqueWithoutBlokInput | makamStatusUpdateWithWhereUniqueWithoutBlokInput[]
    updateMany?: makamStatusUpdateManyWithWhereWithoutBlokInput | makamStatusUpdateManyWithWhereWithoutBlokInput[]
    deleteMany?: makamStatusScalarWhereInput | makamStatusScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutMakamsInput = {
    create?: XOR<UserCreateWithoutMakamsInput, UserUncheckedCreateWithoutMakamsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMakamsInput
    connect?: UserWhereUniqueInput
  }

  export type Penanggung_JawabCreateNestedOneWithoutMakamsInput = {
    create?: XOR<Penanggung_JawabCreateWithoutMakamsInput, Penanggung_JawabUncheckedCreateWithoutMakamsInput>
    connectOrCreate?: Penanggung_JawabCreateOrConnectWithoutMakamsInput
    connect?: Penanggung_JawabWhereUniqueInput
  }

  export type JenazahCreateNestedOneWithoutMakamsInput = {
    create?: XOR<JenazahCreateWithoutMakamsInput, JenazahUncheckedCreateWithoutMakamsInput>
    connectOrCreate?: JenazahCreateOrConnectWithoutMakamsInput
    connect?: JenazahWhereUniqueInput
  }

  export type BlokCreateNestedOneWithoutMakamInput = {
    create?: XOR<BlokCreateWithoutMakamInput, BlokUncheckedCreateWithoutMakamInput>
    connectOrCreate?: BlokCreateOrConnectWithoutMakamInput
    connect?: BlokWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneWithoutMakamsNestedInput = {
    create?: XOR<UserCreateWithoutMakamsInput, UserUncheckedCreateWithoutMakamsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMakamsInput
    upsert?: UserUpsertWithoutMakamsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMakamsInput, UserUpdateWithoutMakamsInput>, UserUncheckedUpdateWithoutMakamsInput>
  }

  export type Penanggung_JawabUpdateOneWithoutMakamsNestedInput = {
    create?: XOR<Penanggung_JawabCreateWithoutMakamsInput, Penanggung_JawabUncheckedCreateWithoutMakamsInput>
    connectOrCreate?: Penanggung_JawabCreateOrConnectWithoutMakamsInput
    upsert?: Penanggung_JawabUpsertWithoutMakamsInput
    disconnect?: Penanggung_JawabWhereInput | boolean
    delete?: Penanggung_JawabWhereInput | boolean
    connect?: Penanggung_JawabWhereUniqueInput
    update?: XOR<XOR<Penanggung_JawabUpdateToOneWithWhereWithoutMakamsInput, Penanggung_JawabUpdateWithoutMakamsInput>, Penanggung_JawabUncheckedUpdateWithoutMakamsInput>
  }

  export type JenazahUpdateOneWithoutMakamsNestedInput = {
    create?: XOR<JenazahCreateWithoutMakamsInput, JenazahUncheckedCreateWithoutMakamsInput>
    connectOrCreate?: JenazahCreateOrConnectWithoutMakamsInput
    upsert?: JenazahUpsertWithoutMakamsInput
    disconnect?: JenazahWhereInput | boolean
    delete?: JenazahWhereInput | boolean
    connect?: JenazahWhereUniqueInput
    update?: XOR<XOR<JenazahUpdateToOneWithWhereWithoutMakamsInput, JenazahUpdateWithoutMakamsInput>, JenazahUncheckedUpdateWithoutMakamsInput>
  }

  export type BlokUpdateOneWithoutMakamNestedInput = {
    create?: XOR<BlokCreateWithoutMakamInput, BlokUncheckedCreateWithoutMakamInput>
    connectOrCreate?: BlokCreateOrConnectWithoutMakamInput
    upsert?: BlokUpsertWithoutMakamInput
    disconnect?: BlokWhereInput | boolean
    delete?: BlokWhereInput | boolean
    connect?: BlokWhereUniqueInput
    update?: XOR<XOR<BlokUpdateToOneWithWhereWithoutMakamInput, BlokUpdateWithoutMakamInput>, BlokUncheckedUpdateWithoutMakamInput>
  }

  export type UserCreateNestedOneWithoutStatusesInput = {
    create?: XOR<UserCreateWithoutStatusesInput, UserUncheckedCreateWithoutStatusesInput>
    connectOrCreate?: UserCreateOrConnectWithoutStatusesInput
    connect?: UserWhereUniqueInput
  }

  export type Penanggung_JawabCreateNestedOneWithoutStatusesInput = {
    create?: XOR<Penanggung_JawabCreateWithoutStatusesInput, Penanggung_JawabUncheckedCreateWithoutStatusesInput>
    connectOrCreate?: Penanggung_JawabCreateOrConnectWithoutStatusesInput
    connect?: Penanggung_JawabWhereUniqueInput
  }

  export type JenazahCreateNestedOneWithoutStatusesInput = {
    create?: XOR<JenazahCreateWithoutStatusesInput, JenazahUncheckedCreateWithoutStatusesInput>
    connectOrCreate?: JenazahCreateOrConnectWithoutStatusesInput
    connect?: JenazahWhereUniqueInput
  }

  export type BlokCreateNestedOneWithoutMakamStatusInput = {
    create?: XOR<BlokCreateWithoutMakamStatusInput, BlokUncheckedCreateWithoutMakamStatusInput>
    connectOrCreate?: BlokCreateOrConnectWithoutMakamStatusInput
    connect?: BlokWhereUniqueInput
  }

  export type UserUpdateOneWithoutStatusesNestedInput = {
    create?: XOR<UserCreateWithoutStatusesInput, UserUncheckedCreateWithoutStatusesInput>
    connectOrCreate?: UserCreateOrConnectWithoutStatusesInput
    upsert?: UserUpsertWithoutStatusesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStatusesInput, UserUpdateWithoutStatusesInput>, UserUncheckedUpdateWithoutStatusesInput>
  }

  export type Penanggung_JawabUpdateOneWithoutStatusesNestedInput = {
    create?: XOR<Penanggung_JawabCreateWithoutStatusesInput, Penanggung_JawabUncheckedCreateWithoutStatusesInput>
    connectOrCreate?: Penanggung_JawabCreateOrConnectWithoutStatusesInput
    upsert?: Penanggung_JawabUpsertWithoutStatusesInput
    disconnect?: Penanggung_JawabWhereInput | boolean
    delete?: Penanggung_JawabWhereInput | boolean
    connect?: Penanggung_JawabWhereUniqueInput
    update?: XOR<XOR<Penanggung_JawabUpdateToOneWithWhereWithoutStatusesInput, Penanggung_JawabUpdateWithoutStatusesInput>, Penanggung_JawabUncheckedUpdateWithoutStatusesInput>
  }

  export type JenazahUpdateOneWithoutStatusesNestedInput = {
    create?: XOR<JenazahCreateWithoutStatusesInput, JenazahUncheckedCreateWithoutStatusesInput>
    connectOrCreate?: JenazahCreateOrConnectWithoutStatusesInput
    upsert?: JenazahUpsertWithoutStatusesInput
    disconnect?: JenazahWhereInput | boolean
    delete?: JenazahWhereInput | boolean
    connect?: JenazahWhereUniqueInput
    update?: XOR<XOR<JenazahUpdateToOneWithWhereWithoutStatusesInput, JenazahUpdateWithoutStatusesInput>, JenazahUncheckedUpdateWithoutStatusesInput>
  }

  export type BlokUpdateOneWithoutMakamStatusNestedInput = {
    create?: XOR<BlokCreateWithoutMakamStatusInput, BlokUncheckedCreateWithoutMakamStatusInput>
    connectOrCreate?: BlokCreateOrConnectWithoutMakamStatusInput
    upsert?: BlokUpsertWithoutMakamStatusInput
    disconnect?: BlokWhereInput | boolean
    delete?: BlokWhereInput | boolean
    connect?: BlokWhereUniqueInput
    update?: XOR<XOR<BlokUpdateToOneWithWhereWithoutMakamStatusInput, BlokUpdateWithoutMakamStatusInput>, BlokUncheckedUpdateWithoutMakamStatusInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type makamCreateWithoutUserInput = {
    nama: string
    lokasi: string
    silsilah: string
    ext?: string | null
    masa_aktif?: Date | string | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at?: Date | string
    updated_at?: Date | string
    tanggal_pemesanan?: Date | string | null
    pj?: Penanggung_JawabCreateNestedOneWithoutMakamsInput
    jenazah?: JenazahCreateNestedOneWithoutMakamsInput
    blok?: BlokCreateNestedOneWithoutMakamInput
  }

  export type makamUncheckedCreateWithoutUserInput = {
    id?: number
    nama: string
    lokasi: string
    silsilah: string
    ext?: string | null
    masa_aktif?: Date | string | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at?: Date | string
    updated_at?: Date | string
    tanggal_pemesanan?: Date | string | null
    pjId?: string | null
    jenazahId?: string | null
    blokId?: string | null
  }

  export type makamCreateOrConnectWithoutUserInput = {
    where: makamWhereUniqueInput
    create: XOR<makamCreateWithoutUserInput, makamUncheckedCreateWithoutUserInput>
  }

  export type makamCreateManyUserInputEnvelope = {
    data: makamCreateManyUserInput | makamCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type makamStatusCreateWithoutUserInput = {
    nama: string
    lokasi: string
    silsilah: string
    ext?: string | null
    masa_aktif?: Date | string | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at?: Date | string
    updated_at?: Date | string
    tanggal_pemesanan?: Date | string | null
    pj?: Penanggung_JawabCreateNestedOneWithoutStatusesInput
    jenazah?: JenazahCreateNestedOneWithoutStatusesInput
    blok?: BlokCreateNestedOneWithoutMakamStatusInput
  }

  export type makamStatusUncheckedCreateWithoutUserInput = {
    id?: number
    nama: string
    lokasi: string
    silsilah: string
    ext?: string | null
    masa_aktif?: Date | string | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at?: Date | string
    updated_at?: Date | string
    tanggal_pemesanan?: Date | string | null
    pjId?: string | null
    jenazahId?: string | null
    blokId?: string | null
  }

  export type makamStatusCreateOrConnectWithoutUserInput = {
    where: makamStatusWhereUniqueInput
    create: XOR<makamStatusCreateWithoutUserInput, makamStatusUncheckedCreateWithoutUserInput>
  }

  export type makamStatusCreateManyUserInputEnvelope = {
    data: makamStatusCreateManyUserInput | makamStatusCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type JenazahCreateWithoutUserInput = {
    id_jenazah?: string
    tanggal_pemakaman?: Date | string | null
    status_jenazah?: string | null
    masa_aktif?: number | null
    status_pembayaran_pesanan?: string | null
    status_pembayaran_iuran_tahunan?: string | null
    blok?: BlokCreateNestedOneWithoutJenazahInput
    makams?: makamCreateNestedManyWithoutJenazahInput
    statuses?: makamStatusCreateNestedManyWithoutJenazahInput
  }

  export type JenazahUncheckedCreateWithoutUserInput = {
    id_jenazah?: string
    tanggal_pemakaman?: Date | string | null
    status_jenazah?: string | null
    masa_aktif?: number | null
    status_pembayaran_pesanan?: string | null
    status_pembayaran_iuran_tahunan?: string | null
    id_blok?: string | null
    makams?: makamUncheckedCreateNestedManyWithoutJenazahInput
    statuses?: makamStatusUncheckedCreateNestedManyWithoutJenazahInput
  }

  export type JenazahCreateOrConnectWithoutUserInput = {
    where: JenazahWhereUniqueInput
    create: XOR<JenazahCreateWithoutUserInput, JenazahUncheckedCreateWithoutUserInput>
  }

  export type Penanggung_JawabCreateWithoutUserInput = {
    id_penanggung_jawab?: string
    makams?: makamCreateNestedManyWithoutPjInput
    statuses?: makamStatusCreateNestedManyWithoutPjInput
  }

  export type Penanggung_JawabUncheckedCreateWithoutUserInput = {
    id_penanggung_jawab?: string
    makams?: makamUncheckedCreateNestedManyWithoutPjInput
    statuses?: makamStatusUncheckedCreateNestedManyWithoutPjInput
  }

  export type Penanggung_JawabCreateOrConnectWithoutUserInput = {
    where: Penanggung_JawabWhereUniqueInput
    create: XOR<Penanggung_JawabCreateWithoutUserInput, Penanggung_JawabUncheckedCreateWithoutUserInput>
  }

  export type makamUpsertWithWhereUniqueWithoutUserInput = {
    where: makamWhereUniqueInput
    update: XOR<makamUpdateWithoutUserInput, makamUncheckedUpdateWithoutUserInput>
    create: XOR<makamCreateWithoutUserInput, makamUncheckedCreateWithoutUserInput>
  }

  export type makamUpdateWithWhereUniqueWithoutUserInput = {
    where: makamWhereUniqueInput
    data: XOR<makamUpdateWithoutUserInput, makamUncheckedUpdateWithoutUserInput>
  }

  export type makamUpdateManyWithWhereWithoutUserInput = {
    where: makamScalarWhereInput
    data: XOR<makamUpdateManyMutationInput, makamUncheckedUpdateManyWithoutUserInput>
  }

  export type makamScalarWhereInput = {
    AND?: makamScalarWhereInput | makamScalarWhereInput[]
    OR?: makamScalarWhereInput[]
    NOT?: makamScalarWhereInput | makamScalarWhereInput[]
    id?: IntFilter<"makam"> | number
    nama?: StringFilter<"makam"> | string
    lokasi?: StringFilter<"makam"> | string
    silsilah?: StringFilter<"makam"> | string
    ext?: StringNullableFilter<"makam"> | string | null
    masa_aktif?: DateTimeNullableFilter<"makam"> | Date | string | null
    nama_penanggung_jawab?: StringFilter<"makam"> | string
    kontak_penanggung_jawab?: StringFilter<"makam"> | string
    description?: StringFilter<"makam"> | string
    payment?: StringFilter<"makam"> | string
    approved?: StringFilter<"makam"> | string
    created_at?: DateTimeFilter<"makam"> | Date | string
    updated_at?: DateTimeFilter<"makam"> | Date | string
    tanggal_pemesanan?: DateTimeNullableFilter<"makam"> | Date | string | null
    userId?: StringNullableFilter<"makam"> | string | null
    pjId?: StringNullableFilter<"makam"> | string | null
    jenazahId?: StringNullableFilter<"makam"> | string | null
    blokId?: StringNullableFilter<"makam"> | string | null
  }

  export type makamStatusUpsertWithWhereUniqueWithoutUserInput = {
    where: makamStatusWhereUniqueInput
    update: XOR<makamStatusUpdateWithoutUserInput, makamStatusUncheckedUpdateWithoutUserInput>
    create: XOR<makamStatusCreateWithoutUserInput, makamStatusUncheckedCreateWithoutUserInput>
  }

  export type makamStatusUpdateWithWhereUniqueWithoutUserInput = {
    where: makamStatusWhereUniqueInput
    data: XOR<makamStatusUpdateWithoutUserInput, makamStatusUncheckedUpdateWithoutUserInput>
  }

  export type makamStatusUpdateManyWithWhereWithoutUserInput = {
    where: makamStatusScalarWhereInput
    data: XOR<makamStatusUpdateManyMutationInput, makamStatusUncheckedUpdateManyWithoutUserInput>
  }

  export type makamStatusScalarWhereInput = {
    AND?: makamStatusScalarWhereInput | makamStatusScalarWhereInput[]
    OR?: makamStatusScalarWhereInput[]
    NOT?: makamStatusScalarWhereInput | makamStatusScalarWhereInput[]
    id?: IntFilter<"makamStatus"> | number
    nama?: StringFilter<"makamStatus"> | string
    lokasi?: StringFilter<"makamStatus"> | string
    silsilah?: StringFilter<"makamStatus"> | string
    ext?: StringNullableFilter<"makamStatus"> | string | null
    masa_aktif?: DateTimeNullableFilter<"makamStatus"> | Date | string | null
    nama_penanggung_jawab?: StringFilter<"makamStatus"> | string
    kontak_penanggung_jawab?: StringFilter<"makamStatus"> | string
    description?: StringFilter<"makamStatus"> | string
    payment?: StringFilter<"makamStatus"> | string
    approved?: StringFilter<"makamStatus"> | string
    created_at?: DateTimeFilter<"makamStatus"> | Date | string
    updated_at?: DateTimeFilter<"makamStatus"> | Date | string
    tanggal_pemesanan?: DateTimeNullableFilter<"makamStatus"> | Date | string | null
    userId?: StringNullableFilter<"makamStatus"> | string | null
    pjId?: StringNullableFilter<"makamStatus"> | string | null
    jenazahId?: StringNullableFilter<"makamStatus"> | string | null
    blokId?: StringNullableFilter<"makamStatus"> | string | null
  }

  export type JenazahUpsertWithoutUserInput = {
    update: XOR<JenazahUpdateWithoutUserInput, JenazahUncheckedUpdateWithoutUserInput>
    create: XOR<JenazahCreateWithoutUserInput, JenazahUncheckedCreateWithoutUserInput>
    where?: JenazahWhereInput
  }

  export type JenazahUpdateToOneWithWhereWithoutUserInput = {
    where?: JenazahWhereInput
    data: XOR<JenazahUpdateWithoutUserInput, JenazahUncheckedUpdateWithoutUserInput>
  }

  export type JenazahUpdateWithoutUserInput = {
    id_jenazah?: StringFieldUpdateOperationsInput | string
    tanggal_pemakaman?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_jenazah?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableIntFieldUpdateOperationsInput | number | null
    status_pembayaran_pesanan?: NullableStringFieldUpdateOperationsInput | string | null
    status_pembayaran_iuran_tahunan?: NullableStringFieldUpdateOperationsInput | string | null
    blok?: BlokUpdateOneWithoutJenazahNestedInput
    makams?: makamUpdateManyWithoutJenazahNestedInput
    statuses?: makamStatusUpdateManyWithoutJenazahNestedInput
  }

  export type JenazahUncheckedUpdateWithoutUserInput = {
    id_jenazah?: StringFieldUpdateOperationsInput | string
    tanggal_pemakaman?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_jenazah?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableIntFieldUpdateOperationsInput | number | null
    status_pembayaran_pesanan?: NullableStringFieldUpdateOperationsInput | string | null
    status_pembayaran_iuran_tahunan?: NullableStringFieldUpdateOperationsInput | string | null
    id_blok?: NullableStringFieldUpdateOperationsInput | string | null
    makams?: makamUncheckedUpdateManyWithoutJenazahNestedInput
    statuses?: makamStatusUncheckedUpdateManyWithoutJenazahNestedInput
  }

  export type Penanggung_JawabUpsertWithoutUserInput = {
    update: XOR<Penanggung_JawabUpdateWithoutUserInput, Penanggung_JawabUncheckedUpdateWithoutUserInput>
    create: XOR<Penanggung_JawabCreateWithoutUserInput, Penanggung_JawabUncheckedCreateWithoutUserInput>
    where?: Penanggung_JawabWhereInput
  }

  export type Penanggung_JawabUpdateToOneWithWhereWithoutUserInput = {
    where?: Penanggung_JawabWhereInput
    data: XOR<Penanggung_JawabUpdateWithoutUserInput, Penanggung_JawabUncheckedUpdateWithoutUserInput>
  }

  export type Penanggung_JawabUpdateWithoutUserInput = {
    id_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    makams?: makamUpdateManyWithoutPjNestedInput
    statuses?: makamStatusUpdateManyWithoutPjNestedInput
  }

  export type Penanggung_JawabUncheckedUpdateWithoutUserInput = {
    id_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    makams?: makamUncheckedUpdateManyWithoutPjNestedInput
    statuses?: makamStatusUncheckedUpdateManyWithoutPjNestedInput
  }

  export type UserCreateWithoutPenanggung_jawabInput = {
    id?: string
    name: string
    contact?: string | null
    email?: string | null
    status?: string | null
    ktp_num?: string | null
    emergency_name?: string | null
    emergency_contact?: string | null
    makams?: makamCreateNestedManyWithoutUserInput
    statuses?: makamStatusCreateNestedManyWithoutUserInput
    jenazah?: JenazahCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPenanggung_jawabInput = {
    id?: string
    name: string
    contact?: string | null
    email?: string | null
    status?: string | null
    ktp_num?: string | null
    emergency_name?: string | null
    emergency_contact?: string | null
    makams?: makamUncheckedCreateNestedManyWithoutUserInput
    statuses?: makamStatusUncheckedCreateNestedManyWithoutUserInput
    jenazah?: JenazahUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPenanggung_jawabInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPenanggung_jawabInput, UserUncheckedCreateWithoutPenanggung_jawabInput>
  }

  export type makamCreateWithoutPjInput = {
    nama: string
    lokasi: string
    silsilah: string
    ext?: string | null
    masa_aktif?: Date | string | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at?: Date | string
    updated_at?: Date | string
    tanggal_pemesanan?: Date | string | null
    user?: UserCreateNestedOneWithoutMakamsInput
    jenazah?: JenazahCreateNestedOneWithoutMakamsInput
    blok?: BlokCreateNestedOneWithoutMakamInput
  }

  export type makamUncheckedCreateWithoutPjInput = {
    id?: number
    nama: string
    lokasi: string
    silsilah: string
    ext?: string | null
    masa_aktif?: Date | string | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at?: Date | string
    updated_at?: Date | string
    tanggal_pemesanan?: Date | string | null
    userId?: string | null
    jenazahId?: string | null
    blokId?: string | null
  }

  export type makamCreateOrConnectWithoutPjInput = {
    where: makamWhereUniqueInput
    create: XOR<makamCreateWithoutPjInput, makamUncheckedCreateWithoutPjInput>
  }

  export type makamCreateManyPjInputEnvelope = {
    data: makamCreateManyPjInput | makamCreateManyPjInput[]
    skipDuplicates?: boolean
  }

  export type makamStatusCreateWithoutPjInput = {
    nama: string
    lokasi: string
    silsilah: string
    ext?: string | null
    masa_aktif?: Date | string | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at?: Date | string
    updated_at?: Date | string
    tanggal_pemesanan?: Date | string | null
    user?: UserCreateNestedOneWithoutStatusesInput
    jenazah?: JenazahCreateNestedOneWithoutStatusesInput
    blok?: BlokCreateNestedOneWithoutMakamStatusInput
  }

  export type makamStatusUncheckedCreateWithoutPjInput = {
    id?: number
    nama: string
    lokasi: string
    silsilah: string
    ext?: string | null
    masa_aktif?: Date | string | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at?: Date | string
    updated_at?: Date | string
    tanggal_pemesanan?: Date | string | null
    userId?: string | null
    jenazahId?: string | null
    blokId?: string | null
  }

  export type makamStatusCreateOrConnectWithoutPjInput = {
    where: makamStatusWhereUniqueInput
    create: XOR<makamStatusCreateWithoutPjInput, makamStatusUncheckedCreateWithoutPjInput>
  }

  export type makamStatusCreateManyPjInputEnvelope = {
    data: makamStatusCreateManyPjInput | makamStatusCreateManyPjInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPenanggung_jawabInput = {
    update: XOR<UserUpdateWithoutPenanggung_jawabInput, UserUncheckedUpdateWithoutPenanggung_jawabInput>
    create: XOR<UserCreateWithoutPenanggung_jawabInput, UserUncheckedCreateWithoutPenanggung_jawabInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPenanggung_jawabInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPenanggung_jawabInput, UserUncheckedUpdateWithoutPenanggung_jawabInput>
  }

  export type UserUpdateWithoutPenanggung_jawabInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    ktp_num?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_name?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_contact?: NullableStringFieldUpdateOperationsInput | string | null
    makams?: makamUpdateManyWithoutUserNestedInput
    statuses?: makamStatusUpdateManyWithoutUserNestedInput
    jenazah?: JenazahUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPenanggung_jawabInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    ktp_num?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_name?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_contact?: NullableStringFieldUpdateOperationsInput | string | null
    makams?: makamUncheckedUpdateManyWithoutUserNestedInput
    statuses?: makamStatusUncheckedUpdateManyWithoutUserNestedInput
    jenazah?: JenazahUncheckedUpdateOneWithoutUserNestedInput
  }

  export type makamUpsertWithWhereUniqueWithoutPjInput = {
    where: makamWhereUniqueInput
    update: XOR<makamUpdateWithoutPjInput, makamUncheckedUpdateWithoutPjInput>
    create: XOR<makamCreateWithoutPjInput, makamUncheckedCreateWithoutPjInput>
  }

  export type makamUpdateWithWhereUniqueWithoutPjInput = {
    where: makamWhereUniqueInput
    data: XOR<makamUpdateWithoutPjInput, makamUncheckedUpdateWithoutPjInput>
  }

  export type makamUpdateManyWithWhereWithoutPjInput = {
    where: makamScalarWhereInput
    data: XOR<makamUpdateManyMutationInput, makamUncheckedUpdateManyWithoutPjInput>
  }

  export type makamStatusUpsertWithWhereUniqueWithoutPjInput = {
    where: makamStatusWhereUniqueInput
    update: XOR<makamStatusUpdateWithoutPjInput, makamStatusUncheckedUpdateWithoutPjInput>
    create: XOR<makamStatusCreateWithoutPjInput, makamStatusUncheckedCreateWithoutPjInput>
  }

  export type makamStatusUpdateWithWhereUniqueWithoutPjInput = {
    where: makamStatusWhereUniqueInput
    data: XOR<makamStatusUpdateWithoutPjInput, makamStatusUncheckedUpdateWithoutPjInput>
  }

  export type makamStatusUpdateManyWithWhereWithoutPjInput = {
    where: makamStatusScalarWhereInput
    data: XOR<makamStatusUpdateManyMutationInput, makamStatusUncheckedUpdateManyWithoutPjInput>
  }

  export type UserCreateWithoutJenazahInput = {
    id?: string
    name: string
    contact?: string | null
    email?: string | null
    status?: string | null
    ktp_num?: string | null
    emergency_name?: string | null
    emergency_contact?: string | null
    makams?: makamCreateNestedManyWithoutUserInput
    statuses?: makamStatusCreateNestedManyWithoutUserInput
    penanggung_jawab?: Penanggung_JawabCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutJenazahInput = {
    id?: string
    name: string
    contact?: string | null
    email?: string | null
    status?: string | null
    ktp_num?: string | null
    emergency_name?: string | null
    emergency_contact?: string | null
    makams?: makamUncheckedCreateNestedManyWithoutUserInput
    statuses?: makamStatusUncheckedCreateNestedManyWithoutUserInput
    penanggung_jawab?: Penanggung_JawabUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutJenazahInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutJenazahInput, UserUncheckedCreateWithoutJenazahInput>
  }

  export type BlokCreateWithoutJenazahInput = {
    id_blok?: string
    lokasi?: string | null
    tanggal_pemakaman_terakhir?: Date | string | null
    status_blok?: string | null
    status_pesanan?: string | null
    availability?: string | null
    status_pembayaran?: string | null
    makam?: makamCreateNestedManyWithoutBlokInput
    makamStatus?: makamStatusCreateNestedManyWithoutBlokInput
  }

  export type BlokUncheckedCreateWithoutJenazahInput = {
    id_blok?: string
    lokasi?: string | null
    tanggal_pemakaman_terakhir?: Date | string | null
    status_blok?: string | null
    status_pesanan?: string | null
    availability?: string | null
    status_pembayaran?: string | null
    makam?: makamUncheckedCreateNestedManyWithoutBlokInput
    makamStatus?: makamStatusUncheckedCreateNestedManyWithoutBlokInput
  }

  export type BlokCreateOrConnectWithoutJenazahInput = {
    where: BlokWhereUniqueInput
    create: XOR<BlokCreateWithoutJenazahInput, BlokUncheckedCreateWithoutJenazahInput>
  }

  export type makamCreateWithoutJenazahInput = {
    nama: string
    lokasi: string
    silsilah: string
    ext?: string | null
    masa_aktif?: Date | string | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at?: Date | string
    updated_at?: Date | string
    tanggal_pemesanan?: Date | string | null
    user?: UserCreateNestedOneWithoutMakamsInput
    pj?: Penanggung_JawabCreateNestedOneWithoutMakamsInput
    blok?: BlokCreateNestedOneWithoutMakamInput
  }

  export type makamUncheckedCreateWithoutJenazahInput = {
    id?: number
    nama: string
    lokasi: string
    silsilah: string
    ext?: string | null
    masa_aktif?: Date | string | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at?: Date | string
    updated_at?: Date | string
    tanggal_pemesanan?: Date | string | null
    userId?: string | null
    pjId?: string | null
    blokId?: string | null
  }

  export type makamCreateOrConnectWithoutJenazahInput = {
    where: makamWhereUniqueInput
    create: XOR<makamCreateWithoutJenazahInput, makamUncheckedCreateWithoutJenazahInput>
  }

  export type makamCreateManyJenazahInputEnvelope = {
    data: makamCreateManyJenazahInput | makamCreateManyJenazahInput[]
    skipDuplicates?: boolean
  }

  export type makamStatusCreateWithoutJenazahInput = {
    nama: string
    lokasi: string
    silsilah: string
    ext?: string | null
    masa_aktif?: Date | string | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at?: Date | string
    updated_at?: Date | string
    tanggal_pemesanan?: Date | string | null
    user?: UserCreateNestedOneWithoutStatusesInput
    pj?: Penanggung_JawabCreateNestedOneWithoutStatusesInput
    blok?: BlokCreateNestedOneWithoutMakamStatusInput
  }

  export type makamStatusUncheckedCreateWithoutJenazahInput = {
    id?: number
    nama: string
    lokasi: string
    silsilah: string
    ext?: string | null
    masa_aktif?: Date | string | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at?: Date | string
    updated_at?: Date | string
    tanggal_pemesanan?: Date | string | null
    userId?: string | null
    pjId?: string | null
    blokId?: string | null
  }

  export type makamStatusCreateOrConnectWithoutJenazahInput = {
    where: makamStatusWhereUniqueInput
    create: XOR<makamStatusCreateWithoutJenazahInput, makamStatusUncheckedCreateWithoutJenazahInput>
  }

  export type makamStatusCreateManyJenazahInputEnvelope = {
    data: makamStatusCreateManyJenazahInput | makamStatusCreateManyJenazahInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutJenazahInput = {
    update: XOR<UserUpdateWithoutJenazahInput, UserUncheckedUpdateWithoutJenazahInput>
    create: XOR<UserCreateWithoutJenazahInput, UserUncheckedCreateWithoutJenazahInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutJenazahInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutJenazahInput, UserUncheckedUpdateWithoutJenazahInput>
  }

  export type UserUpdateWithoutJenazahInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    ktp_num?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_name?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_contact?: NullableStringFieldUpdateOperationsInput | string | null
    makams?: makamUpdateManyWithoutUserNestedInput
    statuses?: makamStatusUpdateManyWithoutUserNestedInput
    penanggung_jawab?: Penanggung_JawabUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutJenazahInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    ktp_num?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_name?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_contact?: NullableStringFieldUpdateOperationsInput | string | null
    makams?: makamUncheckedUpdateManyWithoutUserNestedInput
    statuses?: makamStatusUncheckedUpdateManyWithoutUserNestedInput
    penanggung_jawab?: Penanggung_JawabUncheckedUpdateOneWithoutUserNestedInput
  }

  export type BlokUpsertWithoutJenazahInput = {
    update: XOR<BlokUpdateWithoutJenazahInput, BlokUncheckedUpdateWithoutJenazahInput>
    create: XOR<BlokCreateWithoutJenazahInput, BlokUncheckedCreateWithoutJenazahInput>
    where?: BlokWhereInput
  }

  export type BlokUpdateToOneWithWhereWithoutJenazahInput = {
    where?: BlokWhereInput
    data: XOR<BlokUpdateWithoutJenazahInput, BlokUncheckedUpdateWithoutJenazahInput>
  }

  export type BlokUpdateWithoutJenazahInput = {
    id_blok?: StringFieldUpdateOperationsInput | string
    lokasi?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal_pemakaman_terakhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_blok?: NullableStringFieldUpdateOperationsInput | string | null
    status_pesanan?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    status_pembayaran?: NullableStringFieldUpdateOperationsInput | string | null
    makam?: makamUpdateManyWithoutBlokNestedInput
    makamStatus?: makamStatusUpdateManyWithoutBlokNestedInput
  }

  export type BlokUncheckedUpdateWithoutJenazahInput = {
    id_blok?: StringFieldUpdateOperationsInput | string
    lokasi?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal_pemakaman_terakhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_blok?: NullableStringFieldUpdateOperationsInput | string | null
    status_pesanan?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    status_pembayaran?: NullableStringFieldUpdateOperationsInput | string | null
    makam?: makamUncheckedUpdateManyWithoutBlokNestedInput
    makamStatus?: makamStatusUncheckedUpdateManyWithoutBlokNestedInput
  }

  export type makamUpsertWithWhereUniqueWithoutJenazahInput = {
    where: makamWhereUniqueInput
    update: XOR<makamUpdateWithoutJenazahInput, makamUncheckedUpdateWithoutJenazahInput>
    create: XOR<makamCreateWithoutJenazahInput, makamUncheckedCreateWithoutJenazahInput>
  }

  export type makamUpdateWithWhereUniqueWithoutJenazahInput = {
    where: makamWhereUniqueInput
    data: XOR<makamUpdateWithoutJenazahInput, makamUncheckedUpdateWithoutJenazahInput>
  }

  export type makamUpdateManyWithWhereWithoutJenazahInput = {
    where: makamScalarWhereInput
    data: XOR<makamUpdateManyMutationInput, makamUncheckedUpdateManyWithoutJenazahInput>
  }

  export type makamStatusUpsertWithWhereUniqueWithoutJenazahInput = {
    where: makamStatusWhereUniqueInput
    update: XOR<makamStatusUpdateWithoutJenazahInput, makamStatusUncheckedUpdateWithoutJenazahInput>
    create: XOR<makamStatusCreateWithoutJenazahInput, makamStatusUncheckedCreateWithoutJenazahInput>
  }

  export type makamStatusUpdateWithWhereUniqueWithoutJenazahInput = {
    where: makamStatusWhereUniqueInput
    data: XOR<makamStatusUpdateWithoutJenazahInput, makamStatusUncheckedUpdateWithoutJenazahInput>
  }

  export type makamStatusUpdateManyWithWhereWithoutJenazahInput = {
    where: makamStatusScalarWhereInput
    data: XOR<makamStatusUpdateManyMutationInput, makamStatusUncheckedUpdateManyWithoutJenazahInput>
  }

  export type JenazahCreateWithoutBlokInput = {
    id_jenazah?: string
    tanggal_pemakaman?: Date | string | null
    status_jenazah?: string | null
    masa_aktif?: number | null
    status_pembayaran_pesanan?: string | null
    status_pembayaran_iuran_tahunan?: string | null
    user?: UserCreateNestedOneWithoutJenazahInput
    makams?: makamCreateNestedManyWithoutJenazahInput
    statuses?: makamStatusCreateNestedManyWithoutJenazahInput
  }

  export type JenazahUncheckedCreateWithoutBlokInput = {
    id_jenazah?: string
    tanggal_pemakaman?: Date | string | null
    status_jenazah?: string | null
    masa_aktif?: number | null
    status_pembayaran_pesanan?: string | null
    status_pembayaran_iuran_tahunan?: string | null
    id_user?: string | null
    makams?: makamUncheckedCreateNestedManyWithoutJenazahInput
    statuses?: makamStatusUncheckedCreateNestedManyWithoutJenazahInput
  }

  export type JenazahCreateOrConnectWithoutBlokInput = {
    where: JenazahWhereUniqueInput
    create: XOR<JenazahCreateWithoutBlokInput, JenazahUncheckedCreateWithoutBlokInput>
  }

  export type JenazahCreateManyBlokInputEnvelope = {
    data: JenazahCreateManyBlokInput | JenazahCreateManyBlokInput[]
    skipDuplicates?: boolean
  }

  export type makamCreateWithoutBlokInput = {
    nama: string
    lokasi: string
    silsilah: string
    ext?: string | null
    masa_aktif?: Date | string | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at?: Date | string
    updated_at?: Date | string
    tanggal_pemesanan?: Date | string | null
    user?: UserCreateNestedOneWithoutMakamsInput
    pj?: Penanggung_JawabCreateNestedOneWithoutMakamsInput
    jenazah?: JenazahCreateNestedOneWithoutMakamsInput
  }

  export type makamUncheckedCreateWithoutBlokInput = {
    id?: number
    nama: string
    lokasi: string
    silsilah: string
    ext?: string | null
    masa_aktif?: Date | string | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at?: Date | string
    updated_at?: Date | string
    tanggal_pemesanan?: Date | string | null
    userId?: string | null
    pjId?: string | null
    jenazahId?: string | null
  }

  export type makamCreateOrConnectWithoutBlokInput = {
    where: makamWhereUniqueInput
    create: XOR<makamCreateWithoutBlokInput, makamUncheckedCreateWithoutBlokInput>
  }

  export type makamCreateManyBlokInputEnvelope = {
    data: makamCreateManyBlokInput | makamCreateManyBlokInput[]
    skipDuplicates?: boolean
  }

  export type makamStatusCreateWithoutBlokInput = {
    nama: string
    lokasi: string
    silsilah: string
    ext?: string | null
    masa_aktif?: Date | string | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at?: Date | string
    updated_at?: Date | string
    tanggal_pemesanan?: Date | string | null
    user?: UserCreateNestedOneWithoutStatusesInput
    pj?: Penanggung_JawabCreateNestedOneWithoutStatusesInput
    jenazah?: JenazahCreateNestedOneWithoutStatusesInput
  }

  export type makamStatusUncheckedCreateWithoutBlokInput = {
    id?: number
    nama: string
    lokasi: string
    silsilah: string
    ext?: string | null
    masa_aktif?: Date | string | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at?: Date | string
    updated_at?: Date | string
    tanggal_pemesanan?: Date | string | null
    userId?: string | null
    pjId?: string | null
    jenazahId?: string | null
  }

  export type makamStatusCreateOrConnectWithoutBlokInput = {
    where: makamStatusWhereUniqueInput
    create: XOR<makamStatusCreateWithoutBlokInput, makamStatusUncheckedCreateWithoutBlokInput>
  }

  export type makamStatusCreateManyBlokInputEnvelope = {
    data: makamStatusCreateManyBlokInput | makamStatusCreateManyBlokInput[]
    skipDuplicates?: boolean
  }

  export type JenazahUpsertWithWhereUniqueWithoutBlokInput = {
    where: JenazahWhereUniqueInput
    update: XOR<JenazahUpdateWithoutBlokInput, JenazahUncheckedUpdateWithoutBlokInput>
    create: XOR<JenazahCreateWithoutBlokInput, JenazahUncheckedCreateWithoutBlokInput>
  }

  export type JenazahUpdateWithWhereUniqueWithoutBlokInput = {
    where: JenazahWhereUniqueInput
    data: XOR<JenazahUpdateWithoutBlokInput, JenazahUncheckedUpdateWithoutBlokInput>
  }

  export type JenazahUpdateManyWithWhereWithoutBlokInput = {
    where: JenazahScalarWhereInput
    data: XOR<JenazahUpdateManyMutationInput, JenazahUncheckedUpdateManyWithoutBlokInput>
  }

  export type JenazahScalarWhereInput = {
    AND?: JenazahScalarWhereInput | JenazahScalarWhereInput[]
    OR?: JenazahScalarWhereInput[]
    NOT?: JenazahScalarWhereInput | JenazahScalarWhereInput[]
    id_jenazah?: StringFilter<"Jenazah"> | string
    tanggal_pemakaman?: DateTimeNullableFilter<"Jenazah"> | Date | string | null
    status_jenazah?: StringNullableFilter<"Jenazah"> | string | null
    masa_aktif?: IntNullableFilter<"Jenazah"> | number | null
    status_pembayaran_pesanan?: StringNullableFilter<"Jenazah"> | string | null
    status_pembayaran_iuran_tahunan?: StringNullableFilter<"Jenazah"> | string | null
    id_user?: StringNullableFilter<"Jenazah"> | string | null
    id_blok?: StringNullableFilter<"Jenazah"> | string | null
  }

  export type makamUpsertWithWhereUniqueWithoutBlokInput = {
    where: makamWhereUniqueInput
    update: XOR<makamUpdateWithoutBlokInput, makamUncheckedUpdateWithoutBlokInput>
    create: XOR<makamCreateWithoutBlokInput, makamUncheckedCreateWithoutBlokInput>
  }

  export type makamUpdateWithWhereUniqueWithoutBlokInput = {
    where: makamWhereUniqueInput
    data: XOR<makamUpdateWithoutBlokInput, makamUncheckedUpdateWithoutBlokInput>
  }

  export type makamUpdateManyWithWhereWithoutBlokInput = {
    where: makamScalarWhereInput
    data: XOR<makamUpdateManyMutationInput, makamUncheckedUpdateManyWithoutBlokInput>
  }

  export type makamStatusUpsertWithWhereUniqueWithoutBlokInput = {
    where: makamStatusWhereUniqueInput
    update: XOR<makamStatusUpdateWithoutBlokInput, makamStatusUncheckedUpdateWithoutBlokInput>
    create: XOR<makamStatusCreateWithoutBlokInput, makamStatusUncheckedCreateWithoutBlokInput>
  }

  export type makamStatusUpdateWithWhereUniqueWithoutBlokInput = {
    where: makamStatusWhereUniqueInput
    data: XOR<makamStatusUpdateWithoutBlokInput, makamStatusUncheckedUpdateWithoutBlokInput>
  }

  export type makamStatusUpdateManyWithWhereWithoutBlokInput = {
    where: makamStatusScalarWhereInput
    data: XOR<makamStatusUpdateManyMutationInput, makamStatusUncheckedUpdateManyWithoutBlokInput>
  }

  export type UserCreateWithoutMakamsInput = {
    id?: string
    name: string
    contact?: string | null
    email?: string | null
    status?: string | null
    ktp_num?: string | null
    emergency_name?: string | null
    emergency_contact?: string | null
    statuses?: makamStatusCreateNestedManyWithoutUserInput
    jenazah?: JenazahCreateNestedOneWithoutUserInput
    penanggung_jawab?: Penanggung_JawabCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMakamsInput = {
    id?: string
    name: string
    contact?: string | null
    email?: string | null
    status?: string | null
    ktp_num?: string | null
    emergency_name?: string | null
    emergency_contact?: string | null
    statuses?: makamStatusUncheckedCreateNestedManyWithoutUserInput
    jenazah?: JenazahUncheckedCreateNestedOneWithoutUserInput
    penanggung_jawab?: Penanggung_JawabUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMakamsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMakamsInput, UserUncheckedCreateWithoutMakamsInput>
  }

  export type Penanggung_JawabCreateWithoutMakamsInput = {
    id_penanggung_jawab?: string
    user?: UserCreateNestedOneWithoutPenanggung_jawabInput
    statuses?: makamStatusCreateNestedManyWithoutPjInput
  }

  export type Penanggung_JawabUncheckedCreateWithoutMakamsInput = {
    id_penanggung_jawab?: string
    id_user?: string | null
    statuses?: makamStatusUncheckedCreateNestedManyWithoutPjInput
  }

  export type Penanggung_JawabCreateOrConnectWithoutMakamsInput = {
    where: Penanggung_JawabWhereUniqueInput
    create: XOR<Penanggung_JawabCreateWithoutMakamsInput, Penanggung_JawabUncheckedCreateWithoutMakamsInput>
  }

  export type JenazahCreateWithoutMakamsInput = {
    id_jenazah?: string
    tanggal_pemakaman?: Date | string | null
    status_jenazah?: string | null
    masa_aktif?: number | null
    status_pembayaran_pesanan?: string | null
    status_pembayaran_iuran_tahunan?: string | null
    user?: UserCreateNestedOneWithoutJenazahInput
    blok?: BlokCreateNestedOneWithoutJenazahInput
    statuses?: makamStatusCreateNestedManyWithoutJenazahInput
  }

  export type JenazahUncheckedCreateWithoutMakamsInput = {
    id_jenazah?: string
    tanggal_pemakaman?: Date | string | null
    status_jenazah?: string | null
    masa_aktif?: number | null
    status_pembayaran_pesanan?: string | null
    status_pembayaran_iuran_tahunan?: string | null
    id_user?: string | null
    id_blok?: string | null
    statuses?: makamStatusUncheckedCreateNestedManyWithoutJenazahInput
  }

  export type JenazahCreateOrConnectWithoutMakamsInput = {
    where: JenazahWhereUniqueInput
    create: XOR<JenazahCreateWithoutMakamsInput, JenazahUncheckedCreateWithoutMakamsInput>
  }

  export type BlokCreateWithoutMakamInput = {
    id_blok?: string
    lokasi?: string | null
    tanggal_pemakaman_terakhir?: Date | string | null
    status_blok?: string | null
    status_pesanan?: string | null
    availability?: string | null
    status_pembayaran?: string | null
    jenazah?: JenazahCreateNestedManyWithoutBlokInput
    makamStatus?: makamStatusCreateNestedManyWithoutBlokInput
  }

  export type BlokUncheckedCreateWithoutMakamInput = {
    id_blok?: string
    lokasi?: string | null
    tanggal_pemakaman_terakhir?: Date | string | null
    status_blok?: string | null
    status_pesanan?: string | null
    availability?: string | null
    status_pembayaran?: string | null
    jenazah?: JenazahUncheckedCreateNestedManyWithoutBlokInput
    makamStatus?: makamStatusUncheckedCreateNestedManyWithoutBlokInput
  }

  export type BlokCreateOrConnectWithoutMakamInput = {
    where: BlokWhereUniqueInput
    create: XOR<BlokCreateWithoutMakamInput, BlokUncheckedCreateWithoutMakamInput>
  }

  export type UserUpsertWithoutMakamsInput = {
    update: XOR<UserUpdateWithoutMakamsInput, UserUncheckedUpdateWithoutMakamsInput>
    create: XOR<UserCreateWithoutMakamsInput, UserUncheckedCreateWithoutMakamsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMakamsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMakamsInput, UserUncheckedUpdateWithoutMakamsInput>
  }

  export type UserUpdateWithoutMakamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    ktp_num?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_name?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_contact?: NullableStringFieldUpdateOperationsInput | string | null
    statuses?: makamStatusUpdateManyWithoutUserNestedInput
    jenazah?: JenazahUpdateOneWithoutUserNestedInput
    penanggung_jawab?: Penanggung_JawabUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMakamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    ktp_num?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_name?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_contact?: NullableStringFieldUpdateOperationsInput | string | null
    statuses?: makamStatusUncheckedUpdateManyWithoutUserNestedInput
    jenazah?: JenazahUncheckedUpdateOneWithoutUserNestedInput
    penanggung_jawab?: Penanggung_JawabUncheckedUpdateOneWithoutUserNestedInput
  }

  export type Penanggung_JawabUpsertWithoutMakamsInput = {
    update: XOR<Penanggung_JawabUpdateWithoutMakamsInput, Penanggung_JawabUncheckedUpdateWithoutMakamsInput>
    create: XOR<Penanggung_JawabCreateWithoutMakamsInput, Penanggung_JawabUncheckedCreateWithoutMakamsInput>
    where?: Penanggung_JawabWhereInput
  }

  export type Penanggung_JawabUpdateToOneWithWhereWithoutMakamsInput = {
    where?: Penanggung_JawabWhereInput
    data: XOR<Penanggung_JawabUpdateWithoutMakamsInput, Penanggung_JawabUncheckedUpdateWithoutMakamsInput>
  }

  export type Penanggung_JawabUpdateWithoutMakamsInput = {
    id_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneWithoutPenanggung_jawabNestedInput
    statuses?: makamStatusUpdateManyWithoutPjNestedInput
  }

  export type Penanggung_JawabUncheckedUpdateWithoutMakamsInput = {
    id_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    id_user?: NullableStringFieldUpdateOperationsInput | string | null
    statuses?: makamStatusUncheckedUpdateManyWithoutPjNestedInput
  }

  export type JenazahUpsertWithoutMakamsInput = {
    update: XOR<JenazahUpdateWithoutMakamsInput, JenazahUncheckedUpdateWithoutMakamsInput>
    create: XOR<JenazahCreateWithoutMakamsInput, JenazahUncheckedCreateWithoutMakamsInput>
    where?: JenazahWhereInput
  }

  export type JenazahUpdateToOneWithWhereWithoutMakamsInput = {
    where?: JenazahWhereInput
    data: XOR<JenazahUpdateWithoutMakamsInput, JenazahUncheckedUpdateWithoutMakamsInput>
  }

  export type JenazahUpdateWithoutMakamsInput = {
    id_jenazah?: StringFieldUpdateOperationsInput | string
    tanggal_pemakaman?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_jenazah?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableIntFieldUpdateOperationsInput | number | null
    status_pembayaran_pesanan?: NullableStringFieldUpdateOperationsInput | string | null
    status_pembayaran_iuran_tahunan?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneWithoutJenazahNestedInput
    blok?: BlokUpdateOneWithoutJenazahNestedInput
    statuses?: makamStatusUpdateManyWithoutJenazahNestedInput
  }

  export type JenazahUncheckedUpdateWithoutMakamsInput = {
    id_jenazah?: StringFieldUpdateOperationsInput | string
    tanggal_pemakaman?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_jenazah?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableIntFieldUpdateOperationsInput | number | null
    status_pembayaran_pesanan?: NullableStringFieldUpdateOperationsInput | string | null
    status_pembayaran_iuran_tahunan?: NullableStringFieldUpdateOperationsInput | string | null
    id_user?: NullableStringFieldUpdateOperationsInput | string | null
    id_blok?: NullableStringFieldUpdateOperationsInput | string | null
    statuses?: makamStatusUncheckedUpdateManyWithoutJenazahNestedInput
  }

  export type BlokUpsertWithoutMakamInput = {
    update: XOR<BlokUpdateWithoutMakamInput, BlokUncheckedUpdateWithoutMakamInput>
    create: XOR<BlokCreateWithoutMakamInput, BlokUncheckedCreateWithoutMakamInput>
    where?: BlokWhereInput
  }

  export type BlokUpdateToOneWithWhereWithoutMakamInput = {
    where?: BlokWhereInput
    data: XOR<BlokUpdateWithoutMakamInput, BlokUncheckedUpdateWithoutMakamInput>
  }

  export type BlokUpdateWithoutMakamInput = {
    id_blok?: StringFieldUpdateOperationsInput | string
    lokasi?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal_pemakaman_terakhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_blok?: NullableStringFieldUpdateOperationsInput | string | null
    status_pesanan?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    status_pembayaran?: NullableStringFieldUpdateOperationsInput | string | null
    jenazah?: JenazahUpdateManyWithoutBlokNestedInput
    makamStatus?: makamStatusUpdateManyWithoutBlokNestedInput
  }

  export type BlokUncheckedUpdateWithoutMakamInput = {
    id_blok?: StringFieldUpdateOperationsInput | string
    lokasi?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal_pemakaman_terakhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_blok?: NullableStringFieldUpdateOperationsInput | string | null
    status_pesanan?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    status_pembayaran?: NullableStringFieldUpdateOperationsInput | string | null
    jenazah?: JenazahUncheckedUpdateManyWithoutBlokNestedInput
    makamStatus?: makamStatusUncheckedUpdateManyWithoutBlokNestedInput
  }

  export type UserCreateWithoutStatusesInput = {
    id?: string
    name: string
    contact?: string | null
    email?: string | null
    status?: string | null
    ktp_num?: string | null
    emergency_name?: string | null
    emergency_contact?: string | null
    makams?: makamCreateNestedManyWithoutUserInput
    jenazah?: JenazahCreateNestedOneWithoutUserInput
    penanggung_jawab?: Penanggung_JawabCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutStatusesInput = {
    id?: string
    name: string
    contact?: string | null
    email?: string | null
    status?: string | null
    ktp_num?: string | null
    emergency_name?: string | null
    emergency_contact?: string | null
    makams?: makamUncheckedCreateNestedManyWithoutUserInput
    jenazah?: JenazahUncheckedCreateNestedOneWithoutUserInput
    penanggung_jawab?: Penanggung_JawabUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutStatusesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStatusesInput, UserUncheckedCreateWithoutStatusesInput>
  }

  export type Penanggung_JawabCreateWithoutStatusesInput = {
    id_penanggung_jawab?: string
    user?: UserCreateNestedOneWithoutPenanggung_jawabInput
    makams?: makamCreateNestedManyWithoutPjInput
  }

  export type Penanggung_JawabUncheckedCreateWithoutStatusesInput = {
    id_penanggung_jawab?: string
    id_user?: string | null
    makams?: makamUncheckedCreateNestedManyWithoutPjInput
  }

  export type Penanggung_JawabCreateOrConnectWithoutStatusesInput = {
    where: Penanggung_JawabWhereUniqueInput
    create: XOR<Penanggung_JawabCreateWithoutStatusesInput, Penanggung_JawabUncheckedCreateWithoutStatusesInput>
  }

  export type JenazahCreateWithoutStatusesInput = {
    id_jenazah?: string
    tanggal_pemakaman?: Date | string | null
    status_jenazah?: string | null
    masa_aktif?: number | null
    status_pembayaran_pesanan?: string | null
    status_pembayaran_iuran_tahunan?: string | null
    user?: UserCreateNestedOneWithoutJenazahInput
    blok?: BlokCreateNestedOneWithoutJenazahInput
    makams?: makamCreateNestedManyWithoutJenazahInput
  }

  export type JenazahUncheckedCreateWithoutStatusesInput = {
    id_jenazah?: string
    tanggal_pemakaman?: Date | string | null
    status_jenazah?: string | null
    masa_aktif?: number | null
    status_pembayaran_pesanan?: string | null
    status_pembayaran_iuran_tahunan?: string | null
    id_user?: string | null
    id_blok?: string | null
    makams?: makamUncheckedCreateNestedManyWithoutJenazahInput
  }

  export type JenazahCreateOrConnectWithoutStatusesInput = {
    where: JenazahWhereUniqueInput
    create: XOR<JenazahCreateWithoutStatusesInput, JenazahUncheckedCreateWithoutStatusesInput>
  }

  export type BlokCreateWithoutMakamStatusInput = {
    id_blok?: string
    lokasi?: string | null
    tanggal_pemakaman_terakhir?: Date | string | null
    status_blok?: string | null
    status_pesanan?: string | null
    availability?: string | null
    status_pembayaran?: string | null
    jenazah?: JenazahCreateNestedManyWithoutBlokInput
    makam?: makamCreateNestedManyWithoutBlokInput
  }

  export type BlokUncheckedCreateWithoutMakamStatusInput = {
    id_blok?: string
    lokasi?: string | null
    tanggal_pemakaman_terakhir?: Date | string | null
    status_blok?: string | null
    status_pesanan?: string | null
    availability?: string | null
    status_pembayaran?: string | null
    jenazah?: JenazahUncheckedCreateNestedManyWithoutBlokInput
    makam?: makamUncheckedCreateNestedManyWithoutBlokInput
  }

  export type BlokCreateOrConnectWithoutMakamStatusInput = {
    where: BlokWhereUniqueInput
    create: XOR<BlokCreateWithoutMakamStatusInput, BlokUncheckedCreateWithoutMakamStatusInput>
  }

  export type UserUpsertWithoutStatusesInput = {
    update: XOR<UserUpdateWithoutStatusesInput, UserUncheckedUpdateWithoutStatusesInput>
    create: XOR<UserCreateWithoutStatusesInput, UserUncheckedCreateWithoutStatusesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStatusesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStatusesInput, UserUncheckedUpdateWithoutStatusesInput>
  }

  export type UserUpdateWithoutStatusesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    ktp_num?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_name?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_contact?: NullableStringFieldUpdateOperationsInput | string | null
    makams?: makamUpdateManyWithoutUserNestedInput
    jenazah?: JenazahUpdateOneWithoutUserNestedInput
    penanggung_jawab?: Penanggung_JawabUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutStatusesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    ktp_num?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_name?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_contact?: NullableStringFieldUpdateOperationsInput | string | null
    makams?: makamUncheckedUpdateManyWithoutUserNestedInput
    jenazah?: JenazahUncheckedUpdateOneWithoutUserNestedInput
    penanggung_jawab?: Penanggung_JawabUncheckedUpdateOneWithoutUserNestedInput
  }

  export type Penanggung_JawabUpsertWithoutStatusesInput = {
    update: XOR<Penanggung_JawabUpdateWithoutStatusesInput, Penanggung_JawabUncheckedUpdateWithoutStatusesInput>
    create: XOR<Penanggung_JawabCreateWithoutStatusesInput, Penanggung_JawabUncheckedCreateWithoutStatusesInput>
    where?: Penanggung_JawabWhereInput
  }

  export type Penanggung_JawabUpdateToOneWithWhereWithoutStatusesInput = {
    where?: Penanggung_JawabWhereInput
    data: XOR<Penanggung_JawabUpdateWithoutStatusesInput, Penanggung_JawabUncheckedUpdateWithoutStatusesInput>
  }

  export type Penanggung_JawabUpdateWithoutStatusesInput = {
    id_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneWithoutPenanggung_jawabNestedInput
    makams?: makamUpdateManyWithoutPjNestedInput
  }

  export type Penanggung_JawabUncheckedUpdateWithoutStatusesInput = {
    id_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    id_user?: NullableStringFieldUpdateOperationsInput | string | null
    makams?: makamUncheckedUpdateManyWithoutPjNestedInput
  }

  export type JenazahUpsertWithoutStatusesInput = {
    update: XOR<JenazahUpdateWithoutStatusesInput, JenazahUncheckedUpdateWithoutStatusesInput>
    create: XOR<JenazahCreateWithoutStatusesInput, JenazahUncheckedCreateWithoutStatusesInput>
    where?: JenazahWhereInput
  }

  export type JenazahUpdateToOneWithWhereWithoutStatusesInput = {
    where?: JenazahWhereInput
    data: XOR<JenazahUpdateWithoutStatusesInput, JenazahUncheckedUpdateWithoutStatusesInput>
  }

  export type JenazahUpdateWithoutStatusesInput = {
    id_jenazah?: StringFieldUpdateOperationsInput | string
    tanggal_pemakaman?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_jenazah?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableIntFieldUpdateOperationsInput | number | null
    status_pembayaran_pesanan?: NullableStringFieldUpdateOperationsInput | string | null
    status_pembayaran_iuran_tahunan?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneWithoutJenazahNestedInput
    blok?: BlokUpdateOneWithoutJenazahNestedInput
    makams?: makamUpdateManyWithoutJenazahNestedInput
  }

  export type JenazahUncheckedUpdateWithoutStatusesInput = {
    id_jenazah?: StringFieldUpdateOperationsInput | string
    tanggal_pemakaman?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_jenazah?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableIntFieldUpdateOperationsInput | number | null
    status_pembayaran_pesanan?: NullableStringFieldUpdateOperationsInput | string | null
    status_pembayaran_iuran_tahunan?: NullableStringFieldUpdateOperationsInput | string | null
    id_user?: NullableStringFieldUpdateOperationsInput | string | null
    id_blok?: NullableStringFieldUpdateOperationsInput | string | null
    makams?: makamUncheckedUpdateManyWithoutJenazahNestedInput
  }

  export type BlokUpsertWithoutMakamStatusInput = {
    update: XOR<BlokUpdateWithoutMakamStatusInput, BlokUncheckedUpdateWithoutMakamStatusInput>
    create: XOR<BlokCreateWithoutMakamStatusInput, BlokUncheckedCreateWithoutMakamStatusInput>
    where?: BlokWhereInput
  }

  export type BlokUpdateToOneWithWhereWithoutMakamStatusInput = {
    where?: BlokWhereInput
    data: XOR<BlokUpdateWithoutMakamStatusInput, BlokUncheckedUpdateWithoutMakamStatusInput>
  }

  export type BlokUpdateWithoutMakamStatusInput = {
    id_blok?: StringFieldUpdateOperationsInput | string
    lokasi?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal_pemakaman_terakhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_blok?: NullableStringFieldUpdateOperationsInput | string | null
    status_pesanan?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    status_pembayaran?: NullableStringFieldUpdateOperationsInput | string | null
    jenazah?: JenazahUpdateManyWithoutBlokNestedInput
    makam?: makamUpdateManyWithoutBlokNestedInput
  }

  export type BlokUncheckedUpdateWithoutMakamStatusInput = {
    id_blok?: StringFieldUpdateOperationsInput | string
    lokasi?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal_pemakaman_terakhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_blok?: NullableStringFieldUpdateOperationsInput | string | null
    status_pesanan?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    status_pembayaran?: NullableStringFieldUpdateOperationsInput | string | null
    jenazah?: JenazahUncheckedUpdateManyWithoutBlokNestedInput
    makam?: makamUncheckedUpdateManyWithoutBlokNestedInput
  }

  export type makamCreateManyUserInput = {
    id?: number
    nama: string
    lokasi: string
    silsilah: string
    ext?: string | null
    masa_aktif?: Date | string | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at?: Date | string
    updated_at?: Date | string
    tanggal_pemesanan?: Date | string | null
    pjId?: string | null
    jenazahId?: string | null
    blokId?: string | null
  }

  export type makamStatusCreateManyUserInput = {
    id?: number
    nama: string
    lokasi: string
    silsilah: string
    ext?: string | null
    masa_aktif?: Date | string | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at?: Date | string
    updated_at?: Date | string
    tanggal_pemesanan?: Date | string | null
    pjId?: string | null
    jenazahId?: string | null
    blokId?: string | null
  }

  export type makamUpdateWithoutUserInput = {
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pj?: Penanggung_JawabUpdateOneWithoutMakamsNestedInput
    jenazah?: JenazahUpdateOneWithoutMakamsNestedInput
    blok?: BlokUpdateOneWithoutMakamNestedInput
  }

  export type makamUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pjId?: NullableStringFieldUpdateOperationsInput | string | null
    jenazahId?: NullableStringFieldUpdateOperationsInput | string | null
    blokId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type makamUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pjId?: NullableStringFieldUpdateOperationsInput | string | null
    jenazahId?: NullableStringFieldUpdateOperationsInput | string | null
    blokId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type makamStatusUpdateWithoutUserInput = {
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pj?: Penanggung_JawabUpdateOneWithoutStatusesNestedInput
    jenazah?: JenazahUpdateOneWithoutStatusesNestedInput
    blok?: BlokUpdateOneWithoutMakamStatusNestedInput
  }

  export type makamStatusUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pjId?: NullableStringFieldUpdateOperationsInput | string | null
    jenazahId?: NullableStringFieldUpdateOperationsInput | string | null
    blokId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type makamStatusUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pjId?: NullableStringFieldUpdateOperationsInput | string | null
    jenazahId?: NullableStringFieldUpdateOperationsInput | string | null
    blokId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type makamCreateManyPjInput = {
    id?: number
    nama: string
    lokasi: string
    silsilah: string
    ext?: string | null
    masa_aktif?: Date | string | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at?: Date | string
    updated_at?: Date | string
    tanggal_pemesanan?: Date | string | null
    userId?: string | null
    jenazahId?: string | null
    blokId?: string | null
  }

  export type makamStatusCreateManyPjInput = {
    id?: number
    nama: string
    lokasi: string
    silsilah: string
    ext?: string | null
    masa_aktif?: Date | string | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at?: Date | string
    updated_at?: Date | string
    tanggal_pemesanan?: Date | string | null
    userId?: string | null
    jenazahId?: string | null
    blokId?: string | null
  }

  export type makamUpdateWithoutPjInput = {
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneWithoutMakamsNestedInput
    jenazah?: JenazahUpdateOneWithoutMakamsNestedInput
    blok?: BlokUpdateOneWithoutMakamNestedInput
  }

  export type makamUncheckedUpdateWithoutPjInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    jenazahId?: NullableStringFieldUpdateOperationsInput | string | null
    blokId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type makamUncheckedUpdateManyWithoutPjInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    jenazahId?: NullableStringFieldUpdateOperationsInput | string | null
    blokId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type makamStatusUpdateWithoutPjInput = {
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneWithoutStatusesNestedInput
    jenazah?: JenazahUpdateOneWithoutStatusesNestedInput
    blok?: BlokUpdateOneWithoutMakamStatusNestedInput
  }

  export type makamStatusUncheckedUpdateWithoutPjInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    jenazahId?: NullableStringFieldUpdateOperationsInput | string | null
    blokId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type makamStatusUncheckedUpdateManyWithoutPjInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    jenazahId?: NullableStringFieldUpdateOperationsInput | string | null
    blokId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type makamCreateManyJenazahInput = {
    id?: number
    nama: string
    lokasi: string
    silsilah: string
    ext?: string | null
    masa_aktif?: Date | string | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at?: Date | string
    updated_at?: Date | string
    tanggal_pemesanan?: Date | string | null
    userId?: string | null
    pjId?: string | null
    blokId?: string | null
  }

  export type makamStatusCreateManyJenazahInput = {
    id?: number
    nama: string
    lokasi: string
    silsilah: string
    ext?: string | null
    masa_aktif?: Date | string | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at?: Date | string
    updated_at?: Date | string
    tanggal_pemesanan?: Date | string | null
    userId?: string | null
    pjId?: string | null
    blokId?: string | null
  }

  export type makamUpdateWithoutJenazahInput = {
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneWithoutMakamsNestedInput
    pj?: Penanggung_JawabUpdateOneWithoutMakamsNestedInput
    blok?: BlokUpdateOneWithoutMakamNestedInput
  }

  export type makamUncheckedUpdateWithoutJenazahInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    pjId?: NullableStringFieldUpdateOperationsInput | string | null
    blokId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type makamUncheckedUpdateManyWithoutJenazahInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    pjId?: NullableStringFieldUpdateOperationsInput | string | null
    blokId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type makamStatusUpdateWithoutJenazahInput = {
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneWithoutStatusesNestedInput
    pj?: Penanggung_JawabUpdateOneWithoutStatusesNestedInput
    blok?: BlokUpdateOneWithoutMakamStatusNestedInput
  }

  export type makamStatusUncheckedUpdateWithoutJenazahInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    pjId?: NullableStringFieldUpdateOperationsInput | string | null
    blokId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type makamStatusUncheckedUpdateManyWithoutJenazahInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    pjId?: NullableStringFieldUpdateOperationsInput | string | null
    blokId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type JenazahCreateManyBlokInput = {
    id_jenazah?: string
    tanggal_pemakaman?: Date | string | null
    status_jenazah?: string | null
    masa_aktif?: number | null
    status_pembayaran_pesanan?: string | null
    status_pembayaran_iuran_tahunan?: string | null
    id_user?: string | null
  }

  export type makamCreateManyBlokInput = {
    id?: number
    nama: string
    lokasi: string
    silsilah: string
    ext?: string | null
    masa_aktif?: Date | string | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at?: Date | string
    updated_at?: Date | string
    tanggal_pemesanan?: Date | string | null
    userId?: string | null
    pjId?: string | null
    jenazahId?: string | null
  }

  export type makamStatusCreateManyBlokInput = {
    id?: number
    nama: string
    lokasi: string
    silsilah: string
    ext?: string | null
    masa_aktif?: Date | string | null
    nama_penanggung_jawab: string
    kontak_penanggung_jawab: string
    description: string
    payment: string
    approved: string
    created_at?: Date | string
    updated_at?: Date | string
    tanggal_pemesanan?: Date | string | null
    userId?: string | null
    pjId?: string | null
    jenazahId?: string | null
  }

  export type JenazahUpdateWithoutBlokInput = {
    id_jenazah?: StringFieldUpdateOperationsInput | string
    tanggal_pemakaman?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_jenazah?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableIntFieldUpdateOperationsInput | number | null
    status_pembayaran_pesanan?: NullableStringFieldUpdateOperationsInput | string | null
    status_pembayaran_iuran_tahunan?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneWithoutJenazahNestedInput
    makams?: makamUpdateManyWithoutJenazahNestedInput
    statuses?: makamStatusUpdateManyWithoutJenazahNestedInput
  }

  export type JenazahUncheckedUpdateWithoutBlokInput = {
    id_jenazah?: StringFieldUpdateOperationsInput | string
    tanggal_pemakaman?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_jenazah?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableIntFieldUpdateOperationsInput | number | null
    status_pembayaran_pesanan?: NullableStringFieldUpdateOperationsInput | string | null
    status_pembayaran_iuran_tahunan?: NullableStringFieldUpdateOperationsInput | string | null
    id_user?: NullableStringFieldUpdateOperationsInput | string | null
    makams?: makamUncheckedUpdateManyWithoutJenazahNestedInput
    statuses?: makamStatusUncheckedUpdateManyWithoutJenazahNestedInput
  }

  export type JenazahUncheckedUpdateManyWithoutBlokInput = {
    id_jenazah?: StringFieldUpdateOperationsInput | string
    tanggal_pemakaman?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_jenazah?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableIntFieldUpdateOperationsInput | number | null
    status_pembayaran_pesanan?: NullableStringFieldUpdateOperationsInput | string | null
    status_pembayaran_iuran_tahunan?: NullableStringFieldUpdateOperationsInput | string | null
    id_user?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type makamUpdateWithoutBlokInput = {
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneWithoutMakamsNestedInput
    pj?: Penanggung_JawabUpdateOneWithoutMakamsNestedInput
    jenazah?: JenazahUpdateOneWithoutMakamsNestedInput
  }

  export type makamUncheckedUpdateWithoutBlokInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    pjId?: NullableStringFieldUpdateOperationsInput | string | null
    jenazahId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type makamUncheckedUpdateManyWithoutBlokInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    pjId?: NullableStringFieldUpdateOperationsInput | string | null
    jenazahId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type makamStatusUpdateWithoutBlokInput = {
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneWithoutStatusesNestedInput
    pj?: Penanggung_JawabUpdateOneWithoutStatusesNestedInput
    jenazah?: JenazahUpdateOneWithoutStatusesNestedInput
  }

  export type makamStatusUncheckedUpdateWithoutBlokInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    pjId?: NullableStringFieldUpdateOperationsInput | string | null
    jenazahId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type makamStatusUncheckedUpdateManyWithoutBlokInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    silsilah?: StringFieldUpdateOperationsInput | string
    ext?: NullableStringFieldUpdateOperationsInput | string | null
    masa_aktif?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nama_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    kontak_penanggung_jawab?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    payment?: StringFieldUpdateOperationsInput | string
    approved?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_pemesanan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    pjId?: NullableStringFieldUpdateOperationsInput | string | null
    jenazahId?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}