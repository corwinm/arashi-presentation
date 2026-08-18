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

<div class="brand-lockup"><img :src="'/arashi-logo.svg'" alt="" /><span>ARASHI / PRESENTATION</span></div>

<div class="cover-grid">
<div class="cover-copy">
<div class="eyebrow">Git worktrees, coordinated</div>
<h1>Arashi</h1>
<div class="hero-line">Parallel work across distributed codebases.<br /><span class="accent">One coherent workflow.</span></div>
<div class="cover-links"><span>arashi.haphazard.dev</span><span>github.com/corwinm/arashi</span></div>
</div>
<div class="hero-terminal" aria-label="Arashi coordinated worktree example">
<div class="terminal-chrome"><i></i><i></i><i></i><span>workspace / feat-search</span></div>
<div class="terminal-body">
<div class="tree-line">workspace</div>
<div class="tree-line">├── <b>repos</b></div>
<div class="tree-line">│   ├── api <em>→ feat/search</em></div>
<div class="tree-line">│   ├── web <em>→ feat/search</em></div>
<div class="tree-line">│   └── docs <em>→ feat/search</em></div>
<div class="tree-line">└── <b>.arashi/worktrees</b></div>
<div class="terminal-prompt"><span>$</span> aw status</div>
</div>
</div>
</div>

<!--
Open with the outcome, not the command list. Arashi addresses two recurring problems: isolated parallel work and coordination across repositories. We will examine each separately, then combine them.
-->

---

<div class="eyebrow">The development landscape</div>

# Two problems keep showing up

<div class="problem-stage">
<div class="problem-track">
<div class="problem-index">01</div>
<div class="problem-graphic checkout-graphic"><span>main</span><i>feat/search</i><i>fix/login</i></div>
<div class="problem-copy"><div class="tag">Parallel work</div><h3>One checkout.<br />Too many tasks.</h3><p>Humans and agents switch, stash, duplicate, and collide.</p></div>
</div>
<div class="problem-plus">+</div>
<div class="problem-track">
<div class="problem-index">02</div>
<div class="problem-graphic repo-graphic"><i>API</i><i>WEB</i><i>DOCS</i><span>one product</span></div>
<div class="problem-copy"><div class="tag">Distributed code</div><h3>One change.<br />Many repositories.</h3><p>Planning and status fragment across independently owned histories.</p></div>
</div>
</div>

<!--
Name both problems explicitly. They are equal pillars, not beginner and advanced modes. A team may have either problem or both.
Transition: first, parallel work.
-->

---

<div class="eyebrow">Problem one · parallel work</div>

# One checkout becomes a bottleneck

<div class="bottleneck-scene">
<div class="task-queue"><div><span>01</span><b>feat/search</b><small>switch + rebuild</small></div><div><span>02</span><b>review/checkout</b><small>stash + rename</small></div><div><span>03</span><b>fix/login</b><small>shared-file collision</small></div></div>
<div class="funnel-mark">→</div>
<div class="checkout-core"><div class="terminal-chrome"><i></i><i></i><i></i><span>one working directory</span></div><div class="checkout-path">~/product <em>main</em></div><div class="collision-lines"><span>human</span><span>agent 01</span><span>agent 02</span></div></div>
</div>
<div class="statement"><strong>Branches are cheap.</strong><span>The working directory—and its context—is the scarce resource.</span></div>

<!--
The pain is not creating branches. It is repeatedly reconfiguring one working directory and losing task context. Agents make this more visible because they naturally run concurrently.
-->

---

<div class="eyebrow">The Git primitive</div>

# Worktrees make branches physical

<div class="worktree-scene">
<div class="git-store"><span>1×</span><b>.git</b><small>shared objects + history</small></div>
<div class="branch-lines"><i></i><i></i><i></i></div>
<div class="worktree-row"><div><span>main/</span><small>primary checkout</small></div><div><span>feat-search/</span><small>isolated files</small></div><div><span>fix-login/</span><small>isolated files</small></div></div>
<div class="worktree-caption"><strong>N× working directories</strong><span>Each branch gets a stable physical context without another clone.</span></div>
</div>

