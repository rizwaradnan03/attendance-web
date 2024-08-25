import { CONFIG_CASL_Actions, CONFIG_CASL_Subjects } from "@/config"
import { Ability } from "@casl/ability"
import { createContext } from "react";

export type Actions = CONFIG_CASL_Actions;
export type Subjects = CONFIG_CASL_Subjects;

export type AppAbility = Ability<[Actions, Subjects]>;

export const ability = new Ability<[Actions, Subjects]>();
export const AbilityContext = createContext<AppAbility>(ability);