const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---src-pages-404-jsx": hot(preferDefault(require("D:\\Github shit\\gatsbyP\\gatsby\\src\\pages\\404.jsx"))),
  "component---src-pages-beers-jsx": hot(preferDefault(require("D:\\Github shit\\gatsbyP\\gatsby\\src\\pages\\beers.jsx"))),
  "component---src-pages-index-jsx": hot(preferDefault(require("D:\\Github shit\\gatsbyP\\gatsby\\src\\pages\\index.jsx"))),
  "component---src-pages-orders-jsx": hot(preferDefault(require("D:\\Github shit\\gatsbyP\\gatsby\\src\\pages\\orders.jsx"))),
  "component---src-pages-pizzas-jsx": hot(preferDefault(require("D:\\Github shit\\gatsbyP\\gatsby\\src\\pages\\pizzas.jsx"))),
  "component---src-templates-pizza-jsx": hot(preferDefault(require("D:\\Github shit\\gatsbyP\\gatsby\\src\\templates\\Pizza.jsx"))),
  "component---src-templates-slice-master-jsx": hot(preferDefault(require("D:\\Github shit\\gatsbyP\\gatsby\\src\\templates\\SliceMaster.jsx"))),
  "component---src-templates-slicemasters-jsx": hot(preferDefault(require("D:\\Github shit\\gatsbyP\\gatsby\\src\\templates\\Slicemasters.jsx")))
}