<!--
A worktree is not another full clone. It gives a branch its own working directory while sharing repository objects. This is ideal for parallel humans, agents, reviews, and experiments.
-->

---

<div class="eyebrow">Arashi's first solution</div>

# A lifecycle, not a pile of folders

<div class="lifecycle-rail"><div><span>01</span><b>create</b><small>make workspace</small></div><i></i><div><span>02</span><b>switch</b><small>enter context</small></div><i></i><div><span>03</span><b>status</b><small>understand state</small></div><i></i><div><span>04</span><b>remove</b><small>cleanly retire</small></div></div>

```sh
aw create feat/search
aw switch feat/search
aw status
aw remove feat/search
```

<!--
Arashi wraps Git's worktree primitive in a discoverable lifecycle. The value exists even for one repository: consistent locations, status, switching, hooks, and cleanup.
Optional demo: run the four commands in a small repository. Static fallback: walk through the flow and expected workspace changes.
-->

---

<div class="eyebrow">A complete single-repository workflow</div>

# Parallel work without a meta-repo

<div class="parallel-scene">
<div class="actor human"><span>HUMAN</span><b>main/</b><small>review + urgent fix</small></div>
<div class="shared-git"><img :src="'/arashi-logo.svg'" alt="" /><b>shared Git history</b><small>separate file trees</small></div>
<div class="actor agent"><span>AGENT</span><b>feat-search/</b><small>isolated implementation</small></div>
</div>
<div class="benefit-strip"><span>NO STASHING</span><span>NO MYSTERY CLONES</span><span>NO FILE COLLISIONS</span></div>

<!--
Make the independence explicit: users do not need a meta-repository to benefit from Arashi. The single-repo story is complete and valuable on its own.
Transition: now consider the shape of many real organizational codebases.
-->

---

<div class="eyebrow">Problem two · distributed codebases</div>

# The product is larger than any repository

<div class="product-constellation">
<div class="change-signal"><span>PRODUCT CHANGE</span><b>feat/search</b></div>
<div class="constellation-line"><i></i><i></i><i></i></div>
<div class="repo-orbits"><div><b>service-api</b><small>release 4.2</small><em>OWNERSHIP: PLATFORM</em></div><div><b>web-app</b><small>release 9.1</small><em>OWNERSHIP: PRODUCT</em></div><div><b>docs</b><small>continuous</small><em>OWNERSHIP: DEVREL</em></div></div>
<div class="history-strip"><span>independent history</span><span>independent history</span><span>independent history</span></div>
</div>

<!--
Distributed repositories are often correct organizational boundaries. The problem is that product work crosses them while planning and status become fragmented.
-->

---

<div class="eyebrow">The coordination gap</div>

# Independent histories. Shared intent.

<div class="coordination-ledger">
<div class="ledger-column keep"><div class="ledger-label">PRESERVE</div><h3>Repository autonomy</h3><ul><li><b>01</b> Ownership boundaries</li><li><b>02</b> Focused pull requests</li><li><b>03</b> Independent releases</li><li><b>04</b> Repository-specific CI</li></ul></div>
<div class="ledger-axis"><span>+</span><small>COORDINATION<br />WITHOUT<br />CONSOLIDATION</small></div>
<div class="ledger-column gain"><div class="ledger-label">ADD</div><h3>Shared operational context</h3><ul><li><b>01</b> One workspace definition</li><li><b>02</b> One feature branch name</li><li><b>03</b> Aggregated status</li><li><b>04</b> Coordinated commands</li></ul></div>
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

<div class="meta-capabilities"><div><span>01 / PLAN</span><p>Cross-repo intent and specifications stay together.</p></div><div><span>02 / SEE</span><p>Workspace health is visible across repository boundaries.</p></div><div><span>03 / ACT</span><p>Coordinated operations run without merging histories.</p></div></div>

<!--
The meta-repository is a coordination surface and workspace manifest. It does not become the source of truth for child code; implementation stays in each owning repository.
-->

---

<div class="eyebrow">A complete meta-repository workflow</div>

# Coordinate without pretending it's a monorepo

