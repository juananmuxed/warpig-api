import { useLoggerServer } from '@config/UseLoggerServer';
import { Armies } from '@db/models/Armies';
import { Countries } from '@db/models/Countries';
import { Criterions } from '@db/models/Criterion';
import { Expansions } from '@db/models/Expansions';
import { Games } from '@db/models/Games';
import {
  CriterionPairingsBlue, CriterionPairingsRed, Pairings, ParticipantsPairingsBlue, ParticipantsPairingsRed,
} from '@db/models/Pairings';
import { Participants } from '@db/models/Participants';
import { Roles } from '@db/models/Roles';
import { Rounds } from '@db/models/Rounds';
import { States } from '@db/models/States';
import { Teams } from '@db/models/Teams';
import { CriterionsTournaments, ExpansionsTournaments, TournamentTypes, Tournaments } from '@db/models/Tournaments';
import { Users } from '@db/models/Users';

const log = useLoggerServer();

const dropAll = async () => {
  try {
    await ParticipantsPairingsBlue.drop();
    await ParticipantsPairingsRed.drop();
    await CriterionPairingsRed.drop();
    await CriterionPairingsBlue.drop();
    await ExpansionsTournaments.drop();
    await CriterionsTournaments.drop();
    await Participants.drop();
    await Users.drop();
    await Criterions.drop();
    await Pairings.drop();
    await Rounds.drop();
    await Armies.drop();
    await Expansions.drop();
    await Tournaments.drop();
    await TournamentTypes.drop();
    await States.drop();
    await Countries.drop();
    await Games.drop();
    await Teams.drop();
    await Roles.drop();
    log.simpleMessage('🗑️  DB dropped correctly')
  } catch (error) {
    throw new Error(error as string);
  }
};

dropAll();
