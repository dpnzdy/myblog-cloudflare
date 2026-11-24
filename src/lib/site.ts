export const languages = ['ko', 'en', 'de', 'es', 'fr', 'ja'] as const;
export type Language = (typeof languages)[number];
export const defaultLanguage: Language = 'en';
export const languageNames = { ko: '한국어', en: 'English', de: 'Deutsch', es: 'Español', fr: 'Français', ja: '日本語' };
export const categories = ['windows-editing', 'offline-privacy', 'note-workflows'] as const;
export type Category = (typeof categories)[number];

export const brand = 'ZinniaShark Note';
export const store = {
  free: 'https://apps.microsoft.com/detail/9NKD9SB9HXMM',
  pro: 'https://apps.microsoft.com/detail/9PFRH9QLST85',
};
const productSite = 'https://dpnzdy.github.io/ZinniaSharkNote';
export const guidePath = (lang: Language) => `${productSite}/${lang}/guide.html`;
export const homePath = (lang: Language) => `/${lang}/`;
export const blogPath = (lang: Language) => `/${lang}/blog/`;
export const appPath = (lang: Language) => `/${lang}/app/`;
export const articlePath = (lang: Language, slug: string) => `${blogPath(lang)}${slug}/`;
export const topicPath = (lang: Language, topic: Category) => `${blogPath(lang)}topic/${topic}/`;

export type LanguageLinks = Partial<Record<Language, string>>;

export function allLanguages(path: (lang: Language) => string): Record<Language, string> {
  return Object.fromEntries(languages.map((lang) => [lang, path(lang)])) as Record<Language, string>;
}

export function formatDate(value: Date, lang: Language) {
  return new Intl.DateTimeFormat(lang, { dateStyle: 'medium', timeZone: 'UTC' }).format(value);
}
