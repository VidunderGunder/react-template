export type StringWithSuggestions<T extends string> = T | (string & {});

export function capitalizeTyped<T extends string>(str: T): Capitalize<T> {
	return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>;
}

export function uncapitalizeTyped<T extends string>(str: T): Uncapitalize<T> {
	return (str.charAt(0).toLowerCase() + str.slice(1)) as Uncapitalize<T>;
}

export function lowercaseTyped<T extends string>(str: T): Lowercase<T> {
	return str.toLowerCase() as Lowercase<T>;
}

export function uppercaseTyped<T extends string>(str: T): Uppercase<T> {
	return str.toUpperCase() as Uppercase<T>;
}

/**
 * ## Example
 *
 * For this input:
 *
 * ```ts
 * const enum ContextTag {
 *   OptionA = "Direct A",
 *   OptionB = "Option B",
 *   OptionC = "Customer C",
 * }
 * ```
 *
 * These will be equivalent:
 *
 * ```ts
 * const a = ["Option A", "Option B", "Option C"] as const;
 * const b = enumToReadonlyArray(ContextTag);
 * ```
 *
 * ---
 *
 * ## Type differences
 *
 * Note that the implicit type will be slightly different for the produced array, so:
 *
 * ```ts
 * // using [] as const
 * type A = ["Option A", "Option B", "Option C"]
 *
 * // using enumToReadonlyArray
 * type B = readonly ("Option A" | "Option B" | "Option C")[]
 * ```
 */
export function enumToReadonlyArray<E extends Record<string, string | number>>(
	enumeration: E,
) {
	return Object.freeze(Object.values(enumeration) as `${E[keyof E]}`[]);
}

const defaultSeparators = [" "] as const satisfies string[];
type DefaultSeparator = (typeof defaultSeparators)[number];

export type Trim<
	T extends string,
	Sep extends string = DefaultSeparator,
	Acc extends string = "",
> = string extends T | Sep
	? string
	: T extends `${Sep}${infer Rest}`
		? Trim<Rest, Sep, Acc>
		: T extends `${infer Char}${infer Rest}`
			? Trim<Rest, Sep, `${Acc}${Char}`>
			: Acc;

const escapeRegex = (str: string) =>
	str.replace(/[.*+?^${}()|[\]\\-]/g, "\\$&");

/**
 * Removes every separator from a string
 */
export function trimTyped<
	T extends string,
	const S extends readonly string[] = typeof defaultSeparators,
>(str: T, separators?: S): Trim<T, S[number]> {
	const regex = new RegExp(
		(separators ?? defaultSeparators).map(escapeRegex).join("|"),
		"g",
	);
	return str.replace(regex, "") as Trim<T, S[number]>;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * A utility type that makes specified keys K of T optional, while keeping the rest as is.
 */
export type PartialPick<T, K extends keyof T> = Omit<T, K> &
	Partial<Pick<T, K>>;
