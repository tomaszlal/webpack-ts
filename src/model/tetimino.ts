import { TypeOfTet } from "./type_of_tet"

export type firstTeriminos = Tetrimino[]

export interface Tetrimino {
    type: TypeOfTet
    fields: number[]
  }