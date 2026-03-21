// =============================================================================
// Ollama-native tool definitions for Generative UI rendering
// =============================================================================

export interface ParsedToolCall {
  name:
    | "renderProjectCard"
    | "renderSkillChart"
    | "renderArchitectureDiagram"
    | "renderPipelineVisualizer"
    | "renderCyberRadar"
    | "renderAgentDAG";
  arguments: Record<string, string>;
}

export const TOOL_DEFINITIONS = [
  {
    type: "function" as const,
    function: {
      name: "renderProjectCard",
      description:
        "Display an inline project card for one of Atharv's projects. Use this instead of describing a project in long text.",
      parameters: {
        type: "object",
        properties: {
          slug: {
            type: "string",
            enum: [
              "autonomous-marketing-engine",
              "ai-research-agent",
              "ragify-finance",
              "ai-invoice-master",
              "pneumonia-xray",
              "network-intelligence-dashboard",
              "google-meet-transcriber",
            ],
            description: "The project slug to render.",
          },
        },
        required: ["slug"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "renderSkillChart",
      description:
        "Display a visual tech stack chart. Use this when asked about skills or technologies.",
      parameters: {
        type: "object",
        properties: {
          category: {
            type: "string",
            enum: ["trending", "ai-ml", "networking", "backend-ops", "all"],
            description:
              "Which skill category to show. Use 'trending' for top skills, a specific category, or 'all' for everything.",
          },
        },
        required: ["category"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "renderArchitectureDiagram",
      description:
        "Display a vertical architecture/pipeline flow diagram for a project. Use this when asked about how a project works or its architecture.",
      parameters: {
        type: "object",
        properties: {
          slug: {
            type: "string",
            enum: [
              "autonomous-marketing-engine",
              "ai-research-agent",
              "ragify-finance",
              "ai-invoice-master",
              "pneumonia-xray",
              "network-intelligence-dashboard",
              "google-meet-transcriber",
            ],
            description: "The project slug whose architecture to render.",
          },
        },
        required: ["slug"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "renderPipelineVisualizer",
      description:
        "Display a horizontal pipeline flow diagram showing how data moves through a project's stages. Use when asked to visualize a pipeline, data flow, or how data moves through a system.",
      parameters: {
        type: "object",
        properties: {
          slug: {
            type: "string",
            enum: [
              "autonomous-marketing-engine",
              "ai-research-agent",
              "ragify-finance",
              "ai-invoice-master",
              "pneumonia-xray",
              "network-intelligence-dashboard",
              "google-meet-transcriber",
            ],
            description: "The project slug whose pipeline to visualize.",
          },
        },
        required: ["slug"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "renderCyberRadar",
      description:
        "Display a hexagonal radar chart showing coverage across cybersecurity or full-stack skill domains. Use when asked about security coverage, threat monitoring, or skill radar.",
      parameters: {
        type: "object",
        properties: {
          preset: {
            type: "string",
            enum: ["network-security", "full-stack"],
            description:
              "Which radar preset to show. 'network-security' for cybersecurity domains, 'full-stack' for overall engineering coverage.",
          },
        },
        required: ["preset"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "renderAgentDAG",
      description:
        "Display a directed acyclic graph (DAG) showing how AI agents collaborate in a multi-agent workflow. Use when asked about agent architecture, multi-agent workflows, or how agents collaborate.",
      parameters: {
        type: "object",
        properties: {
          variant: {
            type: "string",
            enum: ["marketing-engine", "ragify-pipeline"],
            description: "Which agent DAG variant to render.",
          },
        },
        required: ["variant"],
      },
    },
  },
];
