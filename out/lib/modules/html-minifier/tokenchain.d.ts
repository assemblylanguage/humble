export = TokenChain;
declare function TokenChain(): void;
declare class TokenChain {
    add: (tokens: any) => void;
    createSorter: () => Sorter;
}
declare function Sorter(): void;
declare class Sorter {
    sort(tokens: any, fromIndex: any): any;
}
//# sourceMappingURL=tokenchain.d.ts.map