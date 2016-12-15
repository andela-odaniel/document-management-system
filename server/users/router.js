/**
 * Exports the User Routes module
 * Adds user routes to the app instance
 * @export
 * @param {any} router
 * @returns {any} the router object with the new routes
 */
export default function (router) {
  router.get('/users', (req, res) => {
    res.send('all the users');
  });
}
