import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import Pacientes from '../models/Pacientes';
import uploadConfig from '../../config/upload';

interface Alterar {
  id: string;
  nome?: string;
  email?: string;
  telefone?: string;
  foto?: string;
}

interface Request {
  nome: string;
  email: string;
  telefone: string;
  foto: string;
}

class PacienteController {
  public async store({
    nome,
    email,
    telefone,
    foto,
  }: Request): Promise<Pacientes> {
    const PacienteRepository = getRepository(Pacientes);

    const ChecarEmail = await PacienteRepository.findOne({
      where: { email },
    });

    if (ChecarEmail) {
      throw new Error('Medico já cadastrado');
    }

    const paciente = PacienteRepository.create({
      nome,
      email,
      telefone,
      foto,
    });

    await PacienteRepository.save(paciente);
    return paciente;
  }

  public async update({
    id,
    nome,
    email,
    telefone,
    foto,
  }: Alterar): Promise<Pacientes> {
    const PacienteRepository = getRepository(Pacientes);

    const paciente = await PacienteRepository.findOne(id);

    if (!paciente) {
      throw new Error('Funcionario não encontrado');
    }
    if (paciente.foto) {
      const FotoFilePath = path.join(uploadConfig.directory, paciente.foto);
      const FotoFileExists = await fs.promises.stat(FotoFilePath);
      if (FotoFileExists) {
        await fs.promises.unlink(FotoFilePath);
      }
    }

    if (nome) {
      paciente.nome = nome;
    }
    if (email) {
      paciente.email = email;
    }
    if (telefone) {
      paciente.telefone = telefone;
    }
    if (foto) {
      paciente.foto = foto;
    }

    await PacienteRepository.save(paciente);
    return paciente;
  }
}

export default PacienteController;
