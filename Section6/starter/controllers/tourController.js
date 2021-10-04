const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/tours-simple.json`
  )
);

exports.checkID = (req, res, next) => {
  const id = +req.params.id;
  const tourIdx = tours.findIndex(
    (val) => val.id === id
  );
  if (tourIdx === -1) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({
      status: 'failed',
      message:
        'Invalid Body: name and price required.',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

exports.getTourByID = (req, res) => {
  const id = +req.params.id;

  const tour = tours[id];

  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
};

exports.createNewTour = (req, res) => {
  // construct new tour
  const newId = tours[tours.length - 1].id + 1;
  const newTour = req.body;
  Object.assign(newTour, { id: newId });

  // send new tour to local database/file
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err)
        return res.status(500).json({
          status: 'error',
          message: 'Writing to file failed!',
        });
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.patchTourByID = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: null,
    },
  });
};

exports.deleteTourByID = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
