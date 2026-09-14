#!/usr/bin/env python3
"""Normalize model-produced session classifications into a stable JSON shape."""
from __future__ import annotations

import argparse
import json
from pathlib import Path

REQUIRED = [
    "underlying_goal",
    "goal_categories",
    "outcome",
    "session_type",
    "brief_summary",
]


def normalize(data: dict) -> dict:
    result = {key: data.get(key) for key in REQUIRED}
    result["goal_categories"] = data.get("goal_categories") or []
    result["friction_counts"] = data.get("friction_counts") or {}
    result["friction_detail"] = data.get("friction_detail") or []
    result["user_satisfaction"] = data.get("user_satisfaction")
    result["claude_helpfulness"] = data.get("claude_helpfulness")
    result["primary_success"] = data.get("primary_success")
    result["attribution"] = data.get("attribution") or "mixed_or_unknown"
    return result


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("input", type=Path)
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    data = json.loads(args.input.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise SystemExit("Input must be a JSON object")
    text = json.dumps(normalize(data), indent=2) + "\n"
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(text, encoding="utf-8")
    else:
        print(text, end="")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
