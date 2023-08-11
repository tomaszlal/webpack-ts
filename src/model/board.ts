import { TypeOfTet } from "./TypeOfTet"

export type ArrayBoard = Field[]

export interface Field {
  x: number
  y: number
  value: TypeOfTet
}
