export function combineClassNames(...classNames: (string | undefined | null)[]) {
    return classNames.filter(Boolean).join(' ');
}