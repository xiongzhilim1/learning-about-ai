# Verification Phase 2-lite: planted-bug eval

Date 2026-10-17. Verifier under test: `.claude/skills/verify-learning-about-ai/` at `236b47c`.
Setup: 6 worktrees off `main` (`~/learning-about-ai-p2/cand-a..f`, branches `p2/cand-*`), 5 with one planted bug each and 1 control. All commits had the same message and all type-checked. One fresh verifier agent per candidate, with an identical brief: the skill is the spec, no reading `client/` or git history, full sweep, skip `db-canvas-leak` (already failing on main). Labels were shuffled. The answer key was kept outside the worktrees.
Evidence: `.verify/evidence/phase2-lite/cand-*/` (each verifier's run, including `commands.log`).

## Result

| Cand | Planted bug | Should trip | Verdict | Caught by the recipe? |
|---|---|---|---|---|
| a | "Previous question" doesn't subtract points (looks up the answer by the wrong key) | selector-back | **FAIL** ✅ | **No.** The recipe's `expect-text "14/18"` passed because Knowledge Graphs happened to score 14. The verifier caught it by reading the snapshot (Classic RAG 16/18) |
| b | Control: comment-only change | (nothing) | PASS+NOTES ✅ | n/a, no false FAIL |
| c | Desktop header "Digital Brain" link points to `/digital-brains` | nav-header | **FAIL** ✅ | Yes |
| d | BrainMesh "idle drift": `invalidate()` every frame | db-canvas-rest | **FAIL** ✅ | Yes (frames 29 → 219 in 3s at rest) |
| e | Tenet chips set the filter to its current value (dead buttons) | ex-filter-tenet | **FAIL** ✅ | Yes |
| f | Copy change "squads" → "teams" | db-topology | **FAIL** ✅ | Yes (verifier also noticed the next paragraph still says "squad") |

- **Catch rate: 5/5.** Each FAIL named the right feature, and the evidence matches the claim (spot-checked from the saved files).
- **False PASS: 0.**
- **False FAIL on the control: 0.**
- **Recipe-alone catch rate: 4/5.** One catch depended on the verifier's diligence, not on the map. A less careful verifier would have issued a false PASS on candidate a.

## Map and harness defects found (input for maintenance)

Defects that let a bug through, or would:
1. **selector "back subtracts"** asserts `expect-text "14/18"`, which passes whenever *any* row scores 14. It needs to assert the first row (Classic RAG at 14/18) from the snapshot order. It should also go back from a later question, not only from question 2.
2. **ex-filter-tenet "Toggle off"** passes even when the chip is dead, because it never asserts the filtered state before toggling off.
3. **db-canvas-mount** has no frames assertion. Candidate d marked it as a pass at `frames: 564`. It should require `frames: 1` straight after `open`.

Coverage gaps (sub-features or entry points with no recipe step; verifiers drove them ad hoc):
4. Mid-quiz "Reset" (selector-reset).
5. Header "About" (nav-header).
6. Sub-nav entry points: Selector, Checklist, Exercises.
7. ex-expand has no assertion. It should use `expect-text "Expected Outcome"`, then `--absent` after the second click.
8. db-turns has no T1 baseline capture. The digital-brain proof bullet doesn't include topology.

Harness and doc problems:
9. `doctor` prints nothing when the tree is clean. It should print an explicit `clean` line (all 6 verifiers flagged this).
10. SKILL.md says `features/README.md`, which is ambiguous from the repo root. It should give the full skill-relative path.
11. The viewport is 1280×813, not 1280×900 (900 is the window). The wording is wrong in SKILL.md and digital-brain.md.
12. The cleanup check `pgrep -f .verify/runs/<id>` matches the shell running it. It should use `ps -ax -o pid,command | grep '[.]verify/runs/<id>'`.
13. In zsh, a loop variable such as `"open /"` isn't word-split. Worth a one-line note in Drive.

## Reading

- The verifiers were strong. Each ran about 20 steps in around 3 minutes with no leftover processes, and none tried to bend a recipe to make it pass. All six followed the "don't weaken the journey" rule.
- The map is the weak link, not the agents. Defects 1 to 3 are all cases of "the assertion is weaker than the claim". Fixing them takes the recipe-alone catch rate to 5/5 and removes reliance on verifier diligence.
- Before the trial (Phase 5), apply fixes 1 to 3 and 9, then rerun candidate a with a fresh verifier to confirm the recipe now catches it on its own.
