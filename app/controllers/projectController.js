const { Project, Section } = require('../models');

module.exports = {
  async show(req, res, next) {
    try {
      const { id } = req.params;

      const project = await Project.findOne({
        where: {
          UserId: req.session.user.id,
          id,
        },
        include: Section,
      });

      const sections = await Section.findAll({
        where: { ProjectId: project.id },
      });

      const section = sections.length > 0 ? sections[0] : null;

      res.render('projects/show', {
        project,
        sections,
        user: req.session.user,
        currentSection: section,
      });
    } catch (err) {
      next(err);
    }
  },

  async showSection(req, res, next) {
    try {
      const { id, sectionId } = req.params;

      const project = await Project.findOne({
        where: {
          UserId: req.session.user.id,
          id,
        },
        include: Section,
      });

      const sections = await Section.findAll({
        where: { ProjectId: project.id },
      });

      const section = await Section.findById(sectionId);

      res.render('projects/show', {
        project,
        sections,
        user: req.session.user,
        currentSection: section,
      });
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

      await Project.destroy({
        where: {
          UserId: req.session.user.id,
          id,
        },
      });

      req.flash('success', 'Projeto excluido com sucesso.');
      res.redirect('/app/dashboard');
    } catch (err) {
      next(err);
    }
  },
};
