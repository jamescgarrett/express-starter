 'use strict';

/**
 * GET /
 * Get Index.
 **/
exports.getIndex = (req, res, next) => {
  return res.json({title: 'Hello World!'});
};
