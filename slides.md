---
theme: default
title: "Arashi — Parallel work. Distributed codebases. One workflow."
info: |
  Arashi makes Git worktrees practical and coordinates work across distributed repositories.
class: cover
drawings:
  persist: false
transition: fade
mdc: true
fonts:
  sans: DM Sans
  mono: JetBrains Mono
---

<div class="eyebrow">Git worktrees, coordinated</div>

# Arashi

<div class="hero-line">Parallel work. Distributed codebases.<br><span class="accent">One coherent workflow.</span></div>

<div class="footer-link">github.com/corwinm/arashi · arashi.haphazard.dev</div>

<!--
Open with the outcome, not the command list. Arashi addresses two recurring problems: isolated parallel work and coordination across repositories. We will examine each separately, then combine them.
-->

---

<div class="eyebrow">The development landscape</div>

# Two problems keep showing up

<div class="grid-2">
  <div class="card dark pillar">
    <div class="icon">⑂</div>
    <div>
      <div class="tag">Problem one</div>
      <h3>Work needs to happen in parallel</h3>
      <p>Humans and agents compete for one checkout, switch branches, stash changes, or create mystery clones.</p>
    </div>
  </div>
  <div class="card dark pillar">
    <div class="icon">⌘</div>
    <div>
      <div class="tag">Problem two</div>
      <h3>The codebase is distributed</h3>
      <p>One product spans services, docs, tools, and extensions—each with its own repository and history.</p>
    </div>
  </div>
</div>

<!--
Name both problems explicitly. They are equal pillars, not beginner and advanced modes. A team may have either problem or both.
Transition: first, parallel work.
-->

---

<div class="eyebrow">Problem one · parallel work</div>

# One checkout becomes a bottleneck

<div class="grid-3">
  <div class="card"><div class="number">01</div><h3>Switch</h3><p>Stop one task, stash state, change branches, rebuild context.</p></div>
  <div class="card"><div class="number">02</div><h3>Duplicate</h3><p>Create another clone, redownload objects, invent a folder name.</p></div>
  <div class="card"><div class="number">03</div><h3>Collide</h3><p>Two agents or developers touch the same working directory.</p></div>
</div>

<div class="callout" style="margin-top: 1.2rem"><strong>The branch is cheap.</strong> The working directory—and the context inside it—is the scarce resource.</div>

<!--
The pain is not creating branches. It is repeatedly reconfiguring one working directory and losing task context. Agents make this more visible because they naturally run concurrently.
-->

---

<div class="eyebrow">The Git primitive</div>

# Worktrees make branches physical

<div class="flow">
  <div class="node"><strong>main</strong><br><span class="small muted">primary checkout</span></div>
  <div class="arrow">↗</div>
  <div class="node"><strong>feat/search</strong><br><span class="small muted">isolated files</span></div>
  <div class="arrow">↘</div>
  <div class="node"><strong>fix/login</strong><br><span class="small muted">isolated files</span></div>
</div>

<div class="grid-2" style="margin-top: 1.5rem">
  <div><div class="big">1×</div><p>shared Git object database</p></div>
  <div><div class="big">N×</div><p>independent working directories</p></div>
</div>

<!--
A worktree is not another full clone. It gives a branch its own working directory while sharing repository objects. This is ideal for parallel humans, agents, reviews, and experiments.
-->

---

<div class="eyebrow">Arashi's first solution</div>

# A lifecycle, not a pile of folders

<div class="flow">
  <div class="node"><strong>create</strong><br><span class="small">make workspace</span></div>
  <div class="arrow">→</div>
  <div class="node"><strong>list / switch</strong><br><span class="small">find and enter</span></div>
  <div class="arrow">→</div>
  <div class="node"><strong>status</strong><br><span class="small">understand state</span></div>
  <div class="arrow">→</div>
  <div class="node"><strong>remove</strong><br><span class="small">cleanly retire</span></div>
</div>

```sh
arashi create feat/search
arashi switch feat/search
arashi status
arashi remove feat/search
```

<!--
Arashi wraps Git's worktree primitive in a discoverable lifecycle. The value exists even for one repository: consistent locations, status, switching, hooks, and cleanup.
Optional demo: run the four commands in a small repository. Static fallback: walk through the flow and expected workspace changes.
-->

---

<div class="eyebrow">A complete single-repository workflow</div>

# Parallel work without a meta-repo

<div class="grid-2">
  <div class="card">
    <h3>Human</h3>
    <p>Continue on <code>main</code>, review another branch, or handle an urgent fix.</p>
  </div>
  <div class="card">
    <h3>Agent</h3>
    <p>Implement <code>feat/search</code> in its own worktree without touching the human's files.</p>
  </div>
</div>

<div class="callout" style="margin-top: 1.4rem">No stashing. No clone naming convention. No shared working-directory collision.</div>

