# Test App 

For figuring out the upgrade from Webpacker to Vite.

> This is a supper stripped down insstance of the app that needs to be upgraded. All business logic has been removed as well as anything else not relevant to this exercise. 

Currently the app:

- Webpacker 5.0
- [react-rails](https://github.com/reactjs/react-rails)
- [js-route](https://github.com/railsware/js-routes)
- ViewComponents are used with Rails view that does not currently leverage Turbo or any Stimulus 

> Note there are custom ReactComponentHelpers 

Ideally it would be great to get this working with 

- Vite replacing Webpacker
- Stimulus
- Turbo 8

Bonus: 

- Drop rails-react for rails-inertia if it can accomodate the current structure 
  - Refactoring to fit inetertia's structure will not be easy as we have over 600 tsx and js files in many dirs. 

Bundle Visualizer:

You can analyze vite's bundle with
[vite-bundle-visualizer](https://github.com/KusStar/vite-bundle-visualizer) by
running script `yarn run visualize-bundle`

Quick bundle visualizer tips:
- Bigger squares represent bigger dependencies. 
- Named imports `import {Button} from 'library'` will treeshake/reduce bundle size.
- Recommended options `vite-bundle-visualizer -t sunburst`
