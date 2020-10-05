/**
 * **This module is experimental**
 *
 * Experimental features are published in order to get early feedback from the community.
 *
 * A feature tagged as _Experimental_ is in a high state of flux, you're at risk of it changing without notice.
 */
import type { Option } from "@effect-ts/core/Classic/Option"
import { pipe } from "@effect-ts/core/Function"

import * as _ from "../Internal"
import type { Iso } from "../Iso"
import type { Lens } from "../Lens"

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

export interface At<S, I, A> {
  readonly at: (i: I) => Lens<S, A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Lift an instance of `At` using an `Iso`
 */
export const fromIso = <T, S>(iso: Iso<T, S>) => <I, A>(
  sia: At<S, I, A>
): At<T, I, A> => ({
  at: (i) => pipe(iso, _.isoAsLens, _.lensComposeLens(sia.at(i)))
})

export const atRecord: <A = never>() => At<
  Readonly<Record<string, A>>,
  string,
  Option<A>
> = _.atRecord
