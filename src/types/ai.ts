// src/types/ai.ts
export interface AIGenerationResult<T> {
  data: T;
  error?: string;
  source: 'ai' | 'fallback';
}
