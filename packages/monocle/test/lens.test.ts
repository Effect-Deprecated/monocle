import { pipe } from "@effect-ts/core/Function"
import { some } from "@effect-ts/core/Option"

import * as L from "../src/Lens"
import * as O from "../src/Optional"

interface Person {
  name: {
    first?: string
    last?: string
  }
}

describe("Lens", () => {
  it("access first", () => {
    const firstName = pipe(
      L.id<Person>(),
      L.prop("name"),
      L.asOptional,
      O.prop("first"),
      O.fromNullable
    )

    expect(
      pipe(
        <Person>{ name: { first: "Mike", last: "Arnaldi" } },
        firstName.set("Updated"),
        firstName.getOption
      )
    ).toEqual(some("Updated"))
  }),
    it("props should not set more props", () => {
      type A = { a: string; b: string }
      const l = L.id<A>()
      expect(
        pipe(
          { a: "a", b: "b" },
          l["|>"](L.props("a", "b")).set({ a: "1", b: "2", ...{ c: "3" } })
        )
      ).toEqual({ a: "1", b: "2" })
    })
})
