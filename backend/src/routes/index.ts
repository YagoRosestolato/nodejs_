import { Router } from 'express';

import pacienteRouter from './paciente.routes';
import medicoRouter from './medico.routes';
import agendamentosRouter from './agendamentos.routes';

const routes = Router();

routes.use('/paciente', pacienteRouter);
routes.use('/medico', medicoRouter);
routes.use('/agendamentos', agendamentosRouter);

export default routes;
