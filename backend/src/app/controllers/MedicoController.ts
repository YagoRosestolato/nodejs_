import { getRepository } from 'typeorm';

import Medicos from '../models/Medicos';

interface Alterar {
  id: string;
  nome?: string;
  especialidade?: string;
}

interface Request {
  nome: string;
  especialidade: string;
}

class MedicosController {
  public async store({ nome, especialidade }: Request): Promise<Medicos> {
    const MedicosRepository = getRepository(Medicos);

    const medico = MedicosRepository.create({
      nome,
      especialidade,
    });

    await MedicosRepository.save(medico);
    return medico;
  }

  public async update({ id, nome, especialidade }: Alterar): Promise<Medicos> {
    const MedicosRepository = getRepository(Medicos);

    const medico = await MedicosRepository.findOne(id);

    if (!medico) {
      throw new Error('Medico não encontrado');
    }

    if (nome) {
      medico.nome = nome;
    }

    if (especialidade) {
      medico.especialidade = especialidade;
    }

    await MedicosRepository.save(medico);
    return medico;
  }
}

export default MedicosController;
