import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import VFContractABI from './VFContractABI.json';

const contractAddress = '0x06B533855163afb7E0Ec7b6643F3492E78e9c0F1';
const rpcURL = 'https://polygon-mumbai.infura.io/v3/99405a56ad874afbb5c5e697f54f227b';

const Contribute = () => {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        // Check if MetaMask is installed
        if (window.ethereum) {
          const providerInstance = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await providerInstance.listAccounts();
          const signer = providerInstance.getSigner(accounts[0]);
          const vfContract = new ethers.Contract(contractAddress, VFContractABI, signer);

          setProvider(providerInstance);
          setContract(vfContract);
          setAccount(accounts[0]);
        } else {
          console.error('MetaMask not detected. Please install and connect to MetaMask.');
        }
      } catch (error) {
        console.error('Error initializing Ethers:', error);
      }
    };
    init();
  }, []);

  const handleGetSeed = async () => {
    try {
      const tx = await contract.getSeed();
      await tx.wait();
      alert('Seed NFT minted!');
    } catch (error) {
      console.error('Error getting seed:', error);
    }
  };

  if (!provider) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Virtual Forest Contract Interaction</h1>
      <p>Connected Account: {account}</p>
      <button onClick={handleGetSeed}>Get Seed</button>
    </div>
  );
};

export default Contribute;