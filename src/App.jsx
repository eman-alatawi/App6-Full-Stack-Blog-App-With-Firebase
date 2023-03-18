import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import Layout from "./components/layout/Layout"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
    <Layout/>
    <ReactQueryDevtools/>
    <ToastContainer />
    </>
  )
}

export default App
