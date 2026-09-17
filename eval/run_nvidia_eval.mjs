process.argv.push("--provider", "nvidia");
await import("./run_gemini_eval.mjs");
