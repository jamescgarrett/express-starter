'use strict';

/**
 * GET /api/v1/
 * Get Api Index
 **/
exports.getApiIndex = (req, res, next) => {
     return res.json({title: 'Hello Api!'});
};