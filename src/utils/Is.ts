function nullOrUndefined(value?: unknown): value is undefined | null {
  return value === null || value === undefined;
}

function nullOrWhiteSpace(value?: unknown): value is undefined | null {
  return nullOrUndefined(value) || (`${value ?? ''}`).trim().length === 0;
}

export const is = {
  nullOrUndefined,
  nullOrWhiteSpace,
};
