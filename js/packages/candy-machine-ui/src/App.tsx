import './App.css';
// import './tailwind_generated.css';
import { useMemo } from 'react';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import timeReducer from './reducers/time'
import { CookiesProvider } from 'react-cookie';
import * as anchor from '@project-serum/anchor';
import Home from './Home';
import { DEFAULT_TIMEOUT } from './connection';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolletExtensionWallet,
} from '@solana/wallet-adapter-wallets';

import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletDialogProvider } from '@solana/wallet-adapter-material-ui';

import { ThemeProvider, createTheme } from '@material-ui/core';

const theme = createTheme({
  palette: {
    type: 'dark',
  },
});

const getCandyMachineId = (): anchor.web3.PublicKey | undefined => {
  try {
    const candyMachineId = new anchor.web3.PublicKey(
      process.env.REACT_APP_CANDY_MACHINE_ID!,
    );

    return candyMachineId;
  } catch (e) {
    console.log('Failed to construct CandyMachineId', e);
    return undefined;
  }
};

const candyMachineId = getCandyMachineId();
const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;
const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(
  rpcHost ? rpcHost : anchor.web3.clusterApiUrl('devnet'),
);

const store = configureStore({
  reducer: {
    time: timeReducer,
  },
})

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getSlopeWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
    ],
    [],
  );

  return (
<<<<<<< HEAD:metaplex/js/packages/candy-machine-ui/src/App.tsx
    <CookiesProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
              <WalletDialogProvider>
                <Home
                  candyMachineId={candyMachineId}
                  connection={connection}
                  txTimeout={DEFAULT_TIMEOUT}
                  rpcHost={rpcHost}
                />
              </WalletDialogProvider>
            </WalletProvider>
          </ConnectionProvider>
        </ThemeProvider>
      </Provider>
    </CookiesProvider>
=======
    <ThemeProvider theme={theme}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletDialogProvider>
            <Home
              candyMachineId={candyMachineId}
              connection={connection}
              txTimeout={DEFAULT_TIMEOUT}
              rpcHost={rpcHost}
              network={network}
            />
          </WalletDialogProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ThemeProvider>
>>>>>>> upstream/master:js/packages/candy-machine-ui/src/App.tsx
  );
};

export default App;
