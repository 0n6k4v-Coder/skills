#!/usr/bin/env python3
"""Discover Claude Code session JSONL files without interpreting their contents."""
from __future__ import annotations

import argparse
from pathlib import Path


def discover(root: Path) -> list[Path]:
    if not root.exists():
        return []
    return sorted(root.rglob("*.jsonl"))


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("root", type=Path, help="Claude session root, e.g. ~/.claude/projects")
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()

    files = discover(args.root.expanduser())
    text = "\n".join(str(p) for p in files) + ("\n" if files else "")
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(text, encoding="utf-8")
    else:
        print(text, end="")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
