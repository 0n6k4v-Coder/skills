# Local MCP Server Research-to-Runbook Workflow

````text
1. **Deep research**

   * Research the latest official **MCP Server documentation**.
   * Research the latest official documentation for all relevant **technology-stack components**.
   * Research relevant and current **industry standards**.
   * Use the research to establish the technical basis for the implementation.

2. **Research findings summary**

   * Present the findings as a **clear table**, not just prose.
   * Include a unique **Finding ID** for every finding so it can be referenced later.
   * Design the table with the necessary columns to make each finding easy to understand and trace. For example:

   | Finding ID | Area | Finding | Why It Matters | Source / Standard | Version / Date | Implementation Impact |
   | ---------- | ---- | ------- | -------------- | ----------------- | -------------- | --------------------- |

   * Add other columns where useful, but keep the structure clear and practical.

3. **Complete Step-By-Step Runbook**

* Generate the complete runbook **directly in this conversation**.
* **Do not create or generate a file.**
* **Do not use a text editor or document editor.**
* Keep the runbook **simple, clear, direct, explicit, and concise**.
* Include **only the steps required** to implement and verify the local Python MCP server.
* Do not include unrelated information, optional steps, or unnecessary explanations.
* Present all implementation steps in a **strict sequential order**:

```text
Step 1
Step 2
Step 3
...
```

* Each step must clearly state:

  * **What to do**
  * **Exact command, configuration, or file content required**
  * **Expected result**, when applicable
* When a file must be created or modified, provide its **complete final contents**, not snippets or partial changes.
* Every step must include this section:

**Related Finding IDs:** `F-001, F-004, F-009`

* The Finding IDs must correspond directly to the research findings supporting that step.
* Use the existing research Finding IDs only. **Do not invent new Finding IDs.**
* The Finding IDs must provide a clear trace from each implementation decision back to the relevant research finding(s).
* The runbook must cover the complete implementation and verification process **from start to finish**, based only on the established research findings.
* The final runbook must be detailed enough to follow **step by step without having to determine missing implementation details independently**.
````
