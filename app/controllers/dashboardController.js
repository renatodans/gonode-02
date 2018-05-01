const { Project, Section } = require('../models');

module.exports = {
  async index(req, res, next) {
    try {
      const projects = await Project.findAll({
        where: { UserId: req.session.user.id },
        include: Section,
      });

      res.render('dashboard/index', { projects, user: req.session.user });
    } catch (err) {
      next(err);
    }
  },
};