<!--
Make the independence explicit: users do not need a meta-repository to benefit from Arashi. The single-repo story is complete and valuable on its own.
Transition: now consider the shape of many real organizational codebases.
-->

---

<div class="eyebrow">Problem two · distributed codebases</div>

# The product is larger than any repository

<div class="repo-map">
  <div class="repo meta">One product change</div>
  <div class="connector" style="left: 49%; top: 29%; width: 25%; transform: rotate(140deg)"></div>
  <div class="connector" style="left: 50%; top: 29%; width: 20%; transform: rotate(90deg)"></div>
  <div class="connector" style="left: 51%; top: 29%; width: 25%; transform: rotate(40deg)"></div>
  <div class="repo r1">service-api<br><span class="small muted">release 4.2</span></div>
  <div class="repo r2">web-app<br><span class="small muted">release 9.1</span></div>
  <div class="repo r3">docs<br><span class="small muted">continuous</span></div>
</div>

<!--
Distributed repositories are often correct organizational boundaries. The problem is that product work crosses them while planning and status become fragmented.
-->

---

<div class="eyebrow">The coordination gap</div>

# Independent histories. Shared intent.

<div class="grid-2">
  <div class="card"><h3>Keep</h3><ul><li>Ownership boundaries</li><li>Focused pull requests</li><li>Independent releases</li><li>Repository-specific CI</li></ul></div>
  <div class="card"><h3>Gain</h3><ul><li>One workspace definition</li><li>One feature branch name</li><li>Aggregated status</li><li>Coordinated commands</li></ul></div>
</div>

<!--
A meta-repository should not flatten repository histories. It should provide coordination while preserving ownership. This is Arashi's second solution.
-->

---

<div class="eyebrow">Arashi's second solution</div>

# A meta-repo describes the whole workspace

```json
{
  "repos": {
    "service-api": { "gitUrl": "git@github.com:org/service-api.git" },
    "web-app": { "gitUrl": "git@github.com:org/web-app.git" },
    "docs": { "gitUrl": "git@github.com:org/docs.git" }
  }
}
```

<div class="grid-3" style="margin-top: 1rem">
  <div class="card"><h3>Plan</h3><p>Keep cross-repo intent and specifications together.</p></div>
  <div class="card"><h3>See</h3><p>Read workspace health across repository boundaries.</p></div>
  <div class="card"><h3>Act</h3><p>Run coordinated operations without merging histories.</p></div>
</div>

<!--
The meta-repository is a coordination surface and workspace manifest. It does not become the source of truth for child code; implementation stays in each owning repository.
-->

---

<div class="eyebrow">A complete meta-repository workflow</div>

# Coordinate without pretending it's a monorepo

```sh
arashi setup
arashi status
arashi pull
arashi exec -- git status --short
```

<div class="callout" style="margin-top: 1.2rem"><strong>One command surface.</strong> Per-repository results, commits, pull requests, and releases remain independent.</div>

<!--
This workflow is valuable even before creating feature worktrees: clone/setup the distributed workspace, inspect it, synchronize it, and execute consistent commands across selected repositories.
Optional demo: use status and exec. Static fallback: explain grouped per-repository output.
-->

---

<div class="eyebrow">The composition</div>

# When both problems happen at once

<div class="repo-map">
  <div class="repo meta">feat/search workspace</div>
  <div class="connector" style="left: 49%; top: 29%; width: 25%; transform: rotate(140deg)"></div>
  <div class="connector" style="left: 50%; top: 29%; width: 20%; transform: rotate(90deg)"></div>
  <div class="connector" style="left: 51%; top: 29%; width: 25%; transform: rotate(40deg)"></div>
  <div class="repo r1">service-api<br><span class="small green">worktree: feat/search</span></div>
  <div class="repo r2">web-app<br><span class="small green">worktree: feat/search</span></div>
  <div class="repo r3">docs<br><span class="small green">worktree: feat/search</span></div>
</div>

<!--
This is where the two pillars compose. One named feature workspace contains aligned worktrees for relevant repositories. Each repository still receives its own commit and PR.
-->

---

<div class="eyebrow">Coordinated worktrees</div>

# Create the feature environment once

```sh
arashi create feat/search
```

<div class="flow">
  <div class="node"><strong>meta</strong><br><span class="small">planning + status</span></div>
  <div class="arrow">+</div>
  <div class="node"><strong>API</strong><br><span class="small">own commit + PR</span></div>
  <div class="arrow">+</div>
  <div class="node"><strong>web</strong><br><span class="small">own commit + PR</span></div>
  <div class="arrow">+</div>
  <div class="node"><strong>docs</strong><br><span class="small">own commit + PR</span></div>
</div>

<div class="callout" style="margin-top: 1.2rem">Aligned workspace, independent Git histories.</div>

