import {
  AwilixContainer,
  ContainerOptions,
  createContainer,
  ResolveOptions,
  Resolver,
} from "awilix";

/**
 * Container definition base.
 */
interface ContainerDefinition {
  [key: string]: Resolver<unknown>;
}

/**
 * Extracts the type that will be resolved from a resolver.
 */
type ExtractResolverType<T> = T extends Resolver<infer X> ? X : null;

/**
 * Strongly-typed container.
 */
interface TypedAwilixContainer<T extends ContainerDefinition>
  extends Pick<AwilixContainer, Exclude<keyof AwilixContainer, "resolve">> {
  /**
   * Resolves the registration with the given name.
   *
   * @param  {string} name
   * The name of the registration to resolve.
   *
   * @return {*}
   * Whatever was resolved.
   */
  resolve<K extends keyof T>(
    key: K,
    resolveOptions?: ResolveOptions
  ): ExtractResolverType<T[K]>;
}

/**
 * Wraps `createContainer` and calls `register` on it.
 */
export function createTypedContainer<T extends ContainerDefinition>(
  registrations: T,
  opts?: ContainerOptions
): TypedAwilixContainer<T> {
  return createContainer(opts).register(registrations);
}
