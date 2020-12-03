import { Router } from 'express';

import { getRepository } from 'typeorm';
import MedicosController from '../app/controllers/MedicoController';
import Medicos from '../app/models/Medicos';

const medicoRouter = Router();

medicoRouter.post('/', async (request, response) => {
  try {
    const { nome, especialidade } = request.body;

    const medicosController = new MedicosController();
    const medico = await medicosController.store({
      nome,
      especialidade,
    });

    return response.json(medico);
  } catch (erro) {
    return response.json({ error: erro.message });
  }
});

medicoRouter.get('/', async (request, response) => {
  const medicoController = getRepository(Medicos);
  const medico = await medicoController.find();
  return response.json(medico);
});

medicoRouter.get('/:id', async (request, response) => {
  try {
    const medicosController = getRepository(Medicos);
    const { id } = request.params;
    const medico = await medicosController.findOne(id);

    return response.json(medico);
  } catch (erro) {
    return response.json('Medido não encontrado.');
  }
});

medicoRouter.delete('/:id', async (request, response) => {
  try {
    const medicosController = getRepository(Medicos);
    const { id } = request.params;

    await medicosController.delete(id);

    return response.status(204).send();
  } catch (erro) {
    return response.json('Medico não encontrado.');
  }
});

medicoRouter.patch('/:id', async (request, response) => {
  try {
    const id = request.params;
    const { nome, especialidade } = request.body;

    const medicosController = new MedicosController();
    const medicos = await medicosController.update({
      id,
      nome,
      especialidade,
    });

    return response.json(medicos);
  } catch (erro) {
    return response.json({ error: erro.message });
  }
});

export default medicoRouter;
