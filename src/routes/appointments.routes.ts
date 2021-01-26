import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../Repository/ApointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentsService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return response.status(200).json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    // eslint-disable-next-line camelcase
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    });

    return response.status(200).json(appointment);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default appointmentsRouter;