<div class="command-surface">
<div class="command-terminal"><div class="terminal-chrome"><i></i><i></i><i></i><span>meta-repository</span></div><div class="command-lines"><span><b>$</b> aw setup</span><span><b>$</b> aw status</span><span><b>$</b> aw pull</span><span><b>$</b> aw exec -- git status --short</span></div></div>
<div class="grouped-output"><div><b>service-api</b><span>✓ clean · main</span></div><div><b>web-app</b><span>↑ 2 commits · feat/search</span></div><div><b>docs</b><span>✓ clean · feat/search</span></div></div>
</div>
<div class="statement"><strong>One command surface.</strong><span>Per-repository commits, pull requests, and releases remain independent.</span></div>

<!--
This workflow is valuable even before creating feature worktrees: clone/setup the distributed workspace, inspect it, synchronize it, and execute consistent commands across selected repositories.
Optional demo: use status and exec. Static fallback: explain grouped per-repository output.
-->

---

<div class="eyebrow">The composition</div>

# When both problems happen at once

<div class="workspace-frame">
<div class="workspace-header"><span>WORKSPACE</span><b>feat/search</b><em>.arashi/worktrees/feat-search</em></div>
<div class="workspace-tree"><div class="tree-root">repos/</div><div class="workspace-repos"><div><span>├──</span><b>service-api/</b><small>worktree · feat/search</small></div><div><span>├──</span><b>web-app/</b><small>worktree · feat/search</small></div><div><span>└──</span><b>docs/</b><small>worktree · feat/search</small></div></div></div>
<div class="workspace-foot"><span>3 repositories</span><span>3 independent histories</span><strong>1 aligned context</strong></div>
</div>

<!--
This is where the two pillars compose. One named feature workspace contains aligned worktrees for relevant repositories. Each repository still receives its own commit and PR.
-->

---

<div class="eyebrow">Coordinated worktrees</div>

# Create the feature environment once

<div class="create-scene">
<div class="create-command"><span>$</span><b>aw create feat/search</b></div>
<div class="create-arrow">↓</div>
<div class="created-workspace"><div class="meta-cell"><span>META</span><b>planning + status</b></div><div><span>API</span><b>commit + PR</b></div><div><span>WEB</span><b>commit + PR</b></div><div><span>DOCS</span><b>commit + PR</b></div></div>
</div>
<div class="equation-strip"><b>aligned workspace</b><span>≠</span><b>combined Git history</b></div>

<!--
The create command applies the same branch/workspace intent across configured repositories. Partial workspaces can include only relevant repositories. Emphasize separate commits and PRs.
-->

---

<div class="eyebrow">A practical feature loop</div>

# See → create → work → publish → hand off

<div class="feature-loop">
<div><span>01</span><b>SEE</b><code>status<br />doctor</code></div><i>→</i><div><span>02</span><b>CREATE</b><code>create</code></div><i>→</i><div><span>03</span><b>WORK</b><code>switch<br />hooks</code></div><i>→</i><div><span>04</span><b>RUN</b><code>exec</code></div><i>→</i><div><span>05</span><b>PUBLISH</b><code>push</code></div><i>→</i><div><span>06</span><b>HAND OFF</b><code>handoff</code></div>
</div>
<div class="loop-caption"><span>VISIBLE STATE</span><i></i><span>ISOLATED CONTEXT</span><i></i><span>REPEATABLE TRANSFER</span></div>

<!--
This is a benefits map, not exhaustive command documentation. The commands reinforce the workflow: visibility, isolation, coordinated action, and transfer.
-->

---

<div class="eyebrow">Built for humans and agents</div>

# Context is infrastructure

<div class="context-system">
<div class="context-actor"><span>HUMAN</span><b>stable directories</b><b>visible state</b><b>fewer context switches</b></div>
<div class="context-core"><img :src="'/arashi-logo.svg'" alt="" /><span>CONTEXT</span><b>paths · branches · ownership · status</b><small>shared understanding</small></div>
<div class="context-actor"><span>AGENT</span><b>isolated files</b><b>machine-readable output</b><b>reliable handoffs</b></div>
</div>
<div class="statement"><strong>Parallelism needs infrastructure.</strong><span>Isolation and state must remain understandable.</span></div>

