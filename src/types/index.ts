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
 *   DirectSales = "Direct Sales",
 *   Inhouse = "Inhouse",
 *   CustomerService = "Customer Service",
 * }
 * ```
 *
 * These will be equivalent:
 *
 * ```ts
 * const a = ["Direct Sales", "Inhouse", "Customer Service"] as const;
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
 * type A = ["Direct Sales", "Inhouse", "Customer Service"]
 *
 * // using enumToReadonlyArray
 * type B = readonly ("Direct Sales" | "Inhouse" | "Customer Service")[]
 * ```
 */
export function enumToReadonlyArray<E extends Record<string, string | number>>(
	enumeration: E,
) {
	return Object.freeze(Object.values(enumeration) as `${E[keyof E]}`[]);
}

const separators = [" ", "-"] as const satisfies string[];
type Separator = (typeof separators)[number];

export type Trim<
	T extends string,
	Acc extends string = "",
> = T extends `${infer Char}${infer Rest}`
	? Char extends Separator
		? Trim<Rest, Acc>
		: Trim<Rest, `${Acc}${Char}`>
	: T extends ""
		? Acc
		: never;

const trimRegex = new RegExp(
	`[${separators.map((s) => s.replace(/[\\\]^-]/g, "\\$&")).join("")}]`,
	"g",
);

/**
 * Removes every separator from a string, see `separators`
 */
export function trimTyped<T extends string>(str: T): Trim<T> {
	return str.replace(trimRegex, "") as Trim<T>;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * A utility type that makes specified keys K of T optional, while keeping the rest as is.
 */
export type PartialPick<T, K extends keyof T> = Omit<T, K> &
	Partial<Pick<T, K>>;
