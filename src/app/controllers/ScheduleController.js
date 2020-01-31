import { Op } from 'sequelize';
import { startOfDay, endOfDay, parseISO } from 'date-fns';

import User from '../models/user';
import Appointment from '../models/Appointment';

class ScheduleController {
  async index({ userId, query }, res) {
    const checkUserProvider = await User.findOne({
      where: { id: userId, provider: true },
    });

    if (!checkUserProvider)
      return res.status(400).json({ error: 'User is not a Provider' });

    const { date } = query;
    const parsedDate = parseISO(date);
    const schedule = await Appointment.findAll({
      where: { provider_id: userId, canceled_at: null },
      order: ['date'],
      date: {
        [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
      },
    });

    return res.json(schedule);
  }
}

export default new ScheduleController();
