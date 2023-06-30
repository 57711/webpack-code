export function sum(...args) {
    return args.reduce((result, item) => result + item, 0)
}
