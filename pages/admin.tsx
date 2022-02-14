import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { ethers } from "ethers"
import SimpleStorage from "../blockchain/build/contracts/SimpleStorage.json"

const RPC_ENDPOINT = "http://localhost:7545"
const ContractAddress = "0x685bA367aC63d51d7f229a569d94813785C89412"

const AdminPage = () => {
  const [data, setData] = useState(0)

  const getContractData = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT)
      const simpleStorageContract = new ethers.Contract(ContractAddress, SimpleStorage.abi, provider)
      const contractData = await simpleStorageContract.get()
      const addressData = await simpleStorageContract.getMyAddress()
      const arrayData = await simpleStorageContract.getOtherStuff()
      console.log({ contractData, addressData, arrayData })
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = async () => {
    const provider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT)
    const signer = provider.getSigner()
    const simpleStorageContract = new ethers.Contract(ContractAddress, SimpleStorage.abi, signer)
    await simpleStorageContract.set(1337)
  }

  useEffect(() => { getContractData() }, [])

  return (
    <Layout title={"The Community's no.1 NFT Rating System | NFT Elo | Community Driven | I'm going deep now boiii"}>
      <div>
        <button onClick={handleClick}>Click me for something</button>
      </div>
    </Layout>
  )
}

export default AdminPage
