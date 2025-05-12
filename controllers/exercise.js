const { User, Exercise } = require('../models');

const addExercise = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params._id
    }).select(['_id', 'username']);

    const { description, duration, date } = req.body;
    const newExercise = {
      _userId: user._id,
      description,
      duration,
    }
    if(date) {
      newExercise.date = date;
    }

    const exercise = new Exercise(newExercise);
    await exercise.save();

    const addedExercise = exercise.getSpecificFields();

    res.status(201).send({
      _id: user._id,
      username: user.username,
      description: addedExercise.description,
      duration: addedExercise.duration,
      date: new Date(addedExercise.date).toDateString(),
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

const getLogs = async (req, res) => {
  try {
    const { from, to, limit } = req.query;

    const user = await User.findOne({
      _id: req.params._id
    }).select(['_id', 'username']);

    const query  = Exercise.find({
      _userId: user._id
    });

    query.select(['description', 'duration', 'date']);

    if(from) {
      query.where('date').gt(from);
    }
    if(to) {
      query.where('date').lt(to);
    }
    if(limit) {
      query.limit(limit);
    }

    const exercises = await query;

    res.status(200).send({
      _id: user._id,
      username: user.username,
      log: exercises.map(x => {
        return {
          description: x.description,
          duration: x.duration,
          date: new Date(x.date).toDateString(),
        };
      }),
      count: exercises.length
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  addExercise,
  getLogs
};
