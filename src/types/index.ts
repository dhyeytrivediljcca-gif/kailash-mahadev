export interface SacredSymbol {
  id: string;
  icon: string;
  name: string;
  sanskrit: string;
  tagline: string;
  description: string;
  aspects: string[];
}

export type SectionId = 
  | 'hero' 
  | 'kailash' 
  | 'shiva' 
  | 'symbolism' 
  | 'ganga' 
  | 'night' 
  | 'meditation';