<!--
Arashi is not “AI-only.” Agentic development amplifies existing concurrency and context problems; the same safety and visibility help human teams.
-->

---

<div class="eyebrow">Choose the shape you need</div>

# One tool, three adoption paths

<div class="adoption-map">
<div class="adoption-origin"><span>START WITH</span><b>your real constraint</b></div>
<div class="adoption-branches"><i></i><i></i><i></i></div>
<div class="adoption-paths"><div><span>A</span><b>WORKTREES</b><p>One repo.<br />Parallel branches.</p><small>humans + agents</small></div><div><span>B</span><b>META-REPO</b><p>Many repos.<br />One coordination surface.</p><small>distributed product</small></div><div class="combined"><span>A+B</span><b>COORDINATED WORKTREES</b><p>Parallel feature environments across repositories.</p><small>both constraints</small></div></div>
</div>

<!--
Reinforce that neither pillar is subordinate. Start where the pain is, then compose when needed.
-->

---

<div class="eyebrow">Boundaries</div>

# What Arashi does—and does not do

<div class="boundary-map">
<div class="boundary-side arashi-side"><div class="boundary-head"><img :src="'/arashi-logo.svg'" alt="" /><span>ARASHI</span></div><ul><li><b>01</b> Workspace discovery</li><li><b>02</b> Worktree lifecycle</li><li><b>03</b> Cross-repo coordination</li><li><b>04</b> Status + automation surfaces</li></ul></div>
<div class="boundary-line"><span>COMPOSES</span><i></i><small>DOES NOT<br />REPLACE</small></div>
<div class="boundary-side platform-side"><div class="boundary-head"><span>GIT + PLATFORM</span></div><ul><li><b>01</b> Commits + history</li><li><b>02</b> Code review</li><li><b>03</b> CI + releases</li><li><b>04</b> Repository permissions</li></ul></div>
</div>

<!--
Arashi composes existing Git and hosting workflows. It is not a replacement VCS, CI platform, or monorepo conversion tool.
-->

---

<div class="eyebrow">Direction</div>

# Make coordinated development feel ordinary

<div class="direction-line">
<div><span>NOW</span><b>Reliable lifecycle</b><small>isolation + visibility</small></div><i><em></em></i><div><span>NEXT</span><b>Richer integrations</b><small>automation + handoffs</small></div><i><em></em></i><div class="goal"><span>GOAL</span><b>Coordination becomes ordinary</b><small>parallel work without coordination tax</small></div>
</div>
<div class="manifesto">The future is not <s>more repositories</s> or <s>more agents</s>.<strong>It is making their coordination boring.</strong></div>

<!--
Keep roadmap language directional rather than promising uncommitted features. Point interested viewers to the project issues and documentation for current plans.
-->

---

<div class="eyebrow">Try it</div>

# Start with your real constraint

<div class="start-paths">
<div><span>IF THE CONSTRAINT IS</span><h3>Parallel work</h3><p>Create one isolated worktree for the next branch or agent.</p><div class="mini-terminal"><b>$</b> aw create feat/next</div><small>START WITH A</small></div>
<div><span>IF THE CONSTRAINT IS</span><h3>Distributed code</h3><p>Describe the repositories that already make up your product.</p><div class="mini-terminal"><b>$</b> aw init</div><small>START WITH B</small></div>
</div>

<div class="footer-link">Docs: arashi.haphazard.dev · Source: github.com/corwinm/arashi</div>

<!--
Give two starts, matching the two pillars. Invite the audience to choose their current pain rather than adopting every capability at once.
-->

---

<div class="end-panel">
<div class="brand-lockup"><img :src="'/arashi-logo.svg'" alt="" /><span>ARASHI</span></div>
<div class="eyebrow">Choose your path</div>

# Work in parallel.<br>Coordinate what is distributed.

[arashi.haphazard.dev](https://arashi.haphazard.dev/) · [github.com/corwinm/arashi](https://github.com/corwinm/arashi)
</div>

<!--
Close by restating the two outcomes. Take questions, or return to the relevant demo slide based on the audience's environment.
-->