<!--
The create command applies the same branch/workspace intent across configured repositories. Partial workspaces can include only relevant repositories. Emphasize separate commits and PRs.
-->

---

<div class="eyebrow">A practical feature loop</div>

# See → create → work → publish → hand off

<div class="grid-3">
  <div class="card"><h3>See</h3><p><code>status</code> and <code>doctor</code> expose workspace health.</p></div>
  <div class="card"><h3>Create</h3><p><code>create</code> produces isolated, coordinated worktrees.</p></div>
  <div class="card"><h3>Work</h3><p><code>switch</code> and hooks enter a ready environment.</p></div>
  <div class="card"><h3>Run</h3><p><code>exec</code> performs selected cross-repo checks.</p></div>
  <div class="card"><h3>Publish</h3><p><code>push</code> publishes only eligible changed branches.</p></div>
  <div class="card"><h3>Transfer</h3><p><code>handoff</code> summarizes state for the next human or agent.</p></div>
</div>

<!--
This is a benefits map, not exhaustive command documentation. The commands reinforce the workflow: visibility, isolation, coordinated action, and transfer.
-->

---

<div class="eyebrow">Built for humans and agents</div>

# Context is infrastructure

<div class="grid-2">
  <div class="card dark"><div class="big" style="color: var(--lime)">Human</div><p>Stable directories, visible state, fewer destructive context switches.</p></div>
  <div class="card dark"><div class="big" style="color: var(--lime)">Agent</div><p>Isolated files, explicit repository ownership, machine-readable output, reliable handoffs.</p></div>
</div>

<div class="callout" style="margin-top: 1.4rem">Parallelism is useful only when isolation and state remain understandable.</div>

<!--
Arashi is not “AI-only.” Agentic development amplifies existing concurrency and context problems; the same safety and visibility help human teams.
-->

---

<div class="eyebrow">Choose the shape you need</div>

# One tool, three adoption paths

<div class="grid-3">
  <div class="card"><div class="number">A</div><h3>Worktrees</h3><p>One repo, parallel branches, humans or agents.</p></div>
  <div class="card"><div class="number">B</div><h3>Meta-repo</h3><p>Many repos, one coordination surface.</p></div>
  <div class="card"><div class="number">A+B</div><h3>Coordinated worktrees</h3><p>Parallel feature environments across repositories.</p></div>
</div>

<!--
Reinforce that neither pillar is subordinate. Start where the pain is, then compose when needed.
-->

---

<div class="eyebrow">Boundaries</div>

# What Arashi does—and does not do

<div class="grid-2">
  <div class="card"><h3>Arashi owns</h3><ul><li>Workspace discovery</li><li>Worktree lifecycle</li><li>Cross-repo coordination</li><li>Status and automation surfaces</li></ul></div>
  <div class="card"><h3>Git and your platform own</h3><ul><li>Commits and history</li><li>Code review</li><li>CI and releases</li><li>Repository permissions</li></ul></div>
</div>

<!--
Arashi composes existing Git and hosting workflows. It is not a replacement VCS, CI platform, or monorepo conversion tool.
-->

---

<div class="eyebrow">Direction</div>

# Make coordinated development feel ordinary

<div class="flow">
  <div class="node"><strong>Now</strong><br><span class="small">reliable lifecycle + visibility</span></div>
  <div class="arrow">→</div>
  <div class="node"><strong>Next</strong><br><span class="small">richer integrations + automation</span></div>
  <div class="arrow">→</div>
  <div class="node"><strong>Goal</strong><br><span class="small">parallel work without coordination tax</span></div>
</div>

<div class="callout" style="margin-top: 1.5rem">The future is not more repositories or more agents. It is making their coordination boring.</div>

<!--
Keep roadmap language directional rather than promising uncommitted features. Point interested viewers to the project issues and documentation for current plans.
-->

---

<div class="eyebrow">Try it</div>

# Start with your real constraint

<div class="grid-2">
  <div class="card"><h3>Parallel work?</h3><p>Create an isolated worktree for the next branch or agent.</p><br><code>arashi create feat/next</code></div>
  <div class="card"><h3>Distributed codebase?</h3><p>Describe the repositories that already make up your product.</p><br><code>arashi init</code></div>
</div>

<div class="footer-link">Docs: arashi.haphazard.dev · Source: github.com/corwinm/arashi</div>

<!--
Give two starts, matching the two pillars. Invite the audience to choose their current pain rather than adopting every capability at once.
-->

---

<div class="end-panel">
<div class="eyebrow">Arashi</div>

# Work in parallel.<br>Coordinate what is distributed.

[arashi.haphazard.dev](https://arashi.haphazard.dev/) · [github.com/corwinm/arashi](https://github.com/corwinm/arashi)
</div>

<!--
Close by restating the two outcomes. Take questions, or return to the relevant demo slide based on the audience's environment.
-->
