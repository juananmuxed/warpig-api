const kebabCase = (text?: string): string => text
  ?.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
  ?.map((substring) => substring.toLowerCase())
  .join('-') || '';

function isUpperCase(text?: string) {
  return (/^[^a-z]*$/).test(text || '');
}

const camelCase = (text?: string): string => {
  if (isUpperCase(text)) {
    return text?.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_m, chr) => chr?.toUpperCase()) || '';
  }

  return text?.replace(/[-_]+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase())).replace(/\s+/g, '')
    .replace(/ /g, '') || '';
};

const pascalCase = (text?: string): string => text?.replace(/[-_]+/g, ' ')
  .replace(/[^\w\s]/g, '')
  .replace(/\s+(.)(\w*)/g, (_$1, $2, $3) => `${$2.toUpperCase() + $3}`)
  .replace(/^\w/, (substring) => substring.toUpperCase()) || '';

const normalizeLowerString = (string: string | number): string => string.toString().normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const parse = {
  kebabCase,
  camelCase,
  pascalCase,
  normalizeLowerString,
  capitalize,
};
