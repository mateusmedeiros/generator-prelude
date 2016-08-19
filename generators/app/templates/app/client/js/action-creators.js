export const SOMETHING = 'SOMETHING';

export function doSomething(something) {
  return {
    type: SOMETHING,
    payload: something
  };
}
