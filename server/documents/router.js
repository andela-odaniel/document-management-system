/**
 * Exports the Document Routes module
 * Adds document routes to the app instance
 * @export
 * @param {any} router
 * @returns {any} the router object with the new routes
 */
export default function (router) {
  router.get('/documents', (req, res) => {
    res.send(JSON.stringify('all the documents'));
  });
}
