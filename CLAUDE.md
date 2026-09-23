- Always push and merge to main unless told otherwise
- Prefer good and readable logic over comments. Generally avoid comments unless very valuable, and if so, keep them extremely short and terse, and as if it was written by a human for other people (informal and understandable to the biggest possible audience beats formality and preciseness/correctness)
- When abstracting, generally avoid removing api surface and make it easy to extend and work with in the future, unless there's good reasons to do otherwise. Here's an example for a React component:  
```tsx
export type TemplateProps = {
	//
} & ComponentProps<"div">;

export function Template({ children, className, ...props }: TemplateProps) {
	return (
		<div className={cn(
      /**
       * Intentionally empty string to make it super easy to pick up
       * 
       * We can sweep through and optimize when needed later
       */
      "", 
      className
    )} {...props}>
			{children}
		</div>
	);
}
```
- Good citizen / Housecleaning; We want to keep the code lean to reduce unnecessary context and bloat, so help maintain the code as you go:
  - Avoid multiple sources of truth, unless there's a strong counter-argument, and prefer code to be where truth lives. This includes documentation, comments and other references. Prefer referring to sources of truth, rather than writing something that is likely to drift or require manual maintenance. Fix obvious deviations from this as you go.
  - Fix obvious drift, multiple sources of truth or small bugs in code you're already changing. Anything bigger: raise it as a terse question with alternatives (preferably one way of fixing it, but present options with recommendation if tricky, or ignore).
  - For code likely to drift and not crucial for the app, testing or an important workflows over time, note when it was created/altered and when and if it's okay to delete.
  - Delete outdated or irrelevant or redundant code. If unsure, ask if it's okay to delete.
- Runtime guards (`(x): x is T`) instead of `as` casts on untyped data. Avoid `!` where a check reads as clearly.
- Use `as const satisfies ...[]` and `as const satisfies Record<…>` for readonly and constant arrays and objects/records.