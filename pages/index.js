import styles from "../styles/Home.module.css";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";
import { abi } from "../constants/abi";

export default function Home() {
  const injected = new InjectedConnector();
  const { activate, active, library: provider } = useWeb3React(); // This is a hook
  /** This has a field called library we're naming it as provider, also an active thing from useWeb3React so we 
      can check to see if we are actively connected or not. We can use this hook across all different pages to 
      always know if we are connected or not. This is what the value of wrapping the component in Web3ReactProvider. 
      If we didnt wrap it then we would have to reconnect on every single page.
   */

  async function connect() {
    try {
      await activate(injected); // tell activate which provider to use
    } catch (e) {
      console.log(e);
    }
  }
  async function execute() {
    if (active) {
      const signer = provider.getSigner();
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        await contract.store(42);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }
  return (
    <div className={styles.container}>
      {active ? (
        <>
          "Connected"
          <button onClick={() => execute()}>Execute</button>
        </>
      ) : (
        <button onClick={() => connect()}>Connect</button>
      )}
    </div>
  );
}
