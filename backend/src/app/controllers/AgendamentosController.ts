import { getRepository } from 'typeorm';

import Agendamentos from '../models/Agendamentos';
import Medicos from '../models/Medicos';
import Pacientes from '../models/Pacientes';

interface Alterar {
  id: string;
  id_medico?: string;
  id_paciente?: string;
  data_hora: Date;
}

interface Request {
  id_medico: string;
  id_paciente: string;
  data_hora: Date;
}

class MedicosController {
  public async store({
    id_medico,
    id_paciente,
    data_hora,
  }: Request): Promise<Agendamentos> {
    const AgendamentosRepository = getRepository(Agendamentos);
    const MedicosRepository = getRepository(Medicos);
    const PacienteRepository = getRepository(Pacientes);

    const medico = await MedicosRepository.findOne(id_medico);
    const paciente = await PacienteRepository.findOne(id_paciente);
    // const confereConsulta = await AgendamentosRepository.findOne(data_hora);

    if (!medico) {
      throw new Error('Medico Invalido');
    }

    if (!paciente) {
      throw new Error('Paciente Invalido');
    }

    const agendamentos = AgendamentosRepository.create({
      id_medico,
      id_paciente,
      data_hora,
    });

    await AgendamentosRepository.save(agendamentos);
    return agendamentos;
  }

  public async update({
    id,
    id_medico,
    id_paciente,
    data_hora,
  }: Alterar): Promise<Agendamentos> {
    const AgendamentosRepository = getRepository(Agendamentos);

    const agendamentos = await AgendamentosRepository.findOne(id);

    if (!agendamentos) {
      throw new Error('Agendamento não encontrado');
    }

    if (id_medico) {
      agendamentos.id_medico = id_medico;
    }

    if (id_paciente) {
      agendamentos.id_paciente = id_paciente;
    }

    if (data_hora) {
      agendamentos.data_hora = data_hora;
    }

    await AgendamentosRepository.save(agendamentos);
    return agendamentos;
  }
}

export default MedicosController;
