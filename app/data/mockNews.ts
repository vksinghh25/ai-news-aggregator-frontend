export interface NewsItem {
  id: string;
  title: string;
  snippet: string;
  date: string;
  source: string;
}

export const mockNewsData: NewsItem[] = [
  {
    id: "1",
    title: "OpenAI Releases GPT-5 with Multimodal Capabilities",
    snippet: "The latest iteration introduces advanced reasoning abilities and can process images, audio, and text simultaneously, marking a significant leap in AI understanding.",
    date: "2024-01-15",
    source: "TechCrunch"
  },
  {
    id: "2",
    title: "Google's Gemini Pro Surpasses Human Performance on MMLU",
    snippet: "New benchmark results show Gemini Pro achieving 90.3% accuracy on the Massive Multitask Language Understanding test, outperforming human experts.",
    date: "2024-01-14",
    source: "Google AI Blog"
  },
  {
    id: "3",
    title: "Meta's Llama 3 Shows Promise in Code Generation",
    snippet: "Open-source model demonstrates competitive performance with proprietary solutions, potentially democratizing access to high-quality code generation tools.",
    date: "2024-01-13",
    source: "Meta AI"
  },
  {
    id: "4",
    title: "Anthropic's Claude 3.5 Sonnet Breaks Reasoning Records",
    snippet: "Latest model achieves unprecedented performance on mathematical and logical reasoning tasks, setting new industry standards for AI problem-solving.",
    date: "2024-01-12",
    source: "Anthropic"
  },
  {
    id: "5",
    title: "Microsoft Integrates AI Copilot Across Office Suite",
    snippet: "Company announces comprehensive AI integration that will transform how users interact with Word, Excel, PowerPoint, and other productivity tools.",
    date: "2024-01-11",
    source: "Microsoft"
  },
  {
    id: "6",
    title: "Tesla's FSD Beta Shows 40% Improvement in Safety Metrics",
    snippet: "Latest autonomous driving software update demonstrates significant progress in handling complex urban scenarios and edge cases.",
    date: "2024-01-10",
    source: "Tesla"
  },
  {
    id: "7",
    title: "DeepMind's AlphaFold 3 Revolutionizes Protein Structure Prediction",
    snippet: "New version can predict protein structures with atomic-level accuracy, potentially accelerating drug discovery and biological research.",
    date: "2024-01-09",
    source: "Nature"
  },
  {
    id: "8",
    title: "NVIDIA's H200 GPU Sets New AI Training Benchmarks",
    snippet: "Latest hardware achieves 2x performance improvement over previous generation, enabling faster training of large language models.",
    date: "2024-01-08",
    source: "NVIDIA"
  },
  {
    id: "9",
    title: "Stability AI Releases Stable Diffusion 3.0",
    snippet: "Updated image generation model produces higher quality outputs with better understanding of complex prompts and artistic styles.",
    date: "2024-01-07",
    source: "Stability AI"
  }
];
