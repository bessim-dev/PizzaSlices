import React from "react"
import { OrderProvider } from "./src/components/OrderContext"

export default ({ element }) => {

  return <OrderProvider>{element}</OrderProvider>
}