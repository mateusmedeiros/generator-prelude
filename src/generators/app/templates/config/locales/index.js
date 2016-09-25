import { en as nestedEn } from './en';
import { pt_BR as nestedPtBR } from './pt-BR';
import flatten from 'flat';

const en = flatten(nestedEn);
const pt_BR = flatten(nestedPtBR);

export { en, pt_BR };
