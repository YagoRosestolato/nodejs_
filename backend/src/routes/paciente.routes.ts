import { Router } from 'express';
import multer from 'multer';

import { getRepository } from 'typeorm';
import PacienteController from '../app/controllers/PacienteController';
import Pacientes from '../app/models/Pacientes';
import uploadConfig from '../config/upload';

const upload = multer(uploadConfig);
const pacienteRouter = Router();

pacienteRouter.post('/', upload.single('foto'), async (request, response) => {
  try {
    const { nome, email, telefone } = request.body;
    const foto = request.file.filename;

    const pacienteController = new PacienteController();
    const paciente = await pacienteController.store({
      nome,
      email,
      telefone,
      foto,
    });

    return response.json(paciente);
  } catch (erro) {
    return response.json({ error: erro.message });
  }
});

pacienteRouter.get('/', async (request, response) => {
  const pacienteController = getRepository(Pacientes);
  const paciente = await pacienteController.find();
  return response.json(paciente);
});

pacienteRouter.get('/:id', async (request, response) => {
  try {
    const pacienteController = getRepository(Pacientes);
    const { id } = request.params;
    const paciente = await pacienteController.findOne(id);

    return response.json(paciente);
  } catch (erro) {
    return response.json('Paciente não encontrado.');
  }
});

pacienteRouter.delete('/:id', async (request, response) => {
  try {
    const pacienteController = getRepository(Pacientes);
    const { id } = request.params;

    await pacienteController.delete(id);

    return response.status(204).send();
  } catch (erro) {
    return response.json('Paciente não encontrado.');
  }
});

pacienteRouter.patch(
  '/:id',
  upload.single('foto'),
  async (request, response) => {
    try {
      const id = request.params.id;
      const { nome, email, telefone } = request.body;
      const foto = request.file.filename;

      const pacienteController = new PacienteController();
      const paciente = await pacienteController.update({
        id,
        nome,
        email,
        telefone,
        foto,
      });

      return response.json(paciente);
    } catch (erro) {
      return response.json({ error: erro.message });
    }
  },
);

export default pacienteRouter;
