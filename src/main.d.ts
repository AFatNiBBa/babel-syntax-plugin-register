
type Mixin<TBase> = <T extends TBase>(base: new () => TBase) => new() => T;

type Result<TName> = {
    name: TName,
    manipulateOptions(opts, parserOpts: { plugins: string[] })
};

/**
 * Registers a plugin.
 * @param name The name of the plugin
 * @param mix A function that takes a base parser class and returns a new one
 */
declare function register<TName extends string | symbol, T>(name: TName, mix: Mixin<T>): Result<TName>;

/**
 * Registers a plugin.
 * @param mix A NAMED function that takes a base parser class and returns a new one
 */
declare function register<TName extends string | symbol, T>(mix: Mixin<T> & { name: TName }): Result<TName>;

export = register;