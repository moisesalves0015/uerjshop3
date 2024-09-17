import "@styles/globals.css";
import Provider from "@components/Provider";
import Head from 'next/head'; // Importe o componente Head do Next.js

export const metadata = {
  title: "UERJshop",
  description: "Conectando alunos, produtos e oportunidades",
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
};

const Layout = ({ children }) => { // Use uma letra maiúscula para o nome do componente
  return (
    <html lang="pt-br">
      <body>
        <Provider>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default Layout;
