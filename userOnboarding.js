const axios = require('axios');
const { v4: uuidv4 } = require('uuid'); // Make sure to import uuid

// API and user details
const apiKey = 'TEST_API_KEY:';
const baseUrl = 'https://api.circle.com/v1/w3s';
const userId = 'xPayUser_' + Date.now(); // Generate a simple unique ID

// Function to create a user
const createUser = async () => {
  try {
    const userResponse = await axios.post(`${baseUrl}/users`, {
      userId: userId,
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    });

    console.log('User created:', userResponse.data);
    return userResponse.data;
  } catch (error) {
    console.error('Error creating user:', error.response ? error.response.data : error);
    throw error;
  }
};

// Function to setup user onboarding
const setupUserOnboarding = async () => {
  try {
    await createUser();
  } catch (error) {
    console.error('User onboarding failed:', error);
  }
};

// Call setupUserOnboarding when the script loads to initialize user creation
setupUserOnboarding();

// Function to create a wallet
const createWallet = async () => {
  try {
    const walletUrl = `${baseUrl}/user/wallets`;
    const idempotencyKey = uuidv4();
    const walletResponse = await axios.post(walletUrl, {
      idempotencyKey: idempotencyKey,
      blockchains: ['ETH-SEPOLIA'],
      accountType: 'SCA',
      metadata: [{ name: 'My walletResponse', refId: 'wallet123' }],
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'X-User-Token': 'your_user_token_here',
      },
    });

    console.log('Wallet created:', walletResponse.data);
    return walletResponse.data;
  } catch (error) {
    console.error('Error creating wallet:', error.response ? error.response.data : error);
    throw error;
  }
};

// Event listener for the "Create User" button
document.addEventListener('DOMContentLoaded', (event) => {
    // Now the DOM is fully loaded
    const createUserButton = document.getElementById('createUserBtn');
    const createWalletButton = document.getElementById('createWalletBtn');

    // Event listeners
    createUserButton.addEventListener('click', async () => {
        try {
            await createUser();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    });

    createWalletButton.addEventListener('click', async () => {
        try {
            await createWallet();
        } catch (error) {
            console.error('Error creating wallet:', error);
        }
    });
});

