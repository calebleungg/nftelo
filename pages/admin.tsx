import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { ethers } from "ethers"
import SimpleStorage from "../blockchain/build/contracts/SimpleStorage.json"

const RPC_ENDPOINT = "http://localhost:7545"
const ContractAddress = "0xC4cBfF4Cd0B58EfdEc0cFACf2B3417730eaA0510"

const AdminPage = () => {
  const [data, setData] = useState([])

  const getContractData = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT)
      const simpleStorageContract = new ethers.Contract(ContractAddress, SimpleStorage.abi, provider)
      const contractData = await simpleStorageContract.get()
      const addressData = await simpleStorageContract.getMyAddress()
      const arrayData = await simpleStorageContract.getOtherStuff()
      console.log({ contractData, addressData, arrayData })
      setData(arrayData)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = async () => {
    const provider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT)
    const signer = provider.getSigner()
    console.log(signer)
    const simpleStorageContract = new ethers.Contract(ContractAddress, SimpleStorage.abi, signer)
    await simpleStorageContract.set(1337)
  }

  useEffect(() => { getContractData() }, [])

  return (
    <Layout title={"The Community's no.1 NFT Rating System | NFT Elo | Community Driven | I'm going deep now boiii"}>
      <div className="flex flex-col gap-3">
        <div>
          {data.map((thing) => <h2 key={thing}>{thing}</h2>)}
        </div>
        <button className="bg-slate-200 py-1 px-3 rounded-md text-slate-900" onClick={handleClick}>Click me for something</button>
      </div>
    </Layout>
  )
}

export default AdminPage
