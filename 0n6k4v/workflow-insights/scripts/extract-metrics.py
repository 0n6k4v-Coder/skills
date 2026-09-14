#!/usr/bin/env python3
"""Extract conservative deterministic session metrics from Claude Code JSONL."""
from __future__ import annotations

import argparse
import json
from pathlib import Path
from statistics import median
from typing import Any


def read_records(path: Path) -> list[dict[str, Any]]:
    records: list[dict[str, Any]] = []
    for line in path.read_text(encoding="utf-8", errors="replace").splitlines():
        try:
            item = json.loads(line)
        except json.JSONDecodeError:
            continue
        if isinstance(item, dict):
            records.append(item)
    return records


def number(value: Any) -> float:
    return float(value) if isinstance(value, (int, float)) else 0.0


def extract(path: Path) -> dict[str, Any]:
    records = read_records(path)
    timestamps: list[str] = []
    user_messages = assistant_messages = tool_calls = tool_errors = interruptions = 0
    lines_added = lines_removed = 0
    files_touched: set[str] = set()
    languages: set[str] = set()
    commits = pushes = 0

    for record in records:
        timestamp = record.get("timestamp")
        if isinstance(timestamp, str):
            timestamps.append(timestamp)
        message = record.get("message")
        role = message.get("role") if isinstance(message, dict) else None
        if role == "user":
            user_messages += 1
        elif role == "assistant":
            assistant_messages += 1
        typ = record.get("type")
        if typ in {"tool_use", "tool_call"}:
            tool_calls += 1
        if typ in {"tool_error", "error"}:
            tool_errors += 1
        if typ in {"interrupt", "interruption"}:
            interruptions += 1
        usage = record.get("usage")
        if isinstance(usage, dict):
            # Kept deliberately generic; provider-specific usage keys vary.
            lines_added += int(number(usage.get("lines_added")))
            lines_removed += int(number(usage.get("lines_removed")))
        for key in ("file", "path", "file_path"):
            value = record.get(key)
            if isinstance(value, str):
                files_touched.add(value)
        ext = record.get("language")
        if isinstance(ext, str):
            languages.add(ext)
        command = record.get("command")
        if isinstance(command, str):
            if "git commit" in command:
                commits += 1
            if "git push" in command:
                pushes += 1

    return {
        "session_file": str(path),
        "records": len(records),
        "user_messages": user_messages,
        "assistant_messages": assistant_messages,
        "tool_calls": tool_calls,
        "tool_errors": tool_errors,
        "interruptions": interruptions,
        "lines_added": lines_added,
        "lines_removed": lines_removed,
        "files_touched": len(files_touched),
        "languages": sorted(languages),
        "commits": commits,
        "pushes": pushes,
        "first_timestamp": min(timestamps) if timestamps else None,
        "last_timestamp": max(timestamps) if timestamps else None,
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("session", type=Path)
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    result = extract(args.session.expanduser())
    text = json.dumps(result, indent=2) + "\n"
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(text, encoding="utf-8")
    else:
        print(text, end="")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
