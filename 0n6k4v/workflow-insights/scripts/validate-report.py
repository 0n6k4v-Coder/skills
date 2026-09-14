#!/usr/bin/env python3
"""Validate the durable Workflow Insights JSON contract."""
from __future__ import annotations

import argparse
import json
from pathlib import Path

TOP_LEVEL = {"schema_version", "generated_at", "scope", "metrics", "findings", "hypotheses", "recommendations", "experiments", "limitations"}


def validate(path: Path) -> list[str]:
    errors: list[str] = []
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        return ["top level must be an object"]
    missing = TOP_LEVEL - set(data)
    if missing:
        errors.append(f"missing top-level keys: {sorted(missing)}")
    if data.get("schema_version") != "1.0":
        errors.append("schema_version must be 1.0")
    for key in ("findings", "hypotheses", "recommendations", "experiments", "limitations"):
        if key in data and not isinstance(data[key], list):
            errors.append(f"{key} must be an array")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("report", type=Path)
    args = parser.parse_args()
    try:
        errors = validate(args.report)
    except (OSError, json.JSONDecodeError) as exc:
        print(f"INVALID: {exc}")
        return 1
    if errors:
        for error in errors:
            print(f"INVALID: {error}")
        return 1
    print("VALID")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
