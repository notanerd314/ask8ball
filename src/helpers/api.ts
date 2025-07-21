import { personalitiesList } from "@/personalities";
import { PersonalityConfig } from "@/helpers/types";

export function getAllPersonalities() {
  let smallPersonalitiesList: Array<PersonalityConfig> = [];

  for (const personality of personalitiesList) {
    smallPersonalitiesList.push({
      linkname: personality.linkname,
      name: personality.name,
      theme: personality.theme
    })
  }

  return smallPersonalitiesList;
}

export function getPersonalityByLinkName(personality: string) {
  return personalitiesList.find(p => p.linkname === personality);
}