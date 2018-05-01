const { Project, Section } = require('../models');

module.exports = {
  async show(req, res, next) {
    try {
      const { id } = req.params;

      const project = await Project.findOne({
        where: { id },
        include: Section,
      });

      const sections = await Section.findAll({
        where: { ProjectId: id },
      });

      res.render('projects/show', { project, sections, user: req.session.user });
    } catch (err) {
      next(err);
    }
  },

  async store(req, res, next) {
    try {
      await Project.create({ ...req.body, UserId: req.session.user.id });

      req.flash('success', 'Projeto criado com sucesso');

      res.redirect('/app/dashboard');
    } catch (err) {
      next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      const { id } = req.params;

      await Project.destroy({ where: { id } });

      req.flash('success', 'Projeto excluido com sucesso.');
      res.redirect('/app/dashboard');
    } catch (err) {
      next(err);
    }
  },
};
