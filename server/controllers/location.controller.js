import Location from '../models/location';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all locations
 * @param req
 * @param res
 * @returns void
 */
export function getLocations(req, res) {
  Location.find().sort('-dateAdded').exec((err, locations) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ locations });
  });
}

/**
 * Save a location
 * @param req
 * @param res
 * @returns void
 */
export function addLocation(req, res) {
  if (!req.body.location.name) {
    res.status(403).end();
    console.log('we got a name here')
  }

  const newLocation = new Location(req.body.location);
  newLocation.cuid = cuid();
  newLocation.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ location: saved });
  });
}

/**
 * Get a single location
 * @param req
 * @param res
 * @returns void
 */
export function getLocation(req, res) {
  Location.findOne({ cuid: req.params.cuid }).exec((err, location) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ location });
  });
}

/**
 * Delete a location
 * @param req
 * @param res
 * @returns void
 */
export function deleteLocation(req, res) {
    // console.log(req)
  Location.findOne({ cuid: req.params.cuid }).exec((err, location) => {
    if (err) {
      res.status(500).send(err);
    }

    location.remove(() => {
      res.status(200).end();
    });
  });
}
