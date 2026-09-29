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

3. **Complete Python local MCP server runbook**

   * Generate the runbook **directly in this conversation**.
   * **Do not generate a file.**
   * **Do not use a text editor/document editor.**
   * Present every implementation step in a **strict, clear sequence order**:

   ```text
   Step 1
   Step 2
   Step 3
   ...

   * Every step must explicitly include a section such as:

   **Related Finding IDs:** `F-001, F-004, F-009`

   * This creates a traceability relationship between the research findings and the implementation steps.
   * The runbook should therefore allow me to trace **each implementation decision back to the relevant research finding(s)**.
   * The runbook must be complete enough to implement the local Python MCP server from start to finish according to the research findings.
````
