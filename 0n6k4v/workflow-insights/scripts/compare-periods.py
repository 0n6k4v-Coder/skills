#!/usr/bin/env python3
"""Compare two metric JSON objects and emit simple deltas."""
from __future__ import annotations

import argparse
import json
from pathlib import Path

NUMERIC = {
    "sessions_total",
    "sessions_eligible",
    "sessions_analyzed",
    "active_days",
    "user_messages",
    "assistant_messages",
    "tool_calls",
    "tool_errors",
    "interruptions",
    "files_touched",
    "lines_added",
    "lines_removed",
    "commits",
    "pushes",
}


def load(path: Path) -> dict:
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise SystemExit(f"{path} must contain a JSON object")
    return data


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("before", type=Path)
    parser.add_argument("after", type=Path)
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    before, after = load(args.before), load(args.after)
    delta = {}
    for key in NUMERIC:
        a = after.get(key)
        b = before.get(key)
        if isinstance(a, (int, float)) and isinstance(b, (int, float)):
            delta[key] = {"before": b, "after": a, "delta": a - b}
    text = json.dumps(delta, indent=2) + "\n"
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(text, encoding="utf-8")
    else:
        print(text, end="")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
