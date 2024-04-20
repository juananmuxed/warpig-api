import { Users } from '@db/models/Users';
import { Roles } from '@db/models/Roles';
import { Games } from './models/Games';
import { Expansions } from './models/Expansions';
import { Armies } from './models/Armies';
import { Countries } from './models/Countries';
import { States } from './models/States';
import { CriterionsTournaments, ExpansionsTournaments, TournamentTypes, Tournaments } from './models/Tournaments';
import { Rounds } from './models/Rounds';
import { Teams } from './models/Teams';
import {
  Pairings, ParticipantsPairingsRed, ParticipantsPairingsBlue, CriterionPairingsRed, CriterionPairingsBlue,
} from './models/Pairings';
import { Criterions } from './models/Criterion';
import { Participants } from './models/Participants';

export const syncDatabase = async () => {
  await Roles.sync();
  await Teams.sync();
  await Games.sync();
  await Countries.sync();
  await States.sync();
  await TournamentTypes.sync();
  await Tournaments.sync();
  await Expansions.sync();
  await Armies.sync();
  await Rounds.sync();
  await Pairings.sync();
  await Criterions.sync();
  await Users.sync();
  await Participants.sync();
  await ParticipantsPairingsRed.sync();
  await ParticipantsPairingsBlue.sync();
  await CriterionPairingsRed.sync();
  await CriterionPairingsBlue.sync();
  await ExpansionsTournaments.sync();
  await CriterionsTournaments.sync();
};
