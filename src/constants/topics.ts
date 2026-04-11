import type { Topic } from '@/types/question';

/**
 * Official topic list — the single source of truth for topic names and IDs.
 * questionCount is populated at runtime by the question bank loader.
 */
export const OFFICIAL_TOPICS: Omit<Topic, 'questionCount'>[] = [
  { id: 'mefaratTechni',         name: 'מפרט טכני' },
  { id: 'sikunimRefuiim',        name: 'סיכונים תעסוקתיים וכשירות רפואית' },
  { id: 'eichotVeVitaon',        name: 'איכות ובטיחות' },
  { id: 'niulEsek',              name: 'ניהול עסק' },
  { id: 'shitotKamutiot',        name: 'שיטות כמותיות ועקרונות לחישוב תמחיר הובלה' },
  { id: 'shinuaChomas',          name: 'שינוע חומ״ס' },
  { id: 'shmaotRechevBituch',    name: 'שמאות רכב וביטוח' },
  { id: 'katsinBitachon',        name: 'תפקידיו של קצין בטיחות (קצב״ת)' },
  { id: 'menahel',               name: 'תפקידיו של המנהל המקצועי וארגונים בענף ההובלה' },
  { id: 'dineiAvoda',            name: 'דיני תעבורה, עבודה ועסקים' },
  { id: 'takanotHovala',         name: 'תקנות להובלת וריתום מטענים' },
  { id: 'chokSheruteiHovala',    name: 'חוק ותקנות שירותי הובלה' },
];

/**
 * Map from every possible raw CSV topic string → official topic ID.
 * Handles minor spelling/punctuation variants.
 */
export const TOPIC_NORMALIZATION_MAP: Record<string, string> = {
  // מפרט טכני
  'מפרט טכני': 'mefaratTechni',

  // סיכונים תעסוקתיים וכשירות רפואית
  'סיכונים תעסוקתיים וכשירות רפואית': 'sikunimRefuiim',

  // איכות ובטיחות
  'איכות ובטיחות': 'eichotVeVitaon',

  // ניהול עסק
  'ניהול עסק': 'niulEsek',

  // שיטות כמותיות ועקרונות לחישוב תמחיר הובלה
  'שיטות כמותיות ועקרונות לחישוב תמחיר הובלה': 'shitotKamutiot',

  // שינוע חומ״ס (various quote styles)
  'שינוע חומ״ס': 'shinuaChomas',
  'שינוע חומ"ס': 'shinuaChomas',
  'שינוע חומס': 'shinuaChomas',

  // שמאות רכב וביטוח
  'שמאות רכב וביטוח': 'shmaotRechevBituch',

  // תפקידיו של קצין בטיחות
  'תפקידי קצין בטיחות (קצב״ת)': 'katsinBitachon',
  'תפקידיו של קצין בטיחות (קצב״ת)': 'katsinBitachon',
  'תפקידי קצין בטיחות': 'katsinBitachon',
  'תפקידי קצין בטיחות (קצב"ת)': 'katsinBitachon',

  // תפקידיו של המנהל המקצועי וארגונים בענף ההובלה
  'תפקידיו של המנהל המקצועי וארגונים בענף ההובלה': 'menahel',
  'תפקידיו של המנהל המקצועי ורגונים בענף ההובלה': 'menahel',

  // דיני תעבורה, עבודה ועסקים
  'דיני תעבורה, עבודה ועסקים': 'dineiAvoda',

  // תקנות להובלת וריתום מטענים
  'תקנות להובלת וריתום מטענים': 'takanotHovala',

  // חוק ותקנות שירותי הובלה
  'חוק ותקנות שירותי הובלה': 'chokSheruteiHovala',
};
