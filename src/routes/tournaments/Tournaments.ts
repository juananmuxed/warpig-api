import { Router } from 'express';
import { TournamentsController } from '@controllers/tournaments/Tournaments';
import { AuthenticationController } from '@controllers/auth/Auth';

const router = Router();

const tournaments = new TournamentsController();
const auth = new AuthenticationController();

router.route('/own')
  .get([auth.authJWT], tournaments.getOwnedTournaments);

router.route('/own/paged')
  .get([auth.authJWT], tournaments.getTournamentsPaginated);

router.route('/types')
  .get([auth.authJWT], tournaments.getTournamentsTypes);

export default router;
