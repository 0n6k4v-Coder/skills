#!/usr/bin/env python3
"""Deterministic stratified sampler over session metadata JSON."""
from __future__ import annotations

import argparse
import json
import random
from pathlib import Path
from typing import Any


def key(item: dict[str, Any]) -> tuple[str, str, str]:
    return (
        str(item.get("project") or "unknown"),
        str(item.get("session_type") or "unknown"),
        str(item.get("outcome") or "unknown"),
    )


def sample(items: list[dict[str, Any]], size: int, seed: int) -> list[dict[str, Any]]:
    if size >= len(items):
        return items
    rng = random.Random(seed)
    buckets: dict[tuple[str, str, str], list[dict[str, Any]]] = {}
    for item in items:
        buckets.setdefault(key(item), []).append(item)
    selected: list[dict[str, Any]] = []
    bucket_items = list(buckets.items())
    while bucket_items and len(selected) < size:
        next_round: list[tuple[tuple[str, str, str], list[dict[str, Any]]]] = []
        for bucket_key, bucket in bucket_items:
            if bucket:
                idx = rng.randrange(len(bucket))
                selected.append(bucket.pop(idx))
                if len(selected) >= size:
                    break
            if bucket:
                next_round.append((bucket_key, bucket))
        bucket_items = next_round
    return selected


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("input", type=Path)
    parser.add_argument("-n", "--size", type=int, default=80)
    parser.add_argument("--seed", type=int, default=20260301)
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    data = json.loads(args.input.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        raise SystemExit("Input must be a JSON array")
    result = sample(data, args.size, args.seed)
    text = json.dumps(result, indent=2) + "\n"
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(text, encoding="utf-8")
    else:
        print(text, end="")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
