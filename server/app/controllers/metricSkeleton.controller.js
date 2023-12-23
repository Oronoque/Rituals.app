const db = require('../path/to/your/database/connection'); // Update with the correct path
const MetricSkeleton = db.metricSkeleton;

const MetricSkeletonController = {
  // Create a new MetricSkeleton entry
  create: async (req, res) => {
    try {
      const metricSkeleton = await MetricSkeleton.create({
        name: req.body.name,
      });
      res.status(201).send(metricSkeleton);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  // Retrieve all MetricSkeleton entries
  findAll: async (req, res) => {
    try {
      const metricSkeletons = await MetricSkeleton.findAll();
      res.status(200).send(metricSkeletons);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  // Find a single MetricSkeleton by ID
  findOne: async (req, res) => {
    const id = req.params.id;
    try {
      const metricSkeleton = await MetricSkeleton.findByPk(id);
      if (metricSkeleton) {
        res.status(200).send(metricSkeleton);
      } else {
        res.status(404).send({ message: 'MetricSkeleton not found.' });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  // Update a MetricSkeleton by ID
  update: async (req, res) => {
    const id = req.params.id;
    try {
      const updated = await MetricSkeleton.update(req.body, {
        where: { id: id },
      });
      if (updated[0] === 1) {
        res.status(200).send({ message: 'MetricSkeleton updated successfully.' });
      } else {
        res.status(404).send({ message: 'MetricSkeleton not found.' });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  // Delete a MetricSkeleton by ID
  delete: async (req, res) => {
    const id = req.params.id;
    try {
      const deleted = await MetricSkeleton.destroy({
        where: { id: id },
      });
      if (deleted) {
        res.status(200).send({ message: 'MetricSkeleton deleted successfully.' });
      } else {
        res.status(404).send({ message: 'MetricSkeleton not found.' });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};

module.exports = MetricSkeletonController;
