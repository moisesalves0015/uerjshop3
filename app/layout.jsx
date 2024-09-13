import "@styles/globals.css";
import Provider from "@components/Provider";



export const metadata = {
  title: "UERJshop",
  description: "Conectando alunos, produtos e oportunidades",
};

const layout = ({ children }) => {
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

export default layout;
