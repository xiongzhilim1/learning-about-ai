# Approach selector

A six-question quiz on the Context Engineering volume. Each answer adds points to six approaches; after question 6 the page ranks all six with scores out of 18 and marks the top one "Recommended". Users can step back one question or reset.

## Sub-features

- `selector-answer` advances one question per answer and updates the "Question N of 6" progress text.
- `selector-result` shows "Your Recommended Approaches" with all six approaches sorted by score.
- `selector-back` "Previous question" returns one step and subtracts that answer's points.
- `selector-reset` "Reset" (during) and "Try Different Constraints" (on results) return to question 1.
- `selector-deep-dive` "Deep-Dive Into Approaches" link goes to `/ai/context-engineering/approaches`.

## How to get to it (user POV)

- Context Engineering sub-nav → `Selector` (from any `/ai/context-engineering/*` page).
- Direct URL `/ai/context-engineering/selector`.

## Driving it with scripts/site

Preconditions:

- Doctor is all `ok`.

- **Sub-nav entry.** Run `scripts/site open /ai/context-engineering`, then `scripts/site click link "Selector"` and `scripts/site page-state`. URL is `/ai/context-engineering/selector`, title `Approach Selector — Context Engineering | Xiong Zhi Lim`. Run `scripts/site expect-text "Question 1 of 6"`.
- **Answer 1–6.** Run each click, then assert the next question number:
  `scripts/site click button "/^Small \(/"` → `scripts/site expect-text "Question 2 of 6"`;
  `scripts/site click button "/^Static \(/"` → `"Question 3 of 6"`;
  `scripts/site click button "/^Factual lookup/"` → `"Question 4 of 6"`;
  `scripts/site click button "/^Sub-second/"` → `"Question 5 of 6"`;
  `scripts/site click button "/^Very sensitive/"` → `"Question 6 of 6"`;
  `scripts/site click button "/^Single turn/"` → `scripts/site expect-text "Your Recommended Approaches"`.
- **Result ranking.** Expected scores for this path, from the scoring table: Classic RAG 14, Brute-Force Long Context 9, Rules Engineering 9, Knowledge Graphs 8, Cognitive Architecture 3, Modular RAG 2. Assert the whole ranking, each score pinned to its row (call this pattern RANKING; reuse it verbatim below):
  `scripts/site expect-aria '/text: Recommended\n\s*- heading "Classic RAG" \[level=3\]\n\s*- text: 14\/18[\s\S]*heading "Brute-Force Long Context" \[level=3\]\n\s*- text: 9\/18[\s\S]*heading "Rules Engineering \/ Markdown Filesystem" \[level=3\]\n\s*- text: 9\/18[\s\S]*heading "Knowledge Graphs \/ GraphRAG" \[level=3\]\n\s*- text: 8\/18[\s\S]*heading "Cognitive Architecture \/ Memory Palace" \[level=3\]\n\s*- text: 3\/18[\s\S]*heading "Modular RAG \/ Multi-Agent Swarms" \[level=3\]\n\s*- text: 2\/18/'`
- **Proof (result).** Run `scripts/site snapshot selector-result` and `scripts/site screenshot selector-result`.
- **Reset from results.** Run `scripts/site click button "Try Different Constraints"` then `scripts/site expect-text "Question 1 of 6"`.
- **Reset mid-quiz.** Run `scripts/site expect-text "Reset" --absent` (absent on question 1), `scripts/site click button "/^Small \(/"`, `scripts/site click button "/^Static \(/"`, `scripts/site expect-text "Question 3 of 6"`, `scripts/site click button "Reset"`, then `scripts/site expect-text "Question 1 of 6"`.
- **Back.** Run `scripts/site click button "/^Massive/"`, `scripts/site expect-text "Question 2 of 6"`, `scripts/site click button "Previous question"`, then `scripts/site expect-text "Question 1 of 6"` and `scripts/site expect-text "Previous question" --absent`.
- **Back subtracts (two undos).** From question 1, undo an answer at Q1 and at Q4, then finish on the standard path:
  `scripts/site click button "/^Massive/"`, `scripts/site click button "Previous question"`, `scripts/site click button "/^Small \(/"`, `scripts/site click button "/^Static \(/"`, `scripts/site click button "/^Factual lookup/"`, `scripts/site click button "/^Minutes/"`, `scripts/site expect-text "Question 5 of 6"`, `scripts/site click button "Previous question"`, `scripts/site expect-text "Question 4 of 6"`, `scripts/site click button "/^Sub-second/"`, `scripts/site click button "/^Very sensitive/"`, `scripts/site click button "/^Single turn/"`.
  Then run the RANKING `expect-aria` from **Result ranking** verbatim. It must PASS. Any other ranking means back did not subtract (or subtracted the wrong answer).
- **Proof (back).** Run `scripts/site snapshot selector-after-back`.
- **Deep dive.** On results, run `scripts/site click link "/Deep-Dive Into Approaches/"`, then `scripts/site page-state`. The URL is `/ai/context-engineering/approaches`.

## Gotchas

- Never prove a score with `expect-text "14/18"`. It passes if *any* row shows 14/18. Phase 2-lite caught a broken back button only because the verifier read the snapshot: Knowledge Graphs happened to land on 14 while Classic RAG had 16. Use the RANKING `expect-aria`, which pins each score to its row.
- "Recommended" and "Your Recommended Approaches" both contain "Recommended". `expect-text "Recommended"` passes on the heading alone.
- RANKING is a long pattern. Pass it in single quotes so the shell leaves `\n`, `[` and `/` alone.
- Ties keep insertion order (Brute-Force before Rules Engineering at 9). A tie that flips order is a regression in sorting, not noise.
- The "Reset" text button only exists once a question has been answered. On question 1 it is absent by design.
- The scores show `/18` because of `questions.length * 3`. If a question is added, the denominator changes. Update this file in the same PR.
- `open` resets the quiz. Never `open` between answers.
