import { TypeOfTet } from "./TypeOfTet"

export type firstTeriminos = Tetrimino[]

export interface Tetrimino {
    type: TypeOfTet
    fields: number[]
  }