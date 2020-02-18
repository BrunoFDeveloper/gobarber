import User from '../models/user';
import Notification from '../schemas/Notification';

class NotificationController {
  async index({ userId }, res) {
    const checkUser = await User.findOne({
      where: { id: userId, provider: true },
    });

    if (!checkUser)
      return res
        .status(400)
        .json({ error: 'Only providers can see notifications' });

    const notifications = await Notification.find({
      user: userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update({ params }, res) {
    const notification = await Notification.findByIdAndUpdate(
      params.id,
      {
        read: true,
      },
      { new: true }
    );

    return res.json(notification);
  }
}

export default new NotificationController();
