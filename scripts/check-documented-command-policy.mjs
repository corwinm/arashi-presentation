#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const commands = [
  "add",
  "clone",
  "completion",
  "create",
  "doctor",
  "exec",
  "handoff",
  "init",
  "install",
  "list",
  "move",
  "prune",
  "pull",
  "push",
  "remove",
  "setup",
  "shell",
  "status",
  "switch",
  "sync",
  "update",
];
const legacyInvocation = new RegExp(
  String.raw`(?:\bcommand\s+)?(?<![./@-])\barashi\s+(?:--(?:help|version)\b|-[hV]\b|<command>(?=\s|\x60|$)|(?:${commands.join("|")})\b)`,
  "g",
);
const compatibilityNote =
  "`arashi` executable remains supported for existing scripts and workflows";

function maskPackageRunnerSpecifiers(line) {
  return line.replace(
    /\b(npx(?:\s+(?:--yes|-y))*|pnpm\s+dlx|npm\s+exec\s+--)(\s+)arashi(?=\s)/g,
    (_, runner, spacing) => `${runner}${spacing}${" ".repeat("arashi".length)}`,
  );
}

export function findPreferredArashiInvocations(content, source) {
  return content.split(/\r?\n/).flatMap((line, index) => {
    if (line.includes(compatibilityNote)) return [];
    legacyInvocation.lastIndex = 0;
    return legacyInvocation.test(maskPackageRunnerSpecifiers(line))
      ? [
          `${source}:${index + 1}: preferred examples must use aw: ${line.trim()}`,
        ]
      : [];
  });
}

const negative = findPreferredArashiInvocations(
  [
    "$ arashi status",
    "`arashi create topic`",
    "command arashi completion zsh",
    "npm exec --package=arashi -- arashi status",
    "arashi -h",
    "npx --yes arashi status; arashi status",
    "npx -y arashi status; `arashi status`",
    "npx --quiet arashi status",
  ].join("\n"),
  "negative.md",
);
assert.equal(negative.length, 8);
assert.deepEqual(
  findPreferredArashiInvocations(
    [
      "Arashi uses .arashi/config.json. npm install -g arashi. https://github.com/corwinm/arashi",
      "The `arashi` executable remains supported for existing scripts and workflows; `arashi status` remains valid there.",
      "Try npx arashi status.",
      "Try npx --yes arashi status.",
      "Try npx -y arashi status.",
      "Try pnpm dlx arashi status.",
      "Try npm exec -- arashi status.",
      "Historical examples used the arashi spelling.",
      "Run `aw status`.",
    ].join("\n"),
    "positive.md",
  ),
  [],
);

const defects = ["README.md", "slides.md"].flatMap((source) =>
  findPreferredArashiInvocations(readFileSync(source, "utf8"), source),
);
assert.deepEqual(
  defects,
  [],
  `primary documented command policy failed:\n${defects.join("\n")}`,
);
console.log(
  "Presentation primary documented command policy passed with positive/negative fixtures.",
);
