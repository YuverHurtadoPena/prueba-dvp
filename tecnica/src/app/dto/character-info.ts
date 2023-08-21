import { OriginCharacter } from "./origin-character";

export interface CharacterInfo {
  id:number,
  name:string,
  status:string,
  image:string,
  species:string,
  gender:string,
  created:Date,
  location:OriginCharacter,
  origin:OriginCharacter
}
