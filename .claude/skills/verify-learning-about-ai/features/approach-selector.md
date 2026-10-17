# Approach selector

A six-question quiz on the Context Engineering volume. Each answer adds points to six approaches; after question 6 the page ranks all six with scores out of 18 and marks the top one "Recommended". Users can step back one question or reset.

## Sub-features

- `selector-answer` advances one question per answer and updates the "Question N of 6" progress text.
- `selector-result` shows "Your Recommended Approaches" with all six approaches sorted by score.
- `selector-back` "Previous question" returns one step and subtracts that answer's points.
- `selector-reset` "Reset" (during) and "Try Different Constraints" (on results) return to question 1.
- `selector-deep-dive` "Deep-Dive Into Approaches" link goes to `/ai/context-engineering/approaches`.

## How to get to it (user POV)

- Context Engineering sub-nav → `Selector`.
- Direct URL `/ai/context-engineering/selector`.

## Driving it with scripts/site

Preconditions:

- Doctor is all `ok`.

- **Open.** Run `scripts/site open /ai/context-engineering/selector`. Title is `Approach Selector — Context Engineering | Xiong Zhi Lim`, console errors 0. Run `scripts/site expect-text "Question 1 of 6"`.
- **Answer 1.** Run `scripts/site click button "/^Small \(/"` then `scripts/site expect-text "Question 2 of 6"`.
- **Answer 2–6.** Run, in order: `scripts/site click button "/^Static \(/"`, `scripts/site click button "/^Factual lookup/"`, `scripts/site click button "/^Sub-second/"`, `scripts/site click button "/^Very sensitive/"`, `scripts/site click button "/^Single turn/"`.
- **Result.** Run `scripts/site expect-text "Your Recommended Approaches"` and `scripts/site expect-text "14/18"`. Expected scores for this path, from the scoring table in `Selector.tsx`: Classic RAG 14, Brute-Force Long Context 9, Rules Engineering 9, Knowledge Graphs 8, Cognitive Architecture 3, Modular RAG 2.
- **Proof (result).** Run `scripts/site snapshot selector-result` and `scripts/site screenshot selector-result`. In the `.aria.yml`, the `text: Recommended` line is directly followed by `heading "Classic RAG"`, and the six `N/18` values appear in descending order.
- **Reset from results.** Run `scripts/site click button "Try Different Constraints"` then `scripts/site expect-text "Question 1 of 6"`.
- **Back.** Run `scripts/site click button "/^Massive/"`, `scripts/site expect-text "Question 2 of 6"`, `scripts/site click button "Previous question"`, then `scripts/site expect-text "Question 1 of 6"` and `scripts/site expect-text "Previous question" --absent`.
- **Back subtracts.** From question 1, answer the same six as above but pick `/^Massive/` first, go back, then pick `/^Small \(/`. The result must still show `14/18`. A higher score means back did not subtract.
- **Proof (back).** Run `scripts/site snapshot selector-after-back`.
- **Deep dive.** On results, run `scripts/site click link "/Deep-Dive Into Approaches/"`, then `scripts/site page-state`. The URL is `/ai/context-engineering/approaches`.

## Gotchas

- "Recommended" and "Your Recommended Approaches" both contain "Recommended". `expect-text "Recommended"` passes on the heading alone. Prove the winner from the snapshot order, not from text presence.
- Ties keep insertion order (Brute-Force before Rules Engineering at 9). A tie that flips order is a regression in sorting, not noise.
- The "Reset" text button only exists once a question has been answered. On question 1 it is absent by design.
- The scores show `/18` because of `questions.length * 3`. If a question is added, the denominator changes. Update this file in the same PR.
- `open` resets the quiz. Never `open` between answers.
