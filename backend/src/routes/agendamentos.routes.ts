import { Router } from 'express';

import { getRepository } from 'typeorm';
import AgendamentosController from '../app/controllers/AgendamentosController';
import Agendamentos from '../app/models/Agendamentos';
import Medicos from '../app/models/Medicos';
import Pacientes from '../app/models/Pacientes';

const agendamentosRouter = Router();

agendamentosRouter.post('/', async (request, response) => {
  try {
    const { id_medico, id_paciente, data_hora } = request.body;

    const agendamentosController = new AgendamentosController();
    const agendamentos = await agendamentosController.store({ 
      id_medico,
      id_paciente,
      data_hora,
    });

    return response.json(agendamentos);
  } catch (erro) {
    return response.json({ error: erro.message });
  }
});

agendamentosRouter.get('/', async (request, response) => {
  const agendamentosController = getRepository(Agendamentos);
  const agendamentos = await agendamentosController.find();

  return response.json(agendamentos);
});

agendamentosRouter.get('/:id', async (request, response) => {
  try {
    const agendamentosController = getRepository(Agendamentos);
    const medicoController = getRepository(Medicos);
    const pacienteController = getRepository(Pacientes);
    const { id } = request.params;
    const agendamento = await agendamentosController.findOne(id);
    const medico = await medicoController.findOne(agendamento?.id_medico);
    const paciente = await pacienteController.findOne(agendamento?.id_paciente);

    const detalhes = {
      agendamento,
      medico,
      paciente,
    };

    return response.json(detalhes);
  } catch (erro) {
    return response.json('Agendamento não encontrado.');
  }
});

agendamentosRouter.delete('/:id', async (request, response) => {
  try {
    const agendamentosController = getRepository(Agendamentos);
    const { id } = request.params;

    await agendamentosController.delete(id);

    return response.status(204).send();
  } catch (erro) {
    return response.json('Agendamento não encontrado.');
  }
});

agendamentosRouter.patch('/:id', async (request, response) => {
  try {
    const id = request.params;
    const { id_medico, id_paciente, data_hora } = request.body;

    const agendamentosController = new AgendamentosController();
    const medicos = await agendamentosController.update({
      id,
      id_medico,
      id_paciente,
      data_hora,
    });

    return response.json(medicos);
  } catch (erro) {
    return response.json({ error: erro.message });
  }
});

export default agendamentosRouter;
